---
title: Printed Page Numbers
rule_id: layout-printed-page-numbers
status: rule
scope: page
tags: [rule, layout]
---

# Printed Page Numbers

> [!success] ✅ Normative
> A printed page number (the folio) MUST be kept in the header or footer band it is printed in,
> verbatim, and MUST NOT appear as a loose element in the body. When the printed page number is
> requested, it MUST also be recorded on its own for the page, as printed, and MUST NOT be inferred
> for a page that prints none.

The folio is the number a document prints on itself: `26`, `Page 6`, `Page 3 of 12`, `iv`, `A-3`.
It sits in the top or bottom margin, often beside a date, a form number or a URL.

```text
FORM CMS-2567  Previous Versions Obsolete       If continuation sheet Page 3 of 12
                                                                      ↑ the folio
```

## Two records

| Record | Requirement |
| --- | --- |
| **In the band** | The folio is part of the header or footer it is printed in. The band MUST be kept together and verbatim — see [[Recurring Page Furniture]]. |
| **On its own** | When the printed page number is requested ([[Output Options]]), the number MUST also be recorded alone for the page — the sidecar's `printedPageNumber`, see [[The Sidecar]]. The label MUST be stripped and the numbering kept as printed: `6`, not `Page 6`; roman numerals stay roman; `A-3` stays `A-3`. |

## The offset is the point

Front matter, covers and inserts mean printed page 1 is often not sheet 1. A magazine feature can
open on sheet 1 and print `26`; a report can run twelve sheets of front matter before printing `1`.
That mapping is a fact about the **document**, not the page, and it is the reason the number is
worth recording separately — a reader citing "page 26" cannot otherwise be sent to the right sheet.

- The recorded number MUST be the number the page prints. It MUST NOT be renumbered to match the
  sheet position.
- A folio MUST NOT be inferred for a page that prints none.

## Pages that print nothing

Covers, plates and continuation sheets frequently carry no folio; their printed page number is
empty, which is not an error. A pre-printed blank, `Page ___ of ___`, is also no folio: the blank
MUST be transcribed in the band (as `[blank]`) and no number recorded.

## A folio never sits in the body

A number that ends up as a loose line among the page's content means the band was read wrongly. The
folio MUST belong to its margin band whether or not the rest of that band was recognised — the same
**never invent** failure as promoting furniture to a heading.

<!-- skill:generate
- Keep the printed page number inside its header or footer text, exactly as printed ("Page 3 of 12"), in that band's position at the start or end of the page; never as a loose line in the body.
- Only when a printed page number is requested: also record the number alone for the page, label stripped and style kept ("6", "iv", "A-3").
- Never renumber a folio to the sheet position, and never supply one for a page that prints none; "Page ___ of ___" is a blank, not a number.
-->

<!-- skill:check
- FAIL (MUST) if a printed folio is missing from the page's header or footer text, or appears as a loose element among the body content.
- FAIL (MUST) if a recorded printed page number differs from the one printed on the page (renumbered, restyled, or with its label left in).
- FAIL (MUST) if a printed page number is recorded for a page that prints none, or for a pre-printed blank.
-->

## Related

- [[Recurring Page Furniture]] — the band the folio belongs to
- [[Output Options]] — the option that asks for the number on its own
- [[The Sidecar]] — where the number is recorded
- [[Block Classes]] — a page number alone qualifies as Page-footer
