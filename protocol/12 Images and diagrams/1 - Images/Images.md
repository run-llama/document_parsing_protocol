---
title: Images
rule_id: images-images
status: rule
scope: page
tags: [rule, images]
---

# Images

> [!success] ✅ Normative
> The content of an image MUST be put into the text stream as whatever the image actually is —
> transcribed text, a table or a diagram. The output MUST NOT contain a file reference or a
> bracketed placeholder in place of an image.

An image is not a thing to point at; it is content that happens to have been rasterised. Whatever
a reader would take away from looking at it MUST end up in the output as text, or it is lost —
the **never drop** failure.

## Decide what the image is, then encode that

| The image is really… | The output MUST contain |
| --- | --- |
| Text rendered as a picture | The text, transcribed verbatim |
| A data display (chart, plot) | A chart table — [[Cover Every Data Point]] |
| A labelled schematic or conceptual figure | A suitable `diagram/<language>` block; `description` only if none can preserve it — [[Slide Diagrams]] |
| A graph of relationships or a flow | A `diagram/<language>` fenced block (for example `diagram/mermaid` or `diagram/plantUml`) — [[Diagrams and Flowcharts]] |
| A photo or decorative art | A prose description of what it shows |

The rows are tried in order. Where any text at all is legible inside the image, that text MUST be
transcribed: it is content, and describing it instead ("a chart showing quarterly revenue") drops
every number on the page.

## When the type is not obvious

Some figures resist the table above: maps, chemical structures, electrical schematics, blueprints,
printed staves. Each has its own rule — [[Geographic Maps]], [[Chemical Molecules]],
[[Electrical Schematics]], [[Blueprints]], [[Music Notation]], [[Slide Diagrams]]. Where that rule
has no settled encoding yet, the fallback is the same: every label and every legible string MUST
be preserved, and the output MUST use the encoding that loses no content.

<!-- skill:generate
- Never write an image reference like ![caption](path) and never a placeholder like [image] or [The image shows…]; put the image's content into the Markdown.
- Decide what the image is, in this order: text rendered as a picture → transcribe the text verbatim; a chart or plot → a table of its data points; a labelled schematic → a suitable diagram/<language> block, or description only when no faithful encoding is available; a graph of relationships or a flow → a ```diagram/<language> fenced block using Mermaid, PlantUML or another suitable language; a photo or decorative art → a short prose description.
- If any text is legible inside the image, transcribe it; never replace legible text with a description of it.
- For maps, chemical structures, circuits, floor plans and music, keep every printed label and string, and choose the encoding that loses no content.
-->

<!-- skill:check
- FAIL (MUST) if the Markdown contains an image reference (![…](…)) or a bracketed image placeholder where the page prints an image.
- FAIL (MUST) if text legible inside an image on the page is missing from the Markdown or only described.
- FAIL (MUST) if a chart or plot on the page is rendered only as a prose description instead of its data.
- WARN (SHOULD) if the encoding chosen does not match what the image is (e.g. a flowchart as prose, a photo as a table).
-->

## Related

- [[Images and Figures]] — the same rule with equations and multi-column pages
- [[Iconography and Symbols]] — the small, semantically loaded end of the same spectrum
- [[Logos]] — what a brand mark becomes in the text stream
- [[Output Options]] — when a saved image may be referenced instead of described
