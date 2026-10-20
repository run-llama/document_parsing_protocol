---
title: Multi-Row Header Tiers
rule_id: tables-multi-row-header-tiers
status: rule
scope: page
tags: [tables, headers, encoding]
---

# Multi-Row Header Tiers

> [!success] ✅ Normative
> Every printed header tier MUST be rendered as its own header row, with exact colspans. A group
> header MUST span only its data columns; the row-label stub takes a `rowspan` across the header rows
> instead.

```text
Printed:  |            BI          |            PD          |
          | Indicated  | Proposed  | Indicated  | Proposed  |
```

## Every real tier is kept

Both rows are rendered with their spans — `[colspan=2]BI` over `Indicated | Proposed`, and so on.

The stack MUST NOT be flattened into one row of concatenated labels: "BI Indicated", "BI Proposed"
is non-conforming, not a stylistic choice. It destroys the grouping that the page printed and makes
the number of header rows depend on the producer rather than the page.

A wrapped parent phrase is still a tier. "(Paid as of 12-31-2020)" broken across two lines and
spanning its sub-columns is a genuine tier — "it wrapped" does not demote it. The span, not the
line count, decides; [[Header Wrap vs Real Tier]] has the full test.

### ✅ **Sample** — `5lineperrow`

![[zoo-5lineperrow.png]]

Four stacked header rows: benefit period › inflation › *Incurred Age Band* › `<75 / 75-84 / 85+`
repeated four times. The stub label spans all four header rows; the month numbers are bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th rowspan="4">Claim Duration Month</th> <th colspan="6">Non-Lifetime Benefit Period</th> <th colspan="6">Lifetime Benefit Period</th> </tr>
  <tr> <th colspan="3">No Inflation</th> <th colspan="3">Auto Inflation</th> <th colspan="3">No Inflation</th> <th colspan="3">Auto Inflation</th> </tr>
  <tr> <th colspan="12">Incurred Age Band</th> </tr>
  <tr> <th>&lt;75</th> <th>75-84</th> <th>85+</th> <th>&lt;75</th> <th>75-84</th> <th>85+</th> <th>&lt;75</th> <th>75-84</th> <th>85+</th> <th>&lt;75</th> <th>75-84</th> <th>85+</th> </tr>
  <tr> <td><strong>1</strong></td> <td>0.89</td> <td>0.88</td> <td>0.96</td> <td>0.86</td> <td>0.86</td> <td>0.94</td> <td>0.83</td> <td>0.83</td> <td>0.90</td> <td>0.81</td> <td>0.81</td> <td>0.88</td> </tr>
  <tr> <td><strong>2</strong></td> <td>0.89</td> <td>0.88</td> <td>0.96</td> <td>0.86</td> <td>0.86</td> <td>0.94</td> <td>0.83</td> <td>0.83</td> <td>0.90</td> <td>0.81</td> <td>0.81</td> <td>0.88</td> </tr>
  <tr> <td><strong>3</strong></td> <td>0.89</td> <td>0.88</td> <td>0.96</td> <td>0.86</td> <td>0.86</td> <td>0.94</td> <td>0.83</td> <td>0.83</td> <td>0.90</td> <td>0.81</td> <td>0.81</td> <td>0.88</td> </tr>
  <tr> <td><strong>4</strong></td> <td>0.89</td> <td>0.88</td> <td>0.96</td> <td>0.86</td> <td>0.86</td> <td>0.94</td> <td>0.83</td> <td>0.83</td> <td>0.90</td> <td>0.81</td> <td>0.81</td> <td>0.88</td> </tr>
  <tr> <td><strong>5</strong></td> <td>0.88</td> <td>0.88</td> <td>0.96</td> <td>0.86</td> <td>0.87</td> <td>0.95</td> <td>0.82</td> <td>0.82</td> <td>0.89</td> <td>0.80</td> <td>0.81</td> <td>0.88</td> </tr>
  <tr> <td><strong>6</strong></td> <td>0.88</td> <td>0.88</td> <td>0.96</td> <td>0.86</td> <td>0.86</td> <td>0.94</td> <td>0.81</td> <td>0.82</td> <td>0.89</td> <td>0.80</td> <td>0.81</td> <td>0.89</td> </tr>
  <tr> <td><strong>7</strong></td> <td>0.90</td> <td>0.91</td> <td>0.97</td> <td>0.90</td> <td>0.92</td> <td>0.98</td> <td>0.84</td> <td>0.86</td> <td>0.91</td> <td>0.85</td> <td>0.87</td> <td>0.92</td> </tr>
  <tr> <td><strong>8</strong></td> <td>0.91</td> <td>0.92</td> <td>0.97</td> <td>0.94</td> <td>0.94</td> <td>0.99</td> <td>0.88</td> <td>0.89</td> <td>0.93</td> <td>0.90</td> <td>0.91</td> <td>0.95</td> </tr>
  <tr> <td><strong>9</strong></td> <td>0.94</td> <td>0.94</td> <td>0.98</td> <td>0.97</td> <td>0.97</td> <td>1.00</td> <td>0.92</td> <td>0.92</td> <td>0.94</td> <td>0.94</td> <td>0.95</td> <td>0.98</td> </tr>
  <tr> <td><strong>10</strong></td> <td>0.97</td> <td>0.96</td> <td>0.99</td> <td>1.00</td> <td>0.99</td> <td>1.02</td> <td>0.98</td> <td>0.97</td> <td>0.99</td> <td>1.02</td> <td>1.00</td> <td>1.03</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `3tables2`

![[zoo-3tables2.png]]

`CONVERTED LOSSES` band over `INDEMNITY LIKELY / NOT-LIKELY` sub-bands, with rowspan leaves beneath.

<details>
<summary>Expected Markdown · the class 0034 table</summary>

```markdown
<table>
  <tr> <th>CLASS<br/>0034</th> <th colspan="9">FARM: POULTRY OR EGG PRODUCER &amp; DRIVERS</th> </tr>
  <tr> <th colspan="2" rowspan="2">Industry Group: Goods and Services<br/>Hazard Group: D</th> <th colspan="7">CONVERTED LOSSES</th> <th> </th> </tr>
  <tr> <th colspan="2">INDEMNITY LIKELY</th> <th colspan="2">INDEMNITY NOT-LIKELY</th> <th rowspan="2">MED LIKELY AMOUNT</th> <th rowspan="2">MED NOT-LIKELY AMOUNT</th> <th rowspan="2">TOTAL AMOUNT</th> <th rowspan="2">TOTAL PURE PREM.</th> </tr>
  <tr> <th>POLICY PERIOD</th> <th>PAYROLL</th> <th>CASES</th> <th>AMOUNT</th> <th>CASES</th> <th>AMOUNT</th> </tr>
  <tr> <td>3/18 through 2/19</td> <td>14,448,797</td> <td>0</td> <td>0</td> <td>14</td> <td>155,528</td> <td>0</td> <td>194,420</td> <td>349,948</td> <td>2.422</td> </tr>
  <tr> <td>3/19 through 2/20</td> <td>17,615,203</td> <td>2</td> <td>82,335</td> <td>6</td> <td>35,868</td> <td>50,950</td> <td>85,546</td> <td>254,699</td> <td>1.446</td> </tr>
  <tr> <td>3/20 through 2/21</td> <td>17,172,385</td> <td>6</td> <td>287,460</td> <td>11</td> <td>248,762</td> <td>170,700</td> <td>211,880</td> <td>918,802</td> <td>5.351</td> </tr>
  <tr> <td>3/21 through 2/22</td> <td>18,522,883</td> <td>0</td> <td>0</td> <td>8</td> <td>97,842</td> <td>0</td> <td>176,515</td> <td>274,357</td> <td>1.481</td> </tr>
  <tr> <td>3/22 through 2/23</td> <td>17,213,995</td> <td>0</td> <td>0</td> <td>7</td> <td>66,407</td> <td>0</td> <td>122,457</td> <td>188,864</td> <td>1.097</td> </tr>
  <tr> <th data-level="0"><strong>5 YR. TOTAL</strong></th> <td><strong>84,973,263</strong></td> <td><strong>8</strong></td> <td><strong>369,795</strong></td> <td><strong>46</strong></td> <td><strong>604,407</strong></td> <td><strong>221,650</strong></td> <td><strong>790,818</strong></td> <td><strong>1,986,670</strong></td> <td><strong>2.338</strong></td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `3in1`

![[zoo-3in1.png]]

The *Loss Ratio Summaries* block prints **no header row at all**; supplying a tier of
Premium/Claims/Ratio labels over its columns fabricates headers the page never printed. The block is
rendered headerless, and the *Projected Loss Ratio* block below it keeps its own single header row.

<details>
<summary>Expected Markdown · excerpt, the Loss Ratio Summaries</summary>

```markdown
**Loss Ratio Summaries**

<table>
  <tr> <td>Accumulated Value of Historical to 6/30/2017</td> <td>143,523,744</td> <td>51,074,537</td> <td>36%</td> <td>143,523,744</td> <td>51,074,537</td> <td>36%</td> </tr>
  <tr> <td>Present Value of Future to 6/30/2017</td> <td>57,952,880</td> <td>160,506,393</td> <td>277%</td> <td>63,587,610</td> <td>151,418,930</td> <td>238%</td> </tr>
  <tr> <td>Total Values</td> <td>201,476,623</td> <td>211,580,930</td> <td>105%</td> <td>207,111,354</td> <td>202,493,467</td> <td>98%</td> </tr>
  <tr> <td>(Discounted at 4.5%)</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
</table>

<table>
  <tr> <th>Projected Loss Ratio</th> <th>Without Increase</th> <th>With Increase</th> </tr>
  <tr> <td>Overall</td> <td>105%</td> <td>98%</td> </tr>
  <tr> <td>Cash/Unlimited</td> <td>178%</td> <td>164%</td> </tr>
  <tr> <td>Cash/Limited</td> <td>107%</td> <td>101%</td> </tr>
  <tr> <td>Reimbursement/Unlimited</td> <td>115%</td> <td>106%</td> </tr>
  <tr> <td>Reimbursement/Limited</td> <td>87%</td> <td>82%</td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `w`

![[zoo-w.png]]

The page prints **one** header row, each label wrapped over several lines. Splitting it into a
`rowspan="2"` tier with an empty second row, as below, invents a tier. `Trans-` / `ferred` is one
word broken at a line-end hyphen.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th> </th> <th>Outstanding as of January 1</th> <th>Addition during the period</th> <th>Warrants exercised</th> <th>Annulled</th> <th>Terminated</th> <th>Transferred</th> <th>Outstanding as of September 30</th> </tr>
  <tr> <td>Corporate Management</td> <td>439,402</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> <td>439,402</td> </tr>
  <tr> <td>Other Executive Management</td> <td>723,326</td> <td>-</td> <td>(31,709)</td> <td>-</td> <td>-</td> <td>(215,328)</td> <td>476,289</td> </tr>
  <tr> <td>Other employees</td> <td>2,062,360</td> <td>-</td> <td>(307,240)</td> <td>(176,183)</td> <td>-</td> <td>(44,479)</td> <td>1,534,458</td> </tr>
  <tr> <td>Resigned employees</td> <td>167,901</td> <td>-</td> <td>(126,056)</td> <td>-</td> <td>-</td> <td>259,807</td> <td>301,652</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>3,392,989</strong></td> <td><strong>-</strong></td> <td><strong>(465,005)</strong></td> <td><strong>(176,183)</strong></td> <td><strong>-</strong></td> <td><strong>-</strong></td> <td><strong>2,751,801</strong></td> </tr>
  <tr> <td><strong>Weighted average exercise price</strong></td> <td><strong>188</strong></td> <td> </td> <td><strong>217</strong></td> <td><strong>192</strong></td> <td> </td> <td> </td> <td><strong>184</strong></td> </tr>
  <tr> <td><strong>Weighted average share price at exercise</strong></td> <td> </td> <td> </td> <td><strong>329</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th> </th> <th rowspan="2">Outstanding<br/>as of<br/>January 1</th> <th rowspan="2">Addition<br/>during the<br/>period</th> <th rowspan="2">Warrants<br/>exercised</th> <th rowspan="2">Annulled</th> <th rowspan="2">Terminated</th> <th rowspan="2">Trans-<br/>ferred</th> <th rowspan="2">Outstanding<br/>as of<br/>September<br/>30</th> </tr>
  <tr> <th> </th> </tr>
  <tr> <td>Corporate Management</td> <td>439,402</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> <td>439,402</td> </tr>
  <!-- … -->
</table>
```

</details>

## The group header stops at the first data column

A group super-header spans its data columns and **never the row-label stub**. The stub takes a
`rowspan` across the header rows:

```html
<th rowspan="2">UW Category</th><th colspan="3">Inception to Date</th>
<!-- then: -->  Earned Premium | Incurred Claims | Loss Ratio
```

> **The group's colspan MUST equal its leaf count, exactly.**

The printed rule under the group starts at the first data column. The stub is not part of
"Inception to Date" — the stub says *which row*, the group says *which measure*. Different axes, so
they do not share a span. Spanning the stub as well is the most common way this goes wrong.

### ✅ **Sample** — `star`

![[zoo-star.png]]

Three genuine tiers: `APPLICABILITY CHART` (colspan 5) over `TERRORISM OPTIONS – INCLUDING PRICING`
(colspan 4) over four leaves, with `STATE` taking rowspan 2 — a clean instance of the stub rule.
The printed asterisks are escaped.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="5">APPLICABILITY CHART</th> </tr>
  <tr> <th rowspan="2">STATE</th> <th colspan="4">TERRORISM OPTIONS – INCLUDING PRICING</th> </tr>
  <tr> <th>VERSION</th> <th>IMPLEMENTATION CIRCULAR</th> <th>EFFECTIVE DATE</th> <th>EXPIRATION DATE</th> </tr>
  <tr> <td>ALABAMA</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>ALASKA</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>ARIZONA</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>ARKANSAS</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>CALIFORNIA</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>COLORADO</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>CONNECTICUT</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>DELAWARE</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>DIST. OF COLUMBIA</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>FLORIDA</td> <td>\*</td> <td>\*</td> <td>\*</td> <td>\*</td> </tr>
  <tr> <td>GEORGIA</td> <td>CS102</td> <td>CP–SC–2024–381</td> <td>2/01/25</td> <td>+</td> </tr>
  <!-- … -->
</table>
```

</details>

## Reconciling the tracks

The leaf-column tracks **N** of the table are counted. For each header row, the expanded colspans,
occupied **plus explicit blank** tracks, MUST add up to N.

A mismatch shows which kind of error was made, before anything else is inspected:

1. a missed column
2. a wrong span
3. two tables fused into one
4. a header line read as the wrong kind of thing

## Period stacks in financial statements

```text
| $ in millions |       Average for the        |  ← corner note; apex tier
|               | Three Months Ended | Year …  |
|               | December | December | Dec…   |  ← stacked "December"/"2024"
|               | 2024     | 2023     | 2024   |    is ONE leaf label
```

Period headers follow the same rules, with a few fixed calls of their own — apex qualifiers,
stacked month-over-year labels and the "$ in millions" corner note. They are set out in
[[SEC Period Tiers]], which governs 10-K and 10-Q header stacks.

### ✅ **Sample** — `wdb`

![[zoo-wdb.png]]

`Three Months Ended` / `Nine Months Ended` bands split into year and Reported/Ex-FX sub-columns.
A rule runs under the year row across the whole table, so the cells under `2024` and `2023` in the
third header row are separate empty cells, not a `rowspan`. `Ex-FX` breaks at its own hyphen and
keeps it.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="4">Three Months Ended September 30,</th> <th colspan="4">Nine Months Ended September 30,</th> </tr>
  <tr> <th> </th> <th>2024</th> <th>2023</th> <th colspan="2">% Change</th> <th>2024</th> <th>2023</th> <th colspan="2">% Change</th> </tr>
  <tr> <th><em>$ in millions</em></th> <th> </th> <th> </th> <th>Reported</th> <th>Ex-FX<sup>(\*)</sup></th> <th> </th> <th> </th> <th>Reported</th> <th>Ex-FX<sup>(\*)</sup></th> </tr>
  <tr> <td><strong>Distribution</strong></td> <td>$ 2,598</td> <td>$ 2,833</td> <td>(8)%</td> <td>(7)%</td> <td>$ 8,070</td> <td>$ 8,769</td> <td>(8)%</td> <td>(7)%</td> </tr>
  <tr> <td><strong>Advertising</strong></td> <td>1,490</td> <td>1,709</td> <td>(13)%</td> <td>(13)%</td> <td>5,691</td> <td>6,394</td> <td>(11)%</td> <td>(11)%</td> </tr>
  <tr> <td><strong>Content</strong></td> <td>833</td> <td>215</td> <td>NM</td> <td>NM</td> <td>1,396</td> <td>744</td> <td>88 %</td> <td>87 %</td> </tr>
  <tr> <td><strong>Other</strong></td> <td>89</td> <td>111</td> <td>(20)%</td> <td>(21)%</td> <td>250</td> <td>300</td> <td>(17)%</td> <td>(18)%</td> </tr>
  <tr> <th data-level="0"><strong>Total revenues</strong></th> <td><strong>5,010</strong></td> <td><strong>4,868</strong></td> <td><strong>3 %</strong></td> <td><strong>3 %</strong></td> <td><strong>15,407</strong></td> <td><strong>16,207</strong></td> <td><strong>(5)%</strong></td> <td><strong>(4)%</strong></td> </tr>
  <tr> <td><strong>Costs of revenues (excluding depreciation &amp; amortization)</strong></td> <td>2,185</td> <td>1,800</td> <td>21 %</td> <td>22 %</td> <td>7,088</td> <td>7,243</td> <td>(2)%</td> <td>(1)%</td> </tr>
  <tr> <td><strong>Selling, general and administrative</strong></td> <td>710</td> <td>672</td> <td>6 %</td> <td>6 %</td> <td>2,087</td> <td>2,109</td> <td>(1)%</td> <td>— %</td> </tr>
  <tr> <td><strong>Adjusted EBITDA</strong></td> <td><strong>$ 2,115</strong></td> <td><strong>$ 2,396</strong></td> <td><strong>(12)%</strong></td> <td><strong>(11)%</strong></td> <td><strong>$ 6,232</strong></td> <td><strong>$ 6,855</strong></td> <td><strong>(9)%</strong></td> <td><strong>(9)%</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `sssa`

![[zoo-sssa.png]]

`2023` (colspan 5) and `2024` (colspan 3) over Q1–Q4/FY leaves.

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

<!-- skill:generate
- Give every printed header tier its own <tr> of header cells; never merge stacked tiers into one row of concatenated labels like "BI Indicated".
- Set each group header's colspan to exactly the number of leaf columns printed under it; never let a group header cover the row-label column.
- Give the row-label header a rowspan across the header rows when it sits beside a stacked header.
- Never add a header row the page does not print, and never split one printed header row into two.
- Check that every header row, with colspans and blank cells, adds up to the number of columns in the body.
-->

<!-- skill:check
- FAIL (MUST) if two printed header tiers are flattened into one row of concatenated labels.
- FAIL (MUST) if a group header's colspan differs from the number of leaf columns printed under it, or covers the row-label column.
- FAIL (MUST) if the Markdown contains a header row, or a row of header labels, that the page does not print.
- FAIL (MUST) if a header row's cells, with colspans expanded, do not add up to the table's column count.
-->

## Related

- [[Header Wrap vs Real Tier]] — telling a genuine tier from wrapped text
- [[Units Row]] — a units line under the header, another header row
- [[Barely-Existing Columns and Headers]] — the blank corner cell and the stub carve-out
- [[SEC Period Tiers]] — the fixed calls for financial period stacks
