---
title: Line-End Hyphenation
rule_id: text-line-end-hyphenation
status: rule
scope: page
tags: [text, formatting, fidelity]
---

# Line-End Hyphenation

> [!success] ✅ Normative
> A word broken across a line end MUST be joined, and a hyphen that exists only for the break MUST
> be removed. A hyphen that belongs to the word MUST be kept. Where the two cannot be told apart,
> the visible hyphen MUST be kept.

Justified prose breaks words at line ends with a hyphen. The break is typesetting; the word is one
word. But a compound that happens to break at its own hyphen looks identical.

```text
… judges on the Court of Appeals for the District of Co-
lumbia Circuit concluded …                              ← join: Columbia

… And sales of air-
conditioning, industrial and other equipment …          ← keep: air-conditioning
```

| The line ends with | Output |
| --- | --- |
| A fragment of a word that has no hyphen of its own — `Co-` / `lumbia` | **Joined, hyphen removed** — `Columbia` |
| A compound broken at its own hyphen — `air-` / `conditioning` | **Joined, hyphen kept** — `air-conditioning` |
| A break that could be either | **Joined, hyphen kept** — the visible glyph is not removed on a guess |

Keeping the hyphen when unsure is the **never drop** side of the choice: a printed glyph survives,
and nothing the page does not show is asserted.

### ✅ **Sample** — a Supreme Court slip opinion

![[bag-scotus-hyphenation.png]]

Justified text breaking `Gov-ernment`, `human-itarian`, `Co-lumbia`, `prose-cutorial`,
`[c]on-trol`, `Shaugh-nessy`, `en-trusted` and `Ho-tel` at line ends, plus a footnote with
`Im-migration`. None of these are compounds. A hyphenated compound elsewhere on the page,
`separation-of-powers`, sits mid-line and keeps its hyphens.

<details>
<summary>Expected Markdown · excerpt, body and footnote</summary>

```markdown
<!-- … -->

indefinitely.<sup>1</sup> Beginning in 1960, the Government used this mechanism to provide humanitarian relief similar to that now furnished by TPS. Under a program that came to be known as “Extended Voluntary Departure” (EVD), the Government authorized deferred departure for nationals from countries where living conditions had become unsafe. EVD allowed aliens from those countries to remain in the United States until the Government concluded that conditions had improved. The Government granted EVD to nationals of at least 14 countries. H. R. Rep. No. 98–1142, p. 4 (1984).

Under this regime, the grant and termination of humanitarian relief was purely a matter of executive discretion, and judges on the Court of Appeals for the District of Columbia Circuit concluded that the Executive’s decision to withhold such relief was an unreviewable exercise of prosecutorial discretion. *Hotel & Restaurant Employees Union, Local 25* v. *Smith*, 846 F. 2d 1499, 1519–1520 (CADC 1988) (opinion of Silberman, J.); see also *id*., at 1510 (opinion of Mikva, J.) (“\[T\]he court has no meaningful standard against which to judge the agency’s exercise of discretion to deny EVD status in this case”). Judge Silberman, joined by three other judges, observed that review of an EVD decision would raise separation-of-powers concerns because “\[c\]ontrol of the country’s policy toward aliens is ‘inherent in the executive power to control the foreign affairs of the nation,’” *id*., at 1520 (quoting *United States ex rel. Knauff* v. *Shaughnessy*, 338 U. S. 537, 542 (1950)), and “‘\[m\]atters relating “to the conduct of foreign relations . . . are so exclusively entrusted to the political branches of government as to be largely immune from judicial inquiry or interference,”’” *Hotel & Restaurant Employees Union*, 846 F. 3d, at 1520. Judge Silberman therefore concluded that judicial review

<!-- … -->

<sup>1</sup>See H. R. Rep. No. 98–1142, p. 4 (1984); L. Oswald, Note, Extended Voluntary Departure: Limiting the Attorney General’s Discretion in Immigration Matters, 85 Mich. L. Rev. 152, 155–156 (1986).
```

</details>

### ✅ **Sample** — compounds broken at their own hyphen

![[bag-results-hyphenation.png]]

`e-` / `government`, `air-` / `conditioning` and `private-` / `sector` all break exactly at a
hyphen the word carries anyway. Joining without the hyphen would produce `egovernment`.

<details>
<summary>Expected Markdown · excerpt, first and third paragraphs</summary>

```markdown
<!-- … -->

By segment, Information & Telecommunication Systems sales rose 5%, to 1,742.3 billion yen (US$14,520 million) despite difficult market conditions characterized by a slow recovery in worldwide IT demand. Underpinning sales was increased demand for storage systems and integration services such as for e-government-related projects in Halvonia. The segment recorded operating income of 98.4 billion yen (US$821 million), up 184% year on year due to several factors. One was the benefits of structural reforms that have been implemented since fiscal 2024, primarily in the telecommunication equipment sector. Another was increased earnings from storage systems and systems integration services.

<!-- … -->

In Power & Industrial Systems, sales from maintenance services for nuclear and thermal power generation plants of Halvonian electric power companies declined. And sales of air-conditioning, industrial and other equipment declined because of the fall-off in private-sector plant and equipment investment in Halvonia. Nevertheless, segment sales rose 2%, to 2,058.0 billion yen (US$17,150 million) on sharply higher sales in automotive equipment operations in line with the inclusion in consolidated results of the former Kestrel Precision Corporation (now Borvika Automotive Systems, Ltd.), which became a wholly owned subsidiary in October 2025, and brisk demand for construction machinery in overseas markets. The segment saw operating income decrease 4%, to 47.9 billion yen (US$400 million) despite a significant improvement in profitability in construction machinery operations.

<!-- … -->
```

</details>

<!-- skill:generate
- When a word breaks across a line end with a hyphen, join the two parts into one word on one line.
- Remove the hyphen when it exists only for the break (Co- / lumbia → Columbia); keep it when it belongs to the word (air- / conditioning → air-conditioning, e- / government → e-government).
- When you cannot tell which it is, keep the hyphen and join the parts.
-->

<!-- skill:check
- FAIL (MUST) if a word broken across a line end is left split (a space or line break between its parts).
- FAIL (MUST) if a hyphen that belongs to a compound broken at its own hyphen is removed (egovernment for e-government).
- WARN (SHOULD) if a plain word broken at a line end keeps its break hyphen (Co-lumbia, Gov-ernment).
-->

## Related

- [[Cell Text Fidelity]] — homoglyph hyphens, which are a different question
- [[Drop Caps]] — the other place the text layer splits a word
- [[Header Wrap vs Real Tier]] — a wrap inside a table header
