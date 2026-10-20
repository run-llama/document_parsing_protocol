---
title: Electrical Schematics
rule_id: diagrams-electrical-schematics
status: rule
scope: page
tags: [images, diagrams]
---

# Electrical Schematics

> [!success] ✅ Normative
> A component-level circuit schematic MUST use a faithful `diagram/<language>` encoding,
> preferring `diagram/circuitikz`, then `diagram/tikz`, then `diagram/svg`. If no suitable language
> can faithfully represent it, it MUST use a fenced `description` block. Every component symbol,
> designator, value, pin, terminal, net label and visibly drawn connection MUST be preserved.

Circuit diagrams.

![[electrical-schematic.png]]

The figure above is an IC functional block diagram rather than a component-level circuit; it follows
[[Diagrams and Flowcharts]], using `diagram/plantUml`, `diagram/mermaid` or another suitable language
that preserves the printed blocks and signal connections. The component-level requirements below
do not apply to a functional block diagram.

## How the element is recognised

Component symbols joined by wires, usually with a reference designator and a value beside each one
(`R1 1Ω`, `C3 10μF`). The way the components are oriented, and whether they sit in series or in
parallel, is part of the content.

## Preserve circuit meaning

The encoding MUST preserve component orientation, pins, junctions, crossings and series/parallel
connections as drawn. An automatic graph layout that changes circuit meaning MUST NOT be used.
Functional block diagrams use the block-diagram priorities in [[Diagrams and Flowcharts]].

## The fixed shape

When no suitable language can faithfully encode the circuit, the fallback uses a fenced
`description` block (see
[[Slide Diagrams]]).

1. **What it is** — one line: `Buck regulator input stage.`
2. **Components** — a list, one item per component in reading order (top to bottom, left to
   right): designator then value, both exactly as printed (`R1 1Ω`, `C3 10μF`). A component with no
   printed value is listed by its designator.
3. **Pins, terminals and nets** — every printed pin, terminal and net label, verbatim.
4. **Connections** — describe wires and junctions visibly drawn between identified parts. A crossing
   MUST NOT be treated as a junction unless the drawing marks it as one. Hidden or ambiguous
   connections MUST NOT be guessed.

Every printed designator, value and label is printed content and MUST be transcribed (**never
drop**). Values MUST NOT be computed, normalised or corrected.

<!-- skill:generate
- For component-level circuits, prefer diagram/circuitikz, then diagram/tikz, then diagram/svg, or another faithful language. Preserve symbols, orientation, pins, wires, junctions and crossings.
- For functional block diagrams, prefer diagram/mermaid, then diagram/plantUml, then diagram/dot, then diagram/tikz, then diagram/svg; preserve blocks and signal connections.
- Only if no suitable language can faithfully encode the circuit, use description: what it is; components in reading order with designators and values verbatim; pins, terminals and nets; visibly drawn connections. Do not guess junctions or hidden wires.
- Never compute, normalise or correct a component value.
-->

<!-- skill:check
- FAIL (MUST) if the encoding alters circuit symbols, orientation, topology, pins, wires, junctions or crossings, or invents a hidden connection.
- FAIL (MUST) if a designator, component value, pin, terminal or net label printed on the schematic is missing or altered.
- FAIL (MUST) if a description replaces a circuit that a suitable language can faithfully encode.
- WARN (SHOULD) if a fallback description does not follow the fixed shape (what it is, components, pins and nets, visible connections).
-->

## Related

- [[Chemical Molecules]] — the settled case of a domain notation preferred over a graph
- [[Diagrams and Flowcharts]] — language priorities and the description fallback
- [[Blueprints]] — another spatial drawing that a linear structure cannot carry
- [[Slide Diagrams]] — labelled figures that are not circuits
