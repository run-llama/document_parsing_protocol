---
title: The Page Is the Ground Truth
rule_id: principles-the-page-is-the-ground-truth
status: rule
scope: page
order: 1
tags: [principles]
---

# The Page Is the Ground Truth

> [!success] ✅ Normative
> The output MUST represent the document **as rendered**: what a careful reader extracts from the
> pages, semantic structure over visual appearance, with text transcribed verbatim — typos
> included.

The PDF text layer, OCR and any other output are **supporting evidence, never authority**. Where
they disagree with the rendered page, the page governs.

- Text MUST be transcribed exactly as printed. Spelling, punctuation, capitalisation and numbers
  MUST NOT be corrected, normalised or completed.
- Content that is not visible on the rendered page — hidden text-layer strings, text clipped by the
  page edge, white-on-white text — MUST NOT appear in the output. See [[Clipped Text]].
- Structure MUST be read from what the page prints and how it is laid out, not from what the
  content "should" be: a table is a table because the page lays it out as one.
- A disputed character SHOULD be settled from a zoomed view of the page or the word geometry,
  never from what looks plausible.

## Which text counts as page content

Text is in scope only when it has a **visually perceptible presence in the rendered page**.
A string existing in the source file, being selectable, or being returned by OCR does not make it
visible content. Visibility is judged on the supplied rendition with its original colours,
opacity, clipping and overlays intact. Ordinary zoom or a higher-resolution rendering MAY be
used to inspect real fine print; changing contrast, recolouring text, removing an overlay, or
magnifying a microscopic source object until it becomes readable MUST NOT bring hidden content
into scope.

| Situation | Required treatment |
| --- | --- |
| Hidden OCR/text layer, transparent text, invisible rendering mode, text behind an opaque object, or text wholly outside the crop | Omit the hidden string. It MUST NOT be transcribed or given an output element or box. |
| White text on white, black on black, or effectively imperceptible contrast such as `#010101` on `#000000` | Omit text whose presence cannot be perceived with the original appearance. Contrast enhancement or the source colour values MUST NOT be used to recover it into the output. |
| Microscopic text such as `0.01 pt` at its final rendered scale | Omit it when it has no perceptible textual presence. Arbitrarily large zoom or a source-text dump does not make it page content. |
| Small but visible fine print, a faint watermark, or low-contrast text still perceptible as text | Keep it. Inspect at ordinary zoom or higher rendering resolution; size or low contrast alone is not an exclusion. |
| A visible text region whose characters remain unreadable | Preserve legible fragments and use `[illegible]` for the unreadable span. Do not guess from OCR or context, and do not treat a visibly present region as invisible. |
| Partly clipped, covered or redacted text | Keep only visible characters and apply [[Clipped Text]], [[Overlapping Text]] or [[Redacted Text]]; never recover concealed characters from the source layer. |

A font-size or colour threshold alone MUST NOT decide visibility: source transforms can enlarge a
small font, and contrast depends on the actual rendered background. `0.01 pt` refers to final
appearance, not an untransformed font-size field. The distinction is **no perceptible text**
(omit) versus **perceptible text with unreadable characters** (retain the evidence without guessing).
The hidden string MUST NOT leak into labels, descriptions, alternate text or sidecar metadata.
An optional review note MAY describe the exclusion without copying the hidden content.

These exclusions define the scope of [[Never Drop, Never Invent]]. They do not permit dropping
readable footnotes, margin text, rotated text, dense tables or deliberately faint but visible marks.
For damaged regions or unusable pages, apply [[Ignoring and Rejecting]].

<!-- skill:generate
- Transcribe exactly what the rendered page shows, typos, spelling and number formats included. Never correct, normalise or complete text.
- Omit hidden, transparent, fully covered, wholly clipped, imperceptibly low-contrast and microscopically invisible text. Do not reveal it through contrast changes, removed overlays, extreme magnification or source extraction; do not include it in metadata.
- Keep small or faint text that is visibly present; use ordinary zoom or higher resolution to inspect it. Preserve readable fragments and mark genuinely unreadable visible spans [illegible], without guessing.
- Read structure (tables, headings, lists) from the printed layout, not from what the content suggests.
-->

<!-- skill:check
- FAIL (MUST) if any transcribed text differs from what the page image shows (a corrected typo, a normalised number, a completed word).
- FAIL (MUST) if any output text or metadata reveals an invisible string, including microscopic or imperceptibly low-contrast text recovered only by changing the appearance or extracting source text.
- FAIL (MUST) if small or faint but visible text is omitted merely because of its size or contrast, or unreadable visible characters are guessed instead of marked [illegible].
-->

## Related

- [[Never Drop, Never Invent]] — the two failures every rule guards against
- [[Cell Text Fidelity]] — verbatim transcription inside tables
- [[Clipped Text]] — what is visible is what is transcribed
