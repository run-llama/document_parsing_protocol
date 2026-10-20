---
name: dpp-parse
description: Convert a document's pages (PDF pages or page images) into Markdown that conforms to the Document Representation Protocol (working title) — how tables, headings, lists, forms, charts, diagrams and marks on the page are interpreted, and exactly how each is written in Markdown. Optionally also produce a sidecar JSON with a box for every element. Use when asked to parse, transcribe or convert a document to Markdown.
---

# Generate conforming Markdown

Protocol draft source b63884001dbc. Generated from the protocol's rules; do not edit by hand.

## Task

**Input:** the page images of one document, in order.
**Output:** one Markdown document for the whole document. If the request asks for boxes, also a
sidecar JSON as described under "The Sidecar" below; otherwise Markdown only.

## Procedure

1. Look at the whole document before writing: decide the document type (slide deck or paged
   document), which sheet is the cover, and which top/bottom bands recur as page furniture.
2. Work page by page, element by element in reading order, applying the rules below. Separate
   pages with a line containing only `---`.
3. Where two renderings are allowed, pick one and use it for the whole document.
4. Before answering, re-read each page against your Markdown: nothing printed may be missing, and
   nothing may be added that the page does not print.
5. Output only the Markdown (and the sidecar when asked) — no commentary.

Rules marked *(open point)* are not yet settled; follow their working default.

## Rules

### §2 Principles

**§2.1 The Page Is the Ground Truth** (`principles-the-page-is-the-ground-truth`)
- Transcribe exactly what the rendered page shows, typos, spelling and number formats included. Never correct, normalise or complete text.
- Omit hidden, transparent, fully covered, wholly clipped, imperceptibly low-contrast and microscopically invisible text. Do not reveal it through contrast changes, removed overlays, extreme magnification or source extraction; do not include it in metadata.
- Keep small or faint text that is visibly present; use ordinary zoom or higher resolution to inspect it. Preserve readable fragments and mark genuinely unreadable visible spans [illegible], without guessing.
- Read structure (tables, headings, lists) from the printed layout, not from what the content suggests.

**§2.2 Never Drop, Never Invent** (`principles-never-drop-never-invent`)
- Every visible piece of content on the page must appear in your output: last rows, totals, footnotes, margin text, detached cells, repeated tables.
- Never add anything the page does not print: no invented headers, labels, values, merged cells, headings or relationships.
- When unsure how to render something, choose the rendering that loses no content.

**§2.3 Traceability** (`principles-traceability`)
- When boxes are requested, give every Markdown element (heading, paragraph, list item, table, cell when asked, figure, caption, form field) a box on its page covering exactly its printed content.


### §3 Output model

**§3.1 Elements** (`output-elements`)
- Split each page into elements in reading order; give each exactly one class, shared by layout and Markdown: Title, Section-header, Text, List-item, Table, Caption, Footnote, Formula, Picture, Code, Page-header, Page-footer, Form, Key-Value Region, Checkbox-Selected, Checkbox-Unselected, Document Index.
- Render headings as # headings, tables as HTML <table>, formulas as $$…$$, pictures as their content (chart table with <table data-source="chart">, diagram/<language> block, description fallback block or prose description), checkboxes as [x] / [ ].

**§3.2 Markdown Rendering** (`output-markdown-rendering`)
- Output one Markdown document; separate pages with a line containing only --- (blank line before and after). Never use --- for anything else; a printed rule line is <hr/>.
- Use Markdown for headings (#), bold and italic; use HTML for underline <u>, superscript <sup>, subscript <sub>, highlight <mark> and every table (<table>, never pipe tables). A table representing a chart opens with <table data-source="chart">; ordinary printed tables do not carry that attribute.
- Use $$…$$ for all maths, inline and displayed. Use a diagram/<language> fenced block for diagrams, choosing a language that preserves the content: diagram/mermaid, diagram/plantUml or another suitable language; use a description fence only if no suitable language can faithfully represent the figure.
- Keep each page's content on its own page, in reading order; a page with no ink is the single line <!-- blank page -->. Render header and footer bands as their own paragraphs at the start and end of the page, never as headings; you may wrap them in <header>…</header> / <footer>…</footer>.

**§3.3 Boxes and Granularity** (`output-boxes-and-granularity`)
- When boxes are requested, return them at exactly the requested level (none = one box per element; cell = also each table cell; line = also each printed line; word = also each word). If several levels are named, use the finest.
- A box encloses all of its element's printed content and nothing else.

**§3.4 The Sidecar** (`output-the-sidecar`)
- Only when boxes are requested: also return a sidecar JSON listing, per page (page number, width, height), every element in reading order with its class ("type"), its exact Markdown ("md") and its box ("bBox": x, y, w, h in page units, origin top-left); finer boxes go in "layoutAwareBbox" with startIndex/endIndex into that element's md.
- The Markdown must equal the sidecar's md values concatenated in order, pages separated by ---, with each element preceded by its box as an HTML comment anchor, <!-- el p=PAGE x=X y=Y w=W h=H -->, holding the same box as the sidecar.

**§3.5 Output Options** (`output-output-options`) *(open point)*
- Unless the request says otherwise: keep table fragments on their own pages (never join across a page break), describe logos, seals and icons as text rather than referencing an image file, and keep a printed page number inside its header/footer text.


### §4 Document level

**§4.2 Choices Made Once Per Document** (`document-choices-made-once-per-document`)
- Where two renderings are both acceptable (units row as header row or folded into the label, blank rows kept or dropped, a full-width band as header or body cell, a divider row as bold <td> or <th>, an unframed totals block as footer rows or a separate key-value table), pick one at the first page that needs it and use the same one on every later page.
- If a default is named and nothing earlier in the document chose otherwise, use the default.

**§4.3 Cross-Page Tables** (`tables-cross-page-tables`)
- Render each page's part of a table on that page only, complete and exactly as printed; never merge rows from two pages into one table unless a join is requested.
- Never copy a header row from another page onto a fragment that prints none; a headerless fragment stays headerless.
- If a cell's text is cut by the page break, end it where the page ends and put only the visible remainder in the next page's fragment.
- Keep a header row repeated at the bottom of a page's block as a row of that fragment, and keep printed "(continued)" markers as text.
- When returning a sidecar, look at both sides of each page break: if the last table of a page continues as the first table of the next (same columns; no header, a repeated header, or a continued marker), set continuesOnNextPage: true on the first and continuesFromPreviousPage: true on the second; otherwise false.

**§4.4 Document Type** (`document-document-type`)
- Decide once, from the whole document, whether it is a slide deck (landscape sheets, one title each) or a paged document, and which sheet (if any) is the cover.
- Use the Title class and the top-level document title only on the cover. The same words on later pages are page furniture or plain text.
- If there is no cover, emit no Title at all; never promote the first heading to Title.
- With a single page, treat it as a paged document with no cover and render any large title as a heading at the depth the page supports.

**§4.5 Heading Depth Across Pages** (`headings-heading-depth-across-pages`)
- Keep heading depth continuous across pages: a heading that continues an open section keeps the depth it would have without the page break.
- Take depth from printed numbering first (9.2 one level deeper than 9, 9.2.1 one deeper again); without numbering, compare with other headings in the document, not just on the page.
- A subsection is always deeper than its parent. In a slide deck, every slide title is top-level.
- Never make a heading of a running header, a document-kind label such as EXHIBIT 2, a form value or a caption.

**§4.6 Recurring Page Furniture** (`layout-recurring-page-furniture`)
- Before rendering, look across pages for strings repeated in the top or bottom margin (running titles, agency names, form numbers, dates, folios). Treat them as page header/footer on every page, including the first — never as body text and never as headings.
- On the cover, a repeated document name may be the Title; later occurrences are still furniture.
- Keep a band together with any logo in it, and transcribe each variant exactly as printed when the wording changes.


### §5 Layout

**§5.1 Block Annotation** (`layout-block-annotation`)
- Give every visible region with content its own element: one per paragraph, heading, list item, caption, footnote, picture, table, formula, form area. Never one element per line, cell, row, column or word.
- A table or chart is one element around the whole object.
- Split prose at page and column boundaries, and above and below any displayed formula, picture or table that interrupts it.
- In a markdown_attribution sidecar, a paragraph that runs on into the next column is one reference: regions = its pieces, exception multi_column, expected_bbox_count = number of pieces, pieces also as spans. Everything else keeps the default count of 1.
- When boxes are requested, each box is the smallest rectangle containing all the element's ink, never beyond the page; prefer a little whitespace to clipping.

**§5.2 Block Boundaries** (`layout-block-boundaries`)
- A chart or figure is one element including its axes, tick labels, axis titles, legend and any text drawn inside the graphic; a caption printed outside the graphic is a separate caption element.
- Panels under one shared caption are one figure; panels with their own captions are separate figures.
- A table element covers the grid only (headers, rows, aligned totals); its title, caption, source note and surrounding prose are separate elements, even when a decorative frame encloses them together.

**§5.3 Block Classes** (`layout-block-classes`)
- Give every element exactly one class, shared by its layout and Markdown representations: Text, Title, Section-header, List-item, Caption, Footnote, Page-header, Page-footer, Picture, Table, Formula, Checkbox-Selected, Checkbox-Unselected, Code, Document Index, Form, Key-Value Region.
- Title only for the document's own title on its cover; authors, dates and addresses there are Text.
- A caption names or explains an object; a footnote adds a source or note; nearby prose is Text. A regular grid is a Table; irregular entry fields are a Form; a small label/value group without a grid is a Key-Value Region.
- One List-item per item including its marker and continuation lines; a Formula includes its equation number; a checkbox box covers only the mark, never its label.
- Top/bottom margin content is Page-header/Page-footer; widely separated parts of a band are separate elements; a lone page number is a Page-footer.

**§5.4 Court Caption Blocks** (`layout-court-caption-blocks`)
- For the caption block at the head of a court filing: transcribe the left column (party lines and labels such as PLAINTIFF, v., DEFENDANT) as one block of lines, then the right column (court, case number, title) as another block, each printed line on its own line; with more than two cells, take them left to right.
- Write each blank party or case-number line as [blank], next to its printed label.
- Drop the § divider column and the rules; never build a table, a key-value list or an alternating row-by-row reading.

**§5.5 Embedded Pages** (`layout-embedded-pages`)
- When a page is reproduced inside another (an exhibit, a slide on a letter page), output the wrapper header first, then the wrapper label (e.g. EXHIBIT D), then the embedded page in its own reading order including its own running head, then the wrapper footer.
- Keep both page numbers, each in its own band. Never make a title inside an embedded screenshot a heading of the outer document.

**§5.6 Ignoring and Rejecting** (`layout-ignoring-and-rejecting`)
- Leave a region out only if it is a scan artifact (hole-punch ring, roller mark), damaged beyond reading, invisible in the source, or explicitly out of scope. Never leave out logos, page numbers or content that is merely small, dense or awkward.
- A page with no ink at all stays in the output: between its --- separators write only <!-- blank page -->; never drop it and never add any other element for it.

**§5.7 Layout Regions** (`layout-layout-regions`)
- Resolve detector labels to the protocol's element classes and use the same class for each element in layout and Markdown.
- Decide what each region is (table, chart, picture, form, list, caption, formula, checkbox, text) from what is printed before transcribing it; the kind of region decides how it is written.
- Do not trust a region's detected label: address blocks, two-column prose and ungridded spec lists are not tables; a real grid is a table even if nothing labelled it one.

**§5.8 Pleading Line Numbers** (`layout-pleading-line-numbers`)
- On pleading paper or any page with a printed gutter of line numbers, leave the numbers out of the text: write the prose as normal paragraphs, joining wrapped lines, as if the margin were blank. Never put a number between words, never prefix lines with numbers, never build a number | text table. Do not transcribe the double rule.
- When line numbers are requested, return for each such page a line_numbers list: one {line_number, start_index, end_index} per printed number that stands beside a line of text, where line_number is the printed label as a string and start_index/end_index (UTF-16, start inclusive, end exclusive) delimit that line's text in the page's final Markdown. Numbers beside blank lines get no entry.

**§5.9 Reading Order** (`layout-reading-order`)
- Output a page's elements in the order a person reads them, not by vertical position: page header, then the column or section flow, then the page footer.
- On multi-column pages, finish one column before starting the next. On posters and slides with titled panels, finish each panel before the next.
- Place captions next to their figure or table and sidebars or notes where a reader meets them.
- Follow printed numbering of blocks (Region I, II, III…) even when it runs down columns; read an unnumbered grid of equal blocks row by row, finishing each block first.
- Every element appears exactly once.

**§5.10 Slide Furniture** (`layout-slide-furniture`)
- Transcribe every navigation tab along a slide's edge, in printed order, as a header block; wrap the highlighted (active) tab in <mark style="background-color: NAME"> with the nearest HTML colour name.
- Describe each photograph in one line and include any label printed on it.
- Skip purely decorative background art (shapes, faint maps) that prints no labels or values; describe it only if its shape or geography carries content.

**§5.11 Stat Tiles** (`layout-stat-tiles`)
- Write each stat tile (a big number with a short label) as one list line "- label: value", keeping the label's and value's printed bold, in tile order; put the panel's printed heading first.
- Keep signs, units, footnote markers and qualifiers such as "LFL" or "(+1.9%)" on the same line as their value; keep a direction arrow as a bracketed tag such as [up].
- Never list all labels first and all values after.


### §6 Headings and page structure

**§6.1 Dot Leader Lines** (`text-dot-leader-lines`)
- Drop dot leaders (runs of . or … filling space between a label and a value) everywhere: in text lines, contents pages and table stub cells.
- Keep the label and every value the leader connects, verbatim; on one line, separate the values with a single space, e.g. "Rowan T. Ferland, Judge 360-822-4410".
- Never leave dots attached to a label ("Impairments . . .") or to a number.

**§6.2 Line Breaks Inside a Block** (`text-line-breaks-inside-a-block`)
- Keep one printed block (a masthead, an address, a two-line banner or title) as one element; never split its lines into separate headings or paragraphs.
- Between the printed lines of such a block, write a plain newline (no trailing spaces, no <br>); inside a table cell use <br>.
- Join lines that only wrap because the column ran out of width with a single space.
- Use the same break spelling for every multi-line block in the document.

**§6.3 Line Separators and Breaks** (`layout-line-separators-and-breaks`)
- For a horizontal rule printed between sections of a page, write <hr/> on its own line at that point in reading order.
- Never write ---, *** or ___ for a printed rule; --- is only the page separator.
- Do not add <hr/> where the page shows only blank space.

**§6.4 Marginal Notes** (`layout-marginal-notes`)
- Render each note printed in the page margin (a citation such as "15 USC 7215.", a one-word gloss) as its own paragraph.
- Place it immediately after the heading or paragraph it is level with; never insert it inside that heading or paragraph.
- If it is unclear which block a margin note belongs to, still keep it as its own paragraph near its printed position.

**§6.5 Numbered Section Headings** (`headings-numbered-section-headings`)
- Keep a printed section or paragraph number on the same line as its text, exactly as printed ("1.1.", "29.", "(a)"); never renumber it and never escape it just to avoid list formatting.
- If a numbered title stands alone with body text beneath it, render it as a heading, one level deeper for each level of numbering: "## 1. AFFIDAVIT", "### 1.1. COMPLETION AND SIGNATURE".
- If the numbered line is itself the content, or a bare number stands above its paragraph, render a list item carrying the paragraph: "29. As a direct and proximate result …".
- Escape a number only when a line would become a Markdown list although the page prints none (a sentence beginning "1995. was …" → "1995\. was …").
- Never make "Question N", "Interrogatory No. N" or "Request for Production N" labels into headings.

**§6.6 Printed Page Numbers** (`layout-printed-page-numbers`)
- Keep the printed page number inside its header or footer text, exactly as printed ("Page 3 of 12"), in that band's position at the start or end of the page; never as a loose line in the body.
- Only when a printed page number is requested: also record the number alone for the page, label stripped and style kept ("6", "iv", "A-3").
- Never renumber a folio to the sheet position, and never supply one for a page that prints none; "Page ___ of ___" is a blank, not a number.

**§6.7 Recognising Ambiguous Headings** (`headings-recognising-ambiguous-headings`)
- Make a line a # heading only if it is a standalone title that organises the content after it (a document, statement, schedule, section or slide title); never decide by font size alone.
- Keep bold or coloured labels followed on the same line by text, a value or a URL inside their paragraph: "**Original Article:** https://…".
- Keep "Question N", "Interrogatory No. N:" and "Request for Production N" labels, table captions ("Table 1: …"), title bands, column labels, running headers, sidebars and form section labels as ordinary text, never as headings.
- Keep a company line, exhibit label, [logo: …] marker and units line as separate paragraphs around the title heading; keep a printed section number in the heading ("## 19. Personnel expenses") but drop a decorative arrow.
- A statement or schedule title printed inside a table stays once, in its table row, and is not repeated as a heading outside the table.
- Keep heading levels consistent with the hierarchy the page shows; do not make the first heading on a page # by default.

**§6.8 Run-In Headings** (`headings-run-in-headings`)
- When a bold, coloured or small-cap label starts a paragraph and the text continues on the same line, keep label and text in one paragraph: "**Section 11.1.1** The Department requires …".
- Keep the label's printed styling as inline marks (**bold**, *italic*, <u>underline</u>; small capitals as capital letters).
- Never turn such a label into a # heading or put it on its own line.
- A label followed by a value or URL on the same line is one paragraph: "**Original Article:** https://…".

**§6.9 Stacked Headings** (`headings-stacked-headings`)
- When one title is printed over two or three lines, output one heading with the lines joined by single spaces: "## ARTICLE 11 ECONOMIC INCLUSION REQUIREMENTS".
- Never make the lines of one title into two headings, or a heading plus a sub-heading, unless the document clearly gives the second line a subtitle role.
- A company name printed above a statement or document title is its own paragraph above the heading (bold if printed bold), never part of the heading; keep a units or date line beneath as a separate paragraph too.
- Keep exhibit labels ("Exhibit D") and other furniture out of the joined title.
- A title that wraps inside a table cell is joined with a space in that cell.

**§6.10 Table of Contents** (`lists-table-of-contents`)
- Render a table of contents, table of authorities or index as a Markdown list: one item per entry, nested as the page indents it, "label page" with a single space, page numbers exactly as printed (keep every reference of a multi-reference entry).
- Drop the dot leaders. Never render a contents page as a table, unless it is printed as a ruled grid with column headers.

**§6.11 Transcript Pages** (`layout-transcript-pages`)
- On a transcript page (numbered lines with a Q/A column or speaker labels), render each speaker turn as its own paragraph: the marker exactly as printed (Q, A, THE COURT:), then the text, with the turn's wrapped lines joined. Separate turns with a blank line.
- Leave the printed line numbers out of the text; never build a line | speaker | text table.
- When line numbers are requested, return the page's line_numbers list as for pleading paper: each printed number beside text linked to that line's span inside its turn.


### §7 Text

**§7.1 Text Formatting Conventions** (`text-text-formatting-conventions`)
- Maths: LaTeX inside $$…$$, inline ones too (the coefficient $$\alpha$$); never single $.
- Bold **text** and italic *text* only where the printed glyphs are heavier or slanted; never <b>, <i>, <strong> or <em>.
- Underline <u>text</u>; strikeout ~~text~~ over exactly the struck glyphs; superscript <sup>2</sup> and subscript <sub>2</sub>, never ² or ₂.
- Highlight <mark style="background-color: yellow">text</mark> over exactly the highlighted run, naming the nearest HTML colour.
- Links and email addresses as raw text unless link extraction was requested. A signature is [signature:Name], or [signature] when illegible. A logo is [logo: its printed words], or [logo] when it prints none.
- A printed character that Markdown would read as syntax is escaped with a backslash (\*\*, \_, \|, \`), never deleted.

**§7.2.1 Bold and Italics** (`text-bold-and-italics`)
- Write bold as **text** and italic as *text*. Only where the run ends in punctuation and a letter or digit follows directly (so ** or * cannot close), write <strong>…</strong> or <em>…</em> instead, e.g. <strong>---</strong>To be. Never use <b> or <i>.
- Bold or italicise a run only when its printed glyphs are visibly heavier or slanted than the text around it; never because it is a heading, a label or a total.
- Decide run by run and cell by cell; if you cannot tell whether a run is heavier, leave it plain.

**§7.2.2 Displayed Equations** (`text-displayed-equations`)
- Write a displayed equation as LaTeX inside $$…$$ on its own line, and put its printed number after the closing delimiter as plain text: $$V = pu_{y}$$ (2)
- Never drop the equation number, never move it inside the LaTeX or into its own paragraph, and never add a number the page does not print.
- Write the equation as one line of LaTeX even when the page wraps it.
- A formula drawn as boxes joined by operators is still an equation: write it in $$…$$ with each box's printed label as an operand (\text{…} or \textbf{…}), keeping every operator. If the boxes show a process, not arithmetic, render a diagram instead.

**§7.2.3 Drop Caps** (`text-drop-caps`)
- Join an enlarged drop-cap initial to the rest of its word with no space or break: "The modern…", never "T he modern…" or "T\nhe modern…".
- Do not bold, enlarge, colour or otherwise mark the initial; an ornamental initial is still just the letter.
- Read the letter from the image, not from the text layer.

**§7.2.4 Escaping Printed Marks** (`text-escaping-printed-marks`)
- Transcribe every printed character, including ones that are Markdown syntax, and escape them with a backslash where they would change the rendering: \*\* for a printed **, \_ for _, \# for a # at line start, \| inside a table cell, \` for a backtick, \~\~ for ~~.
- A line that opens with printed --- becomes \-\-\- so it is not read as a rule or a page separator.
- A printed bracketed number or word such as [1] or [date] becomes \[1\] or \[date\]; a printed angle-bracket placeholder such as <NAME> becomes &lt;NAME&gt;.
- Never delete the mark and never replace it with a different one (a word, a number, a footnote tag). A raised marker is both tagged and escaped: <sup>\*\*</sup>.
- Do not escape where there is no collision (a * inside a word, a # mid-sentence).

**§7.2.5 Highlighted Text** (`text-highlighted-text`)
- Wrap text printed on a highlighter background in <mark style="background-color: COLOUR">…</mark>, where COLOUR is the nearest HTML colour name (yellow, green, cyan, magenta, lightgray…), never a hex value.
- Start and end the <mark> exactly where the coloured background starts and ends; never widen it to the whole sentence, row or column.
- Never replace a highlight with bold or italic, and never drop it.

**§7.2.6 Inline Equations** (`text-inline-equations`)
- Write every mathematical expression, including a single symbol or variable set as maths in running text, as LaTeX inside $$…$$: the coefficient $$\alpha$$ is fixed.
- Never use single $…$ delimiters, even for inline maths.

**§7.2.7 Line-End Hyphenation** (`text-line-end-hyphenation`)
- When a word breaks across a line end with a hyphen, join the two parts into one word on one line.
- Remove the hyphen when it exists only for the break (Co- / lumbia → Columbia); keep it when it belongs to the word (air- / conditioning → air-conditioning, e- / government → e-government).
- When you cannot tell which it is, keep the hyphen and join the parts.

**§7.2.8 Links** (`text-links`)
- Write URLs and email addresses exactly as printed, as plain text: Contact support@example.com or see https://example.com/pricing
- Do not use [text](url) or <address> syntax unless link extraction was explicitly requested.
- Where the printed words are anchor text such as "click here", write only the printed words; do not add an unprinted URL.

**§7.2.9 Quote Blocks** (`text-quote-blocks`)
- Render a boxed, inset or indented quotation region as ordinary text, with its headings, lists and tables rendered normally.
- Never prefix lines with > block-quote markers.
- Keep every printed word of the region, including quotation marks and any attribution line.

**§7.2.10 Small Capitals** (`text-small-capitals`)
- Write text set in small capitals entirely in uppercase letters, as it looks on the page: JACKSON, J., dissenting — even if the text layer says "Jackson".
- Do not add any small-caps styling; mark bold or italic only if the small-cap glyphs are themselves heavier or slanted.
- Write letter-spaced words as normal words, without the extra spaces: HALVORNE, not H A L V O R N E.

**§7.2.11 Superscript and Subscript** (`text-superscript-and-subscript`)
- Write raised text as <sup>…</sup> and lowered text as <sub>…</sub>: H<sub>2</sub>O, x<sup>2</sup>, 48,210<sup>3</sup>, footnote markers<sup>1</sup>.
- Never use Unicode superscript or subscript characters (², ³, ₂, ¹) in place of the tags.
- Inside $$…$$ maths, use LaTeX ^{…} and _{…} instead.

**§7.2.12 Underlined Text** (`text-underlined-text`)
- Wrap underlined text in <u>…</u>: subject to the <u>prior written consent</u> of the lessor.
- Never use <ins>, and never use underscores (_text_) for underline.
- Underline only the run the page underlines; an underlined italic run is *<u>text</u>*.

**§7.2.13 Verse and Hard Line Breaks** (`text-verse-and-hard-line-breaks`)
- For verse, song text and other text whose line breaks are meaningful, write one printed line per output line, separated by a plain newline (no trailing spaces, no <br>, no code fence).
- Never reflow such lines into running prose. A verse line that wraps only because the column is too narrow stays one line.
- Keep inline marks per line (a bold line is **line**); escape a line that would start a list or heading.

**§7.3.1 Clipped Text** (`text-clipped-text`)
- Where text is cut off at the page edge, write only the characters actually printed: "Research and developmen", not "Research and development".
- Never complete a clipped word and never add "…", "[…]" or any other marker for the missing part.
- Keep the visible fragment; join a clipped line to the next line of its paragraph as usual.

**§7.3.2 E-Signature Tags** (`text-e-signature-tags`)
- A signature field that holds only a coloured e-signing tab ("SIGN", "INITIAL", an arrow) is unsigned: write its value as [blank].
- If the tab prints a word, write that word verbatim on its own line right after the field (e.g. "SIGN▸"), never as the field's value.
- A tab with no word adds nothing. Never write [signature] for a field that only carries a tab.

**§7.3.3 Handwritten Annotations** (`text-handwritten-annotations`)
- Write a handwritten note on a printed page as [handwritten: the legible words], e.g. [handwritten: Attach. B], as its own block next to the content it annotates.
- Never merge the note into a printed sentence, and never guess words you cannot read; keep the legible fragments.

**§7.3.4 Iconography and Symbols** (`text-iconography-and-symbols`)
- Never drop an icon that stands in for a value. Write it as a bracketed tag in the icon's position: [yes], [no], [locked].
- For graded icons write the degree, not just the presence: [sun: full] / [sun: partial] / [sun: none], [water: 1] / [water: 3]. Never collapse different icons to one emoji.
- If the meaning is unclear, describe the shape: [icon: sun].
- An icon that serves as a field label becomes [address], [phone], [web] before its value; never replace it with an unprinted word such as "Phone:".

**§7.3.5 Margin Banners** (`text-margin-banners`)
- Transcribe rotated text printed along a side margin (archive stamps, brand lines, download notices, firm marks) as one separate paragraph, once per page, placed at the start of the page's content.
- Keep its words verbatim, including pure branding; do not describe the rotation.
- Never splice it into body sentences, tables or lists, and never write it as [watermark: …] unless it crosses the body content.

**§7.3.6 Overlapping Text** (`text-overlapping-text`)
- When one printed string is stamped over another (a court filing stamp over a browser header), write each legible string whole as its own paragraph: the stamp first as [stamp: …], then the text beneath it.
- Never interleave the two strings into one line and never drop the underlying text.
- Leave out characters hidden by the overlap; never guess them.

**§7.3.7 QR Codes and Bar Codes** (`text-qr-codes-and-bar-codes`)
- Render a QR code as ![decoded content](QR Code) and a bar code as ![decoded content](Bar code): the decoded payload goes in the alt text, the literal label in the link target.
- If the code cannot be decoded, write ![](QR Code) or ![](Bar code); never guess a payload.
- Make the code its own block, separate from the text around it.

**§7.3.8 Redacted Text** (`text-redacted-text`)
- Replace each contiguous blacked-out or boxed-over span with one [REDACTED], exactly where the hidden text was: "filed by [REDACTED] , against".
- If the redaction prints an exemption code, write it inside the marker once, exactly: [REDACTED: (b)(5)].
- Keep every visible character around and inside a partial mask verbatim; never guess the hidden text or how many characters it had.
- Keep list bullets or line markers that survive the redaction.

**§7.3.9 Seals and Round Stamps** (`text-seals-and-round-stamps`)
- Write a round seal or stamp as its own block: [seal: all legible text] in a readable order (upper rim, centre, lower rim), e.g. [seal: KESSLER & VANE CHARTERED ACCOUNTANTS FRN-408217E • ASTILBE].
- Copy the letters exactly as printed, even when the rim cuts a word short; never complete or guess text.
- Use the bare [seal] only when none of its text can be read. A signature across the seal is a separate [signature] block.

**§7.3.10 Signatures** (`text-signatures`)
- Replace each handwritten signature with [signature], or [signature:Full Name] only when the name can be read from the signature's own strokes. If only partly readable, use [signature].
- Two signatures side by side get two placeholders, in reading order. Handwritten initials or a paraph also get [signature], on every page where they appear, outside the body sentences.
- An unsigned signature field is a blank: [blank].
- A name printed under an illegible signature stays ordinary text after a bare [signature]; typed names and "/s/ Name" on a signature line are written verbatim as text, with no placeholder.

**§7.3.11 Stamps** (`text-stamps`)
- Write ink applied over or beside the printed page (a FILED, RECEIVED, PAID or APPROVED stamp, a court e-filing line laid across the header, a clerk's dated box) as [stamp: its words] exactly as printed, at its place in reading order; a multi-line stamp is one marker with its lines joined by a space.
- A stamp with no legible words is [stamp]. A round seal is [seal: …]; background text across the page is [watermark: …].
- The page's own printed header text is never a stamp. Where a stamp overprints text, write the stamp marker first, then the text beneath it.

**§7.3.12 Text Colors** (`text-text-colors`)
- Ignore text colour when it is decoration (a coloured heading, a page printed in one colour, colour doubled by bold or underline): write the words with no colour markup.
- When colour is the only thing distinguishing some text (an insertion in red, a red negative, a colour-coded status), wrap exactly those words in <font color="NAME">…</font> with the nearest HTML colour name, e.g. <font color="red">confer in good faith</font>. Never a hex code or an invented label.

**§7.3.13 Watermarks** (`text-watermarks`)
- Never drop a watermark (DRAFT, VOID, Sample, a diagonal stamp across the page) and never put its words inside the sentence or table row it crosses.
- Write it once per page that prints it, as the first thing in that page's content: [watermark: DRAFT]. A watermark on several lines is one marker with its lines joined by a space.
- Do not repeat it on pages that do not print it.


### §8 Lists

**§8.1 Bullets and Sub-Bullets** (`lists-bullets-and-sub-bullets`)
- Write top-level bullets with "* " and sub-bullets with "- "; carry any deeper level by further indentation, never flattening levels.
- Keep printed list numbering exactly as printed: 1. / a. / (i) / 1) stay as they are.
- A plain line printed between two bullet runs (e.g. "partially offset by") is a paragraph between two lists, not a bullet.
- Keep a bullet glyph that means something (✓, ✗, ⊗) as the first word after the marker: "* ✓ Bank statement". Drop purely decorative bullet shapes.


### §9 Tables

**§9.1.1 Borderless Whitespace Tables** (`tables-borderless-whitespace-tables`)
- Render a block whose columns exist only as whitespace alignment as an HTML <table>, never as preformatted or code text.
- Take the column tracks from the widest, fullest row; put every value in the track where its left edge sits, leaving cells empty where the page prints nothing.
- If a value straddles two tracks, put it in the track its left edge is closest to; the block is still a table.
- Do not create columns the body rows do not support, even under a printed header line.

**§9.1.2 Chart With a Printed Data Grid** (`tables-chart-with-a-printed-data-grid`)
- When a chart prints a grid of its numbers beside or under it, render that grid as one HTML <table data-source="chart"> exactly as printed: same orientation, same header rows in the same order, same row order.
- Do not transpose the grid, do not add a second reconstructed table for the chart, and do not read values off the bars or axis.

**§9.1.3 Empty Pre-Printed Grids** (`tables-empty-pre-printed-grids`)
- Render a printed grid with no values entered as an HTML <table>: its header rows plus one row of empty cells for every printed empty row.
- Keep every printed row, even dozens of identical empty ones; never trim them to a few.
- Keep any values the empty rows do print (codes, computed zeros) in their cells.
- Never output the header row alone as a table, and never skip an empty form grid.

**§9.1.4 Header-Only Tables** (`tables-header-only-tables`)
- Never output a <table> that holds only a header row.
- If a header row has no rows under it, join it to the body only when that body is the very next thing on the page, its columns line up under the header, and nothing sits in between; then render them as one table.
- If any of those fails, write the header line as plain text instead.
- A blank printed form grid is not a header-only table: render its empty rows too.

**§9.1.5 Is This Even a Table** (`tables-is-this-even-a-table`)
- Render a region as an HTML <table> only when its rows and columns encode a relation: the position of a value in the grid tells what it means (headers, repeated records under one schema, a printed grid or steady column tracks).
- Render a legend or key printed as label/definition records inside a ruled grid as a table.
- Never render two-column prose, address blocks or a caption beside an image as a table. A two-column label/value block with no grid is a table when every row is the same kind of record (an amount per item, a factor per year), and key-value lines when each label names a different kind of fact (form or metadata fields); keep every line either way.
- On a page mixing form fields and a ruled grid, render only the grid as a table and the fields as key-value lines.
- Do not add a header row to a headerless table.

**§9.2.1 Bands Inside the Grid** (`tables-bands-inside-the-grid`)
- A full-width line inside a table (a date, section or category line) whose column headers are not printed again below it does not end the table: render it as one row with a single cell spanning all columns, e.g. <tr> <th colspan="4">Pay TV digital subscribers</th> </tr>.
- Use the same cell type (th or td) for every such band in the document; default to th.
- Never split a table at shading, zebra striping or a colour change.
- A centred entry that sits inside one column, with the other columns' rules running through its row, is an ordinary cell, not a band.

**§9.2.2 Column Continuation** (`tables-column-continuation`)
- When one long series (the key keeps counting up) is printed as several side-by-side blocks, each with the same headers, output one <table> per block in reading order, each with its own copy of the header row.
- Do not invent a wide row joining records from separately framed continuation blocks.
- Split repeated-schema continuation blocks into separate tables even inside one ruled frame; preserve shared title context and every record. Source-printed wide grids and vertical stacking are also accepted.
- If the side-by-side blocks have different titles or super-headers over the same rows, render one wide table with each title as a spanning header cell.

**§9.2.3 Continued in the Title** (`tables-continued-in-the-title`)
- Keep a continuation marker such as (cont'd), (continued), —Continued or Cont'd exactly as printed in the table's title or band; never drop or expand it.
- Render the fragment on this page as its own complete table; do not merge it with rows from another page.

**§9.2.4 Duplicated Tables** (`tables-duplicated-tables`)
- If the page visibly prints the same table twice, output it twice, each in its reading-order position.
- Judge duplication from the page image only; never add a copy that appears only in the text layer, and never drop one that is printed.
- Tables with the same headers but different values are separate tables; output each.

**§9.2.5 Group and Cohort Bands** (`tables-group-and-cohort-bands`)
- If group bands sit over one continuous grid that shares one row-label column (often with a numbered header row like (1) (2) (3) across the full width), output one <table>: bands as header cells spanning their columns, the numbered row kept as a header row.
- If same-shape grids are stacked under cohort bands (FEMALE, MALE…) and no column headers are printed anywhere, output one <table> per band, with the band as that table's first header row.
- Never drop a full-width numbered header row as decoration.

**§9.2.6 Horizontal Slicing** (`tables-horizontal-slicing`)
- When a too-wide table is printed as blocks stacked vertically, each block repeating the same row labels under new column headers, output one <table> per block, top to bottom.
- Keep the repeated row-label column in every block's table.
- Never re-join the blocks into one wide table, even though the row labels match.

**§9.2.7 Repeated Headers and Title Bands** (`tables-repeated-headers-and-title-bands`)
- Within a page, when a table's column-header row (or a title band naming an entity or region) is printed again below data rows, end the table and start a new <table> at the repeat, keeping the repeated header as the new table's header row.
- Never merge such blocks into one table, even if they look like one series.
- A header repeated at the top of a new page does not by itself start a new table.

**§9.2.8 Side-by-Side Mini Tables** (`tables-side-by-side-mini-tables`)
- Render side-by-side boxes that each have their own title and their own column headers as separate <table> elements, even when their rows line up.
- Never join row n of one box to row n of its neighbour, and never fold a small side panel into the body of the table beside it.
- Keep different-schema blocks inside one single ruled frame as the printed grid. Repeated-schema continuation blocks are instead preferably separate tables, even when their frame is continuous.
- Make a spanning header cover exactly the columns printed under it.

**§9.2.9 Split Tables Sharing a Header** (`tables-split-tables-sharing-a-header`)
- If a header row is printed once and a later block of rows on the same page, after a gap, band, heading or divider, does not repeat it, keep those rows in the same <table> under that header.
- Render a heading or band printed in the gap as a full-width row inside the table, not as a table break.
- If row labels are printed once on the left and several value blocks sit beside them, render one table: labels plus every block as further columns.
- Never output a later fragment as a separate headerless table on the same page, and never drop it.

**§9.3.1 Barely-Existing Columns and Headers** (`tables-barely-existing-columns-and-headers`)
- Keep every printed column, including one whose body is entirely empty; keep its header text and any superscript marker on it.
- Leave a blank header or corner cell blank; never write a label such as Category or Item into it.
- Keep a numbered header row such as (1) (2) (3) as a header row of the table.
- Treat a plain-type line naming a section of rows as a header or band row; do not decide headerness from boldness.
- Use rowspan/colspan only where the page prints one merged box; next to a label with ruled empty cells beside it, output separate empty cells.

**§9.3.2 Header Wrap vs Real Tier** (`tables-header-wrap-vs-real-tier`)
- When a column header prints over several stacked lines in one column with no rule between them, join the lines into one header cell with single spaces, e.g. <th>1 YEAR TO LESS THAN 2 YEARS</th>; never make extra header rows from the lines.
- A header line with a rule under it that spans two or more complete sub-labels is a real tier: give it its own header row with the exact colspan.
- If a narrow column breaks a word with no hyphen (Distributio / n) or at a line-end hyphen inside a word (per- / form- / ance), join the pieces into the word (Distribution, performance); keep the hyphen of a real compound (Non-appointed).

**§9.3.3 Multi-Row Header Tiers** (`tables-multi-row-header-tiers`)
- Give every printed header tier its own <tr> of header cells; never merge stacked tiers into one row of concatenated labels like "BI Indicated".
- Set each group header's colspan to exactly the number of leaf columns printed under it; never let a group header cover the row-label column.
- Give the row-label header a rowspan across the header rows when it sits beside a stacked header.
- Never add a header row the page does not print, and never split one printed header row into two.
- Check that every header row, with colspans and blank cells, adds up to the number of columns in the body.

**§9.3.4 SEC Period Tiers** (`tables-sec-period-tiers`)
- In a financial statement header, render "Three Months Ended…", "Six Months Ended…", "Year Ended…" as sibling header cells, each with a colspan over its own date columns.
- Render a qualifier printed above them, such as "Average for the", as a higher header row spanning the period groups.
- Join a month and year stacked in one column ("December" over "2024") into one header cell: December 2024.
- Put a units note such as "$ in millions" in the top-left corner header cell, verbatim; do not change the header structure because one column is bold.

**§9.3.5 Units Row** (`tables-units-row`)
- Render a line of units printed directly under a table's header ($000, (%), S$'m…) either as a second header row of <th> cells aligned to its columns, or folded into each header label as "Premium ($000)"; use the same choice for the whole document, and prefer the header row.
- Never render a units line as a body row.
- A units line printed mid-table between two blocks of rows is a row of <th> cells; do not split the table there.

**§9.4.1 Gutter Columns** (`tables-gutter-columns`)
- When a currency sign ($, €) is typeset in its own narrow column beside a number, put it in the number's cell: <td>$2,414</td>, not <td>$</td><td>2,414</td>. Only values printed with the sign get it.
- When a range or tolerance is split across tracks (value | — | value, value | +/- | value), render it as one cell: <td>48.0% +/- 1%</td>.
- Give marker numerals such as (i), (ii) or a LINE # column their own column, wherever the column sits.
- For any other narrow track, give it its own column only if a person modelling the data in a spreadsheet would.

**§9.4.2 Header Body Column Count Mismatch** (`tables-header-body-column-count-mismatch`)
- Give every row of a table the same number of columns. If the header has more columns than the body prints, keep the header and fill the body positions with empty <td></td> cells.
- Before deciding the body is short, re-check the header for a missing colspan or rowspan.
- Pad with one empty cell per missing position, never with a colspan across the gap, and never copy or invent a value to fill a position.

**§9.5.1 Blank and Spacer Rows** (`tables-blank-and-spacer-rows`)
- When a table prints a fully empty row that is the only thing separating two groups of rows, render it as a row of empty cells (<tr> <td></td> … </tr>) in its printed place.
- Decorative blank lines (even spacing, padding at the foot of a block) may be left out; whichever you do with printed blank rows, do it the same way throughout the document.
- Never add an empty row the page does not print.
- An empty region in a table body may be empty <td> cells or one blank spanning cell; in a loss triangle or matrix use one empty <td></td> per empty position, never a span.
- Beside a header label, use separate empty cells rather than stretching the label's span, unless the page prints one merged cell.

**§9.5.2 Nested Tables** (`tables-nested-tables`)
- When a cell contains a small grid of its own (its own columns, sometimes its own header row), do not write a <table> inside a <td>. Instead add the inner grid's rows and columns to the outer table and give the neighbouring cells rowspan/colspan across them.
- Keep each inner label on the same row as its value; never list all labels and then all values, and never flatten the inner grid into <br/>-separated text.

**§9.5.3 Record Groups and Multi-Line Cells** (`tables-record-groups-and-multi-line-cells`)
- Give each independently printed record line its own <tr>; put rowspan only on a cell the page prints once against several lines (an item number and name beside several ruled sub-rows).
- When one boxed row holds lists in several columns: lines that pair up one-to-one across the columns (line i beside line i) each get their own <tr>; a list whose neighbouring columns print a single value for the whole list stays in one cell, <br/>-joined, beside that value.
- Inside one cell: keep deliberate line breaks as <br/>, join incidental word-wrap with a space, render bullets as <ul><li> or <br/>• items.
- A stub label that wraps onto a second line (values only on one line) is one row with the label joined by a space.
- A cell holding a title and a paragraph stays one cell: title with its printed emphasis, <br/>, then the paragraph.

**§9.5.4 Repeated Identical Values** (`tables-repeated-identical-values`)
- When the same value is printed on several rows (a *, a year, an exchange name, a run of 0), write it once per row in its own cell. Never merge it into one cell with rowspan.
- Use rowspan only when the value is printed once and visibly spans several rows (a single cell covering several ruled lines).

**§9.5.5 Row-Label Hierarchy** (`tables-row-label-hierarchy`)
- When table row labels are indented to show nesting, add data-level to every label cell in that stub: data-level="0" for the leftmost label position, "1" for the next indent step, and so on, e.g. <td data-level="2">iPhone</td>.
- Count the level from the left edge of the stub column for each row on its own; never copy it from the row above and never derive it from whether numbers add up.
- Never express nesting with leading spaces or &nbsp;.
- Treat a row introduced by "of which", "out of which", "within which" (or the same words in another language) as a child of the row it breaks down.
- When sub-labels sit in a second stub column beside a parent label, keep two stub columns: parent in the first (rowspan only if the page prints it as one cell), each sub-label on its own row in the second.

**§9.5.6 Total and Subtotal Rows** (`tables-total-and-subtotal-rows`)
- In a total or subtotal row, write the label cell as <th> and keep the value cells as <td>: <tr><th data-level="0">Total</th><td>234,846</td></tr>.
- Give the total's label a data-level equal to where it starts on the page (0 at the stub's left edge), even if that places it deeper than the rows it sums; then give every label in that stub a data-level too.
- If nothing is printed where the total's label would be, write an empty <td></td> there; never invent "Total".
- Keep label and values verbatim; wrap them in <strong> only if the page prints them bold.
- Keep totals and any rows printed after them in printed order, in the same table.

**§9.6.1 Accounting Number Formats** (`tables-accounting-number-formats`)
- Copy every number in a table cell character for character: keep parentheses for negatives ("(1,204)", "($8.75)", "(2.0)%"), keep a leading minus as a minus, keep "$—", "— %", "n/m", "NM" and change markers like "△2.5%" exactly as printed.
- Keep the page's separators: "1.074.778" and "1.204,50" stay as printed; never switch to the other convention or strip separators.
- Keep spaces printed inside a value ("3.8 %", "$ 17,565.8").
- Output one value per cell — never add a normalised copy (such as -1204 or 0) next to the printed value.

**§9.6.2 Bold and Italic Inside Tables** (`tables-bold-and-italic-inside-tables`)
- Inside HTML table cells write bold as <strong>, italic as <em>, bold italic as <em><strong>…</strong></em>, underline as <u>; never ** or * inside a cell.
- Decide styling cell by cell from the printed glyphs: wrap only the cells (or the runs inside a cell) that are visibly heavier, slanted or underlined. Never bold a whole column or row because some of it is bold.
- Do not add <strong> to header cells for the weight the whole header row shares; mark a header cell only where it differs from the other headings (e.g. an italic stub heading gets <em>).
- If you cannot tell whether a cell is heavier than its neighbours, leave it unstyled.

**§9.6.3 Cell Text Fidelity** (`tables-cell-text-fidelity`)
- Read every table cell off the page image, digit by digit; never copy a text layer or OCR, and never "fix" a value that looks implausible.
- Keep typos, keep separators, keep blank cells blank — never supply a dash or zero for a cell that prints nothing.
- Do not fuse text from two neighbouring cells or two wrapped codes into one cell.
- If a character cannot be read at all, write [illegible] for it rather than guessing.
- Write a printed minus sign (−) as the hyphen-minus "-".

**§9.6.4 Color as the Value** (`tables-color-as-the-value`)
- When a table cell has a coloured fill and no text at all (heatmap, risk matrix, grey "not applicable" shading), write an empty mark carrying the colour: <td><mark style="background-color: red"></mark></td>.
- Use the nearest HTML colour name (red, green, yellow, gray, darkgray, silver…); never write the colour or the legend's meaning as text, and never leave such a cell blank.
- Never merge a shaded region into a colspan or rowspan; one empty mark per shaded cell.
- When a filled cell also prints text, transcribe the text only; the fill is not carried.

**§9.6.5 Handwriting and Stamps** (`tables-handwriting-and-stamps`)
- When a printed value in a table cell is crossed out and a handwritten value replaces it, write both in the cell, struck printed value first: ~~60~~ 55. Never merge the digits into one number.
- A handwritten value in an otherwise empty printed cell is just the cell's content.
- When a stamp (APPROVED, VOID, PAID…) lies over a table, write it once as [stamp: its words] outside the table, never inside any cell and never split across cells.

**§9.6.6 Marks and Symbols in Cells** (`tables-marks-and-symbols-in-cells`)
- Keep a footnote marker in the same cell as the value it marks, as <sup>: 48,210<sup>3</sup>. Never strip it or give it its own column.
- An em-dash alone in a cell is a value: write —. A cell printed blank stays an empty cell; never fill it with a dash, even if its neighbours have one.
- A checkmark, cross or icon that stands in for a value becomes a bracketed word for what it asserts: [yes], [no], [checked], [locked]. Never use an emoji.
- A mark printed several times as a scale is written once per printed mark: [water][water]; never [water:2]. Give each distinct glyph of a scale its own word.
- A symbol glued to a value (▲ 512.40, + <sup>(1)</sup>) stays with the value in the cell, as printed.

**§9.6.7 Struck and Replaced Values** (`tables-struck-and-replaced-values`)
- A table cell with a struck value and its replacement: write both, struck first — ~~1.316~~ 1.335. Never merge them into one number, and read struck cells from the image, not the text layer.
- Wrap exactly the struck glyphs: if only 316 of 1.316 is struck, write 1.~~316~~ 335.
- A replacement marked by underline instead is <u>1.335</u>. A pen correction over a printed value uses the same markup.
- If the page prints old and new values in separate tables or columns, keep them there; never fold them into one cell or build Previous/Current columns yourself.
- In prose, deleted text is ~~…~~ and inserted underlined text <u>…</u>; keep text colour when it is the only thing marking an insertion.
- When one cell in a column is struck, check every other cell in that column for a strike.

**§9.7.1 Bottom Edge Totals and Islands** (`tables-bottom-edge-totals-and-islands`)
- Never drop lines printed just below or beside a table (totals, "Selected …" lines, boxed values, small offset boxes).
- If they sit inside the table's frame or continue its ruled column grid, or their values line up under the table's columns, add them as extra <tr> rows at the bottom of that table, each value in the column it sits under.
- If they stand apart and line up with nothing, write them as their own small <table>, one <tr> per printed line with a label cell and a value cell.
- A footnote line is not such a block: it goes after the table as a paragraph.

**§9.7.2 Footnotes Inside the Frame** (`tables-footnotes-inside-the-frame`)
- A footnote line under a table (starting with a marker such as ¹, *, (a) or "Note:") is never a table row, even when it is printed inside the table's border: close the </table> and write the footnote as a paragraph right after it.
- Transcribe the footnote verbatim, keeping its leading marker (a raised marker as <sup>1</sup>) and its printed styling.
- Keep the footnote reference markers inside the cells where they are printed, e.g. <td>Other trading<sup>2</sup></td>.

**§9.7.3 Titles Banners Captions** (`tables-titles-banners-captions`)
- A title band that shares the table's border or background fill is the first row of the table: one <th colspan="N"> spanning every column of the region it heads (not just the width of its letters), never a title cell padded with empty cells.
- Render each table or chart caption once as <caption> inside its table HTML: first content after the opening <table> tag if read before the object, last content before </table> if read after it. Chart tables open with <table data-source="chart">. Keep Caption as its class and give it its own layout box.
- Never turn a table or figure caption into a # heading; keep its printed bold/italic runs exactly.
- Render a divider row that names no columns (e.g. "Part I — Financial Information") as <td colspan="N"><strong>…</strong></td>, the same way for every such band in the document, and never as part of the column-header rows.

**§9.8.1 Rotated and Diagonal Content** (`tables-rotated-and-diagonal-content`)
- If a table (or the whole page) is printed sideways, mentally rotate it and transcribe it in its own reading orientation; never in page order.
- Text printed vertically in a header, including a label running down the side of the stub, is an ordinary header cell: write it upright, with the span it has on the page.
- A corner cell split by a diagonal line into two labels is one cell: write both labels separated by " \ ", the label across the top first (e.g. MONTH \ COUNTRY). Never split it into two cells or drop either label.

**§9.8.2 Triangles and Matrix Tables** (`tables-triangles-and-matrix-tables`)
- In a triangle or jagged matrix (loss development, claims by paid and incurred month), give every row the full column count.
- Fill each position the page leaves blank with its own empty cell <td></td>; never cover the empty region with colspan or rowspan.
- Never write 0, n/a or a repeated value into a blank position; but where the page prints 0s in the future half, keep every 0.


### §10 Forms

**§10.1 Forms and Key-Value Regions** (`forms-forms-and-key-value-regions`)
- Render fill-in fields, checkboxes and blanks as a "- **Label:** value" key-value list, never as a table, even when they line up like a grid.
- Render a static label/value block (no blanks, no boxes) as plain text lines unless it is printed inside a ruled border; only a ruled block becomes a <table>.
- Never build a two-column key/value <table> the page does not print as a ruled grid.
- A totals block printed directly under a table belongs to that table.

**§10.2 Repeated and Unlabelled Fields** (`forms-repeated-and-unlabelled-fields`)
- When a form repeats the same set of fields with no heading on each repetition, output each repetition as its own group of "- **Label:** value" lines, in printed order, with one blank line between groups.
- Never add headings or labels such as "Vehicle 1" or "Child 2" that the page does not print.
- A field with no printed id and no label is written as its bare value, or a bare [blank] when empty.

**§10.3.1 Ids and Labels** (`forms-ids-and-labels`)
- The id is the short printed designator of a field (1a, e, H1, Part III): write it as \[1a\] before the bold label, never inside it.
- The label is the printed caption, copied exactly: same abbreviations, capitals and punctuation. Never use a caption as an id.
- When a run of ids prints only the first in full (35a, then b, c, d), write the implied full ids: \[35a\], \[35b\], \[35c\], \[35d\].

**§10.3.2 The Key-Value List** (`forms-the-key-value-list`)
- Render fillable form content as a Markdown list, one field per "- " item, never as a table.
- Line format: "- \[id\] **Label**: value". Write the id only if printed, in escaped brackets \[ \] outside the bold label; write the label only if printed.
- Empty fill-in: [blank]. Checkbox: [x] checked, [ ] unchecked. Option lines start with the box: "- [x] Single".
- A printed section heading becomes a Markdown heading; a box whose id covers several fields becomes a parent item with nested children.
- If the printed label ends with ":", keep the colon inside the bold: "- **CONTACT NAME:** Melinda Clayton". If the value is printed on a different line from the label, add no ":" after the label.

**§10.3.3 Values Are Verbatim** (`forms-values-are-verbatim`)
- Copy every entered value exactly as printed: same digits, separators, decimals, spacing, sign style and parentheses. Never round, reformat, compute or summarise.
- Copy identifiers (SSN, TIN, policy and account numbers) exactly as printed, in the page's own grouping; never mask or re-group them.
- Dollars and cents printed in two ruled columns are one value: 1,234.00.

**§10.4.1 Blanks Inside Sentences** (`forms-blanks-inside-sentences`)
- Keep a sentence with gaps as one sentence; write each gap as [blank] exactly where it is printed. Do not turn the sentence into "label: value" lines.
- Keep a hint printed with a blank, such as "(date)" or "(DD/MM/YYYY)", next to that blank, once, with its printed styling.
- A caption printed under a line belongs to that blank: as a standalone field write "- **CAPTION** [blank]"; inside a sentence put the caption right after its [blank].
- A currency sign printed before a blank stays attached: $[blank].

**§10.4.2 Checkboxes** (`forms-checkboxes`)
- Write a checked box as [x] and an unchecked box as [ ]; never leave out an unchecked box.
- Count a box as checked only when a clear mark sits inside it; a mark beside it, or any doubt, means [ ]. Read the state from the image, not from embedded text.
- A lone labelled box goes in the value position: "- **Label**: [x]". A box with a write-in: box first, then the text: "- **Other (specify):** [x] consulting".
- Radio buttons use the same [ ] / [x]; keep every option and any printed "check one" instruction.
- Include boxes printed in headers, margins and footers.

**§10.4.3 Checklists** (`forms-checklists`)
- Write each checklist item box-first: "- [ ] Item text". Nest items under their group label; a box printed before the group label stays on that line: "- [ ] **Division 9 rate filings**".
- Do not turn checklist or form group labels into # headings.
- A short line (___) standing where a box would be, before an item, is a checkbox: write [ ]. Use [blank] only where the line asks for written text.
- A ruled grid whose cells each hold a checklist is a <table>; inside a cell write the items as <ul><li>[ ] Item</li></ul>.
- When a box is printed before an item's id, write the box first, then the id: "- [ ] \[h\] …".

**§10.4.4 Fill-Ins** (`forms-fill-ins`)
- One line per printed entry field. Write an empty field as [blank]; never leave it out.
- Shapes: "- \[1\] **Label**: value"; id but no label: "- \[9\]: [blank]"; no id and no label: the bare value, or a bare [blank].
- Two boxes printed side by side under one id are two fields: nest them under the id, never merge their values.
- Keep a currency sign printed before a blank: $[blank] (keep printed spacing, leave the label unchanged).
- Several ruled lines for one answer are one [blank]. Values the form prints before filling (0 %, 0.00, #DIV/0!) are copied as printed, never blanked.
- After a bare "Signed:" or "Date:" that a form clearly asks to fill, write [blank]; do not do this for a colon in ordinary prose.

**§10.4.5 Option Groups** (`forms-option-groups`)
- A question answered by ticking printed boxes is one group: "- **Caption**" (or "- \[id\]" when only an id is printed), then one nested line per option: "  - [x] Option" / "  - [ ] Option".
- List every printed option, ticked or not. Yes/No questions are groups too.
- Keep an option's own printed id where it is printed; when printed before the box: "  - \[1\] [ ] 8814". A write-in goes after the box: "  - \[3\] [ ] [blank]".

**§10.4.6 Printed Buttons and Placeholders** (`forms-printed-buttons-and-placeholders`)
- Transcribe the text of printed buttons (Print, Save, Clear, FAQs) and of input placeholders as plain text where they sit, in reading order.
- For an empty box reserved for a stamp or seal ("File Stamp Here", "[SEAL]"), write only its caption as text; do not add [blank].

**§10.5.1 Fields Outside the Form** (`forms-fields-outside-the-form`)
- Transcribe fields printed outside the form body (header, margins, footer), e.g. "CORRECTED", "Final K-1", "Amended K-1" boxes: those above the form go before the form's fields, all others after them.
- Keep instructions, preambles and fine print exactly where they are printed, between the fields they sit among.

**§10.5.2 Form Reading Order** (`forms-form-reading-order`)
- Order a form's fields by their printed ids (1, 2, 3… / a, b, c…), not by their position on the page. Finish one id scheme before starting another.
- Keep a run of consecutive ids together; place fields without ids before or after the run, never inside it.
- Never mix fields from two printed sections, even when they sit side by side.

**§10.5.3 Sections and Grouped Fields** (`forms-sections-and-grouped-fields`)
- A bold or boxed band naming a group of fields (Part I, POLICY INFORMATION, Sign Here) becomes a "### " heading, with its fields as list items below it. If a designator is printed beside the title, write it as the id: "### \[Part II\] Information About the Partner".
- A small printed box whose label covers several entries becomes a parent list item with the entries nested beneath it.
- Never add a heading or parent group the form does not print. Do not make form section labels part of the document's own heading outline.

**§10.5.4 Tables Inside Forms** (`forms-tables-inside-forms`)
- On a form, use a <table> only for a real grid: shared printed column headers over same-shaped rows, or a row-by-column matrix. Otherwise, and when unsure, write field lines.
- A numbered line with its own caption and one amount box is a field line, even if the amounts line up in a ruled column.
- Keep a matrix's empty corner header cell (<th></th>). Keep every printed row, including blank rows, as rows of empty cells; checkbox cells are [x] / [ ].
- When a field's value is a grid, write the field line, then a blank line, then the <table> indented to the list item's content column, then a blank line.


### §11 Charts

**§11.1.1 Cover Every Data Point** (`charts-cover-every-data-point`)
- Render every chart as an HTML <table data-source="chart"> of its data: one row per category position (in axis order), one column per series (in legend order), the category labels in the first column and the printed series names in a header row.
- Include every position of every series and every printed callout; a labeled position with no mark is 0; a position the axis does not label gets a row labeled by its axis value (2023 between ticks 2021 and 2024).
- Put the chart's printed title, subtitle or caption in <caption> inside its table, first if read before the chart and last if read after it. Put notes, source and other printed chart text (axis titles not used as headers, reference-line labels, callouts, annotation boxes) after the table as plain text.
- Leave out only points that no printed label can locate or that are unreadable; never invent a series name, category or placeholder cell to cover them.

**§11.1.2 Labels** (`charts-labels`)
- Take every row label and series name from text printed on the chart (axis ticks, legend entries, direct labels) and copy it exactly: keep abbreviations and parentheses inside legend text; never add colour words, chart-type words or units printed elsewhere (an axis note like "(USD bn)" stays out of the label and is kept as its own text).
- Put each dimension in its own place: category in the row label, series in the column header; never merge them into one label like "2024 - Revenue".
- Label an unlabeled position on a regularly labeled axis by its axis value (e.g. 2023).
- Give each chart its own table with its printed title in <caption>, first or last inside the table according to reading order; do not repeat it outside the table.

**§11.1.3 Multiple Charts and Reference Ink** (`charts-multiple-charts-and-reference-ink`)
- Give every chart and every panel its own chart table in reading order, with its printed title or panel heading in <caption>, first or last according to reading order; cover every panel. A shared caption appears once, first inside the first panel's table or last inside the last panel's table according to reading order.
- When one legend serves several panels, use its series names as the column headers of every panel's table; keep a shared axis title once, as text.
- Never add a row or column for an average line, trend line, shaded band or event callout, and never read values from them; keep their printed labels as plain text after the table.
- If a panel prints no labels or scale that locate its marks, give it no table and keep only its printed text.

**§11.1.4 Values and Tolerances** (`charts-values-and-tolerances`)
- Copy every value printed on or beside a mark exactly and in full: "25 (13.0%)", "2,08", "($60B)", "$1,581B", footnote markers as <sup>; a printed value beats what the bar height suggests.
- Where no value is printed, estimate the mark's visual centre against its own axis (the right-hand axis for a series scaled by it, the decade bands of a log axis, a stacked segment's own two edges) and write a bare number in the axis's format (keep its % mark and digit grouping), no "~", no more precise than the grid supports.
- Write 0 for a mark drawn at the baseline and for a labeled position with no mark.
- For 3-D bars, read the edge on the axis plane, not the perspective top; if the plane is ambiguous, take the midpoint of the plausible readings.

**§11.2.1 Bars and Histograms** (`charts-bars-and-histograms`)
- Render a bar chart as a table with one row per bar category (top to bottom for horizontal bars) and one column per series; a highlighted or "average" bar is an ordinary row, an average line is not a row.
- For a histogram, give every bin a row: printed bin labels verbatim (catch-alls like "> 15000" included), unlabeled bins labeled by their axis value, and 0 for a labeled bin with no bar.
- Render a progress bar as a small table holding the axis start, the current value with its label, and the target with its label, in axis order.

**§11.2.2 Dual-Axis and Combo Charts** (`charts-dual-axis-and-combo-charts`)
- On a chart with two value axes, find which axis scales each series (legend order, mark type, tick magnitudes) and read every unprinted value against that axis only.
- Lay the table out as usual: one row per x position, one column per series named exactly as the legend prints it; never add "(line)", "(bars)" or "right axis" to a name.
- Copy printed values exactly, including decimal commas and percent marks.

**§11.2.3 Gantt and Sankey Charts** (`charts-gantt-and-sankey-charts`)
- Gantt: write one table row per task bar or milestone, top to bottom: label, start period, end period, with periods in the axis's own tokens ("Jan", "Q1 2025"); a milestone has start = end; for a bar ending on a tick, use the last period it visibly fills.
- If the gantt prints each task's dates in a table beside the bars, transcribe that printed table as it is and add nothing from the bars.
- Sankey: write one table row per ribbon: source node, target node, value, with node names stripped of their printed totals; ordered by source then target.
- When only node totals are printed, use a node's total as the value of its single inflow or single outflow; keep every other printed node total as a text line after the table ("Industry 165"); never estimate values from ribbon widths.
- Head a gantt table <th></th><th>Start</th><th>End</th> and a sankey table <th>Source</th><th>Target</th><th>Value</th>: these protocol header rows are written even though the page does not print them.

**§11.2.4 Legend and Overlay Values** (`charts-legend-and-overlay-values`)
- When values are printed on the marks, beside slices, in the legend or at line ends, put every printed value in the chart table exactly as printed ("$1,581B", "($60B)", "$75.89").
- For a legend entry like "Solar (45%)", use "Solar" as the label and "45%" as the value.
- Give twin charts that reuse the same labels one table each, under each chart's printed title.
- Give an unnamed series that no printed label can locate no column; never invent a name for it.

**§11.2.5 Line Charts** (`charts-line-charts`)
- Render a line chart as a table with one row per x position and one column per line, each column headed by the line's legend entry or the name printed at its end.
- Copy values printed at points or line ends (the part of an end label after the name, e.g. "11 Tcf, +150%" for "High: 11 Tcf, +150%"); estimate every other value at the line's centre at that x position.
- Add rows for unlabeled x positions only by their axis value; never add rows for wiggles between positions, or columns for trend, average or reference lines.

**§11.2.6 Log Scale Charts** (`charts-log-scale-charts`)
- On a logarithmic axis, estimate each unprinted value by where the mark sits inside its decade band (a third of the way from 1 000 to 10 000 is about 2 000), to at most two significant figures, in the axis's digit grouping ("16 000").
- Use values printed anywhere for a point (at the mark or in side text naming it) instead of an estimate.
- Keep event callouts as text after the table; never turn them into rows or columns.

**§11.2.7 Maps and Treemaps** (`charts-maps-and-treemaps`)
- Treemap: one row per tile with its label and its printed value exactly as printed; for a tile printing only a comparator ("<1%") keep that text; never estimate a value from tile area.
- Map with values printed per region or pin: one row per region with the printed value.
- Shaded map with a discrete legend: give each region the legend class it matches, copied verbatim (e.g. "30%-<35%"), in a last column headed by the legend title if one is printed; leave the class empty for a region whose fill sits between two swatches.
- Map with shading but no discrete legend, or with event pins: no chart table; transcribe its printed text, and render any chart beside it as its own table.

**§11.2.8 Scatter and Error Bars** (`charts-scatter-and-error-bars`)
- Scatter: one row per named point with its x and y values, the two columns headed by the printed axis titles; unnamed points get no row; a fitted trend line adds nothing.
- Error bars: write the centre (printed value exactly, with any footnote markers, or an estimate) followed by the whisker ends read at the caps, as "3.60 (3.47–3.73)"; omit the interval only if the caps cannot be read.
- Box plot: one row per box with its label, then low whisker end, first quartile, median, third quartile, high whisker end (whisker ends only if drawn), under the protocol header row <th></th><th>Low</th><th>Q1</th><th>Median</th><th>Q3</th><th>High</th>; copy any statistics printed beside the plot as text after the table.
- Marker series over categories are ordinary columns, one value per marker.

**§11.2.9 Stacked Bars and Waterfalls** (`charts-stacked-bars-and-waterfalls`)
- Give each stacked segment its own size (top boundary minus bottom boundary), never the cumulative height at its top; give each waterfall step the rise or fall it draws, with negatives as printed ("(348)").
- One column per segment series in legend order; leave a cell empty where a stack has no segment of that series; put a printed stack total in a last column with an empty header.
- Treat waterfall anchors (start and end levels) as their own rows holding levels; give a printed second axis tier ("Generation" / "Change") its own column, spanning the categories it groups.
- When lines of text are printed beside each bar, keep them in the bar's row as a list in a column of their own.


### §12 Images and diagrams

**§12.1.1 Images** (`images-images`)
- Never write an image reference like ![caption](path) and never a placeholder like [image] or [The image shows…]; put the image's content into the Markdown.
- Decide what the image is, in this order: text rendered as a picture → transcribe the text verbatim; a chart or plot → a table of its data points; a labelled schematic → a suitable diagram/<language> block, or description only when no faithful encoding is available; a graph of relationships or a flow → a ```diagram/<language> fenced block using Mermaid, PlantUML or another suitable language; a photo or decorative art → a short prose description.
- If any text is legible inside the image, transcribe it; never replace legible text with a description of it.
- For maps, chemical structures, circuits, floor plans and music, keep every printed label and string, and choose the encoding that loses no content.

**§12.1.2 Images and Figures** (`images-images-and-figures`)
- Never emit ![caption](path) or a bracketed placeholder for a figure; render its content as text, an HTML table, a ```diagram/<language> block (graphs; Mermaid, PlantUML or another suitable language) or a ```description block only when no language can faithfully encode the schematic, or a prose description (photos, decorative art).
- Write every equation, inline or displayed, as LaTeX between $$ and $$; never single $.
- Unroll multi-column text into one column in reading order; do not reproduce the column split.

**§12.1.3 Logos** (`images-logos`)
- Render a logo or wordmark as [logo: its printed words] exactly as printed (same case), at the logo's place in reading order, e.g. [logo: OSTREVANE]; a two-line wordmark is one marker with its lines joined by a space. A logo in a header or footer band stays in that band.
- A logo with no legible text is [logo]. A symbol beside its own wordmark is part of the same marker.
- Never describe the artwork. A faint repeat of a mark behind the content adds nothing and must not break into the table or text it lies behind.

**§12.2.1 Blueprints** (`diagrams-blueprints`)
- Encode floor plans as diagram/tikz, then diagram/svg, or another faithful language; preserve walls, openings, relative geometry and labels. Never substitute a table or a room graph that discards geometry.
- Only if no suitable language can faithfully encode it, describe it in a fenced block tagged description, in this shape: one line saying what the drawing is; then a list with one item per labelled area in reading order (top to bottom, left to right), the label then its printed size, both exactly as printed (an area with no size is listed by its label); then every dimension line, scale bar, legend entry and note, verbatim.
- Preserve visibly drawn walls and openings; do not infer hidden connections, computed areas or corrected dimensions. Drawing coordinates are not measured dimensions; copy printed dimensions even if inconsistent.

**§12.2.2 Diagrams and Flowcharts** (`diagrams-diagrams-and-flowcharts`)
- Use diagram/<language> fences with valid syntax: prefer mermaid for flows and blocks, plantUml for UML, dot for dense graphs, tikz then svg for spatial plans, circuitikz then tikz then svg for circuits; use another suitable language if needed. Preserve labels, geometry, symbols, connectors, directions and groups.
- Keep numbered suffixes (①, ②), hours and other annotations printed with a box inside that node's label; use a subgraph titled with a printed group label.
- Do not draw edges the page does not print.
- Use a description fence only when no suitable language can faithfully encode the figure; describe visible structure and retain all legible text without inferred measurements or connections. Render actual tables as HTML <table>; apply specialised map, chemistry and music rules.
- Never leave a diagram out.

**§12.2.3 Electrical Schematics** (`diagrams-electrical-schematics`)
- For component-level circuits, prefer diagram/circuitikz, then diagram/tikz, then diagram/svg, or another faithful language. Preserve symbols, orientation, pins, wires, junctions and crossings.
- For functional block diagrams, prefer diagram/mermaid, then diagram/plantUml, then diagram/dot, then diagram/tikz, then diagram/svg; preserve blocks and signal connections.
- Only if no suitable language can faithfully encode the circuit, use description: what it is; components in reading order with designators and values verbatim; pins, terminals and nets; visibly drawn connections. Do not guess junctions or hidden wires.
- Never compute, normalise or correct a component value.

**§12.2.4 Geographic Maps** (`diagrams-geographic-maps`)
- A shaded or labelled data map whose values each sit in a drawn region: render an HTML <table data-source="chart">, region then value, keeping the legend's units in the caption. If the regions are not named on the page, name them from their recognisable outlines and mark the key column's header cell with data-recognised, e.g. <th data-recognised>Region</th>.
- A map of values plotted at points with no names: describe it and transcribe its legend; do not build a table, not even keyed by coordinates.
- A map whose content is geography (routes, borders, positions): describe it, transcribing every printed label, legend entry and scale.
- Always keep the map's printed title, caption, legend, labels and scale.

**§12.2.5 Slide Diagrams** (`diagrams-slide-diagrams`)
- If a labelled figure's parts are joined by drawn lines or arrows, choose a faithful diagram language in a diagram/<language> fence (diagram/mermaid, diagram/plantUml or another suitable language): preserve each labelled part, drawn connector, direction and meaningful position.
- Only when no suitable language can faithfully encode the figure, write a fenced block tagged description: the figure's printed title as a ## heading if it has one; one line saying what the figure is in plain visual terms; one bullet per printed label in reading order, "- **label**: what is visibly drawn there" (a repeated label listed once with its count); then printed values, scales and notes verbatim.
- Never explain what a label means; include every printed label verbatim; keep <sup>/<sub> and $$…$$; transcribe only the visible part of a partly hidden label.
- Render text around the figure (slide title, bullets) and any small charts (as chart tables) as their own elements outside the block.


### §13 Other

**§13.1 Chemical Molecules** (`other-chemical-molecules`)
- Write formulae, ions and reactions printed on a line with mhchem: \ce{SO4^2-}, \ce{2H2 + O2 -> 2H2O}.
- Write drawn structures (rings, branches, drawn bonds) with \chemfig{...}; never replace a legible structure with a prose description.
- Put a standalone formula, reaction or structure in a fenced ```latex block.
- If part of a structure is unreadable, describe that part in words; never guess atoms, bonds or charges.

**§13.2 Music Notation** (`other-music-notation`)
- On a page of printed music, transcribe every printed string as ordinary text: title, credits, instrument names, tempo and expression marks, dynamics, lyrics, chord symbols, bar numbers, rehearsal letters, footnotes, copyright lines.
- Never read the staff into notes: no note names, no ABC, LilyPond or MusicXML.
- Describe each staff region as a fenced block tagged description: one line with the number of staves, instruments if printed, clef, key and time signature as drawn, and the number of bars; then one bullet per text symbol printed on the staff (chord symbols, rehearsal letters, bar numbers, dynamics), verbatim, with where it is drawn.
