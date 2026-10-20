---
title: Block Annotation
rule_id: layout-block-annotation
status: rule
scope: page
tags: [rule, layout, blocks]
---

# Block Annotation

> [!success] ✅ Normative
> Every meaningful visible region of a page MUST be one element with one class, one position in the
> page's reading order and — when boxes are requested — one box. Printed content covered by no
> element is dropped content, and makes the output non-conforming.

An element at region level is one coherent visual region — a paragraph, a heading, a list item, a
picture, a table, a caption, a form area. This note fixes what gets an element and how its box is
drawn; the class is chosen by [[Block Classes]] and the order by [[Reading Order]].

## What an element is not

Printed lines, table cells, rows, columns and words MUST NOT be region-level elements. A table is
**one** Table element around the whole table; a picture or chart is **one** Picture element around
the unified graphic. Finer boxes exist only at the granularity that was requested — see
[[Boxes and Granularity]]. Going finer at region level is not more thorough; it is the wrong layer.

## Completeness

- Every region carrying printed content MUST be covered by an element, except the narrow exclusions
  of [[Ignoring and Rejecting]].
- Duplicate elements for one region, and elements for regions that print nothing, MUST NOT appear.

## The box

- A box MUST be the smallest rectangle that contains the complete element.
- A box MUST include all of the element's visible ink: borders, diacritics, superscripts, meaningful
  shadows. Slight extra whitespace is better than clipped content: where the two conflict, the box
  SHOULD err towards whitespace.
- A box MUST NOT extend beyond the page, and boxes SHOULD NOT substantially overlap one another.

## Splitting

- Each paragraph MUST be its own Text element. Separate paragraphs, columns, list items, captions or
  unrelated labels MUST NOT be merged into one element.
- An element MUST be split at a page boundary and at a column boundary.
- A displayed Formula, Picture or Table that interrupts prose MUST split the surrounding prose into
  separate Text elements above and below it.
- Where prose **wraps around a picture**, the prose MUST be split into the fewest elements whose
  non-overlapping boxes each keep complete lines.

### A paragraph continued in the next column

The layout boxes stay split: one box per column piece, as above. A Markdown-attribution
ground truth (the `markdown_attribution` rule) records the paragraph as the **one** element it is
in the Markdown, with a box budget:

- The reference's `regions` MUST be the pieces, one per column (or page), with
  `exception: "multi_column"` (or `"cross_page"`).
- `expected_bbox_count` MUST equal the number of pieces. It is an integer of at least 1, and 1 is
  the default: an engine that claims more boxes than the count scores 0 for that element.
- Each piece SHOULD also be a `spans` entry with its own text and box, so an output that keeps the
  pieces as two paragraphs is still matched.
- Set it only when the text really runs on (no paragraph break at the column foot). Separate
  paragraphs, list items, table rows and formulas keep one box each and the default count.

<!-- skill:generate
- Give every visible region with content its own element: one per paragraph, heading, list item, caption, footnote, picture, table, formula, form area. Never one element per line, cell, row, column or word.
- A table or chart is one element around the whole object.
- Split prose at page and column boundaries, and above and below any displayed formula, picture or table that interrupts it.
- In a markdown_attribution sidecar, a paragraph that runs on into the next column is one reference: regions = its pieces, exception multi_column, expected_bbox_count = number of pieces, pieces also as spans. Everything else keeps the default count of 1.
- When boxes are requested, each box is the smallest rectangle containing all the element's ink, never beyond the page; prefer a little whitespace to clipping.
-->

<!-- skill:check
- FAIL (MUST) if printed content on the page is covered by no element (and is not an allowed exclusion).
- FAIL (MUST) if two separate paragraphs, columns, list items or captions are merged into one element, or one element spans a column or page boundary.
- FAIL (MUST) if a table or picture is split into region-level elements per row, cell, column, line or word.
- FAIL (MUST) if a box clips visible ink of its element or extends beyond the page.
- WARN (SHOULD) if two boxes overlap substantially.
- FAIL (MUST) if a markdown_attribution reference with several regions has an expected_bbox_count different from its number of pieces, or a single-piece element carries a count above 1.
-->

## Related

- [[Block Classes]] — which class each element takes
- [[Block Boundaries]] — where a Picture or Table box stops
- [[Reading Order]] — the position each element takes
- [[Ignoring and Rejecting]] — the only regions allowed no element
- [[Boxes and Granularity]] — finer boxes, when requested
