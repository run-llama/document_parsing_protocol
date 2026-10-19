import type { Metadata } from "next";
import Link from "next/link";
import Shell from "../_site/Shell";
import CaseFiles from "../components/research/CaseFiles";

export const metadata: Metadata = { title: "Decision register · DPP", description: "The reasoning, alternatives, and open questions behind the Document Parsing Protocol conventions." };

export default function Decisions() {
  return <Shell className="rs-register-page">
    <section className="rs-width rs-register-content">
      <header className="rs-register-heading"><span className="rs-kicker">Supporting reference</span><h1>Decision register</h1><p>The history behind the conventions: 104 records, with 82 resolved and 22 still open. Consult a record when you need the alternatives, a prior default, or an unresolved question.</p><p>For current parsing guidance, start with the <Link href="/guide">guide</Link>. A historical default is not necessarily the final answer.</p></header>
      <CaseFiles />
    </section>
  </Shell>;
}
