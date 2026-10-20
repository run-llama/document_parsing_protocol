---
title: Values Are Verbatim
rule_id: forms-values-are-verbatim
status: rule
scope: page
tags: [forms, fidelity]
---

# Values Are Verbatim

> [!success] ✅ Normative
> Entered content MUST be transcribed exactly as it appears on the page. A value MUST NOT be
> rounded, reformatted, computed or summarised.

This is [[Cell Text Fidelity]] applied to what someone wrote into a field.

| Printed | Output | Not |
| --- | --- | --- |
| `29,513` | `29,513` | `29513`, `29,513.00` |
| `590.50` | `590.50` | `590.5` |
| `1.0000000000 %` | `1.0000000000 %` | `1.0%`, `1` |
| `-599,459` | `-599,459` | `(599,459)` |
| `(284,791)` | `(284,791)` | `-284,791` |

A negative amount MUST keep the form the page printed: a leading minus stays a minus, parentheses
stay parentheses. Converting between them is a reformat, and a reformat is how a value stops
matching the document it came from.

## Identifiers are not normalised either

An entered SSN, TIN, policy number or account number MUST be transcribed exactly as printed. It
MUST NOT be rewritten to a canonical mask such as `XXX-XX-XXXX` or re-grouped to a standard shape.

This holds however the form splits the digits. A social security number printed across three
boxed groups is the printed digits, in the grouping the page uses:

```markdown
- \[E\] **Partner's SSN or TIN**: 27-4162256
```

Normalising an identifier looks harmless because the canonical form is *more* readable. It is the
same failure as rounding a number: the output stops matching the document, and a reader verifying
a value against the page finds a string that is not on it. A consumer that needs a canonical form
can derive one; it cannot recover the printed one.

## Split dollar and cent columns

A form that prints dollars and cents in two ruled columns holds **one value**. It MUST be rendered
as one value — `1,234.00` — and MUST NOT be split across two fields. The rule lines are
typesetting, not structure.

<!-- skill:generate
- Copy every entered value exactly as printed: same digits, separators, decimals, spacing, sign style and parentheses. Never round, reformat, compute or summarise.
- Copy identifiers (SSN, TIN, policy and account numbers) exactly as printed, in the page's own grouping; never mask or re-group them.
- Dollars and cents printed in two ruled columns are one value: 1,234.00.
-->

<!-- skill:check
- FAIL (MUST) if a field value differs from the printed value (rounded, reformatted, recomputed, sign style changed).
- FAIL (MUST) if an identifier is masked, re-grouped or otherwise normalised.
- FAIL (MUST) if a dollars-and-cents value printed in two ruled columns is split into two fields.
-->

## Related

- [[Cell Text Fidelity]] — the same rule inside tables
- [[Accounting Number Formats]] — negative and zero forms kept as printed
- [[The Key-Value List]] · [[Fill-Ins]] — where values sit
