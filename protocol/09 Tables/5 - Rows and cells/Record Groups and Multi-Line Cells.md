---
title: Record Groups and Multi-Line Cells
rule_id: tables-record-groups-and-multi-line-cells
status: rule
scope: page
tags: [tables, encoding, rowspan]
---

# Record Groups & Multi-Line Cells

> [!success] ✅ Normative
> Independently printed records MUST each be rendered as their own row, with `rowspan` only on
> cells the page genuinely merged. One prose cell MUST stay one cell, with `<br/>` between its title
> and its paragraph. In a boxed row holding lists in several columns, lines that pair up one-to-one
> MUST be separate rows, and a list whose neighbours print a single value for the whole list MUST
> stay in one cell, `<br/>`-joined, beside that value.

```text
Printed boxed row:        Rendered:
| Products   | States |   | MoneyGuard | AL         |
| MoneyGuard | AL     |   | MG II      | AK<br/>AZ  |
| MG II      | AK     |
|            | AZ     |
```

## A record spanning several printed lines

Each printed line of the record MUST be its own row, and the cells genuinely shared across those
lines MUST carry a `rowspan`.

- The record's lines MUST NOT be `<br/>`-joined into one row.
- A blank continuation cell MUST NOT stand where a `rowspan` belongs.
- The lines MUST NOT be rewritten — `Owner:` and `Extended` printed on two lines do not become
  `Owner: Extended`. The verbatim line structure is part of the output.

### ✅ **Sample** — `sln`

![[zoo-sln.png]]

SL Nos 6, 7, 10 and 11 each print one number and one item name against several separately ruled
Material / Diameter / Thickness sub-rows, so those two cells take a `rowspan`; every sub-row has its
own empty *Bidder's Response* box.

<details>
<summary>Expected Markdown · specification table</summary>

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

### ✅ **Sample** — `yep`

![[zoo-yep.png]]

The category and score cells are printed once against four activity rows, so they take a `rowspan`
across them.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th rowspan="2">কর্মসম্পাদনের ক্ষেত্র</th> <th rowspan="2">মান</th> <th rowspan="2">কার্যক্রম</th> <th rowspan="2">কর্মসম্পাদন সূচক</th> <th rowspan="2">একক</th> <th rowspan="2">কর্মসম্পাদন সূচকের মান</th> <th rowspan="2">প্রকৃত অর্জন ২০১৯-২০</th> <th rowspan="2">প্রকৃত অর্জন ২০২০-২১</th> <th colspan="5">লক্ষ্যমাত্রা ২০২১-২০২২</th> </tr>
  <tr> <th>অসাধারণ ১০০%</th> <th>অতি উত্তম ৯০%</th> <th>উত্তম ৮০%</th> <th>চলতি মান ৭০%</th> <th>চলতি মানের নিম্নে ৬০%</th> </tr>
  <tr> <th>১</th> <th>২</th> <th>৩</th> <th>৪</th> <th>৫</th> <th>৬</th> <th>৭</th> <th>৮</th> <th>৯</th> <th>১০</th> <th>১১</th> <th>১২</th> <th>১৩</th> </tr>
  <tr> <td>প্রাতিষ্ঠানিক ব্যবস্থাপনা</td> <td>৫</td> <td>\[১.১\] অভিযোগ নিষ্পত্তি কর্মকর্তা (অনিক) ও আপিল কর্মকর্তার তথ্য ওয়েবসাইটে ত্রৈমাসিকভিত্তিতে হালনাগাদকরণ</td> <td>\[১.১.১\] অনিক ও আপিল কর্মকর্তার তথ্য হালনাগাদকৃত এবং ওয়েবসাইটে আপলোডকৃত</td> <td>সংখ্যা</td> <td>৫</td> <td>-</td> <td>-</td> <td>৪</td> <td>৩</td> <td>-</td> <td>-</td> <td>-</td> </tr>
  <tr> <td rowspan="4">পরিবীক্ষণ ও সক্ষমতা উন্নয়ন</td> <td rowspan="4">২০</td> <td>\[২.১\] নির্দিষ্ট সময়ে অনলাইন/অফলাইনে প্রাপ্ত অভিযোগ নিষ্পত্তি এবং নিষ্পত্তি সংক্রান্ত মাসিক প্রতিবেদন ঊর্ধ্বতন কর্তৃপক্ষ বরাবর প্রেরণ</td> <td>\[২.১.১\] অভিযোগ নিষ্পত্তিকৃত</td> <td>%</td> <td>৮</td> <td>-</td> <td>-</td> <td>৯০%</td> <td>৮০%</td> <td>৭০%</td> <td>৬০%</td> <td>-</td> </tr>
  <tr> <td>\[২.২\] কর্মকর্তা/কর্মচারীদের অভিযোগ প্রতিকার ব্যবস্থা এবং জিআরএস সফটওয়্যার বিষয়ক প্রশিক্ষণ আয়োজন</td> <td>\[২.২.১\] প্রশিক্ষণ আয়োজিত</td> <td>সংখ্যা</td> <td>৫</td> <td>-</td> <td>-</td> <td>৪</td> <td>৩</td> <td>২</td> <td>১</td> <td>-</td> </tr>
  <tr> <td>\[২.৩\] অভিযোগ নিষ্পত্তির অগ্রগতি পরিবীক্ষণ ও তদারকি</td> <td>\[২.৩.১\] তদারকি প্রতিবেদন প্রণীত</td> <td>সংখ্যা</td> <td>৪</td> <td>-</td> <td>-</td> <td>৪</td> <td>৩</td> <td>২</td> <td>১</td> <td>-</td> </tr>
  <tr> <td>\[২.৪\] মাঠ পর্যায়ে অভিযোগ নিষ্পত্তি ব্যবস্থার পরিদর্শন</td> <td>\[২.৪.১\] পরিদর্শন সম্পন্ন</td> <td>সংখ্যা</td> <td>৩</td> <td>-</td> <td>-</td> <td>৩</td> <td>২</td> <td>১</td> <td>-</td> <td>-</td> </tr>
</table>
```

</details>

## Parallel lists across several columns of one boxed row

When one boxed row holds several columns, each with its own vertical list, what decides the
rendering is how the lines pair up across the columns:

- **Lines that pair up one-to-one** — line *i* of one column beside line *i* of the next, each
  line a record of its own (`English Language Paper 1 · 0815 – 0925 h · 1 h 10 min`) — MUST each be
  their own `<tr>`. `<br/>`-joining them destroys which value belongs to which line.
- **A list whose neighbours print a single value for the whole list** — eight papers beside one
  time and one duration; two states beside one product — is one record: the list MUST stay in one
  cell, `<br/>`-joined, beside that single value. Splitting it into rows would attach the value to
  the first line only.
- A boxed row may hold both: `MoneyGuard` pairs with `AL` one-to-one, while `MG II` is printed once
  beside the list `AK`, `AZ`.

This is not the same as a line break inside a single cell, which follows.

## In-cell lists and line wraps

These are inside **one** cell, and here more than one rendering conforms:

| Printed | Rendering |
| --- | --- |
| **Bullet list in a cell** | `<ul><li>…</li></ul>` or `<br/>•` before each item; both conform |
| **Two deliberate printed lines** in a label | kept as `<br/>` |
| **Incidental word-wrap** in a label | flattened to one string, joined with a space |
| **Break the page does not settle** | either rendering conforms |
| **A label and its value packed into one cell**, where the page does not settle whether they are two columns (`N =`, `Z =`) | one cell or two existing columns; both conform |

None of this licenses collapsing lines that pair up one-to-one across columns: `<br/>`-joining that
case is an error.

### ✅ **Sample** — `we`

![[zoo-we.png]]

An exam timetable: each date is printed once against its boxed sub-rows and takes a `rowspan`.
Where papers, times and durations pair up line by line (Thursday, Friday, Tuesday), each line is a
record and gets its own row. Where a list of papers shares one printed time and duration (Monday,
Wednesday), the list stays in one cell, `<br/>`-joined, beside that time.

<details>
<summary>Expected Markdown</summary>

```markdown
**C. Written Examination**

<table>
  <tr> <th>Date</th> <th>Paper</th> <th>Time</th> <th>Duration</th> </tr>
  <tr> <td rowspan="4">Thursday,<br/>24 September</td> <td>English Language Paper 1</td> <td>0815 – 0925 h</td> <td>1 h 10 min</td> </tr>
  <tr> <td>English Language Paper 2</td> <td>1030 – 1220 h</td> <td>1 h 50 min</td> </tr>
  <tr> <td>Foundation English Language Paper 1</td> <td>0815 – 0925 h</td> <td>1 h 10 min</td> </tr>
  <tr> <td>Foundation English Language Paper 2</td> <td>1030 – 1130 h</td> <td>1 h</td> </tr>
  <tr> <td rowspan="4">Friday,<br/>25 September</td> <td>Mathematics Paper 1</td> <td>0815 – 0925 h</td> <td>1 h 10 min</td> </tr>
  <tr> <td>Mathematics Paper 2</td> <td>1030 – 1150 h</td> <td>1 h 20 min</td> </tr>
  <tr> <td>Foundation Mathematics Paper 1</td> <td>0815 – 0915 h</td> <td>1 h</td> </tr>
  <tr> <td>Foundation Mathematics Paper 2</td> <td>1030 – 1115 h</td> <td>45 min</td> </tr>
  <tr> <td rowspan="3">Monday,<br/>28 September</td> <td>Chinese Language Paper 1<br/>Malay Language Paper 1<br/>Tamil Language Paper 1<br/>Bengali Language Paper 1<br/>Gujarati Language Paper 1<br/>Hindi Language Paper 1<br/>Panjabi Language Paper 1<br/>Urdu Language Paper 1</td> <td>0815 – 0905 h</td> <td>50 min</td> </tr>
  <tr> <td>Chinese Language Paper 2<br/>Malay Language Paper 2<br/>Tamil Language Paper 2<br/>Bengali Language Paper 2<br/>Gujarati Language Paper 2<br/>Hindi Language Paper 2<br/>Panjabi Language Paper 2<br/>Urdu Language Paper 2</td> <td>1015 – 1155 h</td> <td>1 h 40 min</td> </tr>
  <tr> <td>Foundation Chinese Language Paper 1<br/>Foundation Malay Language Paper 1<br/>Foundation Tamil Language Paper 1</td> <td>0815 – 0855 h</td> <td>40 min</td> </tr>
  <tr> <td rowspan="2">Tuesday,<br/>29 September</td> <td>Science Paper 1</td> <td>0815 – 1000 h</td> <td>1 h 45 min</td> </tr>
  <tr> <td>Foundation Science Paper 1</td> <td>0815 – 0930 h</td> <td>1 h 15 min</td> </tr>
  <tr> <td rowspan="2">Wednesday,<br/>30 September</td> <td>Higher Chinese Language Paper 1<br/>Higher Malay Language Paper 1<br/>Higher Tamil Language Paper 1</td> <td>0815 – 0905 h</td> <td>50 min</td> </tr>
  <tr> <td>Higher Chinese Language Paper 2<br/>Higher Malay Language Paper 2<br/>Higher Tamil Language Paper 2</td> <td>1015 – 1135 h</td> <td>1 h 20 min</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `2012_tushin_tyuui`

![[zoo-2012_tushin_tyuui.png]]

`練習` cells hold two stacked numbers joined by `<br/>`, and the 男子/女子 stubs span three and two
rows.

<details>
<summary>Expected Markdown · table under 4．バーの上げ方</summary>

```markdown
<table>
  <tr> <th> </th> <th>種 目</th> <th>練 習</th> <th>上 げ 方</th> </tr>
  <tr> <td rowspan="3">男子</td> <td>走 高 跳</td> <td>1.45<br/>60</td> <td>1.50－1.55－1.60・・・・1.70－1.73 以上３㎝</td> </tr>
  <tr> <td>四種走高跳</td> <td>1.35<br/>50</td> <td>1.40－1.45－1.50・・・・1.65－1.68 以上３㎝</td> </tr>
  <tr> <td>棒 高 跳</td> <td>2.30<br/>80</td> <td>2.40－2.60－2.80－3.00－3.10－3.20 以上10㎝</td> </tr>
  <tr> <td rowspan="2">女子</td> <td>走 高 跳</td> <td>1.20<br/>35</td> <td>1.25－1.30－1.35－1.40－1.45－1.48 以上３㎝</td> </tr>
  <tr> <td>四種走高跳</td> <td>1.15<br/>30</td> <td>1.20－1.25・・・・1.40－1.43－1.46 以上３㎝</td> </tr>
</table>
```

</details>

### ✅ **Sample** — `detector-computing`

![[zoo-detector-computing.png]]

Bulleted sub-items stacked inside single cells, each item on its own printed line after a `•`
bullet. The row labels in the shaded first column are bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th> </th> <th>What we did in NEBULA-100</th> <th>What we do in NEBULA-1T</th> </tr>
  <tr> <td><strong>Raw data storage</strong></td> <td>Dedicated disk space at the Merevald Underground Laboratory</td> <td>Dedicated GRID endpoints at:<br/>• Continental Compute Federation (CCF)<br/>• Open Research Grid (ORG)</td> </tr>
  <tr> <td><strong>Raw data processing</strong></td> <td>A few reprocessing campaigns at the Merevald Underground Laboratory</td> <td>Several reprocessing campaigns on CCF and ORG</td> </tr>
  <tr> <td><strong>Data analysis</strong></td> <td>Processed data sets were available at the Merevald Underground Laboratory:<br/>• For analysis<br/>• Download to institutes or analysts’ computers</td> <td>Center for data analysis at the Northshore Research Computing Center (NRCC):<br/>• Reduced data sets available<br/>• JupyterHub server for analysts</td> </tr>
  <tr> <td><strong>GRID usage</strong></td> <td>Monte Carlo production</td> <td>Processing, storage and Monte Carlo</td> </tr>
  <tr> <td><strong>Software &amp; Tools</strong></td> <td>C++/ROOT<br/>Homemade tools (e.g. for reprocessing)</td> <td>• Python 3<br/>• Jupyter notebooks<br/>• Homemade tools &amp; Rucio</td> </tr>
  <tr> <td><strong>Tape storage</strong></td> <td>Merevald Underground Laboratory</td> <td>Northfield Center for High-Performance Computing</td> </tr>
</table>
```

</details>

## When rowspan is right and when it is wrong

Rowspan is the required rendering here and the error in [[Repeated Identical Values]]. The
discriminator is whether the page **actually merged** the cell: a value printed once against
several lines takes a `rowspan`; a value printed separately on each line is that many cells.

## A row label that wraps

The one-row-per-printed-line requirement is about records. A stub label that merely wraps —
`Increase (Decrease) in Accounts Payable` / `and Accrued Liabilities`, value on the second line —
MUST be **one row, its label joined with a space**. The tell is that the wrapped lines read as one
phrase and only one of them carries values.

### ✅ **Sample** — wrapped stub labels in a cash-flow statement

![[bag-school-district-cash-flows.png]]

Three labels wrap: the bold `RECONCILIATION OF OPERATING INCOME (LOSS) TO / NET CASH FROM
OPERATING ACTIVITIES` band, `Adjustments to Reconcile Operating Income (Loss) to Net / Cash Used in
Operating Activities` (no value), and `Increase (Decrease) in Accounts Payable / and Accrued
Liabilities` (values beside the second line). Each is one row. `-` stands for zero throughout; the
column headers are bold and underlined, and the `$` gutter joins its value.

<details>
<summary>Expected Markdown · excerpt, reconciliation section</summary>

```markdown
<table>
  <tr> <th> </th> <th><u>Business-Type Activities- Nonmajor Enterprise Funds</u></th> <th><u>Governmental Activities- Internal Service Funds</u></th> </tr>
  <!-- … -->
  <tr> <td data-level="0"><strong>RECONCILIATION OF OPERATING INCOME (LOSS) TO NET CASH FROM OPERATING ACTIVITIES</strong></td> <td> </td> <td> </td> </tr>
  <tr> <td data-level="1">Operating Income (Loss)</td> <td>$(2,824,131)</td> <td>$1,140,123</td> </tr>
  <tr> <td data-level="1">Adjustments to Reconcile Operating Income (Loss) to Net Cash Used in Operating Activities</td> <td> </td> <td> </td> </tr>
  <tr> <td data-level="2">Depreciation</td> <td>78,717</td> <td>-</td> </tr>
  <tr> <td data-level="2">Donated Commodities Used</td> <td>174,201</td> <td>-</td> </tr>
  <tr> <td data-level="1">Change in Assets and Liabilities</td> <td> </td> <td> </td> </tr>
  <tr> <td data-level="2">(Increase) Decrease in Receivables</td> <td>22,337</td> <td>-</td> </tr>
  <tr> <td data-level="2">(Increase) Decrease in Inventories</td> <td>(29,647)</td> <td>-</td> </tr>
  <tr> <td data-level="2">(Increase) Decrease in Prepaid Expenses</td> <td>3,492</td> <td>-</td> </tr>
  <tr> <td data-level="2">Increase (Decrease) in Accounts Payable and Accrued Liabilities</td> <td>(22,555)</td> <td>(5,449)</td> </tr>
  <tr> <td data-level="2">Increase (Decrease) in Deferred Revenue</td> <td>27,462</td> <td>-</td> </tr>
  <tr> <td data-level="2">Increase (Decrease) in Compensated Absences Payable</td> <td>390</td> <td>-</td> </tr>
  <tr> <td data-level="1">Net Cash From Operating Activities</td> <td>$(2,569,734)</td> <td>$1,134,674</td> </tr>
  <!-- … -->
</table>
```

</details>

## A cell holding a title and a paragraph

A single ruled prose cell MUST stay one cell in one row. Its title keeps its printed emphasis and
MUST be separated from its paragraph by `<br/>`; values stacked in the adjacent cell are kept in
that cell, joined with `<br/>`. Only independently printed records are split into rows.

### ✅ **Sample** — a cell holding a title and a paragraph

![[bag-university-budget-program.png]]

Each `Description` cell prints a bold underlined title, then two or three lines of plain
explanation; the `City Personnel` cell beside it stacks two values, `(3)P` over `(2)NP`. One
`<tr>` per printed line would split the title from its text and the two personnel figures from
each other. The *Total Agency Program* row is bold.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th rowspan="2">Description</th> <th rowspan="2">City<br/>Personnel*</th> <th colspan="4">City Funds<br/>($ In Thousands)</th> </tr>
  <tr> <th>2003</th> <th>2004</th> <th>2005</th> <th>2006</th> </tr>
  <tr> <th colspan="6">BUDGET REDUCTION PROGRAM</th> </tr>
  <tr> <td data-level="0"><strong><u>Metro College Reduction in Library and Organized Activities</u></strong><br/>HCU proposes to eliminate 3 pedagogical, 2 non-pedagogical, and 20 part-time positions.</td> <td>(3)P<br/>(2)NP</td> <td>(548)</td> <td>(548)</td> <td>(548)</td> <td>(548)</td> </tr>
  <tr> <td data-level="0"><strong><u>Bramwell Campus School Reduction in Library and Organized Activities</u></strong><br/>HCU proposes to eliminate 1 non-pedagogical position.</td> <td>(1)NP</td> <td>(22)</td> <td>(43)</td> <td>(43)</td> <td>(43)</td> </tr>
  <!-- … -->
  <tr> <th data-level="0"><strong>Total Agency Program</strong></th> <td><strong>(26)P<br/>(12)NP</strong></td> <td><strong>(9,127)</strong></td> <td><strong>(14,853)</strong></td> <td><strong>(15,401)</strong></td> <td><strong>(16,325)</strong></td> </tr>
</table>
```

</details>

### ✅ **Sample** — paragraphs inside one cell

![[bag-equipment-multiparagraph-cells.png]]

The `Model` cell for the data acquisition system holds three paragraphs separated by blank
lines; the `Description` cells print `[must be on approved list]` in brackets.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th>Major Equipment</th> <th>Description</th> <th>Model</th> <th>Units</th> </tr>
  <tr> <td>Modules</td> <td>\[must be on approved list\]</td> <td> </td> <td> </td> </tr>
  <tr> <td>\[Spare Modules\]<sup>8</sup>\[N/A\]</td> <td>\[must be on approved list\]</td> <td> </td> <td> </td> </tr>
  <!-- … -->
  <tr> <td>Production Meter Data Acquisition System (“DAS”)</td> <td>BrightGrid / Merevald with inverter data integration</td> <td>For PPAs, System size &gt;325 kW AC: VoltCore CM 600<br/><br/>For PPAs, System &lt;325 kW AC: VoltCore CM 400<br/><br/>For BASA sites, metering may rely on inverter level data integrations via RS-485 (or other engineered communication method) into one or more BrightGrid PLCS data acquisition system(s) such as PLCS-600-CM-PLUS and PLCS-400-CM<sup>9</sup></td> <td> </td> </tr>
  <tr> <td>Sensors</td> <td> </td> <td>PPA System size &gt;325 kW AC<br/><br/>IMT Reference cell<br/>Module Temp Sensor w/3M cable - Plug in</td> <td> </td> </tr>
</table>
```

</details>

<!-- skill:generate
- Give each independently printed record line its own <tr>; put rowspan only on a cell the page prints once against several lines (an item number and name beside several ruled sub-rows).
- When one boxed row holds lists in several columns: lines that pair up one-to-one across the columns (line i beside line i) each get their own <tr>; a list whose neighbouring columns print a single value for the whole list stays in one cell, <br/>-joined, beside that value.
- Inside one cell: keep deliberate line breaks as <br/>, join incidental word-wrap with a space, render bullets as <ul><li> or <br/>• items.
- A stub label that wraps onto a second line (values only on one line) is one row with the label joined by a space.
- A cell holding a title and a paragraph stays one cell: title with its printed emphasis, <br/>, then the paragraph.
-->

<!-- skill:check
- FAIL (MUST) if a cell printed once against several lines is repeated on each row or left blank on the continuation rows instead of carrying a rowspan.
- FAIL (MUST) if lines that pair up one-to-one across columns are <br/>-joined into one cell, or a list sharing a single printed value is split into rows that attach the value to its first line only.
- FAIL (MUST) if a wrapped stub label is split into two rows, or a title-and-paragraph cell is split across rows.
- FAIL (MUST) if a record's printed lines are rewritten or merged into different text.
- WARN (SHOULD) if a label broken by incidental word-wrap keeps a <br/>, or two deliberate lines are flattened, where the page settles which it is.
-->

## Related

- [[Repeated Identical Values]] — where a `rowspan` is the error
- [[Nested Tables]] — a grid inside a cell, not lines of text
- [[Row-Label Hierarchy]] — the level of a wrapped or indented stub label
