---
title: Labels
rule_id: charts-labels
status: rule
scope: page
tags: [charts, labels]
---

# Labels

> [!success] ✅ Normative
> The category labels and series names of a chart table MUST be text printed on the chart — an axis
> tick, a legend entry, a direct label — copied verbatim. A label MUST NOT carry unit text imported
> from elsewhere on the page, colour words, chart-type words or an expanded abbreviation, and two
> dimensions MUST NOT be merged into one label.

Each value in a chart table is located by the labels on its row and in its column, so the labels
are the lookup key of the whole table: a value under the wrong label is a wrong value.

## Which label goes where

| Chart | Row label | Column label |
| --- | --- | --- |
| Single series | the category (`Cleaners`) — see [[Values and Tolerances]] | the series name, or the value-axis title when no name is printed |
| Two-dimensional (grouped, stacked, multi-line) | the category (`China`) | the series (`Ride hailing`) |
| Grouped or nested categories | the category, with its printed group (axis tier) in a column of its own where the category alone repeats | the series |

A value MUST sit at the intersection of exactly the labels that locate it: its category's row and
its series' column. Dimensions stay independent — `2024` in the row and `Revenue` in the column,
never one label `2024 - Revenue`.

## Verbatim, and what "no units" means

Each label is one printed string, copied whole — `SEA`, `> 15000`,
`Option-Adjusted Spread (OAS)`, `REDBIKE (Akira)`, `first-day-of-month price`. Parentheses printed
inside a legend entry are part of the legend text and MUST be kept.

The no-units requirement forbids **importing** unit text from elsewhere on the page into a label.
Where the axis corner prints `(millions of euros)` and the tick prints `2024`, the label is `2024`,
not `2024 (millions of euros)`. Likewise `Revenue`, not `Revenue (USD bn)`, when the unit prints as
an axis note rather than inside the legend entry. The unit note itself is not dropped: it stays in
the output as the chart's own text (see [[Cover Every Data Point]]).

A label MUST NOT be rewritten:

- no colour words — `Blue line - GDP Growth` is `GDP Growth`;
- no descriptive or chart-type suffixes — no `(line)`, no `(bars)`;
- no expanded abbreviations — `SEA` stays `SEA`.

## Positions the axis does not label

A position on a printed, regularly labeled axis that carries no tick label of its own is labeled
by its **axis value** — `2023` on a year axis ticked every third year, `2500` on a bin axis labeled
every other bin. That label is a reading against printed calibration, not invented text (see
[[Cover Every Data Point]]).

## Several charts with the same labels

Each chart or panel has its own chart table with its own printed title in `<caption>` (see
[[Multiple Charts and Reference Ink]]), so charts that reuse one label set are told apart by their
captions, without altering their labels. The caption appears once inside the table, first or last
according to reading order (see [[Titles Banners Captions]]).

- The twin pies in [[Legend and Overlay Values]] reuse every slice name; each pie's title
  (`Month of September 2025: $346B`, `Fiscal Year 2025 to Date: $7,010B`) is what distinguishes
  them.
- The solar panels in [[Multiple Charts and Reference Ink]] need nothing more: `China` with `619`
  appears only in the avoided-emissions panel.

A point that no printed label can locate is not rendered in the chart table (see
[[Cover Every Data Point]]); the unnamed companion curve in [[Legend and Overlay Values]] is the
standing example.

### ✅ **Sample** — `mobility-survey-2024_p13`

![[chart-mobility-bars.png]]

Four legend series over eight labeled regions, every value printed on its bar: 32 values, rows
labeled from the axis and columns from the legend, verbatim. Region abbreviations stay as printed
(`SEA`, `ME`, `NEA`). The values printed in heavier type are bold in the table; the red ones carry
no colour mark, since colour on a data label is styling.

<details>
<summary>Expected Markdown</summary>

```markdown
<table data-source="chart">
  <caption><strong>Figure 7. Average monthly usage of new mobility services</strong>
<strong>How many times do you use new mobility services in a normal month?</strong>
Only urban respondents</caption>
  <tr> <th></th> <th>Car sharing</th> <th>Ride hailing</th> <th>Ride sharing</th> <th>2-wheeler sharing</th> </tr>
  <tr> <td>Global</td> <td>2.9</td> <td>3.5</td> <td>2.7</td> <td>3.6</td> </tr>
  <tr> <td>China</td> <td>2.4</td> <td>3.8</td> <td>2.3</td> <td>3.9</td> </tr>
  <tr> <td>SEA</td> <td><strong>3.6</strong></td> <td><strong>4.4</strong></td> <td><strong>3.7</strong></td> <td>3.6</td> </tr>
  <tr> <td>India</td> <td><strong>3.9</strong></td> <td><strong>4.5</strong></td> <td><strong>3.6</strong></td> <td><strong>4.5</strong></td> </tr>
  <tr> <td>ME</td> <td>3.3</td> <td>3.5</td> <td><strong>3.3</strong></td> <td>4.1</td> </tr>
  <tr> <td>Europe</td> <td>3.0</td> <td><strong>2.3</strong></td> <td>2.3</td> <td>3.1</td> </tr>
  <tr> <td>US</td> <td>3.3</td> <td><strong>2.9</strong></td> <td>2.9</td> <td>2.5</td> </tr>
  <tr> <td>NEA</td> <td><strong>2.2</strong></td> <td>3.9</td> <td>2.5</td> <td>3.8</td> </tr>
</table>

Source: Corvanta Mobility Panel 2024
```

</details>

<!-- skill:generate
- Take every row label and series name from text printed on the chart (axis ticks, legend entries, direct labels) and copy it exactly: keep abbreviations and parentheses inside legend text; never add colour words, chart-type words or units printed elsewhere (an axis note like "(USD bn)" stays out of the label and is kept as its own text).
- Put each dimension in its own place: category in the row label, series in the column header; never merge them into one label like "2024 - Revenue".
- Label an unlabeled position on a regularly labeled axis by its axis value (e.g. 2023).
- Give each chart its own table with its printed title in <caption>, first or last inside the table according to reading order; do not repeat it outside the table.
-->

<!-- skill:check
- FAIL (MUST) if a row label or column header of a chart table is not text printed on the chart, apart from axis values for unlabeled positions on a regularly labeled axis.
- FAIL (MUST) if a label differs from its printed string: expanded abbreviation, added colour word, added chart-type word, or unit text imported from an axis note.
- FAIL (MUST) if a value sits in a row or column other than those of the category and series that locate it on the page.
- FAIL (MUST) if two dimensions are merged into one label (e.g. "2024 - Revenue").
-->

## Related

- [[Cover Every Data Point]] — axis-value labels for unlabeled positions, and the chart table itself
- [[Values and Tolerances]] — the same verbatim discipline for printed values
- [[Multiple Charts and Reference Ink]] — several charts on one page, each under its own title
- [[Legend and Overlay Values]] — the twin pies and the curve no label can locate
