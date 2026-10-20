---
title: Row-Label Hierarchy
rule_id: tables-row-label-hierarchy
status: rule
scope: page
tags: [tables, rule, hierarchy, encoding]
---

# Row-Label Hierarchy via Indentation

> [!success] ✅ Normative
> Where a table's row labels are indented to show nesting, every label cell MUST carry its
> **absolute level** as a `data-level` attribute: `<td data-level="2">iPhone</td>`. Level `0` is the
> leftmost label position in the stub column, `1` the next indent step, and so on — counted from the
> left edge of the column, never from the row above.

Financial statements and rate manuals encode hierarchy by indenting the row label. Flattened,
"iPhone" and "Total net sales" read as siblings.

```text
Printed stub:                     Rendered as:
Revenue                           <td data-level="0">Revenue</td>
  Products                        <td data-level="1">Products</td>
    iPhone          205,489       <td data-level="2">iPhone</td>
Total net sales     383,285       <th data-level="0">Total net sales</th>
```

A table whose indented labels all come out at the same level is the failure this rule exists to
prevent.

## Why flattening is dangerous

The flattened output is well-formed and looks correct. Nothing signals that a parent/child
relationship was dropped, so a reader summing the column double-counts: `iPhone` is *inside*
`Total net sales`, and the flattened table gives no way to know it. The damage is silent, which is
why the indentation MUST be preserved even where the choice of encoding seems secondary.

### ❌ **Counter-sample** — `3cc`

![[zoo-3cc.png]]

**Structure lost.** Under *KVO shareholder* the page indents two children, *Renewable* and
*Nuclear*. The rendering below flattens them, leaving a second *Renewable* with no parent, and it
also records `25` for *KVO shareholder* where the page prints `2.5`. The total row is bold across
all three cells.

<details>
<summary>Expected Markdown · table 2 of 3</summary>

```markdown
<table>
  <tr> <th>Energy production</th> <th>Unit</th> <th>2024</th> </tr>
  <tr> <td data-level="0">Renewable</td> <td>TWh</td> <td>29.5</td> </tr>
  <tr> <td data-level="0">Non-renewable</td> <td>TWh</td> <td>2.9</td> </tr>
  <tr> <td data-level="0">KVO shareholder</td> <td>TWh</td> <td>2.5</td> </tr>
  <tr> <td data-level="1">Renewable</td> <td>TWh</td> <td>0.4</td> </tr>
  <tr> <td data-level="1">Nuclear</td> <td>TWh</td> <td>2.1</td> </tr>
  <tr> <th data-level="0"><strong>Total energy production</strong></th> <td><strong>TWh</strong></td> <td><strong>34.8</strong></td> </tr>
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th>Energy production</th> <th>Unit</th> <th>2024</th> </tr>
  <!-- … -->
  <tr> <td>Non-renewable</td> <td>TWh</td> <td>2.9</td> </tr>
  <tr> <td>KVO shareholder</td> <td>TWh</td> <td>25</td> </tr>
  <tr> <td>Renewable</td> <td>TWh</td> <td>0.4</td> </tr>
  <tr> <td>Nuclear</td> <td>TWh</td> <td>2.1</td> </tr>
  <tr> <td><strong>Total energy production</strong></td> <td><strong>TWh</strong></td> <td><strong>34.8</strong></td> </tr>
</table>
```

</details>

## Reading the level

- The level MUST be the number of indent steps between the left edge of the stub column and the
  start of the label as printed. The leftmost label position is `0`; each further indent step adds
  one. A level can therefore be checked against a single row without reading any other.
- The label text MUST stay verbatim and the rows MUST stay in printed order.
- Where a table carries levels, every label cell in its stub that prints a label MUST carry one,
  level-`0` rows included. A table whose stub shows no nesting — no indentation, no "of which"
  rows — and has no labelled total carries none.

### Absolute, not relative

A level is read off the print, never inherited from the row above:

- A row following a level-`2` row is level `3` only if the page indents it further. At the same
  indent it is another level-`2` sibling.
- A row MAY jump back several levels at once. `Total net sales` returning to `0` after an `iPhone`
  at `2` is normal and needs no marker of its own.

### Not from the numbers

A level MUST NOT be deepened because the arithmetic suggests a row is a component, and MUST NOT be
flattened because the arithmetic does not add up. The indentation is the evidence; the values are
not. A page whose sub-items do not sum to their parent is transcribed as printed.

### Not as leading whitespace

The level MUST be carried as an attribute, not as leading spaces or `&nbsp;`: the first trim,
Markdown render or CSV round-trip removes whitespace and the structure goes with it. Where an output
format cannot carry a cell attribute, the level SHOULD go into a dedicated level column rather than
into whitespace.

## Recognising a child row

A child is indented relative to the row above it, and its value is a *component* of a figure
elsewhere in the column rather than an independent record. Phrases such as "out of which", "of
which" and "within which" state the same relationship in words; a row introduced by one MUST be
rendered as a child even where its indentation is slight. The same page may present a breakdown as
an indented stub or as a row that decomposes into sub-rows; both are the same phenomenon and are
rendered the same way.

A total row takes a level like any other row, usually `0`; how its label cell is marked is defined
in [[Total and Subtotal Rows]].

### ✅ **Sample** — `table-with-breakdown`

![[table-with-breakdown.png]]

*"- Out of which amount written off"* is indented under *"Amount involved in frauds"*: it is a
component of that figure, not a peer, so it is level `1`. The header labels wrap only for width.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Provision debited to Profit and Loss Account</th> <th>March 31, 2031</th> <th>March 31, 2030</th> </tr>
  <tr> <td data-level="0">Number of frauds reported</td> <td>9,742</td> <td>13,208</td> </tr>
  <tr> <td data-level="0">Amount involved in frauds</td> <td>184.30</td> <td>121.55</td> </tr>
  <tr> <td data-level="1">- Out of which amount written off</td> <td>0.00</td> <td>0.62</td> </tr>
  <tr> <td data-level="0">Provisions made during the year (excluding write off)</td> <td>41.20</td> <td>5.90</td> </tr>
  <tr> <td data-level="0">Amount of unamortized provision debited from "other reserves" as at the end of the year</td> <td>-</td> <td>-</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `702`

![[zoo-702.png]]

Rule numbers nest into numbered and lettered sub-items: *609. Designated Business Pursuits* ›
*3. Teachers* › *a. Lab, etc.* / *b. not otherwise classified* / *c. Corporal Punishment*. The
coverage labels sit at four printed indent positions, levels `0` to `3`; the rule-number column is
not part of the label hierarchy. Labels that wrap at the column edge are joined.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>Basic Limit Rule#</th> <th>Coverage F - Medical Payments</th> <th>$2,000</th> <th>$3,000</th> <th>$4,000</th> <th>$5,000</th> </tr>
  <tr> <td>524.</td> <td data-level="0">Additional Insured - Household Resident</td> <td>$ .58</td> <td>$1.15</td> <td>$1.73</td> <td>$2.30</td> </tr>
  <!-- … -->
  <tr> <td>607.</td> <td data-level="0">Limited Home Day Care Coverage</td> <td>2.88</td> <td>5.75</td> <td>8.63</td> <td>10.93</td> </tr>
  <tr> <td>608.</td> <td data-level="0">Permitted Incidental Occupancies - Residence Premises And Other Residences</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td data-level="1">1. Residence Premises</td> <td>2.88</td> <td>5.75</td> <td>8.63</td> <td>10.93</td> </tr>
  <tr> <td></td> <td data-level="1">2. Other Residence</td> <td>1.73</td> <td>3.45</td> <td>5.18</td> <td>6.33</td> </tr>
  <tr> <td>609.</td> <td data-level="0">Designated Business Pursuits</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td data-level="1">1. Clerical Employees</td> <td>.58</td> <td>1.15</td> <td>1.73</td> <td>2.30</td> </tr>
  <tr> <td></td> <td data-level="1">2. Salesperson, Installation, etc. Included or Excluded</td> <td>.58</td> <td>1.15</td> <td>1.73</td> <td>2.30</td> </tr>
  <tr> <td></td> <td data-level="1">3. Teachers</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td data-level="2">a. Lab, etc.</td> <td>1.15</td> <td>2.30</td> <td>3.45</td> <td>4.03</td> </tr>
  <tr> <td></td> <td data-level="2">b. not otherwise classified</td> <td>.58</td> <td>1.15</td> <td>1.73</td> <td>2.30</td> </tr>
  <tr> <td></td> <td data-level="2">c. Corporal Punishment</td> <td colspan="4">Medical Payments Not Available</td> </tr>
  <tr> <td>611.</td> <td data-level="0">Incidental Low Power Recreational Motor Vehicles</td> <td>.58</td> <td>1.15</td> <td>1.73</td> <td>2.30</td> </tr>
  <tr> <td>612.</td> <td data-level="0">Owned Watercraft Liability Coverage</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td data-level="1">1. Outboard, Inboard or Inboard-Outboard engines or Motors</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td data-level="2">a) Up to 15 feet:</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td data-level="3">Up to 50 hp.</td> <td>1.73</td> <td>3.45</td> <td>5.18</td> <td>6.33</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `yellow`

![[zoo-yellow.png]]

Numbered parents `(1)`–`(10)` with indented lettered children — *(A) Short* / *(B) Intermediate* /
*(C) Long*, *(A) Dividends* / *(B) Capital gains* — and an indented, unlettered *dividends* under
*(5) Preferred stock*. The yellow fill marks input cells and carries no value, so it is not
rendered.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Invested<br/>Assets<br/>[1]</th> <th>Currently<br/>Available<br/>Yield *<br/>[2]</th> <th>Return On<br/>Invested Assets<br/>[3]=[1]*[2]</th> <th>Federal<br/>Income<br/>Tax Rate<br/>[4]</th> <th>Federal Income<br/>Taxes<br/>[5]=[3]*[4]</th> </tr>
  <tr> <td colspan="6" data-level="0">(1) US government bonds</td> </tr>
  <tr> <td data-level="1">(A) Short</td> <td>34,614,395</td> <td>0.13%</td> <td>44,999</td> <td>35.00%</td> <td>15,750</td> </tr>
  <tr> <td data-level="1">(B) Intermediate</td> <td>46,147,279</td> <td>3.46%</td> <td>1,596,696</td> <td>35.00%</td> <td>558,844</td> </tr>
  <tr> <td data-level="1">(C) Long</td> <td>37,128,723</td> <td>4.32%</td> <td>1,603,961</td> <td>35.00%</td> <td>561,386</td> </tr>
  <tr> <td colspan="6" data-level="0">(2) Other taxable bonds</td> </tr>
  <tr> <td data-level="1">(A) Short</td> <td>65,861,105</td> <td>0.25%</td> <td>164,653</td> <td>35.00%</td> <td>57,628</td> </tr>
  <!-- … -->
  <tr> <td data-level="0">(4) Common Stock</td> <td>22,262,218</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">(A) Dividends</td> <td></td> <td>4.63%</td> <td>1,029,850</td> <td>14.18%</td> <td>145,981</td> </tr>
  <tr> <td data-level="1">(B) Capital gains</td> <td></td> <td>0.00%</td> <td>0</td> <td>34.10%</td> <td>0</td> </tr>
  <tr> <td data-level="0">(5) Preferred stock</td> <td>2,547,457</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">dividends</td> <td></td> <td>5.75%</td> <td>146,479</td> <td>14.18%</td> <td>20,763</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `sssa`

![[zoo-sssa.png]]

*Ticket* and *Transactions* are indented under the *Same Shop Sales* parent rows. The parent rows
are bold in every cell, values included; the stub header *Fiscal year ending December,* is italic
and not bold. Most percentages print a space before `%`, a few do not — kept as printed.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th></th> <th colspan="5">2023</th> <th colspan="3">2024</th> </tr>
  <tr> <th><em>Fiscal year ending December,</em></th> <th>Q1</th> <th>Q2</th> <th>Q3</th> <th>Q4</th> <th>FY</th> <th>Q1</th> <th>Q2</th> <th>Q3</th> </tr>
  <tr> <td data-level="0"><strong>Systemwide Same Shop Sales</strong></td> <td><strong>(2.0)%</strong></td> <td><strong>3.8 %</strong></td> <td><strong>4.0 %</strong></td> <td><strong>5.0 %</strong></td> <td><strong>2.8 %</strong></td> <td><strong>10.0 %</strong></td> <td><strong>4.1 %</strong></td> <td><strong>2.7 %</strong></td> </tr>
  <tr> <td data-level="1">Ticket</td> <td>6.3 %</td> <td>6.4 %</td> <td>9.5 %</td> <td>5.4 %</td> <td>7.2 %</td> <td>8.8 %</td> <td>6.1 %</td> <td>1.9 %</td> </tr>
  <tr> <td data-level="1">Transactions</td> <td>(8.3)%</td> <td>(2.6) %</td> <td>(5.5) %</td> <td>(0.4) %</td> <td>(4.4) %</td> <td>1.2 %</td> <td>(2.0) %</td> <td>0.8 %</td> </tr>
  <tr> <td data-level="0"><strong>Company-Operated Same Shop Sales</strong></td> <td><strong>(3.5) %</strong></td> <td><strong>1.6 %</strong></td> <td><strong>2.8 %</strong></td> <td><strong>4.6 %</strong></td> <td><strong>1.5 %</strong></td> <td><strong>10.9 %</strong></td> <td><strong>5.2 %</strong></td> <td><strong>4.0 %</strong></td> </tr>
  <tr> <td data-level="1">Ticket</td> <td>6.5 %</td> <td>6.1 %</td> <td>9.1 %</td> <td>4.9 %</td> <td>7.1 %</td> <td>8.2 %</td> <td>6.0 %</td> <td>1.6 %</td> </tr>
  <tr> <td data-level="1">Transactions</td> <td>(10.0) %</td> <td>(4.5) %</td> <td>(6.3) %</td> <td>(0.3) %</td> <td>(5.6) %</td> <td>2.7 %</td> <td>(0.8) %</td> <td>2.4 %</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `dt1`

![[zoo-dt1.png]]

Bold *TAMI* / *Professional Services* parents over italic children (*TAMI, Technology*, …). The
page prints **no indentation**: every label starts at the same left edge, so every row is level
`0`. The parent/child distinction is carried only by weight and slant, which apply to every cell of
those rows and are rendered per cell. The table closes with a `TOTAL` row, so its stub carries
levels.

<details>
<summary>Expected Markdown · table 1 of 2, excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Firms</th> <th>%</th> <th>Square Footage Leased</th> <th>%</th> </tr>
  <tr> <td data-level="0"><strong>TAMI</strong></td> <td><strong>302</strong></td> <td><strong>33%</strong></td> <td><strong>10,444,741</strong></td> <td><strong>42%</strong></td> </tr>
  <tr> <td data-level="0"><em>TAMI, Technology</em></td> <td><em>120</em></td> <td><em>13%</em></td> <td><em>2,777,007</em></td> <td><em>11%</em></td> </tr>
  <tr> <td data-level="0"><em>TAMI, Advertising</em></td> <td><em>52</em></td> <td><em>6%</em></td> <td><em>2,012,178</em></td> <td><em>8%</em></td> </tr>
  <tr> <td data-level="0"><em>TAMI, Marketing</em></td> <td><em>13</em></td> <td><em>1%</em></td> <td><em>433,002</em></td> <td><em>2%</em></td> </tr>
  <tr> <td data-level="0"><em>TAMI, Media</em></td> <td><em>98</em></td> <td><em>11%</em></td> <td><em>4,889,356</em></td> <td><em>20%</em></td> </tr>
  <tr> <td data-level="0"><em>TAMI, Public Relations</em></td> <td><em>19</em></td> <td><em>2%</em></td> <td><em>208,331</em></td> <td><em>1%</em></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `P200509160137_0137_6519`

![[zoo-P200509160137_0137_6519.png]]

*細分 breakdown：批發 Wholesale* and *其中 within which：航空運輸 Air transport* open breakdowns of
the bold category above them. The page prints no indentation; the relationship is stated in
words, so each breakdown row is level `1`, and the plain-weight rows that continue the same
breakdown (*零售 Retail*, *陸上運輸 Land transport*, *海運 Maritime transport*) are level `1` with it.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>2005年<br/>Q2指數<br/>Index for<br/>Q2 2005</th> <th colspan="2">2005年Q2與<br/>2005年Q1比較<br/>Q2 2005<br/>compared with<br/>Q1 2005</th> <th colspan="2">2005年Q2與<br/>2004年Q2比較<br/>Q2 2005<br/>compared with<br/>Q2 2004</th> <th colspan="2">2005年Q1至Q2與<br/>2004年Q1至Q2比較<br/>Q1-Q2 2005<br/>compared with<br/>Q1-Q2 2004</th> </tr>
  <tr> <th></th> <th>（點）<br/>(Points)</th> <th>（點）<br/>(Points)</th> <th>（百分率）<br/>(%)</th> <th>（點）<br/>(Points)</th> <th>（百分率）<br/>(%)</th> <th>（點）<br/>(Points)</th> <th>（百分率）<br/>(%)</th> </tr>
  <tr> <th colspan="8">服務行業 Service Industry</th> </tr>
  <tr> <td data-level="0"><strong>批發/零售 Wholesale/Retail</strong></td> <td>102.3</td> <td>-1.1</td> <td>-1.1</td> <td>+7.2</td> <td>+7.6</td> <td>+7.2</td> <td>+7.5</td> </tr>
  <tr> <td data-level="1"><em>細分 breakdown</em>：批發 Wholesale</td> <td>81.7</td> <td>+1.3</td> <td>+1.6</td> <td>+6.6</td> <td>+8.8</td> <td>+4.8</td> <td>+6.3</td> </tr>
  <tr> <td data-level="1">零售 Retail</td> <td>109.7 *</td> <td>-2.0</td> <td>-1.8</td> <td>+7.4</td> <td>+7.3</td> <td>+8.1</td> <td>+7.9</td> </tr>
  <tr> <td data-level="0"><strong>進口與出口貿易 Import and export trades</strong></td> <td>108.5</td> <td>+11.0</td> <td>+11.3</td> <td>+10.1</td> <td>+10.3</td> <td>+10.9</td> <td>+11.8</td> </tr>
  <tr> <td data-level="0"><strong>飲食 Restaurants</strong></td> <td>92.5</td> <td>-3.0</td> <td>-3.1</td> <td>+4.0</td> <td>+4.5</td> <td>+4.7</td> <td>+5.3</td> </tr>
  <tr> <td data-level="0"><strong>酒店 Hotels</strong></td> <td>113.6</td> <td>-0.9</td> <td>-0.8</td> <td>+20.8</td> <td>+22.4</td> <td>+21.0</td> <td>+22.6</td> </tr>
  <tr> <td data-level="0"><strong>運輸 Transport</strong></td> <td>135.1</td> <td>+9.9</td> <td>+7.9</td> <td>+17.7</td> <td>+15.1</td> <td>+18.9</td> <td>+17.0</td> </tr>
  <tr> <td data-level="1"><em>其中 within which</em>：航空運輸 Air transport</td> <td>139.6</td> <td>+13.1</td> <td>+10.4</td> <td>+26.7</td> <td>+23.6</td> <td>+25.7</td> <td>+23.9</td> </tr>
  <tr> <td data-level="1">陸上運輸 Land transport</td> <td>107.3</td> <td>+5.6</td> <td>+5.5</td> <td>+7.3</td> <td>+7.3</td> <td>+5.4</td> <td>+5.5</td> </tr>
  <tr> <td data-level="1">海運 Maritime transport</td> <td>159.4</td> <td>+10.5</td> <td>+7.1</td> <td>+13.2</td> <td>+9.0</td> <td>+18.9</td> <td>+13.9</td> </tr>
  <!-- … -->
</table>
```

</details>

## Two more stub shapes

### Two-column stubs

Where a table sets sub-labels in a second stub column to the right of the parent label, one per
line, each with its own values, the output MUST render a two-column stub: the parent label in the
first column, spanning its children with a `rowspan` where the page prints it as one cell, and each
sub-label in the second column on its own row.

### ✅ **Sample** — a stub split into two columns

![[bag-insurer-two-column-stub.png]]

`Unallocated interest charges` sits in the first stub column, one ruled cell tall enough for both
sub-labels, with `– external` and `– intra-group` in a second column to its right, each with its own
values; the *6 months 2024* cell of `– external` is empty. Every group on the page closes with an
unlabelled bold total. No label is indented, so every label — in either stub column — is level
`0`; the closing grand total is a labelled total, so its label cell is a `<th>`.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="2">Continuing operations</th> <th>6 months<br/>2025<br/>£m</th> <th>6 months 2024 at 2025 exchange rates<br/>£m</th> <th>6 months<br/>2024<br/>£m</th> </tr>
  <tr> <td colspan="2" data-level="0"><strong>Life achieved operating profit</strong></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td colspan="2" data-level="0">United Kingdom</td> <td>318</td> <td>341</td> <td>341</td> </tr>
  <!-- … -->
  <tr> <td colspan="2" data-level="0">Other Europe</td> <td>22</td> <td>10</td> <td>11</td> </tr>
  <tr> <td colspan="2"></td> <td><strong>279</strong></td> <td><strong>224</strong></td> <td><strong>227</strong></td> </tr>
  <tr> <td rowspan="2" data-level="0">Unallocated interest charges</td> <td data-level="0">– external</td> <td>(74)</td> <td>(58)</td> <td></td> </tr>
  <tr> <td data-level="0">– intra-group</td> <td>(76)</td> <td>(91)</td> <td>(91)</td> </tr>
  <tr> <th colspan="2" data-level="0"><strong>Group operating profit before tax* – continuing operations</strong></th> <td><strong>574</strong></td> <td><strong>551</strong></td> <td><strong>560</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — values staggered inside one column

![[bag-staggered-values-one-column.png]]

A Japanese profit-and-loss statement with one `金額` (amount) column: parent amounts right-aligned
at the column edge, children set further left, and `（うち…）` ("of which") sub-items further left
still. **One value column.** The stagger is styling; the hierarchy is carried only by the stub's
`data-level`: the bold categories are `0`, their items `1`, and the `（うち…）` rows, introduced by
"of which", `2`.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>科　　目</th> <th>金　　額</th> </tr>
  <tr> <td data-level="0"><strong>経常収益</strong></td> <td><strong>742</strong></td> </tr>
  <tr> <td data-level="1">資金運用収益</td> <td>538</td> </tr>
  <tr> <td data-level="2">（うち貸出金利息）</td> <td>（58）</td> </tr>
  <tr> <td data-level="2">（うち有価証券利息配当金）</td> <td>（364）</td> </tr>
  <tr> <td data-level="1">役務取引等収益</td> <td>91</td> </tr>
  <tr> <td data-level="1">その他業務収益</td> <td>112</td> </tr>
  <tr> <td data-level="1">その他経常収益</td> <td>1</td> </tr>
  <tr> <td data-level="0"><strong>経常費用</strong></td> <td><strong>1,988</strong></td> </tr>
  <tr> <td data-level="1">資金調達費用</td> <td>177</td> </tr>
  <tr> <td data-level="2">（うち預金利息）</td> <td>（177）</td> </tr>
  <tr> <td data-level="1">役務取引等費用</td> <td>72</td> </tr>
  <tr> <td data-level="1">その他業務費用</td> <td>248</td> </tr>
  <tr> <td data-level="1">営業経費</td> <td>1,475</td> </tr>
  <tr> <td data-level="1">その他経常費用</td> <td>16</td> </tr>
  <tr> <td data-level="0">経常損失</td> <td>1,246</td> </tr>
  <tr> <td data-level="0">税引前当期損失</td> <td>1,246</td> </tr>
  <tr> <td data-level="0">当期損失</td> <td>1,246</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a two-column stub, ruled

![[bag-two-column-stub-subtotal.png]]

`Statutory turnover` and `Proportionate EBITDA` sit in the first stub column; `– NorthStar
Wireless` and `– Other Americas` in a second column beside each, one per line, each with values; an
unlabelled bold subtotal closes each pair. Here the rules run across the first column between the
two lines, so `Proportionate EBITDA` and `(before exceptional items)` are two cells, not one
spanning cell.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th><u>Financial highlights</u></th> <th></th> <th colspan="3"><u>Year ended 31 March</u></th> </tr>
  <tr> <th></th> <th></th> <th>2025</th> <th>2024</th> <th>Increase</th> </tr>
  <tr> <th></th> <th></th> <th>£m</th> <th>£m</th> <th>%</th> </tr>
  <tr> <td>Statutory turnover</td> <td>– NorthStar Wireless</td> <td>–</td> <td>–</td> <td></td> </tr>
  <tr> <td></td> <td>– Other Americas</td> <td>14</td> <td>10</td> <td>40</td> </tr>
  <tr> <td></td> <td></td> <td><strong>14</strong></td> <td><strong>10</strong></td> <td></td> </tr>
  <tr> <td>Proportionate EBITDA</td> <td>– NorthStar Wireless</td> <td>1,942</td> <td>1,714</td> <td>13</td> </tr>
  <tr> <td>(before exceptional items)</td> <td>– Other Americas</td> <td>21</td> <td>(48)</td> <td></td> </tr>
  <tr> <td></td> <td></td> <td><strong>1,963</strong></td> <td><strong>1,666</strong></td> <td></td> </tr>
</table>
```

</details>

<!-- skill:generate
- When table row labels are indented to show nesting, add data-level to every label cell in that stub: data-level="0" for the leftmost label position, "1" for the next indent step, and so on, e.g. <td data-level="2">iPhone</td>.
- Count the level from the left edge of the stub column for each row on its own; never copy it from the row above and never derive it from whether numbers add up.
- Never express nesting with leading spaces or &nbsp;.
- Treat a row introduced by "of which", "out of which", "within which" (or the same words in another language) as a child of the row it breaks down.
- When sub-labels sit in a second stub column beside a parent label, keep two stub columns: parent in the first (rowspan only if the page prints it as one cell), each sub-label on its own row in the second.
-->

<!-- skill:check
- FAIL (MUST) if a table whose row labels are printed at different indents renders them without data-level, or with the same level for labels at different indents.
- FAIL (MUST) if a data-level value does not match the label's printed indent position counted from the left edge of the stub column.
- FAIL (MUST) if indentation is expressed with leading spaces or &nbsp; instead of data-level.
- FAIL (MUST) if a table carrying data-level leaves a non-empty stub label cell without one.
- FAIL (MUST) if a two-column stub is flattened into one column or its sub-labels are joined into one cell.
-->

## Related

- [[Total and Subtotal Rows]] — the aggregate row at the top of the hierarchy, and its label cell
- [[Record Groups and Multi-Line Cells]] — multi-line labels that are one cell, not parent and child
- [[Bold and Italic Inside Tables]] — weight and slant that often accompany a hierarchy, rendered per cell
