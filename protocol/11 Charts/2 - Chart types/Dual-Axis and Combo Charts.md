---
title: Dual-Axis and Combo Charts
rule_id: charts-dual-axis-and-combo-charts
status: rule
scope: page
tags: [charts, types]
---

# Dual-Axis and Combo Charts

> [!success] ✅ Normative
> Bars and lines on one canvas, or a second value axis, change only how values are **read**: each
> series' values MUST be copied or estimated against **its own** axis. The chart table is laid out
> as usual — one row per x position, one column per series — and a series name MUST NOT gain its
> mark type or axis side (no `(line)`, no `right axis`).

Before a value is estimated, the axis that scales its series is identified — from the legend order,
the mark type and the magnitudes of each axis's tick labels — and the value is traced to that axis.
A percentage series scaled by the right-hand axis read against the level axis on the left is a
wrong value, however plausible it looks.

### ✅ **Sample** — `industrial-group-financial-report-2024_p15`

![[chart-eps-combo.png]]

Two bar series in euros and a percentage line share one canvas; no value axis is drawn, and every
mark prints its value, so every cell is copied rather than read. Full coverage is 15 values under
the legend entries, copied whole (`Earnings per share (EUR)` keeps the parenthesis printed inside
the legend). The chart prints decimal commas (`2,08`, `48,1%`), and the cells keep them. The
earnings values are printed in bold.

<details>
<summary>Expected Markdown</summary>

```markdown
March 26, 2025, the Management Board will propose a dividend of 2.60 EUR per share (2023: 2.50 EUR) for the 2024 financial year. This is equal to a payout ratio of 51.8% (2023: 48.5%).

<table data-source="chart">
  <tr> <th></th> <th>Earnings per share (EUR)</th> <th>Dividend per share (EUR)</th> <th>Payout ratio</th> </tr>
  <tr> <td>2020</td> <td><strong>2,08</strong></td> <td>1,00</td> <td>48,1%</td> </tr>
  <tr> <td>2021</td> <td><strong>3,28</strong></td> <td>1,65</td> <td>50,3%</td> </tr>
  <tr> <td>2022</td> <td><strong>4,14</strong></td> <td>2,10</td> <td>50,7%</td> </tr>
  <tr> <td>2023</td> <td><strong>5,15</strong></td> <td>2,50</td> <td>48,5%</td> </tr>
  <tr> <td>2024</td> <td><strong>5,02</strong></td> <td>2,60</td> <td>51,8%</td> </tr>
</table>
```

</details>

<!-- skill:generate
- On a chart with two value axes, find which axis scales each series (legend order, mark type, tick magnitudes) and read every unprinted value against that axis only.
- Lay the table out as usual: one row per x position, one column per series named exactly as the legend prints it; never add "(line)", "(bars)" or "right axis" to a name.
- Copy printed values exactly, including decimal commas and percent marks.
-->

<!-- skill:check
- FAIL (MUST) if a value of a series scaled by one axis matches a reading against the other axis instead of its own.
- FAIL (MUST) if a series name carries a mark type or axis side that its legend entry does not print.
- FAIL (MUST) if a printed value on a combo chart is not copied exactly (e.g. "48,1%" written as "48.1").
-->

## Related

- [[Stacked Bars and Waterfalls]] — a marker series on a second axis riding on a waterfall
- [[Labels]] — legend text verbatim, mark types never
- [[Line Charts]] — the line half on its own canvas
- [[Legend and Overlay Values]] — charts where only some series print their values
