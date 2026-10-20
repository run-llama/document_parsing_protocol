---
title: Units Row
rule_id: tables-units-row
status: either
scope: page
tags: [tables, headers]
---

# Units Row Under the Header

> [!info] ⚖️ Equivalent forms
> A units line under the header MAY be rendered as a **second header row**, or folded into the
> header label above it ("Premium ($000)"). Both forms conform, and a document MUST use one of them
> throughout (see [[Choices Made Once Per Document]]). A units line MUST NOT become the first body
> row.

```text
| Premium | Losses | Ratio |
| ($000)  | ($000) | (%)   |   ← units line: a header tier, or folded into
| 1,204   | 887    | 73.6  |     the labels as "Premium ($000)"
```

## Recognising it

A units line sits directly beneath the header, carries no values, and repeats the same kind of
token across the columns — `($000)`, `(%)`, `(millions)`, `(points)`. Every entry describes how to
read the column below it rather than reporting a measurement.

### ✅ **Sample** — `P200509160137_0137_6519`

![[zoo-P200509160137_0137_6519.png]]

A `（點） (Points)` / `（百分率） (%)` row under the main header states units, not data; here it is kept
as a second header row.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>2005年Q2指數 Index for Q2 2005</th> <th colspan="2">2005年Q2與2005年Q1比較 Q2 2005 compared with Q1 2005</th> <th colspan="2">2005年Q2與2004年Q2比較 Q2 2005 compared with Q2 2004</th> <th colspan="2">2005年Q1至Q2與2004年Q1至Q2比較 Q1-Q2 2005 compared with Q1-Q2 2004</th> </tr>
  <tr> <th> </th> <th>（點） (Points)</th> <th>（點） (Points)</th> <th>（百分率） (%)</th> <th>（點） (Points)</th> <th>（百分率） (%)</th> <th>（點） (Points)</th> <th>（百分率） (%)</th> </tr>
  <tr> <th colspan="8">服務行業 Service Industry</th> </tr>
  <tr> <td><strong>批發/零售 Wholesale/Retail</strong></td> <td>102.3</td> <td>-1.1</td> <td>-1.1</td> <td>+7.2</td> <td>+7.6</td> <td>+7.2</td> <td>+7.5</td> </tr>
  <tr> <td><em>細分 breakdown</em>：批發 Wholesale</td> <td>81.7</td> <td>+1.3</td> <td>+1.6</td> <td>+6.6</td> <td>+8.8</td> <td>+4.8</td> <td>+6.3</td> </tr>
  <!-- … -->
</table>
```

</details>

## The two conforming forms

**Second header row.** The line is kept as its own header row, aligned to the columns it describes,
and the values below stay bare. This is closest to what is printed.

**Folded into the label.** The unit is appended to the header text — "Premium ($000)". This is the
most useful for downstream extraction, because the unit travels with the field. It does edit the
header string, which sits awkwardly beside the verbatim posture of [[Cell Text Fidelity]], so the
second header row SHOULD be preferred when a document uses units lines heavily.

## The outcome to avoid

A units line MUST NOT be rendered as a body row. It is not merely inelegant: a reader of the first
body row then gets `($000)` as a premium value. Where the choice between the two conforming forms
is unclear, the second header row is the default.

### ✅ **Sample** — a units row in the middle of the body

![[bag-units-mid-body.png]]

`S$'m` under the header, then a second units line — `S$` in every column — printed mid-table before
the `Per share` block. A units line between two blocks of body is a **band row**: every cell a
`<th>`, the `S$` cells included, never a body row and never a table split. Both units lines are
italic.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Year 2025</th> <th>Year 2024</th> <th>4th Qtr 2025</th> <th>3rd Qtr 2025</th> <th>4th Qtr 2024</th> </tr>
  <tr> <th> </th> <th><em>S$'m</em></th> <th><em>S$'m</em></th> <th><em>S$'m</em></th> <th><em>S$'m</em></th> <th><em>S$'m</em></th> </tr>
  <tr> <td><strong>For the period</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>Income before operating expenses</td> <td>3,884</td> <td>3,412</td> <td>1,002</td> <td>944</td> <td>931</td> </tr>
  <!-- … -->
  <tr> <th data-level="0">Total assets</th> <td>144,110</td> <td>146,290</td> <td>144,110</td> <td>142,860</td> <td>146,290</td> </tr>
  <tr> <th> </th> <th><em>S$</em></th> <th><em>S$</em></th> <th><em>S$</em></th> <th><em>S$</em></th> <th><em>S$</em></th> </tr>
  <tr> <td><strong>Per share</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>Basic earnings excluding goodwill amortisation<sup>2/</sup></td> <td>0.84</td> <td>0.86</td> <td>0.92</td> <td>0.70</td> <td>0.67</td> </tr>
  <tr> <td>Basic earnings<sup>2/</sup></td> <td>0.66</td> <td>0.75</td> <td>0.72</td> <td>0.51</td> <td>0.57</td> </tr>
  <tr> <td>Diluted earnings<sup>2/</sup></td> <td>0.64</td> <td>0.71</td> <td>0.70</td> <td>0.49</td> <td>0.55</td> </tr>
  <tr> <td>Dividend</td> <td>0.28</td> <td>0.28</td> <td>0.14</td> <td>–</td> <td>0.14</td> </tr>
  <tr> <td>Net asset value at period-end</td> <td>9.12</td> <td>8.65</td> <td>9.12</td> <td>8.90</td> <td>8.65</td> </tr>
</table>
```

</details>

<!-- skill:generate
- Render a line of units printed directly under a table's header ($000, (%), S$'m…) either as a second header row of <th> cells aligned to its columns, or folded into each header label as "Premium ($000)"; use the same choice for the whole document, and prefer the header row.
- Never render a units line as a body row.
- A units line printed mid-table between two blocks of rows is a row of <th> cells; do not split the table there.
-->

<!-- skill:check
- FAIL (MUST) if a units line printed under a header is rendered as a body row of <td> cells.
- FAIL (MUST) if a units line printed mid-table splits the table into two.
- WARN (SHOULD) if one document keeps units lines as header rows in some tables and folds them into the labels in others.
-->

## Related

- [[Multi-Row Header Tiers]] — the header rows a units line sits among
- [[Header Wrap vs Real Tier]] — a units token stacked inside one label is part of a wrap
- [[Accounting Number Formats]] — the values the units describe stay verbatim
