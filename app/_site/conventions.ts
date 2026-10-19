import raw from "../data/atlas.json";
import exampleIndex from "../data/convention-examples-index.json";
import { type Badge } from "../data/rules";

export type Note = { slug: string; title: string; area: string; sub: string | null; badge: Badge; rule: string; situation: string; samples: number; counters: number; related: { title: string; slug: string | null }[] };

export const notes = raw as Note[];
export const noteBySlug = new Map(notes.map(note => [note.slug, note]));
export const subjects = ["Tables", "Text", "Forms", "Charts", "Page structure", "Layout", "Diagrams", "Images", "Other", "Lists"];
export const statusLabels: Record<Badge, string> = { rule: "Settled", either: "Either way", open: "Open" };
export const statusHelp: Record<Badge, string> = {
  rule: "Follow the convention",
  either: "Be consistent within a document",
  open: "Preserve evidence; flag the page",
};

const examples: Record<string, unknown> = exampleIndex;
export const hasExamples = (slug: string) => slug in examples;
export const guideHref = (slug: string) => `/guide/${slug}`;

// Conventions in reading order: by subject, then as the guide lists them.
export const ordered = subjects.flatMap(subject => notes.filter(note => note.area === subject));

// The guide's suggested first read: a common case with clear examples on both sides.
export const startHere = noteBySlug.get("tables-3-headers-multi-row-header-tiers") ?? ordered[0];
