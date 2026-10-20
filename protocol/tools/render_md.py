"""Render one protocol note's markdown body to HTML — shared by the site and the RFC page.

Handles the vault's dialect: ![[image]] embeds, [[wikilinks]], Obsidian callouts, Expected
Markdown / Non-conforming output example blocks, and the skill:generate / skill:check blocks.
"""
import html
import json
import os
import re

import mistune

import protocol as P

CALLOUT = {
    'note': '#5b8def', 'info': '#5b8def', 'tip': '#31a06a', 'success': '#31a06a',
    'warning': '#d99a00', 'caution': '#d99a00', 'danger': '#d1495b', 'failure': '#d1495b',
    'error': '#d1495b', 'example': '#8a63d2', 'abstract': '#5b8def', 'quote': '#7a7a7a',
}
EXAMPLE_RE = re.compile(
    r'<details>\s*<summary>((?:Expected Markdown|Non-conforming output)[^<]*)</summary>\s*'
    r'(`{3,})markdown\n(.*?)\n\2\s*</details>', re.S)
ELISION_RE = re.compile(r'^\s*<!--\s*(?:…|\.\.\.)\s*-->\s*$', re.M)

MD = mistune.create_markdown(plugins=['table', 'strikethrough', 'url'], escape=False)


def credits_map():
    out = {}
    manifest = os.path.join(P.VAULT, 'tools', 'provenance', 'manifest.json')
    if os.path.exists(manifest):
        for e in json.load(open(manifest, encoding='utf-8')):
            if e.get('decision') == 'keep_attrib' and e.get('attribution'):
                out[e['file']] = e['attribution']
    return out


def render_callouts(md):
    """> [!type] Title + following '>' lines -> a div mistune passes through."""
    out, lines, i = [], md.split('\n'), 0
    while i < len(lines):
        m = re.match(r'^>\s*\[!(\w+)\]([+-]?)\s*(.*)$', lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        kind, title = m.group(1).lower(), m.group(3).strip()
        colour = CALLOUT.get(kind, '#7a7a7a')
        body, i = [], i + 1
        while i < len(lines) and lines[i].startswith('>'):
            body.append(re.sub(r'^>\s?', '', lines[i])); i += 1
        inner = MD('\n'.join(body)) if body else ''
        out.append(f'<div class="co" style="--co:{colour}"><p class="co-t">{html.escape(title or kind.title())}'
                   f'</p>{inner}</div>')
        out.append('')
    return '\n'.join(out)


def _show_elisions(code):
    """Make '<!-- … -->' visible: a row inside a table, a paragraph elsewhere."""
    out, depth = [], 0
    for line in code.split('\n'):
        if ELISION_RE.match(line):
            out.append('<tr class="el"><td colspan="99">…</td></tr>' if depth > 0
                       else '\n<p class="el">…</p>\n')
            continue
        depth += len(re.findall(r'<table\b', line)) - len(re.findall(r'</table>', line))
        out.append(line)
    return '\n'.join(out)


def render_examples(md):
    """Expected Markdown blocks -> the rendering a reader would see, with the source one click away."""
    def one(m):
        title, code = m.group(1).strip(), m.group(3)
        bad = title.startswith('Non-conforming')
        shown = MD(_show_elisions(code))
        return (f'<figure class="exp{" bad" if bad else ""}">'
                f'<figcaption>{html.escape(title)}</figcaption>'
                f'<div class="exp-wrap">{shown}</div>'
                f'<details class="exp-src"><summary>Markdown source</summary>'
                f'<pre><code>{html.escape(code)}</code></pre></details></figure>')
    return EXAMPLE_RE.sub(one, md)


def render_skills(note):
    sk = note.skills()
    if not sk:
        return ''
    parts = []
    for kind, label in (('generate', 'Generator skill'), ('check', 'Checker skill')):
        if sk.get(kind):
            parts.append(f'<h4>{label}</h4><pre><code>{html.escape(sk[kind])}</code></pre>')
    return (f'<details class="skills"><summary>Skill text for this rule</summary>{"".join(parts)}</details>')


def render_note(note, link, asset_map, credits, show_skills=False, heading=None, shift=0):
    """HTML for one note.

    link(target, label) -> markdown link text for a [[wikilink]].
    heading: replacement text for the note's H1 (e.g. with its section number).
    shift: demote every heading by this many levels (the RFC nests notes under chapters).
    """
    body = P.strip_skill_blocks(note.body)

    def embed(m):
        n = m.group(1).split('|')[0]
        src = asset_map.get(n)
        if not src:
            return f'<em>missing image: {html.escape(n)}</em>'
        img = f'<a href="{src}" target="_blank"><img src="{src}" alt="{html.escape(n)}" loading="lazy"></a>'
        if n in credits:
            img += f'<br><small class="credit">Source: {html.escape(credits[n])} (public domain)</small>'
        return img
    body = re.sub(r'!\[\[([^\]]+)\]\]', embed, body)
    body = re.sub(r'\[\[([^\]|#]+)(?:#[^\]|]*)?(\|[^\]]+)?\]\]',
                  lambda m: link(m.group(1), m.group(2)[1:] if m.group(2) else None), body)
    if heading is not None:
        body = re.sub(r'^# .*$', '# ' + heading.replace('\\', '\\\\'), body, count=1, flags=re.M)
    out = MD(render_examples(render_callouts(body)))
    if shift:
        def demote(m):
            lvl = min(6, int(m.group(2)) + shift)
            return f'<{m.group(1)}h{lvl}'
        out = re.sub(r'<(/?)h([1-6])', demote, out)
    if note.rule_id:
        metadata = (f'<p class="rule-meta"><code id="{html.escape(note.rule_id)}">'
                    f'{html.escape(note.rule_id)}</code> · '
                    + ' '.join(f'<span class="rule-tag">{html.escape(tag)}</span>' for tag in note.tags)
                    + '</p>')
        out = re.sub(r'(</h[1-6]>)', lambda m: m.group(1) + metadata, out, count=1)
    if show_skills:
        out += render_skills(note)
    return out
