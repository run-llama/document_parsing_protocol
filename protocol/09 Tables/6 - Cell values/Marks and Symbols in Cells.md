---
title: Marks and Symbols in Cells
rule_id: tables-marks-and-symbols-in-cells
status: rule
scope: page
tags: [tables, marks, encoding]
---

# Marks and Symbols in Cells

> [!success] ✅ Normative
> A footnote marker MUST stay in the cell of the value it is attached to. An em-dash alone in a
> cell is a value and MUST be kept; a cell printed blank MUST stay blank. A cell whose content is a
> symbol or icon MUST be rendered as a bracketed transcription of what the mark asserts, and MUST
> NOT be replaced by an emoji.

![[marks-in-cells.png]]

A sun/water requirements table where the **icons are the values** — a full sun versus a partial sun,
one droplet versus two. A rendering that leaves those cells empty says nothing at all.

```text
| Subscribers¹ | 48,210³ |   ← superscripts attached to a value
| Dividend     | —       |   ← an em-dash standing alone in a cell
| Approved     | ✓       |   ← a checkmark standing in for a value
```

## Footnote superscripts

- A footnote marker MUST stay in the same cell as the value it is attached to, rendered with
  `<sup>`: `48,210<sup>3</sup>`, `New Program<sup>2</sup>` — see [[Superscript and Subscript]].
- The marker MUST NOT be stripped, and MUST NOT be given a column of its own. It points at one
  number; separated from that number it points at nothing.

## The em-dash

- An em-dash alone in a cell is a value and MUST be rendered as `—`. In accounting it means *zero,
  and we checked* — a different claim from an empty cell, which means *nothing here*.
- The rule holds in both directions, and the second is the one most often broken: a cell printed
  blank MUST be rendered as an empty cell, and a dash MUST NOT be supplied for it, however many of
  its neighbours carry one (**never invent**).

The same reasoning makes the structural blank meaningful in [[Triangles and Matrix Tables]] and the
coloured fill meaningful in [[Color as the Value]] — a non-value that is a value.

### ✅ **Sample** — `single`

![[zoo-single.png]]

Em-dashes stand in for the not-yet-available 15-year figures of two private indexes, alongside `¹`
footnote markers on the index names. The dashes are values; the markers stay on the names.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>Index</th> <th>1-Quarter</th> <th>YTD</th> <th>1-Year</th> <th>3-Year</th> <th>5-Year</th> <th>10-Year</th> <th>15-Year</th> </tr>
  <tr> <td><strong>Tarnwick Capital Partners LLC Timber Impact Investing Index<sup>1</sup></strong></td> <td><strong>0.29</strong></td> <td><strong>1.12</strong></td> <td><strong>-0.89</strong></td> <td><strong>1.21</strong></td> <td><strong>2.66</strong></td> <td><strong>3.28</strong></td> <td><strong>3.82</strong></td> </tr>
  <tr> <td><strong>Tarnwick Capital Partners LLC Real Estate Impact Investing Index<sup>1</sup></strong></td> <td><strong>0.66</strong></td> <td><strong>0.44</strong></td> <td><strong>1.14</strong></td> <td><strong>1.13</strong></td> <td><strong>-0.87</strong></td> <td><strong>1.43</strong></td> <td><strong>—</strong></td> </tr>
  <tr> <td><strong>Tarnwick Capital Partners LLC Infrastructure Impact Investing Index<sup>1</sup></strong></td> <td><strong>-0.23</strong></td> <td><strong>-0.41</strong></td> <td><strong>-0.65</strong></td> <td><strong>2.64</strong></td> <td><strong>1.63</strong></td> <td><strong>2.32</strong></td> <td><strong>—</strong></td> </tr>
  <tr> <td>Merevald Global Natural Resources Index</td> <td>1.09</td> <td>13.44</td> <td>-4.63</td> <td>10.72</td> <td>0.13</td> <td>2.92</td> <td>6.18</td> </tr>
  <tr> <td>Vantage World Natural Resources Index (net)</td> <td>-0.71</td> <td>14.09</td> <td>-8.57</td> <td>5.21</td> <td>-4.27</td> <td>2.84</td> <td>4.87</td> </tr>
  <tr> <td>Vantage US Natural Resources Index (net)</td> <td>-2.88</td> <td>12.69</td> <td>-14.14</td> <td>-0.39</td> <td>-6.53</td> <td>3.72</td> <td>5.25</td> </tr>
  <!-- … -->
</table>
```

</details>

### ❌ **Counter-sample** — `entwick`

![[zoo-entwick.png]]

On the *Rückkauf eigener Anteile* row the page prints nothing in *Eigene Anteile* — only the
*Gesamtkapital* column carries a value, `0`. A rendering that writes an em-dash into the blank cell
invents a value: the em-dash rule cuts both ways.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Grundkapital</th> <th>Kapital-<br/>rücklagen</th> <th>Gewinn-<br/>rücklagen</th> <th>Sonstige<br/>Rücklagen</th> <th>Eigene Anteile</th> <th>Gesellschafter<br/>VAG</th> <th>Minderheiten-<br/>anteile</th> <th>Gesamtkapital</th> </tr>
  <tr> <td>1. Jänner 2005</td> <td>218.100</td> <td>1.074.778</td> <td>2.816.854</td> <td>172.965</td> <td>-14.761</td> <td>4.267.936</td> <td>1.493.854</td> <td>5.761.790</td> </tr>
  <tr> <td>Unrealisierte Gewinne/Verluste (-)<br/>aus der Bewertung von Wertpapieren:</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Saldo Gewinn/Verlust (-) der Periode<br/>vor Ertragssteuern</td> <td></td> <td></td> <td></td> <td>200.291</td> <td></td> <td>200.291</td> <td></td> <td>200.291</td> </tr>
  <tr> <td>Ertragssteuern</td> <td></td> <td></td> <td></td> <td>-50.009</td> <td></td> <td>-50.009</td> <td></td> <td>-50.009</td> </tr>
  <tr> <td>Realisierte, im JÜ ausgewiesene<br/>Gewinne (-)/Verluste vor Ertragssteuern</td> <td></td> <td></td> <td></td> <td>-77</td> <td></td> <td>-77</td> <td></td> <td>-77</td> </tr>
  <tr> <td>Ertragssteuern</td> <td></td> <td></td> <td></td> <td>19</td> <td></td> <td>19</td> <td></td> <td>19</td> </tr>
  <tr> <td>Rückkauf eigener Anteile</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>0</td> </tr>
  <!-- … -->
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <!-- … -->
  <tr> <td>Rückkauf eigener Anteile</td> <td></td> <td></td> <td></td> <td></td> <td>—</td> <td></td> <td></td> <td>0</td> </tr>
  <!-- … -->
</table>
```

</details>

## Checkmarks, crosses and icons

- A mark that stands in for a value MUST be rendered as a bracketed word stating what it asserts:
  `[yes]`, `[no]`, `[checked]`, `[locked]`, `[icon: present]`.
- The nearest emoji MUST NOT be substituted. An emoji looks faithful and is not: it carries a shape
  rather than the claim the page makes, and no two producers pick the same one.
- Where a symbol is glued to a value rather than standing in for one — `▲ 512.40`, a bare `+` or `-`
  carrying a superscript — the glyph MUST stay with the value in the cell, as printed. See
  [[Iconography and Symbols]] for marks outside tables.

```text
| Feature | Basic | Pro |
| SSO     | 🔒    | ✓   |   → | SSO | [locked] | [yes] |
```

### A repeated mark is a scale

Some columns grade a value by printing the mark more than once — one droplet for low water, two for
high; one star, three stars.

- A repeated mark MUST be transcribed **once per printed mark**: `[water]`, `[water][water]`. The
  count is the value; collapsing the pair to one token loses the distinction the column exists to
  draw.
- A count notation such as `[water:2]` MUST NOT be used.
- The vocabulary MUST distinguish every distinct mark the scale prints. A sun column printing a
  solid, a half-filled and an outline glyph is a **three**-step scale; a rendering with two names
  for it has lost a step.

### ✅ **Sample** — `wqa`

![[zoo-wqa.png]]

`X` is a disclosure-control placeholder standing in for a suppressed value; the note below the
table says so. It is printed text and is kept as `X`. The row labels and the *Total* row are bold.

<details>
<summary>Expected Markdown · excerpt, the table and its note</summary>

```markdown
<table>
  <tr> <th> </th> <th>LESS THAN 1 YEAR</th> <th>1 YEAR TO LESS THAN 2 YEARS</th> <th>2 YEARS TO LESS THAN 3 YEARS</th> <th>3 YEARS TO LESS THAN 4 YEARS</th> <th>4 YEARS TO LESS THAN 5 YEARS</th> <th>5 YEARS OR MORE</th> <th>TOTAL</th> </tr>
  <tr> <td data-level="0"><strong>Nov-25</strong></td> <td>1,430</td> <td>685</td> <td>310</td> <td>140</td> <td>X</td> <td>X</td> <td>2,569</td> </tr>
  <tr> <td data-level="0"><strong>Dec-25</strong></td> <td>1,390</td> <td>660</td> <td>295</td> <td>130</td> <td>X</td> <td>X</td> <td>2,478</td> </tr>
  <tr> <td data-level="0"><strong>Jan-26</strong></td> <td>1,570</td> <td>705</td> <td>320</td> <td>150</td> <td>X</td> <td>X</td> <td>2,750</td> </tr>
  <tr> <th data-level="0"><strong>Total</strong></th> <td><strong>4,390</strong></td> <td><strong>2,050</strong></td> <td><strong>925</strong></td> <td><strong>420</strong></td> <td><strong>8</strong></td> <td><strong>X</strong></td> <td><strong>7,797</strong></td> </tr>
</table>

X denotes a value below 5 but not zero, suppressed to prevent identification of individuals.
```

</details>

### ✅ **Sample** — `ed`

![[zoo-ed.png]]

Checkmark glyphs in *Independent* and *Financial Expert (1)* assert a yes; they are rendered as
`[yes]`, and an unmarked cell stays empty.

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

### ✅ **Sample** — `du`

![[zoo-du.png]]

`▲ 512.40` — an up-triangle glued to the value, kept with it in the cell. The *대비* and *대비율(%)*
figures are set heavier than the rest of the row, so those cells are bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>지 수</th> <th>현재가</th> <th>대비</th> <th>대비율(%)</th> <th>날짜</th> </tr>
  <tr> <td>Global Industrial Average</td> <td>25,332.18</td> <td><strong>▲ 512.40</strong></td> <td><strong>+2.06%</strong></td> <td>06/04</td> </tr>
  <tr> <td>Merevald Tech Composite</td> <td>7,527.12</td> <td><strong>▲ 194.10</strong></td> <td><strong>+2.65%</strong></td> <td>06/04</td> </tr>
  <tr> <td>Broad Market 500 Index</td> <td>2,803.27</td> <td><strong>▲ 58.82</strong></td> <td><strong>+2.14%</strong></td> <td>06/04</td> </tr>
  <tr> <td>U.S. 10 year Index</td> <td>2.13</td> <td><strong>▲ 0.06</strong></td> <td><strong>+2.83%</strong></td> <td>06/04</td> </tr>
  <tr> <td>U.S. 30 year Index</td> <td>2.61</td> <td><strong>▲ 0.08</strong></td> <td><strong>+3.17%</strong></td> <td>06/04</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `lakecruise`

![[zoo-lakecruise.png]]

`↓` stands in the time cells of stops a service does not list a time for, and a row of small `⊛`
glyphs sits under the service numbers. Both are printed characters and are kept as printed; no emoji
replaces them. Station rows set in heavy type are bold; the arrows in them show no extra weight and stay plain.

<details>
<summary>Expected Markdown · table 1 of 2, excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="7">Täglich<br/>Daily</th> <th> </th> </tr>
  <tr> <th>Kurs / Service</th> <th>101/102</th> <th>103/104</th> <th>105/106</th> <th>107/108</th> <th>109/110</th> <th>113/114</th> <th>117/118</th> <th> </th> </tr>
  <tr> <th> </th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th> </th> </tr>
  <tr> <td><strong>Lindenhafen</strong></td> <td><strong>09.20</strong></td> <td><strong>10.20</strong></td> <td><strong>11.20</strong></td> <td><strong>12.20</strong></td> <td><strong>13.20</strong></td> <td><strong>15.20</strong></td> <td><strong>17.20</strong></td> <td><strong>Lindenhafen</strong></td> </tr>
  <tr> <td>Aurenbach</td> <td>09.47</td> <td>↓</td> <td>↓</td> <td>12.47</td> <td>13.47</td> <td>↓</td> <td>↓</td> <td>Aurenbach</td> </tr>
  <tr> <td>Tannwil</td> <td>09.58</td> <td>↓</td> <td>↓</td> <td>12.58</td> <td>13.58</td> <td>↓</td> <td>↓</td> <td>Tannwil</td> </tr>
  <tr> <td><strong>Seewinkel</strong></td> <td>↓</td> <td><strong>10.51</strong></td> <td><strong>11.51</strong></td> <td>↓</td> <td>↓</td> <td><strong>15.51</strong></td> <td><strong>17.51</strong></td> <td><strong>Seewinkel</strong></td> </tr>
  <tr> <td>Rebstein</td> <td>↓</td> <td>10.59</td> <td>11.59</td> <td>↓</td> <td>↓</td> <td>15.59</td> <td>↓</td> <td>Rebstein</td> </tr>
  <tr> <td>Falkenau</td> <td>10.09</td> <td>↓</td> <td>↓</td> <td>13.09</td> <td>14.09</td> <td>↓</td> <td>18.04</td> <td>Falkenau</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `vap`

![[zoo-vap.png]]

A body made entirely of bare `+` / `-` symbols, some carrying `(1)`, `(2)`, `(3)` superscripts. The
marks are printed characters and stay as printed, each superscript in the cell of the mark it is
attached to. The *Precision* band is set in bold italic.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Type of analytical<br/>procedure</th> <th rowspan="2">IDENTIFICATION</th> <th colspan="2">TESTING FOR<br/>IMPURITIES</th> <th rowspan="2">ASSAY<br/><br/>- dissolution<br/>(measurement only)<br/><br/>- content/potency</th> </tr>
  <tr> <th>characteristics</th> <th>quantitat.</th> <th>limit</th> </tr>
  <tr> <td>Accuracy</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
  <tr> <th colspan="5"><em>Precision</em></th> </tr>
  <tr> <td>Repeatability</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
  <tr> <td>Interm.Precision</td> <td>-</td> <td>+ <sup>(1)</sup></td> <td>-</td> <td>+ <sup>(1)</sup></td> </tr>
  <tr> <td>Specificity <sup>(2)</sup></td> <td>+</td> <td>+</td> <td>+</td> <td>+</td> </tr>
  <tr> <td>Detection Limit</td> <td>-</td> <td>- <sup>(3)</sup></td> <td>+</td> <td>-</td> </tr>
  <tr> <td>Quantitation Limit</td> <td>-</td> <td>-</td> <td>+ <sup>(3)</sup></td> <td>-</td> </tr>
  <tr> <td>Linearity</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
  <tr> <td>Range</td> <td>-</td> <td>+</td> <td>-</td> <td>+</td> </tr>
</table>
```

</details>

<!-- skill:generate
- Keep a footnote marker in the same cell as the value it marks, as <sup>: 48,210<sup>3</sup>. Never strip it or give it its own column.
- An em-dash alone in a cell is a value: write —. A cell printed blank stays an empty cell; never fill it with a dash, even if its neighbours have one.
- A checkmark, cross or icon that stands in for a value becomes a bracketed word for what it asserts: [yes], [no], [checked], [locked]. Never use an emoji.
- A mark printed several times as a scale is written once per printed mark: [water][water]; never [water:2]. Give each distinct glyph of a scale its own word.
- A symbol glued to a value (▲ 512.40, + <sup>(1)</sup>) stays with the value in the cell, as printed.
-->

<!-- skill:check
- FAIL (MUST) if a footnote marker printed on a cell value is missing, moved to another cell, or given its own column.
- FAIL (MUST) if an em-dash printed alone in a cell is rendered as an empty cell, or a cell printed blank contains a dash or any other value.
- FAIL (MUST) if a cell contains an emoji where the page prints a checkmark, cross or icon.
- FAIL (MUST) if a checkmark, cross or icon that stands in for a value is missing from its cell.
- FAIL (MUST) if a repeated mark (two droplets, three stars) is rendered with a different number of tokens than printed marks.
-->

## Related

- [[Iconography and Symbols]] — the same marks outside tables
- [[Superscript and Subscript]] — how a footnote marker is tagged
- [[Color as the Value]] — a fill that is a value, like the em-dash
- [[Triangles and Matrix Tables]] — a blank that is meaningful, and must not be filled
- [[Accounting Number Formats]] — dashes and brackets as number notation
