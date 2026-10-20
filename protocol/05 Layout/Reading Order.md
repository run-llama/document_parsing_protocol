---
title: Reading Order
rule_id: layout-reading-order
status: rule
scope: page
tags: [rule, layout, blocks]
---

# Reading Order

> [!success] ✅ Normative
> The elements of a page MUST form one reading-order sequence that includes **every** element of the
> page exactly once — no element left out, none placed twice. The sequence MUST follow the order in
> which a reader reads the page, not the elements' geometric position.

The reading order is the order of the page's elements in the Markdown and in the sidecar. Where
positions are numbered, the numbering MUST start at 0 and be contiguous — no gaps and no duplicates.

## The reader, not the geometry

Elements MUST be ordered the way a person reads the page — **not** by simple top-to-bottom,
left-to-right position. On a two-column page, top-to-bottom order interleaves the columns and
produces text that is unreadable in sequence.

The usual shape:

1. the page header;
2. the intended column or section flow;
3. the page footer.

Sidebars, callouts, captions and notes MUST be placed **where a reader would encounter them** — a
caption belongs beside the figure it names, not collected at the end.

## Panels

Where a page prints its own section bands or panel headers, they define the order, and position only
breaks ties **inside** a panel.

### ✅ **Sample** — a conference poster

![[corpus-poster-panels.png]]

A poster laid out as titled panels — *Motivation* and *Dataset* side by side, *Methods* below
Motivation, then *Results* spanning the full width, then *Conclusion*. The order is **panel by
panel**, not column by column and certainly not top-to-bottom across the sheet: read by geometry,
the first bullet of *Motivation* would be followed by the first bullet of *Dataset*, because they sit
at the same height. The two round marks in the top corners print no text and yield no Markdown; the
Results strip of labelled colour swatches is a Picture, rendered as a `description` block.

<details>
<summary>Expected Markdown</summary>

````markdown
# A Distribution-Shift Benchmark for Highland Cacao Smallholders

Do Foundation Models Improve Geographic Generalization?

R. Okonkwo<sup>1</sup>, T. Vasilenko<sup>1</sup>, M. Aday<sup>2</sup>, F. Renwick<sup>1</sup>

Bramwell University<sup>1</sup>, Highland Agroforestry Centre<sup>2</sup>

**ICLR 2025 ML4RS Workshop**

## Motivation

* Recent work has reported high accuracy in applying deep learning to individual tree-canopy detection
* Performance drops under distribution shifts are common for these approaches

**We introduce the first distribution-shift benchmark for highland cacao smallholders and ask:**

(1) How does performance drop under geographic distribution shift?
(2) Do foundation models improve robustness?

## Dataset

* stratify Kelanoa province into 8 agro-climatic zones
* sample train & test images for each zone
* annotate individual tree masks for each image
* split In-Distribution (ID) & Out-of-Distribution (OOD) zones for distribution shift evaluation
* do QA using inter-annotator agreement & field inventories

## Methods

* We perform three types of evaluations:
  - (1) Conventional
  - (2) Distribution shift
  - (3) Few-shot domain adaptation
* Compare performance of a baseline (Faster-RCNN) with computer-vision foundation models (SAM, Grounding DINO)
* Report per-zone accuracy metrics and calibration curves

## Results

```description
- In-Distribution: Ridge Zone, Basin Zone, Terrace Zone, Valley Zone
- Out-of-Distribution: Highland Rim, Plateau Rim, Foothill Rim, Delta Rim
```

## Conclusion

Foundation models close part of the distribution-shift gap seen with the Faster-RCNN baseline, but a sizeable generalization gap remains between in-distribution and out-of-distribution zones; few-shot adaptation on a handful of OOD tiles recovers most of the remaining gap.
````

</details>

## Numbered records

Where independent blocks carry explicit numbering or continuation, the numbering MUST decide the
order.

### ✅ **Sample** — records in two columns

![[bag-regional-offices.png]]

Eight regional-office address blocks on a typewriter page, four down the left and four down the
right. The region numbers run down the left column first (I–IV), then the right (VI, VII, VII, IX),
and that numbering is the order — not the row-by-row sweep that would pair Region I with Region VI.
Two blocks on the right are both printed `REGION VII`, and two print `USDL/OFFCCP`; both are
transcribed as printed. Each region label is underlined.

<details>
<summary>Expected Markdown</summary>

```markdown
RD Instruction 1901-E
Exhibit E

LIST OF REGIONAL OFFICES
Office of Federal Contract Compliance Programs (OFCCP)
U.S. Department of Labor (USDL)

<u>REGION I</u> (ME, NH, VT, MA, RI, CT)

Associate Regional Administrator
USDL/OFCCP
JFK Building - Room 1612-C
Government Center
Boston, MA 12203
(617) 223-4232

<u>REGION II</u> (NY, NJ, PR, VI)

Associate Regional Administrator
USDL/OFCCP
1515 Broadway - Room 3306
New York, NY 10036
(212) 662-5563

<u>REGION III</u> (PA, MD, DE, VA, WV, DC)

Associate Regional Administrator
USDL/OFCCP
Gateway Building - Room 15434
3535 Market Street
Philadelphia, PA 19104
(215) 596-1213

<u>REGION IV</u> (NC, SC, KY, TIN, MS, AL GA, FL)

Associate Regional Administrator
USDL/OFCCP
1371 Peachtree Street, NE
Room 729
Atlanta, GA 30309
(402) 881-4211

<u>REGION VI</u> (LA, AR, OK, TX, NM)

Associate Regional Administrator
USDL/OFCCP
555 Griffin Square Building
Room 506
Dallas, TX 75202
(214) 767-4771

<u>REGION VII</u> (MO, IA, NE, KS)

Associate Regional Administrator
USDL/OFCCP Regional Administrator
Federal Office Building
Room 2000
911 Walnut Street
Kansas City, MO 64106
(816) 374-5384

<u>REGION VII</u> (ND, SD, MT, WY, CO, UT)

Associate Regional Administrator
USDL/OFFCCP
14431 Federal Office Building
1961 Stout Street
Denver, CO 80202
(303) 837-5011

<u>REGION IX</u> (CA, NV, AZ, HI, GU)

Associate Regional Administrator
USDL/OFFCCP
Federal Office Building
Room 10341
450 Golden Gate, CA 94102
San Francisco, CA 94102
(415) 556-3597
```

</details>

## Unnumbered grids

An unnumbered grid of independent, equal blocks MUST be read row by row — left to right on a
left-to-right page — and each block MUST be finished before the next begins. Explicit numbering or
continuation, where present, overrides this.

### ✅ **Sample** — a grid with no numbering

![[bag-motor-registration-grid.png]]

Nine office address blocks in three rows of three under an introductory sentence, nothing numbered.
The grid is read row by row, each address finished before the next starts. Within each block, a gap
separates the address from the telephone lines; the block stays whole. The notes above the grid are
elided.

<details>
<summary>Expected Markdown · excerpt, the office grid</summary>

```markdown
<!-- … -->

Completed Affidavits may be obtained at any of the following Motor Registration offices:

**Motor Registration Division**
212 Larkhollow Drive
Fennmoor, BV
P.O. Box 4410
Harrowgate, BV, B2C 6K1
Tel: 1-877-555-0110
Fax: 709-555-1843

**Motor Registration Division**
Provincial Building
7 Cromlin Avenue
Grennfell Cross, BV
A9A 1W2
Tel: 1-877-555-0110
Fax: 709-555-2387

**Motor Registration Division**
Sir Talbert Squires Building
Corner Reach, BV
A4H 6J1
Tel: 1-877-555-0110
Fax: 709-555-2615

**Motor Registration Division**
14A Byers Ave.
Suite 208
Clarenhaven, BV
A6A 1T4
Tel: 1-877-555-0110
Fax: 709-555-4070

**Motor Registration Division**
Bruno Plaza
212 Humphreys Road
Labrador Vale, BV
A3V 2J9
Tel: 1-877-555-0110
Fax: 709-555-5630

**Motor Registration Division**
9-13 Roddick Cres.
Harbour Bay, BV
A1A 2M1
Tel: 1-877-555-0110
Fax: 709-555-3114

**Motor Registration Division**
4 Tenth Street
Box 3115
Goose Valley, BV
A1P 1E1
Tel: 1-877-555-0110
Fax: 709-555-4340

**Motor Registration Division**
340 Airport Blvd., Fraser Mall
P.O. Box 2223
Ganderville, BV
A2V 2N0
Tel: 1-877-555-0110
Fax: 709-555-1438

**Motor Registration Division**
2 Harris Dr., Industrial Park
P.O. Box 699
Marysvale, BV A0E 2M1
Tel: 1-877-555-0110
Fax: 709-555-8031
```

</details>

<!-- skill:generate
- Output a page's elements in the order a person reads them, not by vertical position: page header, then the column or section flow, then the page footer.
- On multi-column pages, finish one column before starting the next. On posters and slides with titled panels, finish each panel before the next.
- Place captions next to their figure or table and sidebars or notes where a reader meets them.
- Follow printed numbering of blocks (Region I, II, III…) even when it runs down columns; read an unnumbered grid of equal blocks row by row, finishing each block first.
- Every element appears exactly once.
-->

<!-- skill:check
- FAIL (MUST) if text from two columns or two panels is interleaved line by line or block by block.
- FAIL (MUST) if an element is missing from the page's sequence or appears twice, or numbered positions in the sidecar have gaps or duplicates.
- FAIL (MUST) if numbered blocks are output out of their printed numbering order, or an unnumbered grid of equal blocks is not read row by row.
- WARN (SHOULD) if a caption is separated from its figure or table by unrelated elements.
-->

## Related

- [[Block Annotation]] — the elements being ordered
- [[Block Classes]] — Page-header and Page-footer open and close the sequence
- [[Ignoring and Rejecting]] — excluded regions take no position
- [[Images and Figures]] — multi-column prose is unrolled into a single flow
