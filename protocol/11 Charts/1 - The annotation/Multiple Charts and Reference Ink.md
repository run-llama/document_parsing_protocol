---
title: Multiple Charts and Reference Ink
rule_id: charts-multiple-charts-and-reference-ink
status: rule
scope: page
tags: [charts, structure]
---

# Multiple Charts and Reference Ink

> [!success] ✅ Normative
> Each chart or panel on a page MUST get its own chart table, and every panel MUST be covered (see
> [[Cover Every Data Point]]). Reference ink — labeled averages, trend lines, shaded bands, event
> callouts — draws no data points and MUST NOT be rendered as data: it gets no row, no column and
> no value in any chart table. Its printed text MUST still be kept.

## Several charts on one page

Every chart and every panel of a multi-panel figure is its own chart table, in reading order, with
its printed title or panel heading in `<caption>`. The same one-row-per-position,
one-column-per-series coverage applies to each. Where charts share a label set, each table's
caption tells them apart (see [[Labels]]).

A caption shared by several panels MUST appear once: first inside the first panel's table when
read before the group, or last inside the last panel's table when read after the group. A shared
caption and that panel's own title are kept in printed order within the same `<caption>`.

Ink printed **once for several panels** — a shared axis title, a single legend serving every panel
— MUST NOT be lost:

- a shared legend names the series of every panel it serves, so each panel's table carries those
  series names as its column headers;
- a shared axis title is printed text of the figure and is kept once, as text.

## Reference ink is not data

| Reference ink | Why it is not data |
| --- | --- |
| A labeled **average or trend line** (`10-year average`, a line fitted through a scatter) | it summarises the data points; it is not one of them |
| A **shaded band** or background region | it marks a span of the axis, not a value |
| An **event callout** naming a year (`1976: Tangshan Earthquake, China` — see [[Log Scale Charts]]) | it comments on a point; its value is the point's own |

A chart table that gains a column for a trend line, or a row for a shaded band, contains values
the chart never drew as data — invented content (see [[Never Drop, Never Invent]]). The printed
labels of reference ink are text on the page, kept as text, after the table in reading order — see
the chart table's layout in [[Cover Every Data Point]].

### ✅ **Sample** — `RenewablesDeploymentTracker2024_p13`

![[chart-solar-panels.png]]

Six titled panels — five bar panels (`World`, `China`, `European Union`, `United States`, `India`)
over the same five years, and one horizontal panel (`Avoided emissions`) over regions — every bar
printing its value: 30 values in six tables. Each single-series panel is headed by its value-axis
title (`GW`, `Mt CO₂`). `China` appears both as a panel and as a row of the avoided-emissions
panel; each table's title keeps them apart. The bar values are printed in bold. The running header
and tab label are elided.

<details>
<summary>Expected Markdown</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <caption><strong>Solar PV capacity additions and avoided emissions</strong>
<strong>World</strong></caption>
  <tr> <th></th> <th>GW</th> </tr>
  <tr> <td>2019</td> <td><strong>117</strong></td> </tr>
  <tr> <td>2020</td> <td><strong>151</strong></td> </tr>
  <tr> <td>2021</td> <td><strong>171</strong></td> </tr>
  <tr> <td>2022</td> <td><strong>228</strong></td> </tr>
  <tr> <td>2023</td> <td><strong>420</strong></td> </tr>
</table>

<table data-source="chart">
  <caption><strong>China</strong></caption>
  <tr> <th></th> <th>GW</th> </tr>
  <tr> <td>2019</td> <td><strong>30</strong></td> </tr>
  <tr> <td>2020</td> <td><strong>60</strong></td> </tr>
  <tr> <td>2021</td> <td><strong>64</strong></td> </tr>
  <tr> <td>2022</td> <td><strong>100</strong></td> </tr>
  <tr> <td>2023</td> <td><strong>261</strong></td> </tr>
</table>

<table data-source="chart">
  <caption><strong>European Union</strong></caption>
  <tr> <th></th> <th>GW</th> </tr>
  <tr> <td>2019</td> <td><strong>18</strong></td> </tr>
  <tr> <td>2020</td> <td><strong>19</strong></td> </tr>
  <tr> <td>2021</td> <td><strong>27</strong></td> </tr>
  <tr> <td>2022</td> <td><strong>41</strong></td> </tr>
  <tr> <td>2023</td> <td><strong>53</strong></td> </tr>
</table>

<table data-source="chart">
  <caption><strong>United States</strong></caption>
  <tr> <th></th> <th>GW</th> </tr>
  <tr> <td>2019</td> <td><strong>13</strong></td> </tr>
  <tr> <td>2020</td> <td><strong>19</strong></td> </tr>
  <tr> <td>2021</td> <td><strong>24</strong></td> </tr>
  <tr> <td>2022</td> <td><strong>21</strong></td> </tr>
  <tr> <td>2023</td> <td><strong>32</strong></td> </tr>
</table>

<table data-source="chart">
  <caption><strong>India</strong></caption>
  <tr> <th></th> <th>GW</th> </tr>
  <tr> <td>2019</td> <td><strong>12</strong></td> </tr>
  <tr> <td>2020</td> <td><strong>5</strong></td> </tr>
  <tr> <td>2021</td> <td><strong>13</strong></td> </tr>
  <tr> <td>2022</td> <td><strong>18</strong></td> </tr>
  <tr> <td>2023</td> <td><strong>12</strong></td> </tr>
</table>

<table data-source="chart">
  <caption><strong>Avoided emissions</strong></caption>
  <tr> <th></th> <th>Mt CO<sub>2</sub></th> </tr>
  <tr> <td>China</td> <td><strong>619</strong></td> </tr>
  <tr> <td>European Union</td> <td><strong>101</strong></td> </tr>
  <tr> <td>United States</td> <td><strong>85</strong></td> </tr>
  <tr> <td>India</td> <td><strong>80</strong></td> </tr>
  <tr> <td>Rest of world</td> <td><strong>221</strong></td> </tr>
</table>

Caldrivane Energy Observatory 2024.

Notes: “Avoided emissions” refers to avoided emissions in one year from cumulative deployment since 2019 to 2023.
```

</details>

### ✅ **Sample** — two panels sharing a legend and an axis

![[corpus-shared-axis-panels.png]]

Two bar panels stacked vertically, each with its own underlined period caption (`1960–1973`,
`1973–1980`), over one rotated axis title on the far left and **one legend that serves both**. Each
panel is its own table, and both tables carry the three legend series as their headers: read alone,
the lower panel's bars are unnamed. The axis title, printed once, is kept once. Every bar prints its
value; the printed minus signs are written `-`. The lower panel runs negative, bars descending below
a zero line that crosses the panel. In the lower panel, the value label under Marolia's second bar
is covered by the bar itself and that bar is drawn both above and below the zero line, so the
Marolia row is elided. The running header is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

Annual average growth rate (AAGR) in per capita energy use / AAGR of GDP per capita

<table data-source="chart">
  <caption><u>1960–1973</u></caption>
  <tr> <th></th> <th>Total energy</th> <th>Electrical energy</th> <th>Non-electrical energy</th> </tr>
  <tr> <td>Marolia</td> <td>1.7</td> <td>1.8</td> <td>1.4</td> </tr>
  <tr> <td>Verdenne</td> <td>1.2</td> <td>1.1</td> <td>1.15</td> </tr>
  <tr> <td>Kastova</td> <td>1.0</td> <td>0.8</td> <td>0.7</td> </tr>
  <tr> <td>Braunhelm</td> <td>0.4</td> <td>2.0</td> <td>-0.2</td> </tr>
  <tr> <td>Sennora</td> <td>1.1</td> <td>1.2</td> <td>1.0</td> </tr>
  <tr> <td>Utland</td> <td>1.0</td> <td>1.9</td> <td>0.7</td> </tr>
</table>

<table data-source="chart">
  <caption><u>1973–1980</u></caption>
  <tr> <th></th> <th>Total energy</th> <th>Electrical energy</th> <th>Non-electrical energy</th> </tr>
<!-- … -->
  <tr> <td>Verdenne</td> <td>-0.1</td> <td>-0.7</td> <td>1.9</td> </tr>
  <tr> <td>Kastova</td> <td>-0.3</td> <td>1.4</td> <td>0.1</td> </tr>
  <tr> <td>Braunhelm</td> <td>-1.5</td> <td>0.3</td> <td>-2.2</td> </tr>
  <tr> <td>Sennora</td> <td>-0.2</td> <td>1.0</td> <td>-0.8</td> </tr>
  <tr> <td>Utland</td> <td>-0.5</td> <td>1.3</td> <td>-1.2</td> </tr>
</table>
```

</details>

### ✅ **Sample** — sixteen small panels under two captions

![[bag-multipanel-charts.png]]

`Figure 3a` and `Figure 3b` hold eight stacked-bar panels each, every panel headed by its
deposition type and its element's flux title, each drawing ten stacks of four fill colours. No
panel prints a site name, a tick value or a legend, so no bar can be located or calibrated: the
panels carry no chart table, and the output keeps their printed headings and titles, in reading
order. Figure 3b and the text below it are elided.

<details>
<summary>Expected Markdown · excerpt, Figure 3a</summary>

```markdown
<!-- … -->

**Dry deposition**
Zn flux (mg m<sup>-2</sup>)

**Wet deposition**
Zn flux (mg m<sup>-2</sup>)

**Dry deposition**
Pb flux (mg m<sup>-2</sup>)

**Wet deposition**
Pb flux (mg m<sup>-2</sup>)

**Dry deposition**
Cu flux (mg m<sup>-2</sup>)

**Wet deposition**
Cu flux (mg m<sup>-2</sup>)

**Dry deposition**
Ni flux (mg m<sup>-2</sup>)

**Wet deposition**
Ni flux (mg m<sup>-2</sup>)

**Figure 3a.**

<!-- … -->
```

</details>

### ✅ **Sample** — recession bands behind four lines

![[bag-bls-chart-recession-bands.png]]

Four line styles, each named by a direct label with a leader line, over 33 years (1970–2002, the
axis labeling every second year as `1970`, `72`, `74` …) and five grey vertical bands that the note
says are recessions. The four named series are the table's columns; the bands are reference ink and
add nothing to it, while the note that explains them is kept. No value is printed, so every cell is
an estimate against the 2-point grid. Only the first two labeled years are shown; the table
continues through `02`, and the table sharing the page is elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table data-source="chart">
  <caption><strong>Chart 5. Unemployment rates of persons ages 25 to 64 by educational attainment, 1970–2002</strong></caption>
  <tr> <th></th> <th>Less than a high school diploma</th> <th>High school diploma, no college</th> <th>Some college or an associate's degree</th> <th>College degree</th> </tr>
  <tr> <td>1970</td> <td>4.6</td> <td>3.1</td> <td>2.9</td> <td>1.3</td> </tr>
<!-- … -->
  <tr> <td>72</td> <td>5.8</td> <td>3.9</td> <td>3.5</td> <td>2.0</td> </tr>
<!-- … -->
</table>

Percent

Percent

NOTE: Since 1992, data on educational attainment have been based on the "highest diploma or degree received" rather than the "number of years of school completed." Data from 1994 forward are not directly comparable with data for 1993 and earlier years due to the CPS redesign. Data for 1970–1991 are from the March supplement to the CPS. Data from 1992–2002 are fourth-quarter data. Shaded regions represent recessions as designated by the National Bureau of Economic Research.

SOURCE: Bureau of Labor Statistics, Current Population Survey.

<!-- … -->
```

</details>

<!-- skill:generate
- Give every chart and every panel its own chart table in reading order, with its printed title or panel heading in <caption>, first or last according to reading order; cover every panel. A shared caption appears once, first inside the first panel's table or last inside the last panel's table according to reading order.
- When one legend serves several panels, use its series names as the column headers of every panel's table; keep a shared axis title once, as text.
- Never add a row or column for an average line, trend line, shaded band or event callout, and never read values from them; keep their printed labels as plain text after the table.
- If a panel prints no labels or scale that locate its marks, give it no table and keep only its printed text.
-->

<!-- skill:check
- FAIL (MUST) if a chart or panel on the page has no chart table while its marks are locatable and readable, or two charts are merged into one table.
- FAIL (MUST) if a panel served by a shared legend has a table whose columns are unnamed or named differently from the legend.
- FAIL (MUST) if a chart table contains a row, column or value taken from reference ink (average or trend line, shaded band, event callout).
- FAIL (MUST) if the printed text of reference ink, a shared axis title or a shared legend is missing from the output.
- FAIL (MUST) if the printed labels of reference ink are placed somewhere other than after the chart table.
-->

## Related

- [[Cover Every Data Point]] — every panel counts, and the layout of each chart table
- [[Labels]] — how charts with the same labels are told apart
- [[Legend and Overlay Values]] — twin pies sharing one legend
- [[Log Scale Charts]] — event callouts over a logarithmic chart
