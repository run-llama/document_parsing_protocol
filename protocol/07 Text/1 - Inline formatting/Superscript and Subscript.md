---
title: Superscript and Subscript
rule_id: text-superscript-and-subscript
status: rule
scope: page
tags: [text, formatting, inline]
---

# Superscript and Subscript

> [!success] ✅ Normative
> Raised and lowered text outside maths MUST be written with `<sup>` and `<sub>`. A Unicode
> superscript or subscript character MUST NOT be substituted for the tag.

```text
H<sub>2</sub>O        ← conforming
H₂O                   ← non-conforming
```

The same applies to superscripts: `x<sup>2</sup>`, not `x²`. Inside an equation, raised and
lowered terms are LaTeX `^{…}` and `_{…}` within `$$ … $$` — see [[Inline Equations]].

## Why the tag

A tag round-trips: a reader can strip it, render it, or read the base character underneath. A
Unicode glyph is lossy in the other direction — `₂` does not compare equal to `2`, so a downstream
numeric parse or string match silently fails. Unicode also has no raised or lowered form for most
characters, so substitution cannot be applied consistently.

## Inside table cells

A footnote superscript attached to a value — `48,210³` — MUST be tagged as `48,210<sup>3</sup>`.
Whether the marker stays in the cell is a separate question, answered by
[[Marks and Symbols in Cells]].

A raised marker that is itself Markdown punctuation is tagged **and** escaped:
`<sup>\*\*</sup>` — see [[Escaping Printed Marks]].

<!-- skill:generate
- Write raised text as <sup>…</sup> and lowered text as <sub>…</sub>: H<sub>2</sub>O, x<sup>2</sup>, 48,210<sup>3</sup>, footnote markers<sup>1</sup>.
- Never use Unicode superscript or subscript characters (², ³, ₂, ¹) in place of the tags.
- Inside $$…$$ maths, use LaTeX ^{…} and _{…} instead.
-->

<!-- skill:check
- FAIL (MUST) if a Unicode superscript or subscript character (such as ¹ ² ³ ⁰ ₂) appears in the Markdown text outside maths.
- FAIL (MUST) if text printed raised or lowered on the page is written on the baseline with no <sup>/<sub> tag, or is tagged with the wrong one.
-->

## Related

- [[Text Formatting Conventions]] — the full inline-markup table
- [[Marks and Symbols in Cells]] — where a footnote marker inside a cell belongs
- [[Chemical Molecules]] — formulas with subscripts
- [[Escaping Printed Marks]] — when the raised marker is itself Markdown punctuation, it is escaped as well as tagged
