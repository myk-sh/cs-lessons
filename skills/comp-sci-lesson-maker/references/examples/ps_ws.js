const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);

add(w.title('Packet switching', 'IGCSE Computer Science 0478  |  2.1 Data transmission  |  Lesson worksheet'));

// ---------- Task 1
add(H('Task 1   Starter - True or False?', '[5 marks]'));
add(P('Answer now from what you already know. At the end of the lesson, come back and correct any you got wrong.'));
const t1 = [
  'A large file is sent across the internet in one piece.',
  'Each packet contains the address of the computer it is going to.',
  'All the packets in a message must travel along the same route.',
  'Packets can arrive at the destination in a different order from the order they were sent in.',
  'The sending computer decides the route that every packet takes.'
];
add(table([['Statement', 'True', 'False', 'Correction (end of lesson)'], ...t1.map(x => [x, '', '', ''])], [4500, 700, 700, 4300], { rowH: 520 }));

// ---------- Task 2
add(H('Task 2   The structure of a packet', '[6 marks]'));
add(part('(a)', 'Complete the diagram by writing the name of each part of a packet.', '[3]'));
add(table([['Part 1', 'Part 2', 'Part 3'], ['', '', '']], [4300, 3500, 2400], { rowH: 600 }));
add(spacer(100));
add(part('(b)', 'State three items of data that are stored in the packet header.', '[3]'));
add(P('1 ___________________________________________________', { before: 120 }));
add(P('2 ___________________________________________________'));
add(P('3 ___________________________________________________'));

// ---------- Task 3
add(H('Task 3   Split it up, then put it back together', '[6 marks]'));
add(part('(a)', 'The message PACKETSWITCH is sent from 82.10.4.2 to 192.168.0.7. Each payload holds 4 characters. Complete the table for every packet.', '[3]'));
add(table([
  ['Destination address', 'Originator\'s address', 'Packet number', 'Payload'],
  ['', '', '', ''], ['', '', '', ''], ['', '', '', '']
], [2700, 2700, 1900, 2900], { rowH: 440 }));
add(spacer(100));
add(part('(b)', 'A different message is sent as five packets. They arrive in this order: packet 4 "ER", packet 1 "CO", packet 3 "UT", packet 5 "S!", packet 2 "MP". Write the message after the packets have been reordered, and state when the reordering happens.', '[2]'));
add(lines(2));
add(part('(c)', 'Packet 1 travelled through 6 routers and packet 3 travelled through 3 routers. Give one reason why packet 1 could still arrive before packet 3.', '[1]'));
add(lines(2));

// ---------- Task 4
add(H('Task 4   Exam-style questions', '[11 marks]'));
add(I('These questions are written in the style of Cambridge IGCSE 0478 Paper 1, using the wording of the syllabus.'));
add(part('(a)', 'Explain why data is broken down into packets before it is transmitted across a network.', '[2]'));
add(lines(3));
add(part('(b)', 'Identify the part of a packet that contains the actual data being sent.', '[1]'));
add(lines(1));
add(part('(c)', 'Describe the process of packet switching.', '[5]'));
add(lines(6));
add(part('(d)', 'State the role of a router in packet switching.', '[1]'));
add(lines(2));
add(part('(e)', 'Explain why the packet number is needed in the packet header.', '[2]'));
add(lines(3));

// ---------- Task 5
add(H('Task 5   Extension', '[4 marks]'));
add(P('A school uses the internet for live video calls with a partner school in another country.'));
add(part('(a)', 'Explain one benefit of packet switching for these video calls.', '[2]'));
add(lines(3));
add(part('(b)', 'Explain one drawback of packet switching for these video calls.', '[2]'));
add(lines(3));

w.build(K.splice(0), '/mnt/user-data/outputs/Packet_Switching_Worksheet.docx');

// ================= ANSWER KEY
add(w.title('Packet switching - Answer key', 'IGCSE Computer Science 0478  |  2.1 Data transmission  |  Teacher copy - not for students', { noName: true }));
add(w.keyBanner('Answers and marking points for every task on the worksheet and student booklet (same task numbers).'));
add(I('Marking points are suggested and built from the 0478 syllabus wording for 2.1 1(a)-(c), which is what Cambridge mark schemes credit. Official past-paper questions on this topic are in the PMT topic packs "Types and Methods of Data Transmission QP / MS" (physicsandmathstutor.com, CAIE IGCSE Computer Science, Topic 2); the 2023-2024 questions near the end of the pack use the current specification.'));

add(H2('Task 1 Starter - answers [5]'));
add(table([
  ['Statement', 'Answer', 'Correction'],
  [t1[0], 'False', 'It is broken down into packets.'],
  [t1[1], 'True', '-'],
  [t1[2], 'False', 'Each packet could take a different route.'],
  [t1[3], 'True', '-'],
  [t1[4], 'False', 'Routers control the route each packet takes.']
], [5200, 1000, 4000]));

add(H2('Task 2 - answers [6]'));
add(P('(a) [3] Header (part 1); payload (part 2); trailer (part 3). 1 mark each, in the correct position.'));
add(P('(b) [3] Destination address; packet number; originator\'s address (accept sender\'s / source address). 1 mark each. Do not accept "the data" (that is the payload).'));

add(H2('Task 3 - answers [6]'));
add(P('(a) [3] 1 mark per correct row:'));
add(table([
  ['Destination address', 'Originator\'s address', 'Packet number', 'Payload'],
  ['192.168.0.7', '82.10.4.2', '1', 'PACK'],
  ['192.168.0.7', '82.10.4.2', '2', 'ETSW'],
  ['192.168.0.7', '82.10.4.2', '3', 'ITCH']
], [2700, 2700, 1900, 2900]));
add(P('(b) [2] COMPUTERS! (1). The packets are reordered once the last packet has arrived, using the packet numbers (1).'));
add(P('(c) [1] Any one: the routers on packet 3\'s route were busier / congested; packet 3 had to wait at a router; packet 3\'s route had slower links.'));

add(H2('Task 4 - answers [11]'));
add(P('(a) [2] Any two: so the packets can be sent along different routes // so the network can be shared by many users; so busy or broken links can be avoided; if a packet is lost or corrupted, only that packet needs to be re-sent (not the whole file).'));
add(P('(b) [1] Payload.'));
add(P('(c) [5] 1 mark per point:'));
add(table([
  ['Mark', 'Marking point'],
  ['1', 'The data is broken down into packets'],
  ['1', 'Each packet could take a different route'],
  ['1', 'A router controls the route each packet takes // routers read the destination address and forward the packet'],
  ['1', 'Packets may arrive out of order'],
  ['1', 'Once the last packet has arrived, the packets are reordered (using the packet numbers)']
], [900, 9300]));
add(P('(d) [1] It controls / decides the route each packet takes // it reads the destination address and forwards the packet towards its destination.'));
add(P('(e) [2] Packets may arrive out of order (1) ... so the packet number is used to put them back in the correct order // to identify a missing packet (1).'));

add(H2('Task 5 - answers [4] (suggested)'));
add(P('(a) [2] Benefit (1) + expansion (1), e.g.: packets can be re-routed around busy or broken links (1) so the call can continue even if part of the network fails (1); the network is shared, so no dedicated line is needed (1) so the call is cheaper / does not need a reserved connection (1).'));
add(P('(b) [2] Drawback (1) + expansion (1), e.g.: packets can arrive out of order or be delayed (1) so they must be reordered, causing lag / the picture freezing (1); packets can be lost (1) and re-sending them takes time, so parts of the call may be missing or delayed (1).'));

add(H2('Exit question (slide 17) - answers'));
add(P('1. Header, payload, trailer. 2. Destination address, packet number, originator\'s address. 3. The packet number - used to reorder the packets once the last packet has arrived.'));

w.build(K, '/mnt/user-data/outputs/Packet_Switching_Answer_Key.docx');
