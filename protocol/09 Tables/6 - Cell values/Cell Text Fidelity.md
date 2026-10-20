---
title: Cell Text Fidelity
rule_id: tables-cell-text-fidelity
status: rule
scope: page
tags: [tables, fidelity, ocr]
---

# Cell Text Fidelity: image vs OCR

> [!success] ✅ Normative
> The text of a cell MUST be what the rendered page shows — not the text layer, not OCR, and not
> what the value ought to be. A character that cannot be read at any zoom MUST be written as
> `[illegible]`, never as a plausible guess.

The text layer and the rendered image disagree at the character level far more often than
expected, and the cost of a single wrong digit depends entirely on who reads the table. The text
layer is a hint about roughly what is there; the image decides.

## Three cells that were read wrong

In each of these the transcription and the OCR agreed with each other — and a zoomed view of the
page proved both wrong:

```text
printed 0.99        → transcribed 0.98      (Age-to-Ultimate factor)
printed 2012.5-(A)  → transcribed 2013.5-(A)
printed 1.0400^(W)  → transcribed 1.04009^(W)
```

A disputed cell SHOULD be settled from a zoomed crop of the cell or from the word coordinates, and
MUST NOT be settled by plausibility. "Plausible" is exactly what produced all three errors above:
`0.98` is a perfectly reasonable factor.

### ❌ **Counter-sample** — `3samehead`

![[zoo-3samehead.png]]

**A plausible value substituted for the printed one.** The page prints `32031.9%` for the `2004+`
*% of Premium* cell; the non-conforming output records `10.9%`. The wrong value is the *believable*
one — exactly the failure this rule prevents. The section lines (*Issue Year*, *Issue Age*) are
bands across the grid.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th></th> <th>Count</th> <th>% of Count</th> <th>Premium</th> <th>% of Premium</th> </tr>
  <tr> <th colspan="5">Issue Year</th> </tr>
  <tr> <td data-level="0">1999</td> <td>80</td> <td>3.5%</td> <td>217,072</td> <td>3.2%</td> </tr>
  <tr> <td data-level="0">2000</td> <td>316</td> <td>13.7%</td> <td>964,763</td> <td>14.2%</td> </tr>
  <tr> <td data-level="0">2001</td> <td>374</td> <td>16.2%</td> <td>1,091,387</td> <td>16.0%</td> </tr>
  <tr> <td data-level="0">2002</td> <td>733</td> <td>31.8%</td> <td>2,110,680</td> <td>31.0%</td> </tr>
  <tr> <td data-level="0">2003</td> <td>570</td> <td>24.7%</td> <td>1,695,230</td> <td>24.9%</td> </tr>
  <tr> <td data-level="0">2004+</td> <td>234</td> <td>10.1%</td> <td>738,975</td> <td>32031.9%</td> </tr>
  <tr> <th data-level="0">Total</th> <td>2,307</td> <td>100.0%</td> <td>6,818,108</td> <td>100.0%</td> </tr>
  <tr> <th colspan="5">Issue Age</th> </tr>
  <tr> <td data-level="0">&lt;30</td> <td>4</td> <td>0.2%</td> <td>4,451</td> <td>0.1%</td> </tr>
  <tr> <td data-level="0">30-34</td> <td>13</td> <td>0.6%</td> <td>17,301</td> <td>0.3%</td> </tr>
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
  <!-- … -->
  <tr> <td>2003</td> <td>570</td> <td>24.7%</td> <td>1,695,230</td> <td>24.9%</td> </tr>
  <tr> <td>2004+</td> <td>234</td> <td>10.1%</td> <td>738,975</td> <td>10.9%</td> </tr>
  <tr> <td>Total</td> <td>2,307</td> <td>100.0%</td> <td>6,818,108</td> <td>100.0%</td> </tr>
  <tr> <th>Issue Age</th> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>&lt;30</td> <td>4</td> <td>0.2%</td> <td>4,451</td> <td>0.1%</td> </tr>
  <tr> <td>30-34</td> <td>13</td> <td>0.6%</td> <td>17,301</td> <td>0.3%</td> </tr>
  <!-- … -->
</table>
```

</details>

## What is printed is what is written

- **Typos stay.** A word misspelled inside a cell MUST keep its misspelling.
- **Numbers are copied digit by digit**, with thousands and decimal separators exactly as printed.
  See [[Accounting Number Formats]].
- **Wrapped codes are not fused with their neighbours.** In a narrow column a code can wrap onto two
  lines, or two short codes can sit in neighbouring cells and look like one. The column boundaries
  and the cell's span decide: fusing `B-2` with `VC`, or `TR-1` with `TR-2`, is an error, and it
  also throws off the column count of the whole row.
- **A blank cell stays empty.** A cell that prints nothing MUST be rendered empty; a dash MUST NOT be
  supplied because the column has dashes elsewhere.

### ❌ **Counter-sample** — `3cc`

![[zoo-3cc.png]]

The page prints `2.5` for the *KVO shareholder* TWh figure; the non-conforming output records `25`
— a dropped decimal point, silently. *Renewable* and *Nuclear* below it are indented one step; the
total row is bold.

<details>
<summary>Expected Markdown · table 2 of 3</summary>

```markdown
<table>
  <tr> <th>Energy production</th> <th>Unit</th> <th>2024</th> </tr>
  <tr> <td data-level="0">Renewable</td> <td>TWh</td> <td>29.5</td> </tr>
  <tr> <td data-level="0">Non-renewable</td> <td>TWh</td> <td>2.9</td> </tr>
  <tr> <td data-level="0">KVO shareholder</td> <td>TWh</td> <td>2.5</td> </tr>
  <tr> <td data-level="1">Renewable</td> <td>TWh</td> <td>0.4</td> </tr>
  <tr> <td data-level="1">Nuclear</td> <td>TWh</td> <td>2.1</td> </tr>
  <tr> <th data-level="0"><strong>Total energy production</strong></th> <td><strong>TWh</strong></td> <td><strong>34.8</strong></td> </tr>
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th>Energy production</th> <th>Unit</th> <th>2024</th> </tr>
  <!-- … -->
  <tr> <td>Non-renewable</td> <td>TWh</td> <td>2.9</td> </tr>
  <tr> <td>KVO shareholder</td> <td>TWh</td> <td>25</td> </tr>
  <tr> <td>Renewable</td> <td>TWh</td> <td>0.4</td> </tr>
  <tr> <td>Nuclear</td> <td>TWh</td> <td>2.1</td> </tr>
  <tr> <td><strong>Total energy production</strong></td> <td><strong>TWh</strong></td> <td><strong>34.8</strong></td> </tr>
</table>
```

</details>

### ❌ **Counter-sample** — `entwick`

![[zoo-entwick.png]]

The reverse error: in the *Rückkauf eigener Anteile* row the *Eigene Anteile* cell is printed
blank, and the non-conforming output **invents** an em dash for it.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <tr> <th></th> <th>Grundkapital</th> <th>Kapitalrücklagen</th> <th>Gewinnrücklagen</th> <th>Sonstige Rücklagen</th> <th>Eigene Anteile</th> <th>Gesellschafter VAG</th> <th>Minderheitenanteile</th> <th>Gesamtkapital</th> </tr>
  <tr> <td data-level="0">1. Jänner 2005</td> <td>218.100</td> <td>1.074.778</td> <td>2.816.854</td> <td>172.965</td> <td>-14.761</td> <td>4.267.936</td> <td>1.493.854</td> <td>5.761.790</td> </tr>
  <tr> <td data-level="0">Unrealisierte Gewinne/Verluste (-)<br/>aus der Bewertung von Wertpapieren:</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td data-level="1">Saldo Gewinn/Verlust (-) der Periode<br/>vor Ertragssteuern</td> <td></td> <td></td> <td></td> <td>200.291</td> <td></td> <td>200.291</td> <td></td> <td>200.291</td> </tr>
  <tr> <td data-level="1">Ertragssteuern</td> <td></td> <td></td> <td></td> <td>-50.009</td> <td></td> <td>-50.009</td> <td></td> <td>-50.009</td> </tr>
  <tr> <td data-level="1">Realisierte, im JÜ ausgewiesene<br/>Gewinne (-)/Verluste vor Ertragssteuern</td> <td></td> <td></td> <td></td> <td>-77</td> <td></td> <td>-77</td> <td></td> <td>-77</td> </tr>
  <tr> <td data-level="1">Ertragssteuern</td> <td></td> <td></td> <td></td> <td>19</td> <td></td> <td>19</td> <td></td> <td>19</td> </tr>
  <tr> <td data-level="0">Rückkauf eigener Anteile</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>0</td> </tr>
  <!-- … -->
</table>
```

</details>

<details>
<summary>Non-conforming output</summary>

```markdown
<table>
  <tr> <th> </th> <th>Grundkapital</th> <th>Kapital-<br/>rücklagen</th> <th>Gewinn-<br/>rücklagen</th> <th>Sonstige<br/>Rücklagen</th> <th>Eigene Anteile</th> <th>Gesellschafter<br/>VAG</th> <th>Minderheiten-<br/>anteile</th> <th>Gesamtkapital</th> </tr>
  <tr> <td>1. Jänner 2005</td> <td>218.100</td> <td>1.074.778</td> <td>2.816.854</td> <td>172.965</td> <td>-14.761</td> <td>4.267.936</td> <td>1.493.854</td> <td>5.761.790</td> </tr>
  <tr> <td>Unrealisierte Gewinne/Verluste (-)<br/>aus der Bewertung von Wertpapieren:</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Saldo Gewinn/Verlust (-) der Periode<br/>vor Ertragssteuern</td> <td> </td> <td> </td> <td> </td> <td>200.291</td> <td> </td> <td>200.291</td> <td> </td> <td>200.291</td> </tr>
  <tr> <td>Ertragssteuern</td> <td> </td> <td> </td> <td> </td> <td>-50.009</td> <td> </td> <td>-50.009</td> <td> </td> <td>-50.009</td> </tr>
  <tr> <td>Realisierte, im JÜ ausgewiesene<br/>Gewinne (-)/Verluste vor Ertragssteuern</td> <td> </td> <td> </td> <td> </td> <td>-77</td> <td> </td> <td>-77</td> <td> </td> <td>-77</td> </tr>
  <tr> <td>Ertragssteuern</td> <td> </td> <td> </td> <td> </td> <td>19</td> <td> </td> <td>19</td> <td> </td> <td>19</td> </tr>
  <tr> <td>Rückkauf eigener Anteile</td> <td></td> <td></td> <td></td> <td></td> <td>—</td> <td></td> <td></td> <td>0</td> </tr>
  <!-- … -->
</table>
```

</details>

## Characters the image cannot tell apart

Some characters are visually identical and no zoom separates them: µ (U+00B5) and μ (U+03BC), a
non-breaking space and an ordinary space, a minus sign and a hyphen.

- The output MUST keep the visible form and the character count exactly as printed, and SHOULD use
  the character normally typed for that glyph.
- The text layer MUST NOT be used to break the tie: it is a hint about the content, never the
  authority on it.
- A consumer or checker MUST treat the members of each family below as equal, so the choice among
  them cannot make an output non-conforming.

| Family | Written as |
| --- | --- |
| µ (U+00B5) ≡ μ (U+03BC) | either |
| non-breaking space ≡ ordinary space | an ordinary space |
| minus sign (U+2212) ≡ hyphen-minus | `-` |
| non-breaking hyphen ≡ hyphen-minus | `-` |
| figure dash, en dash ≡ hyphen, inside a numeric range | either |

The image outranks every other source on **what is printed**. Where two codepoints are
indistinguishable there is no fact about the page for it to be authoritative over — µ and μ *are*
the same ink. The visible form is fidelity and stays exact; the codepoint underneath is a
serialisation detail.

A dash that is *doing something* is not a homoglyph question. An em dash alone in a cell is a value
— see [[Marks and Symbols in Cells]] — and a struck-through digit is not a character variant at all.

### ✅ **Sample** — a true minus sign

![[bag-segment-table-minus-sign.png]]

`−742` and `−2,710` are set with a true minus sign rather than a hyphen, beside `—` for nil. The
minus sign is written as the hyphen-minus `-`; the em dashes stay em dashes. The header cells are
genuinely merged across two rows and wrapped labels are joined; the *Net Sales* and *Other Items*
bands are bold where the headings are not.

<details>
<summary>Expected Markdown</summary>

```markdown
<table>
  <tr> <th rowspan="2"></th> <th colspan="2">Reporting Segments</th> <th rowspan="2">Total</th> <th rowspan="2">Adjustments (Note 1)</th> <th rowspan="2">Amount Presented in Consolidated Statements of Income (Note 2)</th> </tr>
  <tr> <th>Home Goods</th> <th>Wellness</th> </tr>
  <tr> <th colspan="6"><strong>Net Sales</strong></th> </tr>
  <tr> <td data-level="0">(1) Sales to Outside Customers</td> <td>712,884</td> <td>198,240</td> <td>911,124</td> <td>—</td> <td>911,124</td> </tr>
  <tr> <td data-level="0">(2) Inter-segment Sales and Transfers</td> <td>722</td> <td>20</td> <td>742</td> <td>-742</td> <td>—</td> </tr>
  <tr> <th data-level="0">Total</th> <td>713,606</td> <td>198,260</td> <td>911,866</td> <td>-742</td> <td>911,124</td> </tr>
  <tr> <td data-level="0">Income by Segment</td> <td>58,240</td> <td>19,905</td> <td>78,145</td> <td>-2,710</td> <td>75,435</td> </tr>
  <tr> <td data-level="0">Segment Assets</td> <td>744,610</td> <td>288,904</td> <td>1,033,514</td> <td>1,802</td> <td>1,035,316</td> </tr>
  <tr> <th colspan="6"><strong>Other Items</strong></th> </tr>
  <tr> <td data-level="0">Depreciation</td> <td>38,204</td> <td>8,116</td> <td>46,320</td> <td>280</td> <td>46,600</td> </tr>
  <tr> <td data-level="0">Investment in equity-method affiliates</td> <td>26,415</td> <td>—</td> <td>26,415</td> <td>—</td> <td>26,415</td> </tr>
</table>
```

</details>

## What else rests on the image

- [[Duplicated Tables]] — the rendered page decides whether a repeated table is really printed twice.
- [[Struck and Replaced Values]] — OCR silently joins a struck value to its replacement and produces
  a number that appears nowhere on the page. Only the image catches it.

<!-- skill:generate
- Read every table cell off the page image, digit by digit; never copy a text layer or OCR, and never "fix" a value that looks implausible.
- Keep typos, keep separators, keep blank cells blank — never supply a dash or zero for a cell that prints nothing.
- Do not fuse text from two neighbouring cells or two wrapped codes into one cell.
- If a character cannot be read at all, write [illegible] for it rather than guessing.
- Write a printed minus sign (−) as the hyphen-minus "-".
-->

<!-- skill:check
- FAIL (MUST) if any character, digit or decimal point of a cell differs from the page image.
- FAIL (MUST) if a cell printed blank on the page contains text in the Markdown (a dash, zero or other filler).
- FAIL (MUST) if text from two separately printed cells is merged into one cell, or one cell's text is split across two.
- FAIL (MUST) if a cell contains a guessed value where the page is illegible instead of [illegible].
-->

## Related

- [[The Page Is the Ground Truth]] — the principle this rule applies to cells
- [[Accounting Number Formats]] — verbatim numbers, signs and separators
- [[Struck and Replaced Values]] — the image separates a struck value from its replacement
- [[Duplicated Tables]] — the image decides whether a table is printed twice
- [[Borderless Whitespace Tables]] — column boundaries without rules, where fused cells are most likely
