---
title: Titles Banners Captions
rule_id: tables-titles-banners-captions
status: rule
scope: page
tags: [tables, captions, headers]
---

# Titles, Banners, Captions

> [!success] ✅ Normative
> For a table-only title, the frame and the fill decide. A band that shares the table's border or
> fill MUST be rendered as a header row **inside** the table; a table-only title outside the ruled
> frame MUST be rendered as `<caption>` inside the table HTML. Table and chart captions MUST be
> the first or last content inside `<table>` according to reading order and MUST appear once.

```text
22. Consolidated Income Statement        ← title line above the table:
| Revenue | 2024 | 2023 |              ## heading? first header row? both?

| [colspan=3]LAWNS & ANNUALS |       ← band sharing the table's border/fill:
| Name | Water | Sun |                 header row inside, or heading outside?
```

## Structural statement titles

A table-only caption is first told apart from a principal financial-statement or numbered schedule
title using [[Recognising Ambiguous Headings]]. A principal statement title can be a document
heading, and a company line printed directly above it joins that heading (see [[Stacked Headings]]);
a units line cannot. A numbered schedule title printed within a grid keeps its structural role, but
its text MUST stay in the table once and MUST NOT be duplicated as an outside heading. The frame
test below applies to ordinary table captions and bands.

## The frame test

The position of the ink relative to the ruled border, and whether the band carries the table's
fill, decide:

| The band… | Rendering |
| --- | --- |
| **shares the border or the fill** | a header row inside the table. A coloured "LAWNS & ANNUALS" band that runs to the table's own edges is a `<th colspan=N>` banner row. Such bands MUST NOT be omitted — they carry the heading for everything under them. |
| **sits outside the ruled frame** | `<caption>` inside the table HTML, first or last according to reading order |

Only text that belongs to the table alone counts. A page heading that happens to sit above a table,
and would still make sense if the table were removed, is not a title band.

A **bold caption with paragraph spacing directly above a bordered mini-table** follows the same
rule: it MUST be the first `<caption>` inside the table HTML.

### ✅ **Sample** — `star`

![[zoo-star.png]]

`APPLICABILITY CHART` as a full-width band sharing the table's own ruled border — in-frame by the
frame test, so it is the first header row.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th colspan="5">APPLICABILITY CHART</th> </tr>
  <tr> <th rowspan="2">STATE</th> <th colspan="4">TERRORISM OPTIONS – INCLUDING PRICING</th> </tr>
  <tr> <th>VERSION</th> <th>IMPLEMENTATION<br/>CIRCULAR</th> <th>EFFECTIVE DATE</th> <th>EXPIRATION DATE</th> </tr>
  <tr> <td>ALABAMA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>ALASKA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>ARIZONA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>ARKANSAS</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>CALIFORNIA</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <tr> <td>COLORADO</td> <td>*</td> <td>*</td> <td>*</td> <td>*</td> </tr>
  <!-- … -->
  <tr> <td>GEORGIA</td> <td>CS102</td> <td>CP–SC–2024–381</td> <td>2/01/25</td> <td>+</td> </tr>
  <!-- … -->
</table>
```

</details>

### ✅ **Sample** — `3t`

![[zoo-3t.png]]

A coloured colspan title bar (*TIMBER IMPACT INVESTING FUNDS*) sharing the table's fill and width
opens each of the three tables.

<details>
<summary>Expected Markdown · table 1 of 3</summary>

```markdown
<table>
  <tr> <th colspan="12">TIMBER IMPACT INVESTING FUNDS</th> </tr>
  <tr> <th>VINTAGE YEAR</th> <th>POOLED RETURN (%)</th> <th>ARITHMETIC MEAN (%)</th> <th>MEDIAN (%)</th> <th>EQUAL-WEIGHTED POOLED RETURN (%)</th> <th>UPPER QUARTILE (%)</th> <th>LOWER QUARTILE (%)</th> <th>STANDARD DEVIATION (%)</th> <th>DPI</th> <th>RVPI</th> <th>TVPI</th> <th>NUMBER OF FUNDS</th> </tr>
  <tr> <td data-level="0">1997-2001</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>2</td> </tr>
  <tr> <td data-level="0">2002-2004</td> <td>3.11</td> <td>3.58</td> <td>—</td> <td>3.55</td> <td>—</td> <td>—</td> <td>—</td> <td>0.94</td> <td>0.45</td> <td>1.39</td> <td>4</td> </tr>
  <tr> <td data-level="0">2005-2007</td> <td>4.05</td> <td>5.44</td> <td>5.56</td> <td>5.36</td> <td>—</td> <td>—</td> <td>—</td> <td>0.86</td> <td>0.60</td> <td>1.46</td> <td>6</td> </tr>
  <tr> <td data-level="0">2008-2010</td> <td>4.38</td> <td>4.51</td> <td>4.66</td> <td>4.03</td> <td>—</td> <td>—</td> <td>—</td> <td>0.30</td> <td>0.98</td> <td>1.28</td> <td>5</td> </tr>
  <tr> <td data-level="0">2011-2013</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>—</td> <td>1</td> </tr>
  <tr> <td data-level="0">2014-2017</td> <td>6.06</td> <td>7.55</td> <td>—</td> <td>5.83</td> <td>—</td> <td>—</td> <td>—</td> <td>0.14</td> <td>1.00</td> <td>1.14</td> <td>3</td> </tr>
  <tr> <th data-level="0"><strong>1997-2017</strong></th> <td><strong>4.06</strong></td> <td><strong>5.50</strong></td> <td><strong>4.94</strong></td> <td><strong>5.09</strong></td> <td><strong>7.04</strong></td> <td><strong>4.46</strong></td> <td><strong>3.75</strong></td> <td><strong>0.76</strong></td> <td><strong>0.64</strong></td> <td><strong>1.40</strong></td> <td><strong>21</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — `ylf`

![[zoo-ylf.png]]

*Years Loss Free With BMI Post Inception* is a title band inside the second table's ruled frame,
spanning both columns, so it is the table's first header row and is not repeated as text above it.

<details>
<summary>Expected Markdown · table 2 of 2</summary>

```markdown
<table>
  <tr> <th colspan="2">Years Loss Free With BMI Post Inception</th> </tr>
  <tr> <th>Years</th> <th>Discount</th> </tr>
  <tr> <td>0</td> <td>0.0%</td> </tr>
  <tr> <td>1</td> <td>2.5%</td> </tr>
  <tr> <td>2</td> <td>5.0%</td> </tr>
  <tr> <td>3</td> <td>5.0%</td> </tr>
  <tr> <td>4</td> <td>7.5%</td> </tr>
  <tr> <td>5</td> <td>7.5%</td> </tr>
  <tr> <td>6</td> <td>7.5%</td> </tr>
  <tr> <td>7+</td> <td>10.0%</td> </tr>
</table>
```

</details>

## An in-table title is one full-width cell

A title band rendered as a row MUST be a **single full-width `<th colspan=N>`** — never the title
in one column with empty cells padded beside it.

```text
| [colspan=3]Table 13 — Scale G2 |    vs    | Table 13 — Scale G2 |  |  |
                                             ↑ padded: a spurious record
```

A full-width single-value row is recognised as a title and set aside; the padded form reads as a
real data row with missing values, and adds a row that the table does not have.

A table-only title therefore has two forms, chosen by its printed role: **a full-width header
row** for an in-frame band, or **`<caption>`** for a caption outside the printed frame.

## A title appears once

A title MUST appear once, in the form selected by the frame test. A `<caption>` MUST NOT also
appear as a paragraph outside the table or as a header row.

## Banner colspan follows the region, not the ink

A centred band title MUST span **the region it heads**, not the pixels its letters happen to cover.

```text
|      Proposed      |            ← ink covers 4 of 14 column tracks:
| c1 | c2 | … | c14 |              colspan=4 or colspan=14?
```

A "Proposed" banner over a 14-column table is `colspan=14`, even though its ink reaches only the
middle four. Centred text shrinks toward the middle whatever it spans, so measuring the glyphs
measures the font, not the structure.

### ✅ **Sample** — `lakecruise`

![[zoo-lakecruise.png]]

Coloured *GROSSE SEERUNDFAHRT / KLEINE SEERUNDFAHRT* banners span each timetable's full width, so
each is one full-width header cell (all nine columns in the first table), carrying the duration
printed at its right end. Bold stop rows (`Lindenhafen`, `Seewinkel`) are bold per cell.

<details>
<summary>Expected Markdown · excerpt, table 1 of 2</summary>

```markdown
<table>
  <tr> <th colspan="9"><strong>GROSSE SEERUNDFAHRT LONG LAKE CRUISE</strong> 4H 30M</th> </tr>
  <tr> <th> </th> <th colspan="7"><strong>Täglich<br/>Daily</strong></th> <th> </th> </tr>
  <tr> <th><strong>Kurs / Service</strong></th> <th><strong>101/102</strong></th> <th><strong>103/104</strong></th> <th><strong>105/106</strong></th> <th><strong>107/108</strong></th> <th><strong>109/110</strong></th> <th><strong>113/114</strong></th> <th><strong>117/118</strong></th> <th> </th> </tr>
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

## Section-divider rows

A divider row that **names no columns** — "Part I — Financial Information" and the like — SHOULD
be rendered as a bold body row (`<td colspan=N>`); a `<th>` row MAY be used instead. A document
MUST use one of the two for every visually identical band — see
[[Choices Made Once Per Document]]. Whichever tag is used, a divider MUST NOT be promoted into the
column-name tier: it labels a region, not a column.

```text
| Part I — Financial Information |   ← names no columns
| Item 1 | 10-Q | 45 |
```

Bold `<td>` is the preferred form because a `<th>` claims "this labels the cells below it", and a
section divider makes no such claim.

### ❌ **Counter-sample** — `wood`

![[zoo-wood.png]]

The region bands (`AFRICA`, `AUSTRALIA`, `NORTH AMERICA`) are visually identical grey bold bands.
A rendering that tags one of them as a body cell and another as `<th>` in the same document
violates the one-form-per-document requirement. The conforming rendering uses one form — here the
preferred bold `<td>` — for every band in both tables.

<details>
<summary>Non-conforming output · table 1 of 2</summary>

```markdown
<table>
  <tr> <th>Well Name,<br/>Country</th> <th>Basin/ Area</th> <th>Target</th> <th>Merevald's<br/>Interest<br/>(%)</th> <th>Water<br/>Depth<br/>(metres)</th> <th>Proposed<br/>Total<br/>Depth^<br/>(metres)</th> <th>Remarks</th> </tr>
  <tr> <td colspan="7">AFRICA</td> </tr>
  <tr> <td>Gannet-1,<br/>Mauritania</td> <td>PSC A</td> <td>Oil</td> <td>53.85</td> <td>286</td> <td>3,100</td> <td>Exploration, ~ 40km south of Kestrel</td> </tr>
  <!-- … -->
  <tr> <th colspan="7">AUSTRALIA</th> </tr>
  <tr> <td>Kittiwake-1,<br/>Australia</td> <td>Carnarvon, WA-20-L</td> <td>Oil</td> <td>45.94</td> <td>55</td> <td>3,050</td> <td>Exploration, ~ 3.5kms east of Ocean Sabertooth production facility at Sabertooth</td> </tr>
  <!-- … -->
</table>
```

</details>

<details>
<summary>Expected Markdown · both tables</summary>

```markdown
**Planned Q3 2025 exploration and appraisal wells:**

<table>
  <tr> <th>Well Name,<br/>Country</th> <th>Basin/ Area</th> <th>Target</th> <th>Merevald's<br/>Interest<br/>(%)</th> <th>Water<br/>Depth<br/>(metres)</th> <th>Proposed<br/>Total<br/>Depth^<br/>(metres)</th> <th>Remarks</th> </tr>
  <tr> <td colspan="7"><strong>AFRICA</strong></td> </tr>
  <tr> <td>Gannet-1,<br/>Mauritania</td> <td>PSC A</td> <td>Oil</td> <td>53.85</td> <td>286</td> <td>3,100</td> <td>Exploration, ~ 40km south of Kestrel</td> </tr>
  <tr> <td>Harrow-1,<br/>Mauritania</td> <td>PSC A</td> <td>Oil</td> <td>53.85</td> <td>280</td> <td>2,250</td> <td>Exploration, ~ 60km south of Kestrel</td> </tr>
  <tr> <td>Marlin-1,<br/>Mauritania</td> <td>PSC B</td> <td>Oil</td> <td>53.85</td> <td>1677</td> <td>3,300</td> <td>Exploration, ~ 15km west of Auk</td> </tr>
  <tr> <td colspan="7"><strong>AUSTRALIA</strong></td> </tr>
  <tr> <td>Kittiwake-1,<br/>Australia</td> <td>Carnarvon, WA-20-L</td> <td>Oil</td> <td>45.94</td> <td>55</td> <td>3,050</td> <td>Exploration, ~ 3.5kms east of Ocean Sabertooth production facility at Sabertooth</td> </tr>
  <tr> <td>Ridgeback-2,<br/>Australia</td> <td>Browse, WA-32-R</td> <td>Gas</td> <td>50.00</td> <td>570</td> <td>4,000</td> <td>Appraisal, ~ 3.5km west of Ridgeback-1</td> </tr>
  <tr> <td>Foxglove-1,<br/>Australia</td> <td>Browse, WA-28-R</td> <td>Gas</td> <td>25.00</td> <td>574</td> <td>4,000</td> <td>Exploratory -appraisal, ~ 12km NW of Ridgeback South-1</td> </tr>
  <tr> <td>Halcyon-2,<br/>Australia</td> <td>Carnarvon, WA-350-P</td> <td>Gas</td> <td>100.0</td> <td>367</td> <td>3,300</td> <td>Appraisal, ~ 8.5km south of Halcyon-1 gas discovery</td> </tr>
</table>

<!-- … -->

<table>
  <tr> <th>Location</th> <th>Permit or Licence Area</th> <th>Change in<br/>Interest (%)<br/>Increase or<br/>(Decrease)</th> <th>Merevald's<br/>Current<br/>Interest %</th> <th>Remarks</th> </tr>
  <tr> <td colspan="5"><strong>AUSTRALIA</strong></td> </tr>
  <tr> <td>Grt Australian<br/>Bight</td> <td>EPP 28,29,30,31</td> <td>(10)</td> <td>90</td> <td>Equity swap</td> </tr>
  <tr> <td>Carnarvon</td> <td>WA-297-P</td> <td>(25.2)</td> <td>25.17</td> <td>Farm down</td> </tr>
  <tr> <td>Carnarvon</td> <td>WA-269-P</td> <td>(30)</td> <td>50</td> <td>Farm down</td> </tr>
  <tr> <td colspan="5"><strong>NORTH AMERICA</strong></td> </tr>
  <tr> <td>GoM</td> <td>G15942 / GB732; G15943 /<br/>GB733; G15948 / GB821;<br/>G15949 / GB823</td> <td>50</td> <td>50</td> <td>Equity transfer</td> </tr>
  <tr> <td>GoM</td> <td>G19271 / AC73; G19279 /<br/>AC117</td> <td>8.75</td> <td>25</td> <td>Equity transfer</td> </tr>
  <tr> <td>GoM</td> <td>G21236 / WR37; G21237 /<br/>WR81; G21240 / WR123</td> <td>(33.33)</td> <td>0</td> <td>Relinquishment</td> </tr>
  <tr> <td>GoM</td> <td>G21759 / MC449</td> <td>(25)</td> <td>0</td> <td>Relinquishment</td> </tr>
  <tr> <td colspan="5"><strong>AFRICA</strong></td> </tr>
  <tr> <td>Kenya</td> <td>Kenya Blocks L-5, L-7</td> <td>10</td> <td>50</td> <td>Equity swap</td> </tr>
</table>
```

</details>

## How a caption is rendered

A table or chart caption MUST be rendered once as `<caption>…</caption>` inside the HTML table
that represents its object. Reading order determines its position in the HTML source:

- A caption read **before** the table or chart MUST be the first content line after the opening
  `<table>` tag, before any rows or table-section wrappers.
- A caption read **after** the table or chart MUST be the last content line before `</table>`,
  after all rows and table-section wrappers.
- A chart's table MUST still open with `<table data-source="chart">`.

```text
caption before the table:
<table>
  <caption>Table 5 — Lapse Rates</caption>
  <!-- rows -->
</table>

caption after the chart:
<table data-source="chart">
  <!-- rows -->
  <caption>Figure 2 — Annual losses</caption>
</table>
```

The first/last requirement concerns the serialized HTML, including captions after the final row.
Source notes, footnotes and nearby prose retain their own roles and MUST NOT be turned into
captions. Captions of objects that are not represented by tables retain their adjacent paragraphs.

In the element list, a caption MUST be attached to the table or chart it describes wherever the
association is clear from the page. It retains the Caption class and its own box even when its
rendering is nested inside `<table>`; the table or chart box follows [[Block Boundaries]]. When
the association is unclear, the output MUST NOT invent an attachment.

### Caption formatting is content

Captions are rarely plain text, and their styling is printed content like any other. It MUST be
preserved as printed, per run:

```text
printed:      Figure 2. Predicted vs True Tree count on the test set.
              ^^^^^^^^^ bold          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ plain
output:       <caption><strong>Figure 2.</strong> Predicted vs True Tree count on the test set.</caption>

printed:      FIG.2.3. Electric and non-electric energy growth rate (from [1]).
              ^ all italic
output:       <caption><em>FIG.2.3. Electric and non-electric energy growth rate (from [1]).</em></caption>
```

Three shapes recur: **fully italic**, a **bold label followed by plain text**, and a caption set in
a heading-like face. A bold run stays bold, an italic run stays italic, and a mixed caption keeps
the boundary between them. Styles MUST NOT be normalised to one, and MUST NOT be dropped because
the text survives without them. The per-run discipline is the one that governs styling inside
tables — see [[Bold and Italic Inside Tables]].

**A caption MUST NOT be converted into a heading**, even when it is set in a heading-like face. A
`##` heading above the table asserts a document section that the page did not print, and it
survives into any structure derived from the headings. A caption names an object; a heading opens
a section.

This is the placement rule only. Whether a given piece of text is a caption at all, or a title band
inside the table, is settled by the frame test above.

### ✅ **Sample** — a title printed in the corner cell

![[bag-title-in-corner-cell.png]]

`Financial highlights`, bold and underlined, sits in the top-left cell of the frame — where the
stub header goes — with the period tiers to its right. It **is the stub header**, in the header
row, and there is no caption. The `SOUTHERN AND EASTERN EUROPE` heading above the frame would make
sense without the table, so it stays a heading; the `(1)` note below the frame follows the table.

<details>
<summary>Expected Markdown · table and its note</summary>

```markdown
<table>
  <tr> <th><u>Financial highlights</u></th> <th colspan="2"><u>Six months to 30 September</u></th> <th><u>Increase/<br/>(decrease)</u></th> </tr>
  <tr> <th> </th> <th>2025</th> <th>2024</th> <th>%</th> </tr>
  <tr> <th> </th> <th>£m</th> <th>£m</th> <th> </th> </tr>
  <tr> <td>Statutory turnover</td> <td>191</td> <td>168</td> <td>14</td> </tr>
  <tr> <td>Statutory total Group operating profit<sup>(1)</sup></td> <td>76</td> <td>88</td> <td>(14)</td> </tr>
  <tr> <td>Proportionate turnover</td> <td>284</td> <td>241</td> <td>18</td> </tr>
  <tr> <td>Proportionate EBITDA<br/>(before exceptional items)</td> <td>119</td> <td>109</td> <td>9</td> </tr>
  <tr> <td>Proportionate EBITDA margin</td> <td>42%</td> <td>45%</td> <td> </td> </tr>
</table>

(1) – before goodwill amortisation and exceptional items
```

</details>

<!-- skill:generate
- A title band that shares the table's border or background fill is the first row of the table: one <th colspan="N"> spanning every column of the region it heads (not just the width of its letters), never a title cell padded with empty cells.
- Render each table or chart caption once as <caption> inside its table HTML: first content after the opening <table> tag if read before the object, last content before </table> if read after it. Chart tables open with <table data-source="chart">. Keep Caption as its class and give it its own layout box.
- Never turn a table or figure caption into a # heading; keep its printed bold/italic runs exactly.
- Render a divider row that names no columns (e.g. "Part I — Financial Information") as <td colspan="N"><strong>…</strong></td>, the same way for every such band in the document, and never as part of the column-header rows.
-->

<!-- skill:check
- FAIL (MUST) if a band printed inside the table's frame or fill is missing from the table, or is rendered as a heading outside it.
- FAIL (MUST) if a table or chart caption is duplicated, lacks its <caption> wrapper inside the table, or is not first/last inside the table according to reading order.
- FAIL (MUST) if an in-table title row is a single title cell padded with empty cells instead of one full-width colspan cell.
- FAIL (MUST) if visually identical section-divider bands in one document are rendered with different tags (<td> in one place, <th> in another), or a divider is placed in the column-header tier.
- FAIL (MUST) if a caption is rendered as a Markdown heading, moved to the other side of its table, or loses its printed bold/italic runs.
- WARN (SHOULD) if a section-divider band is rendered as <th> rather than a bold <td>.
-->

## Related

- [[Footnotes Inside the Frame]] — the frame test applied at the bottom edge, and its one exception
- [[Bands Inside the Grid]] — full-width bands printed between data rows
- [[Continued in the Title]] — a title that says the table continues
- [[Heading Depth Across Pages]] — a caption never becomes a heading, whichever side of the frame it sits
