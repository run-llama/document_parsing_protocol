import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { guideHref, hasExamples, noteBySlug, notes, ordered, statusHelp, statusLabels } from "../../_site/conventions";
import { conventionQuestion } from "../../components/research/conventionQuestions";
import ExampleViewer, { Snippets, type Bundle } from "../../components/research/ExampleViewer";
import ConventionHistory from "../../components/research/ConventionHistory";
import PairStudy from "../../components/research/PairStudy";
import { pairs } from "../../data/pairs";

export const dynamicParams = false;
export function generateStaticParams() {
  return notes.map(note => ({ slug: note.slug }));
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

// One convention, answer first: the rule, an example, the case it is confused with, then everything else.
export default async function Convention({ params }: PageProps<"/guide/[slug]">) {
  const { slug } = await params;
  const note = noteBySlug.get(slug);
  if (!note) notFound();
  const bundle = await loadBundle(slug);
  const samples = bundle?.examples.filter(e => e.kind === "sample") ?? [];
  const counters = bundle?.examples.filter(e => e.kind === "counter") ?? [];
  const worked = bundle?.worked ?? [];
  const lookalikes = pairs.filter(pair => pair.conventions.includes(slug));
  const related = note.related.filter(r => r.slug && noteBySlug.has(r.slug)).slice(0, 4);
  const position = ordered.findIndex(n => n.slug === slug);
  const previous = ordered[position - 1];
  const next = ordered[position + 1];
  const question = conventionQuestion(note.title);
  const decisionLabel = note.badge === "open" ? "Working guidance · still open" : note.badge === "either" ? "DPP allows either approach" : "How DPP handles it";

  return <article className="rs-conv" key={slug}>
    <nav className="rs-conv-crumbs" aria-label="Breadcrumb"><Link href="/guide">Guide</Link><span aria-hidden="true">/</span><span>{note.area}</span>{note.sub && <><span aria-hidden="true">/</span><span>{note.sub}</span></>}</nav>
    <header className="rs-conv-head">
      <h1>{note.title}</h1>
      {question && <p className="rs-conv-question">{question}</p>}
      <span className="rs-status" data-kind={note.badge}><i />{statusLabels[note.badge]} · {statusHelp[note.badge]}</span>
    </header>

    <section className="rs-parsing-decision rs-conv-rule" aria-label="The convention"><span>{decisionLabel}</span><p>{note.rule}</p></section>

    {samples.length > 0
      ? <section className="rs-conv-block" aria-labelledby="example-heading">
        <h2 id="example-heading">Example</h2>
        <ExampleViewer examples={samples} title={note.title} kind="sample" />
      </section>
      : worked.length > 0
        ? <section className="rs-conv-block" aria-labelledby="example-heading">
          <h2 id="example-heading">Worked encoding{worked.length > 1 ? "s" : ""}</h2>
          <p className="rs-conv-lede">The guide gives this convention as an encoding rather than a page: the printed text on the left, the expected output on the right.</p>
          {worked.map((item, i) => <div className="rs-conv-worked" key={i}>{worked.length > 1 && <h4>{item.title}</h4>}<Snippets snippets={[item]} /></div>)}
        </section>
        : <p className="rs-output-missing rs-conv-no-example">No example is recorded for this convention yet.</p>}

    {counters.length > 0 && <section className="rs-conv-block" aria-labelledby="counter-heading">
      <h2 id="counter-heading">Counter-example</h2>
      <p className="rs-conv-lede">A page that invites the wrong reading. The expected output shows what DPP wants; where the guide records the mistake itself, it appears first.</p>
      <ExampleViewer examples={counters} title={note.title} kind="counter" />
    </section>}

    {lookalikes.length > 0 && <section className="rs-conv-block" aria-labelledby="lookalike-heading">
      <h2 id="lookalike-heading">Look-alike</h2>
      <p className="rs-conv-lede">Two similar pages that call for different decisions. Synthetic, for teaching the boundary.</p>
      {lookalikes.map(pair => <PairStudy key={pair.id} pair={pair} />)}
    </section>}

    <section className="rs-conv-block rs-conv-more" aria-labelledby="more-heading">
      <h2 id="more-heading">More</h2>
      <ConventionHistory slug={slug} openFirst={note.badge === "open"} />
      {worked.length > 0 && samples.length > 0 && <details className="rs-why-rule">
        <summary>Worked encodings<span>{worked.length} <i aria-hidden="true">+</i></span></summary>
        {worked.map((item, i) => <div className="rs-conv-worked" key={i}><h4>{item.title}</h4><Snippets snippets={[item]} /></div>)}
      </details>}
      {note.situation && <details className="rs-why-rule">
        <summary>More context<span><i aria-hidden="true">+</i></span></summary>
        <p className="rs-history-intro">{note.situation}</p>
      </details>}
      {related.length > 0 && <div className="rs-note-related"><span className="rs-kicker">Related</span>{related.map(r => <Link key={r.slug} href={guideHref(r.slug!)}>{noteBySlug.get(r.slug!)!.title}<span>↗</span></Link>)}</div>}
    </section>

    <nav className="rs-conv-pager" aria-label="Adjacent conventions">
      {previous ? <Link href={guideHref(previous.slug)} rel="prev"><span className="rs-kicker">← Previous</span>{previous.title}</Link> : <span />}
      {next ? <Link href={guideHref(next.slug)} rel="next"><span className="rs-kicker">Next →</span>{next.title}</Link> : <span />}
    </nav>
  </article>;
}
