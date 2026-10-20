---
title: Text Colors
rule_id: text-text-colors
status: rule
scope: page
tags: [text, formatting, color]
---

# Text Colors

> [!success] ✅ Normative
> Text colour MUST be carried only when it is the only thing distinguishing some text from the rest,
> written as `<font color="NAME">…</font>` around exactly the coloured words, with the nearest HTML
> colour name. Colour that is decoration MUST NOT be rendered.

Coloured text in the source document.

## Decoration or meaning

Most coloured text is styling: a blue heading, a brand-coloured lead paragraph, a page printed in
one colour. The words are kept and the colour is not rendered.

Colour becomes content when it is the **only** thing distinguishing some text from the rest — an
insertion printed in red with no underline, a figure in red meaning negative, a status word whose
colour is the status. There the colour MUST be carried:

```text
… will testify. <font color="red">Before or promptly after the notice or subpoena is served …</font> A subpoena …
```

- The element wraps exactly the coloured words, so the output says which text carries the colour.
- The colour MUST be the nearest HTML colour name — not a hex value and not an invented label.
- Text whose colour is doubled by another mark — red *and* underlined, red *and* bold — is already
  distinguished; the colour is decoration there and is not carried.

## The extreme case

A cell that is a coloured fill with *no text at all* — a risk-matrix square, a heat-map grid —
becomes an empty cell if the colour is dropped, and the whole table stops meaning anything. See
[[Color as the Value]] for that situation specifically.

## Staying consistent

Highlighting already has a settled encoding built on the same vocabulary:

```text
<mark style="background-color: HTML_COLOR_NAME">…</mark>
```

Text colour uses the nearest HTML colour name too, so there is one colour vocabulary for both:
`<mark style="background-color: NAME">` for a highlight, `<font color="NAME">` for coloured text.

### ✅ **Sample** — a whole page in one colour

![[bag-red-body-text.png]]

Every word on the page, headings included, is set in dark red. Nothing is distinguished from
anything else by the colour, so it is decoration and the output carries none of it.

<details>
<summary>Expected Markdown · excerpt, first paragraph</summary>

```markdown
action is pending. The application is not served on the deponent but remains on file and accessible to him like the pleadings in an action brought in Halvana. The actual subpoena (Official Form 16) should include a reference to the application and the clerk's office where it is filed. An accurate statement of the title of the court and action, including docket number, is required by subparagraphs (i) and (ii) both for completeness of the record in Halvana and to enable the deponent to obtain copies of the pleadings if necessary. The term “proceeding” is used to make clear that the rule is not limited to civil actions but may be used to obtain depositions for use in probate, administrative, or criminal proceedings if the law of the other jurisdiction so provides. The statement of the action required by subparagraph (iii) should indicate briefly the factual basis of the plaintiff's claim or other matter. Pertinent discovery provisions of the law of the other jurisdiction should at least be summarized and a proper citation given.

<!-- … -->
```

</details>

<!-- skill:generate
- Ignore text colour when it is decoration (a coloured heading, a page printed in one colour, colour doubled by bold or underline): write the words with no colour markup.
- When colour is the only thing distinguishing some text (an insertion in red, a red negative, a colour-coded status), wrap exactly those words in <font color="NAME">…</font> with the nearest HTML colour name, e.g. <font color="red">confer in good faith</font>. Never a hex code or an invented label.
-->

<!-- skill:check
- FAIL (MUST) if colour that is the only thing distinguishing some text is lost in the Markdown.
- FAIL (MUST) if coloured text is written other than as <font color="NAME">…</font> with an HTML colour name (a hex value, a span, an invented marker).
- WARN (SHOULD) if colour markup is added for text whose colour is only decoration.
-->

## Related

- [[Highlighted Text]] — the settled encoding that shares the colour vocabulary
- [[Color as the Value]] — a fill with no text that is the value
