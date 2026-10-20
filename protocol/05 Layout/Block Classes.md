---
title: Block Classes
rule_id: layout-block-classes
status: rule
scope: page
tags: [rule, layout, blocks]
---

# Block Classes

> [!success] ✅ Normative
> Every element MUST have exactly one of the seventeen classes below. Its layout class MUST match
> the class of the corresponding Markdown element defined in [[Elements]]. A class MUST NOT be chosen
> merely to complete a page: where the class is genuinely unclear, the output MUST NOT assert a
> class the page does not support.

## The seventeen classes

| Class | Used for |
| --- | --- |
| **Text** | One coherent paragraph or prose block |
| **Title** | The overall document title, on its title or front page |
| **Section-header** | A separate heading introducing a section or subsection |
| **List-item** | One marked or hanging list item, **including its continuation lines** |
| **Caption** | Text outside normal flow that names or explains a table, picture or formula |
| **Footnote** | A footnote, source note, method note, or small explanatory note tied to the body |
| **Page-header** | Repeated or page-specific content in the top margin |
| **Page-footer** | Bottom-margin content — **a page number alone qualifies** |
| **Picture** | A unified photo, diagram, chart, logo, map or molecular structure |
| **Table** | A ruled *or borderless* row-and-column structure whose alignment matters |
| **Formula** | A standalone displayed expression, **including its displayed equation number** |
| **Checkbox-Selected** | A selected checkbox mark **only** — not its label |
| **Checkbox-Unselected** | An unselected checkbox mark **only** — not its label |
| **Code** | Preformatted source, commands, logs, or fixed-width output |
| **Document Index** | A table of contents, index, or directory-like navigation block |
| **Form** | Irregular controls or fields arranged for data entry |
| **Key-Value Region** | A compact label/value group **without** a regular table grid |

How each class is rendered in Markdown is set out in [[Elements]].

## One class across layout and Markdown

The layout box and the corresponding Markdown represent the same element and MUST use the same
class. A producer MUST resolve a disagreement using the printed content and update both
representations to agree. A detected label is only a suggestion — see [[Layout Regions]].

The class describes the element's role; Markdown syntax alone does not determine it. Text and
Footnote both render as paragraphs while keeping their distinct classes. A table or chart Caption
uses `<caption>` inside its object's table HTML and keeps its own Caption class and layout box. A Picture
rendered as `<table data-source="chart">` keeps the Picture class; a printed Table has the Table class. The
renderings prescribed in [[Elements]] govern these cases.

## The distinctions that decide most cases

| | |
| --- | --- |
| **Table vs Form** | A Table has a **regular** row-column structure. A Form has irregular fields or controls for data entry. |
| **Table vs Key-Value Region** | A Table **repeats** rows and columns. A Key-Value Region is a compact label/value group with no regular grid. |
| **Title vs Section-header** | Title is **only** the document's overall title on its cover — which sheet that is, is decided once in [[Document Type]]. A repeated title on a later page is Text or page furniture. |
| **Caption vs Text** | **Proximity is not enough.** A Caption names or explains an object and sits outside normal flow. Ordinary nearby prose is Text. |
| **Caption vs Footnote** | A Caption *identifies* an object. A Footnote adds a source, method, qualification or note. |
| **Picture vs Formula** | A complex chemical structure is a **Picture**. An ordinary standalone mathematical expression is a **Formula**. |
| **Checkbox** | The box covers only the square, circle or check mark — **never its label**. |

The diagrams below are synthetic pages shown with their element overlays, one colour per class.
There is no diagram yet for Checkbox-Selected, Checkbox-Unselected, Code, Document Index, Form or
Key-Value Region; the definitions above govern those.

## Title and Text

**Title** MUST be used only for the document's overall title. Authors, dates, addresses and other
front-matter prose MUST stay separate **Text** elements.

### ✅ **Sample** — `block-title-text`

![[block-title-text.svg]]

**Red = Title · yellow = Text.** A cover sheet. Expected boxes: one Title around the title and its
`Release 4.2.1` line, then three Text elements — the authors, the foundation's address, the date.
Each Text element keeps its printed line break.

<details>
<summary>Expected Markdown</summary>

```markdown
# The Quenra Language Reference *Release 4.2.1*

**Mara Ilvesk
and the Quenra core team**

Quenra Language Foundation
12 Harrow Lane, Tessby

**March 14, 2022**
```

</details>

## Section-header and List-item

Each visually distinct Section-header MUST be its own element. Each list item MUST be **one**
List-item element, including its bullet or number and every continuation line.

### ✅ **Sample** — `block-section-list`

![[block-section-list.svg]]

**Dark red = Section-header · blue = List-item · yellow = Text.** Example A: a clipped neighbouring
column on the left (Text, transcribed only as far as it is visible), a paragraph (Text), and the
heading `IV. RESULTS` (Section-header). Example B: three numbered items, each one List-item whose box
takes in its number and its wrapped second line.

<details>
<summary>Expected Markdown · Example A</summary>

```markdown
se chain
ach bead
the back-
e field for
air poten-
teractions,
nteraction

expectation value of ($$\tau^{n}/n!$$). These moments are used to compare the rates throughout the paper to capture the main features and draw physical information from the distribution.

## IV. RESULTS
```

</details>

<details>
<summary>Expected Markdown · Example B</summary>

```markdown
1. die vor dem 1. März 1988 ihren Wohnsitz in der Gemeinde Arvenstadt genommen haben und dort seitdem ununterbrochen gemeldet sind,
2. deren Zuschuss nach dem 30. April 1999 beginnt und
3. über deren Antrag auf Förderung vor dem 31. Oktober 2004 entschieden wurde und deren Förderung bis zum 30. Juni 2007 nicht widerrufen worden ist.
```

</details>

## Footnote and Formula

Each distinct Footnote MUST be its own element. A Formula MUST contain the complete displayed
expression **and its equation number**; inline maths stays part of its **Text** element.

### ✅ **Sample** — `block-footnote-formula`

![[block-footnote-formula.svg]]

**Dark green = Footnote · grey = Formula · yellow = Text.** Example A: two columns of body text and
the footnote `a)` under the left column. Example B: a clipped neighbouring column, a paragraph with
inline maths, and footnote `1`. Example C: prose interrupted by the numbered displays (1) and (2),
each one Formula with its number; the prose above, between and below them is four Text elements.
The clipped fragments at the right edge of Example C (`Figu`, `layer`, …) have no box in the
overlay and are left out.

<details>
<summary>Expected Markdown · Example A</summary>

```markdown
Maximum Overlap (MaxOv) methods.<sup>17</sup> A method similar to the Halberg sampling algorithm performs reweighting in NESS for small systems like birth–death chains.<sup>18</sup> A related method based on trajectory reweighting is expected to scale to NESS systems,<sup>19</sup> however these

<sup>a)</sup>Electronic mail: r.voss@caldrivane.example

tions made on a system recorded on the system will fix the pathway. The microscopic change is described by the balance to preserve probability flux. The NESS system is also able to be separated into two parts: dissipative contributions whose sign is fixed by the target
```

</details>

<details>
<summary>Expected Markdown · Example B</summary>

```markdown
sions
fully
with
casts
out of
orma-

input $$x$$ pixels to the right and $$y$$ pixels down, once for every $$(x, y)$$ s.t. $$0 \le x, y < f$$. Process each of these $$f^{2}$$ inputs, and interlace the outputs so that the predictions correspond to the pixels at the *centers* of their receptive fields.

<sup>1</sup>Assuming efficient batching of single image inputs. The classification scores for a single image by itself take 4.1 ms to produce, which is nearly 30 times slower than the fully convolutional version.
```

</details>

<details>
<summary>Expected Markdown · Example C</summary>

```markdown
ing layer, these functions compute outputs $$\mathbf{y}_{ij}$$ by

$$\mathbf{y}_{ij} = f_{ks}(\{\mathbf{x}_{si+\delta i,\, sj+\delta j}\}_{0 \le \delta i, \delta j \le k})$$ (1)

where $$k$$ is called the kernel size, $$s$$ is the stride or subsampling factor, and $$f_{ks}$$ determines the layer type: a matrix multiplication for convolution or average pooling, a spatial max for max pooling, or an elementwise nonlinearity for an activation function, and so on for other types of layers.

This functional form is maintained under composition, with kernel size and stride obeying the transformation rule

$$f_{ks} \circ g_{k's'} = (f \circ g)_{k'+(k-1)s',\, ss'}.$$ (2)

While a general deep net computes a general nonlinear function, a net with only layers of this form computes a
```

</details>

## Page-header and Page-footer

Page-header and Page-footer cover marginal content outside the main flow. Widely separated
components of one band MUST be **separate** elements, and a page number alone qualifies as a
Page-footer.

### ✅ **Sample** — `block-header-footer`

![[block-header-footer.svg]]

**Bright green = Page-header · teal = Page-footer · red = Section-header · yellow = Text.** Four
excerpts. A: two Page-headers (file name left, draft stamp right) over Text, a Section-header and
Text. B: two Page-headers (running section title, folio `9`) over two paragraphs. C: a paragraph
over two Page-footers (folio `4`, running title). D: a paragraph over three Page-footers — a
centred `For internal use only`, then the copyright line and the running title. A small solid black
bar after the copyright line carries no text and has no box.

<details>
<summary>Expected Markdown · Example A</summary>

```markdown
**caldrivane-guide.fm**

Draft for Review March 3, 2021 9:12 am

tiered workloads across several access protocols while keeping the ability to grow compute and storage capacity separately when analytics and AI share one namespace.

## Caldrivane Object Store and Tiered Archive

Caldrivane Object Store is a scale-out system for file and object data. It can be deployed as a software-defined storage layer that effectively meets the
```

</details>

<details>
<summary>Expected Markdown · Example B</summary>

```markdown
***1.5 Resulting Goals of VELTRA***

**9**

date. Each participant in the shared exchange wants their own tool to check the item quickly, or at least to be helped in checking it, without relying on the partner to run the same tool securely or simply not to cheat.

This means that records of the steps are needed in a meaningful context, i.e., within the processes they belong to. This is not only desired by both the private and commercial parties for managing their assets, but
```

</details>

<details>
<summary>Expected Markdown · Examples C and D</summary>

```markdown
Borvika Private Cloud Base connects to Caldrivane Object Store through a floating IP address called the Cluster Export Services (CES) IP address. The CES IP address resides on the store.

**4**

Borvika Data Platform Cloud Base with Caldrivane Store
```

```markdown
otherwise specified, all references herein to an Annex to Sections are to Sections of these General Provisions or such Annex, respectively. Certain expressions used in the Agreement are defined at the places indicated in the Index of Defined Terms published by the PMB in connection with these General Provisions.

For internal use only

Copyright © 2021 Tessory

General Provisions · 2021
```

</details>

## Picture, Caption and Table

A Picture MUST include the complete unified graphic but **exclude its Caption**. A Table MUST
include the complete row-column structure but exclude its Caption and surrounding prose. See
[[Block Boundaries]].

### ✅ **Sample** — `block-picture-caption-table`

![[block-picture-caption-table.svg]]

**Pale beige = Picture · orange = Caption · pink = Table · yellow = Text.** Example A: four chart
panels (a)–(d) above one caption — one Picture, one Caption, then two Text columns; the overlay
tints the text, which is transcribed from the page source, and the chart content prints no values
and is elided. Example B: the table of the `block-table-caption-excluded` sample — one Table, one
Caption, one Text.

<details>
<summary>Expected Markdown · Example A</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <!-- … -->
  <caption>FIG. 2. (a) Density of the walker over the two-well landscape at three times. (b) Mean position and (c) its variance against time; the grey bands mark the switching windows. (d) Escape probability for the full and reduced models.</caption>
</table>

starting from the flat state, the potential of the full and reduced models agree to within the error bars over the full time window shown.

For the reduced model the two wells stay separate until the first switching window, after which the
```

</details>

<details>
<summary>Expected Markdown · Example B, excerpt</summary>

```markdown
<table>
  <tr> <th rowspan="2">Set-up</th> <th colspan="2">Training set + Validation set (TRS + VS)</th> <th colspan="2">External testing (ETS)</th> <th rowspan="2">Number of folds for the SKFCV</th> </tr>
  <tr> <th>PL</th> <th>MT</th> <th>PL</th> <th>MT</th> </tr>
  <tr> <td>S1</td> <td>30</td> <td>10</td> <td>30</td> <td>10</td> <td>2</td> </tr>
  <!-- … -->
  <tr> <td><strong>S14</strong></td> <td><strong>90</strong></td> <td><strong>90</strong></td> <td><strong>30</strong></td> <td><strong>10</strong></td> <td><strong>9</strong></td> </tr>
  <caption><strong>Table 1.</strong> Number of records for each set-up of cohort A and simulated cohort A. Balanced set-ups in bold characters.</caption>
</table>

**Sensitivity of the univariate analysis to the number of records.** For the two cohorts, the performance of the univariate classification models was assessed using the area under the ROC curves and the Youden index with its matching sensitivity (Se) and specificity (Sp) values. The optimal cut-off to separate the groups was set at the value that maximized YI.
```

</details>

<!-- skill:generate
- Give every element exactly one class, shared by its layout and Markdown representations: Text, Title, Section-header, List-item, Caption, Footnote, Page-header, Page-footer, Picture, Table, Formula, Checkbox-Selected, Checkbox-Unselected, Code, Document Index, Form, Key-Value Region.
- Title only for the document's own title on its cover; authors, dates and addresses there are Text.
- A caption names or explains an object; a footnote adds a source or note; nearby prose is Text. A regular grid is a Table; irregular entry fields are a Form; a small label/value group without a grid is a Key-Value Region.
- One List-item per item including its marker and continuation lines; a Formula includes its equation number; a checkbox box covers only the mark, never its label.
- Top/bottom margin content is Page-header/Page-footer; widely separated parts of a band are separate elements; a lone page number is a Page-footer.
-->

<!-- skill:check
- FAIL (MUST) if a Title element appears anywhere other than the document's cover title, or front-matter authors/dates/addresses are merged into the Title.
- FAIL (MUST) if a Formula's displayed equation number is outside its Formula element, or a List-item's continuation lines are split from it.
- FAIL (MUST) if a checkbox box includes its label text.
- FAIL (MUST) if an element carries more than one class or none, or its layout class differs from the corresponding Markdown element's class.
- WARN (SHOULD) if ordinary prose next to a figure or table is classed Caption, or a source note is classed Caption instead of Footnote.
-->

## Related

- [[Elements]] — how each class is rendered in Markdown
- [[Block Boundaries]] — where a Picture or Table stops
- [[Document Type]] — which sheet is the cover, and so where Title may appear
- [[Recurring Page Furniture]] — Page-header and Page-footer decided once for the document
- [[Heading Depth Across Pages]] — the depth a Section-header gets once its class is settled
