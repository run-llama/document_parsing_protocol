---
title: Dot Leader Lines
rule_id: text-dot-leader-lines
status: rule
scope: page
tags: [text, rule, layout]
---

# Dot Leader Lines

> [!success] ✅ Normative
> Dot leaders MUST NOT appear in the output. The label and the value on either side of a leader
> MUST be kept exactly as printed; the dots themselves produce nothing.

> [!info] A deliberate exception to verbatim transcription
> Everywhere else printed ink survives — see [[Values Are Verbatim]] and [[Cell Text Fidelity]].
> Dot leaders are the one carve-out: they exist only to guide the eye across a gutter and carry no
> information.

A dot leader is a run of dots filling horizontal space between a label and a value, most often in a
table of contents, a directory or a price list.

```text
Chapter 3 — Reserving  . . . . . . . . . . . . . .  47
```

## Requirements

- A run of leader dots MUST be removed wherever it is printed: in running text, in a directory
  line and in a table's stub cell.
- The label and every value the leader connects MUST be kept, verbatim. **The dots go; everything
  they connect stays.**
- Removing a leader MUST NOT split a label or a value, and a leader MUST NOT be absorbed into
  either side (no trailing dots on a label, no leading dots on a number).
- Where a leader separates two values on one line, the values remain on that line, separated by a
  space.

A dot leader is typesetting, not content: it exists because a label and a number are far apart on
the line, and it disappears the moment the text is reflowed. Transcribing it damages what is around
it — a run of dots inside a label breaks any string match on that label.

### ✅ **Sample** — leader lines with two values at the end

![[bag-court-directory-leaders.png]]

A court directory: each person's line runs a dot leader to an e-mail address in grey and a phone
number at the margin. Some lines have no e-mail, so the leader runs straight to the number. This
is **text, not a table**: one line per person, leaders removed, the values separated by spaces.
The grey of the e-mail addresses is decoration and is not carried. Heading depths are relative:
the page does not show where `CALDRIVANE COUNTY` sits in the whole directory.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
## CALDRIVANE COUNTY

### SUPERIOR COURT

*Location: 410 Willowmere Dr, Cassilport, HV 98511*
*Mailing: PO Box 82, Cassilport, HV 98511-0082*
*Phone: 360-822-4410*
*Fax: 360-822-4419*
*Website: www.caldrivanecounty.example/courts/superior/*

Rowan T. Ferland, Judge 360-822-4410

Odalys M. Granger, Court Administrator ogranger@caldrivanecounty.example 360-822-4410

<!-- … -->

### SOUTH CALDRIVANE DISTRICT COURT

*6042 Ridgeglen Road, Farrowmede, HV 98651*
*Phone: 360-641-9017*
*Fax: 360-641-9016*
*Website: www.caldrivanecounty.example/courts/sdc/*

Callan R. Whitmore, Judge 360-641-9017

Noor E. Basile, Judge 360-641-9017 ext 2214

Ilona P. Marchetti, Administrator sdclerks@caldrivanecounty.example 360-641-9017

<!-- … -->
```

</details>

### ✅ **Sample** — leaders inside a financial table

![[bag-dot-leader-stub.png]]

Two goodwill tables whose stub labels run dot leaders to the first value column —
`Balances as of January 1, 2002 . . . . . . .` — inside an otherwise ordinary `$`-gutter table.
The leaders go; the columns stay. The `(In millions)` line is rendered as a second header row.

<details>
<summary>Expected Markdown · tables 1 and 2</summary>

```markdown
<table>
  <tr> <th></th> <th>Pipelines</th> <th>Production</th> <th>Field Services</th> <th>Terminal Services</th> <th>Corporate &amp; Other</th> <th>Total</th> </tr>
  <tr> <th></th> <th colspan="6">(In millions)</th> </tr>
  <tr> <td>Balances as of January 1, 2002</td> <td>$390</td> <td>$58</td> <td>$371</td> <td>$84</td> <td>$235</td> <td>$1,138</td> </tr>
  <tr> <td>Impairments</td> <td>—</td> <td>—</td> <td>—</td> <td>(37)</td> <td>—</td> <td>(37)</td> </tr>
  <tr> <td>Other changes</td> <td>—</td> <td>1</td> <td>8</td> <td>—</td> <td>(4)</td> <td>5</td> </tr>
  <tr> <td>Balances as of December 31, 2002</td> <td>$390</td> <td>$59</td> <td>$379</td> <td>$47</td> <td>$231</td> <td>$1,106</td> </tr>
</table>

<!-- … -->

<table>
  <tr> <th></th> <th>2002</th> <th>2001</th> </tr>
  <tr> <th></th> <th colspan="2">(In millions)</th> </tr>
  <tr> <td>Intangible assets subject to amortization</td> <td>$44</td> <td>$51</td> </tr>
  <tr> <td>Accumulated amortization</td> <td>(21)</td> <td>(15)</td> </tr>
  <tr> <td></td> <td>23</td> <td>36</td> </tr>
  <tr> <td>Intangible assets not subject to amortization</td> <td>142</td> <td>142</td> </tr>
  <tr> <td></td> <td>$165</td> <td>$178</td> </tr>
</table>
```

</details>

<!-- skill:generate
- Drop dot leaders (runs of . or … filling space between a label and a value) everywhere: in text lines, contents pages and table stub cells.
- Keep the label and every value the leader connects, verbatim; on one line, separate the values with a single space, e.g. "Rowan T. Ferland, Judge 360-822-4410".
- Never leave dots attached to a label ("Impairments . . .") or to a number.
-->

<!-- skill:check
- FAIL (MUST) if a run of leader dots from the page appears in the Markdown, in text or inside a table cell.
- FAIL (MUST) if a label or value that a leader connected is missing, split, or moved off its line.
-->

## Related

- [[Table of Contents]] — the page type where leaders are most common
- [[Line Separators and Breaks]] — a printed rule between blocks, which is kept
- [[Values Are Verbatim]] — the verbatim rule this note is the exception to
