---
title: Pleading Line Numbers
rule_id: layout-pleading-line-numbers
status: rule
scope: page
tags: [layout, legal, furniture, line-numbers]
---

# Pleading Line Numbers

> [!success] ✅ Normative
> Printed gutter line numbers MUST NOT appear in the Markdown: the body is rendered as continuous
> paragraphs, as if the margin were blank. When line numbers are requested, each page MUST carry a
> `line_numbers` list that links every printed number to the body line it stands beside.

US court filings are printed on pleading paper: the numbers 1–28 run down the left margin, one per
ruled line, with a double vertical rule between the numbers and the text. The numbers are cited in
practice ("page 9, line 14") but they belong to the paper, not to the prose.

```text
 1 ║ school year, the District set the average ratio
 2 ║
 3 ║ based.
 4 ║      29.  Additional race-based benefits provided
```

## In the Markdown

- A line number MUST NOT appear in the body text — not between two words, not at the start of a
  line, and not as a column of its own. The page MUST NOT be rendered as a `number | text` table:
  numbers pair with printed *lines*, not with sentences or paragraphs.
- The body MUST be rendered as paragraphs, wrapped lines joined, exactly as if the margin were blank.
- The double rule beside the numbers is layout and MUST NOT be transcribed.

## The line-number map

When line numbers are requested (the `annotate_line_numbers` option of the parse request), the
numbers are carried in the page's structured output instead of the text. Each page with line
numbers MUST carry a `line_numbers` list of entries:

| Field | Meaning |
| --- | --- |
| `line_number` | the printed label, as a string, exactly as printed (`14`, `1196`) |
| `start_index` | zero-based, inclusive offset of the body line's text in the page's final Markdown, in UTF-16 code units |
| `end_index` | exclusive end of that span, same convention |

- An entry MUST point at the text of the body line printed level with the number, so a citation
  such as "page 9, line 14" resolves to text.
- A number beside a line with no text — a blank line between paragraphs, the numbers running on
  below the last line — MUST NOT get an entry.
- Entries MUST be in page order and MUST NOT overlap; every span MUST lie within the page's
  Markdown and cover non-blank text.
- A page without printed line numbers carries no `line_numbers` list.

```text
Markdown, page 3:   …the District set the average ratio based.  29. Additional race-based benefits…
line_numbers:       [{"line_number": "1", "start_index": …, "end_index": …},
                     {"line_number": "3", …}, {"line_number": "4", …}, …]
```

The same holds for any page with a printed gutter of line numbers, such as a line-numbered
manuscript, and for court transcripts, whose speaker turns are rendered as described in
[[Transcript Pages]].

### ✅ **Sample** — the numbered margin on a complaint

![[bag-pleading-line-numbers.png]]

Numbers 1 to 28 down the left and a double rule beside the prose. Here each printed line of text
sits level with a number, the blank lines between paragraphs take numbers 5 and 10, and 17–28 run on
below the last line; nothing pairs a number with a sentence. The body is three numbered paragraphs.
The numbers do not appear in the Markdown.

<details>
<summary>Expected Markdown</summary>

```markdown
**UNITED STATES DISTRICT COURT
FOR THE DISTRICT OF NEW CALDRIVANE**

PARENTS FOR NEIGHBORHOOD SCHOOLS, et al., Plaintiffs, v. BORVIKA UNIFIED SCHOOL DISTRICT, Defendant.
Case No. 3:26-cv-04471 FIRST AMENDED COMPLAINT

26. This action arises from student assignment policies adopted by the Borvika Unified School District (the "District") governing which elementary campus a pupil may attend. For the 2025–26 school year, the District set the average ratio of in-boundary to out-of-boundary enrollment at each of its seven elementary campuses using the attendance zone maps attached as Exhibit A, on which this claim is based.

27. Plaintiffs are parents of children who reside within the Eastgate attendance zone and who applied, unsuccessfully, for a transfer to Lindmoor Elementary under the District's open enrollment lottery. Each Plaintiff received a written denial citing capacity limits at Lindmoor and directing the family to the assigned Eastgate campus for the coming term.

28. Additional priority points are awarded under Policy 4.06 to applicants who already have a sibling enrolled at the receiving campus, who live within one half mile of the receiving campus, or who qualify for the District's transportation hardship exception. Plaintiffs allege that the point schedule, though facially uniform, produces a pattern of denials concentrated among families at three of the District's seven elementary campuses, and that the District has not published the underlying capacity counts on which the lottery results depend, notwithstanding repeated written requests under the state Public Records Act.
```

</details>

### ✅ **Sample** — a nearly empty pleading page

![[bag-pleading-vendor-mark.png]]

The same paper with only the case caption at the top; the numbers 1–28 run regardless, and the
double rule runs the full height of the page. A rotated `ARCLIGHT LEGAL COPY SERVICES` mark sits in
the left margin — see [[Margin Banners]]; it is transcribed once, as its own block outside the body.

<details>
<summary>Expected Markdown</summary>

```markdown
**UNITED STATES DISTRICT COURT
FOR THE CENTRAL DISTRICT OF NEW CALDRIVANE**

GREENFIELD ALLIANCE FOR HOUSING, Plaintiff, v. MARCUS T. ALDRICH, in his official capacity as Secretary of the U.S. Department of Housing and Urban Development, Defendant.
Case No. 3:26-cv-07056 RESPONSE IN OPPOSITION

ARCLIGHT LEGAL COPY SERVICES
```

</details>

### ✅ **Sample** — a numbered manuscript

![[bag-manuscript-figure-lines.png]]

A journal manuscript with continuous line numbers in the left margin, `1190` to `1202`, one beside
each line of text and one (`1196`) beside the figure — the same margin numbers as pleading paper,
counting through the whole document. The running title and journal line at the top are furniture;
the figure is a labelled core log, rendered as a `description` block. The numbers do not appear in the
Markdown.

<details>
<summary>Expected Markdown</summary>

````markdown
**Late Holocene sedimentation on the Kettering shelf: a revised chronology**

Manuscript submitted to Journal of Quaternary Stratigraphy — Section 4.2

the sequence below Core KT-07 records three principal facies changes across the interval sampled, each corresponding to a shift in grain size and organic content consistent with a gradual deepening of the depositional environment. The lowermost unit is dominated by coarse sand with occasional shell fragments, grading upward into a laminated silty clay that we interpret as a low-energy subtidal deposit. The core log for this interval is reproduced in Figure 10, below.

```description
- 0.0 – 0.4 m — coarse sand, shell hash
- 0.4 – 1.1 m — laminated silty clay
- 1.1 – 1.6 m — bioturbated mud
- 1.6 – 2.2 m — organic-rich clay
```

**Figure 10.** Core log for KT-07, 0–2.2 m, showing the four facies units described in the text.

Radiocarbon ages from the base of each unit are reported in Table 3 and are used to constrain the sedimentation rate across the transition. We note that the rate calculated for the upper two units is roughly half that of the lower two, which is consistent with the proposed deepening and the associated fall in sediment supply from the adjacent shoreline.
````

</details>

<!-- skill:generate
- On pleading paper or any page with a printed gutter of line numbers, leave the numbers out of the text: write the prose as normal paragraphs, joining wrapped lines, as if the margin were blank. Never put a number between words, never prefix lines with numbers, never build a number | text table. Do not transcribe the double rule.
- When line numbers are requested, return for each such page a line_numbers list: one {line_number, start_index, end_index} per printed number that stands beside a line of text, where line_number is the printed label as a string and start_index/end_index (UTF-16, start inclusive, end exclusive) delimit that line's text in the page's final Markdown. Numbers beside blank lines get no entry.
-->

<!-- skill:check
- FAIL (MUST) if gutter line numbers appear inside or at the start of body lines, or the page is rendered as a number | text table.
- FAIL (MUST) if line numbers were requested and a page with a printed gutter has no line_numbers list, or an entry's span does not cover the text of the line printed beside that number.
- FAIL (MUST) if line_numbers entries overlap, are out of order, fall outside the page Markdown, or include a number that stands beside no text.
- WARN (SHOULD) if the body prose is broken into one paragraph per numbered line instead of continuous paragraphs.
-->

## Related

- [[Block Classes]] — the numbers are page furniture, not a list
- [[Reading Order]] — the body flows as one column
- [[Margin Banners]] — the other thing that lives in a pleading margin
- [[Transcript Pages]] — line-numbered pages where each line is a record
- [[Printed Page Numbers]] — the other number in the margin
