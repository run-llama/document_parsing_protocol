---
title: Verse and Hard Line Breaks
rule_id: text-verse-and-hard-line-breaks
status: rule
scope: page
tags: [text, formatting, line-breaks]
---

# Verse and Hard Line Breaks

> [!success] ✅ Normative
> Text whose line breaks carry meaning — verse, song text, deliberately broken lines — MUST be
> written one printed line per source line, separated by a plain newline, and MUST NOT be reflowed
> into running prose. No trailing spaces, no `<br>`, no fenced block: the same spelling as
> [[Line Breaks Inside a Block]].

Poetry, song text, addresses and deliberately broken lines carry meaning in their line breaks.
Markdown joins single newlines into one paragraph when it renders, so the breaks vanish on screen
unless they are marked.

```text
your honor
since i've been convicted of murder
and have taken time to digest
just what that means
```

A plain newline keeps every printed line in the Markdown source, which is what the output is
judged on; a rendered view that joins the lines is a display artefact. Trailing spaces are invisible
and fragile, `<br>` puts markup on every line, and a fenced block turns the verse into code and loses
its bold and italics. Inline marks stay per line: a bold line is `**line**`.

Prose has the opposite rule: a line break inside a paragraph is typesetting, and the sentence is
joined. The question is only how to mark the lines when the break *is* the content. A verse line
that is too long for its column and wraps is still one line: the wrap is joined like prose.

### ✅ **Sample** — a poem beside a biography

![[bag-verse.png]]

The left column is verse, set in bold: short lines, no punctuation at most line ends, each break
intentional. Three lines are too long for the column and wrap (`… through every` / `weather!`,
`… on your lowest` / `stones`, `… that never` / `wavers — I think`); each is one verse line. The
right column is ordinary prose that wraps, then a QR code with its URL printed across two lines
beneath it.

<details>
<summary>Expected Markdown · excerpt, the verse column</summary>

```markdown
**old lighthouse**
**since I first walked this shingle as a girl**
**and have taken forty winters to notice**
**just what your light means**
**after counting the boats it has turned home**
**and how it reaches farther than any bell**
**or horn**
**you keep the same slow turn through every weather!**
**and never once hurried**
**in a calm, patient, unblinking manner**
**never asked the sea for its reasons**
**and never bent your beam to spare the rocks**
**which is a kind of honesty**
**I have only lately learned to keep**
**I have started to notice small things about you:**
**the gull that nests each spring on your gallery rail**
**the salt rings the tide leaves on your lowest stones**
**the rust blooming quietly at your door**
**the way fog softens your beam into a halo**
**the long calm between one flash and the next**
**the lamp-room ladder worn pale by other hands**
**the paint the keepers layer on each spring**
**feeling that this steadiness is a kind of instruction**
**and that there must**
**be something to learn from a light that never wavers — I think**
**patience is a shore we can still reach**

<!-- … -->
```

</details>

<!-- skill:generate
- For verse, song text and other text whose line breaks are meaningful, write one printed line per output line, separated by a plain newline (no trailing spaces, no <br>, no code fence).
- Never reflow such lines into running prose. A verse line that wraps only because the column is too narrow stays one line.
- Keep inline marks per line (a bold line is **line**); escape a line that would start a list or heading.
-->

<!-- skill:check
- FAIL (MUST) if verse or other meaningfully broken lines are joined into running prose, losing the printed line breaks.
- FAIL (MUST) if the line breaks are marked with <br>, trailing spaces or a fenced block instead of plain newlines.
- FAIL (MUST) if a verse line that only wraps for column width is split into two output lines.
-->

## Related

- [[Line Breaks Inside a Block]] — the same three spellings, for a block that merely wraps
- [[Bullets and Sub-Bullets]] — the other place line structure carries meaning
- [[QR Codes and Bar Codes]] — the code on the sample
- [[Links]] — the URL is transcribed as raw text
