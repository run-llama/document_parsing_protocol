"use client";

import { useRef, useState } from "react";

type Platform = "claude" | "chatgpt";
const downloads = {
  skill: "/downloads/dpp-parse-0.1.zip",
  reference: "/downloads/DPP-0.1-starter-reference.md",
  checklist: "/downloads/DPP-0.1-QA-checklist.md",
};

export default function UseDpp() {
  const [platform, setPlatform] = useState<Platform>("claude");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const promptField = useRef<HTMLTextAreaElement>(null);
  const prompt = `${platform === "claude" ? "Use the dpp-parse skill" : "Use the attached DPP-0.1-starter-reference.md"} to parse the attached page image. Work on the supplied pages in order; use document context when available.\n\nReturn Markdown for prose and HTML for tables. Preserve printed values, header tiers, repeated cells, blanks, and meaningful marks. Use the image as the authority; do not fill gaps from context.\n\nFollow the current protocol and its working defaults. Return only the parsed Markdown (and a sidecar if requested). When asked to review, apply the checker separately and report only checks actually performed.`;

  function choose(value: Platform) { setPlatform(value); setCopyState("idle"); }
  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
    } catch {
      promptField.current?.focus();
      promptField.current?.select();
      setCopyState("manual");
    }
  }

  return <section className="rs-adoption rs-width rs-use-dpp" id="adopt" aria-labelledby="adopt-heading">
    <div className="rs-adoption-heading"><span className="rs-kicker">Use DPP</span><h2 id="adopt-heading">Try it on one page.</h2><p>Give your assistant the conventions, attach a page, and inspect the result. Start with a reusable skill in Claude or a reference file in ChatGPT.</p></div>
    <div className="rs-use-platforms" role="group" aria-label="Choose where to use DPP">
      <button aria-pressed={platform === "claude"} onClick={() => choose("claude")}>Claude <span>Install a skill</span></button>
      <button aria-pressed={platform === "chatgpt"} onClick={() => choose("chatgpt")}>ChatGPT <span>Add a reference</span></button>
    </div>
    <div className="rs-use-workflow">
      <div className="rs-use-setup" key={platform}>
        <h3>{platform === "claude" ? "Add the DPP skill to Claude." : "Set up a DPP project in ChatGPT."}</h3>
        <ol className="rs-use-steps">
          <li><span>01</span><div><h4>{platform === "claude" ? "Download the skill." : "Download the reference."}</h4><p>{platform === "claude" ? "The ZIP includes the current generator skill, text-only protocol reference, and checker guidance." : "One Markdown file contains the current text-only protocol and checker guidance."}</p><a className="rs-use-download" href={platform === "claude" ? downloads.skill : downloads.reference} download>{platform === "claude" ? "Download skill .zip" : "Download reference .md"}<span aria-hidden="true">↓</span></a></div></li>
          <li><span>02</span><div><h4>{platform === "claude" ? "Upload and enable it." : "Add it to a project."}</h4><p>{platform === "claude" ? <>In Claude, open <strong>Customize → Skills</strong>, choose <strong>+ → Create skill → Upload a skill</strong>, upload the ZIP, and enable it.</> : <>Create a ChatGPT project and add the downloaded file to its <strong>Sources</strong>. Start a new chat inside that project.</>}</p><a className="rs-use-help" href={platform === "claude" ? "https://support.claude.com/en/articles/12512180-use-skills-in-claude" : "https://learn.chatgpt.com/docs/projects"} target="_blank" rel="noreferrer">{platform === "claude" ? "Claude’s setup guide ↗" : "ChatGPT’s projects guide ↗"}</a>{platform === "claude" && <p className="rs-use-availability">Skills require code execution. Workspace settings may control access.</p>}</div></li>
          <li><span>03</span><div><h4>Attach a page and use the prompt.</h4><p>Start with a page image so the assistant can inspect the layout. Compare the result with the source, especially headers, repeated values, and small marks.</p><a className="rs-use-help" href="/documents/apple-fy2024-q4-page-1.png" download="Apple-FY2024-page-1.png">Download the Apple sample page ↓</a></div></li>
        </ol>
      </div>
      <div className="rs-use-prompt">
        <div className="rs-use-prompt-head"><label htmlFor="dpp-starter-prompt">Your first parsing request</label><button onClick={copyPrompt}>{copyState === "copied" ? "Copied ✓" : "Copy prompt"}</button></div>
        <textarea ref={promptField} id="dpp-starter-prompt" value={prompt} readOnly spellCheck={false} />
        <p className="rs-use-copy-status" role="status">{copyState === "manual" ? "The prompt is selected. Press ⌘C or Ctrl+C to copy it." : copyState === "copied" ? "Ready to paste after attaching your page." : "Attach the page image before sending."}</p>
        <div className="rs-use-result"><span className="rs-kicker">What to look for</span><p>A transcription of the page and structured tables that follow the current protocol. Request a separate conformance review when needed. For the Apple sample, check that both <strong>6,485</strong> cells survive and <strong>(565)</strong> stays as printed.</p><a href="/example">Compare with the annotated page ↗</a></div>
      </div>
    </div>
    <div className="rs-use-resources"><span className="rs-kicker">Inside the download</span><span>Current protocol + checker guidance · Working draft 0.1</span><a href="/downloads/DPP-0.1-SKILL.md" target="_blank" rel="noreferrer">Read SKILL.md ↗</a><a href={downloads.checklist} download>Download QA checklist ↓</a></div>
    <details className="rs-use-notes"><summary>Scope & sources <span>+</span></summary><p>These downloads are generated from the same source revision as the guide. They include the text-only protocol and generator/checker guidance and work without the source repository. The checker is a review skill, not an automated conformance tool. Platform setup instructions checked September 17, 2026.</p></details>
  </section>;
}
