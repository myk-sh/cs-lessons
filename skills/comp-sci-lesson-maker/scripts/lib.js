// Slide helpers for programming lessons (pptxgenjs, LAYOUT_WIDE 13.33 x 7.5 in).
// House style: white slides, Quicksand body, Roboto Mono code, navy 494985 tables/pills,
// yellow FFD84D title underline + title-slide block. Edit C and F to match another teacher's deck.
//
// API (all positions in inches):
//   newDeck(title)                         -> pres
//   titleSlide(pres, title, subtitle, notes)
//   base(pres, title, pillLabel, slideNum, notes) -> slide  (title, yellow bar, pill, page number)
//   text(s, str|runs, opts)   bullets(s, [str], opts)   callout(s, str, opts)  (navy bold sentence)
//   code(pres, s, lines, {x,y,w,h,fontSize})  lines: 'str' | {t, hl:true (navy bold)} | {t, c:true (grey comment)}
//   table(s, rows, {x,y,w,colW,rowH,fontSize})  first row = navy header; cells 'str' | {t, b, color, fill, mono}
//   stepCard(pres, s, n, heading, desc, {x,y,w,h,ds,hs})  numbered circle card
//   arrow(pres, s, x1, y1, x2, y2, color, width)
// Width check for code: Roboto Mono char width ~0.6 x font pt. chars*0.6*pt/72 must fit (box w - 0.3).
const pptxgen = require('pptxgenjs');

const C = {
  dark: '202124', code: '1D1D1D', yellow: 'FFD84D', navy: '494985',
  band: 'F6F5FC', codeBg: 'F7F7F9', grey: '666666', white: 'FFFFFF',
  soft: 'E9E8F5', green: '2E7D5B', red: 'B3261E'
};
const F = { body: 'Quicksand', mono: 'Roboto Mono' };

function newDeck(title) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = title;
  return pres;
}

function titleSlide(pres, title, sub, notes) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 8.64, y: 0, w: 4.69, h: 7.5, fill: { color: C.yellow }, line: { color: C.yellow } });
  s.addText(title, { x: 0.73, y: 2.8, w: 7.66, h: 1.0, fontFace: F.body, fontSize: 54, bold: true, color: C.dark, margin: 0, valign: 'bottom', isTextBox: true });
  s.addText(sub, { x: 0.73, y: 3.88, w: 7.66, h: 0.45, fontFace: F.body, fontSize: 20, color: C.grey, margin: 0, isTextBox: true });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.73, y: 4.43, w: 1.88, h: 0.06, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText('1', { x: 12.3, y: 7.0, w: 0.6, h: 0.3, fontFace: F.body, fontSize: 13.5, bold: true, color: C.dark, align: 'right', margin: 0, isTextBox: true });
  if (notes) s.addNotes(notes);
  return s;
}

function base(pres, title, pill, num, notes) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addText(title, { x: 0.73, y: 0.38, w: 8.7, h: 0.6, fontFace: F.body, fontSize: 26, bold: true, color: C.dark, margin: 0, valign: 'middle', isTextBox: true });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.73, y: 1.02, w: 1.88, h: 0.06, fill: { color: C.yellow }, line: { color: C.yellow } });
  s.addText(pill, {
    shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.5, x: 9.65, y: 0.32, w: 2.96, h: 0.35,
    fill: { color: C.white }, line: { color: C.navy, width: 1.25 },
    fontFace: F.body, fontSize: 13.5, bold: true, color: C.navy, align: 'center', valign: 'middle', margin: 0,
    shadow: { type: 'outer', color: '000000', opacity: 0.18, blur: 3, offset: 1.5, angle: 90 }
  });
  s.addText(String(num), { x: 11.94, y: 6.85, w: 0.67, h: 0.31, fontFace: F.body, fontSize: 13.5, bold: true, color: C.dark, align: 'right', margin: 0, isTextBox: true });
  if (notes) s.addNotes(notes);
  return s;
}

// plain paragraph(s)
function text(s, t, o = {}) {
  s.addText(t, Object.assign({ fontFace: F.body, fontSize: 16, color: C.dark, margin: 0, valign: 'top', isTextBox: true, paraSpaceAfter: 6 }, o));
}

function bullets(s, items, o = {}) {
  const runs = items.map((it, i) => ({
    text: it, options: { bullet: { indent: 18 }, breakLine: i < items.length - 1 }
  }));
  s.addText(runs, Object.assign({ fontFace: F.body, fontSize: 16, color: C.dark, margin: 0, valign: 'top', paraSpaceAfter: 10, isTextBox: true }, o));
}

// callout in navy bold (the queues deck's highlighted sentences)
function callout(s, t, o = {}) {
  s.addText(t, Object.assign({ fontFace: F.body, fontSize: 15, bold: true, color: C.navy, margin: 0, valign: 'top', isTextBox: true }, o));
}

// code box: lines is array of strings or {t, hl}
function code(pres, s, lines, o) {
  const size = o.fontSize || 14;
  s.addShape(pres.shapes.RECTANGLE, {
    x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: C.codeBg }, line: { color: 'E4E4EC', width: 0.75 },
    shadow: { type: 'outer', color: '000000', opacity: 0.12, blur: 4, offset: 2, angle: 90 }
  });
  const runs = lines.map((ln, i) => {
    const l = typeof ln === 'string' ? { t: ln } : ln;
    return {
      text: l.t === '' ? ' ' : l.t,
      options: { breakLine: i < lines.length - 1, bold: !!l.hl, color: l.hl ? C.navy : (l.c ? C.grey : C.code) }
    };
  });
  s.addText(runs, {
    x: o.x + 0.15, y: o.y + 0.1, w: o.w - 0.3, h: o.h - 0.2, fontFace: F.mono, fontSize: size,
    color: C.code, margin: 0, valign: o.valign || 'top', lineSpacingMultiple: 1.05, isTextBox: true
  });
}

// table in the queues deck style
function table(s, rows, o) {
  const fs = o.fontSize || 14;
  const data = rows.map((r, ri) => r.map(cell => {
    const c = typeof cell === 'string' ? { t: cell } : cell;
    if (ri === 0) return { text: c.t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: fs + 0.5 } };
    return {
      text: c.t, options: {
        fill: { color: c.fill || (ri % 2 === 1 ? C.band : C.white) },
        color: c.color || C.dark, bold: !!c.b, fontFace: c.mono ? F.mono : F.body, fontSize: c.mono ? fs - 1 : fs
      }
    };
  }));
  s.addTable(data, {
    x: o.x, y: o.y, w: o.w, colW: o.colW, rowH: o.rowH || 0.45,
    fontFace: F.body, fontSize: fs, color: C.dark, valign: 'middle',
    border: { type: 'solid', pt: 1, color: 'FFFFFF' }, margin: [0.04, 0.1, 0.04, 0.1]
  });
}

// numbered circle + heading + description (annotation card)
function stepCard(pres, s, n, head, desc, o) {
  s.addShape(pres.shapes.RECTANGLE, { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: C.band }, line: { color: C.band } });
  s.addText(String(n), { shape: pres.shapes.OVAL, x: o.x + 0.15, y: o.y + 0.15, w: 0.42, h: 0.42, fill: { color: C.navy }, line: { color: C.navy }, color: C.white, bold: true, fontFace: F.body, fontSize: 14, align: 'center', valign: 'middle', margin: 0 });
  s.addText(head, { x: o.x + 0.72, y: o.y + 0.12, w: o.w - 0.85, h: 0.45, fontFace: F.body, fontSize: o.hs || 15, bold: true, color: C.dark, margin: 0, valign: 'middle', isTextBox: true });
  if (desc) s.addText(desc, { x: o.x + 0.72, y: o.y + 0.55, w: o.w - 0.85, h: o.h - 0.62, fontFace: F.body, fontSize: o.ds || 12.5, color: C.dark, margin: 0, valign: 'top', isTextBox: true });
}

function arrow(pres, s, x1, y1, x2, y2, color, width) {
  const o = {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    line: { color: color || C.navy, width: width || 2, endArrowType: 'triangle' }
  };
  if (x2 < x1) o.flipH = true;
  if (y2 < y1) o.flipV = true;
  s.addShape(pres.shapes.LINE, o);
}

module.exports = { pptxgen, C, F, newDeck, titleSlide, base, text, bullets, callout, code, table, stepCard, arrow };
