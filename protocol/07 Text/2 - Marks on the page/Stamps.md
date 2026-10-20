---
title: Stamps
rule_id: text-stamps
status: rule
scope: page
tags: [text, marks, legal]
---

# Stamps

> [!success] ✅ Normative
> Ink applied over or beside the printed page — overprinted, boxed or rotated, or in a different
> ink — MUST be rendered as `[stamp: its words]`, exactly as printed, at its place in reading order.
> A stamp with no legible words MUST be rendered as `[stamp]`. The page's own printed text is never a
> stamp, however official it looks.

A stamp records an act on this page: `FILED`, `RECEIVED`, `PAID`, `APPROVED`, a court e-filing line
laid across the header, a clerk's dated box. It was added after the page was printed, and it is
recognised by that: it overprints the page's text, sits in a box or at an angle the page's layout
does not use, or is in a different ink.

## Requirements

- A stamp is written with the protocol's bracket marker, `[stamp: …]`, carrying its words exactly
  as printed; a stamp on several lines is one marker, its lines joined with a space.
- It keeps its place in reading order. Where it overprints other text, the marker comes first,
  then the text beneath it — see [[Overlapping Text]]. Over a table it stays outside the table —
  see [[Handwriting and Stamps]].
- A stamp whose words cannot be read is the bare `[stamp]`.
- A **round seal** is `[seal: …]` — see [[Seals and Round Stamps]]. A **watermark**, background text
  that describes the whole document, is `[watermark: …]` — see [[Watermarks]]. The three share one
  bracket shape because each is ink laid on the page; they keep separate names because a watermark
  describes the document while a stamp or seal records an act on this page.
- Header text that the page prints itself — a filing header, an official form number — is ordinary
  text, not a stamp.

### ✅ **Sample** — a clerk's stamps over a filing header

![[bag-exhibit-divider-stamps.png]]

The boxed `FILED` is stamped over the header's own `FILED:`, and `Index #: E2026004417` over the
header's `INDEX NO. E2026004417`. The two stamps become markers, each first at its overlap; the
header's own lines stay text.

<details>
<summary>Expected Markdown · excerpt, the header</summary>

```markdown
[stamp: FILED]

**FILED: HALVERSTON COUNTY CLERK 03/14/2026 11:05 AM**

[stamp: Index #: E2026004417]

**INDEX NO. E2026004417**
```

</details>

<!-- skill:generate
- Write ink applied over or beside the printed page (a FILED, RECEIVED, PAID or APPROVED stamp, a court e-filing line laid across the header, a clerk's dated box) as [stamp: its words] exactly as printed, at its place in reading order; a multi-line stamp is one marker with its lines joined by a space.
- A stamp with no legible words is [stamp]. A round seal is [seal: …]; background text across the page is [watermark: …].
- The page's own printed header text is never a stamp. Where a stamp overprints text, write the stamp marker first, then the text beneath it.
-->

<!-- skill:check
- FAIL (MUST) if a stamp on the page has no [stamp…] marker, or its legible words are missing or altered inside the marker.
- FAIL (MUST) if a stamp's words are written as plain text, or the page's own printed text is wrapped in [stamp: …].
- FAIL (MUST) if a stamp's text is placed inside a table cell or split across cells.
-->

## Related

- [[Seals and Round Stamps]] — round seals and their `[seal: …]` marker
- [[Watermarks]] — background text that describes the whole document
- [[Overlapping Text]] — a stamp printed over other text
- [[Handwriting and Stamps]] — a stamp over a table
