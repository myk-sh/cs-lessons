# Lesson generators

`ai.js` builds the IGCSE 0478 Paper 1 section 6.3 lesson in the existing house style. The current revision audits all 21 Paper 1 papers and their 21 published Cambridge mark schemes from 2023–2025: 29 AI parts across 18 papers. The matched student tasks adapt 20 real past-paper parts and retain 60 official marks; Task 1 adds original robotics recall with 15 suggested marks. See [the complete coverage audit](../../0478%20P1/Artificial%20Intelligence/AI_Exam_Coverage.md) for every part, source links and marking distinctions.

The 33-slide deck teaches definition/characteristic answers, component names/roles/cloze, full versus processing-only diagnosis, machine-learning capabilities, navigation and transfer to search/weather/voice/games/delivery. Model-answer slides follow practice and are omitted from the student booklet. Core teaching can fit 60 minutes with selected questions; the full pack needs follow-up practice or a second period. It is not a prediction of future questions.

`ai-exam-questions.json` is the shared source for all question wording, official allocations, citations, accepted alternatives, model answers and pitfalls. The worksheet and booklet use identical tasks; one separate key covers both.

Five real photographs (factory robots, garage, vacuum, speaker, weather station) are embedded. Source/licence details are in `assets/ai/photos/credits.json`, in speaker notes, under images and in document credits. The photo files are only resized/recompressed. No claim is made that the pictured products implement hypothetical exam capabilities. Earlier vector assets are retained for reproducibility of the earlier revision, but are not used in this deck.

Requires Node.js with `pptxgenjs` and `docx`, plus LibreOffice/Poppler render helpers. In the prepared cloud environment:

```bash
source /workspace/lesson-tools/activate.sh
cd /workspace/cs-lessons
node scripts/lessons/ai.js deck '/workspace/lesson-tools/ai-exam-revision'
python3 skills/comp-sci-lesson-maker/scripts/fix_ppr.py '/workspace/lesson-tools/ai-exam-revision/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx'
render_slides.sh '/workspace/lesson-tools/ai-exam-revision/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx' '/workspace/lesson-tools/qa/ai-exam-revision/slides'
node scripts/lessons/ai.js documents '/workspace/lesson-tools/ai-exam-revision' '/workspace/lesson-tools/qa/ai-exam-revision/slides'
```

Render and inspect all four documents before copying final files to `0478 P1/Artificial Intelligence/`. The site publishes slides, worksheet and booklet; it excludes the teacher answer key. Deep-learning internals and narrow/general/strong AI taxonomy are outside this lesson’s core scope.
