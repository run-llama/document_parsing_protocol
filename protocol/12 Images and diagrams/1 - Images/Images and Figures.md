---
title: Images and Figures
rule_id: images-images-and-figures
status: rule
scope: page
tags: [rule, diagrams, images]
---

# Images and Figures

> [!success] ✅ Normative
> The output MUST NOT contain an image reference `![caption](path)` or a bracketed placeholder
> such as `[The image shows…]`. A figure's content MUST be rendered **as** text, a table or a
> diagram — whichever the figure actually is.

An output is consumed by a model or an extraction step. An image reference is a dead end to both;
the content has to be *in* the text stream.

## Choosing the form

| The figure is really… | Rendering |
| --- | --- |
| A data display (chart, plot) | A chart table — [[Cover Every Data Point]] |
| A graph of relationships | A `diagram/<language>` fenced block (for example `diagram/mermaid` or `diagram/plantUml`) — [[Diagrams and Flowcharts]] |
| A labelled schematic | A suitable `diagram/<language>` block; `description` only if none can preserve it — [[Slide Diagrams]] |
| A photo or decorative art | A prose description of what it shows |
| Text rendered as an image | The text, transcribed |

## Equations

Equations MUST be LaTeX in `$$ … $$`, inline ones included — see [[Inline Equations]]. Using `$$`
uniformly keeps a stray currency symbol elsewhere on the page from opening an unterminated math
span.

## Multi-column pages

Multi-column text MUST be unrolled into a single column in reading order. The physical column split
is a typesetting artefact, not structure, and MUST NOT be preserved — see [[Reading Order]].

<!-- skill:generate
- Never emit ![caption](path) or a bracketed placeholder for a figure; render its content as text, an HTML table, a ```diagram/<language> block (graphs; Mermaid, PlantUML or another suitable language) or a ```description block only when no language can faithfully encode the schematic, or a prose description (photos, decorative art).
- Write every equation, inline or displayed, as LaTeX between $$ and $$; never single $.
- Unroll multi-column text into one column in reading order; do not reproduce the column split.
-->

<!-- skill:check
- FAIL (MUST) if the Markdown contains ![…](…) or a bracketed figure placeholder.
- FAIL (MUST) if an equation is delimited with single $ or left as an image reference.
- FAIL (MUST) if text from two printed columns is interleaved line by line instead of read column by column.
-->

## Related

- [[Images]] — the general rule, with the order in which the forms are tried
- [[Diagrams and Flowcharts]] — when a figure is a graph
- [[Cover Every Data Point]] — what a chart becomes
- [[Layout Regions]] — separating the figure's region from the text around it
