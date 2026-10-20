---
title: Accepted Alternatives
tags: [equivalence, conformance]
---

# Accepted Alternatives

Situations where a page **genuinely admits two renderings**. Both conform. The middle column is
the canonical form a producer SHOULD emit; the right column is also conforming, and a checker MUST
treat the two as equal. Within one document, a producer MUST use one of them throughout — see
[[Choices Made Once Per Document]].

| Situation | Canonical rendering | Also conforming |
| --- | --- | --- |
| Continuation blocks | separate tables, headers copied | stacked as a single table; the source-printed wide grid is also accepted when blocks share one enclosing frame |
| Blank space beside a header label | **unmerged blank cells** | rowspan/colspan onto the label |
| Empty region inside a body | either | leading empty `<td>`s ≡ one blank `colspan`/`rowspan` block |
| Purely blank spacer rows | the real ones rendered | presence ≡ absence |
| Currency glyph | one cell, `$ 277.09` | `$`-gutter colspan pair |
| Marker gutters `(i)`/`(ii)` | own column | merged "(i) text" cell |
| Section-divider rows | bold body row | `<th>` |
| Bullet list in a cell | `<ul><li>` | `<br/>•` |
| Line break inside a label | `<br/>` if deliberate, flat if incidental | either, when the page cannot settle it |
| Label and value in one cell | — | split across two existing columns |
| Totals block with no framing signal either way | — | footer rows ≡ its own key-value table |

## Visually identical characters

These pairs never count as a difference in text:

- µ (U+00B5) ≡ μ (U+03BC)
- non-breaking hyphen (U+2011) ≡ hyphen-minus (U+002D)
- minus sign (U+2212) ≡ hyphen-minus (U+002D) — hyphen-minus is canonical
- figure and en dashes ≡ hyphen in numeric ranges
- non-breaking space ≡ space

The equivalence governs comparison only. A producer SHOULD transcribe the character the page
prints and MUST NOT substitute a "cleaner" code point.

## The costly one

**Blank space beside a header label** matters most, because the two renderings claim different
things about the page. The canonical rendering is unmerged blank cells; a span SHOULD be extended
only where the page shows a genuinely merged cell — see [[Barely-Existing Columns and Headers]].

## HTML table sections

`thead`, `tbody` and `tfoot` wrappers, or their absence, are equivalent. Rows MUST stay in printed
order and `th`/`td` MUST be decided per cell; a total MUST NOT move to fit a wrapper. See
[[Total and Subtotal Rows]].

## Related

- [[Conformance]] — how equivalent forms are judged
- [[Choices Made Once Per Document]] — one form per document
