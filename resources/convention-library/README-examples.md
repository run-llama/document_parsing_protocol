# Generated convention data

Canonical sources and RFC/skill builders live in [`protocol/`](../../protocol/README.md).
Run `pnpm protocol:build` from this repository with the declared Python dependencies installed.
The source content digest is recorded in `app/data/protocol-snapshot.json`.
URL aliases preserve existing convention routes.

Expected output retains the exact original Markdown in its source view, including captions,
chart markers, indentation and colour. Rendered previews use an allowlist; scripts, event handlers,
remote images and arbitrary CSS are not accepted. Table source is never reconstructed from cells.
Full convention bodies preserve subcases beyond the rule summary. Existing source-image files
are retained because older links and hand-authored studies can still reference them.

Downloads retain their established filenames for compatibility. Their contents now include the
current generator skill, full text-only protocol reference, and checker guidance. Sample images
remain on the website and are explicitly identified as omitted in the text-only reference.
The checker is a review skill, not an automated conformance guarantee.

Internal decision records are excluded from the app and the RFC downloads. The local build always uses the public source pipeline.

Convention pages also surface inline RFC illustrations that are not already in a sample panel,
with their surrounding section context. Worked encodings remain visible alongside image samples.
These views reuse the packaged content; they do not create new ground truth or alter compliance cases.

## Original teaching examples

`teaching-examples.json` supplements the imported RFC data on convention/reference pages
including pages that previously had no source illustration. Run `python3 scripts/build-teaching-examples.py` to regenerate
the original SVG/PNG assets and scenario data. They cover image content, text formatting, tables,
forms, document structure and requested geometry. Some scenarios are shared across related rules,
with a convention-specific explanation; snippets may show alternatives or separate deliverables
when explicitly labeled in the scenario. These examples survive a source sync and do not alter
the RFC, expected-output corpus or compliance scores. No provider report is part of this PR.

## Boundary cases and annotation workflows

The expanded teaching set includes compilable CircuiTikZ circuits, mhchem/chemfig chemistry and a
TikZ floor plan, plus a rasterized service note with measured element/line/word geometry. Additional
cases contrast request options, source visibility, figure placement and formatting boundaries.
The ground-truth appendix pages display step-by-step annotation and QA decisions before examples.
Images covers representation choice; Images and Figures covers integration into page structure.

Generation requires Python with Pillow, macOS Arial fonts under `/System/Library/Fonts/Supplemental`,
`pdflatex` with standalone, circuitikz, chemfig and mhchem, and Poppler `pdftoppm`. These are offline
authoring dependencies only. The deployed site uses the committed PNG/SVG/JSON files and no TeX,
Python or source checkout. The renderer disables shell escape. All generated images were reviewed.
Install `scripts/teaching-requirements.txt` in an authoring environment, then run
`python scripts/build-teaching-examples.py`.

Syntax references: [CircuiTikZ manual](https://circuitikz.github.io/circuitikz/circuitikzmanualgit.pdf),
[chemfig manual](https://tug.ctan.org/macros/latex/contrib/chemfig/chemfig-en.pdf).
