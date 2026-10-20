---
title: Rule Status and Scope
order: 3
tags: [conventions]
---

# Rule Status and Scope

Every rule carries two badges: its **status**, which says how settled it is, and its **scope**,
which says what evidence applying it needs.

## Status

| Badge | Meaning |
| --- | --- |
| ✅ **Normative** | Settled. The requirement holds as written. |
| ⚖️ **Equivalent forms** | Two renderings conform. A document uses one of them throughout. |
| ❓ **Open point** | Not yet settled. The rule states a working default, which conforming output follows, and a proposed resolution. Violations are reported as warnings only. Every open point is closed before the protocol is published — see Ambiguity List. |

## Scope

| Badge | Meaning |
| --- | --- |
| 📄 **Page rule** | Can be applied from the page alone. |
| 📚 **Document rule** | Needs other pages of the same document; decided once and applied on every page. See [[Document Rules]]. |

## How a rule is laid out

1. **The requirement** — in the status callout, in the language of [[Requirements Language]].
2. **The situation** — how the element is recognised on the page, often with a sketch.
3. **Sub-cases** — each with its own requirement and its examples beneath it.
4. **Examples** — ✅ *Sample* (the rule applies) or ❌ *Counter-sample* (it looks like it applies and
   does not, or a rendering got it wrong), each with its **Expected Markdown**.
5. **Related** — neighbouring rules, with why each resolves differently.

## Conventions in the examples

- Fenced `text` blocks sketch **printed layout**, not output.
- `Expected Markdown` blocks are conforming output for the region shown. A line holding only
  `<!-- … -->` marks elided content.
- `Non-conforming output` blocks show a rendering that violates the rule, for contrast.
- `ROW_SPAN_CONTINUE` in a sketch marks a cell covered by a rowspan from the row above.

## Related

- [[Requirements Language]] · [[Conformance]] · [[Document Rules]]
