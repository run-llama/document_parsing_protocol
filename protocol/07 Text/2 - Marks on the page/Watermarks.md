---
title: Watermarks
rule_id: text-watermarks
status: rule
scope: page
tags: [text, marks, layout]
---

# Watermarks

> [!success] ✅ Normative
> A watermark MUST NOT be deleted and MUST NOT be left inside the body text. It MUST be rendered once
> per page that prints it, as its own element at the top of that page's content:
> `[watermark: DRAFT]`.

Diagonal or background text stamped across the page — "DRAFT", "Redline Version", "CONFIDENTIAL",
"VOID".

![[watermark.png]]

## Requirements

- The watermark is its own element, not a phrase inside the text it happens to cross.
- It is written as the protocol's bracket marker, `[watermark: …]`, carrying its words exactly as
  printed, and placed first in the page's content — not in the middle of the paragraph or table row
  it physically overlaps.
- A watermark printed on several lines is one marker, its lines joined with a space.
- It is recorded on every page that prints it, and not carried onto a page that does not.

```markdown
[watermark: Redline Version]
```

## Why not simply drop it

A watermark says something about the whole document, and it is often the single most important fact
on the page. "Redline Version" says that every figure in [[Struck and Replaced Values]] is in play;
"VOID" invalidates everything underneath it. Removing it silently loses real information.

## Why not leave it inline

The watermark overlaps body text physically. Rendered in place, it injects a stray phrase into the
middle of a sentence or splits a table row — corrupting content that was otherwise clean.

Keeping it as a separate element gets both: the fact is recorded and the text stream stays intact.
The bracket marker is the same shape as the protocol's other marks laid on a page — `[seal: …]`,
`[logo: …]`, `[signature]` — see [[Markdown Rendering]].

### ✅ **Sample** — a diagonal stamp across a pay stub

![[bag-pay-stub-not-a-check.png]]

`THIS IS NOT A CHECK` printed diagonally across the cheque-shaped lower half of an earnings
statement, with `NON–NEGOTIABLE` beneath it. Both cross printed text; neither enters the lines
they cross.

<details>
<summary>Expected Markdown</summary>

```markdown
[watermark: THIS IS NOT A CHECK NON–NEGOTIABLE]

**Harrowgate Retail Solutions LLC**
Earnings Statement

Pay period: 04/28/2025 – 05/11/2025
Pay date: 05/16/2025

<table>
  <tr> <th>Employee</th> <td>Delia M. Okonkwo</td> <th>Employee ID</th> <td>88213</td> </tr>
  <tr> <th>Rate</th> <td>$19.50/hr</td> <th>Hours</th> <td>76.00</td> </tr>
  <tr> <th>Gross Pay</th> <td>$1,482.00</td> <th>Net Pay</th> <td>$1,109.44</td> </tr>
  <tr> <th>Federal Tax</th> <td>$178.20</td> <th>State Tax</th> <td>$62.60</td> </tr>
  <tr> <th>Social Security</th> <td>$91.88</td> <th>Medicare</th> <td>$21.49</td> </tr>
  <tr> <th>Retirement 401(k)</th> <td>$18.39</td> <th>YTD Net</th> <td>$9,984.96</td> </tr>
</table>

Pay to the order of: Delia M. Okonkwo
Amount: \*\*\*One thousand one hundred nine and 44/100 dollars\*\*\*
Bank: Harrowgate Retail Solutions Payroll Account — 04-2201-88213
```

</details>

### ✅ **Sample** — a watermark across a form grid

![[bag-contract-sample-watermark.png]]

`Sample` in large grey letters diagonally across a mostly empty project grid, crossing cells that
hold checkbox lists. Same placement: once, out of the grid, at the top of the page.

<details>
<summary>Expected Markdown · excerpt, watermark and grid header</summary>

```markdown
[watermark: Sample]

<!-- … -->

<table>
  <tr> <th></th> <th>1</th> <th>2</th> <th>3</th> <th>4</th> </tr>
  <!-- … -->
</table>

<!-- … -->
```

</details>

<!-- skill:generate
- Never drop a watermark (DRAFT, VOID, Sample, a diagonal stamp across the page) and never put its words inside the sentence or table row it crosses.
- Write it once per page that prints it, as the first thing in that page's content: [watermark: DRAFT]. A watermark on several lines is one marker with its lines joined by a space.
- Do not repeat it on pages that do not print it.
-->

<!-- skill:check
- FAIL (MUST) if a watermark printed on the page is missing from that page's Markdown.
- FAIL (MUST) if watermark words appear inside a body sentence, list item or table cell.
- FAIL (MUST) if a watermark is not written as [watermark: …] at the top of its page, or appears on a page that does not print it.
-->

## Related

- [[Margin Banners]] — rotated text in the margin that does not cross the body
- [[Handwriting and Stamps]] — the stamp equivalent, over a grid
- [[Overlapping Text]] — a stamp laid over a header rather than across the body
