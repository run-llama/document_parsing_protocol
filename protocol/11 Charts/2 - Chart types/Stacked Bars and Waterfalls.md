---
title: Stacked Bars and Waterfalls
rule_id: charts-stacked-bars-and-waterfalls
status: rule
scope: page
tags: [charts, types]
---

# Stacked Bars and Waterfalls

> [!success] ✅ Normative
> A stacked segment's value MUST be the segment's **own span** — the size it draws between its two
> boundaries — never the cumulative height at its top edge. A waterfall step follows the same rule
> on a floating segment: its value is the rise or fall the step itself draws. Each segment series
> is a column; a printed total is a value of its own.

Writing the running total instead of the segment is the failure this family exists to catch. An
estimated segment is read at both boundaries, and its value is the difference.

- A category whose stack has no segment of one series leaves that cell empty.
- A printed total above a stack sits in the stack's row, in a last column under an empty header
  cell (see the chart table's layout in [[Cover Every Data Point]]).
- A waterfall's anchor bars (start and end levels) are categories of their own; their values are
  levels, not changes.

### ✅ **Sample** — `global-income-report-2026_p59`

![[chart-income-stack.png]]

Eight regional stacks, four legend series, every segment printing its share: 32 values, copied
with their percent marks. The running header is elided.

<details>
<summary>Expected Markdown</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <caption><strong>Figure 2.6.</strong> Income at the very top is concentrated in every region of the world economy
<strong>Bottom 50%, middle 40% and top 10% (top 1% and next 9%) income shares across the world, 2025</strong></caption>
  <tr> <th></th> <th>Top 1%</th> <th>Next 9%</th> <th>Middle 40%</th> <th>Bottom 50%</th> </tr>
  <tr> <td>Europe</td> <td>12%</td> <td>24%</td> <td>45%</td> <td>19%</td> </tr>
  <tr> <td>East Asia</td> <td>17%</td> <td>28%</td> <td>42%</td> <td>13%</td> </tr>
  <tr> <td>North America & Oceania</td> <td>20%</td> <td>26%</td> <td>41%</td> <td>13%</td> </tr>
  <tr> <td>Sub-Saharan Africa</td> <td>20%</td> <td>35%</td> <td>35%</td> <td>10%</td> </tr>
  <tr> <td>Latin America</td> <td>20%</td> <td>37%</td> <td>35%</td> <td>8%</td> </tr>
  <tr> <td>South & Southeast Asia</td> <td>21%</td> <td>34%</td> <td>31%</td> <td>14%</td> </tr>
  <tr> <td>Russia & Central Asia</td> <td>23%</td> <td>28%</td> <td>35%</td> <td>14%</td> </tr>
  <tr> <td>Middle East & North Africa</td> <td>24%</td> <td>33%</td> <td>32%</td> <td>11%</td> </tr>
</table>

Share of national income (%)

**Interpretation.** In Latin America, the top 1% receives 20% of national income, and the next 9% a further 37%.
```

</details>

### ✅ **Sample** — `credit-outlook-jun2025_p12`

![[chart-yield-stack.png]]

Unlabeled segments over a percent grid, with legend-named components and a printed total above
each stack. Every segment is read as its **own span** — `EUR High Yield`'s grey segment runs from
about 2.5% to 5.7%, so its value is `3.2%`, not `5.7%` — and carries the axis's percent mark. Three
of the five classes have no hedging segment: those cells are empty. The printed totals, in bold,
sit in the last column. The source line runs off the right edge of the page and is written as far
as it is visible.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>European HY Credit Offers the Highest Yield on USD-Hedged Basis</strong>
<em>Yield decomposition across major credit asset classes</em></caption>
  <tr> <th></th> <th>Base Rate</th> <th>Option-Adjusted Spread (OAS)</th> <th>EURUSD 3m Hedging Income</th> <th></th> </tr>
  <tr> <td>EUR High Yield</td> <td>2.5%</td> <td>3.2%</td> <td>2.4%</td> <td><strong>8.1%</strong></td> </tr>
  <tr> <td>EM Hard Currency</td> <td>4.6%</td> <td>3.3%</td> <td></td> <td><strong>7.9%</strong></td> </tr>
  <tr> <td>USD High Yield</td> <td>4.4%</td> <td>3.2%</td> <td></td> <td><strong>7.6%</strong></td> </tr>
  <tr> <td>EUR IG Corp</td> <td>2.2%</td> <td>1.1%</td> <td>2.3%</td> <td><strong>5.6%</strong></td> </tr>
  <tr> <td>USD IG Corp</td> <td>4.5%</td> <td>0.9%</td> <td></td> <td><strong>5.4%</strong></td> </tr>
</table>

Source: Orvessa Index Services, Tallmere Asset Management. As of May 22, 2025. For illustrative purposes only. Not a recommendation to buy or sell any security. It is not possible to invest directly in an ind
```

</details>

### ✅ **Sample** — `renewables-outlook-2025_p24`

![[chart-renewables-waterfall.png]]

A waterfall between two anchors: `2024` prints its level (`10 000`), `2030` and the five steps are
estimates, each step its own rise. A marker series for each share rides on the anchors against the
right-hand axis, printing its values (see [[Dual-Axis and Combo Charts]]); the steps have no
markers, so those cells are empty. The printed second axis tier (`Generation`, `Change`) groups the
categories and has a column of its own; `Change` spans the five steps as printed. The bars have no
legend entry, so their column is headed by the left-hand axis title. Estimates are written in the
axis's digit grouping.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Global renewable power generation in 2024 and 2030, and change by technology</strong></caption>
  <tr> <th></th> <th></th> <th>TWh/year</th> <th>VRE share</th> <th>Renewables share</th> </tr>
  <tr> <td>Generation</td> <td>2024</td> <td>10 000</td> <td>15%</td> <td>32%</td> </tr>
  <tr> <td rowspan="5">Change</td> <td>Hydropower</td> <td>500</td> <td></td> <td></td> </tr>
  <tr> <td>Solar PV</td> <td>4 000</td> <td></td> <td></td> </tr>
  <tr> <td>Wind</td> <td>2 000</td> <td></td> <td></td> </tr>
  <tr> <td>Bioenergy</td> <td>300</td> <td></td> <td></td> </tr>
  <tr> <td>Other renewables</td> <td>200</td> <td></td> <td></td> </tr>
  <tr> <td>Generation</td> <td>2030</td> <td>17 000</td> <td>28%</td> <td>43%</td> </tr>
</table>

Share of generation

Caldrivane Energy Office. CC BY 4.0.

Notes: VRE = variable renewable energy. “VRE share” includes solar PV and wind.
```

</details>

### ✅ **Sample** — a waterfall where every step prints its value

![[bag-cashflow-waterfall-kv.png]]

Eight steps from `EBT` to `FCF`, each printing its value above or below its bar, negatives in
parentheses; `Tax paid` and `Working Capital` are drawn as a line rather than a bar and print their
values the same way. Every value is copied as printed. The category labels keep their footnote
superscripts, and the unit note heads the value column. The page heading above the chart, and the
panels and notes below it, are elided.

<details>
<summary>Expected Markdown · excerpt, the chart</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <tr> <th></th> <th>(£m)</th> </tr>
  <tr> <td>EBT<sup>1</sup></td> <td>(348)</td> </tr>
  <tr> <td>Add back D&A/other non-cash/financing expense</td> <td>421</td> </tr>
  <tr> <td>Tax paid</td> <td>(6)</td> </tr>
  <tr> <td>Cash generated after tax</td> <td>65</td> </tr>
  <tr> <td>Working Capital</td> <td>7</td> </tr>
  <tr> <td>Investing activities<sup>2</sup> excluding interest</td> <td>(329)</td> </tr>
  <tr> <td>Net interest paid</td> <td>(139)</td> </tr>
  <tr> <td>FCF</td> <td>(395)</td> </tr>
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — stacked bars with an annotation column

![[bag-stacked-bar-side-annotations.png]]

Four horizontal stacks, one per business area, each printing a growth figure at its end and, in a
column to the right, one or two lines naming sub-businesses with their own growth. This is **one
table**, one row per bar, with a column holding each row's annotation lines as a list, so the
annotations stay attached to their bar. The two segments of each stack print no value and no axis
calibrates them, so they give no column; their legend follows the table as text. The labels and
growth figures in heavier type are bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Caldrivane Group — revenue growth by business area</strong>
Constant-currency growth, H1 2026 vs H1 2025</caption>
  <tr> <td><strong>Diagnostic Systems</strong></td> <td><strong>+5.1%</strong></td> <td><ul><li>Molecular Diagnostics <strong>+7.4%</strong></li><li>Point-of-Care Testing <strong>+3.2%</strong></li></ul></td> </tr>
  <tr> <td><strong>Advanced Therapies</strong></td> <td><strong>+8.6%</strong></td> <td><ul><li>Cell & Gene Therapies <strong>+12.1%</strong></li></ul></td> </tr>
  <tr> <td><strong>Consumer Health</strong></td> <td><strong>+2.3%</strong></td> <td><ul><li>OTC Wellness <strong>+2.9%</strong></li><li>Personal Care <strong>+1.1%</strong></li></ul></td> </tr>
  <tr> <td><strong>Care Systems</strong></td> <td><strong>+1.4%</strong></td> <td><ul><li>Diagnostic Imaging <strong>+0.8%</strong></li></ul></td> </tr>
</table>

Base business

Growth contribution
```

</details>

<!-- skill:generate
- Give each stacked segment its own size (top boundary minus bottom boundary), never the cumulative height at its top; give each waterfall step the rise or fall it draws, with negatives as printed ("(348)").
- One column per segment series in legend order; leave a cell empty where a stack has no segment of that series; put a printed stack total in a last column with an empty header.
- Treat waterfall anchors (start and end levels) as their own rows holding levels; give a printed second axis tier ("Generation" / "Change") its own column, spanning the categories it groups.
- When lines of text are printed beside each bar, keep them in the bar's row as a list in a column of their own.
-->

<!-- skill:check
- FAIL (MUST) if a stacked segment or waterfall step holds the cumulative height at its edge instead of its own span.
- FAIL (MUST) if a printed stack total or printed step value is missing or altered (sign and parentheses included).
- FAIL (MUST) if a cell is filled for a stack that draws no segment of that series.
- FAIL (MUST) if text printed beside a bar is detached from that bar's row.
-->

## Related

- [[Values and Tolerances]] — spans are estimates like any other
- [[Bars and Histograms]] — the unstacked base case
- [[Dual-Axis and Combo Charts]] — the right-hand-axis marker series on the anchors
- [[Legend and Overlay Values]] — stacks whose segments all print their values
