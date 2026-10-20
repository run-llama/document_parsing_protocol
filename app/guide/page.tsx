import type { Metadata } from "next";
import Link from "next/link";
import { guideHref, notes, startHere } from "../_site/conventions";

export const metadata: Metadata = { title: "The guide · DPP", description: "Every Document Parsing Protocol convention, grouped by subject." };

export default function Guide() {
  return <article className="rs-guide-intro">
    <span className="rs-kicker">The guide</span>
    <h1>{notes.length} conventions for reading a page</h1>
    <p>Each convention answers one parsing question: what to preserve, and how to represent it. Pick one from the list, or start with a common case.</p>
    <p><a href="/protocol/rfc.html">Read the full RFC with all examples →</a> · <a href="/protocol/rfc.md" download>Download Markdown</a></p>
    <Link className="rs-primary-link" href={guideHref(startHere.slug)}>Start with {startHere.title} <span aria-hidden="true">→</span></Link>
  </article>;
}
