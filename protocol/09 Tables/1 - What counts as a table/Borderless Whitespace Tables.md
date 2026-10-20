---
title: Borderless Whitespace Tables
rule_id: tables-borderless-whitespace-tables
status: rule
scope: page
tags: [tables, detection, ocr, borderless, whitespace]
---

# Borderless Whitespace-Aligned Tables

> [!success] ✅ Normative
> A whitespace-aligned block with columns MUST be rendered as a table. Its column tracks MUST be
> read off the widest row, every value MUST be placed in the track it sits in, and the block MUST
> NOT be rendered as preformatted text.

Typewriter and fixed-width reports where the columns exist **only as alignment** — no column rules,
no fills, no shading. Nothing on the page shows where one column ends and the next begins except
the whitespace.

```text
DURATION    LAPSE     EXPENSE
   1        12.0%       48.00
   2         8.5%       22.50     ← columns are pure whitespace
```

### ✅ **Sample** — `wat`

![[zoo-wat.png]]

A long zip-code territory table with no rules or fills anywhere — columns exist purely as
alignment. The two-line headers are wrapped labels and join into one header cell each.

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

## Reading the tracks

1. The column tracks are taken from the widest, most populated row.
2. Every remaining row is checked: each value MUST start inside one track.
3. Where they all do, the block is a table with those columns.
4. Where a value drifts toward a neighbouring track, or straddles two, it MUST be placed in the
   track its left edge is closest to. The block is still a table.

A printed header line (a row of labels, often underlined) is strong evidence that columns are
intended, and a reason to look harder for consistent tracks. It is not on its own a licence to
create columns that the body rows do not support (**never invent**).

### ✅ **Sample** — `aa`

![[zoo-aa.png]]

A Medicare-supplement premium table with thin rules between the rows but none between the columns:
the columns are held together by underlined headers and whitespace alone.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th><u>Attained Age</u></th> <th><u>Plan C</u></th> <th><u>Plan F</u></th> </tr>
  <tr> <td>65</td> <td>$2,498.60</td> <td>$2,890.99</td> </tr>
  <tr> <td>66</td> <td>2,576.05</td> <td>3,003.68</td> </tr>
  <tr> <td>67</td> <td>2,657.54</td> <td>3,121.39</td> </tr>
  <tr> <td>68</td> <td>2,747.43</td> <td>3,244.45</td> </tr>
  <tr> <td>69</td> <td>2,841.36</td> <td>3,371.54</td> </tr>
  <tr> <td>70</td> <td>2,939.76</td> <td>3,504.30</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `xl`

![[zoo-xl.png]]

Two tax-rate calculation blocks with no rules, embedded in a memo. Each two-line column header is
one wrapped label over one column, so it is one header cell, and the page underlines every header
line and the last figure before each sum.

<details>
<summary>Expected Markdown · table 1 of 2</summary>

```markdown
<table>
  <tr> <th> </th> <th><u>Rate of Return</u></th> <th><u>Federal Income Tax Rate</u></th> </tr>
  <tr> <td>Net Investment Income Earned</td> <td>1.94%</td> <td>20.8%</td> </tr>
  <tr> <td>Net Realized Capital Gains</td> <td><u>0.05%</u></td> <td><u>21.0%</u></td> </tr>
  <tr> <td> </td> <td>1.99%</td> <td>20.9%</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `ppy`

![[zoo-ppy.png]]

Three loss-triangle blocks aligned purely by column position, with underlined headers.

<details>
<summary>Expected Markdown · excerpt, table 1 of 3</summary>

```markdown
<table>
  <caption>All Companies Reporting to the Loss Data Bureau <sup>1</sup></caption>
  <tr> <th><u>Accident Year Ended</u></th> <th><u>15</u></th> <th><u>27</u></th> <th><u>39</u></th> <th><u>51</u></th> <th><u>63</u></th> <th><u>75</u></th> <th><u>87</u></th> <th><u>99</u></th> <th><u>111</u></th> <th><u>123</u></th> </tr>
  <tr> <td>12/31/2003</td> <td>418,550,936</td> <td>418,042,452</td> <td>417,267,765</td> <td>417,492,929</td> <td>417,216,932</td> <td>417,189,136</td> <td>417,146,522</td> <td>417,095,498</td> <td>417,140,320</td> <td>417,120,054</td> </tr>
  <tr> <td>12/31/2004</td> <td>431,833,889</td> <td>427,373,100</td> <td>425,430,426</td> <td>425,032,454</td> <td>424,899,046</td> <td>424,930,538</td> <td>424,893,684</td> <td>424,824,851</td> <td>424,784,418</td> <td>424,738,538</td> </tr>
  <tr> <td>12/31/2005</td> <td>471,370,885</td> <td>466,106,849</td> <td>464,434,610</td> <td>463,396,915</td> <td>463,268,706</td> <td>463,175,541</td> <td>463,165,720</td> <td>463,139,866</td> <td>463,075,855</td> <td>463,014,244</td> </tr>
  <tr> <td>12/31/2006</td> <td>463,200,919</td> <td>457,725,282</td> <td>455,822,189</td> <td>454,841,890</td> <td>455,017,266</td> <td>455,000,340</td> <td>454,915,676</td> <td>454,822,382</td> <td>454,797,996</td> <td> </td> </tr>
  <tr> <td>12/31/2007</td> <td>515,029,169</td> <td>510,374,742</td> <td>508,154,461</td> <td>507,592,525</td> <td>507,251,378</td> <td>507,252,665</td> <td>507,124,706</td> <td>507,069,577</td> <td> </td> <td> </td> </tr>
  <tr> <td>12/31/2008</td> <td>547,084,231</td> <td>543,696,826</td> <td>542,151,638</td> <td>541,255,839</td> <td>540,913,464</td> <td>540,904,143</td> <td>540,713,622</td> <td> </td> <td> </td> <td> </td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `2cc`

![[zoo-2cc.png]]

A fictional automaker's subsidiaries list with a single header underline and nothing else. The
second header is one label wrapped over two lines.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th><u>Company Name</u></th> <th><u>State or Sovereign Power of Incorporation</u></th> </tr>
  <tr> <td>SMF Leasing LLC</td> <td>Delaware</td> </tr>
  <tr> <td>SMF Serviços de Mobilidade Ltda.</td> <td>Brazil</td> </tr>
  <tr> <td>SMF Wholesale Receivables LLC</td> <td>Delaware</td> </tr>
  <tr> <td>Grand Pointe Holdings, Inc.</td> <td>Michigan</td> </tr>
  <tr> <td>Guangxi Haoling Automotive Technology Co., Ltd.</td> <td>China</td> </tr>
  <tr> <td>Kinohi Insurance Company LLC</td> <td>Hawaii</td> </tr>
  <!-- … -->
</table>
```

</details>

## Why the alignment test, and not a guess

Columns guessed wrong produce silently misaligned data — a lapse rate filed under expense. The
alignment test is how the columns are read, not a reason to give up on them: the widest row fixes
the tracks, and every other value is placed by where it starts. A preformatted block would keep the
characters but lose every number to anything that consumes structure, which is the worse loss — so
it is never the conforming output.

A purely visual "it must have printed rules" reading of [[Is This Even a Table]] would exclude this
entire class by construction. It does not: these are tables when the alignment holds.

### ✅ **Sample** — a four-line key-value panel on a slide

![[bag-cashflow-waterfall-kv.png]]

Under the chart, the `Working Capital` panel prints four labels and four amounts on two whitespace
tracks and nothing else. Every row is the same kind of record — a component and its amount — so it
is a table even with no header row and no grid (see [[Is This Even a Table]]). The neighbouring
panels are bullet lists. The panel title sits above the table as text.

<details>
<summary>Expected Markdown · the Working Capital panel</summary>

```markdown
<table>
  <caption><strong>Working Capital</strong></caption>
  <tr> <td>Inventory</td> <td>£12m</td> </tr>
  <tr> <td>Receivables</td> <td>£4m</td> </tr>
  <tr> <td>Payables</td> <td>£(11)m</td> </tr>
  <tr> <td>Deposits</td> <td>£2m</td> </tr>
</table>
```

</details>

### ✅ **Sample** — an exhibit with no rules and empty cells

![[bag-boat-exhibit-c.png]]

Four headers over fourteen rows, every value right-aligned in its track, several cells empty, and
a `Total:` row after a two-line gap. The alignment holds all the way down. The gap is rendered here
by leaving it out, one of the two conforming forms of [[Blank and Spacer Rows]].

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Boat Model</th> <th>Purchase Price</th> <th>Surf Equipment Total</th> <th>Boat Lift Purchase Price</th> </tr>
  <tr> <td>Northline</td> <td>$68,000.00</td> <td>$1,400.00</td> <td>$10,500.00</td> </tr>
  <tr> <td>Carrow</td> <td>$129,900.00</td> <td>$2,410.00</td> <td>$14,780.00</td> </tr>
  <tr> <td>Rivano</td> <td>$110,000.00</td> <td>$2,505.00</td> <td>$9,300.00</td> </tr>
  <tr> <td>Carrow</td> <td>$118,600.00</td> <td>$1,190.00</td> <td>$9,980.00</td> </tr>
  <tr> <td>Other/Unlisted</td> <td>$24,000.00</td> <td>$1,915.00</td> <td> </td> </tr>
  <tr> <td>Northline</td> <td>$114,500.00</td> <td>$1,400.00</td> <td>$11,500.00</td> </tr>
  <tr> <td>Carrow</td> <td>$171,320.00</td> <td> </td> <td>$18,940.00</td> </tr>
  <tr> <td>Rivano</td> <td>$71,200.00</td> <td>$950.00</td> <td>$23,780.00</td> </tr>
  <tr> <td>Carrow</td> <td>$241,905.00</td> <td> </td> <td>$32,880.00</td> </tr>
  <tr> <td>Selkirk</td> <td>$62,000.00</td> <td>$950.00</td> <td>$23,780.00</td> </tr>
  <tr> <td>Bellamar</td> <td>$109,500.00</td> <td> </td> <td>$16,150.00</td> </tr>
  <tr> <td>Carrow</td> <td>$76,500.00</td> <td> </td> <td>$9,500.00</td> </tr>
  <tr> <td>Rivano</td> <td>$85,100.00</td> <td> </td> <td>$7,850.00</td> </tr>
  <tr> <td>Rivano</td> <td>$128,700.00</td> <td>$3,610.00</td> <td> </td> </tr>
  <tr> <td>Total:</td> <td>$1,511,225.00</td> <td>$16,330.00</td> <td>$188,940.00</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a headerless results list with band rows

![[bag-games-results-headerless.png]]

Rank, name, company and points on four whitespace tracks with no header row anywhere; event
names — `Fairmont & Voss  Tennis Singles Men 30-39` — printed flush left between the groups as
bands. The alignment holds for the whole page. Each band is one full-width row, as
[[Bands Inside the Grid]] requires.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <td>3</td> <td>Priya Shah</td> <td>Nordlake Traders</td> <td>6</td> </tr>
  <tr> <td>4</td> <td>Owen Farrelly</td> <td>Vantage Grove Bank</td> <td>5</td> </tr>
  <tr> <td>5</td> <td>Marisol Quinn</td> <td>Solstice Optics</td> <td>4</td> </tr>
  <tr> <td>6</td> <td>Declan Foss</td> <td>Bramwell Group</td> <td>3</td> </tr>
  <tr> <td>7</td> <td>Ingrid Kessler</td> <td>Kestrel Freight</td> <td>2</td> </tr>
  <tr> <td>8</td> <td>Callum Reyes</td> <td>Anchorpoint Bank</td> <td>1</td> </tr>
  <tr> <td colspan="4">Fairmont &amp; Voss Tennis Singles Men 30-39</td> </tr>
  <tr> <td>1</td> <td>Warrick Odell</td> <td>Bellhaven Consulting</td> <td>8</td> </tr>
  <tr> <td>2</td> <td>Silas Byrne</td> <td>Thornfield Provisions</td> <td>7</td> </tr>
  <!-- … -->
</table>
```

</details>

<!-- skill:generate
- Render a block whose columns exist only as whitespace alignment as an HTML <table>, never as preformatted or code text.
- Take the column tracks from the widest, fullest row; put every value in the track where its left edge sits, leaving cells empty where the page prints nothing.
- If a value straddles two tracks, put it in the track its left edge is closest to; the block is still a table.
- Do not create columns the body rows do not support, even under a printed header line.
-->

<!-- skill:check
- FAIL (MUST) if a whitespace-aligned block with columns is rendered as a code block, preformatted text or loose lines instead of a <table>.
- FAIL (MUST) if a value is placed in a column other than the one its left edge sits in on the page.
-->

## Related

- [[Is This Even a Table]] — the relation test this class passes without printed rules
- [[Cell Text Fidelity]] — values placed in their track are still transcribed verbatim
- [[Gutter Columns]] — whitespace gaps that are not columns
- [[Blank and Spacer Rows]] — what to do with the vertical gaps between groups
