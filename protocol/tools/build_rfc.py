#!/usr/bin/env python3
"""Assemble the whole protocol into one long, numbered document.

    python3 tools/build_rfc.py [--out site] [--public]

Writes two files into --out:
  rfc.html  every rule in section order, with its examples, cross-links as in-page anchors
  rfc.md    the same text as a single Markdown file (images linked from assets/, skill blocks
            and Obsidian syntax removed) for readers and models that want plain text

Normally called by tools/build_site.py, which passes the notes and the copied image map.
"""
import argparse
import html
import os
import re
import subprocess
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import protocol as P  # noqa: E402

TITLE = 'Document Representation Protocol'
STATUS_LINE = {'rule': '✅ Normative', 'either': '⚖️ Equivalent forms', 'open': '❓ Open point'}


def anchor(n):
    return 's' + n.number.replace('.', '-')


def version():
    return "source " + P.revision()[:12]


def front_matter(notes):
    open_n = sum(1 for n in notes if n.status == 'open')
    rules = sum(1 for n in notes if n.status)
    return (f'Working title · draft of {version()} · {rules} rules, of which {open_n} are open points '
            f'that are settled before publication.')


def build_html(out, notes, asset_map):
    import render_md as R  # needs mistune
    by = P.by_base(notes)

    def link(target, label):
        n = by.get(target)
        text = label or target
        if not n:
            return text
        if not n.number:
            return text
        return f'[{text}](#{anchor(n)})<span class="sec">§{n.number}</span>'

    credits = R.credits_map()
    parts = [f'<h1 class="rfc-title">{TITLE}</h1><p class="rfc-meta">{html.escape(front_matter(notes))}</p>']
    home = next((n for n in notes if not n.number), None)
    if home:
        intro = R.render_note(home, link, asset_map, credits, heading='About this document', shift=1)
        parts.append(intro.replace('<!-- toc -->', ''))
    # table of contents
    toc = ['<h2 id="contents">Contents</h2><ol class="rfc-toc">']
    for ch, title in P.chapters(notes):
        toc.append(f'<li><a href="#c{ch}">§{ch} {html.escape(title)}</a><ol>')
        for n in notes:
            if n.chapter == ch:
                toc.append(f'<li><a href="#{anchor(n)}">{n.number} {html.escape(n.title)}</a></li>')
        toc.append('</ol></li>')
    toc.append('</ol>')
    parts.append('\n'.join(toc))
    import build_site  # for the generated quick reference
    for ch, title in P.chapters(notes):
        parts.append(f'<h2 id="c{ch}" class="rfc-ch">§{ch} {html.escape(title)}</h2>')
        current_sub = None
        for n in [m for m in notes if m.chapter == ch]:
            sub = n.section_titles[0] if n.section_titles else None
            if sub and sub != current_sub:
                subnum = '.'.join(n.number.split('.')[:2])
                parts.append(f'<h3 class="rfc-sub">{subnum} {html.escape(sub)}</h3>')
            current_sub = sub
            depth = 4 if sub else 3
            heading = f'{n.number} {n.title}'
            body = R.render_note(n, link, asset_map, credits, heading=heading, shift=depth - 1)
            body = re.sub(r'<h(\d)>', lambda m: f'<h{m.group(1)} id="{anchor(n)}">', body, count=1)
            if n.status:
                chip = f'<p class="scope">{STATUS_LINE[n.status]} · {"📚 document" if n.scope == "document" else "📄 page"} rule</p>'
                body = re.sub(r'(</h\d>)', r'\1' + chip.replace('\\', '\\\\'), body, count=1)
            body = body.replace('<!-- quickref -->',
                                build_site.quick_reference(notes, lambda x: '#' + anchor(x)))
            parts.append(f'<section class="rule">{body}</section>')
    page = RFC_SHELL.format(title=TITLE, body='\n'.join(parts))
    open(os.path.join(out, 'rfc.html'), 'w', encoding='utf-8').write(page)


def md_body(n, by):
    """A note's body as plain Markdown: Obsidian syntax resolved, headings demoted."""
    body = P.strip_skill_blocks(n.body)
    body = re.sub(r'!\[\[([^\]|]+)(\|[^\]]+)?\]\]', lambda m: f'![{m.group(1)}](assets/{m.group(1)})', body)

    def wl(m):
        t = by.get(m.group(1))
        text = m.group(2)[1:] if m.group(2) else m.group(1)
        return f'{text} (§{t.number})' if t and t.number else text
    body = re.sub(r'\[\[([^\]|#]+)(?:#[^\]|]*)?(\|[^\]]+)?\]\]', wl, body)
    body = re.sub(r'^>\s*\[!\w+\][+-]?\s*(.*)$', r'> **\1**', body, flags=re.M)
    body = re.sub(r'^# .*\n', '', body, count=1, flags=re.M)
    # demote remaining headings by two levels, outside code fences
    out, fence = [], None
    for line in body.split('\n'):
        f = re.match(r'^(`{3,})', line)
        if f:
            fence = None if fence and line.startswith(fence) else (fence or f.group(1))
        if not fence and re.match(r'^#{1,4} ', line):
            line = '##' + line
        out.append(line)
    return '\n'.join(out).strip()


def build_md(out, notes):
    by = P.by_base(notes)
    lines = [f'# {TITLE}', '', f'*{front_matter(notes)}*', '', '## Contents', '']
    for ch, title in P.chapters(notes):
        lines.append(f'- §{ch} {title}')
        for n in notes:
            if n.chapter == ch:
                lines.append(f'  - {n.number} {n.title}')
    for ch, title in P.chapters(notes):
        lines += ['', f'## §{ch} {title}']
        current_sub = None
        for n in [m for m in notes if m.chapter == ch]:
            sub = n.section_titles[0] if n.section_titles else None
            if sub and sub != current_sub:
                lines += ['', f'### {".".join(n.number.split(".")[:2])} {sub}']
            current_sub = sub
            lines += ['', f'{"####" if sub else "###"} {n.number} {n.title}', '']
            if n.status:
                lines += [f'*{STATUS_LINE[n.status]} · {n.scope} rule*',
                          f'Rule ID: `{n.rule_id}` · Tags: {", ".join(n.tags)}', '']
            body = md_body(n, by)
            if '<!-- quickref -->' in body:
                body = body.replace('<!-- quickref -->', '\n'.join(
                    f'- **{m.number} {m.title}** — {m.summary()}' for m in notes if m.status))
            lines.append(body)
    open(os.path.join(out, 'rfc.md'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')


def build(out, public=False, notes=None, asset_map=None):
    if notes is None:
        notes = P.load()
        if public:
            notes = [n for n in notes if not n.internal]
    P.validate_metadata(notes)
    if asset_map is None:
        asset_map = {}
        for root, _, files in os.walk(os.path.join(P.VAULT, '_attachments')):
            for f in files:
                asset_map[f] = 'assets/' + f
    os.makedirs(out, exist_ok=True)
    build_html(out, notes, asset_map)
    build_md(out, notes)
    print(f'RFC: {sum(1 for n in notes if n.number)} sections -> {out}/rfc.html, rfc.md')


RFC_SHELL = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><link rel="stylesheet" href="style.css">
<style>
body{{display:block}} main{{max-width:980px;margin:0 auto;padding:40px 24px}}
.rfc-title{{font-size:34px}} .rfc-meta{{color:var(--mut)}}
.rfc-ch{{font-size:26px;margin-top:64px;border-bottom:2px solid var(--fg)}}
.rfc-sub{{font-size:20px;margin-top:40px;color:var(--mut)}}
section.rule{{margin:0 0 28px}}
ol.rfc-toc,ol.rfc-toc ol{{list-style:none;padding-left:16px;font-size:14.5px}}
ol.rfc-toc>li{{margin:6px 0;font-weight:600}} ol.rfc-toc ol li{{font-weight:400}}
@media print{{figure.exp .exp-src{{display:none}} a{{color:inherit}}}}
</style></head>
<body><main><p><a href="index.html">← Website</a> · <a href="rfc.md">Markdown version</a></p>
{body}
</main></body></html>"""


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default='site')
    ap.add_argument('--public', action='store_true')
    a = ap.parse_args()
    out = a.out if os.path.isabs(a.out) else os.path.join(P.VAULT, a.out)
    build(out, a.public)
