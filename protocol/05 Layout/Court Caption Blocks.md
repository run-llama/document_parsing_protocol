---
title: Court Caption Blocks
rule_id: layout-court-caption-blocks
status: rule
scope: page
tags: [layout, legal, forms]
---

# Court Caption Blocks

> [!success] ✅ Normative
> Every printed string of a court caption MUST be transcribed, the left column as one block of lines
> and then the right column, each printed line on its own line. Blank party and case-number lines
> MUST be `[blank]`. The `§` divider and the rules MUST NOT be transcribed, and the caption MUST NOT be
> rendered as a table.

The head of a court filing: the parties stacked on the left (`Plaintiff`, `v.`, `Defendant`), a
divider — a vertical rule, a column of `§` signs, or a box edge — and the court, case number and
document title on the right.

```text
______________________,        §    IN THE JUSTICE COURT
PLAINTIFF                      §
v.                             §    PRECINCT NO. __________
______________________,        §
DEFENDANT                      §    GREGG COUNTY, TEXAS
```

The `§` column is the one thing that is not content; everything else is.

## Requirements

- Every printed string of the caption MUST appear in the output, including labels such as
  `PLAINTIFF` and `v.`.
- The left column MUST come first and the right column after it, each as one block, each printed
  line on its own line within its block. Where the caption has more than two cells, they are taken
  left to right, one block each.
- A blank party line or case-number line MUST be `[blank]`, with its printed label beside it — see
  [[Blanks Inside Sentences]].
- The caption MUST NOT be rendered as a two-column table, a key-value list, or row by row
  alternating left and right. The `§` divider and the rules MUST NOT be transcribed.

### ✅ **Sample** — a subpoena caption

![[bag-county-subpoena.png]]

Under a centred court heading, a ruled box of three cells: two blank party lines with `vs` between
them on the left; `CASE NUMBER` over a blank line and the three-line title `SUBPOENA` / `FOR` /
`DEPOSITION` in the centre; an empty `File Stamp Here` box on the right. The cells are taken left
to right, each as one block of lines. On this page `SUBPOENA FOR DEPOSITION` is the document's own
title, so it is rendered as the document heading, its three printed lines joined. The page header
line above is elided.

<details>
<summary>Expected Markdown · excerpt, court heading and caption box</summary>

```markdown
<!-- … -->

**STATE OF WYVERNE** **COUNTY OF HALBROOK**
IN THE CIRCUIT COURT OF THE TWELFTH JUDICIAL CIRCUIT

[blank]
**vs**
[blank]

**CASE NUMBER**
[blank]

# SUBPOENA FOR DEPOSITION

**File Stamp Here**

<!-- … -->
```

</details>

### ✅ **Sample** — a `§` divider

![[bag-answer-caption-dividers.png]]

A bold `CAUSE NO.` line with its blank above the caption; blank party lines with `PLAINTIFF`,
`v.` and `DEFENDANT` on the left, a column of seven `§` on the divider, and the court, the
precinct (with its blank) and the county on the right. The `§` column is dropped; the left block
comes before the right.

<details>
<summary>Expected Markdown · excerpt, caption</summary>

```markdown
**CAUSE NO.** [blank]

[blank]
PLAINTIFF
v.
[blank]
DEFENDANT

**IN THE JUSTICE COURT**
**PRECINCT NO.** [blank]
**BORVIKA COUNTY, HALVANA**

<!-- … -->
```

</details>

<!-- skill:generate
- For the caption block at the head of a court filing: transcribe the left column (party lines and labels such as PLAINTIFF, v., DEFENDANT) as one block of lines, then the right column (court, case number, title) as another block, each printed line on its own line; with more than two cells, take them left to right.
- Write each blank party or case-number line as [blank], next to its printed label.
- Drop the § divider column and the rules; never build a table, a key-value list or an alternating row-by-row reading.
-->

<!-- skill:check
- FAIL (MUST) if any printed string of a court caption (party labels, v., court name, case number label, title) is missing from the Markdown.
- FAIL (MUST) if a court caption is rendered as a table or a key-value list, or alternates left and right lines row by row.
- FAIL (MUST) if the § divider signs are transcribed, or a blank party or case-number line is not [blank].
-->

## Related

- [[Blanks Inside Sentences]] — the party lines are blanks with the label beneath
- [[Reading Order]] — column flow versus row flow
- [[Is This Even a Table]] — the test that says this is not one
