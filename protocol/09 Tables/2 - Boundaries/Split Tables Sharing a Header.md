---
title: Split Tables Sharing a Header
rule_id: tables-split-tables-sharing-a-header
status: rule
scope: page
tags: [tables, boundaries, headers, proposed-rule]
---

# Split Tables Sharing One Header Row / Label Column

> [!success] ✅ Normative
> Fragments that share a header row or a label column printed only once MUST be rendered as **one
> table**. The missing header is the proof that the second fragment was never meant to stand alone.

A grid is sometimes printed as two or more visually separated fragments — a gap, a page-design
break, a divider — with the header row or the label column printed **once** and not repeated in the
second fragment. Read on its own, the second fragment is unreadable without the header above it, so
it is not a separate table. Emitting it as a separate headerless table, or dropping it, loses the
meaning of every value in it (**never drop**).

```text
Printed:   | Age | Rate M | Rate F |     ← header printed once
           | 25  | 1.10   | 1.05   |

              (visual gap / band)

           | 45  | 1.42   | 1.31   |     ← no header repeated: same table
           | 55  | 1.80   | 1.66   |
```

This is the mirror of the repeated-header test in [[Repeated Headers and Title Bands]]: a repeated
header starts a new table, an unrepeated one continues the current one. Between them, header
repetition is the single boundary signal on a page, read before gaps, rules or bands.

### ✅ **Sample** — `3samehead`

![[zoo-3samehead.png]]

The `Count / % of Count / Premium / % of Premium` header row is printed **once** and shared by three
consecutive cohort blocks below it. None of the blocks below can be read on its own, so the page is
one table with each cohort label as a band row.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Count</th> <th>% of Count</th> <th>Premium</th> <th>% of Premium</th> </tr>
  <tr> <th colspan="5">Issue Year</th> </tr>
  <tr> <td>1999</td> <td>80</td> <td>3.5%</td> <td>217,072</td> <td>3.2%</td> </tr>
  <tr> <td>2000</td> <td>316</td> <td>13.7%</td> <td>964,763</td> <td>14.2%</td> </tr>
  <tr> <td>2001</td> <td>374</td> <td>16.2%</td> <td>1,091,387</td> <td>16.0%</td> </tr>
  <tr> <td>2002</td> <td>733</td> <td>31.8%</td> <td>2,110,680</td> <td>31.0%</td> </tr>
  <tr> <td>2003</td> <td>570</td> <td>24.7%</td> <td>1,695,230</td> <td>24.9%</td> </tr>
  <tr> <td>2004+</td> <td>234</td> <td>10.1%</td> <td>738,975</td> <td>32031.9%</td> </tr>
  <tr> <th data-level="0">Total</th> <td>2,307</td> <td>100.0%</td> <td>6,818,108</td> <td>100.0%</td> </tr>
  <tr> <th colspan="5">Issue Age</th> </tr>
  <tr> <td>&lt;30</td> <td>4</td> <td>0.2%</td> <td>4,451</td> <td>0.1%</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `dt1`

![[zoo-dt1.png]]

A company-relocation list whose header row is printed once here…

<details>
<summary>Expected Markdown · table 2 of 2, excerpt</summary>

```markdown
<table>
  <caption><strong>Relocations to Pier District by Industry</strong></caption>
  <tr> <th colspan="5">TAMI</th> </tr>
  <tr> <th>Company</th> <th>SF Leased</th> <th>Year Lease Signed</th> <th>Former Location</th> <th>Industry</th> </tr>
  <tr> <td>Harrowgate Media</td> <td>1,061,000</td> <td>2011</td> <td>Uptown</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Belmore House (new owner of Castellan Inc.)</td> <td>702,500</td> <td>2014</td> <td>Uptown</td> <td>TAMI, Media</td> </tr>
  <tr> <td>AdmarQ</td> <td>661,900</td> <td>2013</td> <td>Uptown</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Sonarfy</td> <td>541,200</td> <td>2017</td> <td>Uptown South</td> <td>TAMI, Technology</td> </tr>
  <!-- … -->
  <tr> <td>NDC Partners</td> <td>192,600</td> <td>2020</td> <td>Uptown; Uptown South; Riverside</td> <td>TAMI, Advertising</td> </tr>
  <!-- … -->
  <tr> <td>Draygo5</td> <td>88,400</td> <td>2013</td> <td>Uptown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Business Ledger</td> <td>85,200</td> <td>2017</td> <td>Uptown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Higher Peak Games</td> <td>84,800</td> <td>2014</td> <td>Uptown South</td> <td>TAMI, Media</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `dt2`

![[zoo-dt2.png]]

…and continues onto the next page with **no header row at all**: the fragment depends on the header
printed on the page before. Across a page break the fragments stay on their own pages — see
[[Cross-Page Tables]] — so this page's fragment is rendered headerless and carries the continuation
flags instead of a copied header.

<details>
<summary>Expected Markdown · the table</summary>

```markdown
<table>
  <tr> <td>Bramwell Dynamics</td> <td>58,042</td> <td>2017</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Northgate Media Group</td> <td>58,000</td> <td>2010</td> <td>Midtown</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Solveig Publishing (i.e. Solveig Magazine)</td> <td>55,470</td> <td>2019</td> <td>Midtown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>The Cobalt Bloc</td> <td>55,268</td> <td>2014</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Halloway &amp; Vance</td> <td>52,409</td> <td>2020</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Oceanview Media Systems</td> <td>50,639</td> <td>2019</td> <td>Midtown South</td> <td>TAMI, Technology</td> </tr>
  <tr> <td>Ferrand &amp; Co.</td> <td>49,880</td> <td>2016</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Kettlewell Interactive</td> <td>47,205</td> <td>2021</td> <td>Midtown</td> <td>TAMI, Technology</td> </tr>
  <tr> <td>Vantree Studios</td> <td>45,910</td> <td>2018</td> <td>Midtown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Ashworth Public Affairs</td> <td>44,330</td> <td>2015</td> <td>Midtown South</td> <td>TAMI, Public Relations</td> </tr>
  <tr> <td>Corvane Analytics</td> <td>42,760</td> <td>2019</td> <td>Midtown</td> <td>TAMI, Technology</td> </tr>
  <tr> <td>Millbrook &amp; Sons Media</td> <td>41,015</td> <td>2013</td> <td>Midtown South</td> <td>TAMI, Media</td> </tr>
  <tr> <td>Larkspur Creative Group</td> <td>39,470</td> <td>2020</td> <td>Midtown South</td> <td>TAMI, Advertising</td> </tr>
  <tr> <td>Dunmore Systems</td> <td>37,850</td> <td>2011</td> <td>Midtown</td> <td>TAMI, Technology</td> </tr>
</table>
```

</details>

## Two cases that need judgement

**Something sits in the gap.** A band row, a caption or a paragraph between the fragments does not
automatically break the table. The fragments MUST be merged as long as the second one still depends
on the header above it; a heading printed in the gap becomes a band row inside the one table.

**The shared piece is the label column.** Side-by-side fragments with the row labels printed once
on the left and value blocks separated by a gutter follow the same test: the value blocks cannot be
read without those labels, so they MUST be rendered as one table. Every printed value MUST be kept,
with the blocks placed as further columns of the labelled table.

### ✅ **Sample** — one label column, two value blocks

![[corpus-shared-label-column.png]]

A quarterly summary printed as **one row-label column on the left** — *Revenue*, *Gross profit*,
*Selling, general and administrative expenses*, *EBIT*, *Non-controlling interests*, *Net income* —
feeding **two separately boxed value blocks**: `C$ millions` and `(% of revenue)`, each with its
own `Q2 2025 / Q2 2024` header pair.

The right-hand block has **no row labels of its own**. Read on its own it is ten unnamed values,
which is the proof that the two fragments were never meant to stand apart. The same structure is
printed again below for the year-to-date figures, with its header rows repeated, so that block is a
second table.

The blocks do *not* share a header row: each has its own. It is the **label column** that is
printed once — the mirror sub-case. The em-dashes in the *Non-controlling interests* rows are
values, not blanks ([[Marks and Symbols in Cells]]), and `(% of revenue)` is a units line in the
header ([[Units Row]]). The empty gutter between the blocks is not a column ([[Gutter Columns]]).

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="2"><em>C$ millions</em></th> <th colspan="2"><em>(% of revenue)</em></th> </tr>
  <tr> <th> </th> <th>Q2 2025</th> <th>Q2 2024</th> <th>Q2 2025</th> <th>Q2 2024</th> </tr>
  <tr> <td>Revenue</td> <td>648.9</td> <td>581.4</td> <td> </td> <td> </td> </tr>
  <tr> <td>Gross profit</td> <td>184.2</td> <td>168.0</td> <td>28.4</td> <td>28.9</td> </tr>
  <tr> <td>Selling, general and administrative expenses</td> <td>146.7</td> <td>132.8</td> <td>22.6</td> <td>22.8</td> </tr>
  <tr> <td>EBIT</td> <td>37.5</td> <td>35.2</td> <td>5.8</td> <td>6.1</td> </tr>
  <tr> <td>Non-controlling interests</td> <td>—</td> <td>2.1</td> <td>—</td> <td>0.4</td> </tr>
  <tr> <td>Net income</td> <td>24.9</td> <td>15.8</td> <td>3.8</td> <td>2.7</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a numbered note heading in the gap

![[bag-notes-shared-header.png]]

The four-column header (`Consolidated` / `Merevald Retail Ltd`, two dates each) is printed once at
the top. Note `20 Reserves` and note `21 Total equity reconciliation` both sit under it, separated
by the second note's heading. Neither fragment repeats the header, so it is **one table**, and each
note heading is a band row inside it.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="2">Consolidated</th> <th colspan="2">Merevald Retail Ltd</th> </tr>
  <tr> <th> </th> <th>As at 29 June 25 $m</th> <th>As at 23 June 24 $m</th> <th>As at 29 June 25 $m</th> <th>As at 23 June 24 $m</th> </tr>
  <tr> <th colspan="5">20 Reserves</th> </tr>
  <tr> <td><strong>Reserves</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>Capital profits reserve</td> <td>58.4</td> <td>56.2</td> <td>2.4</td> <td>2.4</td> </tr>
  <tr> <td>Asset revaluation reserve</td> <td>64.1</td> <td>65.9</td> <td>0.5</td> <td>0.5</td> </tr>
  <tr> <td>General reserve</td> <td>41.3</td> <td>41.3</td> <td>40.2</td> <td>40.2</td> </tr>
  <tr> <td>Foreign currency translation reserve</td> <td>(0.8)</td> <td>(1.9)</td> <td>–</td> <td>–</td> </tr>
  <tr> <td> </td> <td><strong>162.9</strong></td> <td><strong>161.5</strong></td> <td><strong>43.1</strong></td> <td><strong>43.1</strong></td> </tr>
  <tr> <th colspan="5">21 Total equity reconciliation</th> </tr>
  <tr> <td>Total equity at beginning of period</td> <td>1,348.9</td> <td>1,441.6</td> <td>982.2</td> <td>1,061.3</td> </tr>
  <tr> <td>Total changes in equity recognised in the statement of financial performance</td> <td>498.6</td> <td>421.1</td> <td>344.0</td> <td>436.5</td> </tr>
  <tr> <td><strong>Transactions with owners as owners:</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>– Issue of shares as per note 16</td> <td>104.0</td> <td>87.3</td> <td>104.0</td> <td>87.3</td> </tr>
  <tr> <td>– Dividends paid or provided</td> <td>(305.4)</td> <td>(251.0)</td> <td>(305.4)</td> <td>(251.0)</td> </tr>
  <tr> <th data-level="0"><strong>Total equity at end of period</strong></th> <td><strong>1,610.7</strong></td> <td><strong>1,348.9</strong></td> <td><strong>1,088.5</strong></td> <td><strong>982.2</strong></td> </tr>
</table>
```

</details>

<!-- skill:generate
- If a header row is printed once and a later block of rows on the same page, after a gap, band, heading or divider, does not repeat it, keep those rows in the same <table> under that header.
- Render a heading or band printed in the gap as a full-width row inside the table, not as a table break.
- If row labels are printed once on the left and several value blocks sit beside them, render one table: labels plus every block as further columns.
- Never output a later fragment as a separate headerless table on the same page, and never drop it.
-->

<!-- skill:check
- FAIL (MUST) if, on one page, rows printed below a gap without their own header are rendered as a separate headerless <table> instead of continuing the table whose header they depend on.
- FAIL (MUST) if a value block that has no row labels of its own is rendered apart from the label column it depends on.
- FAIL (MUST) if a fragment sharing a header is missing from the Markdown.
-->

## Related

- [[Repeated Headers and Title Bands]] — the mirror: a header printed again opens a new table
- [[Column Continuation]] — side-by-side blocks that each carry their own header copy
- [[Header-Only Tables]] — the failure this rule prevents
- [[Cross-Page Tables]] — the same dependency across a page break, rendered per page
