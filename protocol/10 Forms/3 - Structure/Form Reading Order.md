---
title: Form Reading Order
rule_id: forms-form-reading-order
status: rule
scope: page
tags: [forms]
---

# Form Reading Order

> [!success] ✅ Normative
> The fields of a form MUST be ordered by the form's printed indexing scheme — its ids — rather than
> by column-first or row-first geometry.

A form's ids are its intended order. Where lettered and numbered fields share a page, one scheme
MUST be read through, then the other, rather than sweeping across the page and interleaving them.

## An id sequence stays contiguous

- Fields whose ids run in sequence MUST stay together and in order, **with no un-id'd field
  between them**.
- Unlabelled fields MUST be placed around the sequence, not inside it. A 1099-MISC is the standard
  case.

## Sections do not interleave

Fields from different printed sections MUST NOT be mixed, even when they sit side by side on the
page.

## Where this differs from block reading order

[[Reading Order]] orders *regions* on a page the way a person reads them. This rule orders
*fields* within a form, and the form's own numbering overrides visual position when the two
disagree — which on a dense tax form they routinely do. Where a group of fields prints no ids, the
order of [[Reading Order]] applies.

<!-- skill:generate
- Order a form's fields by their printed ids (1, 2, 3… / a, b, c…), not by their position on the page. Finish one id scheme before starting another.
- Keep a run of consecutive ids together; place fields without ids before or after the run, never inside it.
- Never mix fields from two printed sections, even when they sit side by side.
-->

<!-- skill:check
- FAIL (MUST) if fields with printed ids appear out of id order.
- FAIL (MUST) if a field without an id is placed inside a run of consecutive ids.
- FAIL (MUST) if fields from two printed sections are interleaved.
-->

## Related

- [[Sections and Grouped Fields]] — the sections that must not interleave
- [[Ids and Labels]] — what an id is
- [[Fields Outside the Form]] — fields outside the body go before or after it
- [[Reading Order]] — the order of regions, and of fields with no ids
