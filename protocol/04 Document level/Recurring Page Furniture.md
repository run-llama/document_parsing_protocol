---
title: Recurring Page Furniture
rule_id: layout-recurring-page-furniture
status: rule
scope: document
tags: [rule, layout]
---

# Recurring Page Furniture

> [!success] ✅ Normative
> Whether a margin band is page furniture MUST be decided once for the document. A band that is
> page furniture on one page MUST be page furniture — a Page-header or Page-footer, never body text
> and never a heading — on every page it appears on.

The repeated strip at the top or bottom margin: an agency name, a running title, a brand mark, a
document or exhibit stamp, a revision date, a folio. It carries no argument; it tells the reader
which document the sheet belongs to.

```text
DEPARTMENT OF HEALTH AND HUMAN SERVICES        PRINTED: 03/18/2021   ← header band
CENTERS FOR MEDICARE & MEDICAID SERVICES       OMB NO. 0938-0391

… the page's actual content …

FORM CMS-2567  Previous Versions Obsolete            Page 3 of 12    ← footer band
```

## Decided from the document

The same string is easy to read as a title on the page where it is largest or first, and as
furniture everywhere else. The decision MUST be made from several pages: a string that recurs in the
same margin with the same wording is furniture on **all** of them, including the first.

A cover page is the one place a repeated string MAY also be the document title. The cover
occurrence is then the Title and every later occurrence is furniture; the cover MUST NOT decide the
rest of the document. Which sheet is the cover is decided in [[Document Type]].

## A single page

Where only one page is available, a band in the top or bottom margin that carries no argument of its
own — a running title, an agency name, a folio — is furniture. Where the only reason to call it
furniture would be that it repeats on pages that are not available, it MUST be kept where the page
prints it, in its printed position.

## Never a heading

A running header MUST NOT be rendered as a heading. Promoted, it corrupts the outline twice over: it
invents a section that does not exist, and it repeats that invented section on every page. A
document whose outline is its own masthead repeated forty times has no usable structure left. This
is the **never invent** failure — the page prints a margin band, not a section.

A heading that repeats on more than half the pages of a document is almost always furniture filed as
structure.

## Bands that contain a graphic

A band MUST be kept together, graphic included; the mark MUST NOT escape into the body flow. What
the graphic itself becomes is decided by [[Images]] and [[Logos]].

## Bands that change partway through

Long documents revise their furniture — a new date, a new form number, a different layout after a
section break. A change of wording does not make the band content. The same disposition MUST apply
before and after the change, and each variant MUST be transcribed as it is printed.

<!-- skill:generate
- Before rendering, look across pages for strings repeated in the top or bottom margin (running titles, agency names, form numbers, dates, folios). Treat them as page header/footer on every page, including the first — never as body text and never as headings.
- On the cover, a repeated document name may be the Title; later occurrences are still furniture.
- Keep a band together with any logo in it, and transcribe each variant exactly as printed when the wording changes.
-->

<!-- skill:check
- FAIL (MUST) if a band rendered as page header/footer on one page is rendered as body text or a heading on another page of the same document.
- FAIL (MUST) if a running header or footer is rendered as a Markdown heading.
- WARN (SHOULD) if the same heading text appears on more than half the pages of the document.
-->

## Related

- [[Document Type]] — which sheet is the cover, where a repeated string may be the title
- [[Block Classes]] — the Page-header and Page-footer classes, and Title vs Section-header
- [[Printed Page Numbers]] — the folio inside the band
- [[Images]] — what a logo inside the band becomes
