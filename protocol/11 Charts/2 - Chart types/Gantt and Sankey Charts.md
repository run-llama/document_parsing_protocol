---
title: Gantt and Sankey Charts
rule_id: charts-gantt-and-sankey-charts
status: rule
scope: page
tags: [charts, types]
---

# Gantt and Sankey Charts

> [!success] ✅ Normative
> A gantt chart MUST be rendered with one row per mark, giving the mark's label, its **start** and
> its **end** on the time axis — for a milestone, start and end are the same period. A sankey
> diagram MUST be rendered with one row per flow, giving its **source** node, its **target** node
> and the **value** it carries. Each family uses its one shape throughout, whatever the chart
> prints.

## Gantt

The time axis is the value axis. Each bar's two edges are read against the printed ticks and
written as the periods the axis prints: months as month tokens (`Jan`), quarters under year headers
as quarter tokens with their year (`Q1 2025`). When the page prints exact dates for each task, those
printed dates are the start and end; when it prints them as a table beside the bars, that printed
table is the rendering and the bars add nothing to it (see [[Chart With a Printed Data Grid]]).

Nothing on the page prints the words *start* or *end*, and they MUST NOT be invented as labels of a
mark; the pair lives in the row's two period cells.

**How a gantt row is laid out.** A gantt chart MUST be one table with one row per task bar or
milestone, in the chart's top-to-bottom order: the printed label, the start period, the end period.
Its header row MUST be `Start` | `End` over the two period columns, with the first cell holding the
printed label column's title or left empty. These header cells are **protocol vocabulary**, like the markers `[blank]` or `[logo: …]`: the page does
not print them, and they are the one deliberate exception to **never invent**, so that the columns
can be read without guessing. They are written exactly as given.

**A bar edge on a period boundary.** A bar that fills January through March has its right edge on
the **April** tick. Its end MUST be the last period the bar **visibly fills** (`Mar`), and one
reading MUST be used throughout a document (see [[Choices Made Once Per Document]]). A checker
accepts a reading one boundary off.

### ✅ **Sample (constructed)** — `make_gantt`

![[chart-gantt.png]]

Four task bars and a diamond milestone on a month axis: five rows, the milestone with start and end
both `Dec`. `Design` fills January to March and its end is `Mar`, the last month it fills.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Programme timeline, 2025</strong></caption>
  <tr> <th></th> <th>Start</th> <th>End</th> </tr>
  <tr> <td>Design</td> <td>Jan</td> <td>Mar</td> </tr>
  <tr> <td>Procurement</td> <td>Feb</td> <td>Jun</td> </tr>
  <tr> <td>Construction</td> <td>Apr</td> <td>Nov</td> </tr>
  <tr> <td>Commissioning</td> <td>Oct</td> <td>Dec</td> </tr>
  <tr> <td>Handover</td> <td>Dec</td> <td>Dec</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `metro_s2_p18`

![[chart-metro-gantt.png]]

Four task bars, one milestone and the revenue-service window on a quarter axis under two year
headers — six rows in the chart's top-to-bottom order. The `Sub Comp 2026` down-triangle is a
single-position mark, so start and end are the same quarter; the double-headed `RSD 2026` arrow
spans the Q4 2026 column, both its edges in one quarter, so it too resolves to one period. A mark
whose two edges fall in one quarter still gets its row. The dashed vertical line is a status marker
with no label and adds nothing. The labels are printed in bold; the report headings above the chart
are elided.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <tr> <th></th> <th>Start</th> <th>End</th> </tr>
  <tr> <td><strong>Install Traction Power Equipment (CCS)</strong></td> <td>Q1 2025</td> <td>Q3 2025</td> </tr>
  <tr> <td><strong>Perform Local Field Acceptance Tests (LFAT)</strong></td> <td>Q3 2025</td> <td>Q2 2026</td> </tr>
  <tr> <td><strong>Systems Testing</strong></td> <td>Q1 2026</td> <td>Q2 2026</td> </tr>
  <tr> <td><strong>Sub Comp 2026</strong></td> <td>Q4 2026</td> <td>Q4 2026</td> </tr>
  <tr> <td><strong>Systems Integration Testing</strong></td> <td>Q2 2026</td> <td>Q4 2026</td> </tr>
  <tr> <td><strong>RSD 2026</strong></td> <td>Q4 2026</td> <td>Q4 2026</td> </tr>
</table>

*For the month of August 2025 the Critical Path starts with the installation and completion of Traction Power Equipment and Switchgear*. It then flows into energization and performing Local Field Acceptance Tests, followed by systems testing and integration ahead of substantial completion of the Valmere Line extension.
```

</details>

### ✅ **Sample** — `guideway_schedule_p100`

![[chart-guideway-gantt.png]]

A schedule whose left-hand table **prints** each activity's ID, name, duration, start and finish:
that printed table is the rendering, with its printed dates as the span of each bar, and the bar
area to its right — year and quarter headers, bars, bar labels — adds nothing. The table lists
**26 activities** under group and crew bands. Long names are clipped at the edge of the name
column and are written as far as they are visible (`(cre` on `EGCC1270`; on `EGCC1350` the next
letter is cut mid-glyph and left out). The first five activities are shown.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
shown below (highlighting the crews working in Area 1 as being on the critical path).

<table data-source="chart">
  <tr> <th colspan="5">RVGW Guideway Activities</th> </tr>
  <tr> <th>Activity ID</th> <th>Activity Name</th> <th>Original<br/>Duration</th> <th>Start</th> <th>Finish</th> </tr>
  <tr> <td colspan="2"><strong>Drilled Shafts</strong></td> <td><strong>430</strong></td> <td><strong>03-Jan-25</strong></td> <td><strong>21-Sep-26</strong></td> </tr>
  <tr> <td colspan="2"><strong>Crew 1</strong></td> <td><strong>386</strong></td> <td><strong>03-Jan-25</strong></td> <td><strong>17-Jul-26</strong></td> </tr>
  <tr> <td>EGCC1270</td> <td>Area 2 Drilled Shafts 699 to 712 [705-712 permanent casings] - 15 shafts (8 d/shaft) (cre</td> <td>120</td> <td>03-Jan-25</td> <td>25-Jun-25</td> </tr>
  <tr> <td>EGCC1430</td> <td>Area 4 Drilled Shafts 741 to 768 - 38 shafts (7d/shaft) (crew #1)</td> <td>266</td> <td>26-Jun-25</td> <td>17-Jul-26</td> </tr>
  <tr> <td colspan="2"><strong>Crew 2</strong></td> <td><strong>336</strong></td> <td><strong>03-Jan-25</strong></td> <td><strong>05-May-26</strong></td> </tr>
  <tr> <td>EGCC1590</td> <td>Area 6 Drilled Shafts 808 to 790 - 29 shafts (7d/shaft) (crew #2)</td> <td>203</td> <td>03-Jan-25</td> <td>22-Oct-25</td> </tr>
  <tr> <td>EGCC1780</td> <td>Area 1-A Drilled Shafts 637 to 655 (NS To Varden Sta) - 19 shafts (7d/shaft) (Crew #2)</td> <td>133</td> <td>23-Oct-25</td> <td>05-May-26</td> </tr>
  <tr> <td colspan="2"><strong>Crew 3</strong></td> <td><strong>430</strong></td> <td><strong>03-Jan-25</strong></td> <td><strong>21-Sep-26</strong></td> </tr>
  <tr> <td>EGCC1350</td> <td>Area 3 Drilled Shafts 713 to 740 [713-719 permanent casings] - 30 shafts (8d/shaft) (cre</td> <td>240</td> <td>03-Jan-25</td> <td>16-Dec-25</td> </tr>
<!-- … -->
</table>
```

</details>

## Sankey

A flow's value is the number it carries. Where only node totals are printed, a node with a single
inflow or a single outflow gives that one flow its value, and the flow takes the same row shape. A
node that both splits and merges has no single flow its total belongs to: its total gives no flow
row, and its printed total is kept as text. A sankey that prints **no values** has no readable
flows: ribbon widths MUST NOT be estimated.

Node names in the source and target cells are copied **without** any printed node total. A ribbon
is traced from end to end before its row is written — values often print at the ribbon's start,
far from the target node, and a thin ribbon can pass under several others. A ribbon that cannot be
traced unambiguously gets no row.

**How a sankey flow is laid out.** A sankey diagram MUST be one table with one row per flow,
ordered by source from top to bottom and then by target, under the header row `Source` | `Target` |
`Value`. Each printed node total that is not any one flow's value follows the table as text, as
printed (`Industry 165`). These header cells are **protocol vocabulary**, like the markers `[blank]` or `[logo: …]`: the page does
not print them, and they are the one deliberate exception to **never invent**, so that the columns
can be read without guessing. They are written exactly as given.

### ✅ **Sample (constructed)** — `make_sankey`

![[chart-sankey.png]]

Every ribbon prints its value: four rows. `Coal 120` and `Wind 30` each feed a single flow, so their
totals are already the flows' values; `Gas 130`, `Industry 165` and `Buildings 115` each join or
split several flows, and their printed totals follow the table. The `(TWh)` in the printed title
stays in the title. Node labels are printed in bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Energy flows, 2024 (TWh)</strong></caption>
  <tr> <th>Source</th> <th>Target</th> <th>Value</th> </tr>
  <tr> <td><strong>Coal</strong></td> <td><strong>Industry</strong></td> <td>120</td> </tr>
  <tr> <td><strong>Gas</strong></td> <td><strong>Industry</strong></td> <td>45</td> </tr>
  <tr> <td><strong>Gas</strong></td> <td><strong>Buildings</strong></td> <td>85</td> </tr>
  <tr> <td><strong>Wind</strong></td> <td><strong>Buildings</strong></td> <td>30</td> </tr>
</table>

**Gas 130**

**Industry 165**

**Buildings 115**
```

</details>

### ✅ **Sample** — `llnl_energy_2023_p1`

![[chart-llnl-sankey.png]]

About **45 ribbons**, each printing its own value in quads: one row per ribbon. Six of them, thick
and thin, are shown; the rest of the table, the node totals that are no single flow's value, and
the source note are elided. All text on this chart is printed in bold.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table data-source="chart">
  <caption><strong>Estimated U.S. Energy Consumption in 2023: 93.6 Quads</strong></caption>
  <tr> <th>Source</th> <th>Target</th> <th>Value</th> </tr>
  <tr> <td><strong>Solar</strong></td> <td><strong>Electricity Generation</strong></td> <td><strong>0.56</strong></td> </tr>
  <tr> <td><strong>Nuclear</strong></td> <td><strong>Electricity Generation</strong></td> <td><strong>8.1</strong></td> </tr>
  <tr> <td><strong>Natural Gas</strong></td> <td><strong>Industrial</strong></td> <td><strong>10.9</strong></td> </tr>
  <tr> <td><strong>Coal</strong></td> <td><strong>Industrial</strong></td> <td><strong>0.91</strong></td> </tr>
  <tr> <td><strong>Petroleum</strong></td> <td><strong>Transportation</strong></td> <td><strong>24.8</strong></td> </tr>
  <tr> <td><strong>Electricity Generation</strong></td> <td><strong>Residential</strong></td> <td><strong>4.96</strong></td> </tr>
<!-- … -->
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — `material-flows-2020_p4`

![[chart-material-sankey.png]]

Nothing prints on the ribbons — every number is a **node total**. Where a node has a single inflow
or a single outflow, its total is that one flow's value: fourteen flows are read out this way, in
the same row shape as a chart whose ribbons print values. `Processed material` (`7.98`) and
`Total emissions` (`2.60`) each merge several inflows and split into several outflows, so their
totals are no single flow's value: they give no row and follow the table as printed. `Backfiling`
is copied as printed. All chart text is printed in bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <tr> <th>Source</th> <th>Target</th> <th>Value</th> </tr>
  <tr> <td><strong>Imports</strong></td> <td><strong>Direct material inputs</strong></td> <td><strong>1.70</strong></td> </tr>
  <tr> <td><strong>Natural resources extracted</strong></td> <td><strong>Direct material inputs</strong></td> <td><strong>5.36</strong></td> </tr>
  <tr> <td><strong>Direct material inputs</strong></td> <td><strong>Processed material</strong></td> <td><strong>7.06</strong></td> </tr>
  <tr> <td><strong>Processed material</strong></td> <td><strong>Exports</strong></td> <td><strong>0.77</strong></td> </tr>
  <tr> <td><strong>Processed material</strong></td> <td><strong>Dissipative flows</strong></td> <td><strong>0.26</strong></td> </tr>
  <tr> <td><strong>Processed material</strong></td> <td><strong>Material use</strong></td> <td><strong>4.46</strong></td> </tr>
  <tr> <td><strong>Total emissions</strong></td> <td><strong>Emissions to air</strong></td> <td><strong>2.59</strong></td> </tr>
  <tr> <td><strong>Total emissions</strong></td> <td><strong>Emissions to water</strong></td> <td><strong>0.01</strong></td> </tr>
  <tr> <td><strong>Material use</strong></td> <td><strong>Material accumulation</strong></td> <td><strong>2.72</strong></td> </tr>
  <tr> <td><strong>Material use</strong></td> <td><strong>Waste treatment</strong></td> <td><strong>1.75</strong></td> </tr>
  <tr> <td><strong>Waste treatment</strong></td> <td><strong>Waste landfilled</strong></td> <td><strong>0.71</strong></td> </tr>
  <tr> <td><strong>Waste treatment</strong></td> <td><strong>Incineration</strong></td> <td><strong>0.11</strong></td> </tr>
  <tr> <td><strong>Waste treatment</strong></td> <td><strong>Recycling</strong></td> <td><strong>0.72</strong></td> </tr>
  <tr> <td><strong>Waste treatment</strong></td> <td><strong>Backfiling</strong></td> <td><strong>0.21</strong></td> </tr>
</table>

**Processed material 7.98**

**Total emissions 2.60**

stats.caldrivane.example/**matflow**
```

</details>

## How a checker judges spans and flows

A gantt span and a sankey flow are judged on meaning, not on a table shape: a checker accepts any
output that conveys both endpoints of a span at the granularity the axis prints — a positional grid
correctly aligned to the periods included — and accepts a span end one period boundary off. A
flow is accepted wherever the output conveys its source, its target and its value together. A
flow or span whose parts are scattered so that they can no longer be paired is not conveyed.

<!-- skill:generate
- Gantt: write one table row per task bar or milestone, top to bottom: label, start period, end period, with periods in the axis's own tokens ("Jan", "Q1 2025"); a milestone has start = end; for a bar ending on a tick, use the last period it visibly fills.
- If the gantt prints each task's dates in a table beside the bars, transcribe that printed table as it is and add nothing from the bars.
- Sankey: write one table row per ribbon: source node, target node, value, with node names stripped of their printed totals; ordered by source then target.
- When only node totals are printed, use a node's total as the value of its single inflow or single outflow; keep every other printed node total as a text line after the table ("Industry 165"); never estimate values from ribbon widths.
- Head a gantt table <th></th><th>Start</th><th>End</th> and a sankey table <th>Source</th><th>Target</th><th>Value</th>: these protocol header rows are written even though the page does not print them.
-->

<!-- skill:check
- FAIL (MUST) if a gantt bar or milestone has no row, or its start or end is more than one period off the printed axis.
- FAIL (MUST) if a traceable sankey flow with a printed value (or a value given by a single-flow node total) is missing, or its source, target or value is wrong.
- FAIL (MUST) if a sankey value was estimated from ribbon width, or a printed node total is missing from the output.
- FAIL (MUST) if a gantt whose task dates are printed as a table is rendered from the bars instead of that printed table.
- FAIL (MUST) if gantt or flow rows use a column layout other than label-start-end / source-target-value, or a bar ending on a tick is not given the last period it fills.
- FAIL (MUST) if a gantt or sankey table lacks its protocol header row (Start | End; Source | Target | Value), unless the page prints its own headers.
-->

## Related

- [[Labels]] — node names and task labels copied as printed
- [[Values and Tolerances]] — printed values, verbatim; printed beats geometry
- [[Maps and Treemaps]] — the other families where bare geometry is not read
- [[Chart With a Printed Data Grid]] — a gantt whose dates are printed as a table
- [[Cover Every Data Point]] — every task, every ribbon
