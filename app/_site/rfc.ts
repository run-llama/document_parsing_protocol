import { readFileSync } from "node:fs";
import path from "node:path";
import { allNotes, notes, type Note } from "./conventions";
import teachingData from "../../resources/convention-library/teaching-examples.json";
import { parseRule, type Output, type RuleExample, type RulePage } from "./rfc-parse";
export type { Output, RuleExample, RulePage, SubCase, RelatedRule } from "./rfc-parse";

const ROOT = process.cwd();
const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// The RFC is the authority. Each convention page is rebuilt from that rule's own RFC section:
// requirement, situation, sub-cases with their examples beneath them, and Related with its reasons.
const cache = new Map<string, RulePage>();
export function rulePage(slug: string): RulePage {
  if (!cache.has(slug)) {
    const content = JSON.parse(readFileSync(path.join(ROOT, "resources/convention-library/content", `${slug}.json`), "utf8")) as { html: string };
    cache.set(slug, parseRule(content.html));
  }
  return cache.get(slug)!;
}

// Constructed teaching examples, shaped like RFC examples. They show Markdown source only.
type Teaching = { name: string; constructed: boolean; paragraphs: string[]; sourceImages?: { src: string }[]; snippets: { language: string; text: string }[]; bad?: { snippets: { language: string; text: string }[] } | null };
export function teachingFor(slug: string): { focus: string; workflow: string[]; examples: RuleExample[] } | null {
  const conventions = teachingData.conventions as Record<string, { examples: string[]; focus: string; workflow?: string[] }>;
  const entry = conventions[slug];
  if (!entry) return null;
  const all = teachingData.examples as Record<string, Teaching>;
  const examples = entry.examples.map((id, i): RuleExample => {
    const e = all[id];
    const outputs: Output[] = e.snippets.map(s => ({ label: s.language === "json" ? "Sidecar JSON" : "", bad: false, html: "", source: escape(s.text) }));
    for (const s of e.bad?.snippets ?? []) outputs.unshift({ label: "", bad: true, html: "", source: escape(s.text) });
    return { key: `constructed-${i}`, kind: "sample", name: e.name, constructed: true, images: (e.sourceImages ?? []).map(img => img.src), description: e.paragraphs[0] ? `<p>${escape(e.paragraphs[0])}</p>` : "", notes: "", outputs };
  });
  return { focus: entry.focus, workflow: entry.workflow ?? [], examples };
}

// RFC numbering, chapter names and reading order, shared by the index and the pager.
const rfcHeadings = (() => {
  const md = readFileSync(path.join(ROOT, "public/protocol/rfc.md"), "utf8");
  const titles = new Map<string, string>();
  for (const m of md.matchAll(/^#{2,4} §?([0-9A-D]+(?:\.[0-9]+)*) (.+)$/gm)) if (!titles.has(m[1])) titles.set(m[1], m[2].trim());
  return titles;
})();
const sortKey = (section: string | null) => (section ?? "Z").split(".").map(p => /^\d+$/.test(p) ? Number(p) : 1000 + p.charCodeAt(0));
const compare = (a: string | null, b: string | null) => {
  const x = sortKey(a), y = sortKey(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (x[i] ?? -1) - (y[i] ?? -1); if (d) return d; }
  return 0;
};

export type IndexEntry = { slug: string; title: string; section: string | null; chapter: string; chapterTitle: string; group: string | null; status: "rule" | "either" | "open" | "reference"; scope: "page" | "document" | null; rfcOnly: boolean };
const shown = new Set(notes.map(n => n.slug));
export const indexEntries: IndexEntry[] = allNotes.map((note: Note) => {
  const page = rulePage(note.slug);
  const chapter = page.section?.split(".")[0] ?? "Z";
  const parts = page.section?.split(".") ?? [];
  const group = parts.length > 2 ? parts.slice(0, 2).join(".") : null;
  return { slug: note.slug, title: page.title || note.title, section: page.section, chapter, chapterTitle: rfcHeadings.get(chapter) ?? note.area, group: group && rfcHeadings.has(group) ? `${group} ${rfcHeadings.get(group)}` : null, status: note.badge, scope: page.scope, rfcOnly: !shown.has(note.slug) };
}).sort((a, b) => compare(a.section, b.section));

export const readingOrder = indexEntries.filter(e => !e.rfcOnly);
export const crumbsFor = (section: string | null) => {
  if (!section) return [];
  const parts = section.split(".");
  const out = [{ label: `§${parts[0]} ${rfcHeadings.get(parts[0]) ?? ""}`.trim() }];
  if (parts.length > 2) { const g = parts.slice(0, 2).join("."); if (rfcHeadings.has(g)) out.push({ label: `${g} ${rfcHeadings.get(g)}` }); }
  return out;
};
export const rfcAnchor = (section: string | null) => `/protocol/rfc.html${section ? `#s${section.replaceAll(".", "-")}` : ""}`;
