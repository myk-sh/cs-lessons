---
name: comp-sci-lesson-maker
description: Create complete computer science lessons - a PowerPoint slide deck, a student worksheet, a separate teacher answer key, and a student booklet that interleaves the key slides with the tasks. Handles programming lessons (students trace code, fill gaps, debug, then build the program) and theory lessons (recall test, diagrams, classify/apply tasks, then real exam questions with official marking points). Built for Cambridge International AS & A Level Computer Science 9618 (Paper 1 theory, Paper 3, Paper 4 programming) and IGCSE 0478. Use whenever a teacher asks for a CS lesson, slides, worksheet, booklet, exam questions or answer key on a topic such as networking, hardware, data representation, databases, data structures, recursion or OOP, says "make another lesson like this one", uploads a lesson, textbook pages or past-paper questions, or mentions 9618, 0478, a paper number, pseudocode or VB.NET/Python/Java. Also files each finished lesson in the teacher's private GitHub repo myk-sh/cs-lessons.
---

# Comp sci lesson maker

This skill produces four matched documents for one lesson, then files them in the teacher's lessons repo (step 10):
1. **Slide deck (.pptx)** - teaches the concept, shows worked traces and annotated code, and shows how examiners mark it.
2. **Worksheet (.docx)** - student copy: six tasks of increasing difficulty, **no answers**.
3. **Answer key (.docx)** - separate teacher copy: answers, marking-point tables and model programs for every task.
4. **Student booklet (.docx)** - the essential slides placed right before the tasks that use them ("slide, slide, then task"), so students don't juggle the deck and the worksheet. No answers.

The worksheet and booklet use **the same task numbers and wording**, so one answer key covers both.

There are two lesson types. Decide which one you are making first, because the worksheet tasks differ:

- **Programming lesson** (data structures, algorithms, OOP, file handling - 9618 Paper 2/4): the sequence is **understand → trace → complete → write → build**. Students see the idea, trace it by hand, fill gaps in real code, write a routine from an exam-style specification, debug a broken version, then build and test the whole program at the computer. Workflow steps 1-9 below describe this lesson type in full.
- **Theory lesson** (networking, hardware, data representation, security, databases, ethics - 9618 Paper 1/3): the sequence is **recall → understand → apply → exam practice**. See "Theory lessons" below for what changes. The rest of the workflow (style, mark schemes, answer key, booklet, QA, delivery) is the same.

Either way, every task should feel like a real exam question, and official marking points beat invented ones.

## Before you start

Read these first:
- `/mnt/skills/public/pptx/SKILL.md` and `/mnt/skills/public/docx/SKILL.md` (tooling gotchas, validation).
- `references/9618-exam-notes.md` if the course is Cambridge 9618 (exam conventions per ADT, mark scheme sources, known errors in published answers).
- The worked examples in `references/examples/`. Programming: `bt_deck.js`, `bt_ws.js` (worksheet + answer key in one script) and `bt_booklet.js` are the fullest set; `stacks_deck.js` + `stacks_ws.js` is simpler. Theory: `tc_deck.js` (network diagrams: bus/star/mesh/hybrid/cloud helpers), `tc_ws.js` and `make_tc_booklet.py` (topologies and cloud computing, with a recall test). Copy their structure rather than inventing a new one. They `require('../../scripts/...')` - copy `scripts/lib.js` and `scripts/wslib.js` next to your own scripts and fix the paths.

## Workflow

### 1. Match the teacher's existing material
If the teacher uploaded a previous lesson, it defines the house style and structure. Extract it before writing anything:
- `markitdown lesson.pptx` for content; render it (`scripts/render.sh lesson.pptx ref`) and look at the contact sheet.
- Pull exact colours, fonts, sizes and positions from the XML or with python-pptx (shape positions, `srgbClr`, `typeface`).
- `pandoc -t markdown worksheet.docx` for worksheet structure; check `word/document.xml` for fills, borders and fonts.
- Note the programming language used (the original series used **VB.NET**; keep whatever the teacher uses).

`scripts/lib.js` and `scripts/wslib.js` already implement one house style (white slides, Quicksand + Roboto Mono, navy `494985` tables and pill labels, yellow `FFD84D` title underline). If the teacher's style differs, edit the `C`/`F` constants and the `base()`/`titleSlide()` layout rather than writing new helpers. Matching the teacher's style beats generic design advice, including the pptx skill's "no accent lines" rule, because the lessons must sit alongside their own.

### 2. Gather real exam questions and their official mark schemes
Use the teacher's past-paper compilation if they gave one (txt files may need `iconv -f latin1 -t utf-8`; PDFs may already be in context). Then **look up the published mark scheme for every question you base a task on** – teachers want the real marking points, not guesses. See `references/9618-exam-notes.md` §1 for URL patterns and search tips.

From each mark scheme, record:
- marks per part and each marking point (especially "max N from M points");
- the structure of the model answer (e.g. `CurrentNode` + `Placed` loop), so your code mirrors what students will see;
- what alternatives are accepted (e.g. "node or index of node");
- any bugs or weaknesses in the model answer – these make excellent discussion points.

Cite the paper and variant (e.g. "9618/42 Nov 2025 Q3(b)") wherever you use official points. Paraphrase them; don't paste long chunks. If you can't find a mark scheme, say "typical marking points" and tell the teacher, rather than implying they're official.

### 3. Plan the data and verify every answer by simulation (programming)
Choose the example data before writing slides: one "lesson" dataset for worked examples on slides, and a *different* one for worksheet tasks, so the slides don't give away the answers. Reuse official exam test data where possible (students can check against the mark scheme).

Write a short Python simulation (see `references/examples/treesim.py`) that reproduces every trace table, traversal, final array state and expected program output in the lesson. Run it and use its output for all answers. Hand-worked traces are where errors creep in.

### 4. Build the deck (~16–23 slides)
Use `scripts/lib.js` (API documented at the top of the file). Slide sequence:

| # | Slide | Pill label |
|---|---|---|
| 1 | Title (topic, "Y13 - Cambridge International 9618") | – |
| 2 | True/False starter table (5 statements, including common misconceptions) | Starter activity |
| 3 | "In this lesson, you will" – 5 objectives | Objectives |
| 4–6 | Concept: definition + visual/diagram, real-world uses or comparison table, think-pair-share | Activity 1 |
| 7–8 | How it is stored (declarations code + what each variable/column means), reading it from a table | Activity 2 |
| 9–11 | Core operation: algorithm steps (step cards) → annotated code → worked trace table | Activity 3 |
| 12–15 | Further operations (second algorithm, recursion trace, search, alternative representation/convention) | Activity 4–5 |
| 16–17 | "How examiners mark this" – official marking-point tables | Activity 5/6 |
| 18 | Guided practice – list of worksheet tasks ("check your work against the answer key when your teacher shares it") | Activity n |
| 19 | Common misconceptions table (misconception → why it is wrong) | Plenary |
| 20 | Exit question (answer in speaker notes) | Plenary |
| 21 | Summary ("In this lesson, you") + next lesson | Summary |

Principles:
- **Every slide has a visual**: a table, a code box with step cards beside it, or a diagram (stack column, linked-list nodes with arrows, tree boxes and lines – see the `drawStack`, `node`/`link`, `tree` helpers in the examples).
- **Code slides**: highlight the key lines (`{t, hl:true}`), put numbered step cards beside the code explaining *why* each part exists, and add one "quick check" or "spot the difference" callout.
- **Show every exam convention the topic has** (e.g. the two stack pointer conventions, 2D-array vs record vs OOP representations), because students meet all of them in exams.
- **Speaker notes on every content slide**: answers, what to emphasise, mark scheme source, and links back to earlier lessons.
- Code must fit: Roboto Mono width ≈ 0.6 × pt per character. Split long routines across two side-by-side code boxes ("continued on the right") rather than shrinking below ~11pt.

### 5. Build the worksheet
Use `scripts/wslib.js`. Structure (marks shown are typical):
1. **Task 1 Retrieval check** [5] – the starter statements, with a "correction if false" column.
2. **Task 2 Tracing** [6–10] – Part A trace/draw, Part B trace an operation (trace table with the loop variables), Part C a follow-up (search, remove, other convention).
3. **Task 3 Complete the code** [5] – real routine with five numbered gaps `(1)........`, then an answer line.
4. **Task 4 Write from a specification** [4–8] – exam-style bullet specification (ideally a real past-paper part with its real marks) + writing box; optional part (b) applying it to the Task 2 data.
5. **Task 5 Extension – find and fix the bugs** – two realistic bugs marked `' <-- line A/B`, each with a clear observable effect (wrong order, crash, infinite loop, lost data).
6. **Task 6 Build it – at the computer** – based closely on a real Paper 4 question: file name to save as, parts (a)… with official marks, exact test data, **"Predict first"** tables or lines before each test run, screenshots. Add 1–2 stretch tasks (another past-paper part, an alternative representation).
The worksheet contains **no answers or mark scheme** - it is the student copy.

Keep code lines ≤ ~85 characters in the worksheet (use VB.NET `_` line continuation). Use `lines(n)` for answer lines (tab-leader lines; consecutive bordered paragraphs merge and lose their lines).

### 6. Build the answer key (separate teacher document)
Generate it from the same script as the worksheet, so task wording, numbering and marks can never drift apart. In `bt_ws.js` the worksheet is written with `w.build(K.splice(0), worksheetPath)`, then the script continues adding answer-key content to the now-empty `K` and builds the key file:
- `w.title('<Topic> - Answer key', '... Teacher copy - not for students', { noName: true })` then `w.keyBanner(...)` (red "ANSWER KEY - TEACHER COPY" strip saying it covers both the worksheet and the booklet).
- For each task: the answers (tables with the filled-in values, code-gap answers, model code), then the marking points - official ones cited by paper/variant, e.g. "9618/42 Nov 2025 Q3(b), max 7" - and short teaching notes (why a gap answer matters, likely wrong answers, errors in published model answers).
- Task 6: a complete, runnable model program, a part-by-part marking table, and expected outputs as tables (including the "predict first" answers).
- Helpers for answers written in place: `w.A(text)` (red answer paragraph), `w.a(text)` (red table cell), `w.marking(title, rows)` (marking-point table), `code(lines, { color: w.COL.ans })` (red model code).

### 7. Build the student booklet
The booklet saves students switching between the slides and the worksheet: **Learn** sections (key slides as images) followed by the **Task** that uses them. See `references/examples/bt_booklet.js`.

1. Render the finished deck to images: `scripts/render_slides.sh deck.pptx slideimg` → `slideimg/s-01.jpg ...` (150 dpi).
   Then build the booklet with `scripts/gen_booklet.py`: it cuts each task out of the worksheet script **verbatim** (between the `// ---------- Task N` markers, stopping at the worksheet's `w.build(K.splice(0)` line), so the booklet can never drift from the worksheet. You write only a plan: an ordered list of `('task', 'Task 2', startMarker, endMarker)` slices and `('js', "...")` Learn sections. See `references/examples/make_booklets.py` (stacks and linked lists plans) and `bt_booklet.js` (a hand-written booklet). The generated script expects `wslib.js` next to it.
2. Start with the cover (title, Name/Date, a 3-bullet "how to use this booklet") and Task 1 (retrieval starter).
3. Then alternate: `w.learn('<section>')` banner + 1-3 `w.slideImage(path, 'Slide n - title')`, then the task or task part that depends on those slides. Split a multi-part task (e.g. Task 2 Parts A / B+C) across sections when different parts need different slides. Keep the task text identical to the worksheet (reference slides where helpful, e.g. "use slide 11 as a model").
4. Choose slides by asking "what does the student need to *do* the next task?". Leave out the title, starter, objectives, guided-practice and summary slides.
5. **Never show a slide that gives away the next task's answers.** If a slide contains the exact code a gap-fill task asks for, put it after the task on a new page as a "Check your answers" section. Put official mark-scheme slides just before the build task as a self-check list. Put alternative-representation slides next to the stretch task that needs them.
6. **Small code does not print well.** A slide image printed ~7 in wide shrinks 11-12 pt code to ~6 pt. For dense code slides (long routines split across two boxes), use a native `code()` block with short step comments instead of the image.
7. End with a Review section: the misconceptions slide, "look back at your Task 1 answers", and the exit question with answer space.
8. Add `pageBreak()` before major Learn sections, but not after a short task part - that leaves a nearly empty page. Render and remove breaks that waste space. Put `keepNext` on a prompt that is followed by a writing box.

### 8. QA – always render and look
1. `node deck.js && python scripts/fix_ppr.py deck.pptx && python /mnt/skills/public/pptx/scripts/office/validate.py deck.pptx`. **Always run `fix_ppr.py`.** When `addText` gets several runs in one paragraph (e.g. a bold label run + a normal run, or a caption + credit), pptxgenjs writes one `<a:pPr>` per run. PowerPoint then refuses to open the file ("Sorry, PowerPoint can't read..."), even though LibreOffice renders it and the validator passes. The script keeps only the first `<a:pPr>` in each paragraph. Never pass an empty-string run either.
2. `scripts/render.sh deck.pptx d` and `scripts/render.sh sheet.docx w`, then `view` each `*grid*.jpg`.
3. Render every document (deck, worksheet, answer key, booklet). Look for: titles wrapping into two lines (shorten them – the title box sits beside the pill), text overflowing cards, labels running off the slide edge, code lines wrapping, tables splitting awkwardly across worksheet pages (make wide data tables horizontal), and large empty areas.
4. In the booklet also check: no answer-revealing slide shares a page with the task before it, captions are next to their slide, and code in the slide images is legible.
5. Fix in the generator script, rebuild, re-render only what changed.

If `scripts/fix_ppr.py` is missing from your copy of the skill, save this as `fix_ppr.py` first:
```python
"""Remove duplicate <a:pPr> elements inside a paragraph (pptxgenjs writes one per run for
multi-run single-paragraph text; PowerPoint refuses to open such files)."""
import re, sys, zipfile, shutil
src = sys.argv[1]; tmp = src + '.tmp'
pat = re.compile(r'<a:p>(.*?)</a:p>', re.S)
def fix_para(m):
    body = m.group(1); first = True
    def keep(mm):
        nonlocal first
        if first: first = False; return mm.group(0)
        return ''
    body = re.sub(r'<a:pPr\b[^>]*/>|<a:pPr\b[^>]*>.*?</a:pPr>', keep, body, flags=re.S)
    return '<a:p>' + body + '</a:p>'
n = 0
with zipfile.ZipFile(src) as zi, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zo:
    for it in zi.infolist():
        data = zi.read(it.filename)
        if re.match(r'ppt/(slides|notesSlides)/.*\.xml$', it.filename):
            s = data.decode('utf-8'); s2 = pat.sub(fix_para, s)
            if s2 != s: n += 1
            data = s2.encode('utf-8')
        zo.writestr(it, data)
shutil.move(tmp, src); print('fixed parts:', n)
```

`render.sh` installs a fontconfig alias so Roboto Mono/Consolas render as a same-width mono font. Quicksand still renders as a substitute, so leave a little slack in text boxes.

### 9. Deliver
Save to `/mnt/user-data/outputs/` with names like `Y13_9618_Lesson_-_<Topic>.pptx`, `<Topic>_Worksheet.docx`, `<Topic>_Answer_Key.docx` and `<Topic>_Student_Booklet.docx` (match the teacher's naming if they have one), then send all four files to the teacher. In the reply, keep it short:
- the lesson and worksheet flow;
- which official mark schemes were used, and anything that changed because of them;
- any errors found in published answers;
- what was **not** verified – usually "the VB.NET wasn't compiled; run the Task 6 model answer once before the lesson";
- anything the teacher may want to edit (e.g. the "Next lesson" line).

If you run low on tool calls, write the files and present them before polishing. An unpresented file is invisible to the teacher.

### 10. File the lesson in the lessons repo
Every finished lesson also goes into the teacher's private GitHub repo **`myk-sh/cs-lessons`**, organised by syllabus and paper. Do this without being asked, right after delivering the files.

Layout:
```
README.md                     index table of every lesson
0478 P1/<Topic>/              IGCSE Paper 1 (theory)
0478 P2/<Topic>/              IGCSE Paper 2 (problem solving and programming)
9618 P1/<Topic>/ ... 9618 P4/<Topic>/
skills/comp-sci-lesson-maker/ this skill (source + packaged .skill)
```
- **Folder:** `<syllabus> P<paper>/<Topic in Title Case with spaces>/`, e.g. `9618 P4/Binary Trees/`, `0478 P1/Packet Switching/`. Pick the paper the content is examined on (9618 programming ADTs → P4; 9618 networking → P1; 0478 theory → P1, algorithms/programming → P2). If a lesson really spans two papers, use the main one and mention the other in the README row. Create a paper folder if it doesn't exist, and delete its placeholder `README.md` once it holds a lesson.
- **Files:** the four delivered files with their delivered names (deck, worksheet, answer key, booklet). Add the teacher's own uploaded lesson for the topic only if they ask.
- **Index:** add a row to the matching table in the root `README.md` - `| P<n> | [<Topic>](<url-encoded path, spaces as %20>) | <Year> | <syllabus ref and short description> |` - keeping rows grouped by paper. Replace a "*(none yet)*" row.
- **Updated lesson:** if the topic already exists, overwrite its files in place (git keeps the history) rather than making a second folder.
- **Skill changes:** if this skill was changed during the session, copy the new version into `skills/comp-sci-lesson-maker/` and rebuild `comp-sci-lesson-maker.skill` in the same commit.
- **Commit and push** to `main`, with a message like `Add 9618 P4 lesson: Hash Tables`. Use the teacher as author (their name and email) when the session knows them.
- **Never** put student data (names, marks, scanned scripts) in the repo.

Getting access (try in this order):
1. Repo tools in the session (e.g. `add_repo` with owner `myk-sh`, repo `cs-lessons`, push access), then `git clone --depth 1 https://github.com/myk-sh/cs-lessons`. Run `git fetch origin main` and rebase before pushing, so a shallow clone doesn't push the whole tree again.
2. Git on the teacher's linked computer, if the session has it.
3. If neither works, still deliver the files, and tell the teacher in one line that the repo wasn't updated and what access is missing. A missing repo connection never blocks the lesson.

In the final reply, add one line saying where the lesson was filed (e.g. "Filed in cs-lessons → 9618 P4/Hash Tables").

## Theory lessons

A theory lesson keeps the same four documents, house style, answer key and booklet. These parts change:

**Source material.** Teachers often upload textbook pages (e.g. the Hodder 9618 coursebook). Teach exactly the syllabus points on the pages they name, use the textbook's terms and examples, and check them against the mark schemes, which sometimes word things differently. The mark scheme wording is what students should learn. If the textbook says something an examiner would not credit, follow the mark scheme and say so in the speaker notes.

**Recall test first.** If the lesson follows another lesson (especially one taught online or missed), Task 1 is a closed-book recall test on the *previous* lesson, about 15-20 marks: matching or classifying (quick marks), "give three benefits" lists, and one or two real exam questions on the earlier content. Deck slide 2 introduces it (what it covers, marks, closed book, minutes). The answer key gives a re-teaching threshold (e.g. "fewer than 3/5 on Q3 → recap client-server").

**Deck.** One concept per slide, each with a diagram drawn from shapes (not stock images): e.g. topology diagrams, a hub vs switch side-by-side, cloud and servers. Then a comparison table across the concepts, a think-pair-share scenario, and **exam-focus slides** showing a real question with its official marking points. The exam-focus speaker notes say to show the slide *after* students attempt the matching task. See `tc_deck.js` for the diagram helpers (`pc`, `device`, `line`, `bus`, `star`, `mesh`).

**Worksheet tasks** (theory version):
1. **Recall test** on the previous lesson (closed book).
2. **Draw and identify**: draw the structures/diagrams, and name the concept from a description.
3. **Classify and apply**: a real tick-box / "one or more boxes" question, then an apply task (e.g. trace which devices receive a packet through a bus, a hub and a switch).
4. **Exam questions on concept A**, using real past-paper parts with their marks, cited under each part.
5. **Exam questions on concept B** (e.g. cloud), including a scenario table ("choose X/Y/Z for each organisation and justify").
6. **Extension**: a compare/contrast or justify question (e.g. a textbook extension activity).

Use real exam questions wherever possible. If you only have the mark scheme, write the question in your own words, labelled "Based on 9618/1x Month Year Qn". If you have the paper, cite the exact question. Teach the 2-mark "explain" pattern: point + expansion applied to the scenario.

**Answer key.** Same as programming. Label each answer as official (cite paper/variant/question) or "suggested". If a mark scheme extract is ambiguous (e.g. tick positions lost when extracting the text), give the most defensible answer and add a note to check the printed scheme.

**Booklet.** Put the recall test first ("do this from memory before you turn the page"). Comparison tables that answer a tick-box task, and all exam-focus slides, go **after** their task as "summary" or "check your answers" pages.

**Verification.** Theory lessons have no code to simulate, so check every answer in the key against the textbook pages and the official mark schemes instead.

## Pictures in slides
Web image hosts are usually blocked from the sandbox, so pictures come from what the teacher uploads:
1. Render the teacher's textbook pages: `pdftoppm -png -r 150` (300 dpi for photos).
2. Crop each figure or photo with PIL, then auto-trim white borders and remove captions/stray text lines. Always view a contact sheet of the crops and re-crop until each is clean - crop boxes estimated from the page layout are usually off by a strip.
3. Record pixel sizes in a JSON file and place images with an aspect-preserving `pic()` helper (fit inside a box, centre, light frame) - see `references/examples/au_deck.js`. Never stretch an image.
4. Add a small credit caption (e.g. "Images: <textbook>, Chapter n") on at least one slide, and tell the teacher the pictures came from their uploaded book.

## Using a teacher's question pack
Packs compiled from past papers often repeat pages and mix in parts from other topics. Extract the text (`pdftotext -layout`), list every question with its paper code and marks, keep only the parts on this lesson's topic, and use them verbatim with the paper cited under each part. Take the official marking points from the supplied mark scheme for the answer key, and list the unused off-topic parts at the end of the key so the teacher can reuse them.

## Language notes (VB.NET, the default in this series)
- Globals at module level: `Dim StackData(9) As Integer` (index 0–9, so 10 elements); 2D arrays `Dim TreeArray(49, 2) As Integer`.
- Records: `Structure Node ... End Structure`; array elements can be assigned field-by-field.
- Classes: `Private` attributes, `Sub New(...)` constructor, null is `Nothing`, test with `Is Nothing` / `IsNot Nothing`.
- Use `AndAlso` when the second condition would crash if the first is false (e.g. `Current <> -1 AndAlso LinkedList(Current, 0) < x`).
- Files: `IO.StreamReader`/`IO.StreamWriter` inside `Try ... Catch ex As Exception`.
- If the teacher uses Python or Java, translate the same structures; keep identifiers from the exam questions.
