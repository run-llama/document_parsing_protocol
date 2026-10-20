---
title: Duplicated Tables
rule_id: tables-duplicated-tables
status: rule
scope: page
tags: [tables, fidelity]
---

# Page Prints the Same Table Twice

> [!success] ✅ Normative
> Every printed occurrence of a table MUST be rendered, in reading order, each as its own table —
> including a table the page prints twice. Transcription is not summarisation: page content MUST
> NOT be deduplicated.

```text
Page prints:                    Non-conforming:
[Table X]  …  [Table X again]   [Table X]     ← second copy silently dropped
```

## Requirements

- Identical repeats MUST NOT be collapsed into one, and the second copy MUST NOT be replaced with a
  note that it repeats the first (**never drop**).
- Duplication MUST be judged from the rendered page. A table seen once on the page is there once,
  whatever the underlying text layer says (**never invent**).

## The trap

A PDF's text layer can carry a phantom second copy of a run — from a shadow effect, an overprint, or
a quirk of whatever generated the file — that never appears on screen. Judged from extracted text
rather than from the page as rendered, a duplicate can be "found" that does not exist, or two
visually identical blocks can be missed as both printed.

The rule that resolves it is the one in [[Cell Text Fidelity]] and
[[The Page Is the Ground Truth]]: **the image is the authority, the text layer is a hint.**

## Repeated template is not duplication

Blocks with an identical header schema but different numbers are separate tables with real,
distinct content — not copies. Three panels of the same shape showing 89%/11%, 100%/0% and so on are
three tables, and none of them is a duplicate of another. The data, not the layout, decides.

### ❌ **Counter-sample** — `about-disclosures-order-routing-2005q2`

![[zoo-about-disclosures-order-routing-2005q2.png]]

Three NYSE/AMEX/NASDAQ tables with an identical header schema — but distinct data (89%/11% vs
100%/0%). A repeated **template**, not a duplicate: all three are rendered. The `Total Customer
Orders` rows are bold.

<details>
<summary>Expected Markdown · excerpt, table 1 of 3</summary>

```markdown
<table>
  <caption><strong>NYSE</strong></caption>
  <tr> <th>ORDERS ROUTED TO</th> <th>NON DIRECTED ORDERS \*</th> <th>MARKET ORDERS \*</th> <th>LIMIT ORDERS \*</th> <th>OTHER ORDERS \*</th> <th>MATERIAL ASPECTS OF RELATIONSHIP</th> </tr>
  <tr> <td>Merevald Bay Securities Inc.</td> <td>100.0 %</td> <td>89 %</td> <td>11 %</td> <td>0 %</td> <td>Parent Company</td> </tr>
  <tr> <th data-level="0"><strong>Total Customer Orders</strong></th> <td><strong>100.0</strong></td> <td><strong>89 %</strong></td> <td><strong>11 %</strong></td> <td><strong>0 %</strong></td> <td> </td> </tr>
</table>

\* as percentage (%) of total orders

<!-- … -->
```

</details>

<!-- skill:generate
- If the page visibly prints the same table twice, output it twice, each in its reading-order position.
- Judge duplication from the page image only; never add a copy that appears only in the text layer, and never drop one that is printed.
- Tables with the same headers but different values are separate tables; output each.
-->

<!-- skill:check
- FAIL (MUST) if a table printed twice on the page appears only once in the Markdown.
- FAIL (MUST) if the Markdown contains a second copy of a table that the page image shows once.
-->

## Related

- [[Cell Text Fidelity]] — the image wins over the text layer
- [[Chart With a Printed Data Grid]] — the reverse error: a reconstructed copy the page never printed
- [[Never Drop, Never Invent]] — the two failures this rule guards against
