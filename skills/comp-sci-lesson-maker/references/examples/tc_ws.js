const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);
const src = (t) => I(t);

add(w.title('Topologies & cloud computing', 'Y13 - Cambridge International 9618  |  2.1.3 - 2.1.4  |  One-hour lesson worksheet'));

// ---------- Task 1 recall test
add(H('Task 1   Recall test - last lesson', '[20 marks]'));
add(P([['Closed book. 10 minutes. ', { bold: true }], 'These questions are on the online lesson: LANs and WANs, client-server and peer-to-peer, thin and thick clients.']));
add(part('1', 'Write LAN, MAN, WAN or PAN next to each description.', '[4]'));
add(table([
  ['Description', 'Network type'],
  ['Connects the devices in one building or site, such as a school', ''],
  ['Covers a city, such as a university campus spread across several buildings', ''],
  ['Covers a country or the world, such as a bank\'s network of cash machines', ''],
  ['Centred on one person, with a range of a few metres', '']
], [7600, 2600], { rowH: 440 }));
add(spacer(100));
add(part('2', 'Give three benefits of networking computers rather than using stand-alone computers.', '[3]'));
add(lines(3));
add(part('3', 'Tick one box in each row to show whether the statement describes the client-server model or the peer-to-peer model.', '[5]'));
add(table([
  ['Statement', 'Client-server', 'Peer-to-peer'],
  ['Files are stored on a central server', '', ''],
  ['Each node stores its own files and can share them with other nodes', '', ''],
  ['User IDs, passwords and access rights are managed centrally', '', ''],
  ['Best suited to a small network of about ten or fewer nodes', '', ''],
  ['Data is backed up centrally, so it is more secure and stable', '', '']
], [6600, 1800, 1800], { rowH: 420 }));
add(spacer(100));
add(part('4', 'A bank\'s online banking system uses the client-server model. Identify the client and the server in this system, and describe the role of each.', '[4]'));
add(I('Based on 9618/11 May/June 2024 Q5(a).'));
add(lines(4));
add(part('5', 'Examiners mark exam scripts online using thin-client software. Describe two characteristics of a thin client, and explain how each one applies to this marking software.', '[4]'));
add(I('Based on 9618/12 May/June 2024 Q3(b).'));
add(lines(5));

// ---------- Task 2
add(H('Task 2   Draw and identify topologies', '[8 marks]'));
add(part('(a)', 'Draw a star network that has a switch, four computers and a printer.', '[2]'));
add(box(1900));
add(spacer(80));
add(part('(b)', 'Draw a bus network that has four computers. Label the terminators.', '[2]'));
add(box(1600));
add(spacer(80));
add(part('(c)', 'Name the topology that each statement describes.', '[4]'));
add(table([
  ['Statement', 'Topology'],
  ['If the single central cable is cut, no device can communicate', ''],
  ['There are several different routes between any two devices', ''],
  ['Each device has its own cable to a switch', ''],
  ['Three star networks are joined together by a backbone cable', '']
], [7600, 2600], { rowH: 420 }));

// ---------- Task 3
add(H('Task 3   Tick the topology, then trace a packet', '[8 marks]'));
add(part('(a)', 'Tick one or more boxes in each row to identify the topology, or topologies, that each statement describes.', '[5]'));
add(I('Based on 9618/11 May/June 2024 Q8(a).'));
add(table([
  ['Statement', 'Bus', 'Star', 'Mesh'],
  ['All devices connect to one central device', '', '', ''],
  ['All devices connect to a central cable', '', '', ''],
  ['There are multiple paths for the packets to travel', '', '', ''],
  ['Robust against damage: if any line fails, the rest of the network keeps full functionality', '', '', ''],
  ['Most likely to lose data through collisions', '', '', '']
], [6600, 1200, 1200, 1200], { rowH: 440 }));
add(spacer(100));
add(part('(b)', 'Computer A sends a packet to computer D. The network also contains computers B, C and E. For each network, list every computer, other than A, that receives the packet, and say which one accepts it.', '[3]'));
add(table([
  ['Network', 'Computers that receive the packet', 'Computer that accepts it'],
  ['Bus', '', ''],
  ['Star with a hub', '', ''],
  ['Star with a switch', '', '']
], [2600, 4600, 3000], { rowH: 440 }));

// ---------- Task 4
add(H('Task 4   Exam questions: topologies', '[8 marks]'));
add(part('(a)', 'A new classroom is being set up with 20 computers and a switch. Explain one advantage of using a star topology instead of a bus topology in this classroom.', '[2]'));
add(I('9618/11 October/November 2023 Q2(d).'));
add(lines(3));
add(part('(b)', 'Explain how packets are transmitted between two devices in a star topology.', '[2]'));
add(I('9618/13 May/June 2024 Q5(b).'));
add(lines(3));
add(part('(c)', 'Give one advantage and one disadvantage of a mesh topology.', '[2]'));
add(lines(2));
add(part('(d)', 'A company takes over three hotel chains. One uses a bus network, one a star network and one a mesh network. Explain why the company might connect them as a hybrid network.', '[2]'));
add(lines(3));

// ---------- Task 5
add(H('Task 5   Exam questions: cloud computing', '[11 marks]'));
add(I('Parts (a) and (b) are from 9618/13 May/June 2024 Q5(a). Part (c) is from 9618/11 October/November 2023 Q2(c).'));
add(P('A company has private cloud storage for its employees to store their work.'));
add(part('(a)', 'Define the term private cloud.', '[1]'));
add(lines(2));
add(part('(b)', 'Describe the benefits to the company of using private cloud storage instead of public cloud storage.', '[3]'));
add(lines(4));
add(part('(c)', 'Students at a school can save their files on a public cloud. Identify two drawbacks of the students storing their files on the public cloud.', '[2]'));
add(lines(3));
add(part('(d)', 'Explain what is meant by data redundancy in cloud storage, and why providers use it.', '[2]'));
add(lines(3));
add(part('(e)', 'Choose public, private or hybrid cloud for each organisation, and give a reason.', '[3]'));
add(table([
  ['Organisation', 'Cloud type', 'Reason'],
  ['A small photography business storing copies of client photos', '', ''],
  ['A national bank storing customer account records', '', ''],
  ['A hospital with confidential patient records and a public appointment-booking website', '', '']
], [4200, 1600, 4400], { rowH: 620 }));

// ---------- Task 6
add(H('Task 6   Extension'));
add(part('(a)', 'The peer-to-peer network model and the mesh topology can look similar. Describe the differences between them.', '[4]'));
add(I('Textbook Extension Activity 2A.'));
add(lines(5));
add(part('(b)', 'An office star network uses a hub as its central device. Explain why replacing the hub with a switch would make the network more secure and reduce collisions.', '[2]'));
add(lines(3));

w.build(K.splice(0), '/mnt/user-data/outputs/Topologies_and_Cloud_Worksheet.docx');

// ================= ANSWER KEY
add(w.title('Topologies & cloud - Answer key', 'Y13 - Cambridge International 9618  |  2.1.3 - 2.1.4  |  Teacher copy - not for students', { noName: true }));
add(w.keyBanner('Answers and marking points for every task on the worksheet and student booklet (same task numbers).'));
add(I('Official marking points are summarised from the published Cambridge 9618 Paper 1 mark schemes, cited by paper and variant. Answers labelled "suggested" are written for this lesson, in the same style.'));

add(H2('Task 1 Recall test - answers [20]'));
add(table([
  ['Q', 'Answer', 'Marks'],
  ['1', 'LAN; MAN; WAN; PAN (in that order)', '1 each [4]'],
  ['2', 'Any three (suggested, from the textbook): devices such as printers can be shared; software licences are cheaper than for stand-alone machines; users can share files and data; data comes from a reliable central source / file server; central back-up; communication by email / messaging; a network manager can control access rights', '1 each [3]'],
  ['3', 'Client-server; Peer-to-peer; Client-server; Peer-to-peer; Client-server', '1 per row [5]'],
  ['4', 'Official (9618/11 June 2024 Q5(a)), 1 mark each: identifies the server in the bank scenario (e.g. the bank\'s computer that stores customer accounts); describes it, e.g. receives requests and processes them; identifies the client (e.g. the customer\'s app or browser); describes it, e.g. sends a request to the server, waits, then outputs the response', '[4]'],
  ['5', 'Official (9618/12 June 2024 Q3(b)): 1 mark for a characteristic + 1 for applying it, twice. Characteristics and applications: data is not stored on the client (exam scripts stay on the server, not the examiner\'s computer); relies on access to the server (examiners cannot mark if the server goes down); heavily reliant on the network / internet (marking software will not work offline); needs few local resources (examiners can use low-specification devices); performs minimal processing (the software sends requests and the server responds)', '[4]'],
], [600, 8100, 1500]));
add(I('Re-teaching guide: fewer than 3/5 on Q3 or fewer than 4/8 on Q4-Q5 suggests the client-server and thin/thick client content from the online lesson needs a short recap.'));

add(H2('Task 2 - answers [8]'));
add(P('(a) [2] 1 mark for the switch as the central device with every device on its own link to it; 1 mark for four computers and a printer correctly connected. Do not credit lines drawn directly between computers.'));
add(P('(b) [2] 1 mark for a single central cable with four computers connected to it by drop lines; 1 mark for a terminator labelled at each end.'));
add(P('(c) [4] Bus; mesh; star; hybrid.'));

add(H2('Task 3 - answers [8]'));
add(P('(a) [5] 1 mark per correct row (official, 9618/11 June 2024 Q8(a)):'));
add(table([
  ['Statement', 'Bus', 'Star', 'Mesh'],
  ['All devices connect to one central device', '', 'Y', ''],
  ['All devices connect to a central cable', 'Y', '', ''],
  ['There are multiple paths for the packets to travel', '', '', 'Y'],
  ['Robust against damage: if any line fails, the rest keeps full functionality', '', '', 'Y'],
  ['Most likely to lose data through collisions', 'Y', '', '']
], [6600, 1200, 1200, 1200]));
add(I('Note: the tick positions did not extract cleanly from the published mark scheme text, so these follow the topology definitions. Check row 4 against the printed mark scheme if your school has it; mesh is the intended answer.'));
add(P('(b) [3] 1 mark per row (suggested):'));
add(table([
  ['Network', 'Computers that receive the packet', 'Computer that accepts it'],
  ['Bus', 'B, C, D and E (it travels along the whole cable)', 'D only'],
  ['Star with a hub', 'B, C, D and E (the hub sends it to every port)', 'D only'],
  ['Star with a switch', 'D only (the switch reads the destination address)', 'D']
], [2600, 4600, 3000]));

add(H2('Task 4 - answers [8]'));
add(P('(a) [2] Official (9618/11 Oct/Nov 2023 Q2(d)): 1 mark for an advantage and 1 for a valid expansion. More resilient to faults ... because there is no single shared cable, so less disruption to teaching. Higher performance, as fewer collisions ... because each device is only connected to the switch. Easier to add new nodes ... because each device connects directly to the switch. Easier to find faults than in a bus topology.'));
add(P('(b) [2] Official (9618/13 May/June 2024 Q5(b)), 1 mark each: the sending computer transmits the packet directly to the switch / central device; the switch checks the destination address of the packet and forwards it directly to that device.'));
add(P('(c) [2] Suggested. Advantage: a broken link does not stop the network, because data is re-routed // can use the shortest route // handles heavy traffic. Disadvantage: needs a lot of cabling, so it is expensive // complex to set up and maintain.'));
add(P('(d) [2] Suggested: a hybrid network can join networks that use different topologies without rebuilding them (1) ... so all three hotel chains can be connected and the network expanded easily without affecting the existing hotels (1).'));

add(H2('Task 5 - answers [11]'));
add(P('(a) [1] Official (9618/13 May/June 2024 Q5(a)(i)): dedicated / bespoke services or storage on a remote server that is only available to the company.'));
add(P('(b) [3] Official (Q5(a)(ii)), any three: not reliant on a third party ... gives greater control over security / privacy ... gives greater control over backup; storage can be tailored / scaled to the company\'s requirements (e.g. the amount of storage, sharing files).'));
add(P('(c) [2] Official (9618/11 Oct/Nov 2023 Q2(c)), any two: the students cannot access their files without a reliable internet connection; the free space may be limited, so they may have to pay for more; they have no control over the backup (or security) of their work - they depend on a third party.'));
add(P('(d) [2] Suggested: the same data is stored on more than one server (1) ... so it is still available if one server is down for maintenance, repair or failure (1).'));
add(P('(e) [3] Suggested, 1 mark per row for a matching type and reason:'));
add(table([
  ['Organisation', 'Cloud type', 'Reason'],
  ['Small photography business', 'Public', 'Low cost, no IT staff needed, scalable storage paid as needed'],
  ['National bank', 'Private', 'Confidential data: not reliant on a third party, full control over security and backup'],
  ['Hospital', 'Hybrid', 'Patient records kept on the private part; the less sensitive booking website on the public part']
], [3000, 1600, 5600]));
add(I('Accept other choices if the reason is valid for that organisation.'));

add(H2('Task 6 - answers'));
add(P('(a) [4] Suggested, 1 mark each, max 4: peer-to-peer is a network model (who provides and uses resources), whereas mesh is a topology (how devices are physically or logically linked); in peer-to-peer every node is both client and server and there is no central server, whereas a mesh can also be used by client-server systems (e.g. the internet); a peer-to-peer network can run on any topology, e.g. a bus; in a routing mesh, nodes forward / relay data for other nodes using routing logic, whereas peer-to-peer nodes share their own files and services; peer-to-peer suits about ten nodes or fewer, whereas a mesh scales to very large networks such as WANs.'));
add(P('(b) [2] Suggested: a hub sends every packet to every device, whereas a switch reads the destination address and forwards the packet only to that device (1) ... so other devices cannot read packets not meant for them, and less traffic on each link means fewer collisions (1).'));

add(H2('Exit question (slide 20) - model answer'));
add(P('1. Star (1) - each computer has its own link to the switch, so a faulty cable only affects one computer // the switch forwards packets only to the destination, so there are fewer collisions (1). 2. Private cloud (1) - patient records are confidential, so the clinic is not reliant on a third party and has greater control over security and privacy (1).'));

w.build(K, '/mnt/user-data/outputs/Topologies_and_Cloud_Answer_Key.docx');
