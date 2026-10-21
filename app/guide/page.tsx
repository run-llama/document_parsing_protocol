import type { Metadata } from "next";
import Link from "next/link";
import { guideHref, noteBySlug } from "../_site/conventions";
import { indexEntries, readingOrder, rulePage } from "../_site/rfc";

export const metadata: Metadata = { title: "The guide · DPP", description: "The Document Parsing Protocol, rule by rule, in RFC order." };

// What each chapter is for, in a line. The chapters themselves carry no introduction in the RFC.
const ABOUT: Record<string, string> = {
  "1": "How to read the protocol: what MUST, SHOULD and MAY mean, what makes an output conform, and what each badge says.",
  "2": "The three requirements every other rule exists to serve.",
  "3": "The shape of a conforming output: elements, one Markdown file, boxes and the sidecar.",
  "4": "Decisions that need more than one page, made once and kept for the whole document.",
  "5": "Dividing a page into regions: what a block is, its class, its boundaries and its reading order.",
  "6": "Telling headings from labels, captions and furniture; folios, leaders, margin notes and contents pages.",
  "7": "Inline markup, and the marks a page carries: stamps, signatures, seals, redactions, watermarks.",
  "8": "Bullet markers and nesting.",
  "9": "What counts as a table, where one ends, and how its headers, columns, rows and cell values are written.",
  "10": "Fields, blanks, checkboxes and option groups, written as key-value lines in printed order.",
  "11": "Turning a chart into a table of every data point, with printed values preferred over estimates.",
  "12": "Putting an image’s content into the text: transcription, a table, a diagram language or a description.",
  "13": "Chemical structures and music notation.",
  A: "Situations where two renderings both conform.",
  D: "Every rule’s requirement on one page.",
};
const PRINCIPLES = ["02-principles-the-page-is-the-ground-truth", "02-principles-never-drop-never-invent", "02-principles-traceability"];
const COMMON = ["tables-3-headers-multi-row-header-tiers", "tables-2-boundaries-cross-page-tables", "page-structure-recognising-ambiguous-headings", "forms-2-fields-checkboxes", "text-2-marks-on-the-page-watermarks", "charts-2-chart-types-bars-and-histograms"];

export default function Guide() {
  const pages = readingOrder;
  const rules = pages.filter(e => e.status !== "reference").length;
  const examples = pages.reduce((sum, e) => sum + rulePage(e.slug).subs.reduce((s, sub) => s + sub.examples.length, 0), 0);
  const chapters = [...new Map(pages.map(e => [e.chapter, e.chapterTitle])).entries()];
  const bySlug = new Map(indexEntries.map(e => [e.slug, e]));
  const first = pages[0];

  return <article className="rs-gl">
    <header className="rs-gl-hero">
      <span className="rs-kicker">The guide</span>
      <h1>The protocol, rule by rule</h1>
      <p>Each rule settles one decision a parser has to make about a page — what to keep, and how to write it down. Every rule page states the requirement, shows real pages beside the output it expects, and explains how it differs from the rules next to it.</p>
      <dl className="rs-gl-stats">
        <div><dt>Rules</dt><dd>{rules}</dd></div>
        <div><dt>Chapters</dt><dd>{chapters.filter(([c]) => /^\d+$/.test(c)).length}</dd></div>
        <div><dt>Real-document examples</dt><dd>{examples}</dd></div>
      </dl>
      <div className="rs-gl-actions">
        <Link className="rs-primary-link" href={guideHref(first.slug)}>Read in order from §{first.section} <span aria-hidden="true">→</span></Link>
        <a className="rs-text-link" href="/protocol/rfc.html">The full RFC on one page ↗</a>
        <a className="rs-text-link" href="/protocol/rfc.md" download>Download as Markdown ↓</a>
      </div>
    </header>

    <section className="rs-gl-section" aria-labelledby="gl-principles">
      <h2 id="gl-principles">Three principles behind every rule</h2>
      <p className="rs-gl-lede">Almost every rule exists to stop one of two failures: dropping what the page prints, or inventing what it doesn’t.</p>
      <ol className="rs-gl-principles">{PRINCIPLES.map(slug => {
        const page = rulePage(slug);
        return <li key={slug}>
          <div><span className="rs-kicker">§{page.section}</span><h3><Link href={guideHref(slug)}>{page.title}</Link></h3></div>
          <div className="rs-gl-req" dangerouslySetInnerHTML={{ __html: page.requirement ?? "" }} />
        </li>;
      })}</ol>
    </section>

    <section className="rs-gl-section" aria-labelledby="gl-start">
      <h2 id="gl-start">Common cases to start with</h2>
      <ul className="rs-gl-common">{COMMON.filter(slug => noteBySlug.has(slug)).map(slug => {
        const e = bySlug.get(slug)!;
        return <li key={slug}><Link href={guideHref(slug)}><span className="rs-kicker">§{e.section}</span><strong>{e.title}</strong><i aria-hidden="true">→</i></Link></li>;
      })}</ul>
    </section>

    <section className="rs-gl-section" aria-labelledby="gl-chapters">
      <h2 id="gl-chapters">Chapters</h2>
      <ol className="rs-gl-chapters">{chapters.map(([chapter, title]) => {
        const items = pages.filter(e => e.chapter === chapter);
        const numbered = /^\d+$/.test(chapter);
        return <li key={chapter}>
          <Link className="rs-gl-ch-head" href={guideHref(items[0].slug)}><span className="rs-kicker">{numbered ? `§${chapter}` : `Appendix ${chapter}`}</span><h3>{title}</h3><small>{items.length} {items.length === 1 ? "section" : "sections"}</small></Link>
          {ABOUT[chapter] && <p>{ABOUT[chapter]}</p>}
          <ul>{items.slice(0, 4).map(e => <li key={e.slug}><Link href={guideHref(e.slug)}><span>{e.section}</span>{e.title}</Link></li>)}{items.length > 4 && <li className="rs-gl-more"><Link href={guideHref(items[4].slug)}>+ {items.length - 4} more, from §{items[4].section}</Link></li>}</ul>
        </li>;
      })}</ol>
    </section>

    <section className="rs-gl-section rs-gl-key" aria-labelledby="gl-key">
      <h2 id="gl-key">Reading a rule page</h2>
      <ol className="rs-gl-steps">
        <li><b>The requirement</b>, in RFC wording, with its status and scope.</li>
        <li><b>When it applies</b>: how to recognise the situation, often with a sketch of the printed page.</li>
        <li><b>Each part of the rule</b>, with its own examples beneath: the source page beside the expected output and the exact Markdown.</li>
        <li><b>Neighbouring rules</b>, and why each one resolves differently.</li>
      </ol>
      <dl className="rs-gl-badges">
        <div><dt>✅ Normative</dt><dd>Settled; the requirement holds as written.</dd></div>
        <div><dt>⚖️ Equivalent forms</dt><dd>Two renderings conform; a document uses one throughout. Marked <i>2 forms</i> in the list.</dd></div>
        <div><dt>❓ Open point</dt><dd>Not yet settled; follow the working default. Marked <i>open</i>.</dd></div>
        <div><dt>📚 Document rule</dt><dd>Needs other pages of the document; decided once. Marked <i>doc</i>.</dd></div>
        <div><dt>✅ Sample · ❌ Counter-sample</dt><dd>The rule applies · it looks like it applies and does not, or a rendering got it wrong.</dd></div>
      </dl>
    </section>
  </article>;
}
