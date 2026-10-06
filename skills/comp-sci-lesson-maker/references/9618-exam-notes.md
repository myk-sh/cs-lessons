# Cambridge 9618 exam notes (Paper 4 ADTs and Paper 1 networking)

What was learned from the 2021–2025 Paper 4 questions and their published mark schemes.
Always re-check the actual paper and mark scheme for the question you base a task on; this is a
starting map, not a substitute.

## Contents
1. Finding mark schemes
2. General marking patterns
3. Queues
4. Stacks
5. Linked lists
6. Binary trees
7. Known errors in published model answers
8. Paper 1 - networking questions
9. IGCSE 0478 sources

## 1. Finding mark schemes

Mark scheme file names follow `9618_<series><yy>_ms_<variant>.pdf`:
- series `s` = May/June, `w` = Oct/Nov (e.g. `9618_s24_ms_42.pdf`, `9618_w25_ms_42.pdf`)
- question papers are `_qp_` instead of `_ms_`
- variants 41/42/43 are different papers in the same series; the question may only be in one of them

Reliable sources that `web_fetch` can read as text (use `web_fetch_pdf_extract_text: true`):
- `https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/9618_s25_ms_41.pdf`
- `https://pmt.physicsandmathstutor.com/download/Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-4/MS/November%202022%20(v1)%20MS.pdf`
  (PMT uses "(v1)/(v2)/(v3)" for variants 41/42/43)

Search first (`9618 <month> <year> paper 4 mark scheme <identifier from the question>`), then fetch a
URL that appeared in the results. Identifiers from the question (e.g. `TreeArray`, `ArrayNodes`) make
searches precise. Mark schemes give Java, Python and VB.NET example code plus bullet marking points.

**When PDF sites will not serve the file** (pastpapers.co only returns a viewer page; PMT hides its links): LearnlyAI has the extracted text of every 9618 paper and mark scheme. Fetch the subject index `https://learnlyai.co.uk/en/past-papers/a-level/cie/computer-science` to get viewer IDs. The paper is at `/en/past-papers/a-level/cie/computer-science/viewer/<id>` and its mark scheme at `/en/mark-schemes/a-level/cie/computer-science/viewer/<id>`. Example IDs: 1303/1306/1309 = 9618/11, /12, /13 June 2024; 1304/1307/1310 = 9618/11, /12, /13 Nov 2023; 1305/1308/1311 = June 2023 Paper 1. Tick-box positions can be lost when the text is extracted, so check those against the printed scheme.

## 2. General marking patterns

- "1 mark per point, max N" – there are often more points than marks (e.g. 9 points, max 7).
- A header mark almost always exists: header (and end where appropriate) with the right parameters.
- Boundary checks (full / empty) are separate marks and are the ones students drop.
- "..." at the end of one point and start of the next means the second depends on the first.
- `()` means not required in some languages; `//` means an alternative worth the same mark.
- Screenshot marks (1 each) require the exact test data from the question.
- Recursive traversals: a separate mark for "all in the correct order".
- Code written in any language is accepted; minor syntax slips are usually follow-through.

## 3. Queues (circular, array-based)
- Globals: `Queue`/`QueueArray`, `HeadPointer`, `TailPointer`, `NumberItems`.
- June 2025 (9618/41) Q1: Queue of 20, Head/Tail initialised to -1, NumberItems 0. Enqueue 6 marks
  (header returning Boolean; full check returns FALSE; empty case sets Head/Tail; increment Tail and
  NumberItems; wrap Tail to 0; store after increment and return TRUE). Dequeue 6 marks (empty returns -1;
  return data at Head; increment Head; wrap to 0; decrement NumberItems; reset pointers when empty).
- June 2022 Q (queue of 10, Tail = next free): used in the user's original queues lesson.

## 4. Stacks
Two pointer conventions both appear – teach both explicitly:
| | Next free space | Last item stored |
|---|---|---|
| Identifier | StackPointer / AnimalTopPointer / VowelTop | TopOfStack |
| Initial | 0 | -1 |
| Empty when | = 0 | = -1 |
| Full when (size n) | = n | = n - 1 |
| Push | store, then +1 | +1, then store |
| Pop | -1, then read | read, then -1 |
| Papers | June 2022, June 2023, Nov 2023 | June 2025, Nov 2025 |

Rogue values on empty Pop vary: -1 (June 2022), "" (June 2023), "No data" (Nov 2023), "-1" (June 2025),
-999 (Nov 2025). Push returns TRUE/FALSE, or -1/1 (June 2025).
June 2022 Q1 (build task used in the stacks lesson): StackData 10 integers; OutputStack; Push [6];
main with 11 inputs 11..21 [5]; Pop [5]; Pop twice then output. Teaching point: after two pops
OutputStack still shows 19 and 20 – Pop only moves the pointer.

## 5. Linked lists
- June 2021 (9618/43) Q1: record `node` (data, nextNode) in 1D array `linkedList(9)`, startPointer 0,
  emptyList 5. outputNodes [6]; addNode at end [7] (full check emptyList = -1, take node from empty
  list, update emptyList BEFORE overwriting its pointer, nextNode -1, traverse to last node, link, TRUE).
  VB mark scheme uses `Structure node`.
- Nov 2024 Q3: 2D array `LinkedList(19,1)` (col 0 data, col 1 pointer), data initialised -1, pointers to
  index+1, last -1; FirstEmpty 0, FirstNode -1. InsertData at FRONT [6]; OutputLinkedList [2];
  RemoveData (track previous; first-node special case; removed node to front of empty list) [5].
  Test data 5 1 2 3 8 -> 8 3 2 1 5; set 1: 5 6 8 9 5 -> after removing 5: 9 8 6 5; set 2: 10 7 8 5 6 -> 6 8 7 10.

## 6. Binary trees
| Paper | Representation | Key parts and marks |
|---|---|---|
| Nov 2022 (9618/41) Q3 | 2D `ArrayNodes(19,2)`: col 0 left, 1 data, 2 right; FreeNode 6, RootPointer 0 | init all -1 [3]; store table [2]; SearchValue fill-the-gaps (4 gaps + 1) [5]; PostOrder [7]; main search 15 + PostOrder [3] |
| June 2024 (9618/42) Q2 | OOP: array `Tree(19)` of `Node` objects holding integer pointers; FirstNode -1, NumberNodes 0 | Node class+constructor [4]; gets [3]; sets [3]; TreeClass constructor [4]; InsertNode [6]; OutputTree [4]; main inserts 10,11,5,1,20,7,15 [4] |
| June 2025 (9618/41) Q3 | OOP: Node holds LeftNode/RightNode as Node references (null = Nothing) | Node [4]; gets [3]; SetLeft/SetRight [3]; 5 nodes [2]; Tree class [2]; GetRootNode [1]; Insert (< left, >= right) [6]; OutputInOrder [5]; main 10,20,5,15,7 -> 5 7 10 15 20 |
| Nov 2025 (9618/42) Q3 | 2D `TreeArray(49,2)`; RootPointer -1; FreeNode 0 | declare/init [3]; AddNode [7 from 9 points]; read TreeData.txt calling AddNode [4]; WriteAllToFile CSV lines with exception handling [5] |

Nov 2025 AddNode marking points: header taking integer and storing at TreeArray(FreeNode,1); full check
(FreeNode = 50) with "The tree is full"; empty check setting RootPointer; compare with root data; less ->
left; greater -> right; until location found; update parent's pointer; increment FreeNode.
Model answer shape: CurrentNode index + `Placed` Boolean loop (June 2024 used Previous + Direction).

Recursive traversal marking (June 2025 OutputInOrder, 5): recursive header taking node; left null check
and recursive call; output data; right null check and recursive call; correct order. Nov 2022 PostOrder
(7) splits the checks and calls into separate marks; parameter may be the node OR its index.

Lesson tree (June 2024 data 10,11,5,1,20,7,15): rows (L,D,R) 0:(2,10,1) 1:(-1,11,4) 2:(3,5,5) 3:(-1,1,-1)
4:(6,20,-1) 5:(-1,7,-1) 6:(-1,15,-1). Pre 10 5 1 7 11 20 15; In 1 5 7 10 11 15 20; Post 1 7 5 15 20 11 10.
Nov 2022 tree: pre 20 15 3 9 10 58; in 3 9 10 15 20 58; post 10 9 3 15 58 20; AddNode(12) sets TreeArray(4,2)=6.

## 7. Known errors in published model answers (useful discussion points)
- Nov 2022 SearchValue (VB.NET): no `Root = -1` check, so searching for a missing value indexes -1 and crashes.
- Nov 2022 PostOrder (VB.NET): copies rows into a TempArray to pass the node – works but clumsy; index version is accepted.
- June 2024 InsertNode: only tests `<` and `>`; an equal value moves neither way and loops forever.
- Nov 2025 WriteAllToFile (VB.NET): StreamWriter created before `Try`, so an open failure is not caught.
- June 2024 TreeClass VB declares `Tree(20)` (21 elements) for a 20-element array.
Mention these as "the published answer ..." – do not overstate; they still earned marks as examples.

## 8. Paper 1 - networking (2.1) questions used
| Paper | Question | Official marking points (summary) |
|---|---|---|
| 9618/11 Nov 2023 Q2(c) [2] | Two drawbacks of students storing files on a public cloud | no access without a reliable internet connection; free space limited, may have to pay for more; no control over backup/security, dependent on a third party |
| 9618/11 Nov 2023 Q2(d) [2] | 20 computers + switch: one advantage of star over bus | advantage + expansion: more resilient to faults (no single cable); fewer collisions (each device only connected to switch); easier to add nodes; easier fault finding |
| 9618/11 Nov 2023 Q2(a),(b) | Router function [3]; purpose of switch, WAP, bridge [3] | router: receives packets, reads destination IP, forwards using routing table, firewall, NAT/private IPs; bridge: connects two LANs with the same protocol |
| 9618/11 June 2024 Q8(a) | Tick bus/star/mesh for 5 statements (1 per row) | central device = star; central cable = bus; multiple paths = mesh; robust if a line fails = mesh; most collisions = bus |
| 9618/11 June 2024 Q5(a) [4] | Client and server in an online bank | identify + describe server (receives and processes requests) and client (sends request, waits, outputs response) |
| 9618/12 June 2024 Q3(b) | Thin-client characteristics applied to online exam marking | characteristic + application: no local data storage; reliant on server; reliant on network; few local resources; minimal processing |
| 9618/13 June 2024 Q5(a)(i) [1] | Define private cloud | dedicated/bespoke services or storage on a remote server only available to the company |
| 9618/13 June 2024 Q5(a)(ii) [3] | Benefits of private over public cloud | not reliant on third party ... more control over security/privacy ... more control over backup; tailored/scalable storage |
| 9618/13 June 2024 Q5(b) [2] | How packets travel between two devices in a star | sender transmits packet to the switch/central device; switch checks the destination address and forwards it directly to that device |
| 9618/13 June 2024 Q5(c) | CSMA/CD and its drawbacks | jam signal, abort, wait a random time, increase the wait after further collisions |
| 9618/11 June 2024 Q2(e) | Bit streaming; real-time vs on-demand | continuous ordered flow of bits; real-time is live and cannot be re-watched, on-demand can be paused/re-watched |

The textbook (Hodder 9618, ch. 2) and the mark schemes sometimes differ. Teach the mark-scheme wording, e.g. "cannot access files without a reliable internet connection" rather than just "needs internet".

## 9. IGCSE 0478 (Paper 1) sources
- PMT topic packs, e.g. Topic 2 Data Transmission: `https://www.physicsandmathstutor.com/computer-science-revision/igcse-caie/data-transmission` lists "Types and Methods of Data Transmission QP / MS" PDFs (official questions 2015-2024, current-spec 2023-2024 questions at the end). These packs are scanned images, so web_fetch returns no question text - point the teacher to them rather than quoting.
- PMT paper list: `https://www.physicsandmathstutor.com/past-papers/gcse-computer-science/caie-paper-1/`. Individual paper links on that page may be rejected by web_fetch unless they appear in a search result first.
- If official wording cannot be retrieved, write exam-style questions from the syllabus "Notes and guidance" column (that is what mark schemes credit), label them as exam-style, and label key answers as suggested.
- 0478 2.1 packets: header = destination address, packet number, originator's address; payload = actual data; trailer = end of packet + error check. Packet switching (5 syllabus points): broken into packets; each could take a different route; router controls the route; may arrive out of order; reordered once the last packet arrives.
