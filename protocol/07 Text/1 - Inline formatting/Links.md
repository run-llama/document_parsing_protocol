---
title: Links
rule_id: text-links
status: rule
scope: page
tags: [text, formatting]
---

# Links

> [!success] ✅ Normative
> Hyperlinks and email addresses MUST be transcribed as raw text. Link syntax — `<email>`,
> `[url](url)` — MAY be used only when link extraction was explicitly requested.

## Default

```text
Contact support@example.com or see https://example.com/pricing
```

## When link extraction is requested

```text
Contact <support@example.com> or see [https://example.com/pricing](https://example.com/pricing)
```

## Why raw text

The output is read mostly by a model or an extraction step. Link punctuation adds noise to every
chunk for a payload most readers never use. Raw text keeps the default output clean and still
leaves the address recoverable.

## Anchor text that differs from its target

When the printed words differ from the target — `click here` pointing at a long URL — the output
MUST keep the printed words as they appear. Under the raw-text default the target is not
represented, and it MUST NOT be added in place of, or beside, the printed words: the page does not
print it (**never invent**).

<!-- skill:generate
- Write URLs and email addresses exactly as printed, as plain text: Contact support@example.com or see https://example.com/pricing
- Do not use [text](url) or <address> syntax unless link extraction was explicitly requested.
- Where the printed words are anchor text such as "click here", write only the printed words; do not add an unprinted URL.
-->

<!-- skill:check
- FAIL (MUST) if link syntax ([text](url) or <address>) appears when link extraction was not requested.
- FAIL (MUST) if a printed URL or email address is missing, altered or split, or an unprinted URL is added to the text.
-->

## Related

- [[Text Formatting Conventions]] — the full inline-markup table
- [[QR Codes and Bar Codes]] — a URL carried by a code rather than printed text
- [[Output Options]] — other outputs that depend on what the producer was asked for
