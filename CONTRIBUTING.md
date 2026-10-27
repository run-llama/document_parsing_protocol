# Contributing to the Document Parsing Protocol

DPP is an open protocol. It gets better when people who parse real documents tell us where a rule
is unclear, where it gives the wrong answer, or where a situation has no rule at all. Contributions
of every size are welcome: a typo, a sharper example, a counter-example that breaks a rule, or a
new rule.

## Ways to contribute

| You want to… | Start with |
| --- | --- |
| Propose a new rule, or change what a rule requires | An issue using **Propose a rule**. Requirements are discussed before they are written. |
| Report an example whose expected output looks wrong, or a page that contradicts a rule | An issue using **Report an example problem**, or a PR if the fix is clear. |
| Fix wording, a broken link or a typo | A pull request directly. |
| Improve the website | A pull request, or an issue if it is a larger change. |

If you are unsure, open an issue. A short description of the page you were parsing and the output
you expected is enough to start.

## How the protocol is organised

- `protocol/` is the source of truth: one Markdown file per rule, grouped into numbered chapters
  (`09 Tables/3 - Headers/Multi-Row Header Tiers.md`). Section numbers are generated.
- Each rule file starts with front matter:

  ```yaml
  ---
  title: Multi-Row Header Tiers
  rule_id: tables-multi-row-header-tiers   # permanent; never change it
  status: rule        # rule (✅ Normative) · either (⚖️ Equivalent forms) · open (❓ Open point)
  scope: page         # page (📄 decided from the page alone) · document (📚 needs other pages)
  tags: [tables, headers]
  ---
  ```

- Everything else — the RFC (`public/protocol/`), the guide's data (`app/data/`,
  `public/convention-examples/`), and the ChatGPT and Claude downloads (`public/downloads/`) — is
  generated from `protocol/`. Do not edit generated files by hand.

The detailed authoring conventions (links, image embeds, `skill:generate` blocks, stable IDs) are
in [`protocol/README.md`](protocol/README.md).

## Writing a good rule

A rule is useful when two careful people, given the same page, would produce the same output.

- **State the requirement** in the callout, using MUST, SHOULD and MAY exactly as defined in
  §1.1 Requirements Language. Lower-case "must" states no requirement.
- **Describe the situation** so a reader can recognise it on a page. A short `text` sketch of the
  printed layout helps.
- **Split real sub-cases** into their own headings, each with its own requirement and examples.
- **Show at least one ✅ Sample** (the rule applies) **and, where it exists, one ❌ Counter-sample**
  (it looks like the rule applies and does not, or a rendering got it wrong), each with its
  `Expected Markdown`.
- **List related rules** with one phrase saying why each resolves differently.
- **Check it against the principles**: the output keeps everything the page prints (never drop) and
  adds nothing it does not print (never invent).

## Examples and images

Every image in the protocol is published, so every image must be safe to publish.

- Use **constructed pages** (made up to show the situation) or **public-domain or openly licensed
  documents**, such as U.S. federal government publications.
- **Never** use customer documents, anything confidential, or documents containing personal data.
- Put the image in `protocol/_attachments/` and embed it with `![[filename.png]]`.
- Record it in `protocol/tools/provenance/manifest.json` with its `source`, `source_kind`,
  `attribution` (if the source requires one) and a `decision` of `keep` or `keep_attrib`. Only those
  two decisions pass the build check.
- Keep the page content and the expected Markdown aligned: transcribe what the page prints,
  typos included.

## Building and checking

First-time setup (Python 3.9+ and pnpm):

```sh
pnpm install
python3 -m venv .venv-protocol
. .venv-protocol/bin/activate
python -m pip install -r scripts/protocol-requirements.txt
```

After editing anything under `protocol/`:

```sh
. .venv-protocol/bin/activate
pnpm protocol:build                                  # lint, clear images, rebuild everything
python -m unittest discover -s tests -p 'test_*.py'
python protocol/tools/test_rule_metadata.py
```

Commit your source edits **and** the regenerated files in `app/data/`, `resources/` and `public/`
together. After committing, `pnpm protocol:check` rebuilds and fails if anything is out of date.
See [`docs/build-rfc.md`](docs/build-rfc.md) for output locations and a local preview of the RFC.

For changes to the website:

```sh
pnpm dev                       # http://localhost:3000
npx tsc --noEmit
pnpm exec eslint app
pnpm exec next build --webpack
```

The site uses a recent Next.js release with breaking changes; read [`AGENTS.md`](AGENTS.md) before
changing framework code.

## Pull requests

- Keep each PR to one change: one rule, one example, or one site improvement.
- Say which rule(s) it affects, by section number and `rule_id`.
- For a change to a requirement, link the issue where it was discussed.
- Include the checks you ran.

## Licensing of contributions

By submitting a contribution, you agree that it is licensed under the licenses of this repository:
code under the [MIT License](LICENSE), and protocol text, examples and constructed images under
[CC BY 4.0](LICENSE-docs). You must have the right to submit it, and any third-party material must be
public domain or openly licensed and recorded in the provenance manifest. See [NOTICE](NOTICE) for
material that keeps its own license.

## Conduct

Be kind and assume good faith. Critique rules and outputs, not people.
