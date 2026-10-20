---
title: Barely-Existing Columns and Headers
rule_id: tables-barely-existing-columns-and-headers
status: rule
scope: page
tags: [tables, columns, headers, drops]
---

# Columns / Headers That Barely Exist

> [!success] ✅ Normative
> The output MUST transcribe what is printed and add nothing. A column or a header MUST NOT be dropped
> because it is empty, plainly styled or easy to miss, and a label MUST NOT be invented for a cell
> that has none.

```text
|        | Current | New Program² |
| Rate A | 1.10    |              |    ← all-blank column, proven only by its
| Rate B | 1.25    |              |      header: it exists, keep it
  ↑ blank corner: leave it blank, do not invent "Category"
```

Four situations look like nothing and are routinely lost. All four are the same failure in one of
two directions — a **drop** or an **invention** ([[Never Drop, Never Invent]]).

## An all-blank body column proven only by its header

A column whose body is entirely empty still exists. It MUST be kept as an empty column, and any
marker on its label MUST be kept — a superscript such as `New Program²` is part of the header
text, not decoration.

### ✅ **Sample** — `sln`

![[zoo-sln.png]]

The *Bidder's Response* column is **entirely blank** — proven to exist only by its header. Dropping
it is the classic error. The merged item cells and the two-line specification values are printed
that way.

<details>
<summary>Expected Markdown · the specification table</summary>

```markdown
<table>
  <tr> <th>SL No</th> <th>Name of Item</th> <th colspan="2">Technical Specifications and Standards</th> <th>Bidder's Response</th> </tr>
  <tr> <td>1</td> <td>Brand</td> <td colspan="2">To Be Mentioned By Tenderer</td> <td> </td> </tr>
  <tr> <td>2</td> <td>Model</td> <td colspan="2">To Be Mentioned By Tenderer</td> <td> </td> </tr>
  <tr> <td>3</td> <td>Country of Origin</td> <td colspan="2">USA/UK/EU or Equivalent</td> <td> </td> </tr>
  <tr> <td>4</td> <td>Category</td> <td colspan="2">Cat.6</td> <td> </td> </tr>
  <tr> <td>5</td> <td>Reference standard</td> <td colspan="2">ISO/IEC11801, ANSI/TIA/EIA-568-C.2-D, IEC61156-5<br/>EN50399, RoHS Compliant.</td> <td> </td> </tr>
  <tr> <td rowspan="2">6</td> <td rowspan="2">Conductor</td> <td>Material</td> <td>Solid-Bare Copper</td> <td> </td> </tr>
  <tr> <td>Structure AWG</td> <td>23 AWG</td> <td> </td> </tr>
  <tr> <td rowspan="2">7</td> <td rowspan="2">Insulation</td> <td>Material</td> <td>HDPE</td> <td> </td> </tr>
  <tr> <td>Nominal OD</td> <td>1.0 ± 0.10 mm</td> <td> </td> </tr>
  <tr> <td>8</td> <td>Twist</td> <td colspan="2">Direction: S</td> <td> </td> </tr>
  <tr> <td>9</td> <td>Fillers</td> <td colspan="2">Material: PE</td> <td> </td> </tr>
  <tr> <td rowspan="4">10</td> <td rowspan="4">Jacket</td> <td>Thickness</td> <td>0.60 ± 0.10 mm</td> <td> </td> </tr>
  <tr> <td>Diameter</td> <td>6.30 ± 0.30 mm</td> <td> </td> </tr>
  <tr> <td>Material</td> <td>PVC</td> <td> </td> </tr>
  <tr> <td>Color</td> <td>Orange/Blue/Gray</td> <td> </td> </tr>
  <tr> <td rowspan="2">11</td> <td rowspan="2">Jacket physical properties</td> <td>Before aging</td> <td>Tensile strength ≥ 13.5 Mpa<br/>Elongation ≥ 150%</td> <td> </td> </tr>
  <tr> <td>After aging</td> <td>Tensile strength ≥ 12.5 Mpa<br/>Elongation ≥ 125%</td> <td> </td> </tr>
  <tr> <td>12</td> <td>Cable length</td> <td colspan="2">305m/Box</td> <td> </td> </tr>
</table>
```

</details>

### ✅ **Sample** — `xx`

![[zoo-xx.png]]

Column 3 carries no header text at all, only `XX` filler values: its header cell stays empty and the
column stays.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="32">Data Item for Specified Rating Pool</th> </tr>
  <tr> <th> </th> <th> </th> <th> </th> <th colspan="29">For the rate period included in the immediately prior rate adjustment filing (or initial form &amp; rate filing)</th> </tr>
  <tr> <th>1. Market Segment</th> <th>2. Description of rating pool within the market segment</th> <th> </th> <th>18. Period assumed - beginning date (MM/DD/YY)</th> <th>19. Period assumed - ending date (MM/DD/YY)</th> <th>20. Average annual claim trend assumed</th> <th>21.1 Regulatory authority licenses and fees, including New York State 332 assessment as a % of gross premium</th> <th>21.2 Administrative expenses for activities that improve health care quality as defined in the NAIC Annual Statement Supplement Health Care Exhibit - as a % of gross premium</th> <th>21.3 Commissions and broker fees - as a % of gross premium</th> <th>21.4 Premium Taxes - as a % of gross premium</th> <th>21.5 Other state and federal taxes and assessments (other than income taxes and assessments) - as a % of gross premium</th> <th>21.6 Other administrative expenses - as a % of gross premium</th> <th>21.7 Subtotal columns 21.1 through 21.6</th> <th>22. After tax underwriting margin (profit/contribution to surplus) - as a % of gross premium</th> <th>23. State income tax component - as a % of gross premium</th> <th>23.1 State income tax rate assumed (eg 3%)</th> <th>24. Federal income tax component - as a % of gross premium</th> <th>24.1 Federal income tax rate assumed (eg 30%)</th> <th>25. Reduction for assumed net investment income - as a % of gross premium (enter as a negative value)</th> <th>26. Subtotal lines 21.7 + 22 + 23 + 24 + 25</th> <th>27.1 Regulatory authority licenses and fees, including New York State 332 assessment expenses - $pmpm</th> <th>27.2 Administrative expenses for activities that improve health care quality as defined in the NAIC Annual Statement Supplement Health Care Exhibit - as $pmpm</th> <th>27.3 Commissions and broker fees - as $pmpm</th> <th>27.4 Premium Taxes - as $pmpm</th> <th>27.5 Other state and federal taxes and assessments (other than income taxes and assessments) - as $pmpm</th> <th>27.6 Other administrative expenses - as $pmpm</th> <th>27.7 Subtotal lines 27.1 through 27.6</th> <th>28. After tax underwriting margin (profit/contribution to surplus) - as $pmpm</th> <th>29. State income tax component - as $pmpm</th> <th>30. Federal income tax component - as $pmpm</th> <th>31. Reduction for assumed net investment income - as $pmpm (enter as a negative value)</th> <th>32. Subtotal columns 27.7 through 31</th> </tr>
  <tr> <td>HNY-IND</td> <td>Healthy NY</td> <td>XX</td> <td>1/1/2012</td> <td>12/31/2012</td> <td>15.2%</td> <td>0.80%</td> <td>0.00%</td> <td>1.54%</td> <td>2.71%</td> <td>0.00%</td> <td>6.16%</td> <td>11.21%</td> <td>-1.21%</td> <td>0.00%</td> <td>7.10%</td> <td>0.00%</td> <td>34.00%</td> <td>0.00%</td> <td>10.00%</td> <td>2.40</td> <td>0.00</td> <td>4.62</td> <td>8.14</td> <td>0.00</td> <td>18.46</td> <td>33.62</td> <td>(3.64)</td> <td>0.00</td> <td>0.00</td> <td>0.00</td> <td>29.98</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <tr> <td> </td> <td> </td> <td>XX</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00%</td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> <td> </td> <td> </td> <td> </td> <td> </td> <td>0.00</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `en`

![[zoo-en.png]]

*Total Weightage Assigned* stays blank across five rows, proven only by its header; the page prints
that blank as one merged box, so it is one cell with a `rowspan`. The bold `TOTAL` row closes the
table.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th colspan="2">Division of Syllabus for Term II (October-March)</th> <th>Total Weightage Assigned</th> </tr>
  <tr> <th>Summative Assessment II</th> <th>30%</th> <td> </td> </tr>
  <tr> <th>Section</th> <th>Marks</th> <td rowspan="5"> </td> </tr>
  <tr> <td>Reading</td> <td>20</td> </tr>
  <tr> <td>Writing</td> <td>20</td> </tr>
  <tr> <td>Grammar</td> <td>15</td> </tr>
  <tr> <td>Literature</td> <td>35</td> </tr>
  <tr> <td>Formative Assessment</td> <td> </td> <td>20%</td> </tr>
  <tr> <th data-level="0"><strong>TOTAL</strong></th> <td><strong>90</strong></td> <td><strong>50%</strong></td> </tr>
</table>
```

</details>

## A blank corner cell over the stub

If the corner above the row labels is blank on the page, it MUST be rendered blank. "Category",
"Item" or any other reasonable-sounding word MUST NOT be supplied. An unlabelled cell is data too.

### ✅ **Sample** — `3lineperorw`

![[zoo-3lineperorw.png]]

A blank top-left corner cell, ruled off from the *Territory* label below it.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="6">HO 00 01</th> <th colspan="6">HO 00 02</th> </tr>
  <tr> <th>Territory</th> <th>Fire</th> <th>Wind</th> <th>Water</th> <th>Theft</th> <th>Other</th> <th>Liability</th> <th>Fire</th> <th>Wind</th> <th>Water</th> <th>Theft</th> <th>Other</th> <th>Liability</th> </tr>
  <tr> <td>07922</td> <td>203.40</td> <td>84.40</td> <td>72.39</td> <td>14.65</td> <td>23.71</td> <td>50.03</td> <td>175.76</td> <td>72.93</td> <td>62.55</td> <td>12.64</td> <td>20.51</td> <td>43.22</td> </tr>
  <tr> <td>07924</td> <td>163.85</td> <td>67.96</td> <td>58.97</td> <td>9.06</td> <td>16.74</td> <td>37.73</td> <td>141.69</td> <td>58.77</td> <td>50.99</td> <td>7.81</td> <td>14.47</td> <td>32.65</td> </tr>
  <tr> <td>07926</td> <td>173.44</td> <td>69.66</td> <td>68.24</td> <td>7.64</td> <td>19.92</td> <td>42.17</td> <td>149.94</td> <td>60.22</td> <td>58.99</td> <td>6.58</td> <td>17.24</td> <td>36.45</td> </tr>
  <tr> <td>07927</td> <td>172.16</td> <td>69.17</td> <td>67.75</td> <td>7.59</td> <td>19.80</td> <td>41.85</td> <td>148.68</td> <td>59.71</td> <td>58.50</td> <td>6.53</td> <td>17.09</td> <td>36.14</td> </tr>
  <tr> <td>07928</td> <td>124.38</td> <td>49.96</td> <td>48.92</td> <td>5.47</td> <td>14.28</td> <td>30.25</td> <td>107.49</td> <td>43.18</td> <td>42.29</td> <td>4.74</td> <td>12.35</td> <td>26.11</td> </tr>
  <tr> <td>07930</td> <td>121.09</td> <td>48.64</td> <td>47.64</td> <td>5.34</td> <td>13.93</td> <td>29.42</td> <td>104.20</td> <td>41.86</td> <td>40.99</td> <td>4.59</td> <td>11.97</td> <td>25.33</td> </tr>
  <!-- … -->
</table>
```

</details>

### ❌ **Counter-sample** — `3lineperrowhili`

![[zoo-3lineperrowhili.png]]

The same table revised: no rule divides the corner from the *Territory* label, so the label fills a
genuinely merged two-row cell — the mirror of the blank corner above. The green row fill is
shading and is not rendered.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th rowspan="2">Territory</th> <th colspan="6">HO 00 01</th> <th colspan="6">HO 00 02</th> </tr>
  <tr> <th>Fire</th> <th>Wind</th> <th>Water</th> <th>Theft</th> <th>Other</th> <th>Liability</th> <th>Fire</th> <th>Wind</th> <th>Water</th> <th>Theft</th> <th>Other</th> <th>Liability</th> </tr>
  <tr> <td>07001</td> <td>254.48</td> <td>105.55</td> <td>91.56</td> <td>14.05</td> <td>25.99</td> <td>58.63</td> <td>220.12</td> <td>91.3</td> <td>79.22</td> <td>12.14</td> <td>22.46</td> <td>50.72</td> </tr>
  <tr> <td>07002</td> <td>319.25</td> <td>155.12</td> <td>106.57</td> <td>15.15</td> <td>32.21</td> <td>79.9</td> <td>275.52</td> <td>133.86</td> <td>91.97</td> <td>13.06</td> <td>27.8</td> <td>68.95</td> </tr>
  <!-- … -->
</table>
```

</details>

## A numbered tier `(1) (2) (3)…` across the columns

```text
| State | Premium | Losses |
| (1)   | (2)     | (3)    |   ← a header row: render it
```

A numbered tier running across the columns is a header row, not decoration, and MUST be rendered.

Dropping it costs twice. The tier also runs the full width of the grid, which is the evidence that
every column below belongs to one row — the proof [[Group and Cohort Bands]] and
[[Bands Inside the Grid]] rely on to show that banded blocks are a single table. Without the tier,
both the header *and* the boundary signal are lost.

### ✅ **Sample** — `xlt`

![[zoo-xlt.png]]

A numbered tier `(1)`–`(12)` sitting above the real headers with no group meaning. Under `(5)` and
`(10)` a formula is printed on its own line, so that break is kept.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th> </th> <th>(1)</th> <th>(2)</th> <th>(3)</th> <th>(4)</th> <th>(5)<br/>(4) ÷ (1)</th> <th>(6)</th> <th>(7)</th> <th>(8)</th> <th>(9)</th> <th>(10)<br/>(9) ÷ (8) -1.0</th> <th>(11)</th> <th>(12)</th> </tr>
  <tr> <th>Species</th> <th>Initial Age of Pet</th> <th>Earned Premium</th> <th>Earned Exposures</th> <th>Closed With Payment Claim Count</th> <th>Paid Loss</th> <th>Paid Loss Ratio</th> <th>Credibility</th> <th>Credibility Adjusted Paid Loss Ratio</th> <th>Current Factors</th> <th>Proposed Factors</th> <th>Factor Percent Change</th> <th>Inforce Premium at Current Rate Level</th> <th>Premium Impact</th> </tr>
  <tr> <td>Cat</td> <td>0</td> <td>5,541,666</td> <td>20,315</td> <td>6,558</td> <td>2,530,125</td> <td>0.457</td> <td>100%</td> <td>0.457</td> <td>1.000</td> <td>1.000</td> <td>0.0%</td> <td>537,834</td> <td> </td> </tr>
  <tr> <td>Cat</td> <td>1</td> <td>2,472,798</td> <td>8,086</td> <td>2,747</td> <td>1,153,674</td> <td>0.467</td> <td>90%</td> <td>0.474</td> <td>1.000</td> <td>1.000</td> <td>0.0%</td> <td>217,726</td> <td> </td> </tr>
  <tr> <td>Cat</td> <td>2</td> <td>2,044,181</td> <td>6,450</td> <td>2,948</td> <td>1,096,456</td> <td>0.536</td> <td>81%</td> <td>0.537</td> <td>1.000</td> <td>1.000</td> <td>0.0%</td> <td>162,567</td> <td> </td> </tr>
  <!-- … -->
</table>
```

</details>

## Header bands that are not bold

A band naming a section is a header row even when it is set in plain type. "Lending" over a block
of lending figures, or a `CA|PPO` line above its rates, are headers; demoting them to body rows is
non-conforming.

```text
| Lending    |       |   ← plain-styled band naming a section: still a header
| Commercial | 120.5 |
```

Boldness MUST NOT decide what is a header. Headers are recognised from position, span and what the
line does for the rows beneath it — [[Bold and Italic Inside Tables]] shows styling is applied
unreliably in both directions and cannot carry this judgement.

## Blank space beside or below a header label

```text
| 34 | S |          | [rowspan=3]34     | S |
|    | M |    vs    | ROW_SPAN_CONTINUE | M |
|    | L |          | ROW_SPAN_CONTINUE | L |
```

A region that is visually blank beside or below a labelled cell MUST be rendered as **separate empty
cells**. The label's `rowspan` or `colspan` MUST NOT be extended over it unless the cell is
*genuinely merged* — when the print says so, not when it is inferred.

### Telling a real merge from adjacent blankness

| Genuine merge — **extend** | Adjacent blankness — **separate empty cells** |
| --- | --- |
| No ruling divides the region: it is printed as **one box** | Ruled cell borders continue through the blank region |
| The label is **centred across** the whole span | The label sits in the first cell, blank cells follow |
| A stub label spanning the header tiers (`<th rowspan="2">UW Category</th>`) | A header label that simply has nothing under it |

**The stopped-divider test.** A ruling line that *stops* is as informative as one that continues.
On a bundle-credit rate table the divider beneath `Number of Additional Policies` stops before the
`Factor` column: that stopped rule is positive evidence that the group covers `Car` and `Other`
only, and that `Factor` is a genuinely merged cell spanning both header tiers. What looks like
"blank space above Factor" is in fact inside a visibly merged two-row header cell. Where a divider
stops, the cell beside it spans.

Most blank-adjacency cases have no such geometry. Absent a stopped divider or an equivalent printed
signal, nothing proves a merge — which is why the default is *do not extend*.

**Carve-out.** A stub label that spans the header tiers ([[Multi-Row Header Tiers]]) still takes a
`rowspan` across those header rows. That is a logical merge and this rule does not touch it.

**Why this way.** A span mirrors what is printed, never what is inferred. A blank cell asserts
nothing; a span asserts "this label owns that region", which needs printed evidence. Making merge
the default would teach the reflex *when in doubt, rowspan* — exactly the habit
[[Repeated Identical Values]] exists to suppress. It is also the simpler question: *"is this cell's
printed content empty?"* rather than a semantic judgement, the same test [[Blank and Spacer Rows]]
uses in the table body.

## The through-line

Every case here is a drop or an invention. One principle covers all of them, the one also stated in
[[Repeated Identical Values]]: **never emit less data than went in, and never invent what was not
printed.**

<!-- skill:generate
- Keep every printed column, including one whose body is entirely empty; keep its header text and any superscript marker on it.
- Leave a blank header or corner cell blank; never write a label such as Category or Item into it.
- Keep a numbered header row such as (1) (2) (3) as a header row of the table.
- Treat a plain-type line naming a section of rows as a header or band row; do not decide headerness from boldness.
- Use rowspan/colspan only where the page prints one merged box; next to a label with ruled empty cells beside it, output separate empty cells.
-->

<!-- skill:check
- FAIL (MUST) if a column that has a printed header is missing because its body cells are empty.
- FAIL (MUST) if a header or corner cell that is blank on the page contains text in the Markdown.
- FAIL (MUST) if a printed numbered header row (1) (2) (3)… is missing.
- FAIL (MUST) if a rowspan or colspan covers cells that the page separates with ruled borders.
-->

## Related

- [[Repeated Identical Values]] — the same never-drop, never-invent discipline in the body
- [[Header Body Column Count Mismatch]] — columns that seem to disappear between header and body
- [[Multi-Row Header Tiers]] — the stub rowspan carve-out
- [[Blank and Spacer Rows]] — the empty-content test applied to rows
