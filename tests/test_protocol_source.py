"""Exercise source-to-download propagation without Git or an external checkout."""
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class LocalProtocolBuildTests(unittest.TestCase):
    def test_local_rule_edit_reaches_rfc_convention_and_skills_without_external_checkout(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for directory in ('protocol', 'resources', 'app/data', 'public/documents/conventions'):
                shutil.copytree(ROOT / directory, root / directory,
                                ignore=shutil.ignore_patterns('site', '__pycache__'))
            (root / 'scripts').mkdir()
            for script in (ROOT / 'scripts').glob('*.py'):
                shutil.copy2(script, root / 'scripts' / script.name)
            marker = 'Local source propagation sentinel.'
            note = root / 'protocol/02 Principles/Never Drop, Never Invent.md'
            text = note.read_text()
            note.write_text(text.replace('<!-- skill:generate\n',
                marker + '\n\n<!-- skill:generate\n- ' + marker + '\n'))
            result = subprocess.run([sys.executable, str(root / 'scripts/sync-protocol.py')],
                                    cwd=root, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            for relative in ('public/protocol/rfc.md', 'resources/dpp-parse/SKILL.md',
                             'public/downloads/DPP-0.1-starter-reference.md',
                             'resources/convention-library/content/02-principles-never-drop-never-invent.json'):
                self.assertIn(marker, (root / relative).read_text(), relative)
            snapshot = json.loads((root / 'app/data/protocol-snapshot.json').read_text())
            self.assertNotEqual(snapshot['sourceRevision'],
                json.loads((ROOT / 'app/data/protocol-snapshot.json').read_text())['sourceRevision'])
            before = {p.relative_to(root): p.read_bytes()
                      for directory in ('public', 'app/data', 'resources')
                      for p in (root / directory).rglob('*') if p.is_file()}
            subprocess.run([sys.executable, str(root / 'scripts/sync-protocol.py')],
                           cwd=root, check=True, stdout=subprocess.DEVNULL)
            self.assertTrue(all((root / path).read_bytes() == data for path, data in before.items()),
                            'Rebuilding identical sources changed generated artifacts')


if __name__ == '__main__':
    unittest.main()
