# Computer Science lessons

Lesson resources for Cambridge IGCSE Computer Science (0478) and Cambridge International AS & A Level Computer Science (9618), organised by syllabus and paper.

Each lesson folder holds:
- **slide deck** (`.pptx`)
- **worksheet**
- **answer key** (separate document)
- **student booklet**: the essential slides and the tasks interleaved, so students only need one document

## 0478 IGCSE

| Paper | Lesson | Syllabus |
|---|---|---|
| P1 | [Packet Switching](0478%20P1/Packet%20Switching) | 2.1 Types and methods of data transmission |
| P1 | [Automated Systems](0478%20P1/Automated%20Systems) | 6.1 Automated systems |
| P1 | [Robotics](0478%20P1/Robotics) | 6.2 Robotics (deck, student booklet and answer key) |
| P1 | [Artificial Intelligence](0478%20P1/Artificial%20Intelligence) | 6.3 AI, expert systems and machine learning; 2023–2025 past-paper practice, worked answers and photographs |
| P2 | *(none yet)* | |

## 9618 AS & A Level

| Paper | Lesson | Year | Syllabus |
|---|---|---|---|
| P1 | [Topologies and Cloud](9618%20P1/Topologies%20and%20Cloud) | Y12 | 2.1 Networks: topologies, public and private cloud |
| P1 | [Wired and Wireless](9618%20P1/Wired%20and%20Wireless) | Y12 | 2.1.5 Wired and wireless networking (~30 min) |
| P1 | [Network Hardware](9618%20P1/Network%20Hardware) | Y12 | 2.1.6 LAN hardware (switch, server, NIC, WNIC, WAP, cables, bridge, repeater) and the router |
| P4 | [Queues](9618%20P4/Queues) | Y13 | ADTs: queues (original lesson) |
| P4 | [Stacks](9618%20P4/Stacks) | Y13 | ADTs: stacks (VB.NET) |
| P4 | [Linked Lists](9618%20P4/Linked%20Lists) | Y13 | ADTs: linked lists (VB.NET) |
| P4 | [Binary Trees](9618%20P4/Binary%20Trees) | Y13 | ADTs: binary trees (VB.NET) |
| P4 | [Tree Traversals](9618%20P4/Tree%20Traversals) | Y13 | Follow-up to Binary Trees: pre/in/post-order by hand, tracing recursion with a call stack, uses of binary trees (also covers Paper 3 tree and recursion questions) |

## Skill

[`skills/comp-sci-lesson-maker`](skills/comp-sci-lesson-maker) is the Claude skill used to make these lessons. It includes the source (SKILL.md, scripts, references and worked examples) and the packaged `comp-sci-lesson-maker.skill`, ready to upload to Claude.

## Web viewer

The [lesson viewer](viewer/README.md) provides browser previews of slides, worksheets and student booklets, with search, syllabus/paper filters, and original-file downloads. Office files are converted to PDFs during the build. Teacher answer keys are excluded from the published site.

Build with `python3 scripts/build_viewer.py`; see the viewer guide for local use and GitHub Pages deployment through the included Actions workflow.
