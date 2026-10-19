import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createAccessSession, getAccessConfig, hasAccess, passwordMatches, safeReturnPath, SESSION_SECONDS } from '../lib/site-access.ts';

const config = { password: 'test-password-only', secret: 'test-signing-secret-at-least-32-characters' };
const now = 1_790_000_000_000;

test('requires a signed, unexpired session', () => {
  const token = createAccessSession(config, now);
  assert.equal(hasAccess(token, config, now), true);
  assert.equal(hasAccess(undefined, config, now), false);
  assert.equal(hasAccess('true', config, now), false);
  assert.equal(hasAccess(token, null, now), false);
  assert.equal(hasAccess(token, config, now + SESSION_SECONDS * 1000), false);
  assert.notEqual(createAccessSession(config, now), token);
});

test('rejects modified claims and signatures and revokes rotated credentials', () => {
  const token = createAccessSession(config, now);
  const parts = token.split('.');
  parts[1] = String(Number(parts[1]) + 1);
  assert.equal(hasAccess(parts.join('.'), config, now), false);
  assert.equal(hasAccess(token.slice(0, -1) + (token.endsWith('0') ? '1' : '0'), config, now), false);
  assert.equal(hasAccess(token, { ...config, password: 'rotated' }, now), false);
  assert.equal(hasAccess(token, { ...config, secret: 'another-secret-with-at-least-32-characters' }, now), false);
  for (const value of ['', 'v1.not-a-date.x.x', token + '.extra', 'x'.repeat(500)]) assert.equal(hasAccess(value, config, now), false);
});

test('checks passwords exactly', () => {
  assert.equal(passwordMatches(config.password, config), true);
  for (const value of ['', config.password + ' ', config.password.toUpperCase()]) assert.equal(passwordMatches(value, config), false);
});

test('only returns local paths and avoids access loops', () => {
  assert.equal(safeReturnPath('/guide?view=all'), '/guide?view=all');
  for (const value of [null, 'https://example.com', '//example.com', '/\\example.com', '/guide\n', '/access', '/access/logout', '/foo/../access']) assert.equal(safeReturnPath(value), '/');
});

test('missing or inadequate configuration fails closed', () => {
  const oldPassword = process.env.SITE_PASSWORD;
  const oldSecret = process.env.SITE_SESSION_SECRET;
  try {
    delete process.env.SITE_PASSWORD;
    delete process.env.SITE_SESSION_SECRET;
    assert.equal(getAccessConfig(), null);
    process.env.SITE_PASSWORD = config.password;
    process.env.SITE_SESSION_SECRET = 'too-short';
    assert.equal(getAccessConfig(), null);
    process.env.SITE_SESSION_SECRET = config.secret;
    assert.deepEqual(getAccessConfig(), config);
  } finally {
    if (oldPassword === undefined) delete process.env.SITE_PASSWORD; else process.env.SITE_PASSWORD = oldPassword;
    if (oldSecret === undefined) delete process.env.SITE_SESSION_SECRET; else process.env.SITE_SESSION_SECRET = oldSecret;
  }
});
