import importlib.util
import hashlib
import json
from pathlib import Path
import tempfile
from unittest.mock import patch
import subprocess
import unittest

spec = importlib.util.spec_from_file_location('builder', Path(__file__).resolve().parents[1] / 'scripts/build_viewer.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class ViewerBuildTests(unittest.TestCase):
    def test_topic_metadata_preserves_links_and_validates_syllabus_references(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            folder = root / '0478 P1' / 'Encryption'
            folder.mkdir(parents=True)
            (folder / 'Slides.pptx').touch()
            original = builder.discover(root)[0]
            (folder / 'lesson.json').write_text(json.dumps({'chapter': 2, 'sections': ['2.3']}))
            grouped = builder.discover(root)[0]
            self.assertEqual(grouped['id'], original['id'])
            self.assertEqual(grouped['documents'][0]['id'], original['documents'][0]['id'])
            self.assertEqual(grouped['topic'], 'Data transmission')
            self.assertEqual(grouped['topicId'], '0478:2')
            self.assertEqual(grouped['sections'], ['2.3'])
            (folder / 'lesson.json').write_text(json.dumps({'chapter': 2, 'sections': ['6.3']}))
            with self.assertRaisesRegex(ValueError, 'Invalid section'):
                builder.discover(root)

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
            self.assertEqual(docs[0]['revision'], hashlib.sha256(b'%PDF-1.4\nstudent' * 2).hexdigest()[:12])
            self.assertEqual((out / docs[0]['pdf']).read_bytes(), b'%PDF-1.4\nstudent')
            self.assertFalse(Path(docs[0]['original']).is_absolute())
            self.assertEqual(len(list((out / 'materials').rglob('*.pdf'))), 1)
            self.assertTrue((out / 'index.html').exists())
            html = (out / 'index.html').read_text()
            for asset in ('styles.css', 'app.js'):
                revision = hashlib.sha256((out / asset).read_bytes()).hexdigest()[:12]
                self.assertIn(f'"{asset}?v={revision}"', html)
                self.assertNotIn(f'"{asset}"', html)
            builder.build(root, out, 'missing-soffice')
            (folder / 'Worksheet.pdf').write_bytes(b'broken PDF')
            with self.assertRaisesRegex(RuntimeError, 'Invalid PDF'):
                builder.build(root, out, 'missing-soffice')
            self.assertEqual((out / docs[0]['pdf']).read_bytes(), b'%PDF-1.4\nstudent')

    def test_office_exports_are_publicly_readable_without_changing_sources(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'repo'
            folder = root / '9618 P1' / 'Networks'
            folder.mkdir(parents=True)
            source = folder / 'Worksheet.docx'
            source.write_bytes(b'office input')
            source.chmod(0o600)
            out = Path(temporary) / 'site'

            def convert(command, **kwargs):
                exported = Path(command[command.index('--outdir') + 1]) / 'original.pdf'
                exported.write_bytes(b'%PDF-1.4\nconverted')
                exported.chmod(0o600)
                return subprocess.CompletedProcess(command, 0, stdout='', stderr='')

            with patch.object(builder.subprocess, 'run', side_effect=convert):
                builder.build(root, out, 'soffice')
            for path in [out, *out.rglob('*')]:
                expected = 0o755 if path.is_dir() else 0o644
                self.assertEqual(path.stat().st_mode & 0o777, expected, path)
            self.assertEqual(source.stat().st_mode & 0o777, 0o600)
            self.assertEqual(source.read_bytes(), b'office input')

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
