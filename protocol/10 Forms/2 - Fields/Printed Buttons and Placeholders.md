---
title: Printed Buttons and Placeholders
rule_id: forms-printed-buttons-and-placeholders
status: rule
scope: page
tags: [forms, furniture]
---

# Printed Buttons and Placeholders

> [!success] ✅ Normative
> The text of a printed button, and the caption of a box reserved for a later stamp or seal, MUST be
> transcribed as text where it sits, in reading order. A reserved box is not a fill-in and MUST NOT
> be rendered with `[blank]`.

Fillable PDFs export their widgets into the page: `Print`, `Save`, `Clear` buttons and the notice
beside them. Court forms reserve empty boxes — `[SEAL]`, `File Stamp Here`, `COURT USE ONLY` —
for something to be added by hand later.

| Printed thing | Rendering |
| --- | --- |
| **Buttons** — `Print` · `Save` · `Clear` in coloured pills at the page foot | their text, as text, in reading order — they are printed, so they are kept (**never drop**) |
| **Reserved boxes** — an empty ruled box whose caption says what will go in it | the caption as text, nothing else — no blank, since nothing is filled in there (**never invent**) |

### ✅ **Sample** — buttons and a seal placeholder

![[bag-summons-form-buttons.png]]

`Print`, `Save`, `Clear` in coloured boxes at the foot, a grey notice beside them, and an empty
box captioned `[SEAL]` at the left of item 5. Item 5 also nests a second row of options under `d.`
The button labels and the `[SEAL]` caption are plain text.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

\[SEAL\]

- \[5\] **NOTICE TO THE PERSON SERVED:** You are served
  - [ ] \[a\] as an individual defendant.
  - [ ] \[b\] as the person sued under the fictitious name of*(specify)*: [blank]
  - [ ] \[c\] as an occupant.
  - [ ] \[d\] on behalf of*(specify)*:
    - [ ] CCP 415.10 (corporation).
    - [ ] CCP 415.60 (minor).
    - [ ] CCP 415.20 (defunct corporation).
    - [ ] CCP 415.70 (conservatee).
    - [ ] CCP 415.40 (association or partnership).
    - [ ] CCP 415.90 (authorized person).
    - [ ] CCP 414.46 (occupant).
    - [ ] other*(specify)*: [blank]
  - [ ] \[e\] by personal delivery on*(date)*: [blank]

Rev. January 1, 2026

**Summons—Eviction**
(Unlawful Detainer / Forcible Detainer / Forcible Entry)

SUM-130, Page 2 of 2

For your protection and privacy, please press the Clear button after you have printed the form.

**Print**

**Save**

**Clear**
```

</details>

### ✅ **Sample** — an empty stamp box in a caption

![[bag-county-subpoena.png]]

`File Stamp Here` inside an otherwise empty ruled box on the right of the caption block. It is
rendered as its caption, with no blank.

<details>
<summary>Expected Markdown · excerpt, caption block</summary>

```markdown
<!-- … -->

[blank]
**vs**
[blank]

**CASE NUMBER**
[blank]

# SUBPOENA FOR DEPOSITION

**File Stamp Here**

<!-- … -->
```

</details>

### ✅ **Sample** — a web page printed to paper

![[bag-postal-web-printout.png]]

Accordion rows with chevrons, a `See Less` toggle, a text input printing its placeholder `Enter
tracking or barcode numbers`, and an `FAQs` button, all scanned. The browser's own header and
footer URL are printed too. Every visible string is kept as text.

<details>
<summary>Expected Markdown</summary>

```markdown
2/13/26, 11:17 AM

Ostrevane Post® - Parcel Tracking® Results

**Text & Email Updates** ▼

**Parcel Tracking Plus®** ▼

**Product Information** ▼

**See Less ▲**

Track Another Package

Enter tracking or barcode numbers

## Need More Help?

Contact Ostrevane Post tracking support for further assistance.

**FAQs**

https://tools.ostrevane.example/go/TrackConfirmAction?tRef=fullpage&tLc=2&text=28777

2/2
```

</details>

<!-- skill:generate
- Transcribe the text of printed buttons (Print, Save, Clear, FAQs) and of input placeholders as plain text where they sit, in reading order.
- For an empty box reserved for a stamp or seal ("File Stamp Here", "[SEAL]"), write only its caption as text; do not add [blank].
-->

<!-- skill:check
- FAIL (MUST) if the text of a printed button or input placeholder is missing from the Markdown.
- FAIL (MUST) if a box reserved for a stamp or seal is rendered as a fill-in with [blank].
-->

## Related

- [[Fill-Ins]] — a blank a person fills in, which these are not
- [[Seals and Round Stamps]] — what arrives in the reserved box
- [[Court Caption Blocks]] — where the reserved box usually sits
