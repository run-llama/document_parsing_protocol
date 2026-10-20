---
name: document-protocol-check
description: Check whether a Markdown rendering of a document — and its sidecar of boxes, when present — conforms to the Document Representation Protocol (working title), given the document's page images. Reports each violation with the stable guideline ID and protocol section it breaks, as FAIL (MUST) or WARN (SHOULD), and an overall conforming / non-conforming verdict. Use when asked to validate, audit or score a parse against the protocol.
---

# Check conformance

Protocol draft source b63884001dbc. Generated from the protocol's rules; do not edit by hand.

## Inputs

- **Pages:** the document's page images, in order. They are the ground truth.
- **Markdown:** the output to check.
- **Sidecar** (optional): the JSON of elements and boxes. Box checks apply only when a sidecar is
  given or boxes were requested.

## Procedure

1. Split the Markdown into pages at lines containing only `---` and pair each with its page image.
2. For every rule below, test each of its checks against the pages, the Markdown and the sidecar.
   Report a finding only when you can point to the page and the element; never report a rule as
   violated on suspicion.
3. Judge against the page image, never against a text layer or another output.
4. Where the protocol allows two renderings, either conforms; report only a document that mixes them.
5. Checks marked *(open point)* are always WARN.

## Output

Return JSON only:

```json
{"verdict": "conforming | non-conforming",
 "findings": [{"rule_id": "tables-repeated-headers-and-title-bands",
               "section": "9.2.8", "rule": "Repeated Headers and Title Bands",
               "severity": "FAIL | WARN", "page": 3,
               "element": "short excerpt of the offending Markdown or a description of the missing content",
               "reason": "one sentence: what the page shows and what the Markdown does instead"}]}
```

The verdict is `non-conforming` if and only if at least one finding is `FAIL`.

## Rules

### §2 Principles

**§2.1 The Page Is the Ground Truth** (`principles-the-page-is-the-ground-truth`)
- FAIL (MUST) if any transcribed text differs from what the page image shows (a corrected typo, a normalised number, a completed word).
- FAIL (MUST) if any output text or metadata reveals an invisible string, including microscopic or imperceptibly low-contrast text recovered only by changing the appearance or extracting source text.
- FAIL (MUST) if small or faint but visible text is omitted merely because of its size or contrast, or unreadable visible characters are guessed instead of marked [illegible].

**§2.2 Never Drop, Never Invent** (`principles-never-drop-never-invent`)
- FAIL (MUST) if any printed text, row, column, cell, caption, footnote or marker visible on the page is missing from the Markdown.
- FAIL (MUST) if the Markdown contains a label, value, header, span or structure that the page does not print.
- FAIL (MUST) if the Markdown contains a placeholder such as "[image]" or "[The image shows…]" instead of content.

**§2.3 Traceability** (`principles-traceability`)
- FAIL (MUST) if boxes were requested and a Markdown element has no box in the sidecar.
- FAIL (MUST) if a box does not cover the printed content of its element (points at the wrong place or misses part of it).


### §3 Output model

**§3.1 Elements** (`output-elements`)
- FAIL (MUST) if an element's layout class differs from its Markdown element class.
- FAIL (MUST) if a printed element is rendered with the wrong kind of Markdown (a heading as a paragraph, a table as text, a caption as a heading).
- FAIL (MUST) if a Picture is rendered as an image reference or placeholder instead of its content.

**§3.2 Markdown Rendering** (`output-markdown-rendering`)
- FAIL (MUST) if a table representing a chart lacks data-source="chart" on its opening <table> tag, or an ordinary printed table carries that attribute.
- FAIL (MUST) if the number of --- page separators does not equal the number of pages minus one, or --- appears anywhere else as a line.
- FAIL (MUST) if a table is written as a Markdown pipe table instead of an HTML <table>.
- FAIL (MUST) if underline, superscript, subscript or highlight use a notation other than <u>, <sup>, <sub>, <mark>.
- FAIL (MUST) if a page header or footer band is rendered as a heading or in the middle of the page's content.

**§3.3 Boxes and Granularity** (`output-boxes-and-granularity`)
- FAIL (MUST) if boxes are at a different granularity than requested, or an element at that granularity has no box.
- FAIL (MUST) if a box does not enclose all of its element's printed content.
- WARN (SHOULD) if a box encloses substantial content that belongs to a different element.

**§3.4 The Sidecar** (`output-the-sidecar`)
- FAIL (MUST) if boxes were requested and there is no sidecar, or the sidecar's md values in order do not reproduce the Markdown.
- FAIL (MUST) if a Markdown element has no sidecar item or a sidecar item has no Markdown element.
- FAIL (MUST) if a finer box's startIndex/endIndex fall outside its element's md.
- FAIL (MUST) if boxes were requested and an element's inline <!-- el … --> anchor is missing or does not match its sidecar box.

**§3.5 Output Options** (`output-output-options`) *(open point)*
- WARN (SHOULD) if, with no option requesting it, table fragments from two pages are joined into one table (open point).
- WARN (SHOULD) if, with no option requesting it, a logo, seal or icon is referenced as an image instead of described (open point).


### §4 Document level

**§4.2 Choices Made Once Per Document** (`document-choices-made-once-per-document`)
- FAIL (MUST) if the same situation (units line, blank row, full-width band, divider row, unframed totals block, Gantt edge) is rendered one accepted way on one page and the other accepted way on another page of the same document.
- WARN (SHOULD) if a single-page output uses the non-default rendering of an either-way situation.

**§4.3 Cross-Page Tables** (`tables-cross-page-tables`)
- FAIL (MUST) if rows printed on two different pages are rendered inside one <table> without a requested join.
- FAIL (MUST) if a fragment carries a header row that its own page does not print, or a cut cell contains text printed on the other page.
- FAIL (MUST) if a sidecar is present and a table continuing across a page break lacks continuesOnNextPage: true on the first fragment and continuesFromPreviousPage: true on the second.
- FAIL (MUST) if the continuation flags on the two sides of a page break disagree.
- WARN (SHOULD) if a header row repeated at the bottom of a page's block is missing.

**§4.4 Document Type** (`document-document-type`)
- FAIL (MUST) if a Title element appears on a sheet that is not the document's cover, or on a document with no cover.
- FAIL (MUST) if some pages of one document (or one part of it) are treated as slides, each title top-level, and others as a paged document, without a change of part.
- WARN (SHOULD) if a document with an appended deck or appendix applies one document-type decision across both parts.

**§4.5 Heading Depth Across Pages** (`headings-heading-depth-across-pages`)
- FAIL (MUST) if a numbered subsection (e.g. 9.2.1) has the same or a shallower heading level than its parent (9.2) anywhere in the document.
- FAIL (MUST) if the first heading on a page is reset to top level although it continues a section opened on an earlier page (paged documents only).
- FAIL (MUST) if a running header, a document-kind label, a form value or a caption is rendered as a heading.

**§4.6 Recurring Page Furniture** (`layout-recurring-page-furniture`)
- FAIL (MUST) if a band rendered as page header/footer on one page is rendered as body text or a heading on another page of the same document.
- FAIL (MUST) if a running header or footer is rendered as a Markdown heading.
- WARN (SHOULD) if the same heading text appears on more than half the pages of the document.


### §5 Layout

**§5.1 Block Annotation** (`layout-block-annotation`)
- FAIL (MUST) if printed content on the page is covered by no element (and is not an allowed exclusion).
- FAIL (MUST) if two separate paragraphs, columns, list items or captions are merged into one element, or one element spans a column or page boundary.
- FAIL (MUST) if a table or picture is split into region-level elements per row, cell, column, line or word.
- FAIL (MUST) if a box clips visible ink of its element or extends beyond the page.
- WARN (SHOULD) if two boxes overlap substantially.
- FAIL (MUST) if a markdown_attribution reference with several regions has an expected_bbox_count different from its number of pieces, or a single-piece element carries a count above 1.

**§5.2 Block Boundaries** (`layout-block-boundaries`)
- FAIL (MUST) if a Picture box clips its axis labels, axis titles, legend or in-graphic text, or those are output as separate elements.
- FAIL (MUST) if an external caption, title, source note or nearby prose is included in a Table or Picture box instead of its own box; nesting a Caption's <caption> in the table HTML does not merge its layout box or class.
- FAIL (MUST) if panels sharing one caption are split into several Pictures, or panels with separate captions are merged into one.
- FAIL (MUST) if a table is represented by more than one Table element at region level, or its box extends over prose inside a decorative frame.

**§5.3 Block Classes** (`layout-block-classes`)
- FAIL (MUST) if a Title element appears anywhere other than the document's cover title, or front-matter authors/dates/addresses are merged into the Title.
- FAIL (MUST) if a Formula's displayed equation number is outside its Formula element, or a List-item's continuation lines are split from it.
- FAIL (MUST) if a checkbox box includes its label text.
- FAIL (MUST) if an element carries more than one class or none, or its layout class differs from the corresponding Markdown element's class.
- WARN (SHOULD) if ordinary prose next to a figure or table is classed Caption, or a source note is classed Caption instead of Footnote.

**§5.4 Court Caption Blocks** (`layout-court-caption-blocks`)
- FAIL (MUST) if any printed string of a court caption (party labels, v., court name, case number label, title) is missing from the Markdown.
- FAIL (MUST) if a court caption is rendered as a table or a key-value list, or alternates left and right lines row by row.
- FAIL (MUST) if the § divider signs are transcribed, or a blank party or case-number line is not [blank].

**§5.5 Embedded Pages** (`layout-embedded-pages`)
- FAIL (MUST) if the wrapper's header, label, filing stamp or footer is missing, or either of the two page numbers is dropped.
- FAIL (MUST) if embedded content appears before the wrapper header or after the wrapper footer.
- FAIL (MUST) if a title inside an embedded form screenshot is rendered as a Markdown heading.

**§5.6 Ignoring and Rejecting** (`layout-ignoring-and-rejecting`)
- FAIL (MUST) if a logo, a page number or readable content (however dense or small) is missing from the Markdown.
- FAIL (MUST) if a scan artifact such as a hole-punch ring is rendered as content.
- FAIL (MUST) if a page with no ink is missing from the page sequence, or its Markdown is anything other than <!-- blank page -->.
- FAIL (MUST) if <!-- blank page --> appears on a page that has ink.

**§5.7 Layout Regions** (`layout-layout-regions`)
- FAIL (MUST) if a layout annotation's class differs from the corresponding Markdown element's class.
- FAIL (MUST) if a region is rendered under the wrong kind (a prose block or address stack as a <table>, a printed grid as plain text, a chart as prose).

**§5.8 Pleading Line Numbers** (`layout-pleading-line-numbers`)
- FAIL (MUST) if gutter line numbers appear inside or at the start of body lines, or the page is rendered as a number | text table.
- FAIL (MUST) if line numbers were requested and a page with a printed gutter has no line_numbers list, or an entry's span does not cover the text of the line printed beside that number.
- FAIL (MUST) if line_numbers entries overlap, are out of order, fall outside the page Markdown, or include a number that stands beside no text.
- WARN (SHOULD) if the body prose is broken into one paragraph per numbered line instead of continuous paragraphs.

**§5.9 Reading Order** (`layout-reading-order`)
- FAIL (MUST) if text from two columns or two panels is interleaved line by line or block by block.
- FAIL (MUST) if an element is missing from the page's sequence or appears twice, or numbered positions in the sidecar have gaps or duplicates.
- FAIL (MUST) if numbered blocks are output out of their printed numbering order, or an unnumbered grid of equal blocks is not read row by row.
- WARN (SHOULD) if a caption is separated from its figure or table by unrelated elements.

**§5.10 Slide Furniture** (`layout-slide-furniture`)
- FAIL (MUST) if any printed navigation tab is missing, or the tabs are out of printed order.
- FAIL (MUST) if a label printed on a photograph is missing from the Markdown.
- WARN (SHOULD) if the active tab's highlight is not carried as a <mark> with a colour, or decorative background art with no content is described.

**§5.11 Stat Tiles** (`layout-stat-tiles`)
- FAIL (MUST) if a tile's value is separated from its label (labels listed together, values listed together) or paired with the wrong label.
- FAIL (MUST) if a unit, sign or qualifier of a tile value is dropped or moved to another tile.
- WARN (SHOULD) if a panel heading is invented where none is printed, or a printed panel heading is not placed before its tiles.


### §6 Headings and page structure

**§6.1 Dot Leader Lines** (`text-dot-leader-lines`)
- FAIL (MUST) if a run of leader dots from the page appears in the Markdown, in text or inside a table cell.
- FAIL (MUST) if a label or value that a leader connected is missing, split, or moved off its line.

**§6.2 Line Breaks Inside a Block** (`text-line-breaks-inside-a-block`)
- FAIL (MUST) if one printed block (same type size, alignment and leading) is rendered as two headings, two paragraphs, or a heading plus subtitle.
- FAIL (MUST) if a line break inside one block outside a table cell is written as <br> or trailing spaces instead of a plain newline.
- WARN (SHOULD) if the document mixes break spellings between multi-line blocks.

**§6.3 Line Separators and Breaks** (`layout-line-separators-and-breaks`)
- FAIL (MUST) if a printed section separator is rendered as ---, *** or ___ instead of <hr/>.
- FAIL (MUST) if a printed section separator visible between two blocks has no <hr/> between their elements.
- FAIL (MUST) if <hr/> appears where the page prints no rule.

**§6.4 Marginal Notes** (`layout-marginal-notes`)
- FAIL (MUST) if a printed marginal note is missing from the Markdown.
- FAIL (MUST) if a marginal note's text is merged into a heading or paragraph instead of standing as its own block.
- WARN (SHOULD) if a marginal note is placed away from the element it is level with on the page.

**§6.5 Numbered Section Headings** (`headings-numbered-section-headings`)
- FAIL (MUST) if a printed section or paragraph number is dropped, renumbered or separated from its text.
- FAIL (MUST) if a numbered title with body text beneath it is not a heading, or a numbered paragraph is rendered as a heading.
- FAIL (MUST) if a subsection number (1.1.) is rendered at the same or a shallower heading depth than its parent (1.).
- FAIL (MUST) if a bare paragraph number is left on a line of its own instead of joining its paragraph.
- WARN (SHOULD) if a repeated item label such as "Interrogatory No. 8:" is rendered as a heading, or a numbered list marker is escaped although the numbered text is a list item.

**§6.6 Printed Page Numbers** (`layout-printed-page-numbers`)
- FAIL (MUST) if a printed folio is missing from the page's header or footer text, or appears as a loose element among the body content.
- FAIL (MUST) if a recorded printed page number differs from the one printed on the page (renumbered, restyled, or with its label left in).
- FAIL (MUST) if a printed page number is recorded for a page that prints none, or for a pre-printed blank.

**§6.7 Recognising Ambiguous Headings** (`headings-recognising-ambiguous-headings`)
- FAIL (MUST) if a run-in label, repeated item label, table caption, title band, column label, running header or form label is rendered as a heading.
- FAIL (MUST) if a standalone title that organises following paragraphs or bullets is rendered as plain text rather than a heading.
- FAIL (MUST) if a title printed inside a table grid appears both in the table and as a heading outside it.
- FAIL (MUST) if a company line, exhibit label or units line is merged into a title heading that the page separates from it.
- FAIL (MUST) if a heading is deeper or shallower than its visible parent or sibling headings imply (a subsection at or above its parent's level).
- WARN (SHOULD) if a decorative arrow or ornament is kept in heading text, or a printed section number is dropped from it.

**§6.8 Run-In Headings** (`headings-run-in-headings`)
- FAIL (MUST) if a label that shares its printed line with following text is rendered as a heading or on a line of its own.
- FAIL (MUST) if the text following a run-in label is split into a separate paragraph from the label.
- WARN (SHOULD) if the run-in label's printed bold, italic or underline is missing.

**§6.9 Stacked Headings** (`headings-stacked-headings`)
- FAIL (MUST) if consecutive printed lines of one title are rendered as two headings or a heading plus a separate paragraph.
- FAIL (MUST) if an article or note number printed above its title is separated from that title's heading.
- FAIL (MUST) if a company name, exhibit label or units line is joined into a title heading.

**§6.10 Table of Contents** (`lists-table-of-contents`)
- FAIL (MUST) if a printed contents entry, or one of its page numbers, is missing or attached to the wrong label.
- FAIL (MUST) if a contents page without a ruled grid and column headers is rendered as a table.
- FAIL (MUST) if nesting printed by indentation is flattened, or dot leaders appear in the output.

**§6.11 Transcript Pages** (`layout-transcript-pages`)
- FAIL (MUST) if printed transcript line numbers appear in the Markdown, or the page is rendered as a table.
- FAIL (MUST) if a turn's wrapped continuation line is left as a separate paragraph or line instead of joined into its turn.
- FAIL (MUST) if a speaker turn does not start with its printed Q / A / speaker marker, or two turns are merged into one paragraph.
- FAIL (MUST) if line numbers were requested and a numbered line with text has no line_numbers entry covering its text.


### §7 Text

**§7.1 Text Formatting Conventions** (`text-text-formatting-conventions`)
- FAIL (MUST) if maths is delimited with single $ instead of $$…$$.
- FAIL (MUST) if underline, superscript, subscript or highlight use anything other than <u>, <sup>, <sub>, <mark>, or a Unicode raised/lowered digit replaces <sup>/<sub>.
- FAIL (MUST) if emphasis is written with <b>, <i>, <strong> or <em>, or bold/italic marks text that is not heavier or slanted on the page.
- FAIL (MUST) if a <mark> lacks a background-color naming an HTML colour, or a printed struck run is not wrapped in ~~…~~.
- FAIL (MUST) if a printed character that is Markdown syntax (*, _, |, `, #, ~~) is missing, or is left unescaped where it changes the rendering.
- FAIL (MUST) if link syntax appears when link extraction was not requested.

**§7.2.1 Bold and Italics** (`text-bold-and-italics`)
- FAIL (MUST) if emphasis is written with <b>, <i>, <strong> or <em> instead of ** and *.
- FAIL (MUST) if a run is marked bold or italic whose glyphs on the page are not heavier or slanted than their neighbours.
- WARN (SHOULD) if a run whose glyphs are clearly heavier or slanted is left unstyled.

**§7.2.2 Displayed Equations** (`text-displayed-equations`)
- FAIL (MUST) if a displayed equation is not in $$…$$.
- FAIL (MUST) if a printed equation number is missing, or is not plain text directly after the closing $$ of its equation.
- FAIL (MUST) if an equation carries a number the page does not print.
- FAIL (MUST) if a formula drawn as boxes loses a printed operand label or operator, or is rendered as prose instead of $$…$$.

**§7.2.3 Drop Caps** (`text-drop-caps`)
- FAIL (MUST) if a drop-cap initial is separated from the rest of its word by a space or line break, or is missing.
- FAIL (MUST) if the drop-cap initial is given its own styling (bold, heading, HTML) that the rest of the word does not carry.

**§7.2.4 Escaping Printed Marks** (`text-escaping-printed-marks`)
- FAIL (MUST) if a printed *, **, _, #, |, `, ~~, ---, bracketed number/word or angle-bracket placeholder visible on the page is missing from the Markdown.
- FAIL (MUST) if a printed mark is left unescaped so that it changes the rendering: opens bold or italics, becomes a heading, a rule or a page separator, splits a table cell, or is read as an HTML tag.
- FAIL (MUST) if a printed mark is replaced by a different mark (a word, a number, <sup>2</sup> for **).
- FAIL (MUST) if a printed bracketed number or word ([1], [date]) appears unescaped where it can be read as a checkbox, blank or form-id marker.

**§7.2.5 Highlighted Text** (`text-highlighted-text`)
- FAIL (MUST) if text printed on a highlighter background is not wrapped in <mark>, or is rendered as bold/italic instead.
- FAIL (MUST) if a <mark> has no background-color, or gives it as a hex value or a non-HTML colour name.
- FAIL (MUST) if a <mark> covers text that has no coloured background on the page (a whole row, column or sentence when only part is highlighted).
- WARN (SHOULD) if the named colour is not the nearest HTML colour name to the printed highlight.

**§7.2.6 Inline Equations** (`text-inline-equations`)
- FAIL (MUST) if a mathematical expression is delimited with single $…$, or with \( … \) or \[ … \], instead of $$…$$.
- WARN (SHOULD) if printed maths (Greek letters, operators, raised or lowered indices inside a formula) is written as plain text instead of $$…$$ LaTeX.

**§7.2.7 Line-End Hyphenation** (`text-line-end-hyphenation`)
- FAIL (MUST) if a word broken across a line end is left split (a space or line break between its parts).
- FAIL (MUST) if a hyphen that belongs to a compound broken at its own hyphen is removed (egovernment for e-government).
- WARN (SHOULD) if a plain word broken at a line end keeps its break hyphen (Co-lumbia, Gov-ernment).

**§7.2.8 Links** (`text-links`)
- FAIL (MUST) if link syntax ([text](url) or <address>) appears when link extraction was not requested.
- FAIL (MUST) if a printed URL or email address is missing, altered or split, or an unprinted URL is added to the text.

**§7.2.9 Quote Blocks** (`text-quote-blocks`)
- FAIL (MUST) if any line of the Markdown begins with a > block-quote marker.
- FAIL (MUST) if text inside an inset or quoted region on the page is missing from the Markdown.

**§7.2.10 Small Capitals** (`text-small-capitals`)
- FAIL (MUST) if text printed in small capitals appears in mixed or lower case in the Markdown.
- FAIL (MUST) if small caps are rendered with HTML styling (font-variant, <span style>, <small>) or turned into bold/italic the glyphs do not carry.
- FAIL (MUST) if a letter-spaced word is written with spaces between its letters.

**§7.2.11 Superscript and Subscript** (`text-superscript-and-subscript`)
- FAIL (MUST) if a Unicode superscript or subscript character (such as ¹ ² ³ ⁰ ₂) appears in the Markdown text outside maths.
- FAIL (MUST) if text printed raised or lowered on the page is written on the baseline with no <sup>/<sub> tag, or is tagged with the wrong one.

**§7.2.12 Underlined Text** (`text-underlined-text`)
- FAIL (MUST) if printed underlined text is not wrapped in <u>…</u>.
- FAIL (MUST) if <ins> or underscore emphasis is used to represent an underline.
- FAIL (MUST) if <u> covers text that is not underlined on the page.

**§7.2.13 Verse and Hard Line Breaks** (`text-verse-and-hard-line-breaks`)
- FAIL (MUST) if verse or other meaningfully broken lines are joined into running prose, losing the printed line breaks.
- FAIL (MUST) if the line breaks are marked with <br>, trailing spaces or a fenced block instead of plain newlines.
- FAIL (MUST) if a verse line that only wraps for column width is split into two output lines.

**§7.3.1 Clipped Text** (`text-clipped-text`)
- FAIL (MUST) if a word cut off at the page edge is completed with letters that are not visible on the page.
- FAIL (MUST) if an ellipsis, bracket or other marker the page does not print is added at a clipped word.
- FAIL (MUST) if a visible clipped fragment is missing from the Markdown.

**§7.3.2 E-Signature Tags** (`text-e-signature-tags`)
- FAIL (MUST) if a field that carries only an e-signing tab is given a value other than [blank], or is rendered as [signature].
- FAIL (MUST) if a tab's word (SIGN, INITIAL) appears as the field's value.
- FAIL (MUST) if the word printed on a visible e-signing tab is missing from the Markdown.

**§7.3.3 Handwritten Annotations** (`text-handwritten-annotations`)
- FAIL (MUST) if a visible handwritten note is missing from the Markdown.
- FAIL (MUST) if handwritten words are inserted into a printed sentence instead of a separate [handwritten: …] block.
- FAIL (MUST) if a handwritten note is rendered as plain text without the [handwritten: …] marker.
- WARN (SHOULD) if the text inside [handwritten: …] contains words that cannot be read on the page.

**§7.3.4 Iconography and Symbols** (`text-iconography-and-symbols`)
- FAIL (MUST) if a value-bearing icon on the page has no tag in the Markdown.
- FAIL (MUST) if graded icons (different fill levels or counts) are rendered with the same tag or glyph.
- FAIL (MUST) if an icon is rendered as an emoji or Unicode glyph instead of a bracketed tag.
- FAIL (MUST) if a label icon is replaced by an unprinted word such as "Phone:".

**§7.3.5 Margin Banners** (`text-margin-banners`)
- FAIL (MUST) if the words of a rotated margin banner are missing from the page's Markdown.
- FAIL (MUST) if margin-banner text appears inside a body sentence, table cell or list item.
- FAIL (MUST) if a margin banner that does not cross the content is written as [watermark: …].
- WARN (SHOULD) if the same banner appears more than once on one page.

**§7.3.6 Overlapping Text** (`text-overlapping-text`)
- FAIL (MUST) if a legible overprinted string (the stamp or the text beneath it) is missing from the Markdown.
- FAIL (MUST) if characters of two overlapping strings are merged into one line or one word.
- FAIL (MUST) if characters that are hidden on the page appear in the Markdown.
- WARN (SHOULD) if, at an overlap, the stamp's block does not come before the string it is printed over.

**§7.3.7 QR Codes and Bar Codes** (`text-qr-codes-and-bar-codes`)
- FAIL (MUST) if a QR code or bar code on the page has no ![…](QR Code) / ![…](Bar code) reference in the Markdown.
- FAIL (MUST) if the alt text holds a payload that the code does not decode to.
- FAIL (MUST) if the target slot holds anything other than the literal label "QR Code" or "Bar code".
- FAIL (MUST) if boxes were requested and the code has no sidecar element of its own.

**§7.3.8 Redacted Text** (`text-redacted-text`)
- FAIL (MUST) if a redacted span on the page has no [REDACTED] marker, or one span yields several markers.
- FAIL (MUST) if text hidden by a redaction appears in the Markdown, or the marker carries a character count.
- FAIL (MUST) if an exemption code printed on a redaction is missing, altered, or repeated.
- FAIL (MUST) if visible text next to a redaction is dropped or pulled inside the marker.

**§7.3.9 Seals and Round Stamps** (`text-seals-and-round-stamps`)
- FAIL (MUST) if a seal or round stamp on the page has no [seal…] marker.
- FAIL (MUST) if legible seal text is missing from the marker, or the marker holds text the seal does not print.
- FAIL (MUST) if the bare [seal] is used while some of the seal's text is legible.
- FAIL (MUST) if the seal text is merged into a body sentence instead of its own block.

**§7.3.10 Signatures** (`text-signatures`)
- FAIL (MUST) if a handwritten signature or set of initials on the page has no [signature…] placeholder.
- FAIL (MUST) if [signature:{name}] carries a name that cannot be read from the signature's own strokes.
- FAIL (MUST) if an unsigned signature field is rendered as [signature] instead of [blank].
- FAIL (MUST) if two signatures are merged into one placeholder.
- FAIL (MUST) if a name printed under an illegible signature is moved inside the placeholder.
- FAIL (MUST) if a typed or /s/ name on a signature line is rendered as a [signature] placeholder, or its printed text (including /s/) is altered.

**§7.3.11 Stamps** (`text-stamps`)
- FAIL (MUST) if a stamp on the page has no [stamp…] marker, or its legible words are missing or altered inside the marker.
- FAIL (MUST) if a stamp's words are written as plain text, or the page's own printed text is wrapped in [stamp: …].
- FAIL (MUST) if a stamp's text is placed inside a table cell or split across cells.

**§7.3.12 Text Colors** (`text-text-colors`)
- FAIL (MUST) if colour that is the only thing distinguishing some text is lost in the Markdown.
- FAIL (MUST) if coloured text is written other than as <font color="NAME">…</font> with an HTML colour name (a hex value, a span, an invented marker).
- WARN (SHOULD) if colour markup is added for text whose colour is only decoration.

**§7.3.13 Watermarks** (`text-watermarks`)
- FAIL (MUST) if a watermark printed on the page is missing from that page's Markdown.
- FAIL (MUST) if watermark words appear inside a body sentence, list item or table cell.
- FAIL (MUST) if a watermark is not written as [watermark: …] at the top of its page, or appears on a page that does not print it.


### §8 Lists

**§8.1 Bullets and Sub-Bullets** (`lists-bullets-and-sub-bullets`)
- FAIL (MUST) if a top-level bullet uses a marker other than "*" or a sub-bullet uses a marker other than "-".
- FAIL (MUST) if printed list numbering is changed (renumbered, restyled, or replaced by bullets).
- FAIL (MUST) if a printed list with three or more nesting levels is flattened to fewer levels.
- FAIL (MUST) if a meaningful bullet glyph (tick, cross) visible on the page is missing after the Markdown marker.
- WARN (SHOULD) if an unbulleted line printed between two bullet runs is rendered as a list item.


### §9 Tables

**§9.1.1 Borderless Whitespace Tables** (`tables-borderless-whitespace-tables`)
- FAIL (MUST) if a whitespace-aligned block with columns is rendered as a code block, preformatted text or loose lines instead of a <table>.
- FAIL (MUST) if a value is placed in a column other than the one its left edge sits in on the page.

**§9.1.2 Chart With a Printed Data Grid** (`tables-chart-with-a-printed-data-grid`)
- FAIL (MUST) if the table representing a chart's printed data grid lacks data-source="chart" on its opening <table> tag.
- FAIL (MUST) if a chart's printed data grid is transposed or its rows or columns are reordered in the Markdown.
- FAIL (MUST) if the Markdown has a second table for a chart whose data grid is already printed and rendered.
- FAIL (MUST) if a value in the chart's table does not appear as printed text in the grid.

**§9.1.3 Empty Pre-Printed Grids** (`tables-empty-pre-printed-grids`)
- FAIL (MUST) if a printed empty grid on the page is missing from the Markdown or rendered as headers only.
- FAIL (MUST) if the table has fewer rows than the grid prints.

**§9.1.4 Header-Only Tables** (`tables-header-only-tables`)
- FAIL (MUST) if the Markdown contains a <table> made only of header rows.
- FAIL (MUST) if a header row is rendered as a table while the rows printed directly under it, aligned to its columns, are rendered as plain text.
- FAIL (MUST) if a header is merged with a body separated from it on the page by a paragraph, another table or a band.

**§9.1.5 Is This Even a Table** (`tables-is-this-even-a-table`)
- FAIL (MUST) if running prose, an address block, or a stack of labels naming different kinds of fact is rendered as a <table>.
- FAIL (MUST) if a label/value block whose rows are records of one kind is rendered as loose lines instead of a <table>.
- FAIL (MUST) if a ruled legend or key-value grid printed on the page is missing or rendered only as loose text.
- FAIL (MUST) if a table contains a header row the page does not print.
- FAIL (MUST) if a table is stretched to include form fields printed outside its ruled grid, or a grid is dropped because the page reads like a form.

**§9.2.1 Bands Inside the Grid** (`tables-bands-inside-the-grid`)
- FAIL (MUST) if a table is split into two <table> elements at a full-width band row when the column headers are not printed again below the band.
- FAIL (MUST) if a full-width band is rendered as a partial row or with a colspan smaller than the table width.
- FAIL (MUST) if a table is split where the page only changes shading or row colour.
- WARN (SHOULD) if full-width bands are th in some tables and td in others within the same document.

**§9.2.2 Column Continuation** (`tables-column-continuation`)
- FAIL (MUST) if separate side-by-side blocks continuing one series are zipped into one table whose rows join records from different blocks.
- FAIL (MUST) if a shared key column is repeated in the output where the page prints it once.
- WARN (SHOULD) if continuation blocks are stacked, or kept in their source-printed wide frame, rather than rendered one table per block.
- WARN (SHOULD) if one document renders some continuation blocks as separate tables and others as a stacked table.

**§9.2.3 Continued in the Title** (`tables-continued-in-the-title`)
- FAIL (MUST) if a continuation marker printed in a table title or band is missing or altered in the Markdown.
- FAIL (MUST) if, with no join option requested, a fragment titled as a continuation is merged with a table from another page.

**§9.2.4 Duplicated Tables** (`tables-duplicated-tables`)
- FAIL (MUST) if a table printed twice on the page appears only once in the Markdown.
- FAIL (MUST) if the Markdown contains a second copy of a table that the page image shows once.

**§9.2.5 Group and Cohort Bands** (`tables-group-and-cohort-bands`)
- FAIL (MUST) if grids sharing one continuous row-label column under group bands are split into several tables.
- FAIL (MUST) if a full-width numbered header row is missing from the table.
- FAIL (MUST) if stacked cohort grids with no printed column headers are fused into one table with the bands demoted to ordinary body rows.

**§9.2.6 Horizontal Slicing** (`tables-horizontal-slicing`)
- FAIL (MUST) if vertically stacked column blocks that repeat the same row labels are merged into one wide <table>.
- FAIL (MUST) if a block's repeated row-label column is dropped from its table.

**§9.2.7 Repeated Headers and Title Bands** (`tables-repeated-headers-and-title-bands`)
- FAIL (MUST) if a header row (or title band) printed again below data rows on the same page is rendered inside the same <table> as the rows above it.
- FAIL (MUST) if a repeated header row is dropped instead of becoming the new table's header row.

**§9.2.8 Side-by-Side Mini Tables** (`tables-side-by-side-mini-tables`)
- FAIL (MUST) if two separately framed or separately titled boxes are rendered as one <table> whose rows join cells from both.
- FAIL (MUST) if a small side panel's rows appear inside another table's body.
- FAIL (MUST) if a spanning header's colspan covers columns not printed under it.

**§9.2.9 Split Tables Sharing a Header** (`tables-split-tables-sharing-a-header`)
- FAIL (MUST) if, on one page, rows printed below a gap without their own header are rendered as a separate headerless <table> instead of continuing the table whose header they depend on.
- FAIL (MUST) if a value block that has no row labels of its own is rendered apart from the label column it depends on.
- FAIL (MUST) if a fragment sharing a header is missing from the Markdown.

**§9.3.1 Barely-Existing Columns and Headers** (`tables-barely-existing-columns-and-headers`)
- FAIL (MUST) if a column that has a printed header is missing because its body cells are empty.
- FAIL (MUST) if a header or corner cell that is blank on the page contains text in the Markdown.
- FAIL (MUST) if a printed numbered header row (1) (2) (3)… is missing.
- FAIL (MUST) if a rowspan or colspan covers cells that the page separates with ruled borders.

**§9.3.2 Header Wrap vs Real Tier** (`tables-header-wrap-vs-real-tier`)
- FAIL (MUST) if one printed header label over a single column is split into two or more header rows.
- FAIL (MUST) if a header phrase that spans two or more sub-columns with a rule beneath it is merged into the sub-column labels instead of kept as its own row with a colspan.
- FAIL (MUST) if a word broken by a narrow header column is left broken in the Markdown (Distributio n, per- form- ance).
- WARN (SHOULD) if a header label that reads as one phrase keeps its wrapped lines as <br/> instead of joining them with spaces.

**§9.3.3 Multi-Row Header Tiers** (`tables-multi-row-header-tiers`)
- FAIL (MUST) if two printed header tiers are flattened into one row of concatenated labels.
- FAIL (MUST) if a group header's colspan differs from the number of leaf columns printed under it, or covers the row-label column.
- FAIL (MUST) if the Markdown contains a header row, or a row of header labels, that the page does not print.
- FAIL (MUST) if a header row's cells, with colspans expanded, do not add up to the table's column count.

**§9.3.4 SEC Period Tiers** (`tables-sec-period-tiers`)
- FAIL (MUST) if a month and year stacked over a single column are rendered as two header rows.
- FAIL (MUST) if a period group ("Three Months Ended…") does not span exactly its own date columns.
- FAIL (MUST) if a printed units note in the stub corner ("$ in millions") is missing or moved out of the header.

**§9.3.5 Units Row** (`tables-units-row`)
- FAIL (MUST) if a units line printed under a header is rendered as a body row of <td> cells.
- FAIL (MUST) if a units line printed mid-table splits the table into two.
- WARN (SHOULD) if one document keeps units lines as header rows in some tables and folds them into the labels in others.

**§9.4.1 Gutter Columns** (`tables-gutter-columns`)
- FAIL (MUST) if a currency sign or range separator printed on the page is missing from the Markdown.
- WARN (SHOULD) if a currency sign typeset in its own track is rendered as a separate cell instead of joining its value.
- WARN (SHOULD) if the two ends of a printed range and their separator are split across cells.
- WARN (SHOULD) if a column of marker numerals such as (i), (ii) is merged into the adjacent text cells.

**§9.4.2 Header Body Column Count Mismatch** (`tables-header-body-column-count-mismatch`)
- FAIL (MUST) if rows of one table have different effective column counts (after rowspan and colspan).
- FAIL (MUST) if a cell holds a value the page does not print at that position (duplicated from a neighbour or invented) to make the counts agree.
- FAIL (MUST) if a header label printed on the page is dropped because its column's body cells are empty.
- WARN (SHOULD) if missing positions are closed with a colspan where the page prints no merged cell.

**§9.5.1 Blank and Spacer Rows** (`tables-blank-and-spacer-rows`)
- WARN (SHOULD) if a printed blank row that is the only separation between two groups of table rows is missing from the Markdown.
- WARN (SHOULD) if one document renders printed blank table rows as empty rows in some tables and drops them in others.
- FAIL (MUST) if the Markdown contains an empty table row where the page prints none.
- FAIL (MUST) if a column or cell of a table is missing because it was empty or proven only by its header.
- FAIL (MUST) if a loss triangle or matrix table covers empty positions with a colspan or rowspan instead of individual empty cells.

**§9.5.2 Nested Tables** (`tables-nested-tables`)
- FAIL (MUST) if a <table> element appears inside a table cell.
- FAIL (MUST) if a grid printed inside a cell is flattened into one cell's text, or its labels are separated from their values.
- FAIL (MUST) if a cell beside a subdivided region carries a rowspan or colspan that does not match the region it covers on the page.

**§9.5.3 Record Groups and Multi-Line Cells** (`tables-record-groups-and-multi-line-cells`)
- FAIL (MUST) if a cell printed once against several lines is repeated on each row or left blank on the continuation rows instead of carrying a rowspan.
- FAIL (MUST) if lines that pair up one-to-one across columns are <br/>-joined into one cell, or a list sharing a single printed value is split into rows that attach the value to its first line only.
- FAIL (MUST) if a wrapped stub label is split into two rows, or a title-and-paragraph cell is split across rows.
- FAIL (MUST) if a record's printed lines are rewritten or merged into different text.
- WARN (SHOULD) if a label broken by incidental word-wrap keeps a <br/>, or two deliberate lines are flattened, where the page settles which it is.

**§9.5.4 Repeated Identical Values** (`tables-repeated-identical-values`)
- FAIL (MUST) if a cell carries a rowspan while the page prints its value separately on each of the spanned rows.
- FAIL (MUST) if the number of rows in the Markdown table is lower than the number of printed rows because repeated values were merged.

**§9.5.5 Row-Label Hierarchy** (`tables-row-label-hierarchy`)
- FAIL (MUST) if a table whose row labels are printed at different indents renders them without data-level, or with the same level for labels at different indents.
- FAIL (MUST) if a data-level value does not match the label's printed indent position counted from the left edge of the stub column.
- FAIL (MUST) if indentation is expressed with leading spaces or &nbsp; instead of data-level.
- FAIL (MUST) if a table carrying data-level leaves a non-empty stub label cell without one.
- FAIL (MUST) if a two-column stub is flattened into one column or its sub-labels are joined into one cell.

**§9.5.6 Total and Subtotal Rows** (`tables-total-and-subtotal-rows`)
- FAIL (MUST) if the label cell of a printed total or subtotal row is a <td>, or its value cells are <th>.
- FAIL (MUST) if a total label cell has no data-level, or its data-level does not match the label's printed start position.
- FAIL (MUST) if a "Total" (or any label) appears in a total row where the page prints no label.
- FAIL (MUST) if a total row is moved out of printed order, or rows printed after a total are split into another table.
- FAIL (MUST) if a total's label or values are bold in the Markdown but not on the page, or the reverse.

**§9.6.1 Accounting Number Formats** (`tables-accounting-number-formats`)
- FAIL (MUST) if a parenthesised negative is rendered with a minus sign, or a leading-minus value is rendered in parentheses.
- FAIL (MUST) if "$—", "— %", "n/m", "NM" or a change marker printed in a cell is replaced by a number, blank or other text.
- FAIL (MUST) if thousands or decimal separators differ from the page image (swapped, removed or added).
- FAIL (MUST) if a cell carries a normalised value in addition to, or instead of, the printed one.

**§9.6.2 Bold and Italic Inside Tables** (`tables-bold-and-italic-inside-tables`)
- FAIL (MUST) if a table cell uses ** or * for emphasis instead of <strong> / <em>.
- FAIL (MUST) if a cell is marked bold, italic or underlined while its glyphs on the page image are not, or a visibly bold, italic or underlined cell is left unmarked.
- FAIL (MUST) if emphasis is applied to a whole column or row where the page styles only some of its cells.
- WARN (SHOULD) if every header cell of a uniformly weighted header row is wrapped in <strong>.

**§9.6.3 Cell Text Fidelity** (`tables-cell-text-fidelity`)
- FAIL (MUST) if any character, digit or decimal point of a cell differs from the page image.
- FAIL (MUST) if a cell printed blank on the page contains text in the Markdown (a dash, zero or other filler).
- FAIL (MUST) if text from two separately printed cells is merged into one cell, or one cell's text is split across two.
- FAIL (MUST) if a cell contains a guessed value where the page is illegible instead of [illegible].

**§9.6.4 Color as the Value** (`tables-color-as-the-value`)
- FAIL (MUST) if a cell whose only content on the page is a coloured fill is rendered empty or with text instead of an empty <mark style="background-color: …">.
- FAIL (MUST) if such a cell's colour is written as a legend meaning ("High risk") or as cell text.
- FAIL (MUST) if a shaded region is rendered as one cell with colspan or rowspan where the page prints separate cells.
- WARN (SHOULD) if the colour name in the mark is not the nearest HTML colour name to the printed fill.

**§9.6.5 Handwriting and Stamps** (`tables-handwriting-and-stamps`)
- FAIL (MUST) if a cell with a crossed-out printed value and a handwritten replacement does not render both as ~~printed~~ handwritten.
- FAIL (MUST) if printed and handwritten digits in one cell are merged into a single number.
- FAIL (MUST) if a stamp's text appears inside a table cell, is split across cells, or is missing from the page's Markdown.

**§9.6.6 Marks and Symbols in Cells** (`tables-marks-and-symbols-in-cells`)
- FAIL (MUST) if a footnote marker printed on a cell value is missing, moved to another cell, or given its own column.
- FAIL (MUST) if an em-dash printed alone in a cell is rendered as an empty cell, or a cell printed blank contains a dash or any other value.
- FAIL (MUST) if a cell contains an emoji where the page prints a checkmark, cross or icon.
- FAIL (MUST) if a checkmark, cross or icon that stands in for a value is missing from its cell.
- FAIL (MUST) if a repeated mark (two droplets, three stars) is rendered with a different number of tokens than printed marks.

**§9.6.7 Struck and Replaced Values** (`tables-struck-and-replaced-values`)
- FAIL (MUST) if a value struck through on the page is not wrapped in ~~…~~, or an unstruck value is.
- FAIL (MUST) if a struck value and its replacement are merged into one figure (e.g. 1.316335) or either is missing.
- FAIL (MUST) if the ~~ span covers more or fewer glyphs than the page strikes.
- FAIL (MUST) if old and new values printed in separate tables or columns are folded into one cell, or Previous/Current columns are added that the page does not print.
- FAIL (MUST) if inserted text marked only by colour is rendered without that colour.

**§9.7.1 Bottom Edge Totals and Islands** (`tables-bottom-edge-totals-and-islands`)
- FAIL (MUST) if a totals line, summary line or detached value box printed below or beside a table is missing from the Markdown.
- FAIL (MUST) if an out-of-frame block whose values line up under the table's columns is rendered as prose instead of rows, or its values sit in columns other than the ones they are printed under.
- FAIL (MUST) if a separate unbordered block that does not continue the table's grid is padded into the main table as footer rows.
- WARN (SHOULD) if, on pages without ruled frames, one document renders trailing blocks as footer rows in one place and as separate tables in another.

**§9.7.2 Footnotes Inside the Frame** (`tables-footnotes-inside-the-frame`)
- FAIL (MUST) if a footnote line printed under or inside a table's frame is rendered as a <tr> of the table.
- FAIL (MUST) if a table footnote visible on the page is missing from the Markdown, or is placed away from its table (not directly after it).
- FAIL (MUST) if a footnote reference marker printed in a cell is dropped from that cell.

**§9.7.3 Titles Banners Captions** (`tables-titles-banners-captions`)
- FAIL (MUST) if a band printed inside the table's frame or fill is missing from the table, or is rendered as a heading outside it.
- FAIL (MUST) if a table or chart caption is duplicated, lacks its <caption> wrapper inside the table, or is not first/last inside the table according to reading order.
- FAIL (MUST) if an in-table title row is a single title cell padded with empty cells instead of one full-width colspan cell.
- FAIL (MUST) if visually identical section-divider bands in one document are rendered with different tags (<td> in one place, <th> in another), or a divider is placed in the column-header tier.
- FAIL (MUST) if a caption is rendered as a Markdown heading, moved to the other side of its table, or loses its printed bold/italic runs.
- WARN (SHOULD) if a section-divider band is rendered as <th> rather than a bold <td>.

**§9.8.1 Rotated and Diagonal Content** (`tables-rotated-and-diagonal-content`)
- FAIL (MUST) if a rotated table is transcribed in page orientation (headers and rows transposed, or sideways text in page order).
- FAIL (MUST) if a vertically printed header is missing or placed in a different column or row span than printed.
- FAIL (MUST) if a diagonally split corner cell loses one of its two labels or is rendered as two cells.
- FAIL (MUST) if the two labels of a diagonal corner cell are not in top-label-first order.

**§9.8.2 Triangles and Matrix Tables** (`tables-triangles-and-matrix-tables`)
- FAIL (MUST) if a row of a triangle or matrix table has fewer cells than the table's column count.
- FAIL (MUST) if a colspan or rowspan covers a region the page leaves blank in a triangle.
- FAIL (MUST) if a cell printed blank contains 0, n/a or any value, or a printed 0 is rendered as an empty cell.


### §10 Forms

**§10.1 Forms and Key-Value Regions** (`forms-forms-and-key-value-regions`)
- FAIL (MUST) if fill-in fields, checkboxes or blanks are rendered as a <table> instead of a key-value list (except checkbox cells inside a genuine ruled grid).
- FAIL (MUST) if the Markdown contains a key/value <table> for a block the page prints without ruling.
- FAIL (MUST) if a ruled key/value grid with fixed printed values is missing or not rendered as a table.
- FAIL (MUST) if the text of an unruled label/value block is missing from the Markdown.

**§10.2 Repeated and Unlabelled Fields** (`forms-repeated-and-unlabelled-fields`)
- FAIL (MUST) if a heading, number or label not printed on the page (e.g. "Vehicle 1") is added to a repeated field group.
- FAIL (MUST) if a repeated field group is dropped, merged into another, or moved out of printed order.
- FAIL (MUST) if an unlabelled field is given an invented label or positional id.
- FAIL (MUST) if consecutive repeated groups are not separated by a blank line.

**§10.3.1 Ids and Labels** (`forms-ids-and-labels`)
- FAIL (MUST) if a printed field id appears inside the bold label instead of as a separate \[id\].
- FAIL (MUST) if a caption (e.g. "PAYER'S TIN") is written as an id in brackets.
- FAIL (MUST) if a label differs from the printed caption (expanded, renamed, re-capitalised, re-punctuated).
- FAIL (MUST) if an id whose number is implied by a preceding id (b after 35a) omits that number.

**§10.3.2 The Key-Value List** (`forms-the-key-value-list`)
- FAIL (MUST) if labelled form fields are rendered as a <table> instead of "- " list items (fields inside a genuine ruled grid, and blanks inside a sentence, excepted).
- FAIL (MUST) if a printed field id is written unescaped as [id], or inside the bold label.
- FAIL (MUST) if an id or label is present in the Markdown that the page does not print.
- FAIL (MUST) if an empty fill-in is not rendered as [blank], or a checkbox is not rendered as [x] or [ ].
- FAIL (MUST) if a label printed on a different line from its value is followed by ":" added outside the bold label.

**§10.3.3 Values Are Verbatim** (`forms-values-are-verbatim`)
- FAIL (MUST) if a field value differs from the printed value (rounded, reformatted, recomputed, sign style changed).
- FAIL (MUST) if an identifier is masked, re-grouped or otherwise normalised.
- FAIL (MUST) if a dollars-and-cents value printed in two ruled columns is split into two fields.

**§10.4.1 Blanks Inside Sentences** (`forms-blanks-inside-sentences`)
- FAIL (MUST) if a blank inside a printed sentence is missing, moved, or replaced by a key-value line built from the surrounding words.
- FAIL (MUST) if a hint or under-line caption printed with a blank is missing or appears twice.
- FAIL (MUST) if a currency sign printed before a blank is dropped or folded into a label.

**§10.4.2 Checkboxes** (`forms-checkboxes`)
- FAIL (MUST) if a checkbox or radio button visible on the page is missing from the Markdown.
- FAIL (MUST) if a box's rendered state ([x] or [ ]) disagrees with the page image, or a box with only a nearby mark is rendered [x].
- FAIL (MUST) if a checkbox is written with any notation other than [x] or [ ] (e.g. ☐, (x), [unchecked]).
- FAIL (MUST) if a printed pick-one instruction attached to a radio group is missing.

**§10.4.3 Checklists** (`forms-checklists`)
- FAIL (MUST) if a checklist item's box is written after its label instead of before it.
- FAIL (MUST) if checklist items are not nested under their printed group label, or a group-level box is dropped or moved off the group's line.
- FAIL (MUST) if a checklist group label is rendered as a Markdown heading.
- FAIL (MUST) if a short line used as a checklist box is rendered as [blank] instead of [ ] or [x].
- FAIL (MUST) if an item that prints its box before its id is written id-first ("- \[h\] [ ]").

**§10.4.4 Fill-Ins** (`forms-fill-ins`)
- FAIL (MUST) if an empty entry field visible on the page has no [blank] in the Markdown.
- FAIL (MUST) if two side-by-side boxes are merged into one field value.
- FAIL (MUST) if a currency sign printed before a blank is dropped or moved into the label.
- FAIL (MUST) if a preprinted or computed value (0 %, 0.00, #DIV/0!) is replaced by [blank] or omitted.
- FAIL (MUST) if one answer area printed as several ruled lines is rendered as more than one [blank].

**§10.4.5 Option Groups** (`forms-option-groups`)
- FAIL (MUST) if a printed option of a group is missing from the Markdown.
- FAIL (MUST) if the options of one printed question are not nested under a single caption line.
- FAIL (MUST) if an option line does not start with its box ([x] or [ ]), apart from a printed option id placed before the box.

**§10.4.6 Printed Buttons and Placeholders** (`forms-printed-buttons-and-placeholders`)
- FAIL (MUST) if the text of a printed button or input placeholder is missing from the Markdown.
- FAIL (MUST) if a box reserved for a stamp or seal is rendered as a fill-in with [blank].

**§10.5.1 Fields Outside the Form** (`forms-fields-outside-the-form`)
- FAIL (MUST) if a field or checkbox printed outside the main form body is missing from the Markdown.
- FAIL (MUST) if a field printed above the form is placed after the form content, or one printed below it is placed before.
- FAIL (MUST) if an instruction printed between fields is moved away from its printed position or dropped.

**§10.5.2 Form Reading Order** (`forms-form-reading-order`)
- FAIL (MUST) if fields with printed ids appear out of id order.
- FAIL (MUST) if a field without an id is placed inside a run of consecutive ids.
- FAIL (MUST) if fields from two printed sections are interleaved.

**§10.5.3 Sections and Grouped Fields** (`forms-sections-and-grouped-fields`)
- FAIL (MUST) if a printed band or part heading over a group of fields is missing or is not a Markdown heading.
- FAIL (MUST) if a heading or parent group appears in the Markdown that the form does not print.
- FAIL (MUST) if fields printed in a small captioned box are not nested under that box's parent item.
- WARN (SHOULD) if a section heading has exactly one field under it (a sign the heading was invented).

**§10.5.4 Tables Inside Forms** (`forms-tables-inside-forms`)
- FAIL (MUST) if captioned form lines with one amount box each are rendered as rows of a table.
- FAIL (MUST) if a matrix's empty corner header cell is dropped, shifting the column headers.
- FAIL (MUST) if a printed row of a form grid (including a blank row) is missing, merged or reordered, or a row is added.
- FAIL (MUST) if a checkbox cell uses a notation other than [x] or [ ].
- FAIL (MUST) if a table that is the value of a list item is not indented under that item, so that the list is broken.
- WARN (SHOULD) if an ambiguous grid of fields is rendered as a table rather than as field lines.


### §11 Charts

**§11.1.1 Cover Every Data Point** (`charts-cover-every-data-point`)
- FAIL (MUST) if a table representing a chart lacks data-source="chart" on its opening <table> tag, or an ordinary printed table carries that attribute.
- FAIL (MUST) if a chart is rendered as an image reference, a placeholder or a prose description instead of a chart table.
- FAIL (MUST) if a series, a panel, or any category position of a readable series is missing from the chart table (count positions × series on the page).
- FAIL (MUST) if a labeled position with no mark is missing or holds a value other than 0.
- FAIL (MUST) if the chart table contains a series name, category or cell that the page does not print or draw.
- FAIL (MUST) if the chart table departs from category-down, series-across, places its caption on the wrong side of its rows in reading order, or places notes before the table.

**§11.1.2 Labels** (`charts-labels`)
- FAIL (MUST) if a row label or column header of a chart table is not text printed on the chart, apart from axis values for unlabeled positions on a regularly labeled axis.
- FAIL (MUST) if a label differs from its printed string: expanded abbreviation, added colour word, added chart-type word, or unit text imported from an axis note.
- FAIL (MUST) if a value sits in a row or column other than those of the category and series that locate it on the page.
- FAIL (MUST) if two dimensions are merged into one label (e.g. "2024 - Revenue").

**§11.1.3 Multiple Charts and Reference Ink** (`charts-multiple-charts-and-reference-ink`)
- FAIL (MUST) if a chart or panel on the page has no chart table while its marks are locatable and readable, or two charts are merged into one table.
- FAIL (MUST) if a panel served by a shared legend has a table whose columns are unnamed or named differently from the legend.
- FAIL (MUST) if a chart table contains a row, column or value taken from reference ink (average or trend line, shaded band, event callout).
- FAIL (MUST) if the printed text of reference ink, a shared axis title or a shared legend is missing from the output.
- FAIL (MUST) if the printed labels of reference ink are placed somewhere other than after the chart table.

**§11.1.4 Values and Tolerances** (`charts-values-and-tolerances`)
- FAIL (MUST) if a value printed on the chart is missing, truncated, reformatted to a different number, or stripped of printed parts (the percentage in "25 (13.0%)", the parentheses of a negative).
- FAIL (MUST) if an estimated value lies outside the readability tolerance of the checker's own reading: 0.05 on a gridline, 0.1 between gridlines, 0.15–0.2 for small or dense marks, wider only near zero.
- FAIL (MUST) if a mark at the baseline or a labeled position with no mark holds anything but 0.
- FAIL (MUST) if an estimate was read against the wrong axis or as a cumulative height instead of the mark's own value.
- FAIL (MUST) if an estimated value carries an approximation marker or more precision than the axis grid supports.

**§11.2.1 Bars and Histograms** (`charts-bars-and-histograms`)
- FAIL (MUST) if a bar or histogram bin drawn on the page has no row, or a labeled bin with no bar is missing or not 0.
- FAIL (MUST) if an unlabeled bin is labeled by anything other than its axis value, or a printed bin label (catch-all included) is altered.
- FAIL (MUST) if an average line or other reference ink appears as a row or column of the table.
- FAIL (MUST) if a progress bar's current value, target or printed axis end-points are missing.

**§11.2.2 Dual-Axis and Combo Charts** (`charts-dual-axis-and-combo-charts`)
- FAIL (MUST) if a value of a series scaled by one axis matches a reading against the other axis instead of its own.
- FAIL (MUST) if a series name carries a mark type or axis side that its legend entry does not print.
- FAIL (MUST) if a printed value on a combo chart is not copied exactly (e.g. "48,1%" written as "48.1").

**§11.2.3 Gantt and Sankey Charts** (`charts-gantt-and-sankey-charts`)
- FAIL (MUST) if a gantt bar or milestone has no row, or its start or end is more than one period off the printed axis.
- FAIL (MUST) if a traceable sankey flow with a printed value (or a value given by a single-flow node total) is missing, or its source, target or value is wrong.
- FAIL (MUST) if a sankey value was estimated from ribbon width, or a printed node total is missing from the output.
- FAIL (MUST) if a gantt whose task dates are printed as a table is rendered from the bars instead of that printed table.
- FAIL (MUST) if gantt or flow rows use a column layout other than label-start-end / source-target-value, or a bar ending on a tick is not given the last period it fills.
- FAIL (MUST) if a gantt or sankey table lacks its protocol header row (Start | End; Source | Target | Value), unless the page prints its own headers.

**§11.2.4 Legend and Overlay Values** (`charts-legend-and-overlay-values`)
- FAIL (MUST) if any value printed on the chart (on a mark, beside a slice, in the legend, at a line end) is missing from the chart table or not copied exactly, including its sign, parentheses, currency mark and separators.
- FAIL (MUST) if a legend entry carrying a value is split wrongly: the number left in the label, or the name left in the value.
- FAIL (MUST) if a column is given to a series that no printed label names, under an invented name.

**§11.2.5 Line Charts** (`charts-line-charts`)
- FAIL (MUST) if a named line lacks a column, or a labeled x position lacks a row.
- FAIL (MUST) if a value printed at a point or at a line's end is replaced by an axis reading.
- FAIL (MUST) if a trend, average or reference line is given a column.
- FAIL (MUST) if an estimated line value lies outside the readability tolerance of the checker's reading at that x position.

**§11.2.6 Log Scale Charts** (`charts-log-scale-charts`)
- FAIL (MUST) if a value on a logarithmic axis was interpolated linearly across a band (off by more than the readability tolerance from the band-position reading).
- FAIL (MUST) if a value printed for a point (at the mark or in side text) is replaced by an estimate.
- FAIL (MUST) if an event callout appears as a row, column or value of the chart table, or its text is missing from the output.
- WARN (SHOULD) if a log-axis estimate carries more than two significant figures.

**§11.2.7 Maps and Treemaps** (`charts-maps-and-treemaps`)
- FAIL (MUST) if a treemap tile's printed label or value is missing, altered, or replaced by a value estimated from tile area (including a comparator like "<1%" turned into a number).
- FAIL (MUST) if a region's printed value is missing or attached to the wrong region.
- FAIL (MUST) if a region with an unambiguous fill has no class or a class other than the legend entry it matches; a class string, an equivalent range or a value inside the class range counts as a match, and region-name variants (CO / Colorado) count as the same region.
- FAIL (MUST) if a map with no discrete legend is given a table of values read from its shading or pin positions.
- FAIL (MUST) if map classes are placed other than in a last column of a region table.

**§11.2.8 Scatter and Error Bars** (`charts-scatter-and-error-bars`)
- FAIL (MUST) if a named scatter point is missing, or its x or y value lies outside the readability tolerance of the checker's reading.
- FAIL (MUST) if an error bar's centre is given without its interval when the whisker caps are readable; any rendering that conveys low and high ("± 0.13", "(3.47–3.73)", separate columns, prose) counts.
- FAIL (MUST) if a drawn box plot lacks its median or quartiles, or statistics printed beside it are missing or altered.
- FAIL (MUST) if unnamed points of a cloud are rendered as rows under invented names.
- FAIL (MUST) if intervals or box statistics use a layout other than "centre (low–high)" in the cell and label-low-Q1-median-Q3-high rows.

**§11.2.9 Stacked Bars and Waterfalls** (`charts-stacked-bars-and-waterfalls`)
- FAIL (MUST) if a stacked segment or waterfall step holds the cumulative height at its edge instead of its own span.
- FAIL (MUST) if a printed stack total or printed step value is missing or altered (sign and parentheses included).
- FAIL (MUST) if a cell is filled for a stack that draws no segment of that series.
- FAIL (MUST) if text printed beside a bar is detached from that bar's row.


### §12 Images and diagrams

**§12.1.1 Images** (`images-images`)
- FAIL (MUST) if the Markdown contains an image reference (![…](…)) or a bracketed image placeholder where the page prints an image.
- FAIL (MUST) if text legible inside an image on the page is missing from the Markdown or only described.
- FAIL (MUST) if a chart or plot on the page is rendered only as a prose description instead of its data.
- WARN (SHOULD) if the encoding chosen does not match what the image is (e.g. a flowchart as prose, a photo as a table).

**§12.1.2 Images and Figures** (`images-images-and-figures`)
- FAIL (MUST) if the Markdown contains ![…](…) or a bracketed figure placeholder.
- FAIL (MUST) if an equation is delimited with single $ or left as an image reference.
- FAIL (MUST) if text from two printed columns is interleaved line by line instead of read column by column.

**§12.1.3 Logos** (`images-logos`)
- FAIL (MUST) if a logo on the page has no [logo…] marker, or its printed words are missing or altered inside the marker.
- FAIL (MUST) if logo words appear as plain text instead of inside a [logo: …] marker, or the artwork is described.
- FAIL (MUST) if a faint background repeat of a mark breaks into a table or paragraph.
- WARN (SHOULD) if a logo marker is moved out of the header or footer band it is printed in.

**§12.2.1 Blueprints** (`diagrams-blueprints`)
- FAIL (MUST) if a floor plan or architectural drawing is rendered as an HTML table.
- FAIL (MUST) if a room label, printed size, dimension, scale bar or legend entry printed on the drawing is missing or altered.
- FAIL (MUST) if the output invents an adjacency, opening, measured value or corrected dimension not supported by the drawing.
- FAIL (MUST) if the output discards meaningful geometry or uses a description when a faithful diagram encoding is available.
- WARN (SHOULD) if the description does not follow the fixed shape (what it is, then the areas in reading order, then dimensions and notes).

**§12.2.2 Diagrams and Flowcharts** (`diagrams-diagrams-and-flowcharts`)
- FAIL (MUST) if a diagram printed on the page has no rendering at all in the Markdown.
- FAIL (MUST) if a box label, numbered suffix or annotation printed in a graph-shaped diagram is missing from the rendering.
- FAIL (MUST) if a generic graph encoding loses spatial or domain meaning in a circuit, floor plan, map or structural formula.
- FAIL (MUST) if encoded diagram source lacks a diagram/<language> tag matching its body, or a fallback lacks the exact description tag, or a faithfully encodable diagram is replaced by a description.
- FAIL (MUST) if encoded connectors, directions or groups are missing, invented or differ from the page.

**§12.2.3 Electrical Schematics** (`diagrams-electrical-schematics`)
- FAIL (MUST) if the encoding alters circuit symbols, orientation, topology, pins, wires, junctions or crossings, or invents a hidden connection.
- FAIL (MUST) if a designator, component value, pin, terminal or net label printed on the schematic is missing or altered.
- FAIL (MUST) if a description replaces a circuit that a suitable language can faithfully encode.
- WARN (SHOULD) if a fallback description does not follow the fixed shape (what it is, components, pins and nets, visible connections).

**§12.2.4 Geographic Maps** (`diagrams-geographic-maps`)
- FAIL (MUST) if a data map whose values sit in drawn regions is not rendered as a region/value table, or a value is missing or wrong.
- FAIL (MUST) if a table's region names are not printed on the page and its key column header lacks data-recognised.
- FAIL (MUST) if point readings placed only by position are tabulated (by coordinate or otherwise).
- FAIL (MUST) if a printed title, caption, legend entry, label or scale of a map is missing.

**§12.2.5 Slide Diagrams** (`diagrams-slide-diagrams`)
- FAIL (MUST) if a label printed on a figure is missing from the Markdown, or a label or part of a label is transcribed that the page does not show.
- FAIL (MUST) if a figure whose labelled parts are joined by drawn lines or arrows is described only as text when a suitable diagram language can faithfully encode it.
- FAIL (MUST) if a diagram block states what a label means rather than what is drawn.
- WARN (SHOULD) if a described figure does not follow the fixed shape (title, what it is, one bullet per label, values and notes).


### §13 Other

**§13.1 Chemical Molecules** (`other-chemical-molecules`)
- FAIL (MUST) if a legible structural formula on the page is rendered only as a prose description.
- FAIL (MUST) if a printed formula, ion or reaction uses a notation other than \ce{...}, or a drawn structure one other than \chemfig{...}.
- FAIL (MUST) if a standalone chemical formula or structure is not inside a fenced latex block.
- FAIL (MUST) if an atom, charge, bond or substituent in the Markdown is not printed on the page.

**§13.2 Music Notation** (`other-music-notation`)
- FAIL (MUST) if a string printed on a music page (title, credit, marking, lyric, chord symbol, rehearsal letter) is missing from the Markdown.
- FAIL (MUST) if the Markdown contains note names or a music encoding (ABC, LilyPond, MusicXML) for a printed staff.
- FAIL (MUST) if a staff region has no diagram block describing it.
