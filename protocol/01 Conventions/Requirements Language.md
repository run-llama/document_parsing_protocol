---
title: Requirements Language
order: 1
tags: [conventions]
---

# Requirements Language

> [!abstract] Requirement keywords
> The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** in this protocol are
> to be interpreted as described in RFC 2119 and RFC 8174 when, and only when, they appear in
> capitals.

| Keyword | Meaning | A violation is |
| --- | --- | --- |
| **MUST** / **MUST NOT** | An absolute requirement of the protocol. | an error: the output does not conform |
| **SHOULD** / **SHOULD NOT** | A strong recommendation. Deviation is allowed only for a reason that holds for this document. | a warning |
| **MAY** | A truly optional behaviour. A consumer MUST accept output with or without it. | never reported |

The same words in lower case carry their ordinary English meaning and state no requirement.

Examples, sketches and captions are **informative**: they illustrate a requirement and never add
one. Where an example and a requirement disagree, the requirement governs and the example is a
defect.

## Related

- [[Conformance]] — what an output has to satisfy to conform
- [[Rule Status and Scope]] — how settled each requirement is
