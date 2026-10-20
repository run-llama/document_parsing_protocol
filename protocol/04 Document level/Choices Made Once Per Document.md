---
title: Choices Made Once Per Document
rule_id: document-choices-made-once-per-document
status: rule
scope: document
tags: [rule, document, either]
---

# Choices Made Once Per Document

> [!success] ✅ Normative
> Where the protocol accepts two renderings of a situation, the rendering chosen at the first page
> that forces the choice MUST be used on every later page of the same document. A document MUST NOT
> mix the accepted renderings of one situation.

An ⚖️ rule accepts either of two renderings. Accepting either does not mean switching between them:
a document whose units rows are header rows on page 3 and folded into labels on page 7 is
non-conforming, even though each page on its own conforms.

## The choices

| Choice | The two renderings | Rule |
| --- | --- | --- |
| Units line under a header | second header row · folded into the label above | [[Units Row]] |
| Printed blank row | kept · left out | [[Blank and Spacer Rows]] |
| Full-width band inside a grid | spanning header cell · spanning body cell | [[Bands Inside the Grid]] |
| Section-divider row | bold `<td>` · `<th>` | [[Titles Banners Captions]] |
| Totals block with no frame either way | footer rows · its own key-value table | [[Bottom Edge Totals and Islands]] |
| Gantt bar edge on a period tick | last period filled · tick reached | [[Gantt and Sankey Charts]] |

- Where a rule names a default rendering, the output SHOULD use the default, unless an earlier page
  of the same document already used the other rendering; in that case the output MUST keep the
  earlier one.
- The choice holds for the situation, not for the page: two pages that both print a units line
  MUST render it the same way, however far apart they are.

## A single page

Where only one page of a document is available, the output SHOULD use the rule's default, and MUST
be consistent within that page. Consistency with the rest of the document cannot be judged until
the other pages are available.

<!-- skill:generate
- Where two renderings are both acceptable (units row as header row or folded into the label, blank rows kept or dropped, a full-width band as header or body cell, a divider row as bold <td> or <th>, an unframed totals block as footer rows or a separate key-value table), pick one at the first page that needs it and use the same one on every later page.
- If a default is named and nothing earlier in the document chose otherwise, use the default.
-->

<!-- skill:check
- FAIL (MUST) if the same situation (units line, blank row, full-width band, divider row, unframed totals block, Gantt edge) is rendered one accepted way on one page and the other accepted way on another page of the same document.
- WARN (SHOULD) if a single-page output uses the non-default rendering of an either-way situation.
-->

## Related

- [[Accepted Alternatives]] — the full list of renderings that are equal for conformance
- [[Recurring Page Furniture]] — the other decision made once and applied to every page
- [[Conformance]] — why mixing two accepted renderings is non-conforming
