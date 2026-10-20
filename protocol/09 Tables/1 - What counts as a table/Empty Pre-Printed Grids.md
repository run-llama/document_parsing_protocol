---
title: Empty Pre-Printed Grids
rule_id: tables-empty-pre-printed-grids
status: rule
scope: page
tags: [tables, forms, degenerate]
---

# Empty Pre-Printed Grids

> [!success] ✅ Normative
> A printed grid with no values entered MUST be rendered as a table, with its headers and **every
> printed empty row** as a row of empty cells. It MUST NOT be skipped, and MUST NOT be reduced to its
> headers alone.

A blank form table — full ruled structure, headers printed, no values entered anywhere.

```text
| Name | Date | Amount | Signature |
|      |      |        |           |
|      |      |        |           |
```

## Requirements

- The grid MUST be rendered as a table. The headers are the content: they are what the form asks
  for.
- Every printed empty row MUST be rendered, as empty cells. An empty cell is a cell.
- The headers MUST NOT be emitted on their own. A headers-only output is the degenerate shape ruled
  out in [[Header-Only Tables]]; here the printed empty rows are the body, so keeping them avoids
  that shape.
- The table MUST NOT be skipped because it has no data. A page with a printed form on it is not
  blank.
- A long run of identical empty rows — dozens of them — MUST be rendered in full, never trimmed to a
  representative few.

### ✅ **Sample** — `xx`

![[zoo-xx.png]]

An NAIC rate-filing exhibit where every row after the first is a blank template row awaiting
entry — the structure *is* the content. Each blank row still prints `XX` and the computed
`0.00%` / `0.00` subtotals, and all nine are kept. Each column header is one label wrapped over many
lines, so its lines are joined into one cell, including the words broken mid-word by the narrow
columns.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th colspan="32">Data Item for Specified Rating Pool</th> </tr>
  <tr> <th> </th> <th> </th> <th> </th> <th colspan="29">For the rate period included in the immediately prior rate adjustment filing (or initial form &amp; rate filing)</th> </tr>
  <tr> <th>1. Market Segment</th> <th>2. Description of rating pool within the market segment</th> <th> </th> <th>18. Period assumed - beginning date (MM/DD/YY)</th> <th>19. Period assumed - ending date (MM/DD/YY)</th> <th>20. Average annual claim trend assumed</th> <th>21.1 Regulatory authority licenses and fees, including New York State 332 assessment as a % of gross premium</th> <th>21.2 Administrative expenses for activities that improve health care quality as defined in the NAIC Annual Statement Supplement Health Care Exhibit - as a % of gross premium</th> <th>21.3 Commissions and broker fees - as a % of gross premium</th> <th>21.4 Premium Taxes - as a % of gross premium</th> <th>21.5 Other state and federal taxes and assessments (other than income taxes and assessments) - as a % of gross premium</th> <th>21.6 Other administrative expenses - as a % of gross premium</th> <th>21.7 Subtotal columns 21.1 through 21.6</th> <th>22. After tax underwriting margin (profit/contribution to surplus) - as a % of gross premium</th> <th>23. State income tax component - as a % of gross premium</th> <th>23.1 State income tax rate assumed (eg 3%)</th> <th>24. Federal income tax component - as a % of gross premium</th> <th>24.1 Federal income tax rate assumed (eg 30%)</th> <th>25. Reduction for assumed net investment income - as a % of gross premium (enter as a negative value)</th> <th>26. Subtotal lines 21.7 + 22 + 23 + 24 + 25</th> <th>27.1 Regulatory authority licenses and fees, including New York State 332 assessment expenses - $pmpm</th> <th>27.2 Administrative expenses for activities that improve health care quality as defined in the NAIC Annual Statement Supplement Health Care Exhibit - as $pmpm</th> <th>27.3 Commissions and broker fees - as $pmpm</th> <th>27.4 Premium Taxes - as $pmpm</th> <th>27.5 Other state and federal taxes and assessments (other than income taxes and assessments) - as $pmpm</th> <th>27.6 Other administrative expenses - as $pmpm</th> <th>27.7 Subtotal lines 27.1 through 27.6</th> <th>28. After tax underwriting margin (profit/contribution to surplus) - as $pmpm</th> <th>29. State income tax component - as $pmpm</th> <th>30. Federal income tax component - as $pmpm</th> <th>31. Reduction for assumed net investment income - as $pmpm (enter as a negative value)</th> <th>32. Subtotal columns 27.7 through 31</th> </tr>
  <tr> <td>HNY-IND</td> <td>Healthy NY</td> <td>XX</td> <td>1/1/2012</td> <td>12/31/2012</td> <td>15.2%</td> <td>0.80%</td> <td>0.00%</td> <td>1.54%</td> <td>2.71%</td> <td>0.00%</td> <td>6.16%</td> <td>11.21%</td> <td>-1.21%</td> <td>0.00%</td> <td>7.10%</td> <td>0.00%</td> <td>34.00%</td> <td>0.00%</td> <td>10.00%</td> <td>2.40</td> <td>0.00</td> <td>4.62</td> <td>8.14</td> <td>0.00</td> <td>18.46</td> <td>33.62</td> <td>(3.64)</td> <td>0.00</td> <td>0.00</td> <td>0.00</td> <td>29.98</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
</table>
```

</details>

## Why

A reader of a blank form is asking "what fields does this form ask for?", and the structure answers
that question completely. Returning nothing gives nothing for a page that is manifestly not blank.

The row count is the awkward part: reproducing forty empty rows is faithful and repetitive,
reproducing one is compact and unfaithful. **Faithful wins** — trimming cannot be undone
downstream, while ignoring extra empty rows can be (**never drop**).

### ✅ **Sample** — a court scheduling order

![[bag-court-schedule-grid.png]]

`SCHEDULING AND CUTOFF DATES`: three columns, nine rows, every row's description printed and its
two date cells empty. The banner above the header row is a title band inside the frame.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
**IT IS HEREBY ORDERED** that the parties and their respective counsel shall comply with the following schedule, and that Sanctions, including but not limited to those set forth in the Local Court Rules may be imposed for noncompliance.

<table>
  <tr> <th colspan="3">SCHEDULING AND CUTOFF DATES</th> </tr>
  <tr> <th>DAYS PRIOR TO TRIAL</th> <th>DATE</th> <th>DESCRIPTION</th> </tr>
  <tr> <td> </td> <td> </td> <td>Disclosure of possible primary witnesses</td> </tr>
  <tr> <td> </td> <td> </td> <td>Disclosure of possible additional witnesses</td> </tr>
  <tr> <td> </td> <td> </td> <td>Discovery cutoff</td> </tr>
  <tr> <td> </td> <td> </td> <td>Settlement Conference</td> </tr>
  <tr> <td> </td> <td> </td> <td>Last day to hear Dispositive Pretrial Motions</td> </tr>
  <tr> <td> </td> <td> </td> <td>Exchange of Witness and Exhibit Lists</td> </tr>
  <tr> <td> </td> <td> </td> <td>Joint Statement of the Evidence</td> </tr>
  <tr> <td> </td> <td> </td> <td>Filing of Trial Briefs</td> </tr>
  <tr> <td> </td> <td> </td> <td>TRIAL to begin at 9:00 a.m.</td> </tr>
</table>

<!-- … -->
```

</details>

<!-- skill:generate
- Render a printed grid with no values entered as an HTML <table>: its header rows plus one row of empty cells for every printed empty row.
- Keep every printed row, even dozens of identical empty ones; never trim them to a few.
- Keep any values the empty rows do print (codes, computed zeros) in their cells.
- Never output the header row alone as a table, and never skip an empty form grid.
-->

<!-- skill:check
- FAIL (MUST) if a printed empty grid on the page is missing from the Markdown or rendered as headers only.
- FAIL (MUST) if the table has fewer rows than the grid prints.
-->

## Related

- [[Header-Only Tables]] — the degenerate shape an empty grid must not collapse into
- [[Forms and Key-Value Regions]] — the form content around such a grid
- [[Blank and Spacer Rows]] — blank rows inside a filled table, a different case
- [[Is This Even a Table]] — why a ruled grid with headers is a table even when empty
