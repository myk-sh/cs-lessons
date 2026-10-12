# Computer Science lessons

Cambridge IGCSE Computer Science (0478) and Cambridge International AS & A Level Computer Science (9618) materials, organised by syllabus, paper and syllabus chapter/topic.

Each lesson has slides, a worksheet, a separate teacher answer key and a student booklet where available. The public [lesson library](https://myk-sh.github.io/cs-lessons/) groups lessons by chapter and provides syllabus, paper and topic filters. Teacher answer keys are excluded.

## 0478 IGCSE

### Chapter 2 · Data transmission

| Paper | Section | Lesson |
| --- | --- | --- |
| P1 | 2.1 | [Packet Switching](0478%20P1/Packet%20Switching) |
| P1 | 2.3 | [Symmetric and Asymmetric Encryption](0478%20P1/Symmetric%20and%20Asymmetric%20Encryption) — purpose, plaintext/ciphertext, shared secrets, recipient public/private keys, practice and worked feedback |

### Chapter 6 · Automated and emerging technologies

| Paper | Section | Lesson |
| --- | --- | --- |
| P1 | 6.1 | [Automated Systems](0478%20P1/Automated%20Systems) |
| P1 | 6.2 | [Robotics](0478%20P1/Robotics) — slides, booklet and teacher key |
| P1 | 6.3 | [Artificial Intelligence](0478%20P1/Artificial%20Intelligence) — concepts before exam practice, 17 distinct photographs and worked answers |

Paper 2 materials have not been added yet.

## 9618 AS & A Level

### Chapter 2 · Communication

| Paper | Section | Lesson | Year |
| --- | --- | --- | --- |
| P1 | 2.1 | [Topologies and Cloud](9618%20P1/Topologies%20and%20Cloud) | Y12 |
| P1 | 2.1 | [Wired and Wireless](9618%20P1/Wired%20and%20Wireless) | Y12 |
| P1 | 2.1 | [Network Hardware](9618%20P1/Network%20Hardware) | Y12 |

### Chapter 19 · Computational thinking and problem-solving

| Paper | Section | Lesson | Year |
| --- | --- | --- | --- |
| P4 | 19.1 | [Queues](9618%20P4/Queues) | Y13 |
| P4 | 19.1 | [Stacks](9618%20P4/Stacks) | Y13 |
| P4 | 19.1 | [Linked Lists](9618%20P4/Linked%20Lists) | Y13 |
| P4 | 19.1 | [Binary Trees](9618%20P4/Binary%20Trees) | Y13 |
| P4 | 19.1 / 19.2 | [Tree Traversals](9618%20P4/Tree%20Traversals) — traversal, recursion and call stacks; also supports Paper 3 | Y13 |

## Topic organisation

Each lesson folder has a `lesson.json` declaring its primary chapter and section references. [syllabus-topics.json](syllabus-topics.json) defines all chapters, including 0478 chapter 1 Data representation, for future additions. The library shows topic choices for the materials available under the selected syllabus/paper. Lesson folders and IDs remain stable so existing links continue to work.

The numbering follows the [0478 2026–2028 syllabus](https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf) and [9618 2026 syllabus](https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf). A Level ADT algorithms belong to 19.1; recursion also belongs to 19.2.

## Lesson-making skill

[skills/comp-sci-lesson-maker](skills/comp-sci-lesson-maker) contains the lesson-making instructions, helpers, references and packaged skill.

## Web viewer

The [viewer guide](viewer/README.md) describes chapter grouping, search, filters, previews, original downloads, fullscreen and clicker controls. Office materials are converted to PDF during the build. Revised previews use versioned URLs to avoid stale browser copies.

Build with `python3 scripts/build_viewer.py`. The included GitHub Actions workflow publishes updates to GitHub Pages automatically when lesson or viewer files change.
