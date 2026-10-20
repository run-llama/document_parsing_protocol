import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { allNotes, guideHref, hasExamples, noteBySlug, ordered } from "../../_site/conventions";
import { conventionQuestion } from "../../components/research/conventionQuestions";
import ExampleList, { Snippets, type Bundle, type Example } from "../../components/research/ExampleViewer";
import PairStudy from "../../components/research/PairStudy";
import teachingData from "../../../resources/convention-library/teaching-examples.json";
import publicationData from "../../../resources/convention-library/publication-provenance.json";
import { pairs } from "../../data/pairs";

export const dynamicParams = false;
export function generateStaticParams() {
  return allNotes.map(note => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guide/[slug]">): Promise<Metadata> {
  const note = noteBySlug.get((await params).slug);
  return note ? { title: `${note.title} · DPP`, description: note.rule } : {};
}

async function loadBundle(slug: string): Promise<Bundle | null> {
  if (!hasExamples(slug)) return null;
  const file = path.join(process.cwd(), "public/convention-examples", `${slug}.json`);
  return JSON.parse(await readFile(file, "utf8")) as Bundle;
}

// One convention, answer first: the rule, every example in order, the look-alike, then the rest folded away.
export default async function Convention({ params }: PageProps<"/guide/[slug]">) {
  const { slug } = await params;
  const note = noteBySlug.get(slug);
  if (!note) {
    const reference = allNotes.find(item => item.slug === slug);
    if (!reference) notFound();
    const content = JSON.parse(await readFile(path.join(process.cwd(), "resources/convention-library/content", `${slug}.json`), "utf8")) as { html: string };
    const section = content.html.match(/<h3>§([A-Z0-9]+(?:\.[0-9]+)+) /)?.[1];
    redirect(`/protocol/rfc.html${section ? `#s${section.replaceAll(".", "-")}` : ""}`);
  }
  const bundle = await loadBundle(slug);
  const content = JSON.parse(await readFile(path.join(process.cwd(), "resources/convention-library/content", `${slug}.json`), "utf8")) as { html: string };
  const section = content.html.match(/<h3>§([A-Z0-9]+(?:\.[0-9]+)+) /)?.[1];
  const teaching = (teachingData.conventions as Record<string, { examples: string[]; focus: string; workflow?: string[] }>)[slug];
  const additions = teaching?.examples.map(id => (teachingData.examples as Record<string, Example>)[id]) ?? [];
  const samples = [...additions, ...(bundle?.examples.filter(e => e.kind === "sample") ?? [])];
  const counters = bundle?.examples.filter(e => e.kind === "counter") ?? [];
  const examples = [...samples, ...counters];
  const imagePaths = new Set(bundle?.examples.flatMap(e => e.sourceImages?.map(image => image.src) ?? []) ?? []);
  for (const match of content.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) imagePaths.add(match[1]);
  const credits = [...new Set(publicationData.images.filter(image => imagePaths.has(image.src) && image.attribution).map(image => image.attribution))];
  const worked = bundle?.worked ?? [];
  const lookalikes = pairs.filter(pair => pair.conventions.includes(slug));
  const related = note.related.filter(r => r.slug && noteBySlug.has(r.slug)).slice(0, 4);
  const position = ordered.findIndex(n => n.slug === slug);
  const previous = ordered[position - 1];
  const next = ordered[position + 1];
  const question = conventionQuestion(note.title);
  const decisionLabel = note.badge === "reference" ? "Protocol reference" : "How DPP handles it";
  const more = Boolean(note.situation || teaching?.workflow || worked.length || related.length || credits.length || note.rule_id);

  return <article className="rs-conv" key={slug}>
    <nav className="rs-conv-crumbs" aria-label="Breadcrumb"><Link href="/guide">Guide</Link><span aria-hidden="true">/</span><span>{note.area}</span>{note.sub && <><span aria-hidden="true">/</span><span>{note.sub}</span></>}</nav>
    <header className="rs-conv-head">
      <h1>{note.title}</h1>
      {question && <p className="rs-conv-question">{question}</p>}
      {note.scope === "document" && <p className="rs-conv-meta"><span className="rs-tag">Document-level rule</span><span>Decided once per document, not per page.</span></p>}
    </header>

    <section className="rs-parsing-decision rs-conv-rule" aria-label="The convention"><span>{decisionLabel}</span><p>{note.rule}</p></section>
    <details className="rs-conv-full"><summary>Full rule text{section && <small>RFC §{section}</small>}<span aria-hidden="true">+</span></summary><div className="rs-rendered" dangerouslySetInnerHTML={{ __html: content.html }} /></details>

    {examples.length > 0
      ? <section className="rs-conv-block" aria-labelledby="example-heading">
        <h2 id="example-heading">{examples.length === 1 ? "Example" : `${examples.length} examples`}</h2>
        <p className="rs-conv-lede">{teaching?.focus ?? "Each example shows a page and the output the convention expects for it."}{counters.length > 0 && ` Counter-examples, marked in red, show a reading that looks right and is not.`}</p>
        <ExampleList examples={examples} title={note.title} />
      </section>
      : worked.length > 0
        ? <section className="rs-conv-block" aria-labelledby="example-heading">
          <h2 id="example-heading">Worked encoding{worked.length > 1 ? "s" : ""}</h2>
          <p className="rs-conv-lede">The guide gives this convention as an encoding rather than a page: the printed text on the left, the expected output on the right.</p>
          {worked.map((item, i) => <div className="rs-conv-worked" key={i}>{worked.length > 1 && <h4>{item.title}</h4>}<Snippets snippets={[item]} /></div>)}
        </section>
        : <p className="rs-output-missing rs-conv-no-example">No example is recorded for this convention yet. The full rule text above has the detail.</p>}

    {lookalikes.length > 0 && <section className="rs-conv-block" aria-labelledby="lookalike-heading">
      <h2 id="lookalike-heading">Look-alike</h2>
      <p className="rs-conv-lede">Two similar pages that call for different decisions. Synthetic, for teaching the boundary.</p>
      {lookalikes.map(pair => <PairStudy key={pair.id} pair={pair} />)}
    </section>}

    {more && <section className="rs-conv-block rs-conv-more" aria-labelledby="more-heading">
      <h2 id="more-heading">More</h2>
      {note.situation && <details className="rs-why-rule">
        <summary>Why this rule<span><i aria-hidden="true">+</i></span></summary>
        <p className="rs-history-intro">{note.situation}</p>
      </details>}
      {teaching?.workflow && <details className="rs-why-rule">
        <summary>How to annotate a page like this<span>{teaching.workflow.length} steps <i aria-hidden="true">+</i></span></summary>
        <ol className="rs-conv-steps">{teaching.workflow.map(step => <li key={step}>{step}</li>)}</ol>
      </details>}
      {worked.length > 0 && examples.length > 0 && <details className="rs-why-rule">
        <summary>Worked encodings<span>{worked.length} <i aria-hidden="true">+</i></span></summary>
        {worked.map((item, i) => <div className="rs-conv-worked" key={i}><h4>{item.title}</h4><Snippets snippets={[item]} /></div>)}
      </details>}
      {credits.length > 0 && <details className="rs-why-rule">
        <summary>Sample sources<span>{credits.length} <i aria-hidden="true">+</i></span></summary>
        <p className="rs-history-intro">Public-domain U.S. federal government source material.</p>
        <ul className="rs-conv-credits">{credits.map(credit => <li key={credit}>{credit}</li>)}</ul>
      </details>}
      {related.length > 0 && <div className="rs-note-related"><span className="rs-kicker">Related</span>{related.map(r => <Link key={r.slug} href={guideHref(r.slug!)}>{noteBySlug.get(r.slug!)!.title}<span>↗</span></Link>)}</div>}
      {note.rule_id && <p className="rs-conv-id">Rule id <code>{note.rule_id}</code>{section && <> · <Link href={`/protocol/rfc.html#s${section.replaceAll(".", "-")}`}>RFC §{section} ↗</Link></>}</p>}
    </section>}

    <nav className="rs-conv-pager" aria-label="Adjacent conventions">
      {previous ? <Link href={guideHref(previous.slug)} rel="prev"><span className="rs-kicker">← Previous</span>{previous.title}</Link> : <span />}
      {next ? <Link href={guideHref(next.slug)} rel="next"><span className="rs-kicker">Next →</span>{next.title}</Link> : <span />}
    </nav>
  </article>;
}
