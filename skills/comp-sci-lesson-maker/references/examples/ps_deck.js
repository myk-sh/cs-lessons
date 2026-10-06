const L = require('../../scripts/lib.js');
const { C, F } = L;
const pres = L.newDeck('Packet switching');
const RED = 'C0392B';

function line(s, x1, y1, x2, y2, o = {}) {
  const opt = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    line: { color: o.color || 'B8B8C8', width: o.w || 1.5, dashType: o.dash, endArrowType: o.arrow ? 'triangle' : undefined } };
  if ((x2 - x1) * (y2 - y1) < 0) opt.flipV = true;
  if (o.arrow && x2 < x1 && y1 === y2) opt.flipH = true;
  s.addShape(pres.shapes.LINE, opt);
}
function box(s, x, y, w, h, t, o = {}) {
  s.addText(t, { shape: o.round ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE, rectRadius: 0.08, x, y, w, h,
    fill: { color: o.fill || C.soft }, line: { color: o.lc || C.navy, width: o.lw || 1 },
    fontFace: o.mono ? F.mono : F.body, fontSize: o.fs || 12, bold: o.b !== false, color: o.color || C.dark, align: 'center', valign: 'middle', margin: 0 });
}
// packet bar: header | payload | trailer
function packetBar(s, x, y, w, h, o = {}) {
  const hw = w * 0.42, pw = w * 0.38, tw = w - hw - pw;
  box(s, x, y, hw, h, o.h || 'HEADER', { fill: C.navy, color: 'FFFFFF', fs: o.fs || 14 });
  box(s, x + hw, y, pw, h, o.p || 'PAYLOAD', { fill: C.yellow, fs: o.fs || 14 });
  box(s, x + hw + pw, y, tw, h, o.t || 'TRAILER', { fill: 'E6E6EE', fs: o.fs || 14 });
  return [hw, pw, tw];
}
// router network
const N = { A: [1.0, 3.9], R1: [2.5, 3.9], R2: [4.1, 2.7], R3: [5.7, 2.7], R4: [4.1, 3.9], R5: [5.7, 3.9], R6: [4.1, 5.1], R7: [5.7, 5.1], R8: [7.2, 3.9], B: [8.7, 3.9] };
const E = [['A', 'R1'], ['R1', 'R2'], ['R1', 'R4'], ['R1', 'R6'], ['R2', 'R3'], ['R4', 'R5'], ['R6', 'R7'], ['R3', 'R8'], ['R5', 'R8'], ['R7', 'R8'], ['R2', 'R5'], ['R4', 'R7'], ['R8', 'B']];
function network(s, routes, dx = 0, dy = 0) {
  const key = (a, b) => [a, b].sort().join('-');
  const col = {};
  (routes || []).forEach(r => { for (let i = 0; i < r.path.length - 1; i++) { const k = key(r.path[i], r.path[i + 1]); if (k !== 'A-R1' && k !== 'B-R8') col[k] = r.color; } });
  E.forEach(([a, b]) => { const k = key(a, b); line(s, N[a][0] + dx, N[a][1] + dy, N[b][0] + dx, N[b][1] + dy, { color: col[k] || 'B8B8C8', w: col[k] ? 4 : 1.5 }); });
  Object.entries(N).forEach(([n, [x, y]]) => {
    const end = n === 'A' || n === 'B';
    box(s, x + dx - (end ? 0.42 : 0.3), y + dy - 0.22, end ? 0.84 : 0.6, 0.44, end ? (n === 'A' ? 'Sender' : 'Receiver') : n,
      { fill: end ? C.soft : 'FFFFFF', fs: end ? 10 : 11, round: !end });
  });
}

// 1
L.titleSlide(pres, 'Packet switching', 'IGCSE Computer Science 0478  |  2.1',
  'Covers syllabus 2.1 1(a) data is broken into packets, (b) structure of a packet, (c) the process of packet switching. Starter T/F statements are revisited in the plenary.');

// 2 starter
let s = L.base(pres, 'True or False?', 'Starter activity', 2,
  'Prior-knowledge check - do not give answers yet; students revisit Task 1 at the end. Answers: 1 False (it is broken into packets). 2 True. 3 False (packets can take different routes). 4 True. 5 False (routers decide the route; the sender does not).');
L.text(s, 'What do you already know? Decide True or False - we will come back to these at the end.', { x: 0.92, y: 1.3, w: 11, h: 0.4 });
L.table(s, [
  ['Statement', 'True', 'False'],
  ['A large file is sent across the internet in one piece.', '', ''],
  ['Each packet contains the address of the computer it is going to.', '', ''],
  ['All the packets in a message must travel along the same route.', '', ''],
  ['Packets can arrive at the destination in a different order from the order they were sent in.', '', ''],
  ['The sending computer decides the route that every packet takes.', '', '']
], { x: 1.04, y: 1.85, w: 11.25, colW: [8.85, 1.2, 1.2], rowH: 0.62 });

// 3 objectives
s = L.base(pres, 'In this lesson, you will', 'Objectives', 3);
L.bullets(s, [
  'Explain why data is broken down into packets before it is transmitted',
  'Describe the structure of a packet: header, payload and trailer',
  'State what the packet header contains: destination address, packet number and originator\'s address',
  'Describe the process of packet switching, including the role of the router'
], { x: 0.92, y: 1.6, w: 11.2, h: 4.2, fontSize: 19, paraSpaceAfter: 16 });

// 4 why packets
s = L.base(pres, 'Why break data into packets?', 'Activity 1', 4,
  'Analogy: posting a 300-page book as 300 numbered postcards. Each postcard can travel separately, a lost one can be re-sent on its own, and the numbers let the reader put them back in order. Syllabus 1(a) only requires "understand that data is broken down into packets", but the reasons help students describe packet switching.');
L.callout(s, 'Before data is sent across a network, it is broken down into small, equal-sized units called packets.', { x: 0.96, y: 1.35, w: 11.3, h: 0.55, fontSize: 17, color: C.dark });
box(s, 0.96, 2.35, 2.2, 1.5, 'video.mp4\n(one large file)', { fill: C.soft, fs: 14 });
L.arrow(pres, s, 3.35, 3.1, 4.35, 3.1, C.navy, 2.5);
for (let i = 0; i < 8; i++) box(s, 4.55 + (i % 4) * 0.75, 2.35 + Math.floor(i / 4) * 0.8, 0.62, 0.62, String(i + 1), { fill: C.yellow, fs: 13 });
s.addText('numbered packets', { x: 4.55, y: 3.95, w: 2.9, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'Share the network', 'Small packets from many users can share the same cables and routers.', { x: 7.9, y: 2.2, w: 4.7, h: 1.15 });
L.stepCard(pres, s, 2, 'Avoid busy or broken links', 'Each packet can take whichever route is free.', { x: 7.9, y: 3.5, w: 4.7, h: 1.15 });
L.stepCard(pres, s, 3, 'Re-send less', 'If one packet is lost or corrupted, only that packet is sent again.', { x: 7.9, y: 4.8, w: 4.7, h: 1.15 });
L.callout(s, 'Think of posting a book as numbered postcards rather than one heavy parcel.', { x: 0.96, y: 4.6, w: 6.6, h: 0.8 });

// 5 structure
s = L.base(pres, 'The structure of a packet', 'Activity 1', 5,
  'Syllabus 1(b): a packet contains a packet header, payload and trailer. Use the envelope analogy: the header is the address written on the envelope, the payload is the letter inside, and the trailer is like a seal that shows where it ends and whether it has been tampered with.');
L.callout(s, 'Every packet has three parts.', { x: 0.96, y: 1.35, w: 11.3, h: 0.45, fontSize: 17, color: C.dark });
packetBar(s, 0.96, 2.0, 11.3, 0.9, { fs: 18 });
L.stepCard(pres, s, 1, 'Packet header', 'Control information that tells the network where the packet is going, where it came from and which packet it is.', { x: 0.96, y: 3.25, w: 4.6, h: 1.75 });
L.stepCard(pres, s, 2, 'Payload', 'The actual data being sent - one piece of the original file or message.', { x: 5.72, y: 3.25, w: 3.4, h: 1.75 });
L.stepCard(pres, s, 3, 'Trailer', 'Marks the end of the packet, and holds a value used to check for errors.', { x: 9.28, y: 3.25, w: 2.98, h: 1.75 });
L.callout(s, 'Envelope analogy: header = address on the envelope; payload = the letter inside; trailer = the seal at the end.', { x: 0.96, y: 5.35, w: 11.3, h: 0.7 });

// 6 header
s = L.base(pres, 'What is in the packet header?', 'Activity 1', 6,
  'These three items are exactly what the syllabus lists, so they are the safest answers in an exam. Use "originator\'s address" or "sender\'s address" - both are clear. Real headers hold more (e.g. packet size, hop count) but students only need these three.');
packetBar(s, 0.96, 1.4, 11.3, 0.7, { h: 'HEADER  (zoomed in below)', fs: 14 });
L.table(s, [
  ['Header item', 'What it is', 'Why it is needed'],
  ['Destination address', 'The IP address of the device the packet is going to', 'So each router knows where to send the packet next'],
  ['Packet number', 'The position of this packet in the message, e.g. 3 of 8', 'So the receiver can put the packets back in the correct order, and spot any that are missing'],
  ['Originator\'s address', 'The IP address of the device that sent the packet', 'So the receiver knows who sent it, and can ask for a missing packet to be re-sent']
], { x: 0.96, y: 2.45, w: 11.3, colW: [2.6, 4.0, 4.7], rowH: 0.8, fontSize: 14 });
L.callout(s, 'Learn all three: destination address, packet number, originator\'s address.', { x: 0.96, y: 5.85, w: 11.3, h: 0.5 });

// 7 worked example
s = L.base(pres, 'Worked example: HELLO WORLD', 'Activity 1', 7,
  'Each payload holds 3 characters here (real payloads are much bigger - often around 1500 bytes). Point out the space character counts as data. Task 3 asks students to do the same with a different message.');
L.text(s, 'The message HELLO WORLD is sent from 82.10.4.2 to 192.168.0.7. Each payload holds 3 characters.', { x: 0.96, y: 1.35, w: 11.3, h: 0.5 });
const pk = ['HEL', 'LO ', 'WOR', 'LD'];
pk.forEach((p, i) => {
  const y = 2.05 + i * 0.95;
  s.addText('Packet ' + (i + 1), { x: 0.96, y, w: 1.3, h: 0.75, fontFace: F.body, fontSize: 13, bold: true, color: C.navy, valign: 'middle', margin: 0, isTextBox: true });
  packetBar(s, 2.3, y, 9.9, 0.75, { h: 'To: 192.168.0.7   From: 82.10.4.2   No: ' + (i + 1) + ' of 4', p: '"' + p + '"', t: 'end + check', fs: 11 });
});
L.callout(s, 'Every packet carries the same addresses, but its own packet number and its own part of the data.', { x: 0.96, y: 5.95, w: 11.3, h: 0.5 });

// 8 packet switching diagram
s = L.base(pres, 'Packet switching', 'Activity 2', 8,
  'Packets 1, 2 and 3 leave the sender in order but take different routes through the routers. Ask: which packet do you think arrives first? (Fewest hops is not always fastest - it depends on how busy each router is.)');
L.callout(s, 'Each packet can take a different route across the network. Routers decide the route.', { x: 0.96, y: 1.35, w: 11.3, h: 0.5, fontSize: 17, color: C.dark });
network(s, [
  { path: ['A', 'R1', 'R2', 'R3', 'R8', 'B'], color: C.navy },
  { path: ['A', 'R1', 'R4', 'R5', 'R8', 'B'], color: 'E0A800' },
  { path: ['A', 'R1', 'R6', 'R7', 'R8', 'B'], color: RED }
], 0.2, 0.1);
[['1', C.navy, 4.9, 2.42], ['2', 'E0A800', 4.9, 3.62], ['3', RED, 4.9, 4.82]].forEach(([t, c, x, y]) => box(s, x + 0.2, y + 0.1 - 0.28, 0.4, 0.4, t, { fill: c, color: 'FFFFFF', fs: 12, lc: c }));
L.stepCard(pres, s, 1, 'Packet 1', 'R1 > R2 > R3 > R8', { x: 9.75, y: 2.2, w: 2.85, h: 1.0, ds: 12 });
L.stepCard(pres, s, 2, 'Packet 2', 'R1 > R4 > R5 > R8', { x: 9.75, y: 3.35, w: 2.85, h: 1.0, ds: 12 });
L.stepCard(pres, s, 3, 'Packet 3', 'R1 > R6 > R7 > R8', { x: 9.75, y: 4.5, w: 2.85, h: 1.0, ds: 12 });

// 9 the process
s = L.base(pres, 'The process of packet switching', 'Activity 2', 9,
  'These five steps are the syllabus bullet points for 1(c), so they map directly onto marking points. Students should be able to write all five in order for a "describe the process" question.');
const steps = [
  ['Data is broken down into packets', 'Each packet gets a header (with a packet number) and a trailer.'],
  ['Each packet could take a different route', 'Packets are sent separately across the network.'],
  ['A router controls the route a packet takes', 'Each router reads the destination address and sends the packet on to the next router.'],
  ['Packets may arrive out of order', 'Different routes can be busier or longer than others.'],
  ['Once the last packet has arrived, the packets are reordered', 'The receiver uses the packet numbers to put the data back together.']
];
steps.forEach(([h, d], i) => L.stepCard(pres, s, i + 1, h, d, { x: 0.96, y: 1.35 + i * 1.0, w: 11.3, h: 0.9, ds: 12.5 }));

// 10 reordering
s = L.base(pres, 'Reordering the packets', 'Activity 2', 10,
  'The receiving computer waits until the last packet has arrived, then uses the packet numbers in the headers to reassemble the message. If a packet is missing, it can request it again using the originator\'s address.');
L.text(s, 'Order the packets arrived in:', { x: 0.96, y: 1.4, w: 5, h: 0.4, bold: true });
[['3', 'WOR'], ['1', 'HEL'], ['4', 'LD'], ['2', 'LO ']].forEach(([n, p], i) => {
  box(s, 0.96 + i * 2.0, 1.95, 0.55, 0.65, n, { fill: C.navy, color: 'FFFFFF', fs: 14 });
  box(s, 1.51 + i * 2.0, 1.95, 1.2, 0.65, p, { fill: C.yellow, fs: 14, mono: true });
});
L.arrow(pres, s, 4.6, 2.85, 4.6, 3.55, C.navy, 2.5);
s.addText('sort by packet number', { x: 4.8, y: 2.95, w: 3, h: 0.4, fontFace: F.body, fontSize: 12, italic: true, color: C.grey, margin: 0, isTextBox: true });
L.text(s, 'After reordering:', { x: 0.96, y: 3.65, w: 5, h: 0.4, bold: true });
[['1', 'HEL'], ['2', 'LO '], ['3', 'WOR'], ['4', 'LD']].forEach(([n, p], i) => {
  box(s, 0.96 + i * 2.0, 4.2, 0.55, 0.65, n, { fill: C.navy, color: 'FFFFFF', fs: 14 });
  box(s, 1.51 + i * 2.0, 4.2, 1.2, 0.65, p, { fill: C.yellow, fs: 14, mono: true });
});
L.callout(s, 'Message: HELLO WORLD', { x: 0.96, y: 5.1, w: 7.5, h: 0.5, fontSize: 18 });
L.stepCard(pres, s, 1, 'Wait for all packets', 'The packet number shows how many packets to expect.', { x: 9.1, y: 1.95, w: 3.5, h: 1.45, ds: 12 });
L.stepCard(pres, s, 2, 'Missing packet?', 'The receiver can ask the originator to re-send just that packet.', { x: 9.1, y: 3.6, w: 3.5, h: 1.45, ds: 12 });

// 11 router
s = L.base(pres, 'The role of the router', 'Activity 2', 11,
  'Syllabus: "a router controls the route a packet takes". Hop numbers are not in the 0478 syllabus wording but appear in the textbook - an extension point: a hop count stops a lost packet bouncing between routers forever.');
L.callout(s, 'A router controls the route a packet takes.', { x: 0.96, y: 1.35, w: 11.3, h: 0.5, fontSize: 17, color: C.dark });
packetBar(s, 0.96, 2.1, 5.2, 0.7, { h: 'to 192.168.0.7 ...', p: 'data', t: 'end', fs: 11 });
L.arrow(pres, s, 6.35, 2.45, 7.2, 2.45, C.navy, 2.5);
box(s, 7.35, 2.15, 1.2, 0.6, 'Router', { fill: C.yellow, fs: 13, round: true });
L.arrow(pres, s, 8.7, 2.3, 9.8, 1.85, C.navy, 2);
L.arrow(pres, s, 8.7, 2.6, 9.8, 3.05, 'B8B8C8', 2);
s.addText('free route - send this way', { x: 9.9, y: 1.6, w: 2.7, h: 0.4, fontFace: F.body, fontSize: 11, color: C.navy, margin: 0, isTextBox: true });
s.addText('busy route', { x: 9.9, y: 2.85, w: 2.7, h: 0.4, fontFace: F.body, fontSize: 11, color: C.grey, margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'Reads the header', 'Looks at the destination address of each packet it receives.', { x: 0.96, y: 3.55, w: 3.65, h: 1.5 });
L.stepCard(pres, s, 2, 'Chooses the next step', 'Decides which router to send it to next, e.g. avoiding busy or broken links.', { x: 4.78, y: 3.55, w: 3.65, h: 1.5 });
L.stepCard(pres, s, 3, 'Forwards it', 'Sends it on - this repeats at every router until the packet reaches its destination.', { x: 8.6, y: 3.55, w: 3.65, h: 1.5 });
L.callout(s, 'Extension: a hop number in the header goes down by 1 at each router, so a lost packet cannot bounce around forever.', { x: 0.96, y: 5.4, w: 11.3, h: 0.7, color: C.grey });

// 12 benefits & drawbacks
s = L.base(pres, 'Benefits and drawbacks', 'Activity 3', 12,
  'Not listed in the 0478 syllabus notes, but they help students explain why packet switching is used and appear in the textbook. Keep it brief.');
L.table(s, [
  ['Benefits', 'Drawbacks'],
  ['No single dedicated line is needed - the network is shared', 'Packets can arrive out of order, so they must be reordered'],
  ['Packets can be re-routed around busy or broken links', 'Delays while waiting for the last packet - can affect live video calls'],
  ['If a packet is lost or corrupted, only that packet is re-sent', 'Packets can be lost and need to be re-sent'],
  ['Harder to intercept a whole message, as packets travel separately', 'Extra data in every header and trailer']
], { x: 0.96, y: 1.4, w: 11.3, colW: [5.65, 5.65], rowH: 0.75, fontSize: 14 });

// 13 think pair share
s = L.base(pres, 'Think, pair, share', 'Activity 3', 13,
  'Good answers: packet 1 took a longer or busier route (more routers, or congested routers), so packet 3 overtook it. The receiver is not confused because it uses the packet numbers in the headers to reorder them once the last packet has arrived.');
L.text(s, 'Packet 3 of a message arrives before packet 1.', { x: 0.96, y: 1.5, w: 11, h: 0.6, fontSize: 20, bold: true });
L.stepCard(pres, s, 1, 'How could this happen?', '', { x: 0.96, y: 2.4, w: 11.3, h: 0.8, hs: 17 });
L.stepCard(pres, s, 2, 'How does the receiving computer still get the message right?', '', { x: 0.96, y: 3.35, w: 11.3, h: 0.8, hs: 17 });
L.callout(s, 'Use the words: route, router, packet number, reorder.', { x: 0.96, y: 4.5, w: 11.3, h: 0.5 });

// 14 exam focus
s = L.base(pres, 'Exam focus: describe packet switching', 'Activity 3', 14,
  'Show AFTER students attempt worksheet Task 4(c). These are suggested marking points built from the syllabus wording (the syllabus notes are what the mark scheme credits). One mark per point.');
L.text(s, 'Describe the process of packet switching. [5]', { x: 0.96, y: 1.3, w: 11.3, h: 0.45, fontSize: 16, bold: true });
L.table(s, [
  ['Mark', 'Marking point (one mark each)'],
  ['1', 'The data is broken down into packets'],
  ['1', 'Each packet could take a different route'],
  ['1', 'A router controls the route each packet takes // routers read the destination address and forward the packet'],
  ['1', 'Packets may arrive out of order'],
  ['1', 'Once the last packet has arrived, the packets are reordered (using the packet numbers)']
], { x: 0.96, y: 1.85, w: 11.3, colW: [1.0, 10.3], rowH: 0.56 });
L.callout(s, 'Weak: "the packets go to the other computer". Strong: name the router, the different routes, the packet numbers and the reordering.', { x: 0.96, y: 5.45, w: 11.3, h: 0.7 });

// 15 guided practice
s = L.base(pres, 'Guided practice', 'Activity 4', 15, 'About 20 minutes. Task 5 is an extension.');
L.bullets(s, [
  'Task 2: label the parts of a packet and name what is in the header',
  'Task 3: split a message into packets, then reorder packets that arrive out of order',
  'Task 4: exam-style questions on packets and packet switching',
  'Task 5 (extension): packet switching and live video calls',
  'Check your work against the answer key when your teacher shares it'
], { x: 0.96, y: 1.42, w: 11.26, h: 4.8, fontSize: 18, paraSpaceAfter: 14 });

// 16 misconceptions
s = L.base(pres, 'Common misconceptions', 'Plenary', 16, 'Then return to the starter (Task 1) and correct it.');
L.table(s, [
  ['Misconception', 'Why it is wrong'],
  ['"All packets follow the same route."', 'Each packet could take a different route - routers decide for each one.'],
  ['"The sender chooses the route."', 'Routers control the route, using the destination address in the header.'],
  ['"The payload holds the addresses."', 'Addresses are in the header. The payload is only the actual data.'],
  ['"Packets are reordered as each one arrives."', 'They are reordered once the last packet has arrived, using the packet numbers.']
], { x: 0.77, y: 1.4, w: 11.8, colW: [4.6, 7.2], rowH: 0.72, fontSize: 14.5 });
L.callout(s, 'Now go back to your starter answers (Task 1). Were you right?', { x: 0.77, y: 5.3, w: 11.8, h: 0.5 });

// 17 exit
s = L.base(pres, 'Exit question', 'Plenary', 17,
  'Answers: 1 header, payload, trailer. 2 destination address, packet number, originator\'s address. 3 the packet number - the receiver uses it to reorder the packets once the last one has arrived.');
L.callout(s, '1. Name the three parts of a packet.', { x: 0.96, y: 1.6, w: 11.3, h: 0.6, fontSize: 19, color: C.dark });
L.callout(s, '2. Name the three items in a packet header.', { x: 0.96, y: 2.4, w: 11.3, h: 0.6, fontSize: 19, color: C.dark });
L.callout(s, '3. Which header item is used to put the message back together, and when?', { x: 0.96, y: 3.2, w: 11.3, h: 0.8, fontSize: 19, color: C.dark });

// 18 summary
s = L.base(pres, 'In this lesson, you', 'Summary', 18);
L.bullets(s, [
  'Learnt that data is broken down into packets before it is transmitted',
  'Described the structure of a packet: header, payload and trailer',
  'Named the header contents: destination address, packet number, originator\'s address',
  'Described packet switching: different routes, routers, out-of-order arrival and reordering'
], { x: 0.96, y: 1.55, w: 11.26, h: 3.8, fontSize: 19, paraSpaceAfter: 16 });
L.callout(s, 'Next lesson: 2.1 methods of data transmission - serial and parallel, simplex, half-duplex and full-duplex.', { x: 0.96, y: 5.4, w: 11.26, h: 0.5 });

pres.writeFile({ fileName: '/mnt/user-data/outputs/IGCSE_0478_Lesson_-_Packet_Switching.pptx' }).then(f => console.log('wrote', f));
