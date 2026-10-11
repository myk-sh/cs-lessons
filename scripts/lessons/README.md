# Lesson generators

`ai.js` produces the IGCSE 0478 Paper 1 section 6.3 lesson in the existing house style. The source is the teacher-supplied Hodder textbook extract (printed pages 241–249); no textbook pages or artwork are redistributed. Activities are original and use suggested marking points. Official Cambridge question papers/mark schemes were unavailable during preparation.

The six task definitions are shared between the worksheet and student booklet. The separate teacher key covers both. The deck has 22 slides with speaker notes; the lesson is intended for roughly 60 minutes after Robotics, with Task 6 as extension/homework. Deep learning and the textbook's narrow/general/strong AI taxonomy are outside this lesson's core scope.

Requires Node.js with `pptxgenjs` and `docx`, plus the repository's LibreOffice/Poppler render helpers. In the prepared cloud environment:

```bash
source /workspace/lesson-tools/activate.sh
cd /workspace/cs-lessons
node scripts/lessons/ai.js deck '/workspace/lesson-tools/ai-lesson'
python3 skills/comp-sci-lesson-maker/scripts/fix_ppr.py '/workspace/lesson-tools/ai-lesson/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx'
render_slides.sh '/workspace/lesson-tools/ai-lesson/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx' '/workspace/lesson-tools/qa/ai/slides'
node scripts/lessons/ai.js documents '/workspace/lesson-tools/ai-lesson' '/workspace/lesson-tools/qa/ai/slides'
```

Review the rendered deck and all three documents before copying final files to `0478 P1/Artificial Intelligence/`. The website automatically includes the deck, worksheet and booklet. It excludes the answer key.
