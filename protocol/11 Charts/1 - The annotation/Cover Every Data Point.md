---
title: Cover Every Data Point
rule_id: charts-cover-every-data-point
status: rule
scope: page
tags: [charts, basics]
---

# Cover Every Data Point

> [!success] ✅ Normative
> A chart MUST be rendered as a **chart table** that holds **every data point the chart draws**:
> every category position × every series, plus every printed callout that belongs to a position.
> A data point MUST NOT be skipped because it is hard to read; it MAY be left out only when no
> printed text can locate it or it is genuinely unreadable.

A chart is a data display, so its conforming rendering is its content — see
[[Images and Figures]]. A rendering that gets a few prominent points right while the rest of the
chart is missing is not a rendering of the chart.

## What full coverage means

| Chart | Data points the chart table MUST hold |
| --- | --- |
| Grouped or stacked bars | positions × series (the sample below: 6 years × 4 groups = 24 values) |
| Single series | one per position |
| Printed callouts and totals | one each, where a printed label can locate them — see [[Legend and Overlay Values]] |
| Multi-panel figure | every panel, without exception — see [[Multiple Charts and Reference Ink]] |

Two kinds of position MUST still be covered:

- **A labeled position with no mark** is a data point whose value is `0` — the histogram's empty
  `1500` bin is `0` (see [[Bars and Histograms]]).
- **A position the axis does not label** is located by its axis value: `2023` on a year axis that
  ticks every third year, `2500` on a bin axis that labels every other bin. The printed, regularly
  labeled axis is the calibration; a position that no printed calibration reaches is not locatable.

## What may be left out

The default is **in**. A data point that can be read MAY be left out only when:

- no printed text can uniquely locate it — see [[Labels]]; the unnamed companion curve in
  [[Legend and Overlay Values]] is the standing example; or
- it is genuinely unreadable — too blurred, too dense, or overlapping beyond judgment.

Leaving a point out MUST NOT be replaced by invented text: a made-up series name, a made-up
category or a placeholder cell stands for nothing on the page (see [[Never Drop, Never Invent]]).

## The page is the only reference

Values are read from the page. A value MUST NOT be shaded towards what some parser or earlier
rendering produced, and a correct value stays correct however many renderings disagree with it
(see [[The Page Is the Ground Truth]]).

## The chart table

Every table representing a chart MUST open with `<table data-source="chart">`. The
`data-source="chart"` attribute belongs on the opening `<table>` tag, including when the chart
prints a data grid that supplies the table's content (see [[Chart With a Printed Data Grid]]).
A table representing an ordinary printed table MUST NOT carry `data-source="chart"`.

**The layout of the chart table.** A chart table MUST be laid out as follows, so that every chart
table reads the same way — category down, series across:

- one HTML `<table data-source="chart">` per chart or panel, at the chart's place in reading order;
- the chart's title, subtitle or caption in `<caption>` inside that table, first or last according
  to reading order (see [[Titles Banners Captions]]); its printed notes and source follow the table;
- one row per category position (axis tick, bar, bin, slice, tile, region, named point), in the
  order the axis runs — left to right, top to bottom, a pie clockwise from the top;
- a first column holding the category labels, then one column per series in legend order;
- a header row holding the printed series names, its first cell holding the printed category-axis
  title or left empty; a single series with no printed name is headed by the printed value-axis
  title; when nothing printed names any column, the table has no header row;
- a printed total that is not itself a category (a stack total above its bar) sits in a last column
  under an empty header cell;
- printed text of the chart that is not a data point — axis titles not used as headers, unit notes,
  reference-line labels, event callouts, annotation boxes, legend entries of series that carry no
  value — follows the table as plain text in reading order.

The value in each cell is governed by [[Values and Tolerances]]; the labels in the first column and
the header row by [[Labels]].

### ✅ **Sample** — `digital-services-survey-2024_p62`

![[chart-digital-services-stack.png]]

Six stacked bars over six labeled years, four legend series, every segment printing its value: full
coverage is 6 × 4 = **24 values**, all printed, so all copied as printed — count and share
together.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption>Figure 2.2 Number and percentage of municipalities in each DSI group, 2014 to 2024</caption>
  <tr> <th></th> <th>Low DSI</th> <th>Middle DSI</th> <th>High DSI</th> <th>Very high DSI</th> </tr>
  <tr> <td>2014</td> <td>32 (16.6%)</td> <td>74 (38.3%)</td> <td>62 (32.1%)</td> <td>25 (13.0%)</td> </tr>
  <tr> <td>2016</td> <td>32 (16.6%)</td> <td>57 (29.5%)</td> <td>75 (38.9%)</td> <td>29 (15.0%)</td> </tr>
  <tr> <td>2018</td> <td>15 (7.8%)</td> <td>65 (33.7%)</td> <td>73 (37.8%)</td> <td>40 (20.7%)</td> </tr>
  <tr> <td>2020</td> <td>8 (4.1%)</td> <td>59 (30.6%)</td> <td>69 (35.8%)</td> <td>57 (29.5%)</td> </tr>
  <tr> <td>2022</td> <td>7 (3.6%)</td> <td>53 (27.5%)</td> <td>73 (37.8%)</td> <td>60 (31.1%)</td> </tr>
  <tr> <td>2024</td> <td>11 (5.7%)</td> <td>44 (22.8%)</td> <td>62 (32.1%)</td> <td>76 (39.4%)</td> </tr>
</table>

*Sources*: 2014-2024 Caldrivane Digital Services Surveys.
```

</details>

<!-- skill:generate
- Render every chart as an HTML <table data-source="chart"> of its data: one row per category position (in axis order), one column per series (in legend order), the category labels in the first column and the printed series names in a header row.
- Include every position of every series and every printed callout; a labeled position with no mark is 0; a position the axis does not label gets a row labeled by its axis value (2023 between ticks 2021 and 2024).
- Put the chart's printed title, subtitle or caption in <caption> inside its table, first if read before the chart and last if read after it. Put notes, source and other printed chart text (axis titles not used as headers, reference-line labels, callouts, annotation boxes) after the table as plain text.
- Leave out only points that no printed label can locate or that are unreadable; never invent a series name, category or placeholder cell to cover them.
-->

<!-- skill:check
- FAIL (MUST) if a table representing a chart lacks data-source="chart" on its opening <table> tag, or an ordinary printed table carries that attribute.
- FAIL (MUST) if a chart is rendered as an image reference, a placeholder or a prose description instead of a chart table.
- FAIL (MUST) if a series, a panel, or any category position of a readable series is missing from the chart table (count positions × series on the page).
- FAIL (MUST) if a labeled position with no mark is missing or holds a value other than 0.
- FAIL (MUST) if the chart table contains a series name, category or cell that the page does not print or draw.
- FAIL (MUST) if the chart table departs from category-down, series-across, places its caption on the wrong side of its rows in reading order, or places notes before the table.
-->

## Related

- [[Images and Figures]] — why a chart is rendered as a chart table at all
- [[Labels]] — the text in the first column and the header row
- [[Values and Tolerances]] — what each cell holds: printed, estimated, zero
- [[Multiple Charts and Reference Ink]] — coverage across panels, and what is not data
- [[Ground Truth — Charts]] — producing chart ground truth against this rule
