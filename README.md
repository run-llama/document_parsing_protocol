# Document Parsing Protocol (DPP)

A protocol for truthful, AI-friendly interpretation of documents. DPP defines shared conventions
for turning a page into structured Markdown: what to keep, how to write it down, and how to stay
honest about what the page does not settle. Every rule comes with real pages beside the output it
expects.

Working draft 0.1 · 140 rules · an open project — [contributions welcome](CONTRIBUTING.md).

## Read it

- **The guide** (`/guide` on the site) — every rule on its own page, in RFC order: the requirement,
  each part of the rule with real pages beside their expected output, and how it differs from its
  neighbours.
- **The full RFC** — [`public/protocol/rfc.md`](public/protocol/rfc.md), also served at
  `/protocol/rfc.html`.
- **Use it with an assistant** — the Claude skill and the ChatGPT reference under
  [`public/downloads/`](public/downloads/), described on the site under "Try it".

## Contribute

DPP gets better when people who parse real documents tell us where a rule is unclear, wrong or
missing. Propose a rule, report an example, or fix wording: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Repository layout

| Path | What it is |
| --- | --- |
| `protocol/` | The protocol source: one Markdown file per rule, grouped by chapter. Edit these. |
| `protocol/tools/` | Lint, image clearance, and the RFC and skill builders. |
| `scripts/sync-protocol.py` | Builds the RFC, the guide's data, images, and the ChatGPT/Claude downloads from `protocol/`. |
| `app/` | The Next.js site. Rule pages are built from the RFC section of each rule (`app/_site/rfc-parse.ts`). |
| `app/data/`, `public/convention-examples/`, `public/protocol/` | Generated. Do not edit by hand. |
| `resources/convention-library/` | Example provenance, teaching examples, and URL aliases used by the build. |
| `resources/dpp-parse/`, `public/downloads/` | The starter skill sources and the generated downloads. |

## Site map

| Route | What it is |
| --- | --- |
| `/` | Opening example (IRS Form 1040), the rule index, Try it, draft status |
| `/guide` | The protocol at a glance: principles, chapters, common cases |
| `/guide/<slug>` | One page per rule |
| `/example` | Walkthrough: Apple's FY2024 statement of operations with eight parsing decisions |
| `/practice` | Short exercises built from the look-alike pairs |
| `/protocol/rfc.html`, `/protocol/rfc.md` | The full RFC |

## Development

Requires Node.js with pnpm, and Python 3.9+ for the protocol build.

```sh
pnpm install
pnpm dev            # http://localhost:3000
```

Checks:

```sh
npx tsc --noEmit
pnpm exec eslint app
pnpm exec next build --webpack
. .venv-protocol/bin/activate && python -m unittest discover -s tests -p 'test_*.py'
```

The site needs no environment variables and can be deployed as a standard Next.js app.

## Editing the protocol

```sh
python3 -m venv .venv-protocol
. .venv-protocol/bin/activate
python -m pip install -r scripts/protocol-requirements.txt
pnpm protocol:build
```

One build lints the rules, checks image clearance, and refreshes the guide's data, the full RFC,
images, and the ChatGPT/Claude downloads. Commit the sources and generated artifacts together;
`pnpm protocol:check` confirms they agree. See [docs/build-rfc.md](docs/build-rfc.md) for output
locations and a local preview, and [protocol/README.md](protocol/README.md) for authoring
conventions.

## License

- **Code** — [MIT](LICENSE).
- **The protocol and its examples** — [CC BY 4.0](LICENSE-docs): use, adapt and build on it,
  including commercially, with credit to "Document Parsing Protocol, LlamaIndex".
- Some material keeps its own status: constructed teaching illustrations (CC0), U.S. federal
  documents (public domain), and Apple's financial statements on `/example` (third-party
  copyright). See [NOTICE](NOTICE).
- The LlamaIndex name and logos are trademarks and are not covered by either license.
