---
title: Total and Subtotal Rows
rule_id: tables-total-and-subtotal-rows
status: rule
scope: page
tags: [tables, rule, semantics, rows]
---

# Total / Subtotal Rows

> [!success] ✅ Normative
> In a total or subtotal row, the label cell MUST be a `<th>` and the value cells MUST stay `<td>`.
> The label cell MUST carry the row's absolute level as `data-level`, read as for the stub
> hierarchy — a top-level total is `data-level="0"`. Label and values MUST be kept exactly as
> printed, bold only where the page prints them bold.

```text
| iPhone          | 205,489 |
| Mac             |  29,357 |
| **Total**       | 234,846 |   ← bold + a double rule above it
```

## The rendering

```html
<tr><td data-level="1">iPhone</td><td>205,489</td></tr>
<tr><td data-level="1">Mac</td><td>29,357</td></tr>
<tr><th data-level="0">Total</th><td>234,846</td></tr>
```

- The `<th>` states that the cell labels rather than reports.
- `data-level` records the printed absolute indentation of the label, counted from the left edge of
  the stub as in [[Row-Label Hierarchy]]; because a total carries a level, every label cell of its
  stub carries one too.
- The level MUST be the printed one even where it contradicts the apparent grouping — a total set
  further right than the items it sums keeps that deeper level. Arithmetic membership MUST NOT be
  inferred from indentation, and indentation MUST NOT be adjusted to fit the arithmetic.
- A total row whose label position prints nothing has no label cell to mark: it MUST be rendered
  with an empty `<td></td>` there — never an invented `Total` and never an empty `<th>`.

## A `<th>` is a per-cell decision

A row can be part header, part data, and a total row is exactly that: a heading cell on the left
and reported values to its right. Marking the whole row `<th>` would claim the numbers are headings;
marking none of it loses the distinction between the cell that names the aggregate and the cells
that report it. Both are non-conforming.

The same holds in reverse for a full-width band or divider row, where **every** cell is heading and
none is data — see [[Bands Inside the Grid]] and [[Titles Banners Captions]].

## Recognising one

A total or subtotal row usually carries three tells at once: a label that names an aggregate
("Total", "Total net sales", "5 YR. TOTAL"), a rule or double rule printed above it, and bold or
otherwise emphasised type. Any one alone is weak evidence — bold is applied unreliably in both
directions ([[Bold and Italic Inside Tables]]) — but together they are reliable.

### ✅ **Sample** — `warn`

![[zoo-warn.png]]

Several bold, ruled totals in one balance sheet — *Total current assets*, *Total assets*, *Total
current liabilities*, *Total liabilities*, *Total … stockholders' equity*, *Total equity*. No label
is indented, so every level is `0`. The italic stub heading is not bold.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th><em>Unaudited; in millions, except par value</em></th> <th>September 30, 2024</th> <th>December 31, 2023</th> </tr>
  <tr> <th colspan="3">ASSETS</th> </tr>
  <tr> <td colspan="3" data-level="0">Current assets:</td> </tr>
  <tr> <td data-level="0">Cash and cash equivalents</td> <td>$2,414</td> <td>$2,850</td> </tr>
  <tr> <td data-level="0">Receivables, net</td> <td>4,120</td> <td>4,510</td> </tr>
  <tr> <td data-level="0">Prepaid expenses and other current assets</td> <td>2,905</td> <td>3,102</td> </tr>
  <tr> <th data-level="0"><strong>Total current assets</strong></th> <td><strong>9,439</strong></td> <td><strong>10,462</strong></td> </tr>
  <tr> <td data-level="0">Film and television content rights and games</td> <td>15,220</td> <td>16,340</td> </tr>
  <tr> <td data-level="0">Property and equipment, net</td> <td>4,890</td> <td>4,715</td> </tr>
  <tr> <td data-level="0">Goodwill</td> <td>19,640</td> <td>24,905</td> </tr>
  <tr> <td data-level="0">Intangible assets, net</td> <td>24,110</td> <td>27,830</td> </tr>
  <tr> <td data-level="0">Other noncurrent assets</td> <td>5,715</td> <td>5,940</td> </tr>
  <tr> <th data-level="0"><strong>Total assets</strong></th> <td><strong>$79,014</strong></td> <td><strong>$90,192</strong></td> </tr>
  <tr> <th colspan="3">LIABILITIES AND EQUITY</th> </tr>
  <!-- … -->
  <tr> <th data-level="0"><strong>Total Nordholm Media Group, Inc. stockholders' equity</strong></th> <td><strong>27,064</strong></td> <td><strong>33,812</strong></td> </tr>
  <tr> <td data-level="0">Noncontrolling interests</td> <td>690</td> <td>720</td> </tr>
  <tr> <th data-level="0"><strong>Total equity</strong></th> <td><strong>27,754</strong></td> <td><strong>34,532</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `dt1`

![[zoo-dt1.png]]

A bold, ruled `TOTAL` row closes the relocation summary (923 · 100% · 24,582,483 · 100%).

<details>
<summary>Expected Markdown · table 1 of 2, excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Firms</th> <th>%</th> <th>Square Footage Leased</th> <th>%</th> </tr>
  <!-- … -->
  <tr> <td data-level="0"><strong>Other</strong></td> <td><strong>71</strong></td> <td><strong>8%</strong></td> <td><strong>2,702,047</strong></td> <td><strong>11%</strong></td> </tr>
  <tr> <th data-level="0"><strong>TOTAL</strong></th> <td><strong>923</strong></td> <td><strong>100%</strong></td> <td><strong>24,582,483</strong></td> <td><strong>100%</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `3tables2`

![[zoo-3tables2.png]]

A bold `5 YR. TOTAL` row closes each class block. Each class block and the credibility grid under
it are separately framed with a gap between them, so they are separate tables; the first class
block is shown.

<details>
<summary>Expected Markdown · table 1 of 6</summary>

```markdown
<table>
  <tr> <th>CLASS<br/>0034</th> <th colspan="9">FARM: POULTRY OR EGG PRODUCER &amp; DRIVERS</th> </tr>
  <tr> <th colspan="2" rowspan="2">Industry Group: Goods and Services<br/>Hazard Group: D</th> <th colspan="7">CONVERTED LOSSES</th> <th></th> </tr>
  <tr> <th colspan="2">INDEMNITY LIKELY</th> <th colspan="2">INDEMNITY NOT-LIKELY</th> <th rowspan="2">MED LIKELY AMOUNT</th> <th rowspan="2">MED NOT-LIKELY AMOUNT</th> <th rowspan="2">TOTAL AMOUNT</th> <th rowspan="2">TOTAL PURE PREM.</th> </tr>
  <tr> <th>POLICY PERIOD</th> <th>PAYROLL</th> <th>CASES</th> <th>AMOUNT</th> <th>CASES</th> <th>AMOUNT</th> </tr>
  <tr> <td data-level="0">3/18 through 2/19</td> <td>14,448,797</td> <td>0</td> <td>0</td> <td>14</td> <td>155,528</td> <td>0</td> <td>194,420</td> <td>349,948</td> <td>2.422</td> </tr>
  <tr> <td data-level="0">3/19 through 2/20</td> <td>17,615,203</td> <td>2</td> <td>82,335</td> <td>6</td> <td>35,868</td> <td>50,950</td> <td>85,546</td> <td>254,699</td> <td>1.446</td> </tr>
  <tr> <td data-level="0">3/20 through 2/21</td> <td>17,172,385</td> <td>6</td> <td>287,460</td> <td>11</td> <td>248,762</td> <td>170,700</td> <td>211,880</td> <td>918,802</td> <td>5.351</td> </tr>
  <tr> <td data-level="0">3/21 through 2/22</td> <td>18,522,883</td> <td>0</td> <td>0</td> <td>8</td> <td>97,842</td> <td>0</td> <td>176,515</td> <td>274,357</td> <td>1.481</td> </tr>
  <tr> <td data-level="0">3/22 through 2/23</td> <td>17,213,995</td> <td>0</td> <td>0</td> <td>7</td> <td>66,407</td> <td>0</td> <td>122,457</td> <td>188,864</td> <td>1.097</td> </tr>
  <tr> <th data-level="0"><strong>5 YR. TOTAL</strong></th> <td><strong>84,973,263</strong></td> <td><strong>8</strong></td> <td><strong>369,795</strong></td> <td><strong>46</strong></td> <td><strong>604,407</strong></td> <td><strong>221,650</strong></td> <td><strong>790,818</strong></td> <td><strong>1,986,670</strong></td> <td><strong>2.338</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `en`

![[zoo-en.png]]

A bold, ruled `TOTAL 90 50%` row closes the weightage table.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th colspan="2">Division of Syllabus for Term II (October-March)</th> <th>Total Weightage Assigned</th> </tr>
  <tr> <th>Summative Assessment II</th> <th>30%</th> <td></td> </tr>
  <tr> <th>Section</th> <th>Marks</th> <td rowspan="5"></td> </tr>
  <tr> <td data-level="0">Reading</td> <td>20</td> </tr>
  <tr> <td data-level="0">Writing</td> <td>20</td> </tr>
  <tr> <td data-level="0">Grammar</td> <td>15</td> </tr>
  <tr> <td data-level="0">Literature</td> <td>35</td> </tr>
  <tr> <td data-level="0">Formative Assessment</td> <td></td> <td>20%</td> </tr>
  <tr> <th data-level="0"><strong>TOTAL</strong></th> <td><strong>90</strong></td> <td><strong>50%</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `3t`

![[zoo-3t.png]]

A bold *1997-2017* summary row under a rule closes each cohort block; its label names the whole
vintage range the rows above divide up.

<details>
<summary>Expected Markdown · table 1 of 3</summary>

```markdown
<table>
  <tr> <th colspan="12">TIMBER IMPACT INVESTING FUNDS</th> </tr>
  <tr> <th>VINTAGE YEAR</th> <th>POOLED RETURN (%)</th> <th>ARITHMETIC MEAN (%)</th> <th>MEDIAN (%)</th> <th>EQUAL-WEIGHTED POOLED RETURN (%)</th> <th>UPPER QUARTILE (%)</th> <th>LOWER QUARTILE (%)</th> <th>STANDARD DEVIATION (%)</th> <th>DPI</th> <th>RVPI</th> <th>TVPI</th> <th>NUMBER OF FUNDS</th> </tr>
  <tr> <td data-level="0">1997-2001</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>2</td> </tr>
  <tr> <td data-level="0">2002-2004</td> <td>3.11</td> <td>3.58</td> <td>—</td> <td>3.55</td> <td>—</td> <td>—</td> <td>—</td> <td>0.94</td> <td>0.45</td> <td>1.39</td> <td>4</td> </tr>
  <tr> <td data-level="0">2005-2007</td> <td>4.05</td> <td>5.44</td> <td>5.56</td> <td>5.36</td> <td>—</td> <td>—</td> <td>—</td> <td>0.86</td> <td>0.60</td> <td>1.46</td> <td>6</td> </tr>
  <tr> <td data-level="0">2008-2010</td> <td>4.38</td> <td>4.51</td> <td>4.66</td> <td>4.03</td> <td>—</td> <td>—</td> <td>—</td> <td>0.30</td> <td>0.98</td> <td>1.28</td> <td>5</td> </tr>
  <tr> <td data-level="0">2011-2013</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>1</td> </tr>
  <tr> <td data-level="0">2014-2017</td> <td>6.06</td> <td>7.55</td> <td>—</td> <td>5.83</td> <td>—</td> <td>—</td> <td>—</td> <td>0.14</td> <td>1.00</td> <td>1.14</td> <td>3</td> </tr>
  <tr> <th data-level="0"><strong>1997-2017</strong></th> <td><strong>4.06</strong></td> <td><strong>5.50</strong></td> <td><strong>4.94</strong></td> <td><strong>5.09</strong></td> <td><strong>7.04</strong></td> <td><strong>4.46</strong></td> <td><strong>3.75</strong></td> <td><strong>0.76</strong></td> <td><strong>0.64</strong></td> <td><strong>1.40</strong></td> <td><strong>21</strong></td> </tr>
</table>
```

</details>

## Row order and table sections

- Every row MUST stay in printed order. A total MUST NOT be moved to fit a table section.
- `<thead>`, `<tbody>` and `<tfoot>` wrappers MAY be used or omitted; they do not change the cells
  or their values, and `th` versus `td` is still decided per cell.
- Totals printed outside the table frame are governed by [[Bottom Edge Totals and Islands]].

## More shapes

### ✅ **Sample** — a total row with no label at all

![[bag-unlabelled-total.png]]

The taxation table closes with `834` / `752` under a rule, in bold, with an **empty** label cell:
nothing prints where `Total` would go. The label cell is `<td></td>` — no label, so no `<th>` and no
invented `Total`. The rule and the bold are the only tells. The *June 30, 2003* column is bold
throughout.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th></th> <th colspan="2">Six months ended</th> </tr>
  <tr> <th></th> <th>June 30, 2003<br/>(Unaudited)<br/>HK$’million</th> <th>June 30, 2002<br/>(Unaudited)<br/>HK$’million</th> </tr>
  <tr> <td data-level="0">Hong Kong:</td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">Company and subsidiaries</td> <td><strong>681</strong></td> <td>646</td> </tr>
  <tr> <td data-level="1">Associates and jointly controlled companies</td> <td><strong>153</strong></td> <td>106</td> </tr>
  <tr> <td></td> <td><strong>834</strong></td> <td><strong>752</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — a total set further right than its children

![[bag-ifrs-total-indent.png]]

Each `Total` is centred well to the right of the items it sums, twice on the page. `Total other
comprehensive income (loss)` starts just right of the item labels and `Comprehensive income`
between the two. Read by where each label starts, the page has four label positions, levels `0`
to `3`, and every total is deeper than its children; those printed levels are kept.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th></th> <th>FY2020<br/>(From Apr. 1, 2020<br/>to Mar. 31, 2021)</th> <th>FY2021<br/>(From Apr. 1, 2021<br/>to Mar. 31, 2022)</th> </tr>
  <tr> <td data-level="0"><strong>Profit</strong></td> <td>39,880</td> <td>118,204</td> </tr>
  <tr> <td data-level="0"><strong>Other comprehensive income (loss)</strong></td> <td></td> <td></td> </tr>
  <tr> <td data-level="0"><strong>Items that will not be reclassified to profit or loss</strong></td> <td></td> <td></td> </tr>
  <tr> <td data-level="0">Net gains and losses from financial assets measured at FVTOCI</td> <td>33,410</td> <td>17,225</td> </tr>
  <tr> <td data-level="0">Remeasurement of defined benefit plans</td> <td>51,800</td> <td>46,910</td> </tr>
  <tr> <td data-level="0">Share of other comprehensive income (loss) of entities accounted for by the equity method</td> <td>(140)</td> <td>205</td> </tr>
  <tr> <th data-level="3"><strong>Total</strong></th> <td>85,070</td> <td>64,340</td> </tr>
  <tr> <td data-level="0"><strong>Items that may be reclassified to profit or loss</strong></td> <td></td> <td></td> </tr>
  <tr> <td data-level="0">Cash flow hedges</td> <td>(230)</td> <td>10</td> </tr>
  <tr> <td data-level="0">Hedging cost</td> <td>790</td> <td>(150)</td> </tr>
  <tr> <td data-level="0">Exchange differences on translating foreign operations</td> <td>34,000</td> <td>61,000</td> </tr>
  <tr> <td data-level="0">Share of other comprehensive income (loss) of entities accounted for by the equity method</td> <td>5,340</td> <td>6,120</td> </tr>
  <tr> <th data-level="3"><strong>Total</strong></th> <td>39,900</td> <td>66,980</td> </tr>
  <tr> <th data-level="1"><strong>Total other comprehensive income (loss)</strong></th> <td>124,970</td> <td>131,320</td> </tr>
  <tr> <th data-level="2"><strong>Comprehensive income</strong></th> <td>164,850</td> <td>249,524</td> </tr>
  <tr> <td data-level="0"><strong>Comprehensive income (loss) attributable to</strong></td> <td></td> <td></td> </tr>
  <tr> <td data-level="0">Owners of parent</td> <td>157,180</td> <td>231,100</td> </tr>
  <tr> <td data-level="0">Non-controlling interests</td> <td>7,670</td> <td>18,424</td> </tr>
</table>
```

</details>

### ✅ **Sample** — rows printed after the total that it does not include

![[bag-automaker-volume.png]]

`Total` closes the `Global Sales Volume` block, then `USA` and `Australia` follow at the same
indent as `Japan` and `Europe`. They are memo lines — USA sits inside North America — not
components of the total. They stay in the same table, in printed order, at the level their indent
prints; splitting them off into a second table is non-conforming.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>(Thousand Units)</th> <th>FY March 2025</th> <th>FY March 2026</th> <th colspan="2">Change from Previous Year</th> <th>Change from<br/>Feb. Forecast</th> </tr>
  <tr> <th></th> <th>Full Year</th> <th>Full Year</th> <th colspan="2">Full Year</th> <th>Full Year</th> </tr>
  <tr> <td data-level="0"><strong>Production Volume*</strong></td> <td><strong>1,197</strong></td> <td><strong>1,152</strong></td> <td><strong>-45</strong></td> <td><strong>-4%</strong></td> <td><strong>-</strong></td> </tr>
  <tr> <th colspan="6">Global Sales Volume</th> </tr>
  <tr> <td data-level="0">Japan</td> <td>149</td> <td>141</td> <td>-8</td> <td>-5%</td> <td>-7</td> </tr>
  <tr> <td data-level="0">North America</td> <td>604</td> <td>570</td> <td>-34</td> <td>-6%</td> <td>-27</td> </tr>
  <tr> <td data-level="0">Europe</td> <td>168</td> <td>158</td> <td>-10</td> <td>-6%</td> <td>-6</td> </tr>
  <tr> <td data-level="0">China</td> <td>71</td> <td>68</td> <td>-3</td> <td>-4%</td> <td>-4</td> </tr>
  <tr> <td data-level="0">Other Markets</td> <td>276</td> <td>254</td> <td>-22</td> <td>-8%</td> <td>-9</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>1,268</strong></td> <td><strong>1,191</strong></td> <td><strong>-77</strong></td> <td><strong>-6%</strong></td> <td><strong>-53</strong></td> </tr>
  <tr> <td data-level="0">USA</td> <td>421</td> <td>384</td> <td>-37</td> <td>-9%</td> <td>-19</td> </tr>
  <tr> <td data-level="0">Australia</td> <td>92</td> <td>85</td> <td>-7</td> <td>-8%</td> <td>-3</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a scanned lease table with an unlabelled total

![[bag-nonprofit-notes-scan.png]]

Note 6: four years and four amounts under a lone `$` header, then `130,220` under a double rule,
with no label at all — so its label cell is empty. Note 5 above it is a borderless statement whose
`Balance, end of year` total sits under a double rule, not bold. The printed rules are not rows.

<details>
<summary>Expected Markdown · notes 5 and 6</summary>

```markdown
<table>
  <tr> <th></th> <th>2002<br/>$</th> <th>2001<br/>$</th> </tr>
  <tr> <td data-level="0">Balance, beginning of year</td> <td>7,410</td> <td>7,410</td> </tr>
  <tr> <td data-level="0">Add: operating grant received</td> <td>31,650</td> <td>31,650</td> </tr>
  <tr> <td data-level="0">Less: amount recognized as revenue in the year</td> <td>(31,650)</td> <td>(31,650)</td> </tr>
  <tr> <th data-level="0">Balance, end of year</th> <td>7,410</td> <td>7,410</td> </tr>
</table>

<!-- … -->

<table>
  <tr> <th></th> <th>$</th> </tr>
  <tr> <td>2003</td> <td>31,832</td> </tr>
  <tr> <td>2004</td> <td>35,420</td> </tr>
  <tr> <td>2005</td> <td>38,930</td> </tr>
  <tr> <td>2006</td> <td>24,038</td> </tr>
  <tr> <td></td> <td>130,220</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a total label printed in the town column

![[bag-county-totals-continued.png]]

A county / municipality / count list continued from an earlier page. Each `ASHFORD Total`,
`BRANDYWINE Total` label is set in bold, right-aligned inside the municipality column, with the sum
in the count column. The label stays in that column as a `<th>`; it starts to the right of the
municipality names, so its level is `1`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <td>CALLOWAY</td> <td data-level="0">Town of Brixmoor</td> <td>37</td> </tr>
  <tr> <td></td> <th data-level="1"><strong>CALLOWAY Total</strong></th> <td><strong>281</strong></td> </tr>
  <tr> <td>ASHFORD</td> <td data-level="0">Town of Ansville</td> <td>12</td> </tr>
  <tr> <td>ASHFORD</td> <td data-level="0">Town of Boonhaven</td> <td>3</td> </tr>
  <!-- … -->
  <tr> <td>ASHFORD</td> <td data-level="0">Village of Waterville</td> <td>3</td> </tr>
  <tr> <td></td> <th data-level="1"><strong>ASHFORD Total</strong></th> <td><strong>102</strong></td> </tr>
  <tr> <td>BRANDYWINE</td> <td data-level="0">Town of Camillus</td> <td>40</td> </tr>
  <!-- … -->
  <tr> <td>BRANDYWINE</td> <td data-level="0">Village of Solvay</td> <td>66</td> </tr>
  <tr> <td></td> <th data-level="1"><strong>BRANDYWINE Total</strong></th> <td><strong>512</strong></td> </tr>
  <tr> <td>ORLEAND</td> <td data-level="0">Town of Candice</td> <td>3</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — a subtotal label in the unit column

![[bag-subtotal-in-unit-column.png]]

Row `A` prints `SUM OF ITEMS 1 THRU 4` in the description column and `SUBTOTAL` in the `UNIT`
column, with the sum under `TOTAL`; row `B` prints `TOTAL BID =` in one cell spanning the unit,
quantity and unit-cost columns. The label is split across columns the page uses for other things;
each part stays in the column it is printed in, and the label cells are `<th>`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="6">ESTIMATE OF PROBABLE CONSTRUCTION COST (100%)</th> </tr>
  <tr> <th>ITEM</th> <th>DESCRIPTION</th> <th>UNIT</th> <th>QUANTITY</th> <th>UNIT COST</th> <th>TOTAL</th> </tr>
  <tr> <th colspan="6">DRAINAGE IMPROVEMENTS</th> </tr>
  <tr> <td>1</td> <td data-level="0">CURB RAMP REPLACEMENT</td> <td>EA</td> <td>6</td> <td>$5,210.00</td> <td>$31,260.00</td> </tr>
  <!-- … -->
  <tr> <td>4</td> <td data-level="0">PROP. SIGNS R10-15A</td> <td>EA</td> <td>9</td> <td>$612.00</td> <td>$5,508.00</td> </tr>
  <tr> <td><strong>A</strong></td> <th data-level="0"><strong>SUM OF ITEMS 1 THRU 4</strong></th> <th><strong>SUBTOTAL</strong></th> <td></td> <td></td> <td><strong>$65,228.00</strong></td> </tr>
  <tr> <td>5</td> <td data-level="0">LANDSCAPE MITIGATION</td> <td>Aggregate Sum</td> <td>1</td> <td>LS</td> <td>$7,412.00</td> </tr>
  <!-- … -->
  <tr> <td>10</td> <td data-level="0">PERMIT FEES</td> <td>Dedicated Allowance</td> <td>1</td> <td>LS</td> <td>$11,118.00</td> </tr>
  <tr> <td><strong>B</strong></td> <th data-level="0"><strong>SUM OF ITEMS A &amp; 5 THRU 10</strong></th> <th colspan="3"><strong>TOTAL BID =</strong></th> <td><strong>$139,380.00</strong></td> </tr>
</table>
```

</details>

<!-- skill:generate
- In a total or subtotal row, write the label cell as <th> and keep the value cells as <td>: <tr><th data-level="0">Total</th><td>234,846</td></tr>.
- Give the total's label a data-level equal to where it starts on the page (0 at the stub's left edge), even if that places it deeper than the rows it sums; then give every label in that stub a data-level too.
- If nothing is printed where the total's label would be, write an empty <td></td> there; never invent "Total".
- Keep label and values verbatim; wrap them in <strong> only if the page prints them bold.
- Keep totals and any rows printed after them in printed order, in the same table.
-->

<!-- skill:check
- FAIL (MUST) if the label cell of a printed total or subtotal row is a <td>, or its value cells are <th>.
- FAIL (MUST) if a total label cell has no data-level, or its data-level does not match the label's printed start position.
- FAIL (MUST) if a "Total" (or any label) appears in a total row where the page prints no label.
- FAIL (MUST) if a total row is moved out of printed order, or rows printed after a total are split into another table.
- FAIL (MUST) if a total's label or values are bold in the Markdown but not on the page, or the reverse.
-->

## Related

- [[Row-Label Hierarchy]] — the levels a total's label shares with the rest of the stub
- [[Bottom Edge Totals and Islands]] — totals printed outside the table frame
- [[Bold and Italic Inside Tables]] — bold on a total is transcribed per cell, as printed
