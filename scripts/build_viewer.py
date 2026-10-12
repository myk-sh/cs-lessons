#!/usr/bin/env python3
"""Build a self-contained GitHub Pages site from lesson Office files."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
TOPICS = json.loads((ROOT / 'syllabus-topics.json').read_text())
SUPPORTED = {'.pptx', '.ppt', '.docx', '.doc', '.pdf'}
ROLES = [('answer_key', 'Answer key'), ('student_booklet', 'Student booklet'),
         ('worksheet', 'Worksheet')]


def discover(root, include_answer_keys=False):
    lessons = []
    for paper in sorted(root.iterdir()):
        if not paper.is_dir() or not re.fullmatch(r'\d{4} P[1-4]', paper.name):
            continue
        syllabus, number = paper.name.split()
        for folder in sorted(paper.iterdir()):
            if not folder.is_dir():
                continue
            documents = []
            for file in sorted(folder.iterdir()):
                if not file.is_file() or file.suffix.lower() not in SUPPORTED or file.name.startswith('~$'):
                    continue
                key = re.sub(r'[\s-]+', '_', file.stem.lower())
                role = next((label for token, label in ROLES if token in key),
                            'Slides' if file.suffix.lower() in {'.ppt', '.pptx'} else 'Document')
                if role == 'Answer key' and not include_answer_keys:
                    continue
                identity = file.relative_to(root).as_posix()
                documents.append({'id': hashlib.sha256(identity.encode()).hexdigest()[:16],
                                  'label': role, 'name': file.name,
                                  'format': file.suffix[1:].upper(), 'source': file})
            order = {'Slides': 0, 'Student booklet': 1, 'Worksheet': 2, 'Document': 3, 'Answer key': 4}
            documents.sort(key=lambda d: (order[d['label']], d['name']))
            if documents:
                identity = folder.relative_to(root).as_posix()
                metadata_file = folder / 'lesson.json'
                metadata = json.loads(metadata_file.read_text()) if metadata_file.exists() else {}
                chapter = metadata.get('chapter')
                sections = metadata.get('sections', [])
                if chapter is not None and (type(chapter) is not int or str(chapter) not in TOPICS.get(syllabus, {})):
                    raise ValueError(f'Unknown syllabus chapter in {metadata_file}')
                if not isinstance(sections, list) or any(not isinstance(s, str) or not re.fullmatch(r'\d+\.\d+', s) or s.split('.')[0] != str(chapter) for s in sections):
                    raise ValueError(f'Invalid section references in {metadata_file}')
                lessons.append({'id': hashlib.sha256(identity.encode()).hexdigest()[:16],
                                'title': folder.name, 'syllabus': syllabus, 'paper': number,
                                'chapter': chapter, 'topic': TOPICS.get(syllabus, {}).get(str(chapter), 'Other lessons'),
                                'topicId': f'{syllabus}:{chapter}' if chapter is not None else f'{syllabus}:other',
                                'sections': sections,
                                'documents': documents})
    return lessons


def build(root, output, soffice, include_answer_keys=False):
    if output.is_symlink():
        raise ValueError('Output must not be a symlink')
    root, output = root.resolve(), output.resolve()
    # Never let a mistaken output path delete source files or the checkout.
    if output == root or output in root.parents or root / 'viewer' in (output, *output.parents):
        raise ValueError('Output must be a separate build directory, not a source directory')
    lessons = discover(root, include_answer_keys)
    if not lessons:
        raise ValueError('No lesson materials found')
    if output.exists() and (not (output / '.lesson-viewer-build').is_file() or output.is_symlink()):
        raise ValueError('Refusing to replace an existing directory without the viewer build marker')
    # Stage the whole site: a failed conversion never publishes a partial catalogue.
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='lesson-viewer-', dir=output.parent) as staging:
        site = Path(staging) / 'site'
        shutil.copytree(ROOT / 'viewer', site)
        # Pages caches assets for ten minutes. New HTML must request matching
        # CSS and JavaScript rather than reuse files from a previous deployment.
        index = site / 'index.html'
        html = index.read_text()
        for asset in ('styles.css', 'app.js'):
            revision = hashlib.sha256((site / asset).read_bytes()).hexdigest()[:12]
            html = html.replace(f'"{asset}"', f'"{asset}?v={revision}"')
        index.write_text(html)
        (site / '.lesson-viewer-build').touch()
        (site / '.nojekyll').touch()
        assets = site / 'materials'
        assets.mkdir()
        with tempfile.TemporaryDirectory(prefix='lesson-office-') as profile:
            profile_uri = Path(profile).as_uri()
            for lesson in lessons:
                for document in lesson['documents']:
                    source = document.pop('source')
                    directory = assets / document['id']
                    directory.mkdir()
                    original = directory / ('original' + source.suffix.lower())
                    shutil.copy2(source, original)
                    if source.suffix.lower() == '.pdf':
                        pdf = original
                    else:
                        result = subprocess.run(
                            [soffice, f'-env:UserInstallation={profile_uri}', '--headless',
                             '--convert-to', 'pdf', '--outdir', str(directory), str(original)],
                            capture_output=True, text=True, timeout=120)
                        pdf = directory / 'original.pdf'
                        if result.returncode or not pdf.is_file():
                            raise RuntimeError(f'Conversion failed: {source.relative_to(root)}\n'
                                               f'{result.stdout}\n{result.stderr}')
                    if not pdf.read_bytes().startswith(b'%PDF-'):
                        raise RuntimeError(f'Invalid PDF generated for {source.name}')
                    document['original'] = original.relative_to(site).as_posix()
                    document['pdf'] = pdf.relative_to(site).as_posix()
                    document['revision'] = hashlib.sha256(original.read_bytes() + pdf.read_bytes()).hexdigest()[:12]
                    print(f"Converted {lesson['title']}: {document['label']}", flush=True)
        topics = [{'id': f'{syllabus}:{number}', 'syllabus': syllabus, 'chapter': int(number), 'title': title}
                  for syllabus, chapters in TOPICS.items() for number, title in chapters.items()]
        (site / 'catalog.json').write_text(json.dumps({'lessons': lessons, 'topics': topics}, indent=2) + '\n')
        # Office exports and restrictive build umasks can produce owner-only files.
        # Pages must be able to traverse directories and read every published asset.
        site.chmod(0o755)
        for path in site.rglob('*'):
            path.chmod(0o755 if path.is_dir() else 0o644)
        if output.exists():
            shutil.rmtree(output)
        shutil.copytree(site, output)
    print(f'Built {len(lessons)} lessons / {sum(len(x["documents"]) for x in lessons)} materials in {output}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'dist')
    parser.add_argument('--soffice', default='soffice')
    parser.add_argument('--include-answer-keys', action='store_true', help='Publish teacher answer keys too')
    args = parser.parse_args()
    build(ROOT, args.output, args.soffice, args.include_answer_keys)


if __name__ == '__main__':
    main()
