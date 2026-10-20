---
title: Clipped Text
rule_id: text-clipped-text
status: rule
scope: page
tags: [text, fidelity, layout]
---

# Clipped Text

> [!success] ✅ Normative
> Text cut off at the page edge MUST be rendered as the characters actually visible. A clipped word
> MUST NOT be completed, and an ellipsis or marker that the page does not print MUST NOT be
> appended to it.

A page whose content runs past the printable edge: the last letters of a label, the end of a
sentence, the right-hand column of a table are simply absent. Nothing is overprinted or redacted;
the ink was never there.

```text
Research and developmen        49,294     ← the final t is off the page
Selling, general, and administrative     41,515
Note: … These measures ar
not in compliance with … different from po
forma measures …
```

## Requirements

- The visible fragment MUST be kept, verbatim — see [[Cell Text Fidelity]]. Dropping it loses
  printed content; completing it adds content that is not printed. See
  [[Never Drop, Never Invent]].
- The clipping itself MUST NOT be marked inside the text. A producer MAY record that a page is
  clipped outside the Markdown.
- A clipped line inside a paragraph is joined to the next line like any other wrapped line; the
  fragment stays as printed.

### ✅ **Sample** — a statement cut at the right margin

![[bag-proforma-clipped-text.png]]

`Research and developmen` in the stub, `measures ar` and `from po` in the note: the stub label and
the note lines that reach the right edge lose their last characters.

<details>
<summary>Expected Markdown · excerpt</summary>

```markdown
<table>
  <!-- … -->
  <tr> <td>Cost of sales</td> <td>59,130</td> <td>63,865</td> <td>65,189</td> <td>263,067</td> <td>304,213</td> </tr>
  <tr> <td>Research and developmen</td> <td>49,294</td> <td>39,703</td> <td>48,449</td> <td>182,766</td> <td>170,869</td> </tr>
  <tr> <td>Selling, general, and administrative</td> <td>41,515</td> <td>47,806</td> <td>41,153</td> <td>168,484</td> <td>215,318</td> </tr>
  <tr> <td>Total costs and expenses</td> <td>149,939</td> <td>151,374</td> <td>154,791</td> <td>614,317</td> <td>690,400</td> </tr>
  <!-- … -->
</table>

Note: The company provides pro forma financial data as an alternative for understanding its operating results. These measures ar not in compliance with accounting principles generally accepted in the United States of America, and may be different from po forma measures used by other companies
```

</details>

<!-- skill:generate
- Where text is cut off at the page edge, write only the characters actually printed: "Research and developmen", not "Research and development".
- Never complete a clipped word and never add "…", "[…]" or any other marker for the missing part.
- Keep the visible fragment; join a clipped line to the next line of its paragraph as usual.
-->

<!-- skill:check
- FAIL (MUST) if a word cut off at the page edge is completed with letters that are not visible on the page.
- FAIL (MUST) if an ellipsis, bracket or other marker the page does not print is added at a clipped word.
- FAIL (MUST) if a visible clipped fragment is missing from the Markdown.
-->

## Related

- [[Cell Text Fidelity]] — the image, not the text layer, decides what a value is
- [[Overlapping Text]] — the other way a string becomes hard to read
- [[Ignoring and Rejecting]] — a badly cropped page can be rejected; this page is not
- [[Never Drop, Never Invent]] — the two failures a clipped word invites
