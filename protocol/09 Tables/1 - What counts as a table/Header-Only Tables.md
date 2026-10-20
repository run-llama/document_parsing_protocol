---
title: Header-Only Tables
rule_id: tables-header-only-tables
status: rule
scope: page
tags: [tables, degenerate, failure-mode]
---

# Header-Only Tables & Other Degenerate Outputs

> [!success] ✅ Normative
> The output MUST NOT contain a table that is a header with no body. A header row MUST either be
> rendered together with its body or, where no body can be joined to it, rendered as ordinary text —
> never as an orphan header row standing as a table.

The failure: a header row becomes a table of its own while the rows it describes end up in a
neighbouring region as plain text. The result claims there is a table with no data in it, and
separately claims there is a run of loose numbers with no meaning.

```text
Emitted:   | Duration | Factor |     ← header-only table…

           1   0.94                  ← …its body rendered as plain text
           2   0.91                    from the neighbouring region
```

## Joining a header to its body

A header row with no rows under it belongs to the body immediately below or beside it. The header
and body MUST be rendered as one table **only** when all three hold:

- the body is **immediately adjacent** — the next thing on the page, not across a gap of other
  content;
- the **column bounds match** — the body's columns line up under the header's;
- **nothing sits in between** — no paragraph, no other table, no unrelated band.

If any condition fails, the merge MUST NOT be made (**never invent**): the stray header line MUST be
rendered as text rather than as a one-row table.

How large a gap is too large is not fixed. A gap large enough to put the adjacency in doubt counts
as a failed condition, and the header is not merged.

## The related shape

A single row of labels on its own is not a table. Neither is a small table folded into the middle
of another table's body — see [[Side-by-Side Mini Tables]] for that one.

## The one exception

A blank pre-printed form is headers plus empty rows, and there the structure genuinely is the
content: it MUST be rendered, rows included — see [[Empty Pre-Printed Grids]]. That case has a body
of printed empty rows. It is not a header standing alone.

<!-- skill:generate
- Never output a <table> that holds only a header row.
- If a header row has no rows under it, join it to the body only when that body is the very next thing on the page, its columns line up under the header, and nothing sits in between; then render them as one table.
- If any of those fails, write the header line as plain text instead.
- A blank printed form grid is not a header-only table: render its empty rows too.
-->

<!-- skill:check
- FAIL (MUST) if the Markdown contains a <table> made only of header rows.
- FAIL (MUST) if a header row is rendered as a table while the rows printed directly under it, aligned to its columns, are rendered as plain text.
- FAIL (MUST) if a header is merged with a body separated from it on the page by a paragraph, another table or a band.
-->

## Related

- [[Split Tables Sharing a Header]] — when a header legitimately covers fragments with a gap
- [[Empty Pre-Printed Grids]] — the one case where headers plus empty rows are the whole content
- [[Side-by-Side Mini Tables]] — a small table inside another's body
- [[Is This Even a Table]] — a lone label row fails the relation test
