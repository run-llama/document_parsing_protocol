---
title: Text Formatting Conventions
rule_id: text-text-formatting-conventions
status: rule
scope: page
tags: [text, formatting, inline]
---

# Text Formatting Conventions

> [!success] ✅ Normative
> Inline marks MUST be written with exactly the markup in the table below. Where Markdown has no
> syntax for a mark, the output MUST use the HTML element named here and MUST NOT use a notation of
> its own.

This is the inline-markup table for the whole protocol. Each row states its requirement; the linked
rule holds the detail, the sub-cases and the examples.

| Printed mark | Requirement | Rule |
| --- | --- | --- |
| Maths, inline or displayed | MUST be LaTeX inside `$$ … $$`; single `$` delimiters MUST NOT be used | [[Inline Equations]], [[Displayed Equations]] |
| Hyperlink or email address | MUST be raw text by default; link syntax MAY be used only when link extraction was requested | [[Links]] |
| Bold / italic | MUST be Markdown `**bold**` / `*italic*`, and only where the glyphs are heavier or slanted | [[Bold and Italics]] |
| Underline | MUST be `<u>…</u>` | [[Underlined Text]] |
| Strikeout | MUST be `~~…~~` over exactly the struck glyphs | [[Struck and Replaced Values]] |
| Superscript / subscript | MUST be `<sup>…</sup>` / `<sub>…</sub>`, never a Unicode raised or lowered glyph | [[Superscript and Subscript]] |
| Highlight | MUST be `<mark>…</mark>` over exactly the highlighted run | [[Highlighted Text]] |
| Highlight colour | MUST be carried as `style="background-color: HTML_COLOR_NAME"` on the `<mark>`, using the nearest HTML colour name | [[Highlighted Text]], [[Text Colors]] |
| Text colour, when it is the only distinguisher | MUST be `<font color="HTML_COLOR_NAME">…</font>` | [[Text Colors]] |
| Signature | MUST be `[signature:{name}]`, or bare `[signature]` when the name is not legible | [[Signatures]] |
| Logo | MUST be `[logo: printed words]`, or bare `[logo]` when it prints no text | [[Logos]] |
| Watermark | MUST be `[watermark: printed words]`, first in its page's content | [[Watermarks]] |
| Stamp | MUST be `[stamp: printed words]`, or bare `[stamp]` when illegible | [[Stamps]] |
| A printed character that is also Markdown syntax | MUST be escaped — `\*\*`, `\_`, `\|`, `` \` `` — and MUST NOT be dropped to avoid the collision | [[Escaping Printed Marks]] |

## Why HTML elements at all

Markdown has no syntax for underline, superscript, subscript or highlight. The HTML element passes
through every downstream Markdown renderer unchanged, and it survives a round-trip: a reader can
strip it, render it or read the base characters underneath. A Unicode substitute (`²`, `₂`) does
not, which is why [[Superscript and Subscript]] forbids it.

<!-- skill:generate
- Maths: LaTeX inside $$…$$, inline ones too (the coefficient $$\alpha$$); never single $.
- Bold **text** and italic *text* only where the printed glyphs are heavier or slanted; never <b>, <i>, <strong> or <em>.
- Underline <u>text</u>; strikeout ~~text~~ over exactly the struck glyphs; superscript <sup>2</sup> and subscript <sub>2</sub>, never ² or ₂.
- Highlight <mark style="background-color: yellow">text</mark> over exactly the highlighted run, naming the nearest HTML colour.
- Links and email addresses as raw text unless link extraction was requested. A signature is [signature:Name], or [signature] when illegible. A logo is [logo: its printed words], or [logo] when it prints none.
- A printed character that Markdown would read as syntax is escaped with a backslash (\*\*, \_, \|, \`), never deleted.
-->

<!-- skill:check
- FAIL (MUST) if maths is delimited with single $ instead of $$…$$.
- FAIL (MUST) if underline, superscript, subscript or highlight use anything other than <u>, <sup>, <sub>, <mark>, or a Unicode raised/lowered digit replaces <sup>/<sub>.
- FAIL (MUST) if emphasis is written with <b>, <i>, <strong> or <em>, or bold/italic marks text that is not heavier or slanted on the page.
- FAIL (MUST) if a <mark> lacks a background-color naming an HTML colour, or a printed struck run is not wrapped in ~~…~~.
- FAIL (MUST) if a printed character that is Markdown syntax (*, _, |, `, #, ~~) is missing, or is left unescaped where it changes the rendering.
- FAIL (MUST) if link syntax appears when link extraction was not requested.
-->

## Related

- [[Markdown Rendering]] — the block-level constructs, of which this table is the inline half
- [[Elements]] — the Text class takes its inline marks from this table
- [[Quick Reference]] — every rule's requirement on one page
