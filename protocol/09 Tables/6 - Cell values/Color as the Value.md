---
title: Color as the Value
rule_id: tables-color-as-the-value
status: rule
scope: page
tags: [tables, color, marks]
---

# Color as the Value

> [!success] ✅ Normative
> A cell whose only content is a coloured fill MUST be rendered as an **empty `<mark>` carrying the
> colour**: `<td><mark style="background-color: red"></mark></td>`. The colour MUST be the nearest
> HTML colour name, never the meaning a legend assigns it, and the cell MUST NOT be left blank.

Risk matrices and heatmap tables put the meaning in the fill. The cell has no text at all:

```text
| Likelihood ╲ Impact | Low | High |
| Rare                | 🟩  | 🟨   |   ← the fill IS the value
| Likely              | 🟨  | 🟥   |
```

Read straight through, the body of that table is blank, and a blank body makes the whole grid
meaningless.

## The rendering

```html
<tr>
  <td>Rare</td>
  <td><mark style="background-color: green"></mark></td>
  <td><mark style="background-color: yellow"></mark></td>
</tr>
```

- The `<mark>` MUST be **empty**: the cell prints no text, and adding some would be inventing
  content.
- The colour rides on the `style` attribute — the same mechanism as highlighted text in
  [[Highlighted Text]] and [[Text Formatting Conventions]]. One vocabulary covers both: the nearest
  HTML colour name in `style="background-color: …"`.
- The colour MUST NOT be written as the cell's text. A cell reading `green` is indistinguishable
  from a cell whose printed content is the *word* "green" — and heatmap legends do sometimes spell
  their colours out. Text is what the page printed; the attribute is how the cell was filled.

The rendering degrades correctly. A consumer that ignores attributes sees an empty cell, which is
truthful — the page printed no text there. A consumer that reads them gets the value. Neither is
misled.

## Why not the meaning

Writing "Low risk" instead of "green" means reading a legend, and the legend is routinely elsewhere
on the page or on another page entirely. A rendering that depends on material outside the region
would be a guess whenever that material is out of reach. The colour name needs no legend, stays
faithful to the page, and leaves the interpretation to whoever reads the table.

## Colour that is not the value

The two cases MUST be kept apart:

| The cell prints | Rendering |
| --- | --- |
| **A fill and text** | The text is the value; the fill is decoration or revision tracking. The text is transcribed and the fill is not carried. |
| **A fill and nothing else** | The case of this rule: an empty `<mark>` with the fill's colour. |

### ❌ **Counter-sample** — `yellow`

![[zoo-yellow.png]]

Cells carry a yellow fill **and** printed numbers — decoration layered over real content, not a
colour-only cell, so only the text is rendered. The lettered rows are indented under their numbered
parents, while *dividends* under *(5) Preferred stock* is printed flush left; *Sum of line (1) thru
(9)* is the total row, indented under *(10) Total*; each column heading is one wrapped label.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th></th> <th>Invested Assets [1]</th> <th>Currently Available Yield * [2]</th> <th>Return On Invested Assets [3]=[1]*[2]</th> <th>Federal Income Tax Rate [4]</th> <th>Federal Income Taxes [5]=[3]*[4]</th> </tr>
  <tr> <td colspan="6" data-level="0">(1) US government bonds</td> </tr>
  <tr> <td data-level="1">(A) Short</td> <td>34,614,395</td> <td>0.13%</td> <td>44,999</td> <td>35.00%</td> <td>15,750</td> </tr>
  <tr> <td data-level="1">(B) Intermediate</td> <td>46,147,279</td> <td>3.46%</td> <td>1,596,696</td> <td>35.00%</td> <td>558,844</td> </tr>
  <tr> <td data-level="1">(C) Long</td> <td>37,128,723</td> <td>4.32%</td> <td>1,603,961</td> <td>35.00%</td> <td>561,386</td> </tr>
  <tr> <td colspan="6" data-level="0">(2) Other taxable bonds</td> </tr>
  <tr> <td data-level="1">(A) Short</td> <td>65,861,105</td> <td>0.25%</td> <td>164,653</td> <td>35.00%</td> <td>57,628</td> </tr>
  <tr> <td data-level="1">(B) Intermediate</td> <td>118,468,566</td> <td>4.55%</td> <td>5,390,320</td> <td>35.00%</td> <td>1,886,612</td> </tr>
  <tr> <td data-level="1">(C) Long</td> <td>21,774,518</td> <td>5.41%</td> <td>1,178,001</td> <td>35.00%</td> <td>412,300</td> </tr>
  <tr> <td colspan="6" data-level="0">(3) Tax exempt bonds</td> </tr>
  <tr> <td data-level="1">(A) Short</td> <td>9,759,108</td> <td>0.16%</td> <td>15,615</td> <td>5.25%</td> <td>820</td> </tr>
  <tr> <td data-level="1">(B) Intermediate</td> <td>71,432,518</td> <td>3.37%</td> <td>2,407,276</td> <td>5.25%</td> <td>126,382</td> </tr>
  <tr> <td data-level="1">(C) Long</td> <td>3,445,465</td> <td>5.12%</td> <td>176,408</td> <td>5.25%</td> <td>9,261</td> </tr>
  <tr> <td data-level="0">(4) Common Stock</td> <td>22,262,218</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">(A) Dividends</td> <td></td> <td>4.63%</td> <td>1,029,850</td> <td>14.18%</td> <td>145,981</td> </tr>
  <tr> <td data-level="1">(B) Capital gains</td> <td></td> <td>0.00%</td> <td>0</td> <td>34.10%</td> <td>0</td> </tr>
  <tr> <td data-level="0">(5) Preferred stock</td> <td>2,547,457</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="0">dividends</td> <td></td> <td>5.75%</td> <td>146,479</td> <td>14.18%</td> <td>20,763</td> </tr>
  <tr> <td data-level="0">(6) Mortgage loans</td> <td>0</td> <td>5.41%</td> <td>0</td> <td>35.00%</td> <td>0</td> </tr>
  <tr> <td data-level="0">(7) Real estate</td> <td>0</td> <td>4.18%</td> <td>0</td> <td>35.00%</td> <td>0</td> </tr>
  <tr> <td data-level="0">(8) Cash**</td> <td>2,525,006</td> <td>0.13%</td> <td>3,283</td> <td>35.00%</td> <td>1,149</td> </tr>
  <tr> <td data-level="0">(9) Other***</td> <td>69,732,137</td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">(A) Dividends</td> <td></td> <td>0.43%</td> <td>299,848</td> <td>14.18%</td> <td>42,503</td> </tr>
  <tr> <td data-level="1">(B) Capital gains</td> <td></td> <td>0.00%</td> <td>0</td> <td>34.10%</td> <td>0</td> </tr>
  <tr> <td colspan="6" data-level="0">(10) Total</td> </tr>
  <tr> <th data-level="1">Sum of line (1) thru (9)</th> <td>505,698,493</td> <td></td> <td>14,057,387</td> <td></td> <td>3,839,380</td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `3lineperrowhili`

![[zoo-3lineperrowhili.png]]

Every body cell is filled green as revision tracking, yet each still prints its own text: colour as
*annotation*, not as value, so only the text is rendered. The body text is bold in every cell,
territory codes included, and is marked so; the column headings share one weight.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th rowspan="2">Territory</th> <th colspan="6">HO 00 01</th> <th colspan="6">HO 00 02</th> </tr>
  <tr> <th>Fire</th> <th>Wind</th> <th>Water</th> <th>Theft</th> <th>Other</th> <th>Liability</th> <th>Fire</th> <th>Wind</th> <th>Water</th> <th>Theft</th> <th>Other</th> <th>Liability</th> </tr>
  <tr> <td><strong>07001</strong></td> <td><strong>254.48</strong></td> <td><strong>105.55</strong></td> <td><strong>91.56</strong></td> <td><strong>14.05</strong></td> <td><strong>25.99</strong></td> <td><strong>58.63</strong></td> <td><strong>220.12</strong></td> <td><strong>91.3</strong></td> <td><strong>79.22</strong></td> <td><strong>12.14</strong></td> <td><strong>22.46</strong></td> <td><strong>50.72</strong></td> </tr>
  <tr> <td><strong>07002</strong></td> <td><strong>319.25</strong></td> <td><strong>155.12</strong></td> <td><strong>106.57</strong></td> <td><strong>15.15</strong></td> <td><strong>32.21</strong></td> <td><strong>79.9</strong></td> <td><strong>275.52</strong></td> <td><strong>133.86</strong></td> <td><strong>91.97</strong></td> <td><strong>13.06</strong></td> <td><strong>27.8</strong></td> <td><strong>68.95</strong></td> </tr>
  <tr> <td><strong>07003</strong></td> <td><strong>190.22</strong></td> <td><strong>85.37</strong></td> <td><strong>75.01</strong></td> <td><strong>14.32</strong></td> <td><strong>25.62</strong></td> <td><strong>40.97</strong></td> <td><strong>164.3</strong></td> <td><strong>73.75</strong></td> <td><strong>64.79</strong></td> <td><strong>12.37</strong></td> <td><strong>22.13</strong></td> <td><strong>35.39</strong></td> </tr>
  <tr> <td><strong>07004</strong></td> <td><strong>195.73</strong></td> <td><strong>87.86</strong></td> <td><strong>77.19</strong></td> <td><strong>14.73</strong></td> <td><strong>26.36</strong></td> <td><strong>42.17</strong></td> <td><strong>169.18</strong></td> <td><strong>75.93</strong></td> <td><strong>66.72</strong></td> <td><strong>12.73</strong></td> <td><strong>22.79</strong></td> <td><strong>36.45</strong></td> </tr>
  <tr> <td><strong>07005</strong></td> <td><strong>136.14</strong></td> <td><strong>54.68</strong></td> <td><strong>53.57</strong></td> <td><strong>6</strong></td> <td><strong>15.64</strong></td> <td><strong>33.1</strong></td> <td><strong>117.68</strong></td> <td><strong>47.27</strong></td> <td><strong>46.31</strong></td> <td><strong>5.17</strong></td> <td><strong>13.55</strong></td> <td><strong>28.62</strong></td> </tr>
  <tr> <td><strong>07006</strong></td> <td><strong>181.74</strong></td> <td><strong>81.58</strong></td> <td><strong>71.67</strong></td> <td><strong>13.69</strong></td> <td><strong>24.49</strong></td> <td><strong>39.14</strong></td> <td><strong>157.01</strong></td> <td><strong>70.48</strong></td> <td><strong>61.93</strong></td> <td><strong>11.83</strong></td> <td><strong>21.16</strong></td> <td><strong>33.84</strong></td> </tr>
  <!-- … -->
</table>
```

</details>

## Shading that means "not applicable"

A grey fill over cells the page does not compute MUST be rendered the same way: an empty `<mark>`
per shaded cell with the nearest colour name, e.g.
`<td><mark style="background-color: gray"></mark></td>`. The fill is what the page printed there,
and a consumer ignoring attributes still sees an empty cell. The shaded region MUST NOT be rendered
as a `colspan` or `rowspan`: the page prints the cells separately.

### ✅ **Sample** — shading that means "not applicable"

![[bag-liquidation-analysis.png]]

The *Recovery Claim %* column is filled grey for the whole *Distributable Proceeds* block and for
the *Intercompany* creditor row, in all three scenarios: one empty `<mark>` in each, `darkgray`
being the nearest colour name to the fill. The `$` typeset in its own track joins its value; each
wrapped heading, `Distributio` over `n` included, is one label.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th></th> <th></th> <th colspan="2">Liquidation - Low</th> <th colspan="2">Liquidation - High</th> <th colspan="2">Recovery Per Plan</th> </tr>
  <tr> <th></th> <th>$ in Millions</th> <th>Distribution</th> <th>Recovery Claim %</th> <th>Distribution</th> <th>Recovery Claim %</th> <th>Distribution</th> <th>Recovery Claim %</th> </tr>
  <tr> <td><strong>Notes</strong></td> <td data-level="0"><strong>Distributable Proceeds</strong></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>1.i</td> <td data-level="0">Gross Sale Price</td> <td>$9.2</td> <td><mark style="background-color: darkgray"></mark></td> <td>$9.2</td> <td><mark style="background-color: darkgray"></mark></td> <td>$9.2</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.ii</td> <td data-level="0">DIP Loan Repayment</td> <td>(1.4)</td> <td><mark style="background-color: darkgray"></mark></td> <td>(1.4)</td> <td><mark style="background-color: darkgray"></mark></td> <td>(1.4)</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.iii</td> <td data-level="0">Selling Costs &amp; Sale Prorations</td> <td>(0.3)</td> <td><mark style="background-color: darkgray"></mark></td> <td>(0.3)</td> <td><mark style="background-color: darkgray"></mark></td> <td>(0.3)</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.iv</td> <td data-level="0">PropCo Cash on Hand</td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.v</td> <td data-level="0">HoldCo Cash on Hand</td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.vi</td> <td data-level="0">Working Fund Insurance Proceeds</td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.vii</td> <td data-level="0">Lakeside Plaza Austin Sale Proceeds</td> <td>0.1</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.1</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.1</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.viii</td> <td data-level="0">Ashford Woodbridge &amp; Kestrel Houston Sale Proceeds</td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.ix</td> <td data-level="0">Property Sale True Ups</td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.x</td> <td data-level="0">Harbor Queen PPP Loan Litigation Proceeds</td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td>1.xi</td> <td data-level="0">Intercompany</td> <td>-</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>1.0</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td></td> <th data-level="0"><strong>Total Distributable Proceeds</strong></th> <td><strong>$7.6</strong></td> <td><mark style="background-color: darkgray"></mark></td> <td><strong>$7.6</strong></td> <td><mark style="background-color: darkgray"></mark></td> <td><strong>$8.7</strong></td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <!-- … -->
  <tr> <td>3.iii</td> <td data-level="0">Trade &amp; Other PropCo Claims</td> <td>0.0</td> <td>2.4 <em>1.6%</em></td> <td>0.0</td> <td>2.4 <em>1.8%</em></td> <td>1.3</td> <td>2.4 <em>55.7%</em></td> </tr>
  <tr> <td>3.vi</td> <td data-level="0">Intercompany</td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> <td>0.0</td> <td><mark style="background-color: darkgray"></mark></td> </tr>
  <tr> <td></td> <th data-level="0"><strong>Total Creditor Distributions</strong></th> <td><strong>$6.5</strong></td> <td><strong>$9.4 <em>69.6%</em></strong></td> <td><strong>$6.6</strong></td> <td><strong>$9.4 <em>70.4%</em></strong></td> <td><strong>$7.8</strong></td> <td><strong>$9.4 <em>82.7%</em></strong></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — shaded cells in a segment table

![[bag-shaded-no-volume.png]]

Under *Volume*, three *Convenient Foods* cells and three *Beverages* cells are filled grey with no
text where a segment has no volume measure: one empty `<mark>` each, `silver` being the nearest
colour name. The *Revenue* and *Volume* groups share one row stub across a blank gap, so they are
one table. The group titles printed above the frame are elided here, as are the second table and
the `EPS` row beneath it.

<details>
<summary>Expected Markdown · excerpt, first table</summary>

```markdown
<!-- … -->
<table>
  <tr> <th></th> <th colspan="3">Percentage Point Impact</th> <th></th> <th colspan="2">% Change</th> </tr>
  <tr> <th></th> <th>GAAP Reported % Change</th> <th>Foreign Exchange Translation</th> <th>Acquisitions and Divestitures</th> <th>Organic % Change</th> <th>Convenient Foods</th> <th>Beverages</th> </tr>
  <tr> <td data-level="0">NAF</td> <td>—</td> <td>—</td> <td>—</td> <td>(0.5)</td> <td>1</td> <td><mark style="background-color: silver"></mark></td> </tr>
  <tr> <td data-level="0">NAB</td> <td>8</td> <td>—</td> <td>(6)</td> <td>1</td> <td><mark style="background-color: silver"></mark></td> <td>(3)</td> </tr>
  <tr> <td data-level="0">Intl Franchise</td> <td>10</td> <td>(3)</td> <td>—</td> <td>8</td> <td><mark style="background-color: silver"></mark></td> <td>3</td> </tr>
  <tr> <td data-level="0">EMEA</td> <td>13</td> <td>(6)</td> <td>—</td> <td>6</td> <td><mark style="background-color: silver"></mark></td> <td>1</td> </tr>
  <tr> <td data-level="0">LatAm Foods</td> <td>16</td> <td>(12)</td> <td>—</td> <td>4</td> <td>(1)</td> <td><mark style="background-color: silver"></mark></td> </tr>
  <tr> <td data-level="0">Asia Pacific Foods</td> <td>12</td> <td>(3)</td> <td>—</td> <td>8</td> <td>10</td> <td><mark style="background-color: silver"></mark></td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>7</strong></td> <td><strong>(3)</strong></td> <td><strong>(2)</strong></td> <td><strong>2.5</strong></td> <td><strong>3</strong></td> <td><strong>1</strong></td> </tr>
</table>
<!-- … -->
```

</details>

<!-- skill:generate
- When a table cell has a coloured fill and no text at all (heatmap, risk matrix, grey "not applicable" shading), write an empty mark carrying the colour: <td><mark style="background-color: red"></mark></td>.
- Use the nearest HTML colour name (red, green, yellow, gray, darkgray, silver…); never write the colour or the legend's meaning as text, and never leave such a cell blank.
- Never merge a shaded region into a colspan or rowspan; one empty mark per shaded cell.
- When a filled cell also prints text, transcribe the text only; the fill is not carried.
-->

<!-- skill:check
- FAIL (MUST) if a cell whose only content on the page is a coloured fill is rendered empty or with text instead of an empty <mark style="background-color: …">.
- FAIL (MUST) if such a cell's colour is written as a legend meaning ("High risk") or as cell text.
- FAIL (MUST) if a shaded region is rendered as one cell with colspan or rowspan where the page prints separate cells.
- WARN (SHOULD) if the colour name in the mark is not the nearest HTML colour name to the printed fill.
-->

## Related

- [[Text Colors]] — coloured text, as opposed to a coloured fill with no text
- [[Highlighted Text]] — the same `background-color` vocabulary for highlighted runs
- [[Marks and Symbols in Cells]] — printed marks (ticks, dots, icons) that stand in for a value
- [[Iconography and Symbols]] — icons outside tables
- [[Rotated and Diagonal Content]] — the diagonal corner cell of the risk-matrix sketch
