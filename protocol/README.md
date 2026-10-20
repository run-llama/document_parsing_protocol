# Guideline source of truth

Edit the Markdown sources in this directory.

Numbered folders contain the rules; appendices contain supporting material.
`_attachments/` contains the cleared source images. Their publication decisions
and credits are in `tools/provenance/manifest.json`. The `source` fields record
how each illustration was created or obtained.

## Build all published artifacts

From the repository root, with Python 3.9 or newer:

```sh
python3 -m venv .venv-protocol
. .venv-protocol/bin/activate
python -m pip install -r scripts/protocol-requirements.txt
pnpm protocol:build
```

This lints notes, checks publication clearance, builds `protocol/site/`, then
packages the convention data, images, full RFC, generator/checker skills and
ChatGPT/Claude downloads. Commit both source edits and generated changes.
`protocol/site/` is an ignored intermediate; `public/`, `resources/`, and
`app/data/` contain the deployable artifacts. The Next.js application does not
need Python or the Markdown source tree at runtime.

To build just the intermediate RFC HTML/Markdown (including assets and styles),
run `python protocol/tools/build_site.py --public`. The assembly implementation
is `protocol/tools/build_rfc.py`; its direct CLI refreshes RFC text in the
intermediate directory after the site builder has copied the images and CSS.
`python protocol/tools/build_skills.py --public` refreshes intermediate skills.
Use the full command above to publish those changes to the site's downloads.

## Editing rules

- Preserve permanent `rule_id` values and tags when moving or renaming a note.
- Update its requirement, worked examples, and `skill:generate` / `skill:check`
  comment blocks together. Those blocks generate the assistant instructions.
- Use `[[Note Title]]` links and `![[filename.png]]` image embeds; keep note
  basenames unique. Section numbers are generated.
- Add only public-safe examples, with clearance and any required attribution in
  the provenance manifest. Do not add customer documents or internal decisions.
- Keep original page content and expected Markdown aligned. Teaching additions
  live in `scripts/teaching_cases.py` and `resources/convention-library/teaching-examples.json`.
- URL aliases are in `resources/convention-library/slug-aliases.json`.

## Verification

```sh
pnpm protocol:check
python -m unittest discover -s tests -p 'test_*.py'
python protocol/tools/test_rule_metadata.py
pnpm exec next build --webpack
```

The source revision is a SHA-256 of the canonical source tree, including tools
and images, rather than the enclosing Git HEAD or build date. Rebuilding the
same inputs is reproducible, including outside a Git checkout. `pnpm protocol:check`
rejects stale generated artifacts.
