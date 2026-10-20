#!/usr/bin/env python3
"""Build or refresh the image provenance manifest for publication review.

    python3 tools/provenance/build_manifest.py            # write manifest.json
    python3 tools/provenance/build_manifest.py --check    # exit 1 if any embedded
                                                          # image is not cleared

Every image under _attachments/ gets one entry keyed by filename. The script owns
the mechanical fields (family, where the image is embedded, the captions next to
it); the review fields (source, source_kind, pii, decision, ...) are filled by a
person or an agent and are preserved across refreshes.

Decisions:
  keep          -- redistributable as is (constructed, or cleared licence)
  keep_attrib   -- redistributable with the attribution in `attribution`
  regenerate    -- replace with a synthetic page that shows the same situation
  verify        -- licence plausible but unconfirmed; resolve before publishing
  drop          -- remove the example
Only keep and keep_attrib pass --check.
"""
import argparse
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
VAULT = os.path.dirname(os.path.dirname(HERE))
ATTACH = os.path.join(VAULT, '_attachments')
MANIFEST = os.path.join(HERE, 'manifest.json')
SKIP_DIRS = {'.obsidian', '.git', 'tools', 'site', 'legacy', '.claude'}
IMAGE_EXT = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')
EMBED_RE = re.compile(r'!\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]')
CODE_SPAN_RE = re.compile(r'`[^`]*`')
REVIEW_FIELDS = ('source', 'source_kind', 'pii', 'brand', 'decision',
                 'attribution', 'regen_brief', 'review_notes')
PASSING = {'keep', 'keep_attrib'}


def family(name):
    return re.split(r'[-_.]', name, maxsplit=1)[0]


def caption_after(lines, i):
    """The first prose paragraph after the embed on line i."""
    para = []
    for line in lines[i + 1:]:
        s = line.strip()
        if not s:
            if para:
                break
            continue
        if s.startswith(('#', '![[', '<details', '```', '|')):
            break
        para.append(s)
    text = ' '.join(para)
    return text[:400] + ('…' if len(text) > 400 else '')


def scan_embeds():
    uses = {}
    for root, dirs, files in os.walk(VAULT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if not f.endswith('.md'):
                continue
            rel = os.path.relpath(os.path.join(root, f), VAULT)
            with open(os.path.join(root, f), encoding='utf-8') as fh:
                lines = fh.read().split('\n')
            for i, line in enumerate(lines):
                for m in EMBED_RE.finditer(CODE_SPAN_RE.sub('', line)):
                    target = os.path.basename(m.group(1).strip())
                    if target.lower().endswith(IMAGE_EXT):
                        uses.setdefault(target, []).append(
                            {'note': rel, 'line': i + 1, 'caption': caption_after(lines, i)})
    return uses


def build():
    old = {}
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding='utf-8') as fh:
            old = {e['file']: e for e in json.load(fh)}
    uses = scan_embeds()
    entries = []
    for root, _, files in os.walk(ATTACH):
        for f in sorted(files):
            if not f.lower().endswith(IMAGE_EXT):
                continue
            prev = old.get(f, {})
            entry = {
                'file': f,
                'path': os.path.relpath(os.path.join(root, f), VAULT),
                'family': family(f),
                'used_in': uses.get(f, []),
            }
            for k in REVIEW_FIELDS:
                entry[k] = prev.get(k)
            entries.append(entry)
    entries.sort(key=lambda e: e['path'])
    missing = sorted(set(uses) - {e['file'] for e in entries})
    return entries, missing


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--check', action='store_true')
    args = ap.parse_args()
    entries, missing = build()
    if missing:
        print('embedded but not found:', ', '.join(missing), file=sys.stderr)
    if args.check:
        bad = [e for e in entries if e['used_in'] and e['decision'] not in PASSING]
        for e in bad:
            print(f"{e['decision'] or 'unreviewed':12} {e['path']}", file=sys.stderr)
        print(f'{len(bad)} embedded image(s) not cleared for publication', file=sys.stderr)
        return 1 if bad or missing else 0
    with open(MANIFEST, 'w', encoding='utf-8') as fh:
        json.dump(entries, fh, indent=1, ensure_ascii=False)
        fh.write('\n')
    counts = {}
    for e in entries:
        counts[e['decision'] or 'unreviewed'] = counts.get(e['decision'] or 'unreviewed', 0) + 1
    print(f'{len(entries)} images, {sum(1 for e in entries if not e["used_in"])} unused;', counts)
    return 0


if __name__ == '__main__':
    sys.exit(main())
