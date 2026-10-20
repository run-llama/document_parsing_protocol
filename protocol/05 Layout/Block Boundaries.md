---
title: Block Boundaries
rule_id: layout-block-boundaries
status: rule
scope: page
tags: [rule, layout, blocks]
---

# Block Boundaries

> [!success] ✅ Normative
> A Picture or Table element MUST contain the **complete object and nothing else**. Its caption, its
> title, its source note and nearby prose MUST NOT be absorbed into it; each is an element of its own.

In the diagrams below the overlays show boxes by class colour; a red ✗ or green ✓ marks an incorrect
or a correct boundary and is not a class colour.

## Picture boundaries

A Picture MUST include the **full unified graphic** — plots, axes, tick labels, legends, arrows,
symbols, and any text drawn inside the graphic. Clipping the axis labels or the legend off a chart
is the common error, and it removes exactly the parts that make the chart readable. A caption
printed outside the graphic stays a separate Caption element.

### ✅ **Sample** — `block-picture-boundary`

![[block-picture-boundary.svg]]

**Pale beige = Picture · orange = Caption · yellow = Text.** Example A is a storage diagram whose
bold line `Storage nodes with mixed client hosts` is drawn inside the graphic, so the correct box
(✓) is one Picture that includes it; the ✗ box splits it off as a Caption. Example B is a bar chart:
the correct box (✓) is one Picture that includes the rotated `Precision` axis title, the tick
labels and the `Dataset` axis title; the ✗ box clips the plot area and files the two axis titles
as Text and Caption. Expected boxes: one Picture per example, nothing else.

<details>
<summary>Expected Markdown · Example A</summary>

````markdown
```diagram/mermaid
flowchart TD
  F[Shared fabric] --- A[Node A<br/>client]
  F --- B[Node B<br/>client]
  F --- C[Node C<br/>client]
  F --- D[Node D<br/>client]
  A ---|NSD| S[Store]
  B ---|NSD| S
  C --- S
```

**Storage nodes with mixed client hosts**
````

</details>

<details>
<summary>Expected Markdown · Example B</summary>

```markdown
Precision

<table data-source="chart">
  <tr> <th>Dataset</th> <th>Stochastic</th> <th>Deterministic</th> </tr>
  <tr> <td>Corpus-A</td> <td>0.84</td> <td>0.82</td> </tr>
  <tr> <td>Corpus-B</td> <td>0.62</td> <td>0.60</td> </tr>
  <tr> <td>Corpus-C</td> <td>0.73</td> <td>0.71</td> </tr>
</table>
```

</details>

The bars print no values; the values above are read against the printed 0.55–0.85 axis.

## One caption or several

- **One caption shared across several panels → one Picture element.**
- **Separate captions → separate Picture elements.**

The caption says what the author considered one figure. Multi-panel figures labelled `a)`, `b)`,
`c)` under a single caption MUST be one Picture; the same panels each with their own caption MUST
be several.

### ✅ **Sample** — `block-picture-grouping`

![[block-picture-grouping.svg]]

**Pale beige = Picture · orange = Caption · red = Section-header · yellow = Text.** Two columns of
an article. Four chart panels (a)–(d) above `FIG. 3.` form one Picture; two panels (a)–(b) above
`FIG. 4.` form a second. Each caption is its own element. Expected boxes, left column then right:
Picture, Caption, Section-header, Text; Picture, Caption, Text, Text, Text. The overlay tints the
text; it is transcribed from the page source. The chart content of the two Pictures prints no
values and is elided.

<details>
<summary>Expected Markdown</summary>

```markdown
<!-- … -->

<table data-source="chart">
  <!-- … -->
  <caption><strong>FIG. 3.</strong> (a) Mean passage time $$\tau$$ and (b) its spread $$\sigma$$ as a function of the bias for the walkers A, B and C. (c) Variance of the escape time; the inset shows the peak region. (d) Second-passage probability for the same three walkers, plotted against the rescaled distance.</caption>
</table>

### C. Coarse chain

It is a coarse-grained model of a short chain. The model is of higher complexity than the walkers used in the previous section, having rougher free-energy landscapes and several stable states.

<!-- … -->

<table data-source="chart">
  <!-- … -->
  <caption><strong>FIG. 4.</strong> (a) Free-energy map over the two angles; the metastable states are marked by dots. (b) Transition rate $$\kappa$$ against temperature for the forward and reverse bias.</caption>
</table>

the external forces are chosen to test the effectiveness of the reweighting procedure for conservative and non-conservative forces.

The free-energy map is shown in Figure 4a using the two angles as coordinates. Three metastable states were identified, representing the folded state, the unfolded state and an intermediate state. The dynamics is typically metastable, as the states lie in separate basins, and the intermediate state is placed slightly to the right of the middle.

Second, we apply a non-conservative force along the chain. A force of this size keeps the system in equilibrium; on the other hand, we can also drive it out of equilibrium into a NESS along the chain.
```

</details>

## Table boundaries: the caption has its own box

The Table element MUST include the complete grid, its headers, aligned totals and all column
content. It MUST exclude the table's title, its caption, its source note, and any prose beside it.

These are layout boundaries. A table or chart caption is rendered as `<caption>` inside its
object's HTML table, first or last according to reading order, while retaining its own Caption
class and box. See [[Titles Banners Captions]].

### ✅ **Sample** — `block-table-caption-excluded`

![[block-table-caption-excluded.svg]]

**Pink = Table · orange = Caption · yellow = Text.** A two-tier grid, its caption `Table 1.` below
it and a paragraph with a bold run-in heading. Expected boxes: one Table around the grid only, one
Caption, one Text. Rows S10–S14 are printed bold.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th rowspan="2">Set-up</th> <th colspan="2">Training set + Validation set (TRS + VS)</th> <th colspan="2">External testing (ETS)</th> <th rowspan="2">Number of folds for the SKFCV</th> </tr>
  <tr> <th>PL</th> <th>MT</th> <th>PL</th> <th>MT</th> </tr>
  <tr> <td>S1</td> <td>30</td> <td>10</td> <td>30</td> <td>10</td> <td>2</td> </tr>
  <tr> <td>S2</td> <td>60</td> <td>20</td> <td>30</td> <td>10</td> <td>2</td> </tr>
  <tr> <td>S3</td> <td>90</td> <td>30</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td>S4</td> <td>120</td> <td>40</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td>S5</td> <td>150</td> <td>50</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td>S6</td> <td>180</td> <td>60</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td>S7</td> <td>210</td> <td>70</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td>S8</td> <td>240</td> <td>80</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td>S9</td> <td>270</td> <td>90</td> <td>30</td> <td>10</td> <td>3</td> </tr>
  <tr> <td><strong>S10</strong></td> <td><strong>30</strong></td> <td><strong>30</strong></td> <td><strong>30</strong></td> <td><strong>10</strong></td> <td><strong>3</strong></td> </tr>
  <tr> <td><strong>S11</strong></td> <td><strong>45</strong></td> <td><strong>45</strong></td> <td><strong>30</strong></td> <td><strong>10</strong></td> <td><strong>4</strong></td> </tr>
  <tr> <td><strong>S12</strong></td> <td><strong>60</strong></td> <td><strong>60</strong></td> <td><strong>30</strong></td> <td><strong>10</strong></td> <td><strong>6</strong></td> </tr>
  <tr> <td><strong>S13</strong></td> <td><strong>75</strong></td> <td><strong>75</strong></td> <td><strong>30</strong></td> <td><strong>10</strong></td> <td><strong>7</strong></td> </tr>
  <tr> <td><strong>S14</strong></td> <td><strong>90</strong></td> <td><strong>90</strong></td> <td><strong>30</strong></td> <td><strong>10</strong></td> <td><strong>9</strong></td> </tr>
  <caption><strong>Table 1.</strong> Number of records for each set-up of cohort A and simulated cohort A. Balanced set-ups in bold characters.</caption>
</table>

**Sensitivity of the univariate analysis to the number of records.** For the two cohorts, the performance of the univariate classification models was assessed using the area under the ROC curves and the Youden index with its matching sensitivity (Se) and specificity (Sp) values. The optimal cut-off to separate the groups was set at the value that maximized YI.
```

</details>

## Table boundaries: the structure, not the ink

The Table element MUST follow the **actual row-column structure**, not every visible rule around
it. Decorative borders, section rules and frame lines drawn around a table are not part of it.
There MUST be **exactly one** Table element around the full table, and no region-level element for
its rows, columns, cells or internal text.

### ✅ **Sample** — `block-table-structure`

![[block-table-structure.svg]]

**Pink = Table · red = Section-header · yellow = Text.** A three-row grid inside a frame that
continues down around the notes below it. Expected boxes: one Table that stops after the grid's
last row, then five Text elements and one Section-header (`IMPORTANT!`) for the framed prose. The
deadline cell is printed bold in red; the colour is emphasis and is not carried.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th>Subject of the tender</th> <th>Maximum budget</th> </tr>
  <tr> <td><strong>LOT 3 -</strong> Supply of field radios for regional training exercises</td> <td>A maximum budget of <strong>€450.000,00 (four hundred and fifty thousand euro)</strong> over the maximum possible period of 2 years</td> </tr>
  <tr> <td>Last date for dispatch of offers</td> <td><strong>21<sup>st</sup> May 2021 until 17:00 CET</strong></td> </tr>
</table>

***PLEASE NOTE:*** *This tender procedure is limited to tenderers which are legally established in a member state of the Norvessa Union, or which have an established subsidiary in one of the Norvessa member states. (The Framework on Joint Purchasing does not apply to Norvessa Union agencies.)*

## IMPORTANT!

**Provisions relating to the Kestrel transition**

*For Kestrel candidates or tenderers:*

*Please be aware that after Kestrel leaves the Union, the rules of access to Norvessa procurement procedures of economic operators established in third countries will apply to candidates or tenderers from Kestrel depending on the outcome of the negotiations.*

*In case such access is not provided by legal provisions in force, candidates or tenderers from Kestrel could be rejected from the procurement procedure.*
```

</details>

<!-- skill:generate
- A chart or figure is one element including its axes, tick labels, axis titles, legend and any text drawn inside the graphic; a caption printed outside the graphic is a separate caption element.
- Panels under one shared caption are one figure; panels with their own captions are separate figures.
- A table element covers the grid only (headers, rows, aligned totals); its title, caption, source note and surrounding prose are separate elements, even when a decorative frame encloses them together.
-->

<!-- skill:check
- FAIL (MUST) if a Picture box clips its axis labels, axis titles, legend or in-graphic text, or those are output as separate elements.
- FAIL (MUST) if an external caption, title, source note or nearby prose is included in a Table or Picture box instead of its own box; nesting a Caption's <caption> in the table HTML does not merge its layout box or class.
- FAIL (MUST) if panels sharing one caption are split into several Pictures, or panels with separate captions are merged into one.
- FAIL (MUST) if a table is represented by more than one Table element at region level, or its box extends over prose inside a decorative frame.
-->

## Related

- [[Block Classes]] — the classes these boundaries separate
- [[Block Annotation]] — what gets an element and how its box is drawn
- [[Titles Banners Captions]] — what belongs *inside* a table once its content is rendered
- [[Bottom Edge Totals and Islands]] — totals that still belong to the grid
- [[Cover Every Data Point]] — the content of a chart Picture
