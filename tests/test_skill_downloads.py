"""Generated downloads must not omit or lag behind their maintained instructions."""
from pathlib import Path
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class SkillDownloadTests(unittest.TestCase):
    def test_chat_reference_and_claude_zip_include_every_current_skill_document(self):
        source = ROOT / 'resources/dpp-parse'
        downloads = ROOT / 'public/downloads'
        chat = (downloads / 'DPP-0.1-starter-reference.md').read_text()
        with zipfile.ZipFile(downloads / 'dpp-parse-0.1.zip') as archive:
            for document in source.rglob('*.md'):
                with self.subTest(document=document.relative_to(source)):
                    self.assertIn(document.read_text(), chat)
                    self.assertEqual(
                        archive.read('dpp-parse/' + document.relative_to(source).as_posix()),
                        document.read_bytes(),
                    )


if __name__ == '__main__':
    unittest.main()
