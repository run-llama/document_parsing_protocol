---
title: Line Charts
rule_id: charts-line-charts
status: rule
scope: page
tags: [charts, types]
---

# Line Charts

> [!success] ✅ Normative
> A line chart MUST be rendered with one value per series per x position: one row per x position,
> one column per series, each series named by its legend entry or by its direct label at the line's
> end. A value printed at a point MUST be copied; every other value is read against the axis.
> Wiggles between x positions are not positions.

- A line labeled directly at its end is a named series: the printed name at the line's end heads
  its column (see [[Labels]]).
- An x position the axis does not label is labeled by its axis value (see
  [[Cover Every Data Point]]).
- A labeled trend, average or reference line adds no column (see
  [[Multiple Charts and Reference Ink]]).
- Scenario lines that share one drawn curve early on have identical values in those positions —
  correct, not a copying slip.

### ✅ **Sample** — `health-workforce-2024_p45`

![[chart-doctors-lines.png]]

Five lines named by their direct labels over eleven labeled years, nothing printed on the lines:
5 × 11 = **55 values**, each the line's centre at the year read against the 5-unit grid (tolerance
0.05 where the vertex sits near a gridline, 0.1 where it does not). Columns follow the direct
labels from top to bottom. The value-axis title follows the table. The axis also prints a stray `.`
after `2022`, at a position with no line; it is not given a row.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Figure 1.18. The share of physicians aged 65 and over has risen over the past decade in several countries</strong></caption>
  <tr> <th></th> <th>Italy</th> <th>Belgium</th> <th>France</th> <th>Slovak Republic</th> <th>Germany</th> </tr>
  <tr> <td>2012</td> <td>7</td> <td>14</td> <td>11</td> <td>8</td> <td>4</td> </tr>
  <tr> <td>2013</td> <td>8</td> <td>14.7</td> <td>12.3</td> <td>8.9</td> <td>4.1</td> </tr>
  <tr> <td>2014</td> <td>9.4</td> <td>15.5</td> <td>13.3</td> <td>9.6</td> <td>4.5</td> </tr>
  <tr> <td>2015</td> <td>10.7</td> <td>16.3</td> <td>14.3</td> <td>10.4</td> <td>5.1</td> </tr>
  <tr> <td>2016</td> <td>13</td> <td>17.6</td> <td>15.2</td> <td>11.5</td> <td>5.6</td> </tr>
  <tr> <td>2017</td> <td>15.4</td> <td>18.1</td> <td>15.9</td> <td>12.7</td> <td>6</td> </tr>
  <tr> <td>2018</td> <td>18</td> <td>18.8</td> <td>16.6</td> <td>14.2</td> <td>6.4</td> </tr>
  <tr> <td>2019</td> <td>20.8</td> <td>19.5</td> <td>17.3</td> <td>15.5</td> <td>6.8</td> </tr>
  <tr> <td>2020</td> <td>23</td> <td>20</td> <td>17.9</td> <td>16.3</td> <td>7.1</td> </tr>
  <tr> <td>2021</td> <td>25</td> <td>20.5</td> <td>18.5</td> <td>16.7</td> <td>7.5</td> </tr>
  <tr> <td>2022</td> <td>27</td> <td>21</td> <td>19</td> <td>17</td> <td>8</td> </tr>
</table>

Share of physicians aged 65 and over
```

</details>

### ✅ **Sample** — `energy-outlook-2025_p20`

![[chart-lng-scenarios.png]]

Three scenario lines named and valued by their end labels (`High: 11 Tcf, +150%` …). The name part
heads each column; the rest of the label, printed at the 2040 end of the line, is that line's 2040
value, copied whole — the `Low` label's second line (`from 2024 levels`) included. The `Low` line
ends near `8.5` on the axis, but its printed `8 Tcf` wins. Every other value is an estimate on the
2-unit grid; the shared early curve gives all three series the same values in 2024 and 2026, and
`Mid` and `Low` the same values in 2028 and 2030. The rows are the 9 printed ticks (2024–2040, every
second year): 3 × 9 = **27 values**.

<details>
<summary>Expected Markdown</summary>

```markdown
Trillion cubic feet

<table data-source="chart">
  <caption>FIGURE 9
<strong>Liquified natural gas exports</strong></caption>
  <tr> <th></th> <th>High</th> <th>Mid</th> <th>Low</th> </tr>
  <tr> <td>2024</td> <td>4.4</td> <td>4.4</td> <td>4.4</td> </tr>
  <tr> <td>2026</td> <td>5.4</td> <td>5.4</td> <td>5.4</td> </tr>
  <tr> <td>2028</td> <td>8.0</td> <td>6.6</td> <td>6.6</td> </tr>
  <tr> <td>2030</td> <td>10.3</td> <td>8.0</td> <td>8.0</td> </tr>
  <tr> <td>2032</td> <td>10.8</td> <td>9.0</td> <td>8.2</td> </tr>
  <tr> <td>2034</td> <td>10.9</td> <td>9.7</td> <td>8.0</td> </tr>
  <tr> <td>2036</td> <td>11.0</td> <td>9.9</td> <td>8.0</td> </tr>
  <tr> <td>2038</td> <td>10.9</td> <td>10.0</td> <td>8.4</td> </tr>
  <tr> <td>2040</td> <td>11 Tcf, +150%</td> <td>10 Tcf, +129%</td> <td>8 Tcf, +94% from 2024 levels</td> </tr>
</table>

Source: Caldrivane Energy Research
Note: The high, mid, and low ranges reflect uncertainty around future fossil fuel prices, economic growth, clean energy technology costs, and trade policy.
```

</details>

<!-- skill:generate
- Render a line chart as a table with one row per x position and one column per line, each column headed by the line's legend entry or the name printed at its end.
- Copy values printed at points or line ends (the part of an end label after the name, e.g. "11 Tcf, +150%" for "High: 11 Tcf, +150%"); estimate every other value at the line's centre at that x position.
- Add rows for unlabeled x positions only by their axis value; never add rows for wiggles between positions, or columns for trend, average or reference lines.
-->

<!-- skill:check
- FAIL (MUST) if a named line lacks a column, or a labeled x position lacks a row.
- FAIL (MUST) if a value printed at a point or at a line's end is replaced by an axis reading.
- FAIL (MUST) if a trend, average or reference line is given a column.
- FAIL (MUST) if an estimated line value lies outside the readability tolerance of the checker's reading at that x position.
-->

## Related

- [[Values and Tolerances]] — printed values beat axis readings
- [[Labels]] — direct labels as series names
- [[Log Scale Charts]] — the same reading over logarithmic bands
- [[Dual-Axis and Combo Charts]] — lines sharing a canvas with bars
