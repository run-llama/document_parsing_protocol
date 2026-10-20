---
title: Legend and Overlay Values
rule_id: charts-legend-and-overlay-values
status: rule
scope: page
tags: [charts, types]
---

# Legend and Overlay Values

> [!success] ✅ Normative
> When a chart's values are printed only in its legend or as data labels over its marks, those
> printed numbers **are** the data: every one of them MUST be in the chart table, copied exactly. A
> companion series without printed values is estimated as usual — unless no printed label can
> locate its points, in which case it has no column (see [[Labels]]).

Values print in three places, and all three are treated the same (see [[Values and Tolerances]]):

| Where the value prints | What goes in the table |
| --- | --- |
| **On or beside each mark** — bar-top numbers, slice amounts, point callouts | the printed value in the mark's cell |
| **In the legend** — `Solar (45%)`-style entries | the name part as the row or column label, the number part as the value |
| **At a direct label** — a line end stating its value (see [[Line Charts]]) | the printed value in the cell of that end position |

### ✅ **Sample** — `MonthlyTreasuryStatement_202509_p8`

![[chart-outlays-pies.png]]

Twin pies sharing one legend, amounts printed beside the slices. Every slice name appears in both
pies with a different value, so each pie is its own table under its own printed title, and the
title is what tells them apart. Rows follow each pie clockwise from the top. The amounts are copied
as printed — `$1,581B` with its separator, and `($60B)`, whose parentheses mark the `Other` slice
of September as negative. The footnote under the legend is cut off at the bottom of the page and is
elided.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Figure 7. Outlays of the U.S. Government, by Source, Fiscal Year 2025</strong>
<strong>Month of September 2025: $346B</strong></caption>
  <tr> <td>Social Security</td> <td>$133B</td> </tr>
  <tr> <td>Medicare</td> <td>$32B</td> </tr>
  <tr> <td>Income Security</td> <td>$34B</td> </tr>
  <tr> <td>Health</td> <td>$94B</td> </tr>
  <tr> <td>National Defense</td> <td>$76B</td> </tr>
  <tr> <td>Net Interest</td> <td>$37B</td> </tr>
  <tr> <td>Other</td> <td>($60B)</td> </tr>
</table>

<table data-source="chart">
  <caption><strong>Fiscal Year 2025 to Date: $7,010B</strong></caption>
  <tr> <td>Social Security</td> <td>$1,581B</td> </tr>
  <tr> <td>Medicare</td> <td>$997B</td> </tr>
  <tr> <td>Income Security</td> <td>$702B</td> </tr>
  <tr> <td>Health</td> <td>$979B</td> </tr>
  <tr> <td>National Defense</td> <td>$917B</td> </tr>
  <tr> <td>Net Interest</td> <td>$970B</td> </tr>
  <tr> <td>Other</td> <td>$865B</td> </tr>
</table>

<!-- … -->
```

</details>

### ✅ **Sample** — `upstream_financial_review_2024_p9`

![[chart-crude-line.png]]

A daily price curve with no printed name or values, and a triangle-marker series whose legend entry
reads `first-day-of-month price`, all twelve of its values printed at the markers. The named series
is the table's one column: 12 printed values, copied with their `$`. The daily curve has no printed
name that could head a column — `Jan` alone also locates the marker series — so it gets no column.
The two bold average statements are printed text, not data points, and follow the table.

<details>
<summary>Expected Markdown</summary>

```markdown
dollars per barrel (b)

<table data-source="chart">
  <caption><strong>Benchmark crude oil front-month futures prices</strong></caption>
  <tr> <th></th> <th><strong>first-day-of-month price</strong></th> </tr>
  <tr> <td>Jan</td> <td>$75.89</td> </tr>
  <tr> <td>Feb</td> <td>$78.70</td> </tr>
  <tr> <td>Mar</td> <td>$83.55</td> </tr>
  <tr> <td>Apr</td> <td>$87.42</td> </tr>
  <tr> <td>May</td> <td>$83.44</td> </tr>
  <tr> <td>Jun</td> <td>$78.36</td> </tr>
  <tr> <td>Jul</td> <td>$86.60</td> </tr>
  <tr> <td>Aug</td> <td>$79.52</td> </tr>
  <tr> <td>Sep</td> <td>$77.52</td> </tr>
  <tr> <td>Oct</td> <td>$73.56</td> </tr>
  <tr> <td>Nov</td> <td>$73.10</td> </tr>
  <tr> <td>Dec</td> <td>$71.83</td> </tr>
</table>

**Benchmark 2024 first-day-of-month average = $79.12/b**

**Benchmark 2023 first-day-of-month average = $82.83/b**

Data source: Ostrevane Commodity Exchange, Borvika Data Services
```

</details>

<!-- skill:generate
- When values are printed on the marks, beside slices, in the legend or at line ends, put every printed value in the chart table exactly as printed ("$1,581B", "($60B)", "$75.89").
- For a legend entry like "Solar (45%)", use "Solar" as the label and "45%" as the value.
- Give twin charts that reuse the same labels one table each, under each chart's printed title.
- Give an unnamed series that no printed label can locate no column; never invent a name for it.
-->

<!-- skill:check
- FAIL (MUST) if any value printed on the chart (on a mark, beside a slice, in the legend, at a line end) is missing from the chart table or not copied exactly, including its sign, parentheses, currency mark and separators.
- FAIL (MUST) if a legend entry carrying a value is split wrongly: the number left in the label, or the name left in the value.
- FAIL (MUST) if a column is given to a series that no printed label names, under an invented name.
-->

## Related

- [[Values and Tolerances]] — printed values, verbatim
- [[Labels]] — the twin pies told apart by their titles; the curve no label can locate
- [[Maps and Treemaps]] — compositions that are nothing but printed values
- [[Dual-Axis and Combo Charts]] — a combo chart whose every mark prints its value
