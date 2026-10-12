# Lesson generators

`ai.js` builds the IGCSE 0478 Paper 1 section 6.3 lesson in the existing house style. The current revision audits all 21 Paper 1 papers and their 21 published Cambridge mark schemes from 2023–2025: 29 AI parts across 18 papers. The matched student tasks adapt 20 real past-paper parts and retain 60 official marks; Task 1 adds original robotics recall with 15 suggested marks. See [the complete coverage audit](../../0478%20P1/Artificial%20Intelligence/AI_Exam_Coverage.md) for every part, source links and marking distinctions.

The 41-slide deck starts with familiar automation and AI examples, then teaches expert systems and machine learning through worked situations. Students classify systems and explain a new application before exam framing begins on slide 18. Exam prompts precede model answers; model-answer slides are omitted from the student booklet. A 60-minute route selects practice questions, with the full bank used for follow-up or a second period. The booklet places all concept teaching and understanding checks before Tasks 2–6.

`ai-exam-questions.json` is the shared source for all question wording, official allocations, citations, accepted alternatives, model answers and pitfalls. The worksheet and booklet use identical tasks; one separate key covers both.

Seventeen distinct real photographs are embedded, each exactly once: delivery robot, industrial robots, washing machine, autonomous car, chess players, garage, printer, medical examination, cat, dog, smartphone voice assistant, robot vacuum, traffic signal, weather station, clouds, speaker and gaming. The generator rejects repeated photograph IDs. Source/licence details are in `assets/ai/photos/credits.json`, speaker notes, image captions and reference slides. Document credits include clickable source/licence links. Pictures preserve their proportions; selected placements crop without subject alterations. Earlier vector assets are retained for the earlier revision, but are not used here.

The redesign keeps the house fonts and purple/yellow accents with a quieter background, larger photographs, consistent margins, flat diagrams and a clear distinction between teaching and practice.

Requires Node.js with `pptxgenjs` and `docx`, plus LibreOffice/Poppler render helpers. In the prepared cloud environment:

```bash
source /workspace/lesson-tools/activate.sh
cd /workspace/cs-lessons
node scripts/lessons/ai.js deck '/workspace/lesson-tools/ai-concept-first'
python3 skills/comp-sci-lesson-maker/scripts/fix_ppr.py '/workspace/lesson-tools/ai-concept-first/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx'
render_slides.sh '/workspace/lesson-tools/ai-concept-first/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx' '/workspace/lesson-tools/qa/ai-concept-first/slides'
node scripts/lessons/ai.js documents '/workspace/lesson-tools/ai-concept-first' '/workspace/lesson-tools/qa/ai-concept-first/slides'
```

Render and inspect all four documents before copying final files to `0478 P1/Artificial Intelligence/`. The site publishes slides, worksheet and booklet; it excludes the teacher answer key. Deep-learning internals and narrow/general/strong AI taxonomy are outside this lesson’s core scope.

## Encryption

`encryption.js` builds the four matched files for 0478 section 2.3. The 30-slide deck teaches the concepts before exam framing on slide 17, with seven distinct photographs, explicit recipient-key ownership, two-way messages, a worked toy cipher and independent practice before feedback. `encryption-exam-questions.json` stores eight adapted parts retaining 17 official marks; original activities add 34 suggested marks. See the lesson's `Encryption_Exam_Coverage.md` for sources and marking nuances.

Rebuild with the same sequence as AI, substituting `encryption.js` and the encryption deck filename. Use a temporary output directory, render slides, then generate documents with the rendered image directory. Review all four documents before copying them to `0478 P1/Symmetric and Asymmetric Encryption/`.

The supplied Hodder extract's core is printed pp.63–66. Its quantum extension is not part of this IGCSE lesson. Letter shifts illustrate the transformation; they are not recommended cryptography. Algorithm and key, confidentiality and interception, and shared secret versus recipient public/private keys are taught distinctly.
