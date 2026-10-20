---
title: Ids and Labels
rule_id: forms-ids-and-labels
status: rule
scope: page
tags: [forms]
---

# Ids and Labels

> [!success] ✅ Normative
> A field's **id** is its printed designator, written exactly as printed in escaped brackets outside
> the bold label. Its **label** is the printed caption, verbatim. A label MUST NOT repeat the id, and
> a caption MUST NOT be written as an id.

## The distinction

An **id** is a short printed designator that indexes into the form — `1a`, `e`, `H1`, `Part III`.
It is what a reader cites when they say "see line 12a".

A **label** is the caption. **A caption is never an id.** On a 1099, only the numbered boxes have
ids; `PAYER'S TIN` is a label with no id.

```markdown
✅  - \[1a\] **Total amount**: 4,200
❌  - **1a Total amount**: 4,200      ← id folded into the label
❌  - \[PAYER'S TIN\] **...**          ← a caption is not an id
```

## Nothing is cleaned up

A label MUST keep its abbreviations, capitalisation and punctuation exactly as printed. A label
MUST NOT be renamed, expanded or tidied: `FAX (A/C, No)` stays `FAX (A/C, No)`.

## Implicit numbers

When a printed id carries an **implicit** number, the id MUST include it.

![[form-implicit-ids.png]]

A block printed `35a` then `b`, `c`, `d` has the ids **`35a`, `35b`, `35c`, `35d`** — not `35a`,
`b`, `c`, `d`. The `35` is implied by position and is part of how the field is cited; dropping it
makes three of the four ids unusable for reference.

## Escaping

`\[x\]` is a printed id "x"; `[x]` is a checked box. The escape is what keeps them apart — see
[[The Key-Value List]].

<!-- skill:generate
- The id is the short printed designator of a field (1a, e, H1, Part III): write it as \[1a\] before the bold label, never inside it.
- The label is the printed caption, copied exactly: same abbreviations, capitals and punctuation. Never use a caption as an id.
- When a run of ids prints only the first in full (35a, then b, c, d), write the implied full ids: \[35a\], \[35b\], \[35c\], \[35d\].
-->

<!-- skill:check
- FAIL (MUST) if a printed field id appears inside the bold label instead of as a separate \[id\].
- FAIL (MUST) if a caption (e.g. "PAYER'S TIN") is written as an id in brackets.
- FAIL (MUST) if a label differs from the printed caption (expanded, renamed, re-capitalised, re-punctuated).
- FAIL (MUST) if an id whose number is implied by a preceding id (b after 35a) omits that number.
-->

## Related

- [[The Key-Value List]] — the line format ids and labels sit in
- [[Fill-Ins]] — fields with an id but no label
- [[Form Reading Order]] — ids set the order of the fields
