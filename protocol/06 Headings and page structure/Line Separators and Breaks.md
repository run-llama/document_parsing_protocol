---
title: Line Separators and Breaks
rule_id: layout-line-separators-and-breaks
status: rule
scope: page
tags: [rule, layout, model-divergence]
---

# Line Separators and Breaks

> [!success] ✅ Normative
> A printed section separator MUST be rendered as `<hr/>`, at its place in reading order. `---`
> MUST NOT be used for it: `---` is reserved for page boundaries. A rule MUST NOT be inserted where
> the page prints only whitespace.

A horizontal rule or separator printed between sections of a page. It is printed content: it tells
a reader that one block has ended and another begun, so it survives into the output.

```text
… end of the first section.
────────────────────────────        ← printed rule between sections  →  <hr/>
Start of the next section …
```

## Requirements

- Each printed separator between sections MUST produce one `<hr/>` line, placed between the
  elements it separates in reading order.
- The separator MUST NOT be written as `---`, `***`, `___` or any other Markdown thematic break.
- Vertical whitespace between sections, with no printed line, MUST NOT produce `<hr/>`.

## Why never `---`

`---` is already load-bearing twice. It is the page-break marker of [[Markdown Rendering]], and at
the top of a file it opens frontmatter. A separator that renders identically to a page break makes
page attribution ambiguous for anything splitting on it, and can silently truncate a document at
the top of a file. `<hr/>` avoids both collisions and follows the general posture of falling back
to HTML wherever a Markdown spelling is ambiguous — see [[Text Formatting Conventions]].

<!-- skill:generate
- For a horizontal rule printed between sections of a page, write <hr/> on its own line at that point in reading order.
- Never write ---, *** or ___ for a printed rule; --- is only the page separator.
- Do not add <hr/> where the page shows only blank space.
-->

<!-- skill:check
- FAIL (MUST) if a printed section separator is rendered as ---, *** or ___ instead of <hr/>.
- FAIL (MUST) if a printed section separator visible between two blocks has no <hr/> between their elements.
- FAIL (MUST) if <hr/> appears where the page prints no rule.
-->

## Related

- [[Markdown Rendering]] — `---` as the page boundary
- [[Line Breaks Inside a Block]] — a break *within* one block, which resolves differently
- [[Dot Leader Lines]] — the other printed line-filler, which is removed rather than kept
- [[Text Formatting Conventions]] — HTML where a Markdown spelling is ambiguous
