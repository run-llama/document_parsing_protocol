---
title: The Sidecar
rule_id: output-the-sidecar
status: rule
scope: document
order: 4
tags: [output, output-model, boxes, sidecar]
---

# The Sidecar

> [!success] ✅ Normative
> When boxes are requested, the output MUST include a sidecar: a structured file that lists, page by
> page, every element with its class, its Markdown and its box. The sidecar is the source the
> Markdown is rendered from; the Markdown MUST be exactly the concatenation of the sidecar's element
> Markdown in reading order, each element preceded by its inline box anchor, with pages joined as [[Markdown Rendering]] requires.

The sidecar is secondary to the rest of this protocol: the rules that matter are how the document
is interpreted and rendered, and what a box covers. This note fixes only what a sidecar must carry.
Its encoding is the page-and-items structure LlamaParse already returns, normalised.

## Contents

| Level | Carries |
| --- | --- |
| Document | its pages, in order |
| Page | 1-based page number; page width and height; printed page number when requested — see [[Printed Page Numbers]]; `line_numbers` when requested — see [[Pleading Line Numbers]] |
| Element | class — see [[Elements]]; its Markdown; its box; finer boxes at the requested granularity |
| Box | `x`, `y`, `w`, `h` in the page's coordinate space, origin top-left |
| Table element | additionally `continuesFromPreviousPage` and `continuesOnNextPage`, booleans — see [[Cross-Page Tables]] |
| Finer box | as a box, plus the character range of the element's Markdown it covers (`startIndex`, `endIndex`, end exclusive, counted in the element's Markdown including its syntax) |

```json
{"page": 3, "width": 612, "height": 792, "printedPageNumber": "iv",
 "items": [{"type": "Section-header", "md": "## 9.2 Pressure",
            "bBox": {"x": 72, "y": 80, "w": 200, "h": 18},
            "layoutAwareBbox": [{"x": 72, "y": 80, "w": 200, "h": 18, "startIndex": 3, "endIndex": 15}]}]}
```

- Every element of the Markdown MUST correspond to one sidecar item, and every item to one element.
- Character ranges MUST point into the element's own Markdown, so any span of the Markdown resolves
  to a box.

## Boxes in the Markdown itself

When boxes are requested, the Markdown MUST also carry each element's box inline, so that a single
Markdown file is traceable on its own: each element is preceded by an HTML comment anchor holding
the same box as the sidecar.

```markdown
<!-- el p=3 x=72 y=80 w=200 h=18 -->
## 9.2 Pressure
```

The anchors are invisible when rendered and are stripped when the Markdown is given to a model that
does not need them. When boxes are not requested, the Markdown carries no anchors.

<!-- skill:generate
- Only when boxes are requested: also return a sidecar JSON listing, per page (page number, width, height), every element in reading order with its class ("type"), its exact Markdown ("md") and its box ("bBox": x, y, w, h in page units, origin top-left); finer boxes go in "layoutAwareBbox" with startIndex/endIndex into that element's md.
- The Markdown must equal the sidecar's md values concatenated in order, pages separated by ---, with each element preceded by its box as an HTML comment anchor, <!-- el p=PAGE x=X y=Y w=W h=H -->, holding the same box as the sidecar.
-->

<!-- skill:check
- FAIL (MUST) if boxes were requested and there is no sidecar, or the sidecar's md values in order do not reproduce the Markdown.
- FAIL (MUST) if a Markdown element has no sidecar item or a sidecar item has no Markdown element.
- FAIL (MUST) if a finer box's startIndex/endIndex fall outside its element's md.
- FAIL (MUST) if boxes were requested and an element's inline <!-- el … --> anchor is missing or does not match its sidecar box.
-->

## Related

- [[Boxes and Granularity]] — what the boxes cover and how fine they go
- [[Traceability]] — why every element is traced
- [[Printed Page Numbers]] — the page-level printed number
