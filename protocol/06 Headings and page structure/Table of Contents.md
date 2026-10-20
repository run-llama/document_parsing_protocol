---
title: Table of Contents
rule_id: lists-table-of-contents
status: rule
scope: page
tags: [layout, lists, navigation]
---

# Table of Contents

> [!success] ✅ Normative
> A table of contents, table of authorities or index MUST be rendered as a list: one item per
> entry, nested as the page indents it, each item the label then its page number(s) exactly as
> printed, separated by a space. It MUST NOT be rendered as a table.

A contents page pairs each label with a page number, usually across a dot leader.

```text
Chapter 3 — Reserving  . . . . . . . . . . . .  47
Chapter 4 — Pricing    . . . . . . . . . . . .  63
```

## Rendering

```text
Printed:   1  Introduction ....................  3
              1.1  Scope ......................  4
           2  Reserving .......................  47
```

```markdown
- 1 Introduction 3
  - 1.1 Scope 4
- 2 Reserving 47
```

- Every printed entry MUST survive, with its page number(s) attached to the right label.
- The label and the number are separated by a single space. The dot leaders produce nothing — see
  [[Dot Leader Lines]].
- Nesting shown by indentation MUST be carried as list nesting, not flattened.
- An entry with several page references keeps them all, as printed: `HCR 2.603(A) 4-50, 4-57`.
- A contents page is navigation, not data: rendering it as a table would make it read as facts to
  anything that consumes the page. A list also holds a run of page references that a two-column
  table could only cram into one cell.

The exception is a contents page printed as a **real ruled grid with column headers** (`Section |
Title | Page`). That is a table by the ordinary rules of [[Is This Even a Table]], not a contents
exception.

### ✅ **Sample** — a table of authorities with several pages per entry

![[bag-table-of-authorities.png]]

`HCR 2.603(D) 3-27, 4-49, 4-54, …` — each rule followed by a run of page references in blue,
no leaders, one to twelve references per line. A label paired with a *list* of numbers. The
entries form a list, each rule followed by its references; the blue is decoration. The
running header and footer bands open and close the page.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
Table of Authorities: Halvana Court Rules
Civil Proceedings Benchbook – Second Edition

* HCR 2.513(O) 7-54
* HCR 2.513(P) 7-54, 7-55
* HCR 2.514(A) 7-26, 7-56
<!-- … -->
* HCR 2.603 3-3, 3-25, 4-6, 4-55, 4-57, 4-59, 4-68, 8-2
* HCR 2.603(A) 4-50, 4-57
* HCR 2.603(B) 4-52, 4-53, 4-54, 4-58
* HCR 2.603(C) 9-71
* HCR 2.603(D) 3-27, 4-49, 4-54, 4-55, 4-56, 4-57, 4-58, 4-59, 4-60, 4-63
<!-- … -->
* HCR 2.612(C) 4-54, 4-61, 4-62, 4-63, 4-64, 4-65, 4-66, 4-67, 4-68, 8-4, 8-9, 8-14
* HCR 2.613(A) 4-29, 8-4

Halvana Judicial Institute TOA: HCRs – 9
```

</details>

<!-- skill:generate
- Render a table of contents, table of authorities or index as a Markdown list: one item per entry, nested as the page indents it, "label page" with a single space, page numbers exactly as printed (keep every reference of a multi-reference entry).
- Drop the dot leaders. Never render a contents page as a table, unless it is printed as a ruled grid with column headers.
-->

<!-- skill:check
- FAIL (MUST) if a printed contents entry, or one of its page numbers, is missing or attached to the wrong label.
- FAIL (MUST) if a contents page without a ruled grid and column headers is rendered as a table.
- FAIL (MUST) if nesting printed by indentation is flattened, or dot leaders appear in the output.
-->

## Related

- [[Dot Leader Lines]] — what the dots become
- [[Is This Even a Table]] — the test that applies to a contents page printed as a ruled grid
- [[Bullets and Sub-Bullets]] — how list nesting is written
