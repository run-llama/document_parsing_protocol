import type { Metadata } from "next";
import Link from "next/link";
import { guideHref, notes, startHere, statusHelp, statusLabels } from "../_site/conventions";

export const metadata: Metadata = { title: "The guide · DPP", description: "Every Document Parsing Protocol convention, grouped by subject." };

export default function Guide() {
  const counts = (["rule", "either", "open"] as const).map(b => ({ b, n: notes.filter(note => note.badge === b).length }));
  return <article className="rs-guide-intro">
    <span className="rs-kicker">The guide</span>
    <h1>{notes.length} conventions for reading a page</h1>
    <p>Each convention answers one parsing question: what to preserve, and how to represent it. Pick one from the list, or start with a common case.</p>
    <dl className="rs-guide-statuses">{counts.map(({ b, n }) => <div key={b} data-kind={b}><dt><span className="rs-status" data-kind={b}><i />{statusLabels[b]}</span></dt><dd><strong>{n}</strong>{statusHelp[b]}</dd></div>)}</dl>
    <Link className="rs-primary-link" href={guideHref(startHere.slug)}>Start with {startHere.title} <span aria-hidden="true">→</span></Link>
  </article>;
}
