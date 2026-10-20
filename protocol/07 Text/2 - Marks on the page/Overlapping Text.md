---
title: Overlapping Text
rule_id: text-overlapping-text
status: rule
scope: page
tags: [text, marks, legal]
---

# Overlapping Text

> [!success] ✅ Normative
> Where two printed strings overlap, each legible string MUST be rendered whole, in a block of its
> own, with the stamp first. Legible fragments MUST be kept; characters hidden by the overlap MUST
> NOT be reconstructed.

Two printed strings occupy the same space. The common case is a court e-filing stamp — `Case
1:19-cv-00892  Document 36  Filed 04/04/19  Page 2 of 2` — laid across a header the page already
had, so the two texts interleave character by character.

```text
4/4/2019   PresCase 1:19-cv-00892-KSC Document 36 Filed 04/04/19 Page 2 of 2ates | The White House
           ↑ browser print header             ↑ filing stamp, printed over it
```

The stamp is the more important string — it identifies the exhibit — but the underlying header is
still printed content.

## Requirements

- Every legible string MUST be kept: the stamp and the text beneath it are both printed. Keeping
  only the more legible one drops content.
- The strings MUST NOT be interleaved into one line. Each is rendered whole, in its own block.
- At the overlap, the stamp MUST come first, as its `[stamp: …]` marker (see [[Stamps]]), followed by the
  string it is printed over.
- Characters that the overlap hides MUST be left out rather than guessed; the legible part of the
  string is kept — see [[Never Drop, Never Invent]].

### ✅ **Sample** — a filing stamp over a print header

![[bag-overlapping-stamp.png]]

A web page printed to PDF, then filed: the blue filing stamp sits directly on the grey browser
header line, and the two are unreadable as one string. Read apart, both are legible. The footer URL
and `2/2` are untouched.

<details>
<summary>Expected Markdown · excerpt, header and footer</summary>

```markdown
[stamp: Case 4:19-cv-00892-HSG Document 36-4 Filed 04/04/19 Page 3 of 3]

4/4/2019 Presidential Proclamation on Declaring a National Emergency Concerning the Southern Border of the United States | The White House

<!-- … -->

https://www.whitehouse.gov/presidential-actions/presidential-proclamation-declaring-national-emergency-concerning-southern-border-united-states/ 2/2
```

</details>

### ✅ **Sample** — two filing stamps over a print header

![[bag-exhibit-divider-stamps.png]]

An exhibit divider page — `EXHIBIT D` alone — whose header carries the clerk's boxed `FILED`
stamp over the header's own `FILED:`, and `Index #` over `INDEX NO.`, both overprinted. Everything
but the page count at the foot is set in bold.

<details>
<summary>Expected Markdown</summary>

```markdown
[stamp: FILED]

**FILED: HALVERSTON COUNTY CLERK 03/14/2026 11:05 AM**

[stamp: Index #: E2026004417]

**INDEX NO. E2026004417**

**HCEF DOC. NO. 2**

**RECEIVED HCEF: 03/14/2026**

# EXHIBIT D

56 of 61
```

</details>

### ✅ **Sample** — three headers on one line

![[bag-triple-overprinted-header.png]]

A browser print header, an e-filing stamp and the article's own `Page 22 of 37` all printed at the
top of a nearly empty page, on top of each other. The browser timestamp is legible up to `09`; the
characters after it lie under the stamp's opening `Ca` and are left out.

<details>
<summary>Expected Markdown · excerpt, the header lines</summary>

```markdown
[stamp: Case 24-10432-ABC Doc 118 Filed 03/02/24 Page 12 of 40]

4/2/2024, 09

**Charitable Giving**

**Page 22 of 37**

<!-- … -->
```

</details>

<!-- skill:generate
- When one printed string is stamped over another (a court filing stamp over a browser header), write each legible string whole as its own paragraph: the stamp first as [stamp: …], then the text beneath it.
- Never interleave the two strings into one line and never drop the underlying text.
- Leave out characters hidden by the overlap; never guess them.
-->

<!-- skill:check
- FAIL (MUST) if a legible overprinted string (the stamp or the text beneath it) is missing from the Markdown.
- FAIL (MUST) if characters of two overlapping strings are merged into one line or one word.
- FAIL (MUST) if characters that are hidden on the page appear in the Markdown.
- WARN (SHOULD) if, at an overlap, the stamp's block does not come before the string it is printed over.
-->

## Related

- [[Stamps]] — the `[stamp: …]` marker
- [[Watermarks]] — text that crosses the body rather than a header
- [[Handwriting and Stamps]] — a stamp over a grid
- [[Cell Text Fidelity]] — read the image, not the text layer
