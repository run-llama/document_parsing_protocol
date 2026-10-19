import type React from "react";
import SiteNav, { SiteFooter } from "../components/research/SiteNav";
import { researchFont } from "./research-font";
import "./research.css";
import "./guide.css";

// Every page except the home page: site bar on top, footer below.
export default function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <main className={`research ${researchFont.variable} ${className}`}>
    <a className="rs-skip" href="#content">Skip to content</a>
    <SiteNav />
    <div id="content">{children}</div>
    <SiteFooter />
  </main>;
}
