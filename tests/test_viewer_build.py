import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('builder', Path(__file__).resolve().parents[1] / 'scripts/build_viewer.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class ViewerBuildTests(unittest.TestCase):
    def test_discovery_orders_materials_and_excludes_answers(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            folder = root / '0478 P1' / 'A lesson with spaces & symbols'
            folder.mkdir(parents=True)
            for name in ['Deck.pptx', 'Topic_Worksheet.docx', 'Topic_Student_Booklet.docx',
                         'Topic_Answer_Key.docx', 'Teacher Answer Key.pdf', 'Worksheet_Answer_Key.docx', '~$temporary.docx', 'notes.txt']:
                (folder / name).touch()
            other = root / 'skills' / 'examples'
            other.mkdir(parents=True)
            (other / 'not_a_lesson.pptx').touch()
            found = builder.discover(root)
            self.assertEqual(len(found), 1)
            self.assertEqual([d['label'] for d in found[0]['documents']], ['Slides', 'Student booklet', 'Worksheet'])
            self.assertEqual(len(builder.discover(root, True)[0]['documents']), 6)
            self.assertEqual(found[0]['id'], builder.discover(root)[0]['id'])
            self.assertEqual(found[0]['syllabus'], '0478')

    def test_pdf_only_build_publishes_relative_links_and_never_answer_keys(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'repo'
            folder = root / '9618 P4' / 'Stacks'
            folder.mkdir(parents=True)
            (folder / 'Worksheet.pdf').write_bytes(b'%PDF-1.4\nstudent')
            (folder / 'Stacks_Answer_Key.pdf').write_bytes(b'%PDF-1.4\nteacher')
            out = Path(temporary) / 'site'
            builder.build(root, out, 'missing-soffice')
            catalogue = json.loads((out / 'catalog.json').read_text())
            docs = catalogue['lessons'][0]['documents']
            self.assertEqual(len(docs), 1)
            self.assertEqual((out / docs[0]['pdf']).read_bytes(), b'%PDF-1.4\nstudent')
            self.assertFalse(Path(docs[0]['original']).is_absolute())
            self.assertEqual(len(list((out / 'materials').rglob('*.pdf'))), 1)
            self.assertTrue((out / 'index.html').exists())
            builder.build(root, out, 'missing-soffice')
            (folder / 'Worksheet.pdf').write_bytes(b'broken PDF')
            with self.assertRaisesRegex(RuntimeError, 'Invalid PDF'):
                builder.build(root, out, 'missing-soffice')
            self.assertEqual((out / docs[0]['pdf']).read_bytes(), b'%PDF-1.4\nstudent')

    def test_refuses_to_overwrite_source_or_unrelated_directory(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'repo'
            folder = root / '9618 P1' / 'Networks'
            folder.mkdir(parents=True)
            (folder / 'Worksheet.pdf').write_bytes(b'%PDF-1.4\n')
            for out in [root, root.parent, root / 'viewer', folder]:
                with self.assertRaises(ValueError):
                    builder.build(root, out, 'missing-soffice')
            self.assertTrue((folder / 'Worksheet.pdf').exists())


if __name__ == '__main__':
    unittest.main()
