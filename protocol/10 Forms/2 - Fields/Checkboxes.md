---
title: Checkboxes
rule_id: forms-checkboxes
status: rule
scope: page
tags: [forms]
---

# Checkboxes

> [!success] ✅ Normative
> A checked box MUST be rendered as `[x]` and an unchecked box as `[ ]`. An unchecked box MUST be
> transcribed explicitly and MUST NOT be dropped.

## What counts as checked

A box is checked when it holds a **clear, unambiguous mark inside it** — a check, a cross, a
filled box.

- Handwriting or a mark *near* a box MUST NOT make it checked.
- A box whose state is in doubt MUST be rendered `[ ]`.
- A decorative bullet (●) printed beside a required field is not a check mark.

## The rendered page decides

A check mark can exist only as **drawn strokes with no text-layer glyph** — common on degraded
scans. The state MUST be read from the rendered page, never from the text layer: a tick the text
layer never saw is still a tick. See [[The Page Is the Ground Truth]].

## A lone labelled checkbox

The box sits in the value position:

```markdown
- **FATCA filing requirement**: [x]
- \[D\] **Check if this is a publicly traded partnership (PTP)**: [ ]
```

## A checkbox with its own write-in

One line — the box first, then the entered text:

```markdown
- \[3\] [x] 8888
- **Other (specify):** [x] consulting
```

## Every box on the page

A checkbox MUST be included wherever it sits — header, margin, footer: `Final K-1` /
`Amended K-1` at the very top of a K-1, `CORRECTED (if checked)` at the top of a 1099. See
[[Fields Outside the Form]].

## Radio buttons

A radio control MUST be rendered with the same `[ ]` / `[x]` notation as a checkbox. Every option
MUST be kept, with its grouping, and a printed pick-one instruction MUST be kept as text.

### ✅ **Sample** — radio buttons beside checkboxes

![[bag-motion-radio-buttons.png]]

A motion form with `[ ☐ ]` bracketed boxes for the reasons and `[ ○ ]` bracketed circles for
`DENIED` / `GRANTED` and `objects` / `does not object`. The circles are pick-one controls; the
notation is `[ ]` or `[x]`, preserving each printed state. A `Print Form` button sits at the foot.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<!-- … -->

The Defendant / State moves for a continuance pursuant to Meridia Rule of Criminal Procedure 3.190(g), and states the following reason(s) as good cause for the request to continue:

- [ ] Defense / State not sufficiently prepared for trial.
- [ ] Illness of a witness or other party.
- [ ] Illness of an attorney for the party.
- [ ] Unavailability of a witness or attorney.
- [ ] Untimely disclosure of a witness or other discovery information.
- [ ] Defense / State inability to depose a witness or victim prior to trial.
- [ ] Defendant’s competency to proceed at issue.
- [ ] Appointment of regional / conflict counsel upon the public defender’s withdrawal.
- [ ] <u>Appointment of public defender upon private counsel’s withdrawal.</u>
- [ ] [blank]

<!-- … -->

## ORDER DENYING / GRANTING MOTION FOR CONTINUANCE

Having heard and considered the Defendant’s / State’s Motion for Continuance, it is ORDERED that the Motion for Continuance is

- [ ] DENIED.
- [ ] GRANTED. The non-moving party [ ] objects [ ] does not object.

DONE AND ORDERED in Harlow Springs, Harlow County, Meridia on this [blank] day of March, 2026.

- [blank]

Copies furnished to: \[JUDGE\], CIRCUIT COURT JUDGE
\[Defense Counsel\], Law Office of \[Defense Counsel\] AND \[ASA\], Office of the State Attorney

Print Form
```

</details>

<!-- skill:generate
- Write a checked box as [x] and an unchecked box as [ ]; never leave out an unchecked box.
- Count a box as checked only when a clear mark sits inside it; a mark beside it, or any doubt, means [ ]. Read the state from the image, not from embedded text.
- A lone labelled box goes in the value position: "- **Label**: [x]". A box with a write-in: box first, then the text: "- **Other (specify):** [x] consulting".
- Radio buttons use the same [ ] / [x]; keep every option and any printed "check one" instruction.
- Include boxes printed in headers, margins and footers.
-->

<!-- skill:check
- FAIL (MUST) if a checkbox or radio button visible on the page is missing from the Markdown.
- FAIL (MUST) if a box's rendered state ([x] or [ ]) disagrees with the page image, or a box with only a nearby mark is rendered [x].
- FAIL (MUST) if a checkbox is written with any notation other than [x] or [ ] (e.g. ☐, (x), [unchecked]).
- FAIL (MUST) if a printed pick-one instruction attached to a radio group is missing.
-->

## Related

- [[Option Groups]] — several boxes answering one question
- [[Checklists]] — items each led by a box, with no question asked
- [[Tables Inside Forms]] — checkboxes inside a grid
- [[Fields Outside the Form]] — boxes in headers and footers
