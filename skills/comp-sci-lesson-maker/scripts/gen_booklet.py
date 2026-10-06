"""Assemble a student-booklet JS script from a worksheet script.

Task text is cut verbatim from the worksheet generator (between the '// ---------- Task N'
markers and the worksheet build line), so booklet tasks can never drift from the worksheet.
The plan lists items in order:
  ('task', 'Task 2', start_marker_or_None, end_marker_or_None)  -> slice of that task block
  ('js', "...")                                                -> literal JS (Learn sections, slides)
"""
import sys, re

HEAD = """const w = require('./wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer, learn } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
var part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);
const pb = w.pageBreak;
const IMG = '%(img)s';
const slide = (n, caption) => w.slideImage(IMG + String(n).padStart(2, '0') + '.jpg', 'Slide ' + n + ' - ' + caption);
add(w.title('%(topic)s', '%(subtitle)s'));
add(P('This booklet has everything you need for the lesson in one place. Work through it in order:'));
add(bullets([
  [['Learn', { bold: true, color: w.COL.navy }], ' sections show the key slides. Read them carefully - they explain the ideas and show worked examples.'],
  [['Task', { bold: true, color: w.COL.navy }], ' sections are where you practise. Each task uses what the slides just before it taught you.'],
  '%(last)s'
]));
"""


def blocks(src):
    body = src[:src.index('w.build(K.splice(0)')]
    parts = re.split(r'^// ---------- (Task \d+)\b[^\n]*$', body, flags=re.M)
    return {parts[i]: parts[i + 1] for i in range(1, len(parts), 2)}


def cut(block, start, end):
    s = block.index(start) if start else 0
    e = block.index(end) if end else len(block)
    # worksheet blocks may declare their own `const part`; the booklet header already declares it
    return re.sub(r'^const part = ', 'part = ', block[s:e], flags=re.M)


PROG_LAST = 'Tasks get harder as you go, and are written like real Cambridge 9618 Paper 4 questions. Task 6 is done at the computer.'


def build(ws_path, plan, topic, img, out_js, out_docx,
          subtitle='Y13 - Cambridge International 9618  |  Data Structures  |  Student booklet', last=PROG_LAST):
    """subtitle/last: cover subtitle and third 'how to use' bullet - change them for theory lessons."""
    b = blocks(open(ws_path).read())
    # carry over small helper functions the worksheet defines before Task 1 (e.g. const src = (t) => I(t);)
    src = open(ws_path).read()
    pre = src[:src.index('// ---------- Task 1')] if '// ---------- Task 1' in src else ''
    helpers = [re.sub(r'^const ', 'var ', l) for l in pre.split('\n')
               if re.match(r'^const (\w+) = \(', l) and not re.match(r'^const (add|part) =', l)]
    js = [HEAD % {'topic': topic, 'img': img, 'subtitle': subtitle, 'last': last.replace("'", "\\'")}]
    for item in plan:
        if item[0] == 'js':
            js.append(item[1])
        else:
            _, name, start, end = item
            js.append(cut(b[name], start, end))
    js.insert(1, '\n'.join(helpers))
    js.append(f"\nw.build(K, '{out_docx}');\n")
    open(out_js, 'w').write('\n'.join(js))


if __name__ == '__main__':
    pass
