// Worksheet / answer key / student booklet helpers (docx-js, US Letter, content width 10200 DXA).
// Style matches the slide decks: navy 494985 task headings with bottom rule, grey italic marks,
// banded tables, shaded Consolas code blocks.
//
// API:
//   title(t, subtitle, { noName }) -> [elements] (title, subtitle, Name/Date box unless noName)
//   H(text, marksLabel, {pageBreak})   H2(text)   P(str | [str | [str, runOpts]], {before, after, keepNext})   I(italicGreyStr)
//   table(rows, widthsDXA, {rowH, noHeader, plain, size})   cells 'str' | {t, b, i, color, fill, mono}; '\n' splits lines
//   code(lines, {keepLines:false for long answers, color})   lines(n) answer lines   box(heightTwips) writing box
//   bullets([str])   spacer(after)   build(children, outPath) -> Promise
// Booklet: slideImage(jpgPath, caption)  learn(sectionTitle)  pageBreak()
// Answer key: keyBanner(text)  A(answerText)  a(cellText) red table cell  marking(title, rows)  code(lines, { color: COL.ans })
// Pattern for worksheet + key from one script: build(K.splice(0), worksheetPath); keep adding to K; build(K, keyPath)
// Keep code lines <= ~85 chars (Consolas 9.5pt); use VB " _" continuation for longer lines.
const d = require('docx');
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, HeightRule, PageBreak } = d;

const COL = { dark: '202124', navy: '494985', grey: '666666', band: 'F6F5FC', code: '1D1D1D', line: 'C0C0C8', tb: 'B8B8C8', ans: 'C0392B' };
const W = 10200; // content width in DXA

const run = (t, o = {}) => new TextRun(Object.assign({ text: t, color: COL.dark, size: 21 }, o));

// rich text: array of strings or [text, opts]
function P(parts, o = {}) {
  if (!Array.isArray(parts)) parts = [parts];
  return new Paragraph({
    spacing: { after: o.after === undefined ? 120 : o.after, before: o.before || 0 },
    alignment: o.align,
    keepNext: o.keepNext,
    children: parts.map(p => typeof p === 'string' ? run(p, o.run || {}) : run(p[0], Object.assign({}, o.run || {}, p[1])))
  });
}
const I = (t) => P([[t, { italics: true, color: COL.grey }]]);

function title(t, sub, o = {}) {
  if (o.noName) return [
    new Paragraph({ spacing: { after: 120 }, children: [run(t, { bold: true, size: 52 })] }),
    new Paragraph({ spacing: { after: 200 }, children: [run(sub, { color: COL.grey, size: 24 })] })
  ];
  return [
    new Paragraph({ spacing: { after: 120 }, children: [run(t, { bold: true, size: 52 })] }),
    new Paragraph({ spacing: { after: 200 }, children: [run(sub, { color: COL.grey, size: 24 })] }),
    table([[{ t: 'Name: _______________________________' }, { t: 'Date: _____________' }]], [5102, 5098], { noHeader: true, plain: true }),
    new Paragraph({ spacing: { after: 80 }, children: [] })
  ];
}

function H(t, marks, o = {}) {
  const ch = [run(t, { bold: true, color: COL.navy, size: 30 })];
  if (marks) ch.push(run('   ' + marks, { italics: true, color: COL.grey, size: 22 }));
  return new Paragraph({
    pageBreakBefore: !!o.pageBreak, keepNext: true,
    spacing: { before: o.pageBreak ? 0 : 320, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, space: 4, color: COL.navy } },
    children: ch
  });
}
function H2(t) {
  return new Paragraph({ keepNext: true, spacing: { before: 200, after: 100 }, children: [run(t, { bold: true, color: COL.navy, size: 24 })] });
}

const bord = { style: BorderStyle.SINGLE, size: 4, color: COL.tb };
function table(rows, widths, o = {}) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    borders: { top: bord, bottom: bord, left: bord, right: bord, insideHorizontal: bord, insideVertical: bord },
    rows: rows.map((r, ri) => {
      const hdr = ri === 0 && !o.noHeader;
      return new TableRow({
        tableHeader: hdr, cantSplit: true,
        height: o.rowH && !hdr ? { value: o.rowH, rule: HeightRule.ATLEAST } : undefined,
        children: r.map((c, ci) => {
          const cell = typeof c === 'string' ? { t: c } : c;
          const fill = hdr ? COL.navy : (o.plain ? 'FFFFFF' : (cell.fill || (ri % 2 === 1 ? COL.band : 'FFFFFF')));
          const lines = String(cell.t).split('\n');
          return new TableCell({
            width: { size: widths[ci], type: WidthType.DXA },
            shading: { fill, type: ShadingType.CLEAR, color: 'auto' },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: lines.map(l => new Paragraph({
              spacing: { after: 0 },
              children: [run(l, { bold: hdr || !!cell.b, color: hdr ? 'FFFFFF' : (cell.color || COL.dark), size: o.size || 20, font: cell.mono ? 'Consolas' : undefined, italics: !!cell.i })]
            }))
          });
        })
      });
    })
  });
}

function code(lines, o = {}) {
  const ch = [];
  lines.forEach((l, i) => {
    if (i > 0) ch.push(new TextRun({ break: 1 }));
    ch.push(new TextRun({ text: l === '' ? ' ' : l, font: 'Consolas', size: o.size || 19, color: o.color || COL.code, bold: !!o.color }));
  });
  const b = { style: BorderStyle.SINGLE, size: 4, space: 4, color: 'D8D8E4' };
  return new Paragraph({
    spacing: { before: 60, after: 120 }, indent: { left: 113, right: 113 },
    shading: { type: ShadingType.CLEAR, fill: 'F5F5F8', color: 'auto' },
    border: { top: b, bottom: b, left: b, right: b },
    keepLines: o.keepLines !== false,
    children: ch
  });
}

function lines(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(new Paragraph({ spacing: { before: 200, after: 0 }, tabStops: [{ type: d.TabStopType.RIGHT, position: W, leader: 'underscore' }], children: [new TextRun({ text: '\t', color: COL.line })] }));
  out.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  return out;
}

function box(heightTwips, label) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: COL.line };
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b },
    rows: [new TableRow({
      cantSplit: true, height: { value: heightTwips, rule: HeightRule.EXACT },
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA }, shading: { fill: 'FBFBFD', type: ShadingType.CLEAR, color: 'auto' },
        margins: { top: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: label ? [run(label, { italics: true, color: 'A0A0A8', size: 18 })] : [] })]
      })]
    })]
  });
}

function bullets(items) {
  return items.map(t => new Paragraph({
    numbering: { reference: 'bul', level: 0 }, spacing: { after: 60 },
    children: (Array.isArray(t) ? t : [t]).map(p => typeof p === 'string' ? run(p) : run(p[0], p[1]))
  }));
}
const spacer = (after = 80) => new Paragraph({ spacing: { after }, children: [] });

function build(children, file) {
  const doc = new d.Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 21 } } } },
    numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 260 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 850, right: 1020, bottom: 850, left: 1020 } } },
      children
    }]
  });
  return d.Packer.toBuffer(doc).then(buf => { require('fs').writeFileSync(file, buf); console.log('wrote', file); });
}


// ---------- student booklet helpers ----------
// slide image (jpg rendered from the deck) in a light frame, with caption
function slideImage(jpgPath, caption) {
  const data = require('fs').readFileSync(jpgPath);
  const bw = 690, bh = Math.round(690 * 7.5 / 13.333);
  const b = { style: BorderStyle.SINGLE, size: 4, color: 'C8C8D4' };
  return [
    new Table({
      width: { size: W, type: WidthType.DXA }, columnWidths: [W],
      borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b },
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: W, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 40, right: 40 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new d.ImageRun({ type: 'jpg', data, transformation: { width: bw, height: bh } })] })]
      })] })]
    }),
    new Paragraph({ spacing: { before: 40, after: 200 }, children: [run(caption, { italics: true, color: COL.grey, size: 18 })] })
  ];
}
// "Learn" section banner (yellow), visually distinct from Task headings
function learn(t) {
  return new Paragraph({
    keepNext: true, spacing: { before: 280, after: 140 },
    shading: { type: ShadingType.CLEAR, fill: 'FFF4C7', color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 24, space: 6, color: 'FFD84D' } },
    children: [run('Learn   ', { bold: true, color: COL.navy, size: 26 }), run(t, { bold: true, size: 26 })]
  });
}
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// ---------- answer key helpers ----------
// A(text): answer written in red where the student would write it
const A = (t, o = {}) => new Paragraph({ spacing: { before: o.before || 60, after: o.after === undefined ? 120 : o.after }, keepNext: o.keepNext,
  children: [run(t, { color: COL.ans, bold: true })] });
// cell helper for answers inside tables
const a = (t) => ({ t, color: COL.ans, b: true });
// marking guidance box under each task (grey band, small text)
function marking(title, rows) {
  const out = [new Paragraph({ keepNext: true, spacing: { before: 120, after: 60 }, children: [run(title, { bold: true, color: COL.navy, size: 20 })] })];
  out.push(table([['Mark', 'Marking point'], ...rows.map(r => Array.isArray(r) ? r : ['1', r])], [900, 9300], { size: 19 }));
  out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  return out;
}
// KEY banner for the top of an answer key
function keyBanner(t) {
  return new Paragraph({ spacing: { after: 200 }, shading: { type: ShadingType.CLEAR, fill: 'FBE9E7', color: 'auto' },
    children: [run('ANSWER KEY - TEACHER COPY   ', { bold: true, color: COL.ans, size: 22 }), run(t, { size: 20, color: COL.dark })] });
}

module.exports = { slideImage, learn, pageBreak, A, a, marking, keyBanner, P, I, title, H, H2, table, code, lines, box, bullets, spacer, build, COL, W, run };
