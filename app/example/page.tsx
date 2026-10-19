import type { Metadata } from "next";
import Shell from "../_site/Shell";
import DecisionLab from "../components/research/DecisionLab";

export const metadata: Metadata = { title: "Worked page · DPP", description: "Apple’s FY2024 statement of operations, with the parsing decisions DPP makes on it." };

export default function Example() {
  return <Shell className="rs-page">
    <section className="rs-section rs-width">
      <header className="rs-page-head"><span className="rs-kicker">Worked page</span><h1>One real page. Eight parsing decisions.</h1><p>Apple’s published statement of operations puts the conventions in context. Select a region to see the choice it presents, what DPP preserves, and how that appears in the output.</p></header>
      <DecisionLab />
      <div className="rs-figure-caption"><span>FIG. 01</span><p>Apple’s FY2024 financial statements, page 1, reproduced from the original PDF. The highlights and encoding excerpts are DPP explanations, not output from a parser.</p></div>
    </section>
  </Shell>;
}
