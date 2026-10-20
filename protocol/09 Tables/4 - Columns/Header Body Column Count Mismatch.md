---
title: Header Body Column Count Mismatch
rule_id: tables-header-body-column-count-mismatch
status: rule
scope: page
tags: [tables, columns, repair]
---

# Header Row and Body Disagree on Column Count

> [!success] ✅ Normative
> Every row of a table MUST carry the full column count. Where the header and the body disagree,
> the short side MUST be padded with empty cells, one per missing position, and MUST NOT be padded
> with a duplicated or invented value.

```text
Header:  | Duration | Factor | Trend |     ← 3 columns
Body:    | 1        | 0.94   |             ← Trend all-blank → body reads as 2
         | 2        | 0.91   |
```

## Header wider than the body

The usual cause is a column whose body is uniform or empty — all `1.000`, all blank, all `—`. The
column MUST be restored as cells, empty where the page prints nothing, and its header label MUST be
kept: a column proven only by its header still exists
([[Barely-Existing Columns and Headers]]).

## Header narrower than the body

The usual cause is a missed span in the header: a group label that carries a `colspan`, or a stub
that takes a `rowspan`. The header's spans SHOULD be re-read against the page before the body is
treated as the side that is short.

## Padding

- Padding MUST be individual empty cells, one per missing position — not a span across the gap. A
  span claims the page merged those cells; it did not, they were simply not printed. The same
  reasoning pads a jagged half cell by cell in [[Triangles and Matrix Tables]].
- Body cells MUST NOT be fabricated or duplicated to reach a count. An empty cell asserts nothing;
  a copied value asserts something false about the page. Where it cannot be decided which side is
  wrong, the output renders the cells that are printed and pads with empty cells rather than guess
  at content.

### ✅ **Sample** — `702`

![[zoo-702.png]]

The header declares four price columns ($2,000–$5,000). Rows like *Corporal Punishment* print
**one merged note** — "Medical Payments Not Available" — spanning all four instead of per-column
values, and parent rows such as *612. Owned Watercraft Liability Coverage* print no values at all:
their four value positions are empty cells. The coverage labels are indented up to three steps.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>Basic Limit Rule#</th> <th>Coverage F - Medical Payments</th> <th>$2,000</th> <th>$3,000</th> <th>$4,000</th> <th>$5,000</th> </tr>
  <!-- … -->
  <tr> <td> </td> <td data-level="2">b. not otherwise classified</td> <td>.58</td> <td>1.15</td> <td>1.73</td> <td>2.30</td> </tr>
  <tr> <td> </td> <td data-level="2">c. Corporal Punishment</td> <td colspan="4">Medical Payments Not Available</td> </tr>
  <tr> <td>611.</td> <td data-level="0">Incidental Low Power Recreational Motor Vehicles</td> <td>.58</td> <td>1.15</td> <td>1.73</td> <td>2.30</td> </tr>
  <tr> <td>612.</td> <td data-level="0">Owned Watercraft Liability Coverage</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td data-level="1">1. Outboard, Inboard or Inboard-Outboard engines or Motors</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td data-level="2">a) Up to 15 feet:</td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td> </td> <td data-level="3">Up to 50 hp.</td> <td>1.73</td> <td>3.45</td> <td>5.18</td> <td>6.33</td> </tr>
  <!-- … -->
</table>
```

</details>

<!-- skill:generate
- Give every row of a table the same number of columns. If the header has more columns than the body prints, keep the header and fill the body positions with empty <td></td> cells.
- Before deciding the body is short, re-check the header for a missing colspan or rowspan.
- Pad with one empty cell per missing position, never with a colspan across the gap, and never copy or invent a value to fill a position.
-->

<!-- skill:check
- FAIL (MUST) if rows of one table have different effective column counts (after rowspan and colspan).
- FAIL (MUST) if a cell holds a value the page does not print at that position (duplicated from a neighbour or invented) to make the counts agree.
- FAIL (MUST) if a header label printed on the page is dropped because its column's body cells are empty.
- WARN (SHOULD) if missing positions are closed with a colspan where the page prints no merged cell.
-->

## Related

- [[Barely-Existing Columns and Headers]] — the all-blank column proven only by its header
- [[Repeated Identical Values]] — the companion rule against emitting less data than was printed
- [[Blank and Spacer Rows]] — empty positions along the other axis
