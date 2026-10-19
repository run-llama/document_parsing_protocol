import assert from 'node:assert/strict';
import { createAccessSession, getAccessConfig } from '../lib/site-access.ts';

const base = process.argv[2] ?? 'http://localhost:3011';
const config = getAccessConfig();
assert.ok(config, 'Set SITE_PASSWORD and SITE_SESSION_SECRET before running this check.');
const request = (path, options = {}) => fetch(new URL(path, base), { redirect: 'manual', ...options });
const pages = ['/', '/guide', '/guide/tables-3-headers-multi-row-header-tiers', '/practice', '/example', '/decisions'];
const files = ['/downloads/dpp-parse-0.1.zip', '/downloads/DPP-0.1-starter-reference.md', '/documents/apple-fy2024-q4-financial-statements.pdf', '/documents/apple-fy2024-q4-page-1.png', '/convention-examples/tables-3-headers-multi-row-header-tiers.json', '/documents/conventions/00a5aab20b2c-zoo-3lineperrowhili.png', '/favicon.ico'];
const internals = ['/_next/image?url=%2Fdocuments%2Fapple-fy2024-q4-page-1.png&w=640&q=75', '/_next/data/test/research.json', '/_next/static/test.js'];

for (const path of [...pages, ...files, ...internals]) {
  const result = await request(path);
  assert.equal(result.status, 307, `Unauthenticated: ${path}`);
  const destination = result.headers.get('location') ?? result.headers.get('x-nextjs-redirect');
  assert.ok(destination, `Missing authentication redirect: ${path}`);
  assert.match(new URL(destination, base).pathname, /^\/access$|^\/_next\/data\/[^/]+\/access\.json$/);
  assert.match(result.headers.get('cache-control'), /no-store/);
  await result.body?.cancel();
}
for (const headers of [{ RSC: '1', 'Next-Router-Prefetch': '1' }, { 'x-middleware-subrequest': 'proxy:proxy:proxy:proxy:proxy' }]) {
  const result = await request('/guide', { headers });
  assert.equal(result.status, 307);
  await result.body?.cancel();
}
assert.equal((await request('/guide', { method: 'POST' })).status, 401);
const loginPage = await request('/access?next=%2Fguide%3Fview%3Dall');
const html = await loginPage.text();
assert.equal(loginPage.status, 200);
assert.ok(html.includes('type="password"'));
assert.ok(!html.includes(config.password));
assert.ok(!html.includes(config.secret));
assert.ok(!html.includes('<script'));
assert.match(loginPage.headers.get('cache-control'), /no-store/);
const submit = (password, next = '/guide?view=all', origin = new URL(base).origin) => request('/access', {
  method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: origin },
  body: new URLSearchParams({ password, next }),
});
const bad = await submit('wrong-password');
assert.equal(bad.status, 401);
assert.equal(bad.headers.get('set-cookie'), null);
assert.ok((await bad.text()).includes('isn’t correct'));
assert.equal((await submit(config.password, '/guide', 'https://other.example')).status, 403);
const good = await submit(config.password);
assert.equal(good.status, 303);
assert.equal(new URL(good.headers.get('location')).pathname, '/guide');
assert.equal(new URL(good.headers.get('location')).search, '?view=all');
const setCookie = good.headers.get('set-cookie');
assert.match(setCookie, /HttpOnly/i);
assert.match(setCookie, /SameSite=lax/i);
assert.match(setCookie, /Path=\//i);
assert.match(setCookie, /Max-Age=604800/i);
if (process.env.EXPECT_SECURE_COOKIE === '1') assert.match(setCookie, /; Secure/i);
const cookie = setCookie.split(';')[0];
for (const path of [...pages, ...files]) {
  const result = await request(path, { headers: { Cookie: cookie } });
  assert.equal(result.status, 200, `Authenticated: ${path}`);
  await result.body?.cancel();
}
// Bundles can contain convention content, so they too must require a session.
const page = await request('/guide', { headers: { Cookie: cookie } });
const pageHtml = await page.text();
const asset = /src="([^\"]*\/_next\/static\/[^\"]+\.js(?:\?[^\"]*)?)"/.exec(pageHtml)?.[1];
assert.ok(asset, 'Found a real production JavaScript bundle');
assert.equal((await request(asset)).status, 307);
assert.equal((await request(asset, { headers: { Cookie: cookie } })).status, 200);
for (const value of [cookie + 'broken', 'dpp_access=true', 'dpp_access=' + createAccessSession(config, Date.now() - 8 * 86400_000)]) {
  assert.equal((await request('/guide', { headers: { Cookie: value } })).status, 307);
}
const outside = await submit(config.password, '//other.example');
assert.equal(new URL(outside.headers.get('location')).origin, new URL(base).origin);
assert.equal(new URL(outside.headers.get('location')).pathname, '/');
console.log(`Passed: ${pages.length} pages, ${files.length} files, framework paths/bundles, login errors, signed sessions, expiry, and safe redirects.`);
