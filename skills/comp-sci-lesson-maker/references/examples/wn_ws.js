const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);

add(w.title('Wired & wireless networking', 'Y12 - Cambridge International 9618  |  2.1.5  |  30-minute lesson worksheet'));

// ---------- Task 1
add(H('Task 1   Recall test - topologies and cloud', '[8 marks]'));
add(P([['Closed book. 5 minutes.', { bold: true }]]));
add(part('1', 'Name the topology described.', '[3]'));
add(table([
  ['Description', 'Topology'],
  ['Every device has its own link to a central switch', ''],
  ['All devices share one cable with a terminator at each end', ''],
  ['There are many routes between devices, so data can be re-routed', '']
], [7600, 2600], { rowH: 420 }));
add(spacer(100));
add(part('2', 'Define the term private cloud.', '[1]'));
add(lines(2));
add(part('3', 'A company stores its training courses on a public cloud. Describe two disadvantages of storing data on a public cloud compared to storing it on a server in the company\'s Local Area Network (LAN).', '[4]'));
add(I('9618/13 October/November 2023 Q3(a)(ii).'));
add(lines(5));

// ---------- Task 2
add(H('Task 2   Classify', '[6 marks]'));
add(part('(a)', 'Tick one box in each row to show which cable each statement describes.', '[3]'));
add(table([
  ['Statement', 'Twisted pair', 'Coaxial', 'Fibre optic'],
  ['Transmits data as pulses of light', '', '', ''],
  ['The cheapest cable and the most common in LANs, but affected most by interference', '', '', ''],
  ['Commonly used in MANs and by cable television companies', '', '', '']
], [5800, 1500, 1400, 1500], { rowH: 440 }));
add(spacer(100));
add(part('(b)', 'Tick one box in each row to show whether the statement describes Wi-Fi or Bluetooth.', '[3]'));
add(table([
  ['Statement', 'Wi-Fi', 'Bluetooth'],
  ['Connects devices less than about 30 metres apart to form a WPAN', '', ''],
  ['Used to run a full-scale network through wireless access points up to 100 metres away', '', ''],
  ['Picks one of 79 channels at random and keeps hopping between channels', '', '']
], [7000, 1600, 1600], { rowH: 440 }));

// ---------- Task 3
add(H('Task 3   Exam-style questions', '[10 marks]'));
add(I('No recent 9618 Paper 1 question covers this exact content, so these are written in the same style.'));
add(part('(a)', 'A school has two buildings 2 km apart. Explain why fibre-optic cable, rather than twisted pair cable, should be used to connect the networks in the two buildings.', '[2]'));
add(lines(3));
add(part('(b)', 'A cafe wants to give its customers internet access. Give two advantages and one disadvantage of using a wireless network rather than a wired network.', '[3]'));
add(lines(4));
add(part('(c)', 'Explain why a satellite is needed to send a microwave signal between two antennae on opposite sides of the world.', '[2]'));
add(lines(3));
add(part('(d)', 'Describe how Bluetooth uses spread spectrum frequency hopping to reduce interference.', '[3]'));
add(lines(4));

// ---------- Task 4
add(H('Task 4   Extension or homework', '[6 marks]'));
add(I('Textbook Activity 2B, question 4.'));
add(P('A manager has asked you to write a report on whether a LAN being set up in their new building should use wired or wireless connectivity. The building has 20 floors. Explain your arguments for and against both types of connectivity, and give a conclusion to help the manager decide. Use point + expansion for each argument.'));
add(lines(12));

w.build(K.splice(0), '/mnt/user-data/outputs/Wired_and_Wireless_Worksheet.docx');

// ================= ANSWER KEY
add(w.title('Wired & wireless networking - Answer key', 'Y12 - Cambridge International 9618  |  2.1.5  |  Teacher copy - not for students', { noName: true }));
add(w.keyBanner('Answers and marking points for every task on the worksheet and student booklet (same task numbers).'));
add(I('Task 1 Q3 uses the official marking points from the published 9618/13 Oct/Nov 2023 mark scheme. All other answers are suggested, based on the textbook (Hodder 9618, section 2.1.5), in Cambridge mark-scheme style.'));

add(H2('Task 1 Recall test - answers [8]'));
add(P('1. [3] Star; bus; mesh.'));
add(P('2. [1] Official (9618/13 June 2024 Q5(a)(i)): dedicated / bespoke services or storage on a remote server that is only available to the company.'));
add(P('3. [4] Official (9618/13 Oct/Nov 2023 Q3(a)(ii)), max 2 marks per disadvantage (point + expansion):'));
add(table([
  ['Disadvantage (1 mark)', '... expansion (1 mark)'],
  ['Possible loss of control, unlike the LAN', 'because the data is stored on someone else\'s / remote infrastructure // relies on an external agency for tasks such as backups and security'],
  ['Requires a reliable internet connection', 'to access the remote data - access is more reliable with a LAN'],
  ['Increased recurring costs', 'cloud provider charges must keep being paid, whereas the LAN costs are mostly one-off']
], [3400, 6800]));

add(H2('Task 2 - answers [6]'));
add(P('(a) [3] Fibre optic; twisted pair; coaxial.'));
add(P('(b) [3] Bluetooth; Wi-Fi; Bluetooth.'));

add(H2('Task 3 - answers [10] (suggested)'));
add(P('(a) [2] 1 mark for a reason, 1 for the expansion, e.g.: fibre has much less signal loss / attenuation over long distances (1) so the signal can travel 2 km without needing to be boosted (1); fibre has a much higher data transfer rate (1) so many users in both buildings can share the link (1); fibre is not affected by electrical / external interference because it uses light (1).'));
add(P('(b) [3] Advantages, any two: easy to expand - no cables to install; customers\' devices are mobile within range of the WAP; phones and tablets can connect without a cable. Disadvantage, any one: less secure as signals can be intercepted (so encryption is needed); more interference / signal can drop out; slower data transfer than wired.'));
add(P('(c) [2] Microwave / radio signals travel in straight lines, so the curvature of the Earth blocks the signal between distant antennae (1). The signal is beamed up to a satellite, which boosts it and sends it back down to the receiving antenna (1).'));
add(P('(d) [3] Any three: Bluetooth uses 79 channels / frequencies (around 2.45 GHz); a device picks a channel at random; if the channel is already in use, it picks another; communicating pairs change / hop channels several times a second; so different pairs are unlikely to use the same channel at the same time, minimising interference.'));

add(H2('Task 4 - marking guidance [6] (suggested)'));
add(P('1 mark per valid point with expansion applied to the 20-floor building, max 5; 1 mark for a justified conclusion.'));
add(bullets([
  'For wired: faster and more stable data transfer, so staff on every floor get reliable access to servers; more secure because signals cannot be intercepted from outside the building; tends to be cheaper overall; no dead spots between floors.',
  'Against wired: cabling 20 floors is disruptive and needs ducts or risers; devices are not mobile; trip hazards and cables pulled out during cleaning.',
  'For wireless: easy to expand and reorganise floors; staff and visitors can move around with laptops, phones and tablets.',
  'Against wireless: signals are weakened by walls and floors, so many WAPs (and possibly repeaters) are needed on each floor; less secure - needs encryption such as WPA2; more interference; slower than wired.',
  'Conclusion (example): a wired backbone (e.g. fibre between floors and twisted pair to desks) with Wi-Fi access points on each floor for mobile devices - fast, reliable core links plus mobility. Credit any conclusion that is justified.'
]));

add(H2('Exit question (slide 12) - model answer'));
add(P('Fibre-optic cable (1). Any one reason: the least signal loss over 2 km // the highest data transfer rate // not affected by electrical interference (1).'));

w.build(K, '/mnt/user-data/outputs/Wired_and_Wireless_Answer_Key.docx');
