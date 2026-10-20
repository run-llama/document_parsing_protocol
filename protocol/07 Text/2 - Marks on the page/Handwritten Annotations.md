---
title: Handwritten Annotations
rule_id: text-handwritten-annotations
status: rule
scope: page
tags: [text, marks, handwriting]
---

# Handwritten Annotations

> [!success] ✅ Normative
> A handwritten note on a printed page MUST be rendered as `[handwritten: legible words]`, in a
> block of its own next to the content it annotates. Its legible words MUST be kept; words that
> cannot be read MUST NOT be reconstructed.

A note written on a printed page: an exhibit reference in the margin, a circled item, an arrow with
a word, a reviewer's initials. [[Handwriting and Stamps]] settles handwriting that *replaces* a
printed value inside a table; a note in the margin of prose replaces nothing.

```text
    … to confirm the absence of cyclonic flow.

                                      2                     Attach. B   ← red pen
                                                       SAQB 193        ← Bates stamp
```

## Requirements

- The note adds information to the printed page, so it MUST be kept, and MUST be kept apart from
  the body text: it MUST NOT be spliced into the sentence beside it.
- The block MUST sit next to the content the note annotates in reading order.
- Legible fragments MUST be kept verbatim. Characters that cannot be read are left out, never
  guessed.

### ✅ **Sample** — an exhibit reference in red pen

![[bag-source-test-marginalia.png]]

`Attach. B` handwritten in red at the bottom right of a scanned protocol page, beside a printed
Bates number `SAQB 193`. The page's own number, `2`, is centred above.

<details>
<summary>Expected Markdown · excerpt, foot of the page</summary>

```markdown
<!-- … -->

A pretest meeting will be held with agency staff not less than fifteen days prior to the scheduled test date. Results will be submitted in a final report within forty-five days of test completion, together with process data logs covering the full duration of each run.

[handwritten: Attach. B]

SAQB 193
```

</details>

<!-- skill:generate
- Write a handwritten note on a printed page as [handwritten: the legible words], e.g. [handwritten: Attach. B], as its own block next to the content it annotates.
- Never merge the note into a printed sentence, and never guess words you cannot read; keep the legible fragments.
-->

<!-- skill:check
- FAIL (MUST) if a visible handwritten note is missing from the Markdown.
- FAIL (MUST) if handwritten words are inserted into a printed sentence instead of a separate [handwritten: …] block.
- FAIL (MUST) if a handwritten note is rendered as plain text without the [handwritten: …] marker.
- WARN (SHOULD) if the text inside [handwritten: …] contains words that cannot be read on the page.
-->

## Related

- [[Handwriting and Stamps]] — handwriting over a printed grid
- [[Signatures]] — initials and paraphs
- [[Margin Banners]] — printed text in the same place
