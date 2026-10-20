---
title: Transcript Pages
rule_id: layout-transcript-pages
status: rule
scope: page
tags: [layout, structure, legal, line-numbers]
---

# Transcript Pages

> [!success] ✅ Normative
> On a transcript page, each speaker turn MUST be rendered as one paragraph that begins with its
> printed marker (`Q`, `A`, `THE COURT:`), with its wrapped lines joined. Printed line numbers MUST
> NOT appear in the Markdown; when line numbers are requested they are carried in the page's
> `line_numbers` map, exactly as for [[Pleading Line Numbers]].

A deposition or hearing transcript: numbered lines 1–25, a `Q` / `A` column, and text that wraps
to the left margin on its continuation lines. The line numbers are cited ("page 47, line 12"), so
the line structure is part of the content in a way ordinary prose is not.

```text
 4    Q    Was ████████ paying that before?
 5    A    Yes, he was.
 6    Q    At the time of the temporary hearing, he was
 7  paying the car insurance?
```

## Rendering

- Each speaker turn — a `Q`, an `A`, or a colloquy line such as `MR. HALE:` or `THE COURT:` — MUST
  be its own paragraph, separated from the next by a blank line.
- The turn MUST begin with its speaker marker exactly as printed (`Q`, not `Q:`), followed by its
  text.
- A turn that wraps onto further printed lines MUST be joined into one paragraph: the continuation
  lines carry no marker on the page, and they carry none in the output.
- The printed line numbers MUST NOT appear in the Markdown, and the page MUST NOT be rendered as a
  `line | speaker | text` table.

## Citing a line

Transcripts are cited by page and line ("page 83, line 13"). The citation is carried by the
`line_numbers` map defined in [[Pleading Line Numbers]]: when line numbers are requested, each
printed number beside text gets an entry whose span covers that line's text inside its turn's
paragraph. A wrapped turn therefore keeps both of its line numbers even though it is one
paragraph.

### ✅ **Sample** — a deposition page

![[bag-deposition-transcript.png]]

Twenty-five numbered lines in a ruled frame, `Q` and `A` in their own column, three turns wrapping
to the left margin (lines 6–7, 12–13 and 24–25), each joined into one paragraph, a black redaction bar inside line 4, the folio `83`
above the frame and the reporting firm's name and telephone number as a footer.

<details>
<summary>Expected Markdown</summary>

```markdown
83

A My delivery van insurance.

Q And what's that?

A $150 a month.

Q Was [REDACTED] paying that before?

A Yes, he was.

Q At the time of the partnership split, he was covering the van insurance?

A Yes.

Q Okay. And what other expenses have you taken on?

A The warehouse lease and the delivery routes.

Q And what are the delivery routes?

A The downtown loop and the harbor route. And we are in the process of adding a third route for the weekend orders.

Q When did you start the harbor route?

A Last spring.

Q What does the harbor route cost a month?

A About $80 in fuel.

Q Do you have a fleet discount on the van?

A Yes, we do.

Q It's about 90 bucks, $95?

A No. We pay $60.

Q Are you telling me I'm getting the wrong number?

A We have a loyalty discount.

Q And the third route, that's something you're discussing, but it hasn't started yet?

HALVERSTON REPORTING (415) 555-0148
```

</details>

<!-- skill:generate
- On a transcript page (numbered lines with a Q/A column or speaker labels), render each speaker turn as its own paragraph: the marker exactly as printed (Q, A, THE COURT:), then the text, with the turn's wrapped lines joined. Separate turns with a blank line.
- Leave the printed line numbers out of the text; never build a line | speaker | text table.
- When line numbers are requested, return the page's line_numbers list as for pleading paper: each printed number beside text linked to that line's span inside its turn.
-->

<!-- skill:check
- FAIL (MUST) if printed transcript line numbers appear in the Markdown, or the page is rendered as a table.
- FAIL (MUST) if a turn's wrapped continuation line is left as a separate paragraph or line instead of joined into its turn.
- FAIL (MUST) if a speaker turn does not start with its printed Q / A / speaker marker, or two turns are merged into one paragraph.
- FAIL (MUST) if line numbers were requested and a numbered line with text has no line_numbers entry covering its text.
-->

## Related

- [[Pleading Line Numbers]] — the same margin numbers on a filing, and the line_numbers map
- [[Redacted Text]] — the bar in line 4
- [[Verse and Hard Line Breaks]] — text whose line breaks are content, unlike a transcript's
