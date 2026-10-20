---
title: Chart With a Printed Data Grid
rule_id: tables-chart-with-a-printed-data-grid
status: rule
scope: page
tags: [tables, charts, orientation]
---

# Chart With a Printed Axis/Data Grid

> [!success] ✅ Normative
> When a chart prints its data grid beside or beneath the canvas, the output MUST render that grid
> exactly as printed — same orientation, same headers, same row order — and MUST NOT render any
> other table for the chart.

Some charts print their numbers as a small grid next to the canvas: a bar chart with bucket-columns
× metric-rows underneath, for example. That printed grid is often **transposed** relative to the
`[Category, Value]` shape a chart is usually reasoned about in.

```text
Printed under the bar chart:            Transposed reconstruction — non-conforming:
| Metric   | $0–1k | $1k–5k | $5k+ |    | Bucket | Avg Premium |
| Avg Prem | 412   | 388    | 351  |    | $0–1k  | 412         |
                                        | $1k–5k | 388         |
```

## Requirements

- The table representing the chart MUST open with `<table data-source="chart">`, including when
  its values come from the printed grid.
- The grid MUST be transcribed in its **printed orientation**. Metrics that run across the top stay
  across the top.
- The grid MUST NOT be transposed, and its rows and columns MUST NOT be reordered into a more
  natural shape.
- The output MUST NOT add a second, reconstructed version alongside it. One grid is printed; one
  grid is rendered.
- Values MUST NOT be re-keyed off the chart canvas — bars, points and axis ticks are not the
  source. Only what is printed as text in the grid counts.

A transposed version is non-conforming even when it reads better, in the same way that rewriting a
cell's text is non-conforming.

## Why as printed

This is the verbatim posture the whole protocol takes: transcribe what is on the page, do not
improve it (see [[Cell Text Fidelity]], [[Accounting Number Formats]]). A second reconstructed copy
also creates the duplication described in [[Duplicated Tables]] and [[Titles Banners Captions]] —
two tables where the page printed one (**never invent**).

### ✅ **Sample** — two charts with their grids beneath

![[bag-pharma-data-grid.png]]

Each chart prints a four-row grid under its bars — one row per series, one column per quarter,
with the year as a spanning row between the quarters and the values. The grid is the rendering; the
bars are not re-keyed.

<details>
<summary>Expected Markdown · excerpt, the left chart</summary>

```markdown
## *Aeronyl*

11% growth at CER to $329m in Q1 2026

<table data-source="chart">
  <tr> <th> </th> <th>Q1</th> <th>Q2</th> <th>Q3</th> <th>Q4</th> <th>Q1</th> <th>Q2</th> <th>Q3</th> <th>Q4</th> <th>Q1</th> </tr>
  <tr> <th> </th> <th colspan="4">2024</th> <th colspan="4">2025</th> <th>2026</th> </tr>
  <tr> <td>EM</td> <td>68</td> <td>59</td> <td>72</td> <td>66</td> <td>91</td> <td>82</td> <td>96</td> <td>87</td> <td>109</td> </tr>
  <tr> <td>ERoW</td> <td>13</td> <td>18</td> <td>17</td> <td>19</td> <td>21</td> <td>23</td> <td>25</td> <td>26</td> <td>28</td> </tr>
  <tr> <td>Europe</td> <td>28</td> <td>32</td> <td>34</td> <td>39</td> <td>41</td> <td>43</td> <td>47</td> <td>51</td> <td>60</td> </tr>
  <tr> <td>US</td> <td>98</td> <td>112</td> <td>133</td> <td>139</td> <td>139</td> <td>138</td> <td>156</td> <td>143</td> <td>140</td> </tr>
</table>
```

</details>

<!-- skill:generate
- When a chart prints a grid of its numbers beside or under it, render that grid as one HTML <table data-source="chart"> exactly as printed: same orientation, same header rows in the same order, same row order.
- Do not transpose the grid, do not add a second reconstructed table for the chart, and do not read values off the bars or axis.
-->

<!-- skill:check
- FAIL (MUST) if the table representing a chart's printed data grid lacks data-source="chart" on its opening <table> tag.
- FAIL (MUST) if a chart's printed data grid is transposed or its rows or columns are reordered in the Markdown.
- FAIL (MUST) if the Markdown has a second table for a chart whose data grid is already printed and rendered.
- FAIL (MUST) if a value in the chart's table does not appear as printed text in the grid.
-->

## Related

- [[Rotated and Diagonal Content]] — orientation is preserved there too
- [[Duplicated Tables]] — a reconstructed copy is a duplicate the page did not print
- [[Cover Every Data Point]] — the chart table used when a chart prints no grid
