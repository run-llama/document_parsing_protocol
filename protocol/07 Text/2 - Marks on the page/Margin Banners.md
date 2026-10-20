---
title: Margin Banners
rule_id: text-margin-banners
status: rule
scope: page
tags: [text, marks, layout]
---

# Margin Banners

> [!success] ✅ Normative
> Rotated text printed along a side margin MUST be rendered once, as a furniture block of its own
> outside the body flow, with its words kept — branding included. It MUST NOT be tagged as a
> watermark unless it actually overlays the content.

Text printed rotated along the page margin, outside the content area: an archive stamp, a brand
line, a firm mark. Unlike a [[Watermarks|watermark]] it does not overlap the content, and unlike a
page header it is not in the top or bottom margin.

```text
 U │                                         │
 S │  Overview of Risk Ranking Symbols       │
   │                                         │
 E │  One way to rank environmental impacts  │
 P │  …                                      │
 A │                                         │
```

## Requirements

- The words MUST be kept. Some banners are document metadata — "US EPA ARCHIVE DOCUMENT" tells the
  reader the document is superseded, the same kind of fact "DRAFT" carries. Branding is printed
  text too, and MUST NOT be dropped as decoration.
- The banner MUST be one block of its own, rendered once on the page, and MUST NOT be spliced into
  a body sentence, table or list.
- The `[watermark: …]` marker MUST NOT be used for text that does not cross the content.
- The rotation MUST NOT be described. The words are the content.
- The samples place the banner at the start of its page's content.

### ✅ **Sample** — an archive stamp down the left margin

![[bag-epa-archive-banner.png]]

"US EPA ARCHIVE DOCUMENT" printed vertically in a red band, full page height, beside an ordinary
text-and-table page. The banner carries a fact about the document that appears nowhere else on it.

<details>
<summary>Expected Markdown · excerpt, banner and page bands</summary>

```markdown
US EPA ARCHIVE DOCUMENT

***SPECIALTY-BATCH CHEMICAL MANUFACTURING INDUSTRY — EMS IMPLEMENTATION GUIDE***

<!-- … -->

***Appendix D — 8***
```

</details>

### ✅ **Sample** — a brand line on a slide

![[bag-slide-margin-banner.png]]

"PRECISION & MOTION" runs down a decorative band on the left of the slide. This is branding, but
it is still printed text.

<details>
<summary>Expected Markdown</summary>

```markdown
PRECISION & MOTION

# Interest-Bearing Debts

Borvika Bearings AB — Investor Presentation, FY2025

<table>
  <tr> <th>Instrument</th> <th>Currency</th> <th>Rate</th> <th>Maturity</th> <th>Balance (SEK mn)</th> </tr>
  <tr> <td>Senior unsecured bond</td> <td>SEK</td> <td>3.85%</td> <td>2027</td> <td>1,250</td> </tr>
  <tr> <td>Term loan A</td> <td>EUR</td> <td>4.10%</td> <td>2026</td> <td>640</td> </tr>
  <tr> <td>Term loan B</td> <td>EUR</td> <td>4.40%</td> <td>2029</td> <td>480</td> </tr>
  <tr> <td>Revolving credit facility</td> <td>SEK</td> <td>3.60%</td> <td>2028</td> <td>210</td> </tr>
  <tr> <td>Lease liabilities</td> <td>SEK</td> <td>2.90%</td> <td>2030</td> <td>95</td> </tr>
  <tr> <td><strong>Total interest-bearing debt</strong></td> <td></td> <td></td> <td></td> <td><strong>2,675</strong></td> </tr>
</table>

Weighted average cost of debt for the period was 3.9%, down from 4.2% in the prior year, reflecting the refinancing of Term loan A at a lower margin.
```

</details>

### ✅ **Sample** — a firm mark on pleading paper

![[bag-pleading-vendor-mark.png]]

A small rotated wordmark, `ARCLIGHT LEGAL COPY SERVICES`, in the left margin of a court filing,
beside the line numbers.

<details>
<summary>Expected Markdown · excerpt, the banner</summary>

```markdown
ARCLIGHT LEGAL COPY SERVICES

<!-- … -->
```

</details>

### ✅ **Sample** — a download stamp on a journal article

![[bag-journal-download-banner.png]]

`Downloaded via VARENBROOK UNIV on February 22, 2021 … See https://pubs.velmora.example/sharingguidelines`
rotated up the left margin of a first page, in two lines. Metadata about this copy, printed
nowhere else.

<details>
<summary>Expected Markdown · excerpt, the banner</summary>

```markdown
Downloaded via VARENBROOK UNIV on February 22, 2021 at 01:49:16 (UTC).
See https://pubs.velmora.example/sharingguidelines for options on how to legitimately share published articles.

<!-- … -->
```

</details>

<!-- skill:generate
- Transcribe rotated text printed along a side margin (archive stamps, brand lines, download notices, firm marks) as one separate paragraph, once per page, placed at the start of the page's content.
- Keep its words verbatim, including pure branding; do not describe the rotation.
- Never splice it into body sentences, tables or lists, and never write it as [watermark: …] unless it crosses the body content.
-->

<!-- skill:check
- FAIL (MUST) if the words of a rotated margin banner are missing from the page's Markdown.
- FAIL (MUST) if margin-banner text appears inside a body sentence, table cell or list item.
- FAIL (MUST) if a margin banner that does not cross the content is written as [watermark: …].
- WARN (SHOULD) if the same banner appears more than once on one page.
-->

## Related

- [[Watermarks]] — the same question for text that crosses the body
- [[Pleading Line Numbers]] — the other margin furniture on the third sample
- [[Block Classes]] — page-header and page-footer cover the top and bottom margins only
- [[Recurring Page Furniture]] — a band that is furniture on one page is furniture on all
