// Parses one rule's packaged RFC HTML into its parts. Pure: no file or data access, so it can be tested alone.
export type Output = { label: string; bad: boolean; html: string; source: string };
export type RuleExample = { key: string; kind: "sample" | "counter" | "either"; name: string; constructed: boolean; images: string[]; description: string; notes: string; outputs: Output[]; credit?: string };
export type SubCase = { id: string; title: string | null; body: string; examples: RuleExample[] };
export type RelatedRule = { href: string; title: string; section: string | null; reason: string };
export type RulePage = { section: string | null; title: string; status: string | null; calloutTitle?: string; scope: "page" | "document" | null; meta: string; requirement: string | null; situation: string; subs: SubCase[]; related: RelatedRule[] };

const VOID = new Set(["img", "br", "hr", "input", "meta", "link", "source", "wbr"]);

type Block = { tag: string | null; attrs: string; html: string };
// The packaged HTML is a flat run of top-level elements and a few bare text nodes ("Expected Markdown · …").
function blocks(html: string): Block[] {
  const out: Block[] = [];
  const token = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|([^<]+)/g;
  let depth = 0, start = 0, tag = "", attrs = "";
  for (let m: RegExpExecArray | null; (m = token.exec(html));) {
    const [whole, close, name, rest, text] = m;
    if (text !== undefined) {
      if (depth === 0 && text.trim()) out.push({ tag: null, attrs: "", html: text.trim() });
      continue;
    }
    const lower = name.toLowerCase();
    if (!close) {
      if (depth === 0) { start = m.index; tag = lower; attrs = rest; }
      if (VOID.has(lower) || rest.trim().endsWith("/")) {
        if (depth === 0) out.push({ tag: lower, attrs: rest, html: whole });
        continue;
      }
      depth++;
    } else {
      depth = Math.max(0, depth - 1);
      if (depth === 0) out.push({ tag, attrs, html: html.slice(start, m.index + whole.length) });
    }
  }
  return out;
}

const strip = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
const inner = (html: string) => html.replace(/^<[^>]+>/, "").replace(/<\/[a-zA-Z0-9]+>$/, "");
export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Cross-references arrive as <a>Title</a>§9.3.2. Show them as "Title (§9.3.2)", and label sketches.
function polish(html: string) {
  return html
    .replace(/<\/a>§([0-9A-D]+(?:\.[0-9]+)*)/g, '</a> <span class="rs-sec">(§$1)</span>')
    .replace(/<pre><code class="language-text">([\s\S]*?)<\/code><\/pre>/g, '<figure class="rs-sketch"><figcaption>Sketch of the printed page — layout, not output</figcaption><pre><code>$1</code></pre></figure>');
}

function sourceOf(details: string) {
  // The source is already HTML-escaped inside <pre><code>; paragraphs inside it are an artefact of packaging.
  const code = details.match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/);
  return code ? code[1].replace(/<\/p>\s*<p>/g, "\n\n").replace(/<\/?p>/g, "").trim() : "";
}

export function parseRule(html: string): RulePage {
  const list = blocks(html);
  const page: RulePage = { section: null, title: "", status: null, scope: null, meta: "", requirement: null, situation: "", subs: [], related: [] };
  let sub: SubCase | null = null;
  let example: RuleExample | null = null;
  let output: Output | null = null;
  let inRelated = false;
  let pendingCallout = false;
  let count = 0;
  const situation: string[] = [];
  const body = (target: string) => {
    if (example) { if (example.outputs.length) example.notes += target; else example.description += target; }
    else if (sub) sub.body += target;
    else situation.push(target);
  };
  const ensureSub = () => { if (!sub) { sub = { id: "examples", title: null, body: "", examples: [] }; page.subs.push(sub); } return sub; };

  list.forEach((b, i) => {
    const text = b.tag === null ? b.html : "";
    if (i === 0 && b.tag === "h3") {
      const t = strip(b.html);
      const m = t.match(/^§([0-9A-D]+(?:\.[0-9]+)*)\s+(.+)$/);
      page.section = m?.[1] ?? null; page.title = m?.[2] ?? t;
      return;
    }
    // An open output keeps everything up to its Markdown-source block, headings included: rendered
    // Markdown often starts with <h3>/<h4>, which must not be read as a new sub-case or example.
    if (output) {
      const exampleHeading = b.tag === "h4" && /^(✅|❌|⚖)/.test(strip(b.html));
      const related = b.tag === "h3" && strip(b.html) === "Related";
      if (b.tag === "details" && /exp-src/.test(b.attrs)) { output.source = sourceOf(b.html); output = null; return; }
      if (!exampleHeading && !related && !(b.tag === null && /^(Expected Markdown|Non-conforming output|Expected output)/.test(text))) { output.html += polish(b.html); return; }
      output = null;
    }
    if (b.tag === "p" && /class="scope/.test(b.attrs)) { page.scope = /class="scope doc/.test(b.attrs) ? "document" : "page"; return; }
    if (b.tag === "p" && /class="rule-meta"/.test(b.attrs)) { page.meta = inner(b.html); return; }
    if (b.tag === "p" && /class="co-t"/.test(b.attrs)) {
      if (page.requirement === null && !sub) {
        const label = strip(b.html);
        if (/^(✅|⚖|❓)/.test(label)) page.status = label; else page.calloutTitle = label;
        pendingCallout = true;
      }
      else body(`<p class="rs-inline-callout-t">${inner(b.html)}</p>`);
      return;
    }
    if (pendingCallout) { page.requirement = polish(b.html); pendingCallout = false; return; }
    if (b.tag === "h3") {
      example = null; output = null;
      const t = strip(b.html);
      if (t === "Related") { inRelated = true; sub = null; return; }
      inRelated = false;
      sub = { id: slugify(t) || `part-${page.subs.length + 1}`, title: t, body: "", examples: [] };
      page.subs.push(sub);
      return;
    }
    if (inRelated) {
      for (const li of b.html.match(/<li>[\s\S]*?<\/li>/g) ?? []) {
        const a = li.match(/<a href="([^"]+)">([\s\S]*?)<\/a>(?:§([0-9A-D]+(?:\.[0-9]+)*))?\s*(?:—\s*)?([\s\S]*)<\/li>/);
        if (a) page.related.push({ href: a[1], title: strip(a[2]), section: a[3] ?? null, reason: polish(a[4].trim()) });
        else page.related.push({ href: "", title: "", section: null, reason: polish(inner(li)) });
      }
      return;
    }
    if (b.tag === "h4") {
      const t = strip(b.html);
      const kind = t.startsWith("✅") ? "sample" : t.startsWith("❌") ? "counter" : t.startsWith("⚖") ? "either" : null;
      if (!kind) { example = null; output = null; body(polish(b.html)); return; }
      const s = ensureSub();
      const name = t.includes("—") ? t.slice(t.indexOf("—") + 1).trim() : "";
      example = { key: `${s.id}-${++count}`, kind, name, constructed: /constructed/i.test(t), images: [], description: "", notes: "", outputs: [] };
      output = null;
      s.examples.push(example);
      return;
    }
    if (example) {
      if (b.tag === null && /^(Expected Markdown|Non-conforming output|Expected output)/.test(text)) {
        const bad = text.startsWith("Non-conforming");
        const label = text.includes("·") ? text.slice(text.indexOf("·") + 1).trim() : "";
        output = { label, bad, html: "", source: "" };
        example.outputs.push(output);
        return;
      }
      // The source page: a paragraph holding the image, sometimes followed by a "Source: …" credit line.
      if (!example.outputs.length && !example.description && b.tag === "p" && /<img\b/.test(b.html)) {
        for (const m of b.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) example.images.push(m[1]);
        const credit = strip(b.html.replace(/<a\b[^>]*>\s*<img\b[^>]*>\s*<\/a>|<img\b[^>]*>/g, ""));
        if (credit) example.credit = credit;
        return;
      }
    }
    body(polish(b.html));
  });
  page.situation = situation.join("");
  return page;
}

