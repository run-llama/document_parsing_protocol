---
title: Group and Cohort Bands
rule_id: tables-group-and-cohort-bands
status: rule
scope: page
tags: [tables, boundaries, headers]
---

# Group and Cohort Bands

> [!success] ✅ Normative
> Bands over stacked grids resolve on one question: **is there a shared row spine?** Grids sharing
> one spine MUST be rendered as one table. Grids with no shared spine and no column headers MUST be
> rendered as one table per band, with the band as that table's header row.

| | Shared spine | No shared spine |
| --- | --- | --- |
| Row spine | one continuous spine, shared label column | repeated, independent per band |
| Column headers | present, often with a numbered tier | **absent entirely** |
| **Rendering** | **one table** | **one table per cohort**, band becomes its header row |

The row spine is checked first, then the column headers. Those two signals decide it; the bands
themselves look identical in both cases.

## Group bands over a shared spine — one table

Two boxed group headers sitting over **one continuous row grid that shares a left label column**
MUST be rendered as a **single table**.

```text
|        | Loss of Income | Other         |  ← two boxed bands
| (1)    | (2)   | (3)    | (4)   | (5)   |  ← full-width numbered tier
| 2019   | 1,204 | 887    | 310   | 95    |  ← one shared row spine
```

### The decisive signal

> **A full-width numbered tier is proof of single-table semantics.**

If `(1)…(13)` runs across the whole width, the page is asserting that all those columns describe
one row. Splitting there loses the row identity that spans the groups — the fact that 2019's
Loss-of-Income figures and its Other figures belong to the same year.

- The group bands MUST be rendered as spanning cells over their column ranges.
- The numbered tier MUST be kept as a header row, not dropped as decoration. See
  [[Barely-Existing Columns and Headers]] — dropping the numbered tier as noise also destroys the
  evidence that the table is one table.

### ✅ **Sample** — `yef`

![[zoo-yef.png]]

Full-width *Year Ended…* bands sharing **one** header and column spine across three fiscal years.
The currency sign is printed with a space before the figure, and that space is kept.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>(in millions)</th> <th>Willowbrook Segment</th> <th>Corporate, Support and Other</th> <th>Total</th> </tr>
  <tr> <th colspan="4">Year Ended February 1, 2025</th> </tr>
  <tr> <td>Net sales</td> <td>$ 17,565.8</td> <td>$ —</td> <td>$ 17,565.8</td> </tr>
  <tr> <td>Cost of sales</td> <td>11,284.1</td> <td>—</td> <td>11,284.1</td> </tr>
  <tr> <td>Gross Profit</td> <td>6,281.7</td> <td>—</td> <td>6,281.7</td> </tr>
  <tr> <td>Other revenue</td> <td>0.1</td> <td>12.6</td> <td>12.7</td> </tr>
  <tr> <td>Selling, general and administrative expenses</td> <td>4,193.2</td> <td>639.2</td> <td>4,832.4</td> </tr>
  <tr> <td>Operating income (loss)</td> <td>2,088.6</td> <td>(626.6)</td> <td>1,462.0</td> </tr>
  <tr> <td>Interest expense, net</td> <td> </td> <td> </td> <td>107.5</td> </tr>
  <tr> <td>Other (income) expense, net</td> <td> </td> <td> </td> <td>(29.1)</td> </tr>
  <tr> <td>Income from continuing operations before income taxes</td> <td> </td> <td> </td> <td>$ 1,383.6</td> </tr>
  <tr> <td>Depreciation and amortization expense</td> <td>$ 488.9</td> <td>$ 38.0</td> <td>$ 526.9</td> </tr>
  <tr> <td>Capital expenditures</td> <td>$ 1,262.2</td> <td>$ 38.3</td> <td>$ 1,300.5</td> </tr>
  <tr> <th colspan="4">Year Ended February 3, 2024</th> </tr>
  <tr> <td>Net sales</td> <td>$ 16,770.3</td> <td>$ —</td> <td>$ 16,770.3</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `10k1`

![[zoo-10k1.png]]

*Revenues*, *Earnings from operations*, *Operating margin* bands over one shared segment spine —
MerevaldCare, Vantage Health, Vantage Insight, Vantage Rx. The three Vantage lines and the
eliminations line under MerevaldCare are indented one step; the consolidated rows are bold totals.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3">For the Years Ended December 31,</th> <th colspan="2">Change</th> </tr>
  <tr> <th>(in millions, except percentages)</th> <th>2030</th> <th>2029</th> <th>2028</th> <th colspan="2">2030 vs. 2029</th> </tr>
  <tr> <th colspan="6">Revenues</th> </tr>
  <tr> <td data-level="0">MerevaldCare</td> <td>$ 301,450</td> <td>$ 284,900</td> <td>$ 252,100</td> <td>$ 16,550</td> <td>6%</td> </tr>
  <tr> <td data-level="1">Vantage Health</td> <td>108,200</td> <td>97,650</td> <td>73,300</td> <td>10,550</td> <td>11</td> </tr>
  <tr> <td data-level="1">Vantage Insight</td> <td>19,300</td> <td>19,480</td> <td>15,010</td> <td>(180)</td> <td>(1)</td> </tr>
  <tr> <td data-level="1">Vantage Rx</td> <td>137,000</td> <td>119,400</td> <td>102,650</td> <td>17,600</td> <td>15</td> </tr>
  <tr> <td data-level="1">Vantage eliminations</td> <td>(4,520)</td> <td>(3,810)</td> <td>(2,840)</td> <td>(710)</td> <td>19</td> </tr>
  <tr> <td data-level="0">Vantage</td> <td>260,980</td> <td>232,720</td> <td>188,120</td> <td>27,260</td> <td>12</td> </tr>
  <tr> <td data-level="0">Eliminations</td> <td>(162,300)</td> <td>(146,700)</td> <td>(116,700)</td> <td>(15,600)</td> <td>11</td> </tr>
  <tr> <th data-level="0"><strong>Consolidated revenues</strong></th> <td><strong>$ 400,130</strong></td> <td><strong>$ 370,920</strong></td> <td><strong>$ 323,520</strong></td> <td><strong>$ 29,210</strong></td> <td><strong>8%</strong></td> </tr>
  <tr> <th colspan="6">Earnings from operations</th> </tr>
  <tr> <td data-level="0">MerevaldCare</td> <td>$ 15,820</td> <td>$ 16,650</td> <td>$ 14,590</td> <td>$ (830)</td> <td>(5)%</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `3samehead`

![[zoo-3samehead.png]]

Bold *Issue Year* / *Issue Age* / *Attained Age* bands over one shared column spine — one table,
three cohorts. Each band is a full-width row. The last *Issue Year* row prints `32031.9%` in the
last column, and that is the value recorded.

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

## Cohort bands with no column headers — one table per cohort

Same-shape grids stacked under cohort bands, **with no column headers anywhere**:

```text
FEMALE
| 25 | 1.02 | 1.10 |
MALE
| 25 | 1.08 | 1.15 |
```

> **One table per cohort. The band becomes that table's header row.**

Fusing these into a single table loses the row headers: with the bands demoted to ordinary rows,
nothing says which block is female and which is male.

The band is a header here precisely *because* nothing else is — it is the only thing naming what
the rows below it are.

### ✅ **Sample** — `5t`

![[zoo-5t.png]]

Five title bands (*2/3/4/5/6 Year Benefit Period*), each over its own block repeating the same
Issue Age spine: five tables, each band as its table's first header row.

<details>
<summary>Expected Markdown · excerpt, table 1 of 5</summary>

```markdown
<table>
  <tr> <th colspan="17">2 Year Benefit Period</th> </tr>
  <tr> <th> </th> <th colspan="5">No Inflation Protection</th> <th colspan="5">3% Compound Inflation protection</th> <th colspan="5">5% Compound Inflation protection</th> <th> </th> </tr>
  <tr> <th>Issue Age</th> <th>Premium</th> <th>Gross Valuation Premium</th> <th>Renewal Expenses</th> <th>Test Value</th> <th>Pass/Fail</th> <th>Gross Premium</th> <th>Valuation Premium</th> <th>Renewal Expenses</th> <th>Test Value</th> <th>Pass/Fail</th> <th>Gross Premium</th> <th>Valuation Premium</th> <th>Renewal Expenses</th> <th>Test Value</th> <th>Pass/Fail</th> <th>Issue Age</th> </tr>
  <tr> <td>42</td> <td>$519.87</td> <td>$236.69</td> <td>$130.75</td> <td>$152.43</td> <td>Pass</td> <td>$1,200.89</td> <td>$722.54</td> <td>$231.38</td> <td>$246.97</td> <td>Pass</td> <td>$2,710.07</td> <td>$1,693.65</td> <td>$449.41</td> <td>$567.01</td> <td>Pass</td> <td>42</td> </tr>
  <tr> <td>47</td> <td>$583.82</td> <td>$300.61</td> <td>$142.01</td> <td>$141.20</td> <td>Pass</td> <td>$1,316.52</td> <td>$798.87</td> <td>$249.92</td> <td>$267.73</td> <td>Pass</td> <td>$2,731.13</td> <td>$1,719.19</td> <td>$456.52</td> <td>$555.42</td> <td>Pass</td> <td>47</td> </tr>
  <tr> <td>52</td> <td>$678.88</td> <td>$388.43</td> <td>$158.48</td> <td>$131.97</td> <td>Pass</td> <td>$1,441.27</td> <td>$886.15</td> <td>$270.91</td> <td>$284.21</td> <td>Pass</td> <td>$2,736.58</td> <td>$1,721.59</td> <td>$461.87</td> <td>$553.12</td> <td>Pass</td> <td>52</td> </tr>
  <!-- … -->
  <tr> <td>77</td> <td>$1,226.89</td> <td>$558.59</td> <td>$308.57</td> <td>$359.73</td> <td>Pass</td> <td>$2,834.10</td> <td>$1,705.19</td> <td>$546.06</td> <td>$582.85</td> <td>Pass</td> <td>$6,395.77</td> <td>$3,997.01</td> <td>$1,060.61</td> <td>$1,338.14</td> <td>Pass</td> <td>77</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `3tables2`

![[zoo-3tables2.png]]

Each rating class (0034 / 0035 / 0036) is its own titled cohort block, stacked; the class number and
name form the first header row of each class table, and a separate credibility grid follows each.
`CLASS` and its number are printed on two lines in a cell wide enough for one, and the industry and
hazard groups are two separate lines.

<details>
<summary>Expected Markdown · excerpt, the class 0034 table</summary>

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

<!-- … -->
```

</details>

## Keeping the two apart

The two shapes look alike from a distance and resolve in opposite directions, so both checks are
run deliberately:

- Does the left label column run continuously through both bands, unrepeated? → one table.
- Does each band restart the same labels under it, with no column headers printed anywhere? → one
  table per band.

Date bands and shading changes inside a single grid are a different question again — see
[[Bands Inside the Grid]].

<!-- skill:generate
- If group bands sit over one continuous grid that shares one row-label column (often with a numbered header row like (1) (2) (3) across the full width), output one <table>: bands as header cells spanning their columns, the numbered row kept as a header row.
- If same-shape grids are stacked under cohort bands (FEMALE, MALE…) and no column headers are printed anywhere, output one <table> per band, with the band as that table's first header row.
- Never drop a full-width numbered header row as decoration.
-->

<!-- skill:check
- FAIL (MUST) if grids sharing one continuous row-label column under group bands are split into several tables.
- FAIL (MUST) if a full-width numbered header row is missing from the table.
- FAIL (MUST) if stacked cohort grids with no printed column headers are fused into one table with the bands demoted to ordinary body rows.
-->

## Related

- [[Bands Inside the Grid]] — bands that divide one grid rather than head a new one
- [[Barely-Existing Columns and Headers]] — the numbered tier that proves the shared spine
- [[Repeated Headers and Title Bands]] — blocks that each re-declare their headers are separate tables
