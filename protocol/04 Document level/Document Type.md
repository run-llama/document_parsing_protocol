---
title: Document Type
rule_id: document-document-type
status: rule
scope: document
tags: [rule, document, layout]
---

# Document Type

> [!success] ✅ Normative
> Whether a document is a slide deck or a paged document, and which sheet is its cover, MUST be
> decided once from the whole document and applied to every page. Only the cover MAY carry a
> **Title** element.

Two decisions change how single pages are read, and neither can be made from one page:

| Decision | How it is recognised | What it changes on every page |
| --- | --- | --- |
| **Slide deck or paged document** | A deck is landscape sheets with one title per sheet, each sheet a self-contained slide. | In a deck every slide title is a top-level heading; in a paged document depth carries over page breaks. See [[Heading Depth Across Pages]]. |
| **Which sheet is the cover** | The title or front page: the document's own name set large, often with authors, a date or a logo, and no body text. | Only the cover carries the **Title** class and the document title. The same words on a later page are page furniture or Text. |

```text
sheet 1  QUARTERLY RESERVING REVIEW       ← cover: Title
sheet 2  Quarterly Reserving Review · 2   ← running header: furniture, not Title
```

## Requirements

- The decisions MUST be made from the document, not from one sheet. A landscape page on its own
  does not make a deck — reports insert landscape tables — and the largest line on sheet 1 is not a
  title if sheet 1 is a transmittal letter.
- A document with **no cover** MUST NOT have a Title element anywhere. The first heading MUST NOT be
  promoted to fill the gap — that is the **never invent** failure.
- The same words printed on a later sheet MUST NOT be a Title element; they are page furniture or
  Text.

## Mixed documents

A report with a slide deck appended, or a deck with printed appendix pages, MUST be decided per
part. The boundary between the parts is where the decision changes, and each decision MUST be
applied to its whole part rather than sheet by sheet.

## A single page

Where only one page is available, neither decision can be made. The page MUST be treated as a paged
document with no cover: no Title element, and any title-sized line rendered as a heading at the
depth the page itself supports.

<!-- skill:generate
- Decide once, from the whole document, whether it is a slide deck (landscape sheets, one title each) or a paged document, and which sheet (if any) is the cover.
- Use the Title class and the top-level document title only on the cover. The same words on later pages are page furniture or plain text.
- If there is no cover, emit no Title at all; never promote the first heading to Title.
- With a single page, treat it as a paged document with no cover and render any large title as a heading at the depth the page supports.
-->

<!-- skill:check
- FAIL (MUST) if a Title element appears on a sheet that is not the document's cover, or on a document with no cover.
- FAIL (MUST) if some pages of one document (or one part of it) are treated as slides, each title top-level, and others as a paged document, without a change of part.
- WARN (SHOULD) if a document with an appended deck or appendix applies one document-type decision across both parts.
-->

## Related

- [[Heading Depth Across Pages]] — the deck exception is decided here and applied there
- [[Recurring Page Furniture]] — a cover may repeat the running title; the cover occurrence is the title
- [[Block Classes]] — the Title class that this decision gates
- [[Slide Furniture]] — what a slide carries besides its title
