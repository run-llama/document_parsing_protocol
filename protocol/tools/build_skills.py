#!/usr/bin/env python3
"""Generate the two agent skills from the rules' skill blocks.

    python3 tools/build_skills.py [--out site/skills] [--public]

  document-protocol-generate/SKILL.md   for a vision model turning page images into conforming
                                        Markdown (and, when asked, a sidecar with boxes)
  document-protocol-check/SKILL.md      for checking pages + Markdown + sidecar against the
                                        protocol: findings by section and a verdict

Each rule contributes its <!-- skill:generate --> and <!-- skill:check --> blocks, prefixed with
its stable rule ID, section number and title. Rules in the appendices and chapter 1 conventions are left out; open
points are included and marked. Also writes a zip per skill and an index.html.
"""
import argparse
import html
import os
import re
import sys
import zipfile
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import protocol as P  # noqa: E402

GEN = 'document-protocol-generate'
CHK = 'document-protocol-check'
EXCLUDED_CHAPTERS = {'A', 'B', 'C', 'D'}

GEN_HEAD = """---
name: {name}
description: Convert a document's pages (PDF pages or page images) into Markdown that conforms to the Document Representation Protocol (working title) — how tables, headings, lists, forms, charts, diagrams and marks on the page are interpreted, and exactly how each is written in Markdown. Optionally also produce a sidecar JSON with a box for every element. Use when asked to parse, transcribe or convert a document to Markdown.
---

# Generate conforming Markdown

Protocol draft {version}. Generated from the protocol's rules; do not edit by hand.

## Task

**Input:** the page images of one document, in order.
**Output:** one Markdown document for the whole document. If the request asks for boxes, also a
sidecar JSON as described under "The Sidecar" below; otherwise Markdown only.

## Procedure

1. Look at the whole document before writing: decide the document type (slide deck or paged
   document), which sheet is the cover, and which top/bottom bands recur as page furniture.
2. Work page by page, element by element in reading order, applying the rules below. Separate
   pages with a line containing only `---`.
3. Where two renderings are allowed, pick one and use it for the whole document.
4. Before answering, re-read each page against your Markdown: nothing printed may be missing, and
   nothing may be added that the page does not print.
5. Output only the Markdown (and the sidecar when asked) — no commentary.

Rules marked *(open point)* are not yet settled; follow their working default.

## Rules
"""

CHK_HEAD = """---
name: {name}
description: Check whether a Markdown rendering of a document — and its sidecar of boxes, when present — conforms to the Document Representation Protocol (working title), given the document's page images. Reports each violation with the stable guideline ID and protocol section it breaks, as FAIL (MUST) or WARN (SHOULD), and an overall conforming / non-conforming verdict. Use when asked to validate, audit or score a parse against the protocol.
---

# Check conformance

Protocol draft {version}. Generated from the protocol's rules; do not edit by hand.

## Inputs

- **Pages:** the document's page images, in order. They are the ground truth.
- **Markdown:** the output to check.
- **Sidecar** (optional): the JSON of elements and boxes. Box checks apply only when a sidecar is
  given or boxes were requested.

## Procedure

1. Split the Markdown into pages at lines containing only `---` and pair each with its page image.
2. For every rule below, test each of its checks against the pages, the Markdown and the sidecar.
   Report a finding only when you can point to the page and the element; never report a rule as
   violated on suspicion.
3. Judge against the page image, never against a text layer or another output.
4. Where the protocol allows two renderings, either conforms; report only a document that mixes them.
5. Checks marked *(open point)* are always WARN.

## Output

Return JSON only:

```json
{{"verdict": "conforming | non-conforming",
 "findings": [{{"rule_id": "tables-repeated-headers-and-title-bands",
               "section": "9.2.8", "rule": "Repeated Headers and Title Bands",
               "severity": "FAIL | WARN", "page": 3,
               "element": "short excerpt of the offending Markdown or a description of the missing content",
               "reason": "one sentence: what the page shows and what the Markdown does instead"}}]}}
```

The verdict is `non-conforming` if and only if at least one finding is `FAIL`.

## Rules
"""


def version():
    return "source " + P.revision()[:12]


def rule_notes(notes):
    return [n for n in notes if n.number and n.chapter not in EXCLUDED_CHAPTERS
            and n.chapter != '1' and n.skills()]


def assemble(notes, kind):
    out, chapter = [], None
    for n in rule_notes(notes):
        text = n.skills().get(kind, '').strip()
        if not text:
            continue
        if n.chapter != chapter:
            chapter = n.chapter
            out.append(f'\n### §{n.chapter} {n.chapter_title}\n')
        flag = ' *(open point)*' if n.status == 'open' else ''
        out.append(f'**§{n.number} {n.title}** (`{n.rule_id}`){flag}\n{text}\n')
    return '\n'.join(out)


def write_skill(outdir, name, head, body):
    d = os.path.join(outdir, name)
    os.makedirs(d, exist_ok=True)
    text = head.format(name=name, version=version()) + body.rstrip() + '\n'
    path = os.path.join(d, 'SKILL.md')
    open(path, 'w', encoding='utf-8').write(text)
    with zipfile.ZipFile(os.path.join(outdir, f'{name}.zip'), 'w', zipfile.ZIP_DEFLATED) as z:
        entry = zipfile.ZipInfo(f'{name}/SKILL.md', (2026, 1, 1, 0, 0, 0))
        entry.compress_type = zipfile.ZIP_DEFLATED
        entry.external_attr = 0o644 << 16
        z.writestr(entry, text.encode('utf-8'))
    return text


def build(outdir, public=False, notes=None, **_):
    if notes is None:
        notes = P.load()
        if public:
            notes = [n for n in notes if not n.internal]
    P.validate_metadata(notes)
    os.makedirs(outdir, exist_ok=True)
    gen = write_skill(outdir, GEN, GEN_HEAD, assemble(notes, 'generate'))
    chk = write_skill(outdir, CHK, CHK_HEAD, assemble(notes, 'check'))
    n_rules = len(rule_notes(notes))
    rows = ''.join(
        f'<tr><td><strong>{name}</strong><br><small>{html.escape(desc)}</small></td>'
        f'<td><a href="{name}/SKILL.md">SKILL.md</a> · <a href="{name}.zip">zip</a></td>'
        f'<td>{len(text.splitlines())} lines</td></tr>'
        for name, desc, text in (
            (GEN, 'Page images → conforming Markdown (sidecar with boxes when asked).', gen),
            (CHK, 'Pages + Markdown + sidecar → findings by section and a verdict.', chk)))
    open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8').write(INDEX.format(
        rows=rows, n=n_rules, version=version()))
    print(f'skills: {n_rules} rules -> {outdir}')


INDEX = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Generated skills</title>
<link rel="stylesheet" href="../style.css"><style>body{{display:block}}main{{max-width:900px;margin:0 auto;padding:40px 24px}}table{{display:table;width:100%}}</style></head>
<body><main><p><a href="../index.html">← Website</a></p>
<h1>Generated skills</h1>
<p>Assembled on {version} from the skill blocks of {n} rules. Install a skill by unzipping it into a
skills directory (for Claude Code: <code>~/.claude/skills/</code>).</p>
<table><tr><th>Skill</th><th>Download</th><th>Size</th></tr>{rows}</table>
</main></body></html>"""


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default='site/skills')
    ap.add_argument('--public', action='store_true')
    a = ap.parse_args()
    out = a.out if os.path.isabs(a.out) else os.path.join(P.VAULT, a.out)
    build(out, a.public)
