---
title: QR Codes and Bar Codes
rule_id: text-qr-codes-and-bar-codes
status: rule
scope: page
tags: [text, images, marks]
---

# QR Codes and Bar Codes

> [!success] ✅ Normative
> A QR code or bar code MUST be rendered as an image reference whose alt text holds the decoded
> content and whose target holds the literal label: `![decoded content](QR Code)`,
> `![decoded content](Bar code)`. The code MUST also be an element of its own, carrying the decoded
> value and a box around the code.

## The rendering

```text
![content of qr code](QR Code)
![content of Bar code](Bar code)
```

So a code that decodes to a tracking URL becomes `![https://example.com/t/9F2K](QR Code)`.

The alt-text and target slots are used in the reverse of the usual Markdown convention: the content
goes in the alt slot, the literal label in the target slot. That is deliberate.

## Why this form

It is the only encoding where the Markdown alone is useful. A reader gets the decoded payload —
usually a URL or a tracking number — without following an element reference. The code's own
element still carries the scan value, and its box locates the code for anyone who needs the image.

## When the code does not decode

A payload MUST NOT be invented. A code that does not decode MUST be rendered with the label alone
and an empty alt text, and is still its own element with its box:

```text
![](QR Code)
```

## Example

### ✅ **Sample** — a QR code closing a product page

![[corpus-qr-code.png]]

A QR code printed at the foot of a product page, beside the line *"Pour découvrir d'autres
exemples, c'est ici :"* — the prose leads directly into it, so dropping the code leaves a sentence
pointing at nothing. The code on this page does not decode, so the alt text stays empty; had it
decoded, its payload would fill the alt slot. The code is its own element, with a box around the
code alone.

<details>
<summary>Expected Markdown · excerpt, foot of the block</summary>

```markdown
<!-- … -->

**Pour découvrir d'autres exemples, c'est ici :**

![](QR Code)
```

</details>

<!-- skill:generate
- Render a QR code as ![decoded content](QR Code) and a bar code as ![decoded content](Bar code): the decoded payload goes in the alt text, the literal label in the link target.
- If the code cannot be decoded, write ![](QR Code) or ![](Bar code); never guess a payload.
- Make the code its own block, separate from the text around it.
-->

<!-- skill:check
- FAIL (MUST) if a QR code or bar code on the page has no ![…](QR Code) / ![…](Bar code) reference in the Markdown.
- FAIL (MUST) if the alt text holds a payload that the code does not decode to.
- FAIL (MUST) if the target slot holds anything other than the literal label "QR Code" or "Bar code".
- FAIL (MUST) if boxes were requested and the code has no sidecar element of its own.
-->

## Related

- [[Images]] — what other printed images become
- [[Iconography and Symbols]] — small marks that carry a value
- [[Redacted Text]] — another bracketed stand-in for a non-text region
