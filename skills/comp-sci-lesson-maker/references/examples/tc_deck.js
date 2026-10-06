const L = require('../../scripts/lib.js');
const { C, F } = L;
const pres = L.newDeck('Network topologies and cloud computing');

// ---------- diagram helpers ----------
function pc(s, x, y, label, o = {}) {
  s.addText(label || 'PC', {
    shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.06, x: x - 0.32, y: y - 0.2, w: 0.64, h: 0.4,
    fill: { color: o.fill || C.soft }, line: { color: C.navy, width: 1 },
    fontFace: F.body, fontSize: o.fs || 11, bold: true, color: C.dark, align: 'center', valign: 'middle', margin: 0
  });
}
function line(s, x1, y1, x2, y2, o = {}) {
  const opt = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    line: { color: o.color || '7A7AA0', width: o.w || 1.5, dashType: o.dash, endArrowType: o.arrow ? 'triangle' : undefined } };
  if ((x2 - x1) * (y2 - y1) < 0) opt.flipV = true;
  if (o.arrow && x2 < x1 && y2 === y1) { opt.flipH = true; delete opt.flipV; }
  s.addShape(pres.shapes.LINE, opt);
}
function device(s, x, y, w, label, o = {}) {
  s.addText(label, { shape: pres.shapes.RECTANGLE, x: x - w / 2, y: y - 0.22, w, h: 0.44, fill: { color: o.fill || C.yellow }, line: { color: C.navy, width: 1.25 },
    fontFace: F.body, fontSize: o.fs || 12, bold: true, color: C.dark, align: 'center', valign: 'middle', margin: 0 });
}
function bus(s, x0, x1, y, n, o = {}) {
  line(s, x0, y, x1, y, { color: C.navy, w: 3 });
  [x0, x1].forEach(x => s.addShape(pres.shapes.OVAL, { x: x - 0.1, y: y - 0.1, w: 0.2, h: 0.2, fill: { color: C.dark }, line: { color: C.dark } }));
  const step = (x1 - x0) / (n + 1);
  for (let i = 1; i <= n; i++) {
    const x = x0 + i * step, up = o.alt ? (i % 2 ? -1 : 1) : -1;
    line(s, x, y, x, y + up * 0.6);
    pc(s, x, y + up * 0.8, o.labels ? o.labels[i - 1] : 'PC');
  }
  if (o.term) {
    s.addText('terminator', { x: x0 - 0.5, y: y + 0.12, w: 1.0, h: 0.25, fontFace: F.body, fontSize: 10, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
    s.addText('terminator', { x: x1 - 0.5, y: y + 0.12, w: 1.0, h: 0.25, fontFace: F.body, fontSize: 10, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
  }
}
function star(s, cx, cy, r, n, label, o = {}) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push([cx + r * Math.cos(a), cy + r * 0.8 * Math.sin(a)]); }
  pts.forEach(p => line(s, cx, cy, p[0], p[1]));
  device(s, cx, cy, o.dw || 1.0, label || 'switch');
  pts.forEach((p, i) => pc(s, p[0], p[1], o.labels ? o.labels[i] : 'PC'));
}
function mesh(s, cx, cy, r, n, o = {}) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push([cx + r * Math.cos(a), cy + r * 0.85 * Math.sin(a)]); }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) line(s, pts[i][0], pts[i][1], pts[j][0], pts[j][1], { w: 1.25 });
  pts.forEach((p, i) => pc(s, p[0], p[1], o.labels ? o.labels[i] : 'PC'));
}

// 1 Title
L.titleSlide(pres, 'Topologies & cloud', 'Y13 - Cambridge International 9618  |  2.1.3 - 2.1.4',
  'Follows the online lesson on 2.1.1-2.1.2 (LAN/MAN/WAN, client-server vs peer-to-peer, thin and thick clients). Starts with a closed-book recall test (worksheet Task 1). Exam questions used: 9618/11 Nov 2023 Q2, 9618/11 June 2024 Q5 and Q8, 9618/12 June 2024 Q3, 9618/13 June 2024 Q5.');

// 2 Recall test
let s = L.base(pres, 'Recall test: last lesson', 'Starter activity', 2,
  'Closed book, 10 minutes, worksheet Task 1. Because last lesson was online, use the results to decide what to re-teach: anything below about half marks on Q3 or Q5 (client-server/peer-to-peer, thin/thick client) is worth a 5-minute recap before moving on. Two of the questions are real exam questions (June 2024 9618/11 Q5(a) and 9618/12 Q3(b)).');
L.callout(s, 'Last lesson was online. Let us check what stuck before we build on it.', { x: 0.96, y: 1.4, w: 11.3, h: 0.5, fontSize: 18, color: C.dark });
L.table(s, [
  ['Worksheet Task 1 covers...', 'Marks'],
  ['LAN, MAN, WAN and PAN - size and description', '4'],
  ['Benefits of networking computers', '3'],
  ['Client-server or peer-to-peer?', '5'],
  ['Exam question: client and server in an online bank (June 2024)', '4'],
  ['Exam question: thin clients for online exam marking (June 2024)', '4']
], { x: 0.98, y: 2.15, w: 9.0, colW: [7.8, 1.2], rowH: 0.52 });
L.stepCard(pres, s, 1, 'Closed book', 'No notes, no slides.', { x: 10.25, y: 2.15, w: 2.35, h: 1.3, hs: 14, ds: 12 });
L.stepCard(pres, s, 2, '10 minutes', 'Then swap and mark.', { x: 10.25, y: 3.6, w: 2.35, h: 1.3, hs: 14, ds: 12 });
L.callout(s, 'Total: 20 marks. Be honest when you mark - it tells us what to revisit.', { x: 0.98, y: 5.55, w: 11.3, h: 0.5 });

// 3 Objectives
s = L.base(pres, 'In this lesson, you will', 'Objectives', 3);
L.bullets(s, [
  'Describe bus, star, mesh and hybrid topologies, and draw each one',
  'Explain how packets are transmitted in each topology, including the difference between a hub and a switch',
  'Give and explain advantages and disadvantages of each topology for a given scenario',
  'Explain public, private and hybrid cloud, and the benefits and drawbacks of cloud storage',
  'Answer real 9618 Paper 1 questions using the wording examiners reward'
], { x: 0.92, y: 1.6, w: 11.2, h: 4.2, fontSize: 18, paraSpaceAfter: 14 });

// 4 What is a topology
s = L.base(pres, 'What is a network topology?', 'Activity 1', 4,
  'A topology is the arrangement of devices and the links between them. Ask: which of these have you seen? (School network: star of stars; the internet: mesh.)');
L.callout(s, 'A topology is the way the devices (nodes) in a network are arranged and connected to each other.', { x: 0.96, y: 1.35, w: 11.3, h: 0.6, fontSize: 17, color: C.dark });
const tx = [0.8, 3.85, 6.9, 9.95];
['Bus', 'Star', 'Mesh', 'Hybrid'].forEach((t, i) => {
  s.addShape(pres.shapes.RECTANGLE, { x: tx[i], y: 2.2, w: 2.85, h: 3.9, fill: { color: C.band }, line: { color: C.band } });
  s.addText(t, { x: tx[i], y: 2.3, w: 2.85, h: 0.4, fontFace: F.body, fontSize: 17, bold: true, color: C.navy, align: 'center', margin: 0, isTextBox: true });
});
bus(s, 1.05, 3.4, 4.3, 3, { alt: true });
star(s, 5.27, 4.2, 0.95, 5, 'switch', { dw: 0.85 });
mesh(s, 8.32, 4.2, 0.95, 5);
// hybrid: bus backbone + small star
line(s, 10.15, 4.9, 12.6, 4.9, { color: C.navy, w: 3 });
line(s, 10.6, 4.9, 10.6, 5.5); pc(s, 10.6, 5.65);
line(s, 11.4, 4.9, 11.4, 4.2); device(s, 11.4, 4.0, 0.75, 'switch', { fs: 10 });
[[10.55, 3.25], [11.4, 2.95], [12.25, 3.25]].forEach(p => { line(s, 11.4, 4.0, p[0], p[1]); pc(s, p[0], p[1]); });
line(s, 12.25, 4.9, 12.25, 5.5); pc(s, 12.25, 5.65);

// 5 Bus
s = L.base(pres, 'Bus topology', 'Activity 1', 5,
  'Every packet passes every node: each node checks the destination address and ignores packets not meant for it. Only one device can transmit at a time; simultaneous transmissions cause collisions (CSMA/CD - covered later). Terminators stop the signal reflecting back along the cable.');
L.callout(s, 'All devices connect to one shared central cable (the backbone). Terminators at each end stop signals bouncing back.', { x: 0.96, y: 1.35, w: 5.9, h: 0.9, fontSize: 15, color: C.dark });
bus(s, 1.2, 6.6, 3.2, 5, { term: true, labels: ['A', 'B', 'C', 'D', 'E'] });
L.stepCard(pres, s, 1, 'How a packet travels', 'A sends to D: the packet travels along the whole cable. Every node checks the destination address; only D accepts it.', { x: 0.96, y: 4.55, w: 5.9, h: 1.6, ds: 13 });
L.table(s, [
  ['Advantages', 'Disadvantages'],
  ['Cheap: little cabling, no central device', 'If the backbone fails, the whole network fails'],
  ['Easy to add another node', 'Collisions: only one device can transmit at a time'],
  ['One failed node does not stop the others', 'Performance drops as traffic grows'],
  ['', 'Less secure: every packet passes every node']
], { x: 7.2, y: 1.5, w: 5.4, colW: [2.6, 2.8], rowH: 0.62, fontSize: 12 });

// 6 Star
s = L.base(pres, 'Star topology', 'Activity 1', 6,
  'Official mark scheme wording (9618/13 June 2024 Q5(b)): the sending computer transmits packets directly to the switch/central device; the switch checks the destination address and forwards the packet directly to that device. Most school and office LANs are stars.');
L.callout(s, 'Every device has its own cable to a central device (usually a switch). All packets go through the central device.', { x: 0.96, y: 1.35, w: 5.9, h: 0.9, fontSize: 15, color: C.dark });
star(s, 3.6, 3.85, 1.6, 5, 'switch', { labels: ['A', 'B', 'C', 'D', 'E'] });
L.table(s, [
  ['Advantages', 'Disadvantages'],
  ['Fewer collisions: each device has its own link', 'If the switch fails, the whole network fails'],
  ['One broken cable only affects one device', 'More cable, and a switch, so higher set-up cost'],
  ['Easy to add or remove devices', ''],
  ['More secure with a switch: packets go only to the destination', ''],
  ['Easy to find faults', '']
], { x: 7.2, y: 1.5, w: 5.4, colW: [2.9, 2.5], rowH: 0.6, fontSize: 12 });
L.callout(s, 'A sends to D: A -> switch, the switch reads the destination address, switch -> D only.', { x: 0.96, y: 5.85, w: 11.3, h: 0.5 });

// 7 Hub vs switch
s = L.base(pres, 'Star: hub or switch in the middle?', 'Activity 1', 7,
  'Hubs are not in the 9618 syllabus as hardware to describe, but the comparison explains why a star with a switch is more secure and has fewer collisions. A star with a hub behaves like a bus: every packet reaches every node.');
['Hub: sends every packet to every device', 'Switch: sends each packet only to its destination'].forEach((t, i) => {
  const x0 = i === 0 ? 0.8 : 6.85;
  s.addShape(pres.shapes.RECTANGLE, { x: x0, y: 1.35, w: 5.7, h: 4.3, fill: { color: C.band }, line: { color: C.band } });
  s.addText(t, { x: x0 + 0.2, y: 1.45, w: 5.3, h: 0.5, fontFace: F.body, fontSize: 15, bold: true, color: C.navy, margin: 0, isTextBox: true });
  const cx = x0 + 2.85, cy = 3.65;
  const pts = [[cx - 1.9, cy - 1.0], [cx + 1.9, cy - 1.0], [cx - 1.9, cy + 1.2], [cx + 1.9, cy + 1.2]];
  const names = ['A', 'B', 'C', 'D'];
  pts.forEach((p, j) => {
    const hot = i === 0 ? j > 0 : j === 3;
    line(s, cx, cy, p[0], p[1], { color: (j === 0 || hot) ? C.navy : 'C8C8D4', w: (j === 0 || hot) ? 2.5 : 1.25 });
    pc(s, p[0], p[1], names[j], { fill: j === 0 ? C.yellow : (hot ? C.soft : 'FFFFFF') });
  });
  device(s, cx, cy, 0.9, i === 0 ? 'hub' : 'switch');
});
L.callout(s, 'A sends a packet to D. With a hub, B, C and D all receive it (B and C ignore it). With a switch, only D receives it.', { x: 0.96, y: 5.85, w: 11.3, h: 0.7 });

// 8 Mesh
s = L.base(pres, 'Mesh topology', 'Activity 1', 8,
  'Routing mesh: nodes act like routers and send data by the best route, re-routing round failed links. Flooding mesh: data is sent to every node (no routing logic) - simple but creates extra traffic. The internet and many WANs are mesh networks.');
L.callout(s, 'Devices are interconnected so there are many routes between any two nodes. Data can be re-routed if a link fails.', { x: 0.96, y: 1.35, w: 5.9, h: 0.9, fontSize: 15, color: C.dark });
mesh(s, 3.6, 4.0, 1.6, 5, { labels: ['A', 'B', 'C', 'D', 'E'] });
L.table(s, [
  ['Advantages', 'Disadvantages'],
  ['Multiple paths: a broken link does not stop the network', 'Lots of cabling - expensive (wired mesh)'],
  ['Data can take the best/shortest route', 'Complex to set up and maintain'],
  ['Handles heavy traffic well', ''],
  ['Good privacy: packets follow dedicated routes', '']
], { x: 7.2, y: 1.5, w: 5.4, colW: [2.9, 2.5], rowH: 0.62, fontSize: 12 });
L.stepCard(pres, s, 1, 'Routing vs flooding', 'Routing: nodes choose the best route. Flooding: data is sent through every node.', { x: 7.2, y: 4.85, w: 5.4, h: 1.3, ds: 12.5 });

// 9 Hybrid
s = L.base(pres, 'Hybrid topology', 'Activity 1', 9,
  'Textbook example: three hotel chains using bus, star and mesh networks are taken over by one company and joined into a single hybrid network. Advantages and disadvantages depend on the topologies combined; the extra disadvantage is complexity.');
L.callout(s, 'A combination of two or more topologies, e.g. star networks joined by a bus backbone.', { x: 0.96, y: 1.35, w: 11.3, h: 0.5, fontSize: 16, color: C.dark });
line(s, 0.9, 4.2, 7.0, 4.2, { color: C.navy, w: 3 });
[0.9, 7.0].forEach(x => s.addShape(pres.shapes.OVAL, { x: x - 0.1, y: 4.1, w: 0.2, h: 0.2, fill: { color: C.dark }, line: { color: C.dark } }));
[[2.3, 'Office'], [5.6, 'Labs']].forEach(([x, lab]) => {
  line(s, x, 4.2, x, 3.35);
  device(s, x, 3.15, 0.95, lab, { fs: 11 });
  [[x - 1.0, 2.3], [x, 2.15], [x + 1.0, 2.3]].forEach(p => { line(s, x, 3.15, p[0], p[1]); pc(s, p[0], p[1]); });
});
line(s, 3.95, 4.2, 3.95, 4.85); pc(s, 3.95, 5.05, 'Server', { fs: 9 });
s.addText('bus backbone', { x: 5.6, y: 4.3, w: 1.6, h: 0.28, fontFace: F.body, fontSize: 11, italic: true, color: C.grey, margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'Advantages', 'Joins existing networks without rebuilding them. Handles large traffic volumes. Well suited to large networks; easy to expand.', { x: 7.6, y: 2.05, w: 5.0, h: 1.7, ds: 12.5 });
L.stepCard(pres, s, 2, 'Disadvantage', 'Complex to install, configure and maintain. Other pros and cons depend on the topologies used.', { x: 7.6, y: 3.95, w: 5.0, h: 1.5, ds: 12.5 });
L.callout(s, 'Example: a company buys three hotel chains that use bus, star and mesh networks, and joins them into one hybrid network.', { x: 0.96, y: 5.75, w: 11.3, h: 0.7 });

// 10 Comparison
s = L.base(pres, 'Comparing the topologies', 'Activity 2', 10,
  'This is exactly the knowledge tested by the June 2024 9618/11 Q8(a) tick-box question (worksheet Task 3). Students should be able to justify each cell.');
L.table(s, [
  ['', 'Bus', 'Star', 'Mesh'],
  [{ t: 'Devices connect to...', b: true }, 'one shared central cable', 'one central device (switch)', 'several other devices'],
  [{ t: 'Paths between two nodes', b: true }, 'one (the backbone)', 'one (through the switch)', 'many'],
  [{ t: 'Single point of failure', b: true }, 'the backbone cable', 'the switch', 'none'],
  [{ t: 'Collisions', b: true }, 'most likely', 'fewer (switch)', 'few'],
  [{ t: 'Who sees each packet', b: true }, 'every node', 'only the destination (switch)', 'nodes on the route'],
  [{ t: 'Cost', b: true }, 'lowest', 'medium', 'highest (wired)'],
  [{ t: 'Typical use', b: true }, 'small, light-traffic networks', 'most school / office LANs', 'the internet, WANs, sensor networks']
], { x: 0.9, y: 1.35, w: 11.5, colW: [2.9, 2.85, 2.85, 2.9], rowH: 0.6, fontSize: 13 });

// 11 Exam focus: star (show AFTER Task 4)
s = L.base(pres, 'Exam focus: packets in a star', 'Activity 2', 11,
  'Show after students attempt worksheet Task 4. Official marking points from 9618/13 May/June 2024 Q5(b) [2] and 9618/11 Oct/Nov 2023 Q2(d) [2]. Note the 2-mark "explain" pattern: a point, then an expansion that applies it to the scenario.');
L.text(s, 'June 2024 (9618/13) Q5(b): Explain how packets are transmitted between two devices in a star topology. [2]', { x: 0.92, y: 1.3, w: 11.3, h: 0.5, fontSize: 15, bold: true });
L.table(s, [
  ['Mark', 'Marking point (official)'],
  ['1', 'The sending computer transmits the packet directly to the switch / central device'],
  ['1', 'The switch checks the destination address of the packet and forwards it directly to that device']
], { x: 0.98, y: 1.9, w: 11.36, colW: [1.0, 10.36], rowH: 0.5 });
L.text(s, 'Nov 2023 (9618/11) Q2(d): 20 computers and a switch. Explain one advantage of a star instead of a bus. [2]', { x: 0.92, y: 3.55, w: 11.3, h: 0.5, fontSize: 15, bold: true });
L.table(s, [
  ['Advantage (1 mark)', '... expansion (1 mark)'],
  ['More resilient to faults', 'no single shared cable, so less disruption to teaching'],
  ['Higher performance as fewer collisions', 'each device is only connected to the switch'],
  ['Easier to add new nodes', 'each device connects directly to the switch'],
  ['Easier to find faults than in a bus', '']
], { x: 0.98, y: 4.25, w: 11.36, colW: [4.5, 6.86], rowH: 0.44, fontSize: 13 });

// 12 Think pair share
s = L.base(pres, 'Think, pair, share', 'Activity 2', 12,
  'Good answers: Star - a school ICT suite (cheap switch, easy to add PCs, one cable fault only affects one PC). Mesh - a hospital patient-monitoring sensor network or a bank WAN (no single point of failure, re-routing). Bus - a small temporary office with light traffic (cheapest).');
L.text(s, 'Choose the best topology for each scenario, and justify it with one advantage that is relevant to that scenario.', { x: 0.96, y: 1.45, w: 11.3, h: 0.8, fontSize: 18 });
L.stepCard(pres, s, 1, 'A school ICT suite with 30 PCs', '', { x: 0.96, y: 2.55, w: 11.3, h: 0.8, hs: 17 });
L.stepCard(pres, s, 2, 'Sensors monitoring patients across a hospital', '', { x: 0.96, y: 3.5, w: 11.3, h: 0.8, hs: 17 });
L.stepCard(pres, s, 3, 'A small temporary office with 4 laptops and light traffic', '', { x: 0.96, y: 4.45, w: 11.3, h: 0.8, hs: 17 });
L.callout(s, 'Exam tip: "Explain" = make the point, then say why it matters in THIS scenario.', { x: 0.96, y: 5.6, w: 11.3, h: 0.5 });

// 13 Cloud computing
s = L.base(pres, 'Cloud computing and cloud storage', 'Activity 3', 13,
  'Cloud storage is one part of cloud computing (others: cloud software, databases, analytics). Data redundancy: the same data is kept on more than one server so it is still available during maintenance, repair or failure.');
L.callout(s, 'Cloud storage: data is stored on off-site servers, owned and managed by a hosting company, and accessed over the internet.', { x: 0.96, y: 1.35, w: 11.3, h: 0.7, fontSize: 16, color: C.dark });
s.addText('internet', { shape: pres.shapes.CLOUD, x: 4.3, y: 2.55, w: 2.6, h: 1.6, fill: { color: 'E6EEFB' }, line: { color: C.navy, width: 1.25 }, fontFace: F.body, fontSize: 14, bold: true, color: C.navy, align: 'center', valign: 'middle', margin: 0 });
[['Laptop', 2.65], ['Phone', 3.35], ['Tablet', 4.05]].forEach(([n, y]) => { pc(s, 1.6, y, n, { fs: 9 }); line(s, 1.95, y, 4.4, 3.35); });
[2.65, 3.35, 4.05].forEach((y, i) => { s.addText('server', { shape: pres.shapes.RECTANGLE, x: 8.0, y: y - 0.22, w: 1.0, h: 0.44, fill: { color: C.yellow }, line: { color: C.navy, width: 1 }, fontFace: F.body, fontSize: 10, bold: true, align: 'center', valign: 'middle', margin: 0 }); line(s, 6.85, 3.35, 8.0, y); });
s.addText('same data copied on several servers = data redundancy', { x: 7.3, y: 4.4, w: 2.4, h: 0.6, fontFace: F.body, fontSize: 10.5, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'Redundancy', 'The same data is stored on more than one server, so it is still available if one is down for maintenance or repair.', { x: 9.75, y: 2.3, w: 2.85, h: 2.7, ds: 12 });
L.callout(s, 'Cloud computing also includes cloud software: applications hosted and maintained by the provider and used through a browser or app.', { x: 0.96, y: 5.4, w: 11.3, h: 0.7 });

// 14 Public / private / hybrid
s = L.base(pres, 'Public, private and hybrid cloud', 'Activity 3', 14,
  'Official definition of private cloud (9618/13 June 2024 Q5(a)(i)): dedicated / bespoke services or storage on a remote server only available to the company. Public cloud: the customer and the cloud provider are different companies; services are offered to anyone over the internet.');
L.table(s, [
  ['', 'Public cloud', 'Private cloud', 'Hybrid cloud'],
  [{ t: 'Who provides it', b: true }, 'A third-party provider (a different company)', 'Dedicated to one organisation, behind its firewall', 'A mix of both'],
  [{ t: 'Who can use it', b: true }, 'Anyone who pays / signs up', 'Only that organisation', 'Sensitive data private; the rest public'],
  [{ t: 'Control of security & backup', b: true }, 'The provider', 'The organisation', 'Split'],
  [{ t: 'Cost', b: true }, 'Low start-up; pay as you go', 'High start-up and running costs', 'In between'],
  [{ t: 'Example', b: true }, 'Students saving work to a free cloud drive', 'A bank storing customer records', 'A hospital: patient records private, public website files public']
], { x: 0.9, y: 1.35, w: 11.5, colW: [2.6, 2.95, 2.95, 3.0], rowH: 0.72, fontSize: 12.5 });
L.callout(s, 'Learn the private cloud definition: storage/services on a remote server dedicated to, and only available to, one company.', { x: 0.9, y: 5.85, w: 11.5, h: 0.6 });

// 15 Pros and cons
s = L.base(pres, 'Benefits and drawbacks of cloud storage', 'Activity 3', 15,
  'Exam answers must be specific: "needs internet" alone is weak; "cannot access their files without a reliable internet connection" earns the mark (Nov 2023 9618/11 Q2(c)).');
L.table(s, [
  ['Benefits', 'Drawbacks'],
  ['Access files from any device, anywhere, with internet access', 'No access without a reliable internet connection'],
  ['No need to carry storage devices', 'Free space is limited - more storage must be paid for'],
  ['Remote backup helps disaster recovery', 'Users depend on a third party for security and backups'],
  ['Data redundancy keeps data available', 'Large uploads/downloads use data allowance'],
  ['Almost unlimited, scalable capacity', 'If the provider fails, data could be lost'],
  ['Provider handles maintenance and upgrades', 'Hacking of accounts / data breaches']
], { x: 0.9, y: 1.35, w: 11.5, colW: [5.75, 5.75], rowH: 0.62, fontSize: 13.5 });

// 16 Security
s = L.base(pres, 'Security and data loss in the cloud', 'Activity 3', 16,
  'Textbook examples: the XEN hypervisor flaw forced providers to reboot servers; a provider permanently lost data during a routine backup; celebrity photo leaks from hacked cloud accounts; 93 million Mexican voter records exposed (2016). Use these to discuss why a bank might choose a private cloud.');
L.callout(s, 'A company that moves its data to a public cloud gives up direct control of its data security.', { x: 0.96, y: 1.35, w: 11.3, h: 0.5, fontSize: 16, color: C.dark });
L.stepCard(pres, s, 1, 'Physical security', 'How well protected is the building that houses the servers?', { x: 0.96, y: 2.1, w: 3.6, h: 1.6 });
L.stepCard(pres, s, 2, 'Disasters', 'How resilient is the provider to fires, floods and outages?', { x: 4.82, y: 2.1, w: 3.6, h: 1.6 });
L.stepCard(pres, s, 3, 'Staff and hackers', 'Could provider staff or hackers access confidential data?', { x: 8.68, y: 2.1, w: 3.6, h: 1.6 });
L.text(s, 'Real incidents: a provider permanently lost customer data during a routine backup; hacked cloud accounts leaked private photos; 93 million voter records were exposed in 2016.', { x: 0.96, y: 4.05, w: 11.3, h: 0.9, fontSize: 15 });
L.callout(s, 'This is why organisations with sensitive data often choose a private or hybrid cloud.', { x: 0.96, y: 5.2, w: 11.3, h: 0.5 });

// 17 Exam focus: cloud (show AFTER Task 5)
s = L.base(pres, 'Exam focus: cloud questions', 'Activity 3', 17,
  'Show after students attempt worksheet Task 5. Official marking points: 9618/13 May/June 2024 Q5(a)(ii) [3] and 9618/11 Oct/Nov 2023 Q2(c) [2].');
L.text(s, 'June 2024 (9618/13) Q5(a)(ii): benefits to a company of private instead of public cloud storage. [3]', { x: 0.92, y: 1.3, w: 11.3, h: 0.5, fontSize: 15, bold: true });
L.table(s, [
  ['Marking point (official, any 3)'],
  ['Not reliant on a third party ...'],
  ['... gives greater control over security / privacy'],
  ['... gives greater control over backup'],
  ['Storage can be tailored / scaled to the company\'s requirements']
], { x: 0.98, y: 2.0, w: 11.36, colW: [11.36], rowH: 0.4, fontSize: 13 });
L.text(s, 'Nov 2023 (9618/11) Q2(c): two drawbacks of students storing files on a public cloud. [2]', { x: 0.92, y: 4.25, w: 11.3, h: 0.5, fontSize: 15, bold: true });
L.table(s, [
  ['Marking point (official, any 2)'],
  ['Cannot access their files without a reliable internet connection'],
  ['Free space may be limited, so they may have to buy more'],
  ['No control over backup / security - dependent on a third party']
], { x: 0.98, y: 4.8, w: 11.36, colW: [11.36], rowH: 0.4, fontSize: 13 });

// 18 Guided practice
s = L.base(pres, 'Guided practice', 'Activity 4', 18,
  'Task 1 was the recall test. Tasks 2-5 on paper (about 30 minutes); Task 6 extension. Show slides 11 and 17 after Tasks 4 and 5 so students can self-mark against the official points.');
L.bullets(s, [
  'Task 2: draw bus and star networks, and identify topologies from descriptions',
  'Task 3: the June 2024 tick-box question, then trace a packet through a bus, a hub and a switch',
  'Task 4: real exam questions on topologies (Nov 2023, June 2024)',
  'Task 5: real exam questions on public and private cloud',
  'Task 6 (extension): peer-to-peer vs mesh, and choosing a cloud for a scenario',
  'Check your work against the answer key when your teacher shares it'
], { x: 0.96, y: 1.42, w: 11.26, h: 4.8, fontSize: 17, paraSpaceAfter: 12 });

// 19 Misconceptions
s = L.base(pres, 'Common misconceptions', 'Plenary', 19);
L.table(s, [
  ['Misconception', 'Why it is wrong'],
  ['"In a star, packets go to every computer."', 'Only with a hub. A switch checks the destination address and forwards to that device only.'],
  ['"A star has no single point of failure."', 'If the central switch fails, the whole network fails.'],
  ['"Mesh means peer-to-peer."', 'Mesh is a physical layout of links; peer-to-peer is a model of how nodes share resources.'],
  ['"Private cloud means storing data on your own computer."', 'It is still remote server storage - but dedicated to one organisation only.'],
  ['"The cloud needs internet" is enough for the mark.', 'Be specific: users cannot access files without a reliable internet connection.']
], { x: 0.77, y: 1.4, w: 11.8, colW: [4.7, 7.1], rowH: 0.72, fontSize: 14 });

// 20 Exit
s = L.base(pres, 'Exit question', 'Plenary', 20,
  'Model answer: Star (1). Each laptop/device has its own connection to a switch, so one faulty cable only affects one device // the switch only forwards packets to the destination so fewer collisions and better performance (1 for expansion). Private cloud (1) because patient records are confidential: the clinic is not reliant on a third party and has greater control over security/privacy (1).');
L.callout(s, 'A medical clinic is setting up a new LAN with 15 computers. It also needs to store confidential patient records.', { x: 0.96, y: 1.6, w: 11.3, h: 0.9, fontSize: 18, color: C.dark });
L.callout(s, '1. Which topology would you recommend for the LAN? Explain one advantage for the clinic. [2]', { x: 0.96, y: 2.8, w: 11.3, h: 0.8, fontSize: 18, color: C.dark });
L.callout(s, '2. Should the patient records be stored on a public or a private cloud? Justify your answer. [2]', { x: 0.96, y: 3.8, w: 11.3, h: 0.8, fontSize: 18, color: C.dark });

// 21 Summary
s = L.base(pres, 'In this lesson, you', 'Summary', 21);
L.bullets(s, [
  'Checked your recall of LANs/WANs, client-server and thin/thick clients',
  'Described and drew bus, star, mesh and hybrid topologies',
  'Explained how packets travel in each topology, and why a switch beats a hub',
  'Compared public, private and hybrid cloud, and the benefits and drawbacks of cloud storage',
  'Answered real 9618 Paper 1 questions using the official marking points'
], { x: 0.96, y: 1.55, w: 11.26, h: 3.8, fontSize: 18, paraSpaceAfter: 14 });
L.callout(s, 'Next lesson: 2.1.5 - wired and wireless networking (Wi-Fi, Bluetooth and cables).', { x: 0.96, y: 5.4, w: 11.26, h: 0.5 });

pres.writeFile({ fileName: '/mnt/user-data/outputs/Y13_9618_Lesson_-_Topologies_and_Cloud.pptx' }).then(f => console.log('wrote', f));
