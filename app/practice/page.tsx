import type { Metadata } from "next";
import Shell from "../_site/Shell";
import Calibration from "../components/research/Calibration";

export const metadata: Metadata = { title: "Practice · DPP", description: "Short exercises for making Document Parsing Protocol annotation calls." };

export default function Practice() {
  return <Shell className="rs-page">
    <section className="rs-cal-section">
      <div className="rs-width">
        <header className="rs-page-head"><span className="rs-kicker">Practice</span><h1>Make the annotation call</h1><p>Thirty-eight short exercises drawn from the guide’s look-alike cases. Each answer reveals its contrasting example and the reasoning behind the convention.</p></header>
        <Calibration />
      </div>
    </section>
  </Shell>;
}
