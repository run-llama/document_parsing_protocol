import type { Metadata } from "next";
import Link from "next/link";
import { researchFont } from "./_site/research-font";
import ResearchHero from "./components/research/ResearchHero";
import SiteNav, { SiteFooter } from "./components/research/SiteNav";
import ConventionIndex from "./components/research/ConventionIndex";
import { indexEntries } from "./_site/rfc";
import UseDpp from "./components/research/UseDpp";
import snapshot from "./data/protocol-snapshot.json";
import { notes } from "./_site/conventions";
import "./_site/research.css";
import "./_site/guide.css";

export const metadata: Metadata = {
  title: "Document Parsing Protocol (DPP)",
  description: "A protocol for how to make truthful and AI-friendly interpretation of documents. DPP proposes shared conventions for representing documents, preserving their content, structure, and uncertainty.",
};

// Four stops: the hook, the guide, trying it, and what this draft is.
export default function Home() {
  return (
    <main className={`research ${researchFont.variable}`} id="top">
      <a className="rs-skip" href="#guide">Skip to the guide</a>
      <header className="rs-masthead rs-width">
        <a className="rs-wordmark" href="#top" aria-label="Document Parsing Protocol home">DPP<span className="rs-draft">Working draft 0.1</span></a>
      </header>
      <ResearchHero />
      <SiteNav />

      <section id="guide" className="rs-section rs-width rs-home-guide" aria-labelledby="guide-heading">
        <header className="rs-section-head">
          <div className="rs-section-label">The guide</div>
          <div>
            <h2 id="guide-heading">{notes.length} conventions for reading a page</h2>
            <p>Each convention answers one parsing question: what to preserve, and how to represent it. Numbered and ordered as in the RFC. Open one to see its requirement, each part of the rule with real pages beside their expected output, and how it differs from its neighbours.</p>
          </div>
        </header>
        <ConventionIndex variant="page" entries={indexEntries} />
        <aside className="rs-home-more">
          <Link href="/example"><span className="rs-kicker">Worked page</span><strong>See the conventions applied to Apple’s FY2024 statement of operations</strong><i aria-hidden="true">→</i></Link>
          <Link href="/practice"><span className="rs-kicker">Practice</span><strong>Make the annotation call on 38 short exercises</strong><i aria-hidden="true">→</i></Link>
        </aside>
      </section>

      <UseDpp />

      <section className="rs-use-provenance rs-width" id="methods" aria-label="About this draft">
        <details className="rs-methods"><summary>Draft status & provenance <span>+</span></summary><p>DPP is a proposed protocol developed from ParseBench’s document representation conventions. This working draft contains {notes.length} notes. Settled means settled within this draft, rather than independently ratified.</p><p>The current materials define representation conventions and examples. The guide defines Markdown, optional sidecar fields, and conformance requirements. The generated checker is guidance for reviewing outputs, not an automated conformance suite. Source digest: {snapshot.sourceRevision.slice(0, 12)}.</p><p>The opening figure reproduces page 1 of IRS Form 1040 (2020), a public-domain U.S. government document, with blank margins trimmed. Its annotations are DPP explanations. Convention pages pair source images from the guide with the expected output the guide specifies for them, and with worked encodings. Counter-examples also show the non-conforming output the convention rules out. The worked page reproduces Apple’s published FY2024 statement of operations with explanatory DPP overlays and authored encoding excerpts. The look-alike comparisons are synthetic.</p></details>
      </section>
      <SiteFooter />
    </main>
  );
}
