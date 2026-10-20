import raw from "../data/atlas.json";
import exampleIndex from "../data/convention-examples-index.json";
import { type Badge } from "../data/rules";

export type Note = { slug: string; rule_id: string; scope: string; tags: string[]; source: string; title: string; area: string; sub: string | null; badge: Badge; rule: string; situation: string; samples: number; counters: number; related: { title: string; slug: string | null }[] };

export const allNotes = raw as Note[];
// Request settings and annotation procedures remain in the full RFC, not the
// browsing list of parsing conventions.
export const notes = allNotes.filter(note => note.area !== "Ground truth" && note.slug !== "03-output-model-output-options");
export const noteBySlug = new Map(notes.map(note => [note.slug, note]));
export const subjects = ["Conventions", "Principles", "Output model", "Document level", "Quick reference", "Equivalent forms", "Tables", "Text", "Forms", "Charts", "Page structure", "Layout", "Diagrams", "Images", "Other", "Lists"];

const examples: Record<string, unknown> = exampleIndex;
export const hasExamples = (slug: string) => slug in examples;
export const guideHref = (slug: string) => `/guide/${slug}`;

// Conventions in reading order: by subject, then as the guide lists them.
export const ordered = subjects.flatMap(subject => notes.filter(note => note.area === subject));

// The guide's suggested first read: a common case with clear examples on both sides.
export const startHere = noteBySlug.get("tables-3-headers-multi-row-header-tiers") ?? ordered[0];
