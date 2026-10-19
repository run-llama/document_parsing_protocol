# Document Parsing Protocol (DPP)

A protocol for how to make truthful and AI-friendly interpretation of documents. DPP proposes
shared conventions for representing documents as structured data, preserving their content,
structure, and uncertainty. This repository holds the public site: the guide of 130 conventions
with worked examples, a practice set, a worked page, the decision register, and a starter skill
for using DPP in an assistant.

Working draft 0.1.

## Site map

| Route | What it is |
| --- | --- |
| `/` | Opening walkthrough (IRS Form 1040), the guide index, Try it, draft status |
| `/guide`, `/guide/<slug>` | One page per convention: rule, example beside expected output, counter-example, look-alike, history |
| `/example` | Apple's FY2024 statement of operations with eight parsing decisions |
| `/practice` | 38 short exercises built from the look-alike pairs |
| `/decisions` | The decision register: 104 records behind the conventions |

## Development

```sh
pnpm install
pnpm dev
```

Then open http://localhost:3000. The site is a Next.js app; pages under `app/guide/[slug]` are
pre-rendered from `app/data/atlas.json` (the conventions) and `public/convention-examples/*.json`
(the examples).

Checks:

```sh
npx tsc --noEmit
pnpm exec eslint app
pnpm exec next build --webpack
```

## Content pipeline

- `app/data/atlas.json` — the 130 conventions (title, subject, status, rule, context, related).
- `app/data/amb.json` and `app/data/decision-conventions.json` — the decision register and its links to conventions.
- `app/data/pairs.ts` — the synthetic look-alike pairs, which also feed `/practice`.
- `public/convention-examples/*.json` — per-convention example bundles: source images, scenario,
  expected output (tables, Markdown source, and a sanitised rendered view), non-conforming output
  for counter-examples, and worked encodings.
- `public/documents/conventions/` — the example source images referenced by the bundles.

The bundles are produced from the maintainers' convention guide by
`scripts/sync-convention-library.py`, which fetches the guide, downloads referenced images, and
runs `scripts/import-convention-examples.py`. Set `DPP_LIBRARY_URL` to the guide's base URL
first; the sync writes its manifest to `resources/convention-library/`, which is ignored by git.

```sh
DPP_LIBRARY_URL=https://guide.example/ python3 scripts/sync-convention-library.py /tmp/dpp-live-pages
```

`scripts/build-dpp-starter.py` rebuilds the downloads under `public/downloads/` from
`resources/dpp-parse/`.

## Password-protected access

Every route is protected by `proxy.ts`, including old editions, route handlers,
PDFs, images, JSON, downloads, and Next.js assets. Only `/access` is public; its
password form is self-contained HTML and needs no public asset exceptions.

### Local setup

Copy `.env.example` to `.env.local`, set `SITE_PASSWORD` to the shared password,
and set `SITE_SESSION_SECRET` to a random value of at least 32 characters
(`openssl rand -hex 32`). Local credentials are ignored by Git. Restart the
server after changing them.

### Before deploying to Vercel

In the Vercel project’s **Settings → Environment Variables**, add both
`SITE_PASSWORD` and `SITE_SESSION_SECRET` as secrets for **Production and Preview**.
Use the same values as your local `.env.local` if you want the same credentials.
Neither variable should have a `NEXT_PUBLIC_` prefix. Then deploy or redeploy;
variable changes do not update older deployments.

The gate fails closed if either setting is absent or the signing secret is too
short: users see an access-unavailable page and cannot retrieve protected content.
No fallback password is embedded in the repository.

A successful login creates an HttpOnly, SameSite=Lax cookie for seven days,
Secure in production. Sessions are signed and bound to both settings; changing
either setting and redeploying invalidates existing sessions. Authentication is
checked on every request and protected responses are marked private/no-store.
This is a shared-password gate, not individual user accounts. Content a visitor
already downloaded cannot be recalled by changing the password.

Validation:

```sh
node --experimental-strip-types --test tests/site-access.test.mjs
pnpm exec next build --webpack
# With a local production server running and both settings in the environment:
node --experimental-strip-types --env-file=.env.local tests/site-access-http.mjs http://localhost:3012
```

The HTTP check covers every page, direct downloads, framework data/static paths,
wrong passwords, tampered cookies, cross-origin login, and authenticated access.

Vercel configuration reference: https://vercel.com/docs/environment-variables

## Provenance

The opening figure reproduces page 1 of IRS Form 1040 (2020), a public-domain U.S. government
document. The worked page reproduces Apple's published FY2024 statement of operations with
explanatory overlays. Convention examples pair source images with the expected output the guide
specifies for them; counter-examples also show the non-conforming output the convention rules out.
