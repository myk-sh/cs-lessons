const L = require('../../scripts/lib.js');
const { C, F } = L;
const pres = L.newDeck('Wired and wireless networking');

function line(s, x1, y1, x2, y2, o = {}) {
  const opt = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    line: { color: o.color || '7A7AA0', width: o.w || 1.5, dashType: o.dash, endArrowType: o.arrow ? 'triangle' : undefined } };
  if ((x2 - x1) * (y2 - y1) < 0) opt.flipV = true;
  s.addShape(pres.shapes.LINE, opt);
}
function box(s, x, y, w, h, t, o = {}) {
  s.addText(t, { shape: pres.shapes.RECTANGLE, x, y, w, h, fill: { color: o.fill || C.soft }, line: { color: o.lc || C.navy, width: 1 },
    fontFace: F.body, fontSize: o.fs || 11, bold: !!o.b, color: o.color || C.dark, align: 'center', valign: 'middle', margin: 0 });
}

// 1
L.titleSlide(pres, 'Wired & wireless', 'Y12 - Cambridge International 9618  |  2.1.5',
  'Short lesson (about 30 minutes): recall test 5 min, teaching 12 min, tasks 12 min, exit 1 min. Task 4 (the 20-floor building) is extension or homework.');

// 2 Recall
let s = L.base(pres, 'Recall test: topologies & cloud', 'Starter activity', 2,
  'Worksheet Task 1, closed book, 5 minutes. Q3 is a real exam question: 9618/13 Oct/Nov 2023 Q3(a)(ii). If most students drop marks on Q3, spend 2 minutes on the "point + expansion" pattern before moving on.');
L.table(s, [
  ['Worksheet Task 1 covers...', 'Marks'],
  ['Name the topology from a description (bus, star, mesh)', '3'],
  ['Define private cloud', '1'],
  ['Exam question: public cloud vs a server on a LAN (Nov 2023)', '4']
], { x: 0.98, y: 1.45, w: 9.0, colW: [7.8, 1.2], rowH: 0.55 });
L.stepCard(pres, s, 1, 'Closed book', 'No notes, no slides.', { x: 10.25, y: 1.45, w: 2.35, h: 1.2, hs: 14, ds: 12 });
L.stepCard(pres, s, 2, '5 minutes', 'Then swap and mark.', { x: 10.25, y: 2.8, w: 2.35, h: 1.2, hs: 14, ds: 12 });
L.callout(s, 'Total: 8 marks.', { x: 0.98, y: 4.0, w: 9.0, h: 0.5 });

// 3 Objectives
s = L.base(pres, 'In this lesson, you will', 'Objectives', 3);
L.bullets(s, [
  'Compare Wi-Fi and Bluetooth, and explain spread spectrum frequency hopping',
  'Compare radio waves, microwaves and infrared, and explain why satellites are needed',
  'Compare twisted pair, coaxial and fibre-optic cables',
  'Recommend wired or wireless connectivity for a scenario, with reasons'
], { x: 0.92, y: 1.6, w: 11.2, h: 4.2, fontSize: 19, paraSpaceAfter: 16 });

// 4 Wireless media
s = L.base(pres, 'Wireless: electromagnetic radiation', 'Activity 1', 4,
  'Textbook Table 2.5. Simplify for students: radio waves go furthest and through walls; infrared carries the most data but is easily blocked (indoor only - which also stops it interfering elsewhere); microwaves are the compromise, which is why Wi-Fi uses them.');
L.callout(s, 'Wireless networks carry data using electromagnetic radiation: radio waves, microwaves or infrared.', { x: 0.96, y: 1.35, w: 11.3, h: 0.5, fontSize: 16, color: C.dark });
L.table(s, [
  ['', 'Radio waves', 'Microwaves', 'Infrared'],
  [{ t: 'Bandwidth (data it can carry)', b: true }, 'lowest', 'medium', 'highest'],
  [{ t: 'Penetration (through walls)', b: true }, 'best', 'medium', 'worst - easily blocked'],
  [{ t: 'Range', b: true }, 'longest', 'medium', 'about 1-2 metres'],
  [{ t: 'Typical use', b: true }, 'broadcasting, long range links', 'Wi-Fi, satellite links', 'TV remotes, short indoor links']
], { x: 0.98, y: 2.1, w: 11.36, colW: [3.4, 2.65, 2.65, 2.66], rowH: 0.62, fontSize: 14 });
L.callout(s, 'Microwaves are the best compromise: reasonable bandwidth, penetration and range.', { x: 0.98, y: 5.4, w: 11.3, h: 0.5 });

// 5 Wi-Fi vs Bluetooth
s = L.base(pres, 'Wi-Fi vs Bluetooth', 'Activity 1', 5,
  'Both use radio waves / spread spectrum. Bluetooth creates a WPAN (wireless personal area network) using key encryption. Wi-Fi implements the IEEE 802.11 protocols and is designed for full networks through wireless access points.');
L.table(s, [
  ['', 'Wi-Fi', 'Bluetooth'],
  [{ t: 'Range', b: true }, 'up to about 100 m from a WAP / hotspot', 'less than about 30 m'],
  [{ t: 'Data transfer rate', b: true }, 'much faster', 'slower - speed not critical'],
  [{ t: 'Security', b: true }, 'better (e.g. WPA2 encryption)', 'key encryption'],
  [{ t: 'Creates a...', b: true }, 'WLAN - a full-scale network', 'WPAN - devices close to one person'],
  [{ t: 'Typical use', b: true }, 'laptops and phones on a school or home network', 'phone to headset, phone to speaker'],
  [{ t: 'Standard / frequency', b: true }, 'IEEE 802.11', '79 channels around 2.45 GHz']
], { x: 0.98, y: 1.4, w: 11.36, colW: [2.9, 4.23, 4.23], rowH: 0.6, fontSize: 14 });
L.callout(s, 'Choose Bluetooth for low-bandwidth links between nearby devices; choose Wi-Fi for a whole network.', { x: 0.98, y: 5.85, w: 11.3, h: 0.5 });

// 6 Frequency hopping
s = L.base(pres, 'Bluetooth: frequency hopping', 'Activity 1', 6,
  'Each communicating pair picks one of the 79 channels at random; if it is in use, it picks another. Pairs also hop between channels several times a second, so two pairs rarely clash and interference is minimised. In the grid, pair 1 and pair 2 never use the same channel at the same time.');
L.callout(s, 'A device picks one of 79 channels at random. If it is in use, it picks another - and pairs keep hopping channels several times a second.', { x: 0.96, y: 1.35, w: 11.3, h: 0.7, fontSize: 15, color: C.dark });
const gx = 1.7, gy = 2.35, cw = 0.85, ch = 0.42, rows = 7, cols = 8;
const p1 = [2, 5, 1, 6, 3, 0, 4, 2], p2 = [5, 1, 4, 2, 6, 3, 0, 5];
for (let r = 0; r < rows; r++) {
  s.addText('ch ' + (rows - r), { x: gx - 0.8, y: gy + r * ch, w: 0.7, h: ch, fontFace: F.body, fontSize: 10, color: C.grey, align: 'right', valign: 'middle', margin: 0, isTextBox: true });
  for (let c = 0; c < cols; c++) {
    const a = p1[c] === r, b = p2[c] === r;
    box(s, gx + c * cw, gy + r * ch, cw, ch, a ? '1' : (b ? '2' : ''), { fill: a ? C.navy : (b ? C.yellow : 'FFFFFF'), color: a ? 'FFFFFF' : C.dark, b: true, lc: 'C8C8D4' });
  }
}
s.addText('time ->', { x: gx, y: gy + rows * ch + 0.05, w: cols * cw, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'Pair 1 (navy)', 'e.g. phone and headset', { x: 9.1, y: 2.35, w: 3.5, h: 1.0, ds: 12 });
L.stepCard(pres, s, 2, 'Pair 2 (yellow)', 'e.g. laptop and mouse', { x: 9.1, y: 3.5, w: 3.5, h: 1.0, ds: 12 });
L.callout(s, 'The pairs never use the same channel at the same time, so they do not interfere.', { x: 9.1, y: 4.7, w: 3.5, h: 1.2, fontSize: 13 });

// 7 Satellites
s = L.base(pres, 'Why do we need satellites?', 'Activity 1', 7,
  'Radio and microwave signals travel in straight lines, so the curvature of the Earth blocks a signal between two distant antennae. A satellite receives the signal, boosts it and beams it back down. Different frequency bands are used to avoid interference.');
s.addShape(pres.shapes.OVAL, { x: 2.2, y: 3.3, w: 3.2, h: 3.2, fill: { color: 'CFE3F7' }, line: { color: C.navy, width: 1.25 } });
s.addShape(pres.shapes.OVAL, { x: 2.15, y: 3.85, w: 0.25, h: 0.25, fill: { color: C.dark }, line: { color: C.dark } });
s.addShape(pres.shapes.OVAL, { x: 5.2, y: 3.85, w: 0.25, h: 0.25, fill: { color: C.dark }, line: { color: C.dark } });
s.addText('A', { x: 1.75, y: 3.7, w: 0.35, h: 0.35, fontFace: F.body, fontSize: 14, bold: true, margin: 0, isTextBox: true });
s.addText('B', { x: 5.5, y: 3.7, w: 0.35, h: 0.35, fontFace: F.body, fontSize: 14, bold: true, margin: 0, isTextBox: true });
box(s, 3.4, 1.55, 0.8, 0.4, 'satellite', { fill: C.yellow, b: true, fs: 10 });
line(s, 2.3, 3.85, 3.45, 1.98, { color: C.navy, w: 2, dash: 'dash' });
line(s, 4.15, 1.98, 5.3, 3.85, { color: C.navy, w: 2, dash: 'dash' });
line(s, 2.4, 3.95, 5.2, 3.95, { color: 'C0392B', w: 1.5, dash: 'sysDot' });
s.addText('blocked by the Earth\'s curve', { x: 2.55, y: 4.05, w: 2.6, h: 0.3, fontFace: F.body, fontSize: 10, italic: true, color: 'C0392B', align: 'center', margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'The problem', 'Signals travel in straight lines, so the curvature of the Earth stops a signal from A reaching a distant antenna B.', { x: 6.9, y: 1.5, w: 5.7, h: 1.45, ds: 13 });
L.stepCard(pres, s, 2, 'The solution', 'A beams the signal up to a satellite, which boosts it and beams it back down to B.', { x: 6.9, y: 3.1, w: 5.7, h: 1.3, ds: 13 });
L.stepCard(pres, s, 3, 'How', 'Radio or microwave frequencies, with different frequency bands to stop interference.', { x: 6.9, y: 4.55, w: 5.7, h: 1.3, ds: 13 });

// 8 Cables
s = L.base(pres, 'Wired: three types of cable', 'Activity 2', 8,
  'Textbook figures: coaxial has about 80 times, and fibre about 26 000 times, the transmission capacity of twisted pair. Shielded twisted pair has a metal foil jacket to cancel some interference; unshielded is used at home.');
L.table(s, [
  ['', 'Twisted pair', 'Coaxial', 'Fibre optic'],
  [{ t: 'Carries data as...', b: true }, 'electrical signals (copper)', 'electrical signals (copper core)', 'pulses of light (glass fibres)'],
  [{ t: 'Cost', b: true }, 'cheapest', 'medium', 'most expensive'],
  [{ t: 'Data transfer rate', b: true }, 'lowest', 'medium (about 80x twisted pair)', 'highest (about 26 000x)'],
  [{ t: 'External interference', b: true }, 'affected most', 'affected less', 'very high resistance'],
  [{ t: 'Typical use', b: true }, 'most LANs (Ethernet)', 'MANs, cable TV', 'long distances, WAN / internet backbones']
], { x: 0.98, y: 1.4, w: 11.36, colW: [2.9, 2.75, 2.85, 2.86], rowH: 0.66, fontSize: 13.5 });
L.callout(s, 'Fibre: best data transfer rate, smallest signal loss over distance, immune to electrical interference - but the most expensive.', { x: 0.98, y: 5.65, w: 11.3, h: 0.7 });

// 9 Fibre modes
s = L.base(pres, 'Fibre optic: single-mode and multi-mode', 'Activity 2', 9,
  'Keep this brief - it is a one-line distinction in the textbook. Single-mode: smaller core, less reflection, so faster and further (telecoms, cable TV). Multi-mode: larger core, more reflections, so best over short distances such as within a LAN.');
['Single-mode', 'Multi-mode'].forEach((t, i) => {
  const x0 = i === 0 ? 0.9 : 6.85;
  s.addShape(pres.shapes.RECTANGLE, { x: x0, y: 1.4, w: 5.6, h: 4.1, fill: { color: C.band }, line: { color: C.band } });
  s.addText(t, { x: x0 + 0.2, y: 1.5, w: 5.2, h: 0.45, fontFace: F.body, fontSize: 17, bold: true, color: C.navy, margin: 0, isTextBox: true });
  const cy = 2.85, th = i === 0 ? 0.3 : 0.8;
  s.addShape(pres.shapes.RECTANGLE, { x: x0 + 0.4, y: cy - th / 2, w: 4.8, h: th, fill: { color: 'FFF4C7' }, line: { color: C.navy, width: 1 } });
  if (i === 0) line(s, x0 + 0.5, cy, x0 + 5.1, cy, { color: 'C0392B', w: 2 });
  else { const pts = [0.5, 1.2, 1.9, 2.6, 3.3, 4.0, 4.7, 5.1]; for (let k = 0; k < pts.length - 1; k++) line(s, x0 + pts[k], cy + (k % 2 ? 0.35 : -0.35), x0 + pts[k + 1], cy + (k % 2 ? -0.35 : 0.35), { color: 'C0392B', w: 2 }); }
  s.addText(i === 0 ? 'Small core, single light path, little reflection' : 'Larger core, light reflects many times', { x: x0 + 0.3, y: 3.5, w: 5.0, h: 0.4, fontFace: F.body, fontSize: 12, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
  L.text(s, i === 0 ? 'Data travels faster and further. Used for telecommunications and cable TV.' : 'Works best over shorter distances, e.g. within a LAN.', { x: x0 + 0.3, y: 4.1, w: 5.0, h: 1.0, fontSize: 15 });
});

// 10 Wired vs wireless
s = L.base(pres, 'Wired or wireless?', 'Activity 2', 10,
  'These are the textbook points. In exam answers, make each point comparative ("faster than wireless") and apply it to the scenario.');
L.table(s, [
  ['Wireless', 'Wired'],
  ['+ Easy to expand - no cables to install', '+ More reliable and stable - less interference'],
  ['+ Devices are mobile within range of the WAPs', '+ Faster data transfer, no "dead spots"'],
  ['- More interference from external sources', '+ Tends to be cheaper overall'],
  ['- Less secure: signals can be intercepted, so encrypt (e.g. WPA2)', '- Devices are not mobile'],
  ['- Slower data transfer rate', '- Trip hazards, overheating, cables pulled out'],
  ['- Signals blocked by thick walls; strength can drop out', '- May need permission to lay cables underground']
], { x: 0.98, y: 1.4, w: 11.36, colW: [5.68, 5.68], rowH: 0.6, fontSize: 13.5 });
L.callout(s, 'Also consider: phones and tablets need Wi-Fi or Bluetooth; some countries restrict wireless frequencies.', { x: 0.98, y: 5.85, w: 11.3, h: 0.5 });

// 11 Exam technique
s = L.base(pres, 'Exam technique: "recommend and justify"', 'Activity 3', 11,
  'Use for Task 4 (textbook Activity 2B Q4: a 20-floor building). The structure earns marks; the content is from slide 10. Model one point together, e.g. "Wired connections give faster data transfer than wireless, so staff on all 20 floors can access the file server without slowdowns."');
L.stepCard(pres, s, 1, 'Point', 'State the advantage or disadvantage, comparing the two options: "Wired is faster than wireless..."', { x: 0.96, y: 1.45, w: 3.7, h: 2.1, ds: 13 });
L.stepCard(pres, s, 2, 'Expansion', '...apply it to the scenario: "...so staff on every floor can access the file server quickly."', { x: 4.82, y: 1.45, w: 3.7, h: 2.1, ds: 13 });
L.stepCard(pres, s, 3, 'Conclusion', 'Make a decision and justify it - a mixed solution is allowed: "Wired backbone with Wi-Fi on each floor, because..."', { x: 8.68, y: 1.45, w: 3.7, h: 2.1, ds: 13 });
L.callout(s, 'A list of single words ("faster", "secure") earns little. Point + expansion applied to the scenario earns the marks.', { x: 0.96, y: 3.9, w: 11.3, h: 0.7 });
L.text(s, 'Modelled together - one point for a 20-floor office building:', { x: 0.96, y: 4.75, w: 11.3, h: 0.4, bold: true });
L.table(s, [
  ['Point', 'Expansion (applied to the scenario)'],
  ['Wired connections give faster, more stable data transfer than wireless', '...so staff on all 20 floors can open large files on the server without slowdowns or drop-outs']
], { x: 0.96, y: 5.2, w: 11.4, colW: [5.0, 6.4], rowH: 0.55, fontSize: 13 });

// 12 Misconceptions + exit
s = L.base(pres, 'Misconceptions and exit question', 'Plenary', 12,
  'Exit answer: fibre optic (1) - the highest data transfer rate // the least signal loss over 2 km // not affected by electrical interference (1). Accept: twisted pair loses too much signal over that distance.');
L.table(s, [
  ['Misconception', 'Why it is wrong'],
  ['"Bluetooth and Wi-Fi are the same."', 'Bluetooth: short range (< 30 m), low bandwidth, WPAN. Wi-Fi: about 100 m, faster, full networks.'],
  ['"Fibre carries electricity very fast."', 'Fibre carries pulses of light, which is why it is not affected by electrical interference.'],
  ['"Wireless is always cheaper."', 'Wired tends to be cheaper overall, despite the cost of buying and installing cable.']
], { x: 0.77, y: 1.35, w: 11.8, colW: [4.3, 7.5], rowH: 0.62, fontSize: 13.5 });
L.callout(s, 'Exit: Two school buildings are 2 km apart. Which cable should connect them? Give one reason. [2]', { x: 0.77, y: 4.4, w: 11.8, h: 0.8, fontSize: 18, color: C.dark });
L.callout(s, 'Next lesson: 2.1.6 - hardware requirements of networks (switch, router, WAP, bridge, NIC, modem).', { x: 0.77, y: 5.6, w: 11.8, h: 0.5 });

pres.writeFile({ fileName: '/mnt/user-data/outputs/Y12_9618_Lesson_-_Wired_and_Wireless.pptx' }).then(f => console.log('wrote', f));
