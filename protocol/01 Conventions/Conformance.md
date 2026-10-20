---
title: Conformance
rule_id: conventions-conformance
status: rule
scope: document
order: 2
tags: [conventions]
---

# Conformance

> [!success] ✅ Normative
> A **conforming output** is a Markdown rendering of a document that satisfies every MUST of this
> protocol, optionally accompanied by a sidecar that satisfies [[The Sidecar]]. A **producer**
> conforms when every output it emits conforms.

## What is judged

An output is judged against the **document as rendered** — the pages a reader sees — and never
against the file's text layer, OCR, or another output. See [[The Page Is the Ground Truth]].

| Part | Required | Governed by |
| --- | --- | --- |
| Markdown | always | [[Markdown Rendering]] and chapters 4–13 |
| Sidecar | when boxes are requested | [[The Sidecar]], [[Boxes and Granularity]] |

## Verdicts

A check of an output against the protocol yields findings, each tied to one requirement:

- a violated **MUST** is an **error**; any error makes the output **non-conforming**;
- a violated **SHOULD** is a **warning**; warnings do not affect conformance;
- a requirement marked ❓ open yields warnings only, whatever its keyword, until it is settled.

## Equivalent forms

Where the protocol accepts more than one rendering (⚖️), every accepted rendering conforms, and a
consumer MUST treat them as equal. A document MUST NOT mix accepted renderings of the same
situation — see [[Choices Made Once Per Document]] and [[Accepted Alternatives]].

## Output options

A few requirements depend on what the producer was asked to produce, such as whether table
fragments are joined across pages. They are listed in [[Output Options]]; an output is judged under
the options it was produced with.

<!-- skill:generate
- Your output is Markdown for the whole document, in reading order, page by page.
- Transcribe what the rendered pages show; never rely on or copy an embedded text layer.
-->

<!-- skill:check
- FAIL (MUST) for every violated MUST requirement; the output is non-conforming if any FAIL is reported.
- WARN (SHOULD) for every violated SHOULD requirement, and for any violation of a requirement marked open point.
-->

## Related

- [[Requirements Language]] — the meaning of MUST, SHOULD and MAY
- [[Output Options]] — requirements that depend on the producer's settings
- [[Accepted Alternatives]] — renderings that are equal for conformance
