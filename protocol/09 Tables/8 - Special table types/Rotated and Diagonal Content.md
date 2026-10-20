---
title: Rotated and Diagonal Content
rule_id: tables-rotated-and-diagonal-content
status: rule
scope: page
tags: [tables, orientation, headers]
---

# Rotated & Diagonal Content

> [!success] ✅ Normative
> A rotated table MUST be read in **its own orientation**, never in page orientation. A diagonally
> split corner cell MUST stay **one cell** holding both labels separated by a slash —
> `Region \ Year` — the label across the top first.

![[diagonal-corner-cell.png]]

One printed cell carrying two labels: **MONTH** across the top, **COUNTRY** down the side, split by a
diagonal rule. There is only one cell to put them in.

## A landscape table on a portrait page

- A table printed sideways MUST be rendered as a reader would read it after turning the page: rows
  are rows as the table reads, not as the page is filed.
- Sideways text MUST NOT be transcribed in page order.

## Vertical column headers

Labels printed at 90° over narrow columns are ordinary headers. Each MUST be rendered as normal
header text, upright, in the column it heads.

```text
| ⤴A⤴ | ⤴B⤴ | ⤴C⤴ |   ← headers printed vertically
| 1   | 2   | 3   |
```

Nothing about the rotation changes the structure — it is a typesetting choice made because the
column is narrow.

## The diagonally split corner cell

```text
| Region ╲ Year | 2023 | 2024 |   ← one printed cell, two labels
| East          | 40   | 44   |
```

- Both labels MUST survive: one names the stub column, the other names the header row, and losing
  either leaves an axis unnamed.
- There is one printed cell, so it MUST stay one cell, the two labels separated by a slash —
  `Region \ Year` — in the reading order the diagonal implies: the label across the top first, then
  the one down the side.
- The corner MUST NOT be split into two header cells.

### ✅ **Sample** — a landscape page in a portrait document

![[corpus-rotated-page.png]]

A paper page rendered sideways: the body text, both tables and the *Table 3* caption read
bottom-to-top. Upright, the two tables are ordinary tables; nothing about them is special except
that a reader has to turn the page. The page is cut off after the *Kestrel 33B* row of the second
table, so nothing below it is rendered.

What makes this the useful case is that **the rotation is not marked anywhere**. There is no
landscape flag; the only signal is that the text runs the wrong way. A rendering in page orientation
transposes headers and rows and still looks structurally plausible.

Note also the blank corner cells above both stub columns, and the en-dashes standing in for missing
benchmark scores — see [[Barely-Existing Columns and Headers]] and [[Marks and Symbols in Cells]].

<details>
<summary>Expected Markdown · both tables</summary>

```markdown
<table>
  <tr> <th> </th> <th>BoolQ</th> <th>PIQA</th> <th>SIQA</th> <th>HellaSwag</th> <th>WinoGrande</th> <th>ARC-e</th> <th>ARC-c</th> <th>OBQA</th> </tr>
  <tr> <td>Orbis-3 175B</td> <td>60.5</td> <td>81.0</td> <td>–</td> <td>78.9</td> <td>70.2</td> <td>68.8</td> <td>51.4</td> <td>57.6</td> </tr>
  <tr> <td>Fenwick 280B</td> <td>79.3</td> <td>81.8</td> <td>50.6</td> <td>79.2</td> <td>70.1</td> <td>–</td> <td>–</td> <td>–</td> </tr>
  <tr> <td>Halcyon 70B</td> <td>83.7</td> <td>81.8</td> <td>51.3</td> <td>80.8</td> <td>74.9</td> <td>–</td> <td>52.5</td> <td>50.4</td> </tr>
  <tr> <td>Aurora 62B</td> <td>84.8</td> <td>80.5</td> <td>–</td> <td>79.7</td> <td>77.0</td> <td>75.2</td> <td>–</td> <td>–</td> </tr>
  <tr> <td>Aurora-cont 62B</td> <td>83.9</td> <td>81.4</td> <td>–</td> <td>80.6</td> <td>77.0</td> <td>–</td> <td>–</td> <td>–</td> </tr>
  <tr> <td>Aurora 540B</td> <td>88.0</td> <td>82.3</td> <td>–</td> <td>83.4</td> <td>81.1</td> <td>76.6</td> <td>53.0</td> <td>53.4</td> </tr>
  <tr> <td>Kestrel 7B</td> <td>76.5</td> <td>79.8</td> <td>48.9</td> <td>76.1</td> <td>70.1</td> <td>72.8</td> <td>47.6</td> <td>57.2</td> </tr>
  <tr> <td>Kestrel 13B</td> <td>78.1</td> <td>80.1</td> <td>50.4</td> <td>79.2</td> <td>73.0</td> <td>74.8</td> <td>52.7</td> <td>56.4</td> </tr>
  <tr> <td>Kestrel 33B</td> <td>83.1</td> <td>82.3</td> <td>50.4</td> <td>82.8</td> <td>76.0</td> <td>80.0</td> <td>57.8</td> <td>58.6</td> </tr>
  <tr> <td>Kestrel 65B</td> <td>85.3</td> <td>82.8</td> <td>52.3</td> <td>84.2</td> <td>77.0</td> <td>78.9</td> <td>56.0</td> <td>60.2</td> </tr>
  <caption><strong>Table 3.</strong> Zero-shot performance on Common Sense Reasoning tasks.</caption>
</table>

<table>
  <tr> <th> </th> <th>0-shot</th> <th>1-shot</th> <th>5-shot</th> <th>64-shot</th> </tr>
  <tr> <td>Orbis-3 175B</td> <td>14.6</td> <td>23.0</td> <td>–</td> <td>29.9</td> </tr>
  <tr> <td>Fenwick 280B</td> <td>10.1</td> <td>–</td> <td>24.5</td> <td>28.2</td> </tr>
  <tr> <td>Halcyon 70B</td> <td>16.6</td> <td>–</td> <td>31.5</td> <td>35.5</td> </tr>
  <tr> <td>Aurora 62B</td> <td>18.1</td> <td>26.5</td> <td>–</td> <td>27.6</td> </tr>
  <tr> <td>Aurora 540B</td> <td>21.2</td> <td>29.3</td> <td>–</td> <td>39.6</td> </tr>
  <tr> <td>Kestrel 33B</td> <td>24.9</td> <td>28.3</td> <td>32.9</td> <td>36.0</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a vertical stub header

![[corpus-vertical-stub.png]]

The leftmost column carries a label running **bottom-to-top** along the side of the table, spanning
every body row, while all the other headers sit horizontally. It labels the whole stub, which is
why the typesetter turned it — there was no width for it any other way. The coloured shapes in the
second column have no legend on the page, so each is described as drawn.

**The rotation is a layout constraint, not a property of the header**: the label is rendered upright
as a normal header cell spanning the rows it spans. The table's bilingual text and its landscape
setting change nothing either.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th> </th> <th>SITE<br/><em>Iddoo</em></th> <th>GAUGE HEIGHT<br/><em>cfs = fiitii kiyuubii sekondii keessatti</em></th> <th>PHASE 1 – NO FLOODING<br/><em>MARSAA 1 – LOLAAN HIN JIRU.</em></th> <th>PHASE 2 – MINOR FLOODING<br/><em>MARSAA 2 – LOLAA XIQQAA.</em></th> </tr>
  <tr> <th rowspan="5">FLOOD DAMAGE WATCH AND WARNING MIDHAAWWAN LOLA ILAALUU FI AKEEKKACHIISA</th> <td>[icon: blue circle]</td> <td>NORTH FORK ALDERBROOK RIVER<br/><em>Yaa'aan gara maqaalaa Alderbrook</em></td> <td>20,400 cfs<br/><em>Guraandhala. 2020</em></td> <td>6,000 cfs – Hojjattoonni Cedarholt County of eegannoo irratti argamu.</td> <td>10,000 cfs – Rakkoolleen galoo qarqara lagaa fi kusiin loola mudachuu mala.</td> </tr>
  <tr> <td>[icon: orange square]</td> <td>CEDARHOLT TOLT<br/><em>Dhiheenya Magaalaa Cedarholt kan yaa'uu</em></td> <td>13,800 cfs<br/><em>Amajjii. 2009</em></td> <td>2,500 cfs – Hojjattoonni Cedarholt County of eegannoo irratti argamu.</td> <td>17,400 cfs – Hidha qarqara kibbaa kan jidduRiqiicha, Snoqualmie Valley Trail fi Riqiicha Highway 203 bishaaniin liqimfamuu mudachu dandaa'a.</td> </tr>
  <tr> <td>[icon: green triangle]</td> <td>ISSAQUAH-STYLE CREEK<br/><em>Dheeriina Hobart, Guyyaa: Magaalaa Cedarholt</em></td> <td>9.53 ft<br/><em>Sadaasa. 1990</em></td> <td>6.5 ft – Hojjattoonni Cedarholt County of eegannoo irratti argamu. Issaquah Public Works fi Deetaroffiin ol eegannoo eegaleera.</td> <td>7.5 ft – Naannoolee yeroo hunda holaan mudatu lolaa eegu. Kutaan bishaanii daandiirratti cufamu karaawwan muraasa.</td> </tr>
  <tr> <td>[icon: red circle]</td> <td>CEDARHOLT GREEN<br/><em>kan safaraman yookaan kan maqaalaa</em></td> <td>11,700 cfs*<br/><em>Mudde. 1959 *yeroof turee ilaalamu</em></td> <td>5,000 cfs – Hojjattoonni Cedarholt County of eegannoo irratti argamu.</td> <td>7,000 cfs – Golba yaa'aa gubbaa Magaalaa Auburn keessaatti loola gammoojjii.</td> </tr>
  <tr> <td>[icon: purple square]</td> <td>CEDARHOLT WHITE<br/><em>kan safaraman yaa'aa Cedarholt kan dhiheenya</em></td> <td>11,700 cfs<br/><em>Amajjii. 2009</em></td> <td>4,000 cfs – Hojjattoonni Cedarholt County of eegannoo irratti argamu.</td> <td>5,000 cfs – Lolaan qarqara lagaa kan yaa'aa gubbaa Magaalaa Auburn madda dandaa'a.</td> </tr>
</table>
```

</details>

### ✅ **Sample** — a landscape reference table on a portrait page

![[bag-rotated-chemical-table.png]]

`Table C.1. (Cont.)`: twenty-five chemicals with CAS numbers, formulae and properties, printed
sideways. Upright it is an ordinary eleven-column table (*No.* plus ten property columns); the header
cells carry units and subscripts (`D_a`, `cm² s⁻¹`), the formulae carry subscripts, and one melting
point prints `123.5 decomposes` on two lines. The page number `C-6`, printed beside the title in the
table's own orientation, is rendered first as the page's header band.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
C-6

<table>
  <caption><em><strong>Table C.1. (Cont.)</strong></em></caption>
  <tr> <th>No.</th> <th>Chemical</th> <th>CAS No.</th> <th>Molecular Formula</th> <th>Molecular Weight (g mol<sup>-1</sup>)</th> <th>Melting Point (°C)</th> <th>Boiling Point (°C)</th> <th>Molecular Volume</th> <th>Le Bas Molar Volume (cm<sup>3</sup> mol<sup>-1</sup>)</th> <th>Diffusivity in Air D<sub>a</sub> (cm<sup>2</sup> s<sup>-1</sup>)</th> <th>Diffusivity in Water D<sub>w</sub> x10<sup>5</sup> (cm<sup>2</sup> s<sup>-1</sup>)</th> </tr>
  <tr> <td>101</td> <td>Fluoroethanoic anhydride</td> <td>613-45-1</td> <td>C<sub>8</sub>Cl<sub>15</sub>FO</td> <td>272.82</td> <td>-68.5</td> <td>151.7</td> <td>113.4</td> <td>87.8</td> <td>0.1087</td> <td>0.443</td> </tr>
  <tr> <td>102</td> <td>Chlorexamine</td> <td>399-22-6</td> <td>C<sub>7</sub>H<sub>2</sub>F<sub>6</sub>N</td> <td>301.20</td> <td>47.0</td> <td>317.1</td> <td>248.9</td> <td>166.4</td> <td>0.1276</td> <td>0.83</td> </tr>
  <tr> <td>103</td> <td>Bromopentanol</td> <td>575-47-6</td> <td>C<sub>3</sub>H<sub>5</sub>BrO</td> <td>214.75</td> <td>73.2</td> <td>-10.3</td> <td>98.4</td> <td>105.9</td> <td>0.0472</td> <td>0.626</td> </tr>
  <!-- … -->
  <tr> <td>113</td> <td>Hexafluoro-cresylamine</td> <td>861-49-4</td> <td>CH<sub>3</sub>F</td> <td>48.54</td> <td>123.5<br/>decomposes</td> <td>377.2</td> <td>55.7</td> <td>154.1</td> <td>0.0462</td> <td>1.365</td> </tr>
  <tr> <td>114</td> <td>Isobutyl nitrosourea</td> <td>794-26-3</td> <td>C<sub>5</sub>H<sub>8</sub>ClNO</td> <td>241.12</td> <td>136.2</td> <td>41.0</td> <td>188.3</td> <td>183.6</td> <td>0.1268</td> <td>1.6</td> </tr>
  <!-- … -->
  <tr> <td>125</td> <td>Morpholino thioacetate</td> <td>50-89-2</td> <td>C<sub>4</sub>H<sub>6</sub>O<sub>4</sub></td> <td>164.15</td> <td>41.8</td> <td>194.8</td> <td>310.4</td> <td>85.0</td> <td>0.1045</td> <td>0.634</td> </tr>
</table>
```

</details>

<!-- skill:generate
- If a table (or the whole page) is printed sideways, mentally rotate it and transcribe it in its own reading orientation; never in page order.
- Text printed vertically in a header, including a label running down the side of the stub, is an ordinary header cell: write it upright, with the span it has on the page.
- A corner cell split by a diagonal line into two labels is one cell: write both labels separated by " \ ", the label across the top first (e.g. MONTH \ COUNTRY). Never split it into two cells or drop either label.
-->

<!-- skill:check
- FAIL (MUST) if a rotated table is transcribed in page orientation (headers and rows transposed, or sideways text in page order).
- FAIL (MUST) if a vertically printed header is missing or placed in a different column or row span than printed.
- FAIL (MUST) if a diagonally split corner cell loses one of its two labels or is rendered as two cells.
- FAIL (MUST) if the two labels of a diagonal corner cell are not in top-label-first order.
-->

## Related

- [[Multi-Row Header Tiers]] — the corner cell also appears there as the "$ in millions" note
- [[Barely-Existing Columns and Headers]] — the blank corner cell
- [[Chart With a Printed Data Grid]] — the other transposition problem
