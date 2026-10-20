# Document Parsing Protocol (DPP)

A protocol for how to make truthful and AI-friendly interpretation of documents. DPP proposes
shared conventions for representing documents as structured data, preserving their content,
structure, and uncertainty. This repository holds the protocol source, the RFC and skill
builders, and the public site: the guide of conventions with worked examples, a practice set,
a worked page, and a starter skill for using DPP in an assistant.

Working draft 0.1.

## Layout

| Path | What it is |
| --- | --- |
| `protocol/` | The protocol source: one Markdown file per rule, grouped by chapter. Edit these. |
| `scripts/sync-protocol.py` | Builds the RFC, the convention pages' data, images, and the ChatGPT/Claude skill downloads from `protocol/`. |
| `app/` | The Next.js site. |
| `app/data/atlas.json`, `public/convention-examples/` | Generated convention data and example bundles. Do not edit by hand. |
| `resources/convention-library/` | Example provenance, teaching examples, and slug aliases used by the build. |
| `resources/dpp-parse/`, `public/downloads/` | The starter skill sources and the generated downloads. |

## Site map

| Route | What it is |
| --- | --- |
| `/` | Opening walkthrough (IRS Form 1040), the guide index, Try it, draft status |
| `/guide`, `/guide/<slug>` | One page per convention: rule, example beside expected output, counter-example, look-alike |
| `/example` | Apple's FY2024 statement of operations with eight parsing decisions |
| `/practice` | Short exercises built from the look-alike pairs |
| `/protocol/rfc.html` | The full RFC, generated from `protocol/` |

## Development

```sh
pnpm install
pnpm dev
```

Then open http://localhost:3000. Checks:

```sh
npx tsc --noEmit
pnpm exec eslint app
pnpm exec next build --webpack
node --experimental-strip-types --test tests/*.test.mjs
. .venv-protocol/bin/activate && python -m unittest discover -s tests -p 'test_*.py'
```

## Editing the protocol and rebuilding the RFC

[Quick guide: generate the RFC from source](docs/build-rfc.md) — setup, commands, output paths, and local preview.

```sh
python3 -m venv .venv-protocol
. .venv-protocol/bin/activate
python -m pip install -r scripts/protocol-requirements.txt
pnpm protocol:build
```

One build refreshes the conventions, full RFC, images, and ChatGPT/Claude skill
downloads. The full RFC remains at `/protocol/rfc.html` and `/protocol/rfc.md`,
behind the existing password gate. Internal decision records remain excluded.
Commit the sources and generated artifacts together; `pnpm protocol:check`
checks that they agree.

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

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Provenance

The opening figure reproduces page 1 of IRS Form 1040 (2020), a public-domain U.S. government
document. The worked page reproduces Apple's published FY2024 statement of operations with
explanatory overlays. Convention examples pair source images with the expected output the
protocol specifies for them; counter-examples also show the non-conforming output the
convention rules out. Image clearance is recorded in `resources/convention-library/`.
