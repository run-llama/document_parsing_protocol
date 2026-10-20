---
title: Fields Outside the Form
rule_id: forms-fields-outside-the-form
status: rule
scope: page
tags: [forms]
---

# Fields Outside the Form

> [!success] ✅ Normative
> A field printed in a header, a footer or anywhere outside the main form body MUST still be
> rendered. A field printed above the form MUST be placed before the form content; any other such
> field MUST be placed after it.

![[form-outside-fields-1.png]]

![[form-outside-fields-2.png]]

`CORRECTED`, `Final K-1`, `Amended K-1` sit outside the ruled form body and are easy to sweep
past, but each changes what the whole document means: a K-1 marked *Amended* is not the same
filing as one that is not.

## Non-field text

Instructions, preambles and fine print on a form page MUST be transcribed at their printed reading
position, between the fields they accompany. They MUST NOT be gathered at the end of the region or
dropped.

### ✅ **Sample** — an instruction between two sections

![[bag-form-blue-hints.png]]

"Skip this section if both parties signed Section 12 above." sits between the section 13 heading
and its first field, in blue. It is not a field and is transcribed where it is printed.

<details>
<summary>Expected Markdown · excerpt, section 13 and footer</summary>

```markdown
<!-- … -->

### \[13\] Certificate of Service

Skip this section if both parties signed Section 12 above.

On *(enter service date)* [blank]

- **I certify that I sent a copy of this document to the other parties by:** *(select one)*
  - [ ] Borvika Courts E-Filing. *\[www.efiling.courts.bv.gov/efile\]*
  - [ ] Regular Mail, addressed to:
    *Name & full address:* [blank]
  - [ ] Other: *(explain)* [blank]
- **Signed:** [blank]

AFF 118 – Affidavit for Decree without Appearance

R: April 2, 2025

Page 3 of 3
```

</details>

<!-- skill:generate
- Transcribe fields printed outside the form body (header, margins, footer), e.g. "CORRECTED", "Final K-1", "Amended K-1" boxes: those above the form go before the form's fields, all others after them.
- Keep instructions, preambles and fine print exactly where they are printed, between the fields they sit among.
-->

<!-- skill:check
- FAIL (MUST) if a field or checkbox printed outside the main form body is missing from the Markdown.
- FAIL (MUST) if a field printed above the form is placed after the form content, or one printed below it is placed before.
- FAIL (MUST) if an instruction printed between fields is moved away from its printed position or dropped.
-->

## Related

- [[Checkboxes]] — header and footer boxes are still checkboxes
- [[Form Reading Order]] — the order of the fields inside the form
- [[The Key-Value List]] — the line format for these fields too
