---
title: Blank and Spacer Rows
rule_id: tables-blank-and-spacer-rows
status: either
scope: page
tags: [tables, either, rows, disputed]
---

# Blank / Spacer Rows

> [!info] ⚖️ Equivalent forms
> A genuinely printed blank row inside a table MAY be rendered as an empty row or left out; both
> forms conform, and a document MUST use one of them throughout. A blank row that is the only thing
> separating two groups of rows SHOULD be rendered as an empty row.

```text
| ROU assets total   | 10,234 |
|                    |        |   ← printed blank row: on this page it is the
| Lease liabilities: |        |     only section boundary — rendered as an empty row
```

## When the blank row is load-bearing

On a page with no rules, no bands and no repeated headers, the whitespace *is* the structure.
Dropping a blank row there merges two sections the page deliberately kept apart — as in a lease
note where a single blank line is all that separates the right-of-use totals from "Lease
liabilities:".

- A blank row whose removal would change how a reader groups the rows around it SHOULD be rendered
  as a row of empty cells, in its printed position.
- A purely decorative blank line — even spacing between every row, padding at the foot of a block —
  carries no such meaning and MAY be left out.
- An empty row MUST NOT be rendered where the page prints none: the row is kept because it is
  printed, never added to make groups easier to read.

### ✅ **Sample** — `ert`

![[zoo-ert.png]]

A genuinely printed blank row separates the 00xx class codes from the 01xx codes, in every block;
it is kept as a row of empty cells. The four side-by-side `CLASS CODE | ELR | D RATIO` blocks
continue one class-code series, so each block is its own table (see [[Column Continuation]]); the
first is shown.

<details>
<summary>Expected Markdown · table 1 of 4</summary>

```markdown
<table>
  <tr> <th>CLASS CODE</th> <th>ELR</th> <th>D RATIO</th> </tr>
  <tr> <td>0010</td> <td>0.912</td> <td>0.42</td> </tr>
  <tr> <td>0015</td> <td>0.955</td> <td>0.41</td> </tr>
  <tr> <td>0025</td> <td>0.972</td> <td>0.38</td> </tr>
  <tr> <td>0040</td> <td>1.164</td> <td>0.40</td> </tr>
  <tr> <td></td> <td></td> <td></td> </tr>
  <tr> <td>0100</td> <td>0.888</td> <td>0.39</td> </tr>
  <tr> <td>0115</td> <td>1.010</td> <td>0.41</td> </tr>
  <tr> <td>0130</td> <td>0.842</td> <td>0.37</td> </tr>
  <tr> <td>0145</td> <td>1.075</td> <td>0.42</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `lakecruise`

![[zoo-lakecruise.png]]

In the long-cruise timetable, a fully empty row is printed between the outbound run ending at
*Seeblick ○* and the return run starting at *Seeblick*; it is the only boundary between the two
direction segments and is kept. Stop rows printed in heavier type are bold cell by cell. The header
symbol under each service number is `⊛`.

<details>
<summary>Expected Markdown · table 1 of 2, excerpt around the blank row</summary>

```markdown
<table>
  <tr> <th> </th> <th colspan="7">Täglich<br/>Daily</th> <th> </th> </tr>
  <tr> <th>Kurs / Service</th> <th>101/102</th> <th>103/104</th> <th>105/106</th> <th>107/108</th> <th>109/110</th> <th>113/114</th> <th>117/118</th> <th> </th> </tr>
  <tr> <th> </th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th>⊛</th> <th> </th> </tr>
  <tr> <td><strong>Lindenhafen</strong></td> <td><strong>09.20</strong></td> <td><strong>10.20</strong></td> <td><strong>11.20</strong></td> <td><strong>12.20</strong></td> <td><strong>13.20</strong></td> <td><strong>15.20</strong></td> <td><strong>17.20</strong></td> <td><strong>Lindenhafen</strong></td> </tr>
  <tr> <td>Aurenbach</td> <td>09.47</td> <td>↓</td> <td>↓</td> <td>12.47</td> <td>13.47</td> <td>↓</td> <td>↓</td> <td>Aurenbach</td> </tr>
  <!-- … -->
  <tr> <td><strong>Ufeninsel</strong></td> <td><strong>11.19</strong></td> <td><strong>12.19</strong></td> <td><strong>13.19</strong></td> <td><strong>14.19</strong></td> <td><strong>15.19</strong></td> <td><strong>17.19</strong></td> <td><strong>19.29</strong></td> <td><strong>Ufeninsel</strong></td> </tr>
  <tr> <td><strong>Seeblick ○</strong></td> <td><strong>11.30</strong></td> <td><strong>12.30</strong></td> <td><strong>13.30</strong></td> <td><strong>14.30</strong></td> <td><strong>15.30</strong></td> <td><strong>17.30</strong></td> <td><strong>19.40</strong></td> <td><strong>○ Seeblick</strong></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td><strong>Seeblick</strong></td> <td><strong>11.40</strong></td> <td><strong>12.40</strong></td> <td><strong>13.40</strong></td> <td><strong>14.40</strong></td> <td><strong>15.40</strong></td> <td><strong>17.40</strong></td> <td><strong>19.45</strong></td> <td><strong>Seeblick</strong></td> </tr>
  <tr> <td><strong>Ufeninsel</strong></td> <td><strong>11.53</strong></td> <td><strong>12.51</strong></td> <td><strong>13.51</strong></td> <td><strong>14.53</strong></td> <td><strong>15.53</strong></td> <td><strong>17.51</strong></td> <td><strong>19.56</strong></td> <td><strong>Ufeninsel</strong></td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `2012_tushin_nittei`

![[zoo-2012_tushin_nittei.png]]

A thin printed empty row sits between the 12:05–35 block and the 13:00 block, the only thing
separating the morning heats from the afternoon semi-finals; it is kept.

<details>
<summary>Expected Markdown · excerpt around the blank row</summary>

```markdown
<table>
  <tr> <th>時 刻</th> <th>ト ラ ッ ク</th> <th>跳躍（高さ）</th> <th>跳躍（距離）</th> <th>投 擲</th> </tr>
  <tr> <td>９：３０</td> <td>女共４×１００ｍ予５組１着＋３</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>５０</td> <td>男共４×１００ｍ予６組０着＋８</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>１０：２０</td> <td>男 ３０００ｍ 決２組タイムレース</td> <td></td> <td></td> <td>女砲丸投</td> </tr>
  <tr> <td>５５</td> <td>男 ８００ｍ予３組２着＋２</td> <td>女走高跳Ｂ</td> <td></td> <td></td> </tr>
  <tr> <td>１１：１０</td> <td>女 １５００ｍ 決２組タイムレース</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>３５</td> <td>女 １００ｍＨ予４組３着＋４</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>５０</td> <td>男２年 １００ｍ予５組３着＋１</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>１２：０５</td> <td>女２年 １００ｍ予６組２着＋４</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>２０</td> <td>男１年 １００ｍ予６組２着＋４</td> <td></td> <td>男三段跳</td> <td></td> </tr>
  <tr> <td>３５</td> <td>女１年 １００ｍ予５組３着＋１</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>１３：００</td> <td>女 １００ｍＨ準２組４着</td> <td></td> <td></td> <td></td> </tr>
  <!-- … -->
</table>
```

</details>

### ❌ **Counter-sample** — `e22`

![[zoo-e22.png]]

Blank rows are the only separation between the *Experience Period*, *Annual … Trend* and
*Projected* groups; they are kept. A rendering that drops them runs the three groups together; it
still conforms, but draws a warning. The red `($8.75)` already carries its sign in the parentheses, so
the colour is decoration and is not rendered.

<details>
<summary>Expected Markdown · excerpt around the first two blank rows</summary>

```markdown
<table>
  <tr> <th><u>Rx Claim Information</u></th> <th>Generic</th> <th>Brand</th> <th>Specialty</th> <th>Total</th> </tr>
  <tr> <td>Experience Period Scripts / 1000</td> <td>9,882</td> <td>1,094</td> <td>89</td> <td>11,065</td> </tr>
  <!-- … -->
  <tr> <td>Experience Period Paid PMPM</td> <td>$9.36</td> <td>$17.90</td> <td>$29.51</td> <td>$56.77</td> </tr>
  <tr> <td>Experience Period Rx Rebates PMPM</td> <td></td> <td></td> <td></td> <td>($8.75)</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Annual Util Trend</td> <td>1.031</td> <td>1.003</td> <td>1.070</td> <td>1.028</td> </tr>
  <tr> <td>Annual Unit Cost Trend</td> <td>0.986</td> <td>1.138</td> <td>1.077</td> <td>1.088</td> </tr>
  <tr> <td>Annual Allowed Trend</td> <td>1.016</td> <td>1.141</td> <td>1.152</td> <td>1.119</td> </tr>
  <tr> <td>Annual Deductible Trend</td> <td>1.013</td> <td>1.013</td> <td>1.013</td> <td>1.035</td> </tr>
  <tr> <td>Annual Paid Trend</td> <td>1.003</td> <td>1.164</td> <td>1.154</td> <td>1.134</td> </tr>
  <tr> <td>Annual Paid Trend Net of Rebates</td> <td>n/a</td> <td>n/a</td> <td>n/a</td> <td>1.127</td> </tr>
  <tr> <td>Months of Trend</td> <td>24</td> <td>24</td> <td>24</td> <td>24</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Projected Scripts / 1000</td> <td>10,502</td> <td>1,099</td> <td>102</td> <td>11,704</td> </tr>
  <!-- … -->
</table>
```

</details>

### ❌ **Counter-sample** — `3samehead`

![[zoo-3samehead.png]]

Printed blank lines separate the cohort blocks and set off the *Average Issue Age* line. The bold
cohort bands already separate the blocks, so these spacers MAY be dropped; they are kept here. The
rendering below drops them, and it also records `10.9%` for the *2004+* share of premium where the
page prints `32031.9%`, and splits the *Issue Year* band into a label cell and empty cells although
the page prints one full-width band. Each ruled *Total* row is a total, so its label cell is a
`<th>` and the stub carries levels (all `0`: nothing is indented).

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th> </th> <th>Count</th> <th>% of Count</th> <th>Premium</th> <th>% of Premium</th> </tr>
  <tr> <th colspan="5">Issue Year</th> </tr>
  <tr> <td data-level="0">1999</td> <td>80</td> <td>3.5%</td> <td>217,072</td> <td>3.2%</td> </tr>
  <tr> <td data-level="0">2000</td> <td>316</td> <td>13.7%</td> <td>964,763</td> <td>14.2%</td> </tr>
  <tr> <td data-level="0">2001</td> <td>374</td> <td>16.2%</td> <td>1,091,387</td> <td>16.0%</td> </tr>
  <tr> <td data-level="0">2002</td> <td>733</td> <td>31.8%</td> <td>2,110,680</td> <td>31.0%</td> </tr>
  <tr> <td data-level="0">2003</td> <td>570</td> <td>24.7%</td> <td>1,695,230</td> <td>24.9%</td> </tr>
  <tr> <td data-level="0">2004+</td> <td>234</td> <td>10.1%</td> <td>738,975</td> <td>32031.9%</td> </tr>
  <tr> <th data-level="0">Total</th> <td>2,307</td> <td>100.0%</td> <td>6,818,108</td> <td>100.0%</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <th colspan="5">Issue Age</th> </tr>
  <tr> <td data-level="0">&lt;30</td> <td>4</td> <td>0.2%</td> <td>4,451</td> <td>0.1%</td> </tr>
  <!-- … -->
  <tr> <td data-level="0">80+</td> <td>3</td> <td>0.1%</td> <td>8,175</td> <td>0.1%</td> </tr>
  <tr> <th data-level="0">Total</th> <td>2,307</td> <td>100.0%</td> <td>6,818,108</td> <td>100.0%</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="0">Average Issue Age</td> <td>60.6</td> <td></td> <td></td> <td></td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <th colspan="5">Attained Age</th> </tr>
  <!-- … -->
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th> </th> <th>Count</th> <th>% of Count</th> <th>Premium</th> <th>% of Premium</th> </tr>
  <tr> <th>Issue Year</th> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>1999</td> <td>80</td> <td>3.5%</td> <td>217,072</td> <td>3.2%</td> </tr>
  <tr> <td>2000</td> <td>316</td> <td>13.7%</td> <td>964,763</td> <td>14.2%</td> </tr>
  <tr> <td>2001</td> <td>374</td> <td>16.2%</td> <td>1,091,387</td> <td>16.0%</td> </tr>
  <tr> <td>2002</td> <td>733</td> <td>31.8%</td> <td>2,110,680</td> <td>31.0%</td> </tr>
  <tr> <td>2003</td> <td>570</td> <td>24.7%</td> <td>1,695,230</td> <td>24.9%</td> </tr>
  <tr> <td>2004+</td> <td>234</td> <td>10.1%</td> <td>738,975</td> <td>10.9%</td> </tr>
  <!-- … -->
</table>
```

</details>

### ❌ **Counter-sample** — `3cell`

![[zoo-3cell.png]]

Printed gaps sit under the *BUILDINGS / OCCUPIED BY OWNER* band, around the *BUS. PERS. PROP.*
band and between *Group 5* and *Group 6*; the last is the only thing splitting the rate groups in
two, so it is kept, and the others are kept with it. The *BUS. PERS. PROP.* band prints its label
in its own ruled cell with one empty cell across the rest of the row, so it is not a full-width
span. The trailing gap under *Group 10* is padding and is not shown.

<details>
<summary>Expected Markdown · table 1 of 2, excerpt</summary>

```markdown
<table>
  <tr> <th>CLASSIFICATION</th> <th colspan="3">FRAME</th> <th colspan="3">JOISTED MASONRY</th> <th colspan="3">LT. NON-COMBUSTIBLE</th> <th colspan="3">FIRE RESISTIVE</th> <th rowspan="2">500K /<br/>GL LIMIT</th> </tr>
  <tr> <th></th> <th>1-6</th> <th>7-8</th> <th>9-10</th> <th>1-6</th> <th>7-8</th> <th>9-10</th> <th>1-6</th> <th>7-8</th> <th>9-10</th> <th>1-6</th> <th>7-8</th> <th>9-10</th> </tr>
  <tr> <th colspan="14">BUILDINGS<br/><u>OCCUPIED BY OWNER</u></th> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Store Pac</td> <td>13.33</td> <td>16.57</td> <td>19.37</td> <td>9.59</td> <td>11.86</td> <td>13.83</td> <td>7.51</td> <td>9.29</td> <td>10.84</td> <td>4.89</td> <td>5.82</td> <td>6.68</td> <td>N/A</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <th>BUS. PERS. PROP.</th> <th colspan="13"></th> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Rate Group 1</td> <td>35.37</td> <td>37.63</td> <td>39.27</td> <td>33.30</td> <td>35.47</td> <td>36.98</td> <td>32.69</td> <td>34.76</td> <td>36.28</td> <td>29.21</td> <td>31.10</td> <td>32.42</td> <td>.94</td> </tr>
  <tr> <td>Group 2</td> <td>37.91</td> <td>40.33</td> <td>42.09</td> <td>35.73</td> <td>38.00</td> <td>39.65</td> <td>35.03</td> <td>37.28</td> <td>38.90</td> <td>31.31</td> <td>33.29</td> <td>34.74</td> <td>.97</td> </tr>
  <tr> <td>Group 3</td> <td>39.73</td> <td>42.25</td> <td>44.08</td> <td>37.40</td> <td>39.81</td> <td>41.52</td> <td>36.71</td> <td>39.06</td> <td>40.73</td> <td>32.79</td> <td>34.87</td> <td>36.40</td> <td>1.51</td> </tr>
  <tr> <td>Group 4</td> <td>41.22</td> <td>43.84</td> <td>45.74</td> <td>38.81</td> <td>41.28</td> <td>43.10</td> <td>38.06</td> <td>40.50</td> <td>42.25</td> <td>34.03</td> <td>36.18</td> <td>37.75</td> <td>1.62</td> </tr>
  <tr> <td>Group 5</td> <td>41.86</td> <td>44.52</td> <td>46.44</td> <td>39.41</td> <td>41.92</td> <td>43.76</td> <td>38.65</td> <td>41.12</td> <td>42.93</td> <td>34.51</td> <td>36.72</td> <td>38.32</td> <td>1.51</td> </tr>
  <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Group 6</td> <td>43.23</td> <td>45.98</td> <td>47.99</td> <td>40.72</td> <td>43.31</td> <td>45.19</td> <td>39.93</td> <td>42.49</td> <td>44.32</td> <td>35.67</td> <td>37.96</td> <td>39.61</td> <td>1.52</td> </tr>
  <!-- … -->
</table>
```

</details>

## Encoding an empty region

> **The encoding of an empty region is free. Its existence is not.**

- An empty region inside a table body MAY be encoded as individual empty `<td>` cells or as one
  blank cell spanning it (`colspan` / `rowspan`): three leading empty `<td>`s per row and one
  `colspan="3" rowspan="8"` blank block render identically, and both conform. Where the page draws
  no separation inside the empty region, neither encoding is preferred.
- **Carve-out:** in a loss triangle or similar matrix, every empty position MUST be its own empty
  cell, never part of a span — each is a distinct, meaningful absence. See
  [[Triangles and Matrix Tables]].
- **The half that is not free:** the cells and columns MUST exist. A column proven only by its
  header still exists ([[Barely-Existing Columns and Headers]]), and every value in it MUST stay
  reachable. Encoding is a choice; deletion is an error.
- Blank space beside a *header* label is not free: it MUST be rendered as separate empty cells, not
  as an extended span, unless the page prints a genuinely merged cell. See
  [[Barely-Existing Columns and Headers]].

<!-- skill:generate
- When a table prints a fully empty row that is the only thing separating two groups of rows, render it as a row of empty cells (<tr> <td></td> … </tr>) in its printed place.
- Decorative blank lines (even spacing, padding at the foot of a block) may be left out; whichever you do with printed blank rows, do it the same way throughout the document.
- Never add an empty row the page does not print.
- An empty region in a table body may be empty <td> cells or one blank spanning cell; in a loss triangle or matrix use one empty <td></td> per empty position, never a span.
- Beside a header label, use separate empty cells rather than stretching the label's span, unless the page prints one merged cell.
-->

<!-- skill:check
- WARN (SHOULD) if a printed blank row that is the only separation between two groups of table rows is missing from the Markdown.
- WARN (SHOULD) if one document renders printed blank table rows as empty rows in some tables and drops them in others.
- FAIL (MUST) if the Markdown contains an empty table row where the page prints none.
- FAIL (MUST) if a column or cell of a table is missing because it was empty or proven only by its header.
- FAIL (MUST) if a loss triangle or matrix table covers empty positions with a colspan or rowspan instead of individual empty cells.
-->

## Related

- [[Bands Inside the Grid]] — the other way a page marks a section boundary inside a table
- [[Barely-Existing Columns and Headers]] — empty cells beside header labels, and columns proven only by a header
- [[Empty Pre-Printed Grids]] — rows that are blank because the form is unfilled, all of which are kept
- [[Triangles and Matrix Tables]] — the one place empty positions are never spanned
