---
title: Handwriting and Stamps
rule_id: tables-handwriting-and-stamps
status: rule
scope: page
tags: [tables, marks, redline]
---

# Handwriting & Stamps Over Printed Grids

> [!success] ✅ Normative
> **Handwriting over a printed value** MUST keep both, the struck-through printed value first:
> `~~60~~ 55` — the same markup as a printed redline replacement. **A stamp** over a table MUST keep
> its text and MUST be rendered **outside the table**, as page-level content; it MUST NOT be
> assigned to a cell.

Filled-in ledgers and approved/void stamps put ink on top of a grid that was printed empty.

```text
| Qty | Description | Amount |
| 2   | Widget      | ~60~ 55 (handwritten) |  ← replaces? joins? annotates?

     [ APPROVED ]   ← stamp overlapping three cells: which cell gets it? any?
```

## Handwriting over a printed value

The cell MUST hold the printed value struck through, then the handwritten one:

```text
page shows:   60 (printed, crossed out)   55 (handwritten)
rendered as:  ~~60~~ 55
```

**This is deliberately the same markup as [[Struck and Replaced Values]].** A printed correction and
a handwritten one are the same act — a value replaced in place — and the ink used to make the
change is not what a consumer needs to know. One encoding covers both, so nothing downstream has to
distinguish a pen from a strikethrough font to read the cell.

The printed and the handwritten digits MUST NOT be merged into one number. OCR readily runs them
together and produces a number that appears nowhere on the page and looks entirely reasonable; the
image decides which glyphs are printed and which are written, and they are recorded as two values.

Handwriting that adds a value where the printed cell was empty is simply the cell's content.

## Stamps

A stamp belongs to the page, not to a cell. It overlaps cells only because of where it landed, so
any cell it could be assigned to is arbitrary — and putting its text inside a cell corrupts a value
that is otherwise correct.

- The stamp MUST be kept and rendered **outside the table**, as its `[stamp: …]` marker — see
  [[Stamps]].
- Its letters MUST NOT be distributed across the cells it crosses, and it MUST NOT be dropped for
  having nowhere obvious to go.

Assigning a stamp to a cell fails in both directions: it corrupts the cell's value, and it makes the
stamp's own text unreadable by splitting it. Every candidate cell is equally arbitrary, which is the
tell that the cell level is the wrong level.

No example page exercises either case yet; the sketches above stand in for one.

<!-- skill:generate
- When a printed value in a table cell is crossed out and a handwritten value replaces it, write both in the cell, struck printed value first: ~~60~~ 55. Never merge the digits into one number.
- A handwritten value in an otherwise empty printed cell is just the cell's content.
- When a stamp (APPROVED, VOID, PAID…) lies over a table, write it once as [stamp: its words] outside the table, never inside any cell and never split across cells.
-->

<!-- skill:check
- FAIL (MUST) if a cell with a crossed-out printed value and a handwritten replacement does not render both as ~~printed~~ handwritten.
- FAIL (MUST) if printed and handwritten digits in one cell are merged into a single number.
- FAIL (MUST) if a stamp's text appears inside a table cell, is split across cells, or is missing from the page's Markdown.
-->

## Related

- [[Struck and Replaced Values]] — the same `~~old~~ new` markup for a printed replacement
- [[Watermarks]] — the other page-level mark rendered outside the content it overlaps
- [[Stamps]] — the `[stamp: …]` marker
- [[Seals and Round Stamps]] — round seals and their `[seal: …]` marker
- [[Handwritten Annotations]] — handwriting in a margin, which replaces nothing
- [[Cell Text Fidelity]] — the image, not OCR, separates printed from written glyphs
