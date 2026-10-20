---
title: Header Wrap vs Real Tier
rule_id: tables-header-wrap-vs-real-tier
status: rule
scope: page
tags: [tables, headers, heuristic]
---

# Header Text Wrap vs. Real Tier

> [!success] ✅ Normative
> A header line with a rule beneath it, standing over two or more self-standing leaf labels, is a
> real tier and MUST be rendered as its own header row. Fragments that simply stack with no border
> and read as one phrase are a wrapped label and MUST be joined with a space into a single header
> cell.

**As printed:**

![[header-wrap-vs-tier-1.png]]

**As parsed — the failure:**

![[header-wrap-vs-tier-2.png]]

Only **"Common Stock"** is a real tier here: it has a rule beneath it and spans two self-standing
leaves, *Shares* and *Amount*. The other three are **single wrapped labels** — "Capital in Excess of
Par Value" is one column heading broken across two lines to fit. Treating all four the same way
splits every wrapped label into a phantom two-row tier, which is the error this rule prevents
(**never invent**).

Wrapped header text looks **exactly** like a two-row tier, so the test is run deliberately rather
than by eye.

```text
Wrap (one header, join with a space):     Real tier (parent phrase over leaves):
| Published    |                          | (Paid as of 12-31-2020) |
| Availability |                          |   2018    |    2019     |
  ↑ fragments concatenate, no border        ↑ spans two sub-columns
```

## The test

1. **A rule beneath the upper line.** A printed border under a label, with columns continuing below
   it, points to a tier.
2. **The lower labels on their own.** If each stands as a complete column heading — *Shares*,
   *Amount*, *2018*, *2019* — the line above is a tier over them. If the lines only make sense
   concatenated, they are one wrapped label.
3. **The span.** A tier covers two or more leaf columns. A label that sits over exactly one column
   is a wrap, whatever its line count.

### ✅ **Sample** — `wqa`

![[zoo-wqa.png]]

`1 YEAR TO / LESS THAN / 2 YEARS` wraps across three printed lines and is **one** header label. The
month labels and the `Total` row are bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th>LESS THAN 1 YEAR</th> <th>1 YEAR TO LESS THAN 2 YEARS</th> <th>2 YEARS TO LESS THAN 3 YEARS</th> <th>3 YEARS TO LESS THAN 4 YEARS</th> <th>4 YEARS TO LESS THAN 5 YEARS</th> <th>5 YEARS OR MORE</th> <th>TOTAL</th> </tr>
  <tr> <td><strong>Nov-25</strong></td> <td>1,430</td> <td>685</td> <td>310</td> <td>140</td> <td>X</td> <td>X</td> <td>2,569</td> </tr>
  <tr> <td><strong>Dec-25</strong></td> <td>1,390</td> <td>660</td> <td>295</td> <td>130</td> <td>X</td> <td>X</td> <td>2,478</td> </tr>
  <tr> <td><strong>Jan-26</strong></td> <td>1,570</td> <td>705</td> <td>320</td> <td>150</td> <td>X</td> <td>X</td> <td>2,750</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>4,390</strong></td> <td><strong>2,050</strong></td> <td><strong>925</strong></td> <td><strong>420</strong></td> <td><strong>8</strong></td> <td><strong>X</strong></td> <td><strong>7,797</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `ed`

![[zoo-ed.png]]

`Committee Membership Until 2025 Meeting` — one label wrapped over four lines, not a colspan tier.
The checkmarks are rendered as `[yes]` (see [[Marks and Symbols in Cells]]).

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Name</th> <th>Age</th> <th>Director Since</th> <th>Independent</th> <th>Financial Expert (1)</th> <th>Committee Membership Until 2025 Meeting</th> <th>Committee Membership After 2025 Meeting</th> <th>Other Public Company Boards</th> </tr>
  <tr> <td>Warren T. Castellan</td> <td>67</td> <td>2011</td> <td>[yes]</td> <td>[yes]</td> <td>CC</td> <td>NCGC</td> <td></td> </tr>
  <tr> <td>Foster L. Kilbane</td> <td>67</td> <td>1993</td> <td>[yes]</td> <td></td> <td>CC</td> <td>AC, CC</td> <td>1 (2)</td> </tr>
  <tr> <td>Elias N. Okafor</td> <td>45</td> <td>2020</td> <td>[yes]</td> <td></td> <td>CC</td> <td>CC</td> <td></td> </tr>
  <tr> <td>Marguerite S. Voss</td> <td>69</td> <td>2015</td> <td>[yes]</td> <td></td> <td>NCGC</td> <td>CC</td> <td></td> </tr>
  <tr> <td>Desmond K. Hara</td> <td>62</td> <td>1993</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Adele R. Winslow</td> <td>67</td> <td>2013</td> <td>[yes]</td> <td>[yes]</td> <td>CC<br/>Chairperson</td> <td>CC<br/>Chairperson</td> <td>1</td> </tr>
  <tr> <td>Marcus T. Whitfield</td> <td>72</td> <td>1993</td> <td>[yes]</td> <td>[yes]</td> <td>AC, NCGC</td> <td>AC, NCGC</td> <td></td> </tr>
  <tr> <td>Priya N. Rajan</td> <td>62</td> <td>2023</td> <td>[yes]</td> <td>[yes]</td> <td>AC</td> <td>AC</td> <td>1</td> </tr>
  <tr> <td>Gerald P. Ashcombe<br/>(Lead Director)</td> <td>76</td> <td>2019</td> <td>[yes]</td> <td></td> <td>NCGC<br/>Chairperson</td> <td>NCGC<br/>Chairperson</td> <td></td> </tr>
  <tr> <td>Renata M. Solano</td> <td>67</td> <td>2024</td> <td>[yes]</td> <td></td> <td>NCGC</td> <td>NCGC</td> <td>1</td> </tr>
  <tr> <td>B. Trevor Lindqvist</td> <td>77</td> <td>1997</td> <td>[yes]</td> <td>[yes]</td> <td>AC<br/>Chairperson</td> <td>AC<br/>Chairperson</td> <td>1</td> </tr>
  <tr> <td>Naledi K. Osei</td> <td>60</td> <td>2020</td> <td>[yes]</td> <td></td> <td>AC, CC</td> <td>AC, CC</td> <td>1</td> </tr>
  <tr> <td>Colin J. Whitmore</td> <td>65</td> <td>2008 (3)</td> <td>[yes]</td> <td></td> <td>AC, NCGC</td> <td>CC, NCGC</td> <td></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `wat`

![[zoo-wat.png]]

`Water - Weather` and `Water - Non-Weather` each wrap two lines; both are single labels.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>ZipCodes</th> <th>Tornado</th> <th>Wind</th> <th>Hail</th> <th>Water Backup</th> <th>Water - Weather</th> <th>Water - Non-Weather</th> <th>Fire - Brush</th> <th>Fire - Home</th> <th>Lightning</th> <th>Liability</th> <th>Theft</th> <th>All Other Perils</th> </tr>
  <tr> <td>10101</td> <td>1.038</td> <td>0.550</td> <td>0.563</td> <td>0.861</td> <td>1.245</td> <td>1.107</td> <td>8.499</td> <td>0.950</td> <td>1.228</td> <td>0.558</td> <td>0.639</td> <td>1.048</td> </tr>
  <tr> <td>10102</td> <td>0.695</td> <td>0.757</td> <td>1.125</td> <td>1.092</td> <td>0.940</td> <td>1.076</td> <td>7.715</td> <td>0.867</td> <td>1.681</td> <td>1.186</td> <td>0.760</td> <td>0.835</td> </tr>
  <tr> <td>10103</td> <td>1.216</td> <td>0.921</td> <td>0.289</td> <td>0.770</td> <td>1.310</td> <td>1.081</td> <td>7.694</td> <td>1.619</td> <td>1.363</td> <td>1.445</td> <td>0.799</td> <td>1.077</td> </tr>
  <tr> <td>10104</td> <td>1.144</td> <td>1.256</td> <td>1.443</td> <td>1.116</td> <td>1.226</td> <td>0.886</td> <td>2.208</td> <td>1.161</td> <td>0.824</td> <td>0.749</td> <td>0.521</td> <td>0.910</td> </tr>
  <tr> <td>10105</td> <td>1.036</td> <td>0.954</td> <td>0.705</td> <td>0.851</td> <td>0.968</td> <td>1.198</td> <td>6.187</td> <td>1.493</td> <td>0.932</td> <td>1.215</td> <td>0.583</td> <td>0.971</td> </tr>
  <tr> <td>10106</td> <td>1.234</td> <td>1.282</td> <td>0.985</td> <td>1.193</td> <td>1.307</td> <td>1.142</td> <td>2.219</td> <td>0.893</td> <td>1.102</td> <td>0.782</td> <td>0.631</td> <td>1.315</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `5line heaer`

![[zoo-5line heaer.png]]

Every header is one label wrapped over many lines, e.g. *(1) Latest Year Current Expected Losses…*;
each is joined with spaces into one cell.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th>Industry Group</th> <th>(1) Latest Year Current Expected Losses Prior to Adjustment for Change in Off-Balance</th> <th>(2) Five Year Current Expected Losses Prior to Adjustment for Change in Off-Balance</th> <th>(3) Five Year Proposed Expected Losses Prior to Adjustment for Change in Off-Balance</th> <th>(4) Current Ratio of Manual to Standard Premium</th> <th>(5) Proposed Ratio of Manual to Standard Premium</th> </tr>
  <tr> <td>Manufacturing</td> <td>77,510,436</td> <td>338,649,937</td> <td>315,156,641</td> <td>1.162</td> <td>1.156</td> </tr>
  <tr> <td>Contracting</td> <td>244,423,390</td> <td>1,046,738,721</td> <td>974,416,048</td> <td>1.108</td> <td>1.099</td> </tr>
  <tr> <td>Office &amp; Clerical</td> <td>99,137,891</td> <td>425,709,394</td> <td>396,154,601</td> <td>1.186</td> <td>1.183</td> </tr>
  <tr> <td>Goods &amp; Services</td> <td>308,876,410</td> <td>1,299,162,826</td> <td>1,209,037,084</td> <td>1.068</td> <td>1.062</td> </tr>
  <tr> <td>Miscellaneous</td> <td>176,900,574</td> <td>768,557,721</td> <td>715,461,415</td> <td>1.080</td> <td>1.068</td> </tr>
  <tr> <td>Statewide</td> <td>906,848,702</td> <td>3,878,818,599</td> <td>3,610,225,790</td> <td> </td> <td> </td> </tr>
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th>Industry Group</th> <th>(1)<br/>Latest Year<br/>Current Expected<br/>Losses Prior to<br/>Adjustment for<br/>Change in<br/>Off-Balance</th> <th>(2)<br/>Five Year<br/>Current Expected<br/>Losses Prior to<br/>Adjustment for<br/>Change in<br/>Off-Balance</th> <th>(3)<br/>Five Year<br/>Proposed Expected<br/>Losses Prior to<br/>Adjustment for<br/>Change in<br/>Off-Balance</th> <th>(4)<br/>Current<br/>Ratio of<br/>Manual to<br/>Standard<br/>Premium</th> <th>(5)<br/>Proposed<br/>Ratio of<br/>Manual to<br/>Standard<br/>Premium</th> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `2linebug`

![[zoo-2linebug.png]]

`MAINTAIN CURRENT COVERAGE: No Action Required` wrapped across **five** lines in one cell. The
bracketed field numbers are printed text, the empty boxes are unchecked checkboxes, and the
header rows are padded where the payment column has no header. The call-out box covers the first two
columns of its row.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="4">Effective \[4 September 1, 2017\]</th> <th> </th> </tr>
  <tr> <th>CURRENT</th> <th>MAINTAIN CURRENT COVERAGE: No Action Required</th> <th>OPTION 1: Reduce Benefits</th> <th>OPTION 2: Convert to Paid-Up</th> <th>OPTION 3: Surrender Coverage</th> <th> </th> </tr>
  <tr> <td>\[5 Annual\] Premium</td> <td>$\[6 1,000.00\]</td> <td>$\[7 1,400.00\]</td> <td>$\[8 800.00\]</td> <td>None</td> <td rowspan="5">Receive a cash payment of $\[17 10,000\].</td> </tr>
  <tr> <td>Maximum Daily Benefit</td> <td>$\[9 200.00\]</td> <td>$\[10 200.00\]</td> <td>$\[11 200.00\]</td> <td>$\[12 200.00\]</td> </tr>
  <tr> <td>Policy benefits inflate annually?</td> <td>Yes</td> <td>Yes</td> <td>No</td> <td>No</td> </tr>
  <tr> <td>Maximum Lifetime Guaranty Association Coverage</td> <td>$\[13 290,000\]</td> <td>$\[14 290,000\]</td> <td>$\[15 290,000\]</td> <td>$\[16 20,000\]</td> </tr>
  <tr> <td>Policy Benefits Above Guaranty Association Coverage</td> <td colspan="2">Partial amount may be available up to policy maximum limits, subject to court ruling.</td> <td>No</td> <td>No</td> </tr>
  <tr> <td colspan="2"><strong>Check ONE Box if you want Option 1, 2 or 3 to apply</strong></td> <td>[ ]</td> <td>[ ]</td> <td>[ ]</td> <td> </td> </tr>
</table>
```

</details>

## The case that catches people out

A parent phrase can be wrapped *and* be a tier. "(Paid as of 12-31-2020)" is broken across lines
**and** spans its sub-columns — so "it wrapped" never settles the question on its own. The span
does: a phrase that covers more than one leaf column MUST be kept as a tier with its exact colspan,
however many lines it takes. A phrase that covers one column is joined into that column's label.

### ❌ **Counter-sample** — `3t`

![[zoo-3t.png]]

`POOLED RETURN (%)` wraps across stacked lines in a narrow column and is one header — the contrast
against a real tier. The coloured title band spans the whole block, and the bold `1997-2017` row
closes it.

<details>
<summary>Expected Markdown · table 1 of 3</summary>

```markdown
<table>
  <tr> <th colspan="12">TIMBER IMPACT INVESTING FUNDS</th> </tr>
  <tr> <th>VINTAGE YEAR</th> <th>POOLED RETURN (%)</th> <th>ARITHMETIC MEAN (%)</th> <th>MEDIAN (%)</th> <th>EQUAL-WEIGHTED POOLED RETURN (%)</th> <th>UPPER QUARTILE (%)</th> <th>LOWER QUARTILE (%)</th> <th>STANDARD DEVIATION (%)</th> <th>DPI</th> <th>RVPI</th> <th>TVPI</th> <th>NUMBER OF FUNDS</th> </tr>
  <tr> <td>1997-2001</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>2</td> </tr>
  <tr> <td>2002-2004</td> <td>3.11</td> <td>3.58</td> <td>—</td> <td>3.55</td> <td>—</td> <td>—</td> <td>—</td> <td>0.94</td> <td>0.45</td> <td>1.39</td> <td>4</td> </tr>
  <tr> <td>2005-2007</td> <td>4.05</td> <td>5.44</td> <td>5.56</td> <td>5.36</td> <td>—</td> <td>—</td> <td>—</td> <td>0.86</td> <td>0.60</td> <td>1.46</td> <td>6</td> </tr>
  <tr> <td>2008-2010</td> <td>4.38</td> <td>4.51</td> <td>4.66</td> <td>4.03</td> <td>—</td> <td>—</td> <td>—</td> <td>0.30</td> <td>0.98</td> <td>1.28</td> <td>5</td> </tr>
  <tr> <td>2011-2013</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>1</td> </tr>
  <tr> <td>2014-2017</td> <td>6.06</td> <td>7.55</td> <td>—</td> <td>5.83</td> <td>—</td> <td>—</td> <td>—</td> <td>0.14</td> <td>1.00</td> <td>1.14</td> <td>3</td> </tr>
  <tr> <th data-level="0"><strong>1997-2017</strong></th> <td><strong>4.06</strong></td> <td><strong>5.50</strong></td> <td><strong>4.94</strong></td> <td><strong>5.09</strong></td> <td><strong>7.04</strong></td> <td><strong>4.46</strong></td> <td><strong>3.75</strong></td> <td><strong>0.76</strong></td> <td><strong>0.64</strong></td> <td><strong>1.40</strong></td> <td><strong>21</strong></td> </tr>
</table>
```

</details>

## A label broken inside a word

A space join assumes the break falls between words. When a narrow column breaks **inside** a word
— `Distributio` / `n`, `Appointe` / `d` — the fragments MUST be joined with nothing:
`Distribution`, `Appointed`. A wrap with a printed hyphen inside a word (`per-` / `form-` / `ance`)
is joined the same way, dropping the hyphens. A hyphen that belongs to the word, as in a compound,
stays — see [[Line-End Hyphenation]]. Only a break between words gets a space.

### ✅ **Sample** — a header wrapped mid-word

![[bag-liquidation-analysis.png]]

Under each scenario the first sub-column is headed `Distributio` over `n`; the tier above it
(`Liquidation - Low`, `Liquidation - High`, `Recovery Per Plan`) has a rule beneath and spans the
sub-columns, so the tier test still holds. The `$` printed in its own track joins its value.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th> </th> <th colspan="2">Liquidation - Low</th> <th colspan="2">Liquidation - High</th> <th colspan="2">Recovery Per Plan</th> </tr>
  <tr> <th> </th> <th>$ in Millions</th> <th>Distribution</th> <th>Recovery Claim %</th> <th>Distribution</th> <th>Recovery Claim %</th> <th>Distribution</th> <th>Recovery Claim %</th> </tr>
  <tr> <td><strong>Notes</strong></td> <td><strong>Distributable Proceeds</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>1.i</td> <td>Gross Sale Price</td> <td>$9.2</td> <td> </td> <td>$9.2</td> <td> </td> <td>$9.2</td> <td> </td> </tr>
  <tr> <td>1.ii</td> <td>DIP Loan Repayment</td> <td>(1.4)</td> <td> </td> <td>(1.4)</td> <td> </td> <td>(1.4)</td> <td> </td> </tr>
  <tr> <td>1.iii</td> <td>Selling Costs &amp; Sale Prorations</td> <td>(0.3)</td> <td> </td> <td>(0.3)</td> <td> </td> <td>(0.3)</td> <td> </td> </tr>
  <!-- … -->
  <tr> <td> </td> <th data-level="0"><strong>Total Distributable Proceeds</strong></th> <td><strong>$7.6</strong></td> <td> </td> <td><strong>$7.6</strong></td> <td> </td> <td><strong>$8.7</strong></td> <td> </td> </tr>
  <tr> <td><strong>Notes</strong></td> <td><strong>Winddown/Administrative Distributions</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>2.i</td> <td>Property Funding</td> <td>$0.0</td> <td>$0.0 <em>100.0%</em></td> <td>$0.0</td> <td>$0.0 <em>100.0%</em></td> <td>$0.0</td> <td>$0.0 <em>100.0%</em></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — a wrap with printed hyphens

![[bag-bank-trading-table.png]]

`Trading` / `per-` / `form-` / `ance` wraps over four lines with the hyphens printed. Joining with a
space would give `per- form- ance`; the page means `performance`. See [[Line-End Hyphenation]].

<details>
<summary>Expected Markdown · the table</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3">2025</th> <th colspan="3">2024</th> </tr>
  <tr> <th>in € m.</th> <th>Trading revenues reported</th> <th>Net trading related interest<sup>1</sup></th> <th>Trading performance</th> <th>Trading revenues reported</th> <th>Net trading related interest<sup>1</sup></th> <th>Trading performance</th> </tr>
  <tr> <td>Interest and credit trading</td> <td>1,412</td> <td>1,486</td> <td>2,898</td> <td>1,977</td> <td>1,240</td> <td>3,217</td> </tr>
  <tr> <td>Equity trading</td> <td>58</td> <td>392</td> <td>450</td> <td>1,486</td> <td>402</td> <td>1,888</td> </tr>
  <tr> <td>Foreign exchange, metal, commodity trading</td> <td>1,180</td> <td>4</td> <td>1,184</td> <td>1,301</td> <td>(5)</td> <td>1,296</td> </tr>
  <tr> <td>Other trading<sup>2</sup></td> <td>1,290</td> <td>(214)</td> <td>1,076</td> <td>720</td> <td>(392)</td> <td>328</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>3,940</strong></td> <td><strong>1,668</strong></td> <td><strong>5,608</strong></td> <td><strong>5,484</strong></td> <td><strong>1,245</strong></td> <td><strong>6,729</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — a wrap that breaks inside a word, twice

![[bag-appointed-header-wrap.png]]

`Appointe` / `d` / `business` over the first column of each year group, and `Non-` /
`appointed` / `business` beside it. One wrap breaks a word with no hyphen and joins to `Appointed`;
the other breaks at the hyphen of the compound `Non-appointed`, which is kept. The `£'m` line is a
units row, and the empty gutter between the year groups is not a column.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="3">2002</th> <th colspan="3">2001</th> </tr>
  <tr> <th> </th> <th>Appointed business</th> <th>Non-appointed business</th> <th>Aggregated basis</th> <th>Appointed business</th> <th>Non-appointed business</th> <th>Aggregated basis</th> </tr>
  <tr> <th> </th> <th>£'m</th> <th>£'m</th> <th>£'m</th> <th>£'m</th> <th>£'m</th> <th>£'m</th> </tr>
  <tr> <td>Profit on ordinary activities before tax</td> <td>91.2</td> <td>9.1</td> <td>100.3</td> <td>93.5</td> <td>7.6</td> <td>101.1</td> </tr>
  <tr> <td>Profit on ordinary activities multiplied by standard rate of UK corporation tax (30%)</td> <td>27.4</td> <td>2.7</td> <td>30.1</td> <td>28.1</td> <td>2.3</td> <td>30.4</td> </tr>
  <tr> <td><strong>Effects of:</strong></td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>
  <tr> <td>Expenses not deductible for tax purposes</td> <td>1.6</td> <td>0.1</td> <td>1.7</td> <td>1.9</td> <td>0.1</td> <td>2.0</td> </tr>
  <!-- … -->
  <tr> <td>Current tax charge</td> <td>3.1</td> <td>2.2</td> <td>5.3</td> <td>9.4</td> <td>3.6</td> <td>13.0</td> </tr>
</table>
```

</details>

<!-- skill:generate
- When a column header prints over several stacked lines in one column with no rule between them, join the lines into one header cell with single spaces, e.g. <th>1 YEAR TO LESS THAN 2 YEARS</th>; never make extra header rows from the lines.
- A header line with a rule under it that spans two or more complete sub-labels is a real tier: give it its own header row with the exact colspan.
- If a narrow column breaks a word with no hyphen (Distributio / n) or at a line-end hyphen inside a word (per- / form- / ance), join the pieces into the word (Distribution, performance); keep the hyphen of a real compound (Non-appointed).
-->

<!-- skill:check
- FAIL (MUST) if one printed header label over a single column is split into two or more header rows.
- FAIL (MUST) if a header phrase that spans two or more sub-columns with a rule beneath it is merged into the sub-column labels instead of kept as its own row with a colspan.
- FAIL (MUST) if a word broken by a narrow header column is left broken in the Markdown (Distributio n, per- form- ance).
- WARN (SHOULD) if a header label that reads as one phrase keeps its wrapped lines as <br/> instead of joining them with spaces.
-->

## Related

- [[Multi-Row Header Tiers]] — how real tiers are encoded once recognised
- [[Units Row]] — a units line under a header is a different case
- [[Barely-Existing Columns and Headers]] — header rows that must not be dropped
- [[Line-End Hyphenation]] — which printed hyphens survive a join
