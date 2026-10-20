# Binary trees follow up

A gradual follow-up to the original Y13 VB.NET lesson. Allow 70–80 minutes, or split after Task 3. Students need arrays, procedures and basic selection; no chapter 20 OOP knowledge is assumed.

- **Slide deck:** 20 slides with teacher notes and worked examples.
- **Worksheet:** six tasks, with drawing space and a complete call/return trace to fill in.
- **Student booklet:** the same task wording, interleaved with the relevant teaching slides. Use this or the worksheet.
- **Answer key:** answers, teaching checkpoints, traces and model code. Keep this and Model.vb for the teacher.
- **Starter.vb:** a supplied four-row tree and a TODO for the traversal. Test calls start commented out.
- **Model.vb:** working in-order traversal plus optional post-order and record versions.

Sequence: draw a tree, map links to indexes, act out calls and returns on a tiny tree, complete InOrder, repair mistakes, predict and run tests. Post-order and record translation are optional. Search and recursive insertion are deferred.

Columns match the previous lesson: left pointer = 0, data = 1, right pointer = 2. All recursive arguments are indexes. This lesson checks `p = -1` on entry, before any array access, and therefore safely handles an empty starting tree. Explain this change from the previous lesson's child-pointer checks.

These are original formative activities, not reproduced exam questions or official mark schemes. The unordered tree in Task 3 intentionally prevents students from getting the answer by simply sorting the values.

For the practical, replace the generated Program.vb in a VB.NET console project with the starter. Keep only one module with Main in the project. The model's record traversal requires calling LoadRecords first.

Sources for rebuilding: build_lesson.py creates the documents and content data; deck.mjs creates and validates the slides; rerun build_lesson.py --booklet after rendering slides. render_word.ps1 makes private Word PDF previews. check_resources.py creates private page previews and a VB.NET test harness. Temporary files stay in .build and are ignored by Git.
