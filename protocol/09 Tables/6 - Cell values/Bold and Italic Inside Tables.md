---
title: Bold and Italic Inside Tables
rule_id: tables-bold-and-italic-inside-tables
status: rule
scope: page
tags: [tables, formatting]
---

# Bold / Italic Inside Tables

> [!success] ✅ Normative
> Inside a table, bold, italic and underline MUST be marked per cell, and only where the printed
> glyphs of that cell are heavier, slanted or underlined. A whole column or a whole header row MUST
> NOT be styled on principle. Inside an HTML table cell, bold MUST be written `<strong>`, italic
> `<em>` and underline `<u>`.

The same holds for strikeout and coloured text: they are properties of the glyphs in one cell, not
of the role that cell plays.

```text
Page bolds one column:        Over-bolded output:
| **Doc** | Status |          | **Doc** | **Status** |
| **A-1** | Filed  |          | **A-1** | **Filed**  |
```

The block on the right is the error this rule exists to prevent: the page bolds a single column,
and every cell came back bold.

## Markup inside a cell

Emphasis inside a table cell is written with HTML elements, not Markdown `**` and `*`. Strikeout inside a cell follows [[Struck and Replaced Values]].

| Printed | Rendering in a cell |
| --- | --- |
| Bold | `<td><strong>Net sales</strong></td>` |
| Italic | `<td><em>P. abyssalis</em></td>` |
| Bold and italic | `<td><em><strong>All other plans</strong></em></td>` |
| Underlined | `<th><u>Rx Claim Information</u></th>` |
| Styling on part of a cell | only that run: `<td><em>ZRK2</em> kinase inhibitor</td>` |

- `**…**` and `*…*` MUST NOT be used inside a table cell.
- The markup MUST cover exactly the styled run. A cell that is bold throughout wraps its whole
  content; a cell with one bold word wraps that word.

## Header rows

A `<th>` cell states the cell's role, not its weight. Where every cell of the header rows is printed
in the same weight, that shared weight SHOULD NOT be repeated as `<strong>` in each header cell —
that styles the header row on principle. A header cell whose glyphs **differ** from the rest
of the header — an italic stub heading, an underlined label, one bold heading among regular ones —
MUST carry that difference.

## Deciding cell by cell

1. The structure — rows, columns, header tiers — is read first, blind to weight and slant.
2. Styling is then taken from the glyphs of each cell, one cell at a time.

Weight differences are often subtle, so a cell is judged against its neighbours rather than on its
own. Where it cannot be told whether a cell is heavier, the cell SHOULD be left unstyled: an
unmarked cell loses a nuance, a wrongly marked one asserts something the page does not say.

### ✅ **Sample** — `70th`

![[zoo-70th.png]]

Only the rate-value cells are bold; the plan-design cells beside them are not. Per cell, as printed
— though the weight difference is subtle on the page, which is part of why producers over-apply
it. The column headings are bold as a whole header, so they carry no `<strong>`; each is one
wrapped label.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th rowspan="2">Monthly Rates For Groups Entering/Renewing</th> <th rowspan="2">Copays Medical/ER/Inpatient/Amb</th> <th rowspan="2">Non Par Deductible</th> <th rowspan="2">Coinsurance</th> <th rowspan="2">Coinsurance Maximum</th> <th rowspan="2">UCR</th> <th rowspan="2">Non Par Annual Maximum</th> <th colspan="2">2 TIER RATES</th> <th colspan="4">4 TIER RATES</th> </tr>
  <tr> <th>Ind</th> <th>Family</th> <th>Ind</th> <th>EC</th> <th>ES</th> <th>ESC</th> </tr>
  <tr> <td>7/1/12 - 9/30/12</td> <td>$30 / $100 / $500 / $250</td> <td>$1,000 / $3,000</td> <td>70% / 30%</td> <td>$3,000 / $9,000</td> <td>70th%ile</td> <td>$1,000,000</td> <td><strong>$755.26</strong></td> <td><strong>$2,190.26</strong></td> <td><strong>$755.26</strong></td> <td><strong>$1,397.23</strong></td> <td><strong>$1,812.64</strong></td> <td><strong>$2,265.77</strong></td> </tr>
  <tr> <td>7/1/12 - 9/30/12</td> <td>$30 / $100 / $500 / $0</td> <td>$2,000 / $6,000</td> <td>70% / 30%</td> <td>$3,000 / $9,000</td> <td>70th%ile</td> <td>$500,000</td> <td><strong>$766.04</strong></td> <td><strong>$2,221.49</strong></td> <td><strong>$766.04</strong></td> <td><strong>$1,417.16</strong></td> <td><strong>$1,838.50</strong></td> <td><strong>$2,298.12</strong></td> </tr>
  <tr> <td>7/1/12 - 9/30/12</td> <td>$30 / $100 / $300 x 5 / $250</td> <td>$2,000 / $6,000</td> <td>70% / 30%</td> <td>$3,000 / $9,000</td> <td>70th%ile</td> <td>$1,000,000</td> <td><strong>$729.06</strong></td> <td><strong>$2,114.36</strong></td> <td><strong>$729.06</strong></td> <td><strong>$1,348.82</strong></td> <td><strong>$1,749.82</strong></td> <td><strong>$2,187.26</strong></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `single`

![[zoo-single.png]]

Only the three *Tarnwick Capital Partners* index rows are bold — per row, not blanket. Their labels
are printed in mixed case and end in a superscript `1`. One label wraps at the column edge and is
joined.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Index</th> <th>1-Quarter</th> <th>YTD</th> <th>1-Year</th> <th>3-Year</th> <th>5-Year</th> <th>10-Year</th> <th>15-Year</th> </tr>
  <tr> <td><strong>Tarnwick Capital Partners LLC Timber Impact Investing Index<sup>1</sup></strong></td> <td><strong>0.29</strong></td> <td><strong>1.12</strong></td> <td><strong>-0.89</strong></td> <td><strong>1.21</strong></td> <td><strong>2.66</strong></td> <td><strong>3.28</strong></td> <td><strong>3.82</strong></td> </tr>
  <tr> <td><strong>Tarnwick Capital Partners LLC Real Estate Impact Investing Index<sup>1</sup></strong></td> <td><strong>0.66</strong></td> <td><strong>0.44</strong></td> <td><strong>1.14</strong></td> <td><strong>1.13</strong></td> <td><strong>-0.87</strong></td> <td><strong>1.43</strong></td> <td><strong>—</strong></td> </tr>
  <tr> <td><strong>Tarnwick Capital Partners LLC Infrastructure Impact Investing Index<sup>1</sup></strong></td> <td><strong>-0.23</strong></td> <td><strong>-0.41</strong></td> <td><strong>-0.65</strong></td> <td><strong>2.64</strong></td> <td><strong>1.63</strong></td> <td><strong>2.32</strong></td> <td><strong>—</strong></td> </tr>
  <tr> <td>Merevald Global Natural Resources Index</td> <td>1.09</td> <td>13.44</td> <td>-4.63</td> <td>10.72</td> <td>0.13</td> <td>2.92</td> <td>6.18</td> </tr>
  <tr> <td>Vantage World Natural Resources Index (net)</td> <td>-0.71</td> <td>14.09</td> <td>-8.57</td> <td>5.21</td> <td>-4.27</td> <td>2.84</td> <td>4.87</td> </tr>
  <tr> <td>Vantage US Natural Resources Index (net)</td> <td>-2.88</td> <td>12.69</td> <td>-14.14</td> <td>-0.39</td> <td>-6.53</td> <td>3.72</td> <td>5.25</td> </tr>
  <tr> <td>Vantage Emerging Markets Natural Resources Index (gross)</td> <td>1.47</td> <td>12.20</td> <td>11.78</td> <td>18.52</td> <td>2.38</td> <td>2.02</td> <td>8.13</td> </tr>
  <tr> <td>Solace® All Equity REIT Index</td> <td>1.79</td> <td>19.27</td> <td>13.01</td> <td>5.92</td> <td>8.88</td> <td>16.03</td> <td>9.41</td> </tr>
  <tr> <td>Solace® Developed Real Estate Index</td> <td>0.20</td> <td>15.09</td> <td>8.64</td> <td>5.45</td> <td>5.79</td> <td>11.45</td> <td>8.00</td> </tr>
  <tr> <td>Constructed Index: Harborline Global Infra/Harborline Infra&amp;Utilities 50/50/Merevald Global Infrastructure</td> <td>5.34</td> <td>20.15</td> <td>12.17</td> <td>8.78</td> <td>5.46</td> <td>9.86</td> <td>9.19</td> </tr>
  <tr> <td>Beacon Global Aggregate Bond Index</td> <td>3.29</td> <td>5.57</td> <td>5.85</td> <td>1.62</td> <td>1.20</td> <td>2.89</td> <td>3.76</td> </tr>
  <tr> <td>Cornerstone Timberland Index</td> <td>1.51</td> <td>3.34</td> <td>6.51</td> <td>6.89</td> <td>8.83</td> <td>9.25</td> <td>8.70</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `spa`

![[zoo-spa.png]]

`ZRK2` and `P. abyssalis (P. abyssalis)` italicised within otherwise plain cells — per run, not per
cell. The phase labels printed in coloured pills are bold; the pill colour repeats what the text
says and is not carried.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Compound Name</th> <th>Mechanism of Action</th> <th>Target Indication</th> <th>Phase of Development</th> <th>Submission Type</th> </tr>
  <tr> <td>ZENTOVI® (larotanib)+<br/>VESTOVI® (kalitrafenib)<sup>1</sup></td> <td><em>ZRK2</em> kinase inhibitor and MEK inhibitor</td> <td><em>ZRK2</em> V600E-mutant Metastatic Non-small Cell<br/>Lung Cancer</td> <td><strong>Approved<br/>(Ongoing Phase 2)</strong></td> <td>Product Enhancement</td> </tr>
  <tr> <td>cerovatug vedotin<br/>(SB-08046)</td> <td>Integrin beta-6-directed antibody-drug conjugate</td> <td>2L+ Metastatic Non-Small Cell Lung Cancer (mNSCLC)<br/>(SB6A LUNG-01) (Biologic)</td> <td><strong>Phase 3</strong></td> <td>New Molecular Entity</td> </tr>
  <tr> <td>belrociclib (SB-07220)</td> <td>CDK4 inhibitor</td> <td>2L HR+/HER2- Metastatic Breast Cancer</td> <td><strong>Phase 3</strong></td> <td>New Molecular Entity</td> </tr>
  <tr> <td>NORFULO™ (velcitinib)</td> <td>JAK3/TEC inhibitor</td> <td>Vitiligo</td> <td><strong>Phase 3</strong></td> <td>Product Enhancement</td> </tr>
  <tr> <td>Marsh Fever Vaccine<sup>2</sup></td> <td>Prophylactic vaccine - protein subunit</td> <td>Marsh Fever (FAST TRACK - U.S)</td> <td><strong>Phase 3</strong></td> <td>New Molecular Entity</td> </tr>
  <tr> <td>SB-07831</td> <td>Prophylactic vaccine – protein subunit</td> <td><em>P. abyssalis (P. abyssalis)</em> – updated formulation</td> <td><strong>Phase 2</strong></td> <td>New Molecular Entity</td> </tr>
  <tr> <td>SB-07872</td> <td>Prophylactic vaccine – polysaccharide conjugate</td> <td>Marsh Pox Infection (FAST TRACK – U.S.)</td> <td><strong>Phase 2</strong></td> <td>New Molecular Entity</td> </tr>
  <tr> <td>orenatrelvir (SB-07817)</td> <td>Oral protease inhibitor<br/>(oral antiviral treatment)</td> <td>Seasonal Flu Infection (FAST TRACK – U.S.)</td> <td><strong>Phase 2</strong></td> <td>New Molecular Entity</td> </tr>
  <tr> <td>danuprogab (SB-06882)</td> <td>Glucagon-like peptide 1 receptor (GLP-1R) agonist</td> <td>Chronic Weight Management</td> <td><strong>Phase 1</strong></td> <td>New Molecular Entity</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `3r`

![[zoo-3r.png]]

One stub cell bold only, the next bold **and** italic — a genuine per-cell style distinction. The
column headings share one weight and carry no `<strong>`.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Plan Design</th> <th>Renewal Dates</th> <th>Estimated Increase Over 2012 Medical Premium (%)</th> <th>Estimated Increase Over 2012 Pharmacy Premium (%)</th> <th>Estimated Increase Over 2012 Total Premium (Medical and Pharmacy) (%)</th> </tr>
  <tr> <td><strong>Liberty Network - $50/$75 Copay Non-gated plan</strong></td> <td>10/1/2013 – 12/31/2013</td> <td>27.1%</td> <td>23.7%</td> <td>26.4%</td> </tr>
  <tr> <td><em><strong>All other plans</strong></em></td> <td>10/1/2013 – 12/31/2013</td> <td>23.7%</td> <td>23.7%</td> <td>23.7%</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `e1`

![[zoo-e1.png]]

Two independent sources of weight in one table: the shaded 2005 columns are bold in every row, and
five whole rows (*Net sales*, both *excluding items affecting comparability* rows, *Income for the
period*, *Value creation*) are bold across every cell. Each cell is marked from its own glyphs. The
stub heading is italic as well as bold, so it alone among the headings carries `<em>`.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th><em>Amounts in SEKm, unless otherwise stated</em></th> <th>Second quarter 2005</th> <th>Second quarter 2004<sup>1)</sup></th> <th>Change, %</th> <th>First half 2005</th> <th>First half 2004<sup>1)</sup></th> <th>Change, %</th> </tr>
  <tr> <td><strong>Net sales</strong></td> <td><strong>33,969</strong></td> <td><strong>31,950</strong></td> <td><strong>6.3</strong></td> <td><strong>63,709</strong></td> <td><strong>62,443</strong></td> <td><strong>2.0</strong></td> </tr>
  <tr> <td>Operating income<sup>2)</sup></td> <td><strong>1,890</strong></td> <td>1,782</td> <td>6.1</td> <td><strong>3,198</strong></td> <td>2,544</td> <td>25.7</td> </tr>
  <tr> <td><strong>Operating income, excluding items affecting<br/>comparability</strong></td> <td><strong>1,890</strong></td> <td><strong>2,188</strong></td> <td><strong>-13.6</strong></td> <td><strong>3,198</strong></td> <td><strong>3,929</strong></td> <td><strong>-18.6</strong></td> </tr>
  <tr> <td>Margin, %</td> <td><strong>5.6</strong></td> <td>6.8</td> <td></td> <td><strong>5.0</strong></td> <td>6.3</td> <td></td> </tr>
  <tr> <td>Income after financial items</td> <td><strong>1,695</strong></td> <td>1,738</td> <td>-2.5</td> <td><strong>2,906</strong></td> <td>2,422</td> <td>20.0</td> </tr>
  <tr> <td><strong>Income after financial items, excluding items<br/>affecting comparability</strong></td> <td><strong>1,695</strong></td> <td><strong>2,144</strong></td> <td><strong>-20.9</strong></td> <td><strong>2,906</strong></td> <td><strong>3,807</strong></td> <td><strong>-23.7</strong></td> </tr>
  <tr> <td>Margin, %</td> <td><strong>5.0</strong></td> <td>6.7</td> <td></td> <td><strong>4.6</strong></td> <td>6.1</td> <td></td> </tr>
  <tr> <td><strong>Income for the period</strong></td> <td><strong>1,196</strong></td> <td><strong>1,240</strong></td> <td><strong>-3.5</strong></td> <td><strong>2,050</strong></td> <td><strong>1,809</strong></td> <td><strong>13.3</strong></td> </tr>
  <tr> <td>Earnings per share, SEK<sup>3)</sup></td> <td><strong>4.11</strong></td> <td>4.06</td> <td>1.2</td> <td><strong>7.04</strong></td> <td>5.92</td> <td>18.9</td> </tr>
  <tr> <td><strong>Value creation</strong></td> <td><strong>833</strong></td> <td><strong>1,196</strong></td> <td><strong>-363</strong></td> <td><strong>1,221</strong></td> <td><strong>2,006</strong></td> <td><strong>-785</strong></td> </tr>
  <tr> <td>Return on equity, %</td> <td><strong>16.6</strong></td> <td>14.0</td> <td></td> <td><strong>16.6</strong></td> <td>21.0</td> <td></td> </tr>
</table>
```

</details>

## The same error, seen from both ends

Over-styling comes from reasoning about the category — "this is a header, headers are bold" —
instead of from the glyphs. The mirror image is in [[Barely-Existing Columns and Headers]]: a band
that is not bold gets missed because a header is expected to be bold.

Both are prevented by the same discipline: **detect structure blind to styling, and take styling
from the glyphs.**

<!-- skill:generate
- Inside HTML table cells write bold as <strong>, italic as <em>, bold italic as <em><strong>…</strong></em>, underline as <u>; never ** or * inside a cell.
- Decide styling cell by cell from the printed glyphs: wrap only the cells (or the runs inside a cell) that are visibly heavier, slanted or underlined. Never bold a whole column or row because some of it is bold.
- Do not add <strong> to header cells for the weight the whole header row shares; mark a header cell only where it differs from the other headings (e.g. an italic stub heading gets <em>).
- If you cannot tell whether a cell is heavier than its neighbours, leave it unstyled.
-->

<!-- skill:check
- FAIL (MUST) if a table cell uses ** or * for emphasis instead of <strong> / <em>.
- FAIL (MUST) if a cell is marked bold, italic or underlined while its glyphs on the page image are not, or a visibly bold, italic or underlined cell is left unmarked.
- FAIL (MUST) if emphasis is applied to a whole column or row where the page styles only some of its cells.
- WARN (SHOULD) if every header cell of a uniformly weighted header row is wrapped in <strong>.
-->

## Related

- [[Bold and Italics]] — the same rule outside tables, in Markdown syntax
- [[Barely-Existing Columns and Headers]] — the mirror error: structure missed because it is not bold
- [[Struck and Replaced Values]] — strikeout is also a per-glyph property
- [[Total and Subtotal Rows]] — bold total rows are styled from their glyphs, cell by cell
- [[Highlighted Text]] — highlighting inside tables follows the same per-cell discipline
