---
title: Log Scale Charts
rule_id: charts-log-scale-charts
status: rule
scope: page
tags: [charts, types]
---

# Log Scale Charts

> [!success] ✅ Normative
> A logarithmic axis changes the reading, not the chart table. Unprinted values MUST be estimated
> against the **printed decade bands**, by the mark's position inside its band, and SHOULD be given
> to no more than two significant figures.

On a tenfold-per-band axis the same visual gap covers ever larger ranges, so a value is
interpolated by **position inside the band**, not linearly: a mark a third of the way from `1 000`
to `10 000` is near `2 000`, not near `4 000`. The tolerance a checker allows is chosen by
readability like any estimate (see [[Values and Tolerances]]).

Event callouts naming years (`1976: Tangshan Earthquake, China`) are commentary: they add no row or
column, and their text is kept as text (see [[Multiple Charts and Reference Ink]]).

### ✅ **Sample** — `catastrophe-review-2025_p26`

![[chart-victims-log.png]]

Two charts over the same 55-year axis ticked every third year: event counts on a linear axis
(Figure 16) and victims on `1 000` → `10 000 000` decade bands (Figure 17). Each has its own table
under its own title, both series across all 55 years — the ticked years by their printed labels,
the years between by their axis values (`1971`, `2023`). On the log chart, every value is a
band-position estimate to two significant figures, written in the axis's digit grouping, except
the two 2024 values, which the side text prints (`11 000`, `3 200`): printed beats geometry, so they
are copied. The event callouts and the side text follow the log chart's table as text. Only the
first two and last two years of each table are shown.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table data-source="chart">
  <caption><strong>Figure 16</strong>
Number of events, 1970 - 2024</caption>
  <tr> <th></th> <th>Man-made disasters</th> <th>Natural catastrophes</th> </tr>
  <tr> <td>1970</td> <td>70</td> <td>36</td> </tr>
  <tr> <td>1971</td> <td>62</td> <td>35</td> </tr>
<!-- … -->
  <tr> <td>2023</td> <td>115</td> <td>219</td> </tr>
  <tr> <td>2024</td> <td>108</td> <td>228</td> </tr>
</table>
Source: Caldrivane Institute

<table data-source="chart">
  <caption><strong>Figure 17</strong>
Number of victims, 1970 - 2024</caption>
  <tr> <th></th> <th>Man-made disasters</th> <th>Natural catastrophes</th> </tr>
  <tr> <td>1970</td> <td>3 000</td> <td>400 000</td> </tr>
  <tr> <td>1971</td> <td>2 600</td> <td>16 000</td> </tr>
<!-- … -->
  <tr> <td>2023</td> <td>3 600</td> <td>70 000</td> </tr>
  <tr> <td>2024</td> <td>3 200</td> <td>11 000</td> </tr>
</table>

1970: Bangladesh storm, Peru earthquake

1976: Tangshan Earthquake, China

1991: Cyclone Gorky, Bangladesh

2004: Indian Ocean Earthquake and tsunami

2008: Cyclone Nargis, Myanmar

2010: Haiti Earthquake

2023: Turkey & Syria earthquake

**2024: 11 000 victims** from natural catastrophes, below the 2004–2023 annual average.

**2024: 3 200 victims** from man-made disasters, in line with recent years.

Note: Scale is logarithmic: the number of victims increases tenfold per band. Source: Caldrivane Institute
```

</details>

<!-- skill:generate
- On a logarithmic axis, estimate each unprinted value by where the mark sits inside its decade band (a third of the way from 1 000 to 10 000 is about 2 000), to at most two significant figures, in the axis's digit grouping ("16 000").
- Use values printed anywhere for a point (at the mark or in side text naming it) instead of an estimate.
- Keep event callouts as text after the table; never turn them into rows or columns.
-->

<!-- skill:check
- FAIL (MUST) if a value on a logarithmic axis was interpolated linearly across a band (off by more than the readability tolerance from the band-position reading).
- FAIL (MUST) if a value printed for a point (at the mark or in side text) is replaced by an estimate.
- FAIL (MUST) if an event callout appears as a row, column or value of the chart table, or its text is missing from the output.
- WARN (SHOULD) if a log-axis estimate carries more than two significant figures.
-->

## Related

- [[Values and Tolerances]] — estimates and tolerances, whatever the axis
- [[Line Charts]] — the linear-axis version of the same coverage
- [[Labels]] — axis-value labels for unticked years
- [[Multiple Charts and Reference Ink]] — event callouts as commentary
