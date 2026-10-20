"""Shared model of the protocol vault: notes, section numbers, callouts and skill blocks.

Every generator (site, RFC, skills) and the linter read the vault through `load()`, so the
numbering and the parsing live in one place.

Numbering. A top-level folder is a chapter; its name starts with the chapter number
(`09 Tables`) or an appendix letter (`A Equivalent forms`). Inside any folder, the direct notes
come first, ordered by frontmatter `order:` then title, followed by the sub-folders in name order
(`1 - What counts as a table`, `2 - Boundaries`, ...). Children are numbered by position, so a
folder prefix only sets the order: `09 Tables/2 - Boundaries/Cross-Page Tables.md` is §9.2.k.
Notes at the vault root (the home page) and repo docs are not numbered.
"""
import os
import re
from dataclasses import dataclass, field

VAULT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {'.obsidian', '.git', 'tools', 'site', 'legacy', '_attachments', '.claude'}
REPO_DOCS = {'SKILL.md', 'AGENTS.md', 'README.md'}
INTERNAL_CHAPTERS = {'B'}          # never shipped in the public build
CHAPTER_RE = re.compile(r'^(\d+|[A-Z])\s+(.+)$')
SUB_RE = re.compile(r'^(\d+)\s*-\s*(.+)$')
SKILL_RE = re.compile(r'<!--\s*skill:(generate|check)\s*\n(.*?)\n\s*-->', re.S)
CALLOUT_RE = re.compile(r'^>\s*\[!(\w+)\][+-]?\s*(.*)$')

STATUS_CALLOUT = {'rule': ('success', '✅ Normative'),
                  'either': ('info', '⚖️ Equivalent forms'),
                  'open': ('warning', '❓ Open point')}


def frontmatter(text):
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).split('\n'):
        if ':' in line and not line.startswith(' '):
            k, v = line.split(':', 1)
            meta[k.strip()] = re.sub(r'\s+#.*$', '', v.strip()).strip('"')
    return meta, text[m.end():]


@dataclass
class Note:
    rel: str                      # path relative to the vault
    base: str                     # basename without .md: the wikilink key
    meta: dict
    body: str                     # markdown after the frontmatter
    number: str = ''              # "9.2.3", "A.1", '' for unnumbered
    chapter: str = ''             # "9", "A", '' for root notes
    chapter_title: str = ''
    section_titles: list = field(default_factory=list)   # enclosing sub-section titles

    @property
    def title(self):
        return self.meta.get('title', self.base)

    @property
    def rule_id(self):
        return self.meta.get('rule_id', '')

    @property
    def tags(self):
        return [tag.strip() for tag in self.meta.get('tags', '').strip('[]').split(',') if tag.strip()]

    @property
    def status(self):
        return self.meta.get('status', '')

    @property
    def scope(self):
        return self.meta.get('scope', '')

    @property
    def internal(self):
        return self.chapter in INTERNAL_CHAPTERS or self.rel in REPO_DOCS

    def skills(self):
        """{'generate': text, 'check': text} from the note's skill blocks."""
        out = {}
        for kind, text in SKILL_RE.findall(self.body):
            out[kind] = (out.get(kind, '') + '\n' + text.strip()).strip()
        return out

    def callout(self):
        """(kind, title, body-lines) of the first callout, or None."""
        lines = self.body.split('\n')
        for i, line in enumerate(lines):
            m = CALLOUT_RE.match(line)
            if m:
                body = []
                for nxt in lines[i + 1:]:
                    if not nxt.startswith('>'):
                        break
                    body.append(re.sub(r'^>\s?', '', nxt))
                return m.group(1).lower(), m.group(2).strip(), body
        return None

    def summary(self):
        """The requirement in the status callout, as one line of markdown."""
        c = self.callout()
        return ' '.join(l.strip() for l in c[2]).strip() if c else ''


def _sort_key(note):
    try:
        order = float(note.meta.get('order', ''))
    except ValueError:
        order = 1e9
    return (order, note.title.lower())


def load(include_repo_docs=False):
    """All notes, numbered, in reading order (root notes first)."""
    notes = []

    def walk(dirpath, number, chapter, chapter_title, section_titles):
        entries = sorted(os.listdir(dirpath))
        files = [e for e in entries if e.endswith('.md') and os.path.isfile(os.path.join(dirpath, e))]
        dirs = [e for e in entries if os.path.isdir(os.path.join(dirpath, e)) and e not in SKIP_DIRS
                and not e.startswith('.')]
        direct = []
        for f in files:
            rel = os.path.relpath(os.path.join(dirpath, f), VAULT)
            meta, body = frontmatter(open(os.path.join(dirpath, f), encoding='utf-8').read())
            direct.append(Note(rel, f[:-3], meta, body, chapter=chapter,
                               chapter_title=chapter_title, section_titles=list(section_titles)))
        direct.sort(key=_sort_key)
        k = 0
        for n in direct:
            k += 1
            n.number = f'{number}.{k}' if number else ''
            notes.append(n)
        subs = sorted((d for d in dirs if SUB_RE.match(d)), key=lambda d: int(SUB_RE.match(d).group(1)))
        for d in subs:
            k += 1
            walk(os.path.join(dirpath, d), f'{number}.{k}', chapter, chapter_title,
                 section_titles + [SUB_RE.match(d).group(2)])

    root_entries = sorted(os.listdir(VAULT))
    for f in root_entries:
        if f.endswith('.md') and (include_repo_docs or f not in REPO_DOCS):
            meta, body = frontmatter(open(os.path.join(VAULT, f), encoding='utf-8').read())
            notes.append(Note(f, f[:-3], meta, body))
    chapters = [d for d in root_entries if os.path.isdir(os.path.join(VAULT, d))
                and d not in SKIP_DIRS and CHAPTER_RE.match(d)]
    # numbered chapters in numeric order, then appendices in letter order
    chapters.sort(key=lambda d: (not CHAPTER_RE.match(d).group(1).isdigit(),
                                 int(CHAPTER_RE.match(d).group(1)) if CHAPTER_RE.match(d).group(1).isdigit() else 0,
                                 CHAPTER_RE.match(d).group(1)))
    for d in chapters:
        num, title = CHAPTER_RE.match(d).groups()
        num = str(int(num)) if num.isdigit() else num
        walk(os.path.join(VAULT, d), num, num, title, [])
    return notes


def chapters(notes):
    """[(chapter, title)] in order."""
    seen, out = set(), []
    for n in notes:
        if n.chapter and n.chapter not in seen:
            seen.add(n.chapter)
            out.append((n.chapter, n.chapter_title))
    return out


def by_base(notes):
    return {n.base: n for n in notes}


def strip_skill_blocks(md):
    return SKILL_RE.sub('', md)


def label(note):
    """'§9.2.3 Cross-Page Tables' or the bare title."""
    return f'§{note.number} {note.title}' if note.number else note.title


def metadata_errors(notes):
    """Check stored rule identifiers and the existing inline tag vocabulary."""
    errors, owners = [], {}
    slug = r'[a-z0-9]+(?:-[a-z0-9]+)*'
    for note in notes:
        if not note.status:
            continue
        if not re.fullmatch(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)+', note.rule_id):
            errors.append(f'{note.rel}: rule_id must be a lowercase family-name slug')
        if note.rule_id in owners:
            errors.append(f'{note.rel}: duplicate rule_id {note.rule_id!r} (also {owners[note.rule_id]})')
        owners[note.rule_id] = note.rel
        if not re.fullmatch(r'\[\s*' + slug + r'(?:\s*,\s*' + slug + r')*\s*\]', note.meta.get('tags', '')):
            errors.append(f'{note.rel}: tags must be a non-empty inline list of lowercase slugs')
        if len(note.tags) != len(set(note.tags)):
            errors.append(f'{note.rel}: duplicate tags')
    return errors


def validate_metadata(notes):
    errors = metadata_errors(notes)
    if errors:
        raise ValueError('Invalid guideline metadata:\n' + '\n'.join(errors))


def revision():
    """Content identity, independent of Git history and generated build output."""
    import hashlib
    from pathlib import Path
    digest = hashlib.sha256()
    root = Path(VAULT)
    for path in sorted(root.rglob('*')):
        rel = path.relative_to(root)
        if not path.is_file() or any(part in {'site', '__pycache__', '.DS_Store'} for part in rel.parts):
            continue
        digest.update(rel.as_posix().encode() + b'\0')
        digest.update(path.read_bytes())
    return digest.hexdigest()
