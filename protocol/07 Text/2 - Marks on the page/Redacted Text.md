---
title: Redacted Text
rule_id: text-redacted-text
status: rule
scope: page
tags: [text, marks]
---

# Redacted Text

> [!success] ✅ Normative
> Each contiguous redacted span MUST be rendered as one `[REDACTED]` marker, in the position the
> suppressed text occupied. Visible text and any printed exemption code MUST be kept; the hidden
> characters and their count MUST NOT be inferred.

Text blacked out or boxed over in the source document.

## The rendering

The marker sits where the suppressed text was, so the surrounding line still reads correctly:

```markdown
Account holder: [REDACTED]
```

Where only part of a value is covered, the marker MUST replace only the covered part, and the
visible characters MUST be kept verbatim — not normalised, padded or reconstructed. Printed masking
characters are visible characters, escaped where they are Markdown syntax (see
[[Escaping Printed Marks]]):

```markdown
Account number: \*\*\*\*-\*\*\*\*-\*\*\*\*-4471
```

When boxes are requested, a redacted span has a box like any other printed region — see
[[Boxes and Granularity]].

## Why a positive marker beats silence

A redaction is an assertion: something was here and was deliberately removed. If the output emits
nothing, a reader cannot tell "the field was blank" from "the field was suppressed" — a meaningful
difference in a legal or regulatory document.

`[REDACTED]` is the same bracketed-placeholder shape used for [[Signatures]] (`[signature]`) and
for [[QR Codes and Bar Codes]] (`![](QR Code)`).

### ✅ **Sample** — a redaction bar inside a sentence

![[redacted-text.png]]

One black bar where the appellant's name was, between `filed by` and `, against the response of
the`. The bold case number and council name on either side are printed and kept.

<details>
<summary>Expected Markdown</summary>

```markdown
HAVING SEEN the electronic file formed on account of the appeal for review **04871/OTAIP/AR/2018** filed by [REDACTED] , against the response of the **Municipal Council of Puente Alvara**, the following resolution is hereby issued.
```

</details>

### ✅ **Sample** — a redaction bar inside a transcript line

![[bag-deposition-transcript.png]]

Line 4: `Was ████ paying that before?` — one black bar in the middle of a question, the rest of
the page untouched. The transcript lines follow [[Transcript Pages]].

<details>
<summary>Expected Markdown · excerpt, lines 1–5</summary>

```markdown
83

A My delivery van insurance.
Q And what's that?
A $150 a month.
Q Was [REDACTED] paying that before?
A Yes, he was.

<!-- … -->
```

</details>

## Exemption codes

A redacted region that prints an exemption code MUST be rendered as `[REDACTED: code]` —
`[REDACTED: (b)(5)]` — with the code copied exactly, once. Unrelated text near the region MUST stay
outside the marker.

### ✅ **Sample** — a redaction that prints its exemption code

![[bag-foia-b5-redaction.png]]

Under `Cybercrime`, a dashed box the height of eight bullets prints only `(b)(5)`; the eight
bullet glyphs remain in the margin, their text gone. The code and the surviving bullets are both
content the page prints: the eight bullets stay as eight list items, and the code appears once,
inside the marker, at the start of the redacted span.

<details>
<summary>Expected Markdown · excerpt, the redacted section</summary>

```markdown
Case 1:23-cv-06353-RMI Document 20-8 Filed 12/14/23 Page 8 of 21

<!-- … -->

**<u>Cybercrime</u>**

- [REDACTED: (b)(5)]
-
-
-
-
-
-
-

2023-ICLI-00018 136

REL0000006328
```

</details>

<!-- skill:generate
- Replace each contiguous blacked-out or boxed-over span with one [REDACTED], exactly where the hidden text was: "filed by [REDACTED] , against".
- If the redaction prints an exemption code, write it inside the marker once, exactly: [REDACTED: (b)(5)].
- Keep every visible character around and inside a partial mask verbatim; never guess the hidden text or how many characters it had.
- Keep list bullets or line markers that survive the redaction.
-->

<!-- skill:check
- FAIL (MUST) if a redacted span on the page has no [REDACTED] marker, or one span yields several markers.
- FAIL (MUST) if text hidden by a redaction appears in the Markdown, or the marker carries a character count.
- FAIL (MUST) if an exemption code printed on a redaction is missing, altered, or repeated.
- FAIL (MUST) if visible text next to a redaction is dropped or pulled inside the marker.
-->

## Related

- [[Signatures]] — the same bracketed-placeholder shape
- [[Transcript Pages]] — the page shape of the second sample
- [[Watermarks]] — another mark laid over printed content
