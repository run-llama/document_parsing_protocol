---
title: Bars and Histograms
rule_id: charts-bars-and-histograms
status: rule
scope: page
tags: [charts, types]
---

# Bars and Histograms

> [!success] ✅ Normative
> A bar chart MUST be rendered as a chart table with one value per bar: one row per category, one
> column per series. A histogram is a bar chart whose category is the bin: a bin the axis does not
> label MUST still get its row, labeled by its **axis value**, and a labeled position with **no bar**
> MUST hold `0`.

- A single series gives a two-column table — see the full example in [[Values and Tolerances]].
- Grouped bars give one column per legend series — see the full example in [[Labels]].
- Horizontal bars change nothing: the category axis simply runs vertically, and rows follow it top
  to bottom.
- A highlighted or average **bar** (`EU average`, shaded behind the rest) is an ordinary row. An
  average **line** is reference ink and adds nothing to the table (see
  [[Multiple Charts and Reference Ink]]).

## Histogram bins

Printed bin labels are copied verbatim, catch-alls included (`> 15000`). When the axis labels only
every other bin, the unlabeled bins still exist: each gets a row labeled by its axis value — `2000`
between the ticks `1500` and `2500` on an axis labeled every $1 000. A bin that no printed
calibration reaches is not locatable (see [[Cover Every Data Point]]).

### ✅ **Sample** — `catastrophe-review-2025_p4`

![[chart-premium-hist.png]]

Bins every $500, labels every $1 000, a printed catch-all, and one labeled position (`1500`) with no
bar. Full coverage is 29 rows: `1500` holds `0`; the unlabeled bins are labeled by their axis values
(`2000`, `3000` …); every count is an estimate against the 20-unit grid. The catch-all keeps its
printed space (`> 15000`). The value axis title heads the single value column; the category axis
title heads the label column.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption>Distribution of premium per policy in Florida at zip-code level, USD, 2022</caption>
  <tr> <th>Premium per policy in USD</th> <th>Number of zip codes in Florida</th> </tr>
  <tr> <td>1500</td> <td>0</td> </tr>
  <tr> <td>2000</td> <td>48</td> </tr>
  <tr> <td>2500</td> <td>125</td> </tr>
  <tr> <td>3000</td> <td>78</td> </tr>
  <tr> <td>3500</td> <td>58</td> </tr>
  <tr> <td>4000</td> <td>39</td> </tr>
  <tr> <td>4500</td> <td>36</td> </tr>
  <tr> <td>5000</td> <td>23</td> </tr>
  <tr> <td>5500</td> <td>18</td> </tr>
  <tr> <td>6000</td> <td>14</td> </tr>
  <tr> <td>6500</td> <td>14</td> </tr>
  <tr> <td>7000</td> <td>9</td> </tr>
  <tr> <td>7500</td> <td>9</td> </tr>
  <tr> <td>8000</td> <td>6</td> </tr>
  <tr> <td>8500</td> <td>6</td> </tr>
  <tr> <td>9000</td> <td>5</td> </tr>
  <tr> <td>9500</td> <td>11</td> </tr>
  <tr> <td>10000</td> <td>2</td> </tr>
  <tr> <td>10500</td> <td>3</td> </tr>
  <tr> <td>11000</td> <td>5</td> </tr>
  <tr> <td>11500</td> <td>1</td> </tr>
  <tr> <td>12000</td> <td>8</td> </tr>
  <tr> <td>12500</td> <td>4</td> </tr>
  <tr> <td>13000</td> <td>3</td> </tr>
  <tr> <td>13500</td> <td>4</td> </tr>
  <tr> <td>14000</td> <td>3</td> </tr>
  <tr> <td>14500</td> <td>3</td> </tr>
  <tr> <td>15000</td> <td>2</td> </tr>
  <tr> <td>> 15000</td> <td>21</td> </tr>
</table>

Source: Caldrivane Institute, state insurance filings
```

</details>

## Progress and target bars

A goal statement with a single bar, its current value marked on it and the target at its right
end, is a **one-row bar chart**, not a chart type of its own. Its chart table MUST hold the current
value, the target and the axis end-points: the bar's meaning is relative to its scale, and `7`
against `8` or `42%` against `50%` is only legible with that scale kept.

### ✅ **Sample** — goal cards with progress bars

![[corpus-progress-bars.png]]

Three goal cards separated by rules. Each bar marks its current value (`40%`, `7`, `42%`, each with
the year `2024` beneath it) against a scale from its start (`0%`, `0`) to its target (`100%` with
`2030 Target`, `8` with `2025 Target`). The rows follow the axis: start, current value, target. The
third card's scale end-points fall below the crop and are not shown, so its table holds only the
current value.

<details>
<summary>Expected Markdown</summary>

```markdown
**Goal**

Replenish all our corporate freshwater withdrawals in high-stress locations by 2030.

<table data-source="chart">
  <caption><strong>Progress</strong></caption>
  <tr> <td></td> <td>0%</td> </tr>
  <tr> <td><strong>2024</strong></td> <td><strong>40%</strong></td> </tr>
  <tr> <td><strong>2030 Target</strong></td> <td>100%</td> </tr>
</table>
<hr/>

**Goal**

Certify all company-owned data centers to the Regional Water Stewardship Standard by 2025.

<table data-source="chart">
  <caption><strong>Progress</strong></caption>
  <tr> <td></td> <td>0</td> </tr>
  <tr> <td><strong>2024</strong></td> <td><strong>7</strong></td> </tr>
  <tr> <td><strong>2025 Target</strong></td> <td>8</td> </tr>
</table>
<hr/>

**Goal**

Increase supplier participation in the Supplier Water Efficiency Program, supporting a 50 percent average water reuse rate by 2030.

<table data-source="chart">
  <caption><strong>Progress</strong></caption>
  <tr> <td><strong>2024</strong></td> <td><strong>42%</strong></td> </tr>
</table>
```

</details>

<!-- skill:generate
- Render a bar chart as a table with one row per bar category (top to bottom for horizontal bars) and one column per series; a highlighted or "average" bar is an ordinary row, an average line is not a row.
- For a histogram, give every bin a row: printed bin labels verbatim (catch-alls like "> 15000" included), unlabeled bins labeled by their axis value, and 0 for a labeled bin with no bar.
- Render a progress bar as a small table holding the axis start, the current value with its label, and the target with its label, in axis order.
-->

<!-- skill:check
- FAIL (MUST) if a bar or histogram bin drawn on the page has no row, or a labeled bin with no bar is missing or not 0.
- FAIL (MUST) if an unlabeled bin is labeled by anything other than its axis value, or a printed bin label (catch-all included) is altered.
- FAIL (MUST) if an average line or other reference ink appears as a row or column of the table.
- FAIL (MUST) if a progress bar's current value, target or printed axis end-points are missing.
-->

## Related

- [[Values and Tolerances]] — a complete single-series bar chart, mixed printed and estimated
- [[Labels]] — a complete grouped bar chart, all printed
- [[Stacked Bars and Waterfalls]] — when the series stack instead of standing side by side
- [[Cover Every Data Point]] — zeros and axis-value labels
