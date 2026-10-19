#!/usr/bin/env python3
"""Build the offline DPP skill ZIP and single-file chat reference from maintained text."""
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'resources/dpp-parse'
OUTPUT = ROOT / 'public/downloads'
OUTPUT.mkdir(parents=True, exist_ok=True)
files = sorted(SOURCE.rglob('*.md'))
assert (SOURCE / 'SKILL.md') in files
with zipfile.ZipFile(OUTPUT / 'dpp-parse-0.1.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in files:
        entry = zipfile.ZipInfo('dpp-parse/' + path.relative_to(SOURCE).as_posix(), (2026, 9, 17, 0, 0, 0))
        entry.compress_type = zipfile.ZIP_DEFLATED
        entry.external_attr = 0o644 << 16
        archive.writestr(entry, path.read_bytes())
reference = (SOURCE / 'references/conventions.md').read_text()
checklist = (SOURCE / 'references/qa-checklist.md').read_text()
(OUTPUT / 'DPP-0.1-starter-reference.md').write_text(reference + '\n\n---\n\n' + checklist)
(OUTPUT / 'DPP-0.1-QA-checklist.md').write_text(checklist)
(OUTPUT / 'DPP-0.1-SKILL.md').write_text((SOURCE / 'SKILL.md').read_text())
print('Built skill ZIP, starter reference, QA checklist, and skill preview.')
