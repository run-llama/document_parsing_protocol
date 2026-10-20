---
title: Ground Truth — Tables 4-8
tags: [ground-truth]
---

# Ground Truth — Tables 4-8

Working steps for annotators producing ground truth for tables: columns, rows and cells, cell
values, titles and edges, and special table types. Each step serves the rule it links to; the rule
decides what the output is.

## Structure before styling

1. Read the table's structure first — rows, columns, header tiers — ignoring weight and slant. Then
   go cell by cell and mark bold, italic and underline only where the glyphs show it.
   → [[Bold and Italic Inside Tables]]
2. Read each row's level from where its label starts in the stub, never from the numbers. →
   [[Row-Label Hierarchy]]
3. Where a total's printed indent contradicts the grouping it sums, keep the printed level and add a
   review note describing the conflict. → [[Total and Subtotal Rows]]

## Evidence, not eyeballing

4. For a column of identical values, extract the word boxes and read their coordinates: one
   occurrence means a `rowspan`, distinct positions mean separate cells. → [[Repeated Identical Values]]
5. Settle a disputed digit from a zoomed crop or the word coordinates, never from the text layer. →
   [[Cell Text Fidelity]]
6. Decide from the image which glyphs are printed and which are handwritten or stamped. →
   [[Handwriting and Stamps]]
7. After finding one struck-through cell, re-check the whole column at zoom. Flagging a redline
   table is done in addition to that check, never instead of it. → [[Struck and Replaced Values]]

## Flag for review

8. Flag any page where a header/body column-count mismatch was repaired by padding with empty
   cells. → [[Header Body Column Count Mismatch]]
9. Flag pages whose icon vocabulary needed a judgement call. → [[Marks and Symbols in Cells]]
10. Where a table's frame is ambiguous (what belongs at its bottom edge), flag the page and record
    the encoding chosen for the document. → [[Bottom Edge Totals and Islands]]
11. Record once per document whether section-divider bands are bold `<td>` or `<th>`, and apply it
    on every page. → [[Titles Banners Captions]]
12. Place a footnote by its marker, not by where the frame happens to be drawn. →
    [[Footnotes Inside the Frame]]

## Older annotations

13. A `$` kept in its own column track as a spanned pair in an existing annotation is not wrong and
    need not be redone; new work puts the symbol in the value's cell. → [[Gutter Columns]]

## Related

- [[About the Examples]] — how the worked examples in these rules were produced
- [[The annotation QA checklist]] — the checks run before a page is published
