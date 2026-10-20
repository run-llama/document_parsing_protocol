---
title: Values and Tolerances
rule_id: charts-values-and-tolerances
status: rule
scope: page
tags: [charts, values]
---

# Values and Tolerances

> [!success] ✅ Normative
> Each cell of a chart table holds one of three values. A value **printed** on the chart MUST be
> copied character for character and in full. A value **not printed** MUST be estimated at the
> mark's visual centre against the mark's own axis. A mark **drawn at the baseline**, or a labeled
> position with **no mark**, MUST be `0`.

## Printed values — copied exactly

Whatever the chart prints at, on or beside the mark is the value, in full:

- `25 (13.0%)` stays `25 (13.0%)` — not `25`, not `13.0%`, and never `25 countries (13.0%)`;
- printed formats stay: thousands separators (`11,270`), decimal commas (`2,08`), currency and
  percent marks, parentheses for negatives (`($60B)`), footnote markers (`<sup>1,2</sup>3.60`);
- printed beats geometry: where the label says `43`, the value is `43` even if the bar top measures
  a hair lower.

## Estimated values — the visual centre

Where nothing is printed, the value is read at the mark's **visual centre** against **its own**
axis — a second axis where the series is scaled by one (see [[Dual-Axis and Combo Charts]]), the
decade bands of a logarithmic axis (see [[Log Scale Charts]]), and a stacked segment's own two
boundaries (see [[Stacked Bars and Waterfalls]]).

An estimate SHOULD be a value a careful reader could defend within the readability tolerance
below — neither falsely precise nor coarser than the axis allows.

**How an estimated value is written.** An estimated value MUST be written as a bare number in the
axis's own format — its unit mark (`2.5%` on a percent axis) and its digit grouping (`17 000` on an
axis ticked `18 000`) — with no approximation marker, and no more precise than the reading
supports: at most one decimal place beyond the axis's tick labels, and two significant figures on a
logarithmic axis. Whether a value was printed or estimated is recoverable from the page and is not
marked in the Markdown.

## Zeros

A mark **drawn at the baseline** is `0`. A **labeled position with no mark at all** is also `0` —
the histogram's empty `1500` bin is `0` (see [[Bars and Histograms]]). A stack that simply has no
segment of one series leaves that cell empty instead (see [[Stacked Bars and Waterfalls]]).

## Bars drawn in perspective

A printed bar value is copied first. Otherwise the value-bearing edge is read against the
corresponding axis plane, excluding perspective depth. Where the reference plane is ambiguous, the
value is the midpoint of the plausible readings.

## How a checker compares values

A checker compares each cell with the value it reads off the page:

- **Printed value** — the same number, compared exactly. Formatting variants of the same number
  (thousands separators, decimal comma or point, currency and percent marks) MAY be treated as
  equal; a different number is wrong.
- **Estimated value** — accepted within a **relative tolerance** of the checker's own reading,
  chosen by how readable the mark is:

| How readable is the mark? | Relative tolerance |
| --- | --- |
| Sits on a gridline | 0.05 |
| Between gridlines, judgeable | 0.1 |
| Small, dense, or unclear scale | 0.15 – 0.2 |
| Near zero, where a relative band is too narrow | wider, as the reading demands (a `-1` read on a 10-unit grid takes 0.3) |

Most estimates fall between 0.05 and 0.15, and a tolerance above 0.2 is exceptional. The tolerance
is the range a careful eye can defend: not so tight that a second careful reading fails it, not so
loose that a wrong reading passes. For bars drawn in perspective it is widened to cover every
plausible reading.

### ✅ **Sample** — `health-workforce-2024_p46`

![[chart-nurses-bars.png]]

One series, twelve bars. Three bars print their number (`43`, `22`, `5`) and are copied exactly;
the other nine are estimates against the 5-unit grid, most on or near a gridline (tolerance 0.05),
the small `Software developers` bar harder to judge (0.1). `Doctors` stays `5` although its bar top
measures a touch lower. The red `EU average` bar is an ordinary row: highlighting is styling, not
structure. The single series has no printed name, so its column is headed by the value-axis title.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Figure 1.10. Almost a quarter of nurses and half of personal care workers report financial difficulties across EU countries</strong></caption>
  <tr> <th></th> <th>% of workers in shortage occupations reporting difficulty in making ends meet</th> </tr>
  <tr> <td>Cleaners</td> <td>47</td> </tr>
  <tr> <td>Cooks and waiters</td> <td>44</td> </tr>
  <tr> <td>Personal care workers</td> <td>43</td> </tr>
  <tr> <td>Salespeople</td> <td>34</td> </tr>
  <tr> <td>Building workers</td> <td>33</td> </tr>
  <tr> <td>Truck and bus drivers</td> <td>32</td> </tr>
  <tr> <td>Metal workers</td> <td>27</td> </tr>
  <tr> <td>EU average</td> <td>26</td> </tr>
  <tr> <td>Electronic workers</td> <td>25</td> </tr>
  <tr> <td>Nurses</td> <td>22</td> </tr>
  <tr> <td>Software developers</td> <td>7</td> </tr>
  <tr> <td>Doctors</td> <td>5</td> </tr>
</table>

Source: Ostrevane Social Observatory (2023), *Employment and social trends in Europe 2023*, <u>https://data.ostrevane.example/doi/est-2023</u>.

***StatLink*** https://stat.ostrevane.example/jf50p8
```

</details>

### ✅ **Sample** — bars drawn in perspective

![[bag-3d-bars.png]]

Two 3-D bar charts with no printed values. Each bar has a front top edge and a back top edge at
different heights. The axis ticks and the baseline sit on the front plane, so the front top edge is
the value-bearing edge; every value below is an estimate, read to two significant figures on the
first chart and to a tenth of a percent on the second. The tick labels print `1.200` and `12.00%`,
but an estimate is not written to that precision. The paragraphs between and around the charts are
elided.

<details>
<summary>Expected Markdown · excerpt, the two charts</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <caption><strong>Total Assets (JD mn)</strong></caption>
  <tr> <td>1998</td> <td>1.0</td> </tr>
  <tr> <td>1999</td> <td>1.1</td> </tr>
  <tr> <td>2000</td> <td>1.4</td> </tr>
  <tr> <td>2001</td> <td>1.6</td> </tr>
  <tr> <td>2002</td> <td>1.7</td> </tr>
</table>
<!-- … -->

<table data-source="chart">
  <caption><strong>Market Share for Direct Facilities (Caldrivane Branches)</strong></caption>
  <tr> <td>Overdraft</td> <td>9.3%</td> </tr>
  <tr> <td>Syndicated Loans</td> <td>4.5%</td> </tr>
  <tr> <td>Loans & Advances</td> <td>11.2%</td> </tr>
  <tr> <td>Discounted Bills</td> <td>14.7%</td> </tr>
</table>

<!-- … -->
```

</details>

<!-- skill:generate
- Copy every value printed on or beside a mark exactly and in full: "25 (13.0%)", "2,08", "($60B)", "$1,581B", footnote markers as <sup>; a printed value beats what the bar height suggests.
- Where no value is printed, estimate the mark's visual centre against its own axis (the right-hand axis for a series scaled by it, the decade bands of a log axis, a stacked segment's own two edges) and write a bare number in the axis's format (keep its % mark and digit grouping), no "~", no more precise than the grid supports.
- Write 0 for a mark drawn at the baseline and for a labeled position with no mark.
- For 3-D bars, read the edge on the axis plane, not the perspective top; if the plane is ambiguous, take the midpoint of the plausible readings.
-->

<!-- skill:check
- FAIL (MUST) if a value printed on the chart is missing, truncated, reformatted to a different number, or stripped of printed parts (the percentage in "25 (13.0%)", the parentheses of a negative).
- FAIL (MUST) if an estimated value lies outside the readability tolerance of the checker's own reading: 0.05 on a gridline, 0.1 between gridlines, 0.15–0.2 for small or dense marks, wider only near zero.
- FAIL (MUST) if a mark at the baseline or a labeled position with no mark holds anything but 0.
- FAIL (MUST) if an estimate was read against the wrong axis or as a cumulative height instead of the mark's own value.
- FAIL (MUST) if an estimated value carries an approximation marker or more precision than the axis grid supports.
-->

## Related

- [[Labels]] — locating the cell a value belongs to
- [[Cover Every Data Point]] — zeros for empty labeled positions, and full coverage
- [[Log Scale Charts]] — reading against logarithmic bands
- [[Legend and Overlay Values]] — charts where the printed values are the whole story
- [[Ground Truth — Charts]] — how estimated values are measured for ground truth
