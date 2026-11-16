import html
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'protocol/tools'))
import render_md


class EmbeddedPageRenderingTests(unittest.TestCase):
    def test_sub_page_wrapper_does_not_print_as_text_or_drop_nested_content(self) -> None:
        """Mistune prints underscore-containing tags as words unless wrappers are projected out."""
        source = '<sub_page>\n\n**Court record**\n\n<sub_page>\n\nAmount: 120\n\n</sub_page>\n\nFooter text\n\n</sub_page>'
        rendered = render_md.render_examples(
            '<details><summary>Expected Markdown</summary>\n\n```markdown\n' + source + '\n```\n</details>'
        )
        visible = rendered.split('<details class="exp-src">')[0]
        self.assertIn('<strong>Court record</strong>', visible)
        self.assertIn('Amount: 120', visible)
        self.assertIn('Footer text', visible)
        self.assertNotIn('sub_page', visible)
        self.assertIn(html.escape(source), rendered)
