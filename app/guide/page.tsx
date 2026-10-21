import type { Metadata } from "next";
import Link from "next/link";
import { guideHref, notes, startHere } from "../_site/conventions";
import { readingOrder } from "../_site/rfc";

export const metadata: Metadata = { title: "The guide · DPP", description: "Every Document Parsing Protocol convention, grouped by subject." };

export default function Guide() {
  return <article className="rs-guide-intro">
    <span className="rs-kicker">The guide</span>
    <h1>{notes.length} conventions for reading a page</h1>
    <p>Each rule answers one parsing question: what to preserve, and how to represent it. The list follows the RFC’s numbering and order. Each page shows the requirement, then every part of the rule with real pages beside their expected output, then how it differs from its neighbours.</p>
    <p className="rs-guide-rfc"><a href="/protocol/rfc.html">Read the full RFC with all examples →</a> · <a href="/protocol/rfc.md" download>Download Markdown</a></p>
    <p className="rs-guide-starts"><Link className="rs-primary-link" href={guideHref(readingOrder[0].slug)}>Read from §{readingOrder[0].section} {readingOrder[0].title} <span aria-hidden="true">→</span></Link><Link className="rs-text-link" href={guideHref(startHere.slug)}>Or start with a common case: {startHere.title} →</Link></p>
  </article>;
}
