"""Remove duplicate <a:pPr> elements inside a paragraph (pptxgenjs writes one per run for
multi-run single-paragraph text; PowerPoint refuses to open such files)."""
import re, sys, zipfile, shutil
src = sys.argv[1]; tmp = src + '.tmp'
pat = re.compile(r'<a:p>(.*?)</a:p>', re.S)
def fix_para(m):
    body = m.group(1); first = True
    def keep(mm):
        nonlocal first
        if first: first = False; return mm.group(0)
        return ''
    body = re.sub(r'<a:pPr\b[^>]*/>|<a:pPr\b[^>]*>.*?</a:pPr>', keep, body, flags=re.S)
    return '<a:p>' + body + '</a:p>'
n = 0
with zipfile.ZipFile(src) as zi, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zo:
    for it in zi.infolist():
        data = zi.read(it.filename)
        if re.match(r'ppt/(slides|notesSlides)/.*\.xml$', it.filename):
            s = data.decode('utf-8'); s2 = pat.sub(fix_para, s)
            if s2 != s: n += 1
            data = s2.encode('utf-8')
        zo.writestr(it, data)
shutil.move(tmp, src); print('fixed parts:', n)
