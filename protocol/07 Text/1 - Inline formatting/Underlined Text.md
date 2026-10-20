---
title: Underlined Text
rule_id: text-underlined-text
status: rule
scope: page
tags: [text, formatting, inline]
---

# Underlined Text

> [!success] ✅ Normative
> Underlined text MUST be wrapped in `<u>…</u>`. The output MUST NOT use `<ins>`, and MUST NOT use
> `_ text _`.

```text
subject to the <u>prior written consent</u> of the lessor
```

Markdown has no underline of its own, so the HTML element is used.

## Why not the alternatives

`<ins>` means *inserted text* — an edit-history claim that a plain underline on a page does not
make. `_ text _` collides with Markdown emphasis and renders as italics.

## Underline in a redline

An underline-only replacement in a redlined table — a new figure underlined in place of a struck
one — is still written `<u>1.335</u>`, next to the struck value. See
[[Struck and Replaced Values]] for how the pair is encoded.

<!-- skill:generate
- Wrap underlined text in <u>…</u>: subject to the <u>prior written consent</u> of the lessor.
- Never use <ins>, and never use underscores (_text_) for underline.
- Underline only the run the page underlines; an underlined italic run is *<u>text</u>*.
-->

<!-- skill:check
- FAIL (MUST) if printed underlined text is not wrapped in <u>…</u>.
- FAIL (MUST) if <ins> or underscore emphasis is used to represent an underline.
- FAIL (MUST) if <u> covers text that is not underlined on the page.
-->

## Related

- [[Text Formatting Conventions]] — the full inline-markup table
- [[Struck and Replaced Values]] — the redline pair of a struck value and its underlined replacement
- [[Bold and Italics]] — the other inline styles, which do use Markdown syntax
