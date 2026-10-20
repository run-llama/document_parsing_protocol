#!/usr/bin/env python3
"""Check every protocol note against the authoring rules in SKILL.md.

    python3 tools/lint_protocol.py                 # whole vault
    python3 tools/lint_protocol.py "09 Tables"     # only notes under these path prefixes

Exit 1 if any error is found. Checks:
  - frontmatter: title; status in rule|either|open; scope in page|document
  - status callout matches the status (✅ Normative / ⚖️ Equivalent forms / ❓ Open point),
    states a requirement keyword (rule/either) or a working default (open)
  - skill blocks: one generate and one check block per rule note; check lines are
    'FAIL (MUST) if' / 'WARN (SHOULD) if'; open rules never FAIL
  - examples: every Sample / Counter-sample heading has an image and an Expected Markdown block
  - no leftovers of the annotation guide: old badges, 'Ground truth extract', annotator workflow,
    second person — outside appendices B and C, code fences, details blocks and skill blocks
  - every [[link]] and ![[embed]] resolves
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import protocol as P  # noqa: E402

EXAMPLE_RE = re.compile(r'^###\s+(✅|❌)\s+\*\*(Sample|Counter-sample)', re.M)
LEFTOVERS = [
    (r'✅ Rule\b', 'old badge "✅ Rule"'),
    (r'No convention yet', 'old badge "No convention yet"'),
    (r'Accepted either way', 'old badge "Accepted either way"'),
    (r'Ground truth extract', '"Ground truth extract" block (convert to Expected Markdown)'),
    (r'\bflag (the|this|that|both|it|each|any)\b', 'annotator workflow: "flag …"'),
    (r'\bannotators?\b', 'annotator workflow: "annotator"'),
    (r'\b[Yy]ou(r|rs|rself)?\b', 'second person'),
]
PROCESS_CHAPTERS = {'B', 'C'}


def prose_only(body):
    """Body with code fences, <details> blocks, skill blocks and HTML comments removed."""
    body = P.strip_skill_blocks(body)
    body = re.sub(r'<details>.*?</details>', '', body, flags=re.S)
    body = re.sub(r'(`{3,}).*?\1', '', body, flags=re.S)
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    body = re.sub(r'`[^`\n]*`', '', body)
    return body


def lint(note, names, images):
    errs = []
    body = note.body
    for t in re.findall(r'(?<!!)\[\[([^\]|#]+)', body):
        if t not in names:
            errs.append(f'unresolved link [[{t}]]')
    for t in re.findall(r'!\[\[([^\]|]+)', body):
        if t not in images:
            errs.append(f'missing image ![[{t}]]')
    if not note.number or note.chapter in PROCESS_CHAPTERS or note.chapter == 'D':
        return errs
    prose = prose_only(body)
    for pat, what in LEFTOVERS:
        for m in re.finditer(pat, prose):
            line = prose[:m.start()].count('\n') + 1
            errs.append(f'{what} (prose line ~{line}: "{prose[max(0, m.start()-30):m.end()+20].strip()}")')
            break
    if not note.status:
        return errs
    if note.status not in P.STATUS_CALLOUT:
        errs.append(f'status: {note.status!r} is not rule|either|open')
        return errs
    if note.scope not in ('page', 'document'):
        errs.append(f'scope: {note.scope!r} is not page|document')
    kind, label = P.STATUS_CALLOUT[note.status]
    c = note.callout()
    if not c or c[0] != kind or not c[1].startswith(label):
        errs.append(f'first callout must be "> [!{kind}] {label}"')
    else:
        text = ' '.join(c[2])
        if note.status == 'open':
            if 'Working default' not in text:
                errs.append('open-point callout must state a **Working default**')
        elif not re.search(r'\b(MUST|SHOULD|MAY)\b', text):
            errs.append('status callout states no MUST / SHOULD / MAY requirement')
    sk = note.skills()
    for k in ('generate', 'check'):
        if not sk.get(k):
            errs.append(f'missing <!-- skill:{k} --> block')
    for line in sk.get('check', '').split('\n'):
        line = line.strip()
        if line and not re.match(r'^- (FAIL \(MUST\)|WARN \(SHOULD\)) ', line):
            errs.append(f'skill:check line must start "- FAIL (MUST) " or "- WARN (SHOULD) ": {line[:60]}')
        if note.status == 'open' and line.startswith('- FAIL'):
            errs.append('open point: skill:check must use WARN only')
    for line in sk.get('generate', '').split('\n'):
        if re.search(r'\[\[|§\d', line):
            errs.append('skill:generate must be self-contained (no [[links]] or section numbers)')
            break
    heads = list(EXAMPLE_RE.finditer(body))
    for i, h in enumerate(heads):
        end = len(body)
        nxt = re.search(r'^#{2,3}\s', body[h.end():], re.M)
        if nxt:
            end = h.end() + nxt.start()
        chunk = body[h.start():end]
        title = body[h.start():body.find('\n', h.start())].strip()
        if '![[' not in chunk:
            errs.append(f'example without an image: {title[:70]}')
        if not re.search(r'<summary>Expected Markdown', chunk):
            errs.append(f'example without an Expected Markdown block: {title[:70]}')
    return errs


def main(prefixes):
    notes = P.load(include_repo_docs=False)
    metadata = P.metadata_errors(notes)
    for error in metadata:
        print(error)
    names = {n.base for n in notes}
    images = set()
    for root, _, files in os.walk(os.path.join(P.VAULT, '_attachments')):
        images |= set(files)
    total, bad = 0, 0
    for n in notes:
        if prefixes and not any(n.rel.startswith(p) for p in prefixes):
            continue
        total += 1
        errs = lint(n, names, images)
        if errs:
            bad += 1
            print(f'\n{P.label(n)}  ({n.rel})')
            for e in errs:
                print('  -', e)
    print(f'\n{total} notes checked, {bad} with errors')
    return 1 if bad or metadata else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
