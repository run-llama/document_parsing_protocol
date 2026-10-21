import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { allNotes, guideHref, noteBySlug } from "../../_site/conventions";
import { crumbsFor, readingOrder, rfcAnchor, rulePage, teachingFor } from "../../_site/rfc";
import { conventionQuestion } from "../../components/research/conventionQuestions";
import RuleExampleCard from "../../components/research/RuleExampleCard";
import PairStudy from "../../components/research/PairStudy";
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

const STATUS: Record<string, { label: string; note: string }> = {
  "✅ Normative": { label: "✅ Normative", note: "Settled. The requirement holds as written." },
  "⚖️ Equivalent forms": { label: "⚖️ Equivalent forms", note: "Two renderings conform. A document uses one of them throughout." },
  "❓ Open point": { label: "❓ Open point", note: "Not yet settled. Follow the working default; violations are reported as warnings only." },
};
const SCOPE = {
  page: { label: "📄 Page rule", note: "Can be applied from the page alone." },
  document: { label: "📚 Document rule", note: "Needs other pages of the same document; decided once and applied on every page." },
};

// One rule, laid out the way the RFC lays it out: the requirement, how to recognise the situation,
// each sub-case with its own examples beneath it, and the neighbouring rules with why they differ.
export default async function Convention({ params }: PageProps<"/guide/[slug]">) {
  const { slug } = await params;
  const note = noteBySlug.get(slug);
  if (!note) {
    if (!allNotes.some(item => item.slug === slug)) notFound();
    redirect(rfcAnchor(rulePage(slug).section));
  }
  const rule = rulePage(slug);
  const teaching = teachingFor(slug);
  const question = conventionQuestion(note.title);
  const status = rule.status ? STATUS[rule.status] ?? { label: rule.status, note: "" } : null;
  const scope = rule.scope ? SCOPE[rule.scope] : null;
  const lookalikes = pairs.filter(pair => pair.conventions.includes(slug));
  const position = readingOrder.findIndex(entry => entry.slug === slug);
  const previous = readingOrder[position - 1];
  const next = readingOrder[position + 1];

  let n = 0;
  const numbered = <T,>(items: T[]) => items.map(item => ({ item, number: ++n }));
  const constructed = teaching ? numbered(teaching.examples) : [];
  const subs = rule.subs.map(sub => ({ ...sub, cards: numbered(sub.examples) }));
  const exampleCount = n;
  const rfcExamples = rule.subs.reduce((sum, sub) => sum + sub.examples.length, 0);
  const titledSubs = subs.filter(sub => sub.title);

  const images = new Set<string>();
  for (const sub of rule.subs) {
    for (const e of sub.examples) e.images.forEach(src => images.add(src));
    for (const m of sub.body.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) images.add(m[1]);
  }
  const credits = [...new Set(publicationData.images.filter(image => images.has(image.src) && image.attribution).map(image => image.attribution))];
  const crumbs = crumbsFor(rule.section);
  const more = Boolean(teaching?.workflow.length || credits.length || rule.meta);

  return <article className="rs-conv" key={slug}>
    <nav className="rs-conv-crumbs" aria-label="Breadcrumb"><Link href="/guide">Guide</Link>{crumbs.map(c => <span key={c.label}><span aria-hidden="true">/ </span>{c.label}</span>)}</nav>
    <header className="rs-conv-head">
      {rule.section && <span className="rs-conv-num">§{rule.section}</span>}
      <h1>{rule.title || note.title}</h1>
      {question && <p className="rs-conv-question">{question}</p>}
      <p className="rs-conv-badges">
        {status && <span className="rs-badge" title={status.note}>{status.label}<small>{status.note}</small></span>}
        {scope && <span className="rs-badge" title={scope.note}>{scope.label}<small>{scope.note}</small></span>}
        <a className="rs-conv-rfc" href={rfcAnchor(rule.section)}>Read §{rule.section} in the RFC ↗</a>
      </p>
    </header>

    {rule.requirement && <section className="rs-parsing-decision rs-conv-rule" aria-label="The requirement"><span>{rule.status === "❓ Open point" ? "The working default" : rule.calloutTitle ?? "The requirement"}</span><div className="rs-conv-req" dangerouslySetInnerHTML={{ __html: rule.requirement }} /></section>}

    {rule.situation && <section className="rs-conv-block rs-conv-situation" aria-labelledby="situation-heading">
      <h2 id="situation-heading">{rule.status ? "When it applies" : "In detail"}</h2>
      <div className="rs-rfc-body" dangerouslySetInnerHTML={{ __html: rule.situation }} />
    </section>}

    {titledSubs.length > 1 && <nav className="rs-conv-toc" aria-label="What this rule covers">
      <span className="rs-kicker">What this rule covers</span>
      <ol>{titledSubs.map(sub => <li key={sub.id}><a href={`#${sub.id}`}>{sub.title}</a>{sub.cards.length > 0 && <small>{sub.cards.length} example{sub.cards.length > 1 ? "s" : ""}</small>}</li>)}</ol>
    </nav>}

    {exampleCount > 0 && <p className="rs-conv-key"><b>Reading the examples.</b> Each one pairs a source page with the output the rule expects. ✅&nbsp;<i>Sample</i>: the rule applies. ❌&nbsp;<i>Counter-sample</i>: it looks like it applies and does not, or a rendering got it wrong. A non-conforming output, in red, is shown only for contrast. <code>…</code> marks content left out of an excerpt.</p>}

    {constructed.length > 0 && <section className="rs-conv-block" aria-labelledby="constructed-heading">
      <h2 id="constructed-heading">The point, in a small example</h2>
      <p className="rs-conv-lede">{teaching!.focus} These pages are made up to isolate the rule{rfcExamples ? <>; the RFC’s real-document examples follow{titledSubs.length ? " under each part of the rule" : ""}</> : ""}.</p>
      <div className="rs-cards">{constructed.map(({ item, number }) => <RuleExampleCard key={item.key} example={item} number={number} rule={rule.title} />)}</div>
    </section>}

    {subs.map(sub => <section className="rs-conv-block rs-conv-sub" key={sub.id} id={sub.id} aria-label={sub.title ?? "Examples"}>
      <h2>{sub.title ?? "Examples"}</h2>
      {sub.body && <div className="rs-rfc-body" dangerouslySetInnerHTML={{ __html: sub.body }} />}
      {sub.cards.length > 0 && <div className="rs-cards">{sub.cards.map(({ item, number }) => <RuleExampleCard key={item.key} example={item} number={number} rule={rule.title} />)}</div>}
    </section>)}

    {lookalikes.length > 0 && <section className="rs-conv-block" aria-labelledby="lookalike-heading">
      <h2 id="lookalike-heading">Look-alike</h2>
      <p className="rs-conv-lede">Two similar pages that call for different decisions. Synthetic, for teaching the boundary.</p>
      {lookalikes.map(pair => <PairStudy key={pair.id} pair={pair} />)}
    </section>}

    {rule.related.length > 0 && <section className="rs-conv-block" aria-labelledby="related-heading">
      <h2 id="related-heading">Neighbouring rules, and how they differ</h2>
      <ul className="rs-related">{rule.related.map((r, i) => <li key={i}>{r.href ? <Link href={r.href}>{r.title}</Link> : null}{r.section && <span className="rs-sec">§{r.section}</span>}{r.reason && <span className="rs-related-why" dangerouslySetInnerHTML={{ __html: r.reason }} />}</li>)}</ul>
    </section>}

    {more && <section className="rs-conv-block rs-conv-more" aria-labelledby="more-heading">
      <h2 id="more-heading">More</h2>
      {teaching && teaching.workflow.length > 0 && <details className="rs-why-rule">
        <summary>How to annotate a page like this<span>{teaching.workflow.length} steps <i aria-hidden="true">+</i></span></summary>
        <ol className="rs-conv-steps">{teaching.workflow.map(step => <li key={step}>{step}</li>)}</ol>
      </details>}
      {credits.length > 0 && <details className="rs-why-rule">
        <summary>Sample sources<span>{credits.length} <i aria-hidden="true">+</i></span></summary>
        <p className="rs-history-intro">Public-domain U.S. federal government source material.</p>
        <ul className="rs-conv-credits">{credits.map(credit => <li key={credit}>{credit}</li>)}</ul>
      </details>}
      {rule.meta && <p className="rs-conv-id">Rule id <span dangerouslySetInnerHTML={{ __html: rule.meta }} /></p>}
    </section>}

    <nav className="rs-conv-pager" aria-label="Adjacent rules in RFC order">
      {previous ? <Link href={guideHref(previous.slug)} rel="prev"><span className="rs-kicker">← §{previous.section}</span>{previous.title}</Link> : <span />}
      {next ? <Link href={guideHref(next.slug)} rel="next"><span className="rs-kicker">§{next.section} →</span>{next.title}</Link> : <span />}
    </nav>
  </article>;
}
