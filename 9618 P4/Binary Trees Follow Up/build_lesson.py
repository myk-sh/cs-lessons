"""Rebuild the matched follow-up resources. Requires python-docx.
Run deck.mjs after this script, then rerun with --booklet to include slide images.
"""
from pathlib import Path
import json, sys
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

HERE = Path(__file__).resolve().parent
BUILD = HERE / '.build'
BUILD.mkdir(exist_ok=True)
NAVY = '494985'
TRAV = '''Sub InOrder(ByVal p As Integer)
    If p = -1 Then
        Exit Sub
    End If
    InOrder(TreeArray(p, 0))
    Console.WriteLine(TreeArray(p, 1))
    InOrder(TreeArray(p, 2))
End Sub'''
MAIN_ROWS = [[0, 1, 40, 2], [1, -1, 20, 3], [2, -1, 60, -1], [3, -1, 30, -1]]
SMALL_ROWS = [[0, -1, 15, -1], [1, 2, 25, 0], [2, -1, 10, -1]]
# Task 3 uses a binary tree deliberately not ordered: focus on pointers, not sorting.
TASKS = [
 dict(title='Task 1  Draw and explain', intro='Work on paper. An ordered binary tree is also called a binary search tree (BST). Use smaller values on the left and larger values on the right. All values here are distinct.', parts=[
 ('p','A. Insert 40, 20, 60, 30 in that order. Draw a new sketch after each insertion. Label each left or right link L or R.'),('space',2.0),
 ('p','B. On your final sketch, circle the root, underline the leaves, and loop around the whole subtree rooted at 20.'),
 ('p','C. Explain why 30 belongs to the left subtree of 40 even though it is a right child. Does every binary tree obey the BST ordering rule?'),('lines',3)]),
 dict(title='Task 2  Link the picture to storage', intro='Keep your Task 1 tree. Allocate rows in insertion order: 40 at index 0, 20 at 1, 60 at 2 and 30 at 3. A pointer stores a ROW INDEX. -1 means no child. Columns are 0 = left, 1 = data, 2 = right.',parts=[
 ('p','A. Fill every blank. RootPointer = ______. Both missing child pointers must be -1.'),
 ('table',[['Index','Left (0)','Data (1)','Right (2)'],[0,'',40,''],[1,'',20,''],[2,'',60,''],[3,'',30,'']]),
 ('p','B. Start at row 0 and follow its left pointer, then that row’s right pointer. Write the indexes visited and the data values seen.'),('lines',2),
 ('p','C. Explain the difference between TreeArray(1, 2) and TreeArray(TreeArray(1, 2), 1). Work out both values.'),('lines',3),
 ('p','D. A different tree has RootPointer = 2 and the table below. Draw it, with each node labelled index : data. Never assume the root is row 0.'),
 ('table',[['Index','Left (0)','Data (1)','Right (2)'],[0,-1,9,-1],[1,-1,4,-1],[2,1,7,0]]),('space',1.3)]),
 dict(title='Task 3  Act out calls and returns', intro='Use the SMALL tree below. RootPointer = 1. This is a binary tree but deliberately not a BST. Follow pointers rather than sorting the values. Draw the tree before tracing.',parts=[
 ('table',[['Index','Left (0)','Data (1)','Right (2)']]+SMALL_ROWS),('space',1.0),
 ('p','A. Use the numbered rules below. Each call has its own p and place to resume. On a new call, put a paper frame on top of the waiting calls. On return, remove it and resume the caller.'),
 ('code','1  If p = -1, return immediately.\n2  Call InOrder(left pointer of row p).\n3  Output the data in row p.\n4  Call InOrder(right pointer of row p).\n5  Return to the caller.'),
 ('p','B. Complete the trace on the next page. The first two events are done. A return from -1 produces no output. Use indexes inside InOrder(...).'),
 ('break',None),('h','Task 3 continued'),
 ('table',[['Event','Active p','What happens / where next?','Output added'],['1','1','Call InOrder(2); p=1 waits at rule 3','—'],['2','2','Call InOrder(-1); p=2 waits at rule 3','—']]+[[str(i),'','',''] for i in range(3,17)]),
 ('p','C. Just before outputting the left leaf: what is the active p, what call is waiting underneath it, and at which rule will that waiting call resume?'),('lines',2),
 ('p','D. Write the complete output. Explain why returning from the left subtree does not end the whole traversal.'),('lines',3)]),
 dict(title='Task 4  Complete a recursive procedure',intro='Return to the Task 1 tree and your Task 2A table. This version accepts -1 and checks it before reading the array. Complete the five gaps without looking at the full solution.',parts=[
 ('code','Sub InOrder(ByVal p As Integer)\n    If p = (1)________ Then\n        (2)________\n    End If\n    InOrder(TreeArray(p, (3)________))\n    Console.WriteLine(TreeArray(p, (4)________))\n    InOrder(TreeArray(p, (5)________))\nEnd Sub'),
 ('p','A. Explain what each of the five filled gaps does.'),('lines',4),
 ('p','B. Which call starts the whole traversal? What happens if RootPointer = -1?'),('lines',2),
 ('p','C. Predict the output for the Task 1 tree. Then draw the waiting calls when the procedure is about to output 30. Label each frame with p and its next action.'),('space',1.7),
 ('p','D. A student passes TreeArray(p, 1) to the recursive call. Explain the mistake and the likely effect.'),('lines',2)]),
 dict(title='Task 5  Repair and transfer',intro='Use the Task 1 tree. Check the base case and the position of the output separately.',parts=[
 ('p','A. This procedure contains two independent mistakes. Identify each, explain its effect, and rewrite the corrected procedure below.'),
 ('code','Sub Broken(ByVal p As Integer)\n    Console.WriteLine(TreeArray(p, 1))  \' line A\n    If p = -1 Then Exit Sub            \' line B\n    Broken(TreeArray(p, 0))\n    Broken(TreeArray(p, 2))\nEnd Sub'),('space',1.8),
 ('p','B. Optional, after your teacher checks A: write PostOrder(p). It must accept a node index, safely handle -1, visit the left subtree, visit the right subtree, then output this node. Use only the 2D array.'),('space',1.6),
 ('p','C. Predict the post-order output for Task 1. Explain why the root appears last.'),('lines',2)]),
 dict(title='Task 6  Predict then run',intro='Open Binary_Trees_Follow_Up_Starter.vb in a VB.NET console project. Save your version as BinaryTreePractice. The table is supplied so you can focus on recursion. Do not write an insertion routine.',parts=[
 ('p','A. Replace the TODO in InOrder with your completed Task 4 code. Before running, fill the prediction column. Then uncomment one test call at a time, run, and record the actual output. Write “no output” where appropriate.'),
 ('table',[['Test call','Prediction','Actual output'],['InOrder(RootPointer)','',''],['InOrder(1)','',''],['InOrder(2)','',''],['InOrder(-1)','','']]),
 ('p','B. Put a breakpoint on the output line. Step through the main tree. At data 30, record p and the waiting calls. Explain where execution goes after the call for node 30 finishes.'),('lines',3),
 ('p','C. Change TreeArray(3, 1) from 30 to 35. Predict the new output before running. Why do the pointers stay the same? Restore 30 afterwards.'),('lines',2),
 ('p','D. If ready: add your PostOrder procedure from Task 5 and test the whole tree, a leaf and -1. Record predictions first.'),('lines',2),
 ('p','Exit check: A tree has root data 8 at index 2 and only a left child, data 5 at index 0. Draw it. Give the first call, the in-order output, and the point where the root call resumes after its left call.'),('space',0.85)]),
]

def doc(title, subtitle):
 d=Document(); s=d.sections[0]; s.page_width=Inches(8.5); s.page_height=Inches(11)
 s.top_margin=s.bottom_margin=Inches(.62); s.left_margin=s.right_margin=Inches(.7)
 for name in ['Normal','Title','Heading 1','Heading 2']:
  d.styles[name].font.name='Calibri'; d.styles[name].font.color.rgb=RGBColor(0,0,0)
 for style in d.styles:
  for border in list(style.element.iter(qn('w:pBdr'))): border.getparent().remove(border)
 d.styles['Normal'].font.size=Pt(11); d.styles['Normal'].paragraph_format.space_after=Pt(7)
 d.styles['Heading 1'].font.size=Pt(19); d.styles['Heading 2'].font.size=Pt(14)
 d.add_heading(title,0); d.add_paragraph(subtitle)
 f=s.footer.paragraphs[0]; f.text='9618 P4  •  Binary trees follow up     '
 fld=OxmlElement('w:fldSimple'); fld.set(qn('w:instr'),'PAGE'); f._p.append(fld)
 return d
def table(d,rows):
 t=d.add_table(rows=0,cols=len(rows[0])); t.style='Table Grid'
 widths = [0.6,0.75,4.25,1.5] if rows[0][0]=='Event' else None
 if widths:
  t.autofit=False
  for c,w in zip(t.columns,widths): c.width=Inches(w)
 for ri,row in enumerate(rows):
  cells=t.add_row().cells
  if widths:
   for c,w in zip(cells,widths): c.width=Inches(w)
  for c,v in zip(cells,row):
   c.text=str(v)
   for p in c.paragraphs:
    p.paragraph_format.space_after=Pt(3 if widths else 5); p.paragraph_format.space_before=Pt(3 if widths else 5)
    for r in p.runs: r.font.size=Pt(10)
   if ri==0:
    sh=OxmlElement('w:shd'); sh.set(qn('w:fill'),NAVY); c._tc.get_or_add_tcPr().append(sh)
    for r in c.paragraphs[0].runs: r.font.bold=True; r.font.color.rgb=RGBColor(255,255,255)
  pr=t.rows[-1]._tr.get_or_add_trPr(); pr.append(OxmlElement('w:cantSplit'))
  if ri==0: pr.append(OxmlElement('w:tblHeader'))
 d.add_paragraph().paragraph_format.space_after=Pt(0)
def code(d,s):
 p=d.add_paragraph(); p.paragraph_format.space_after=Pt(9)
 for i,line in enumerate(s.splitlines()):
  r=p.add_run(('\n' if i else '')+line); r.font.name='Consolas'; r.font.size=Pt(10)
def space(d,h):
 p=d.add_paragraph('Sketch / working space'); p.paragraph_format.space_after=Inches(h)
def parts(d,parts):
 for kind,v in parts:
  if kind=='p': d.add_paragraph(v)
  elif kind=='h': d.add_heading(v,1)
  elif kind=='table': table(d,v)
  elif kind=='code': code(d,v)
  elif kind=='space': space(d,v)
  elif kind=='lines':
   for _ in range(v): d.add_paragraph('__________________________________________________________________')
  elif kind=='break': d.add_page_break()
def task(d,t):
 d.add_heading(t['title'],1); d.add_paragraph(t['intro']); parts(d,t['parts'])

SLIDES=[]
def slide(title,body='',tree=None,tab=None,code_=None,notes='',footer=''):
 SLIDES.append(dict(title=title,body=body,tree=tree,table=tab,code=code_,notes=notes,footer=footer))
WT=[['0 : 8',.5,0,-1],['1 : 3',.25,1,0],['2 : 12',.75,1,0]]
BIG=WT+[['3 : 6',.38,2,1]]
slide('Binary trees: a second look','Draw the tree. Follow a pointer.\nPause a call. Return to its caller.\n\nY13 • Cambridge 9618\nVB.NET • 2D arrays and records',WT,notes='Plan 70–80 minutes or split into two lessons. Core goal: a safe in-order traversal, explained through calls and returns. No OOP knowledge needed. Omit extensions if pupils need more tracing time.')
slide('What we are practising','1. Draw and label a tree.\n2. Convert links into row indexes.\n3. Trace a small recursive traversal.\n4. Complete and test InOrder.',tab=[['Core today','Later / optional'],['In-order and returns','Post-order transfer'],['2D array storage','Record translation']],notes='Success means explaining where a paused call resumes, not merely reciting sorted output. Use Tasks 1–2 for 15–20 min, Task 3 for 20 min, Task 4 for 10 min, Task 5A for 5 min, Task 6 for 15–20 min.')
slide('A tree we can draw','Insert 8, 3, 12, 6 in that order.\nStart at the root for each new value.\nSmaller goes left; larger goes right.\n\nWhere does 6 go? Why?',BIG,notes='Reveal or draw incrementally on the board. 6 < 8, then 6 > 3. Thus right child of 3, inside the left subtree of 8. Values are distinct; no duplicate rule is needed.',footer='Task 1 • Draw a fresh sketch after each insertion')
slide('The whole subtree matters','Each node has at most two children.\nA leaf has no children.\nA subtree includes its root and everything below it.\n\nThe BST rule applies to the entire subtree.',BIG,notes='Root: 8. Leaves: 6 and 12. Left subtree of 8: 3 and 6. A binary tree need not be ordered. Check Task 1 before moving on.')
slide('A pointer stores an index','Columns: 0 = left, 1 = data, 2 = right.\n-1 means there is no child.\nRootPointer is the index of the root.',tab=[['Index','Left','Data','Right'],[0,1,8,2],[1,-1,3,3],[2,-1,12,-1],[3,-1,6,-1]],notes='Keep the earlier lesson column convention. A cell containing 3 in a pointer column means row 3; data 3 is a different concept. Task 2 uses different data.')
slide('Following a pointer in two steps','TreeArray(1, 2) = 3\nRead the right pointer in row 1.\n\nTreeArray(3, 1) = 6\nRead the data in row 3.',BIG,notes='Ask students to point physically to the pointer cell, row label, then data cell. Never pass data as though it were a row index.',footer='Task 2 • Complete the table, then reconstruct a different tree')
slide('One job for each call','InOrder(p) means:\noutput the subtree whose root is at index p.\n\nEach call remembers its own p\nand where to continue after its child returns.',WT,notes='Use three paper frames labelled p=0, p=1, p=2 plus -1 frames. Do not introduce code yet. The index labels must stay visible.')
slide('The empty subtree','When p = -1, return immediately.\nRead no array cell. Output nothing.\n\nA leaf still has two empty subtrees.',code_='If p = -1 Then\n    Exit Sub\nEnd If',notes='This is a deliberate change from the previous lesson, which checked child pointers before calling. Here the procedure accepts -1, so the starting tree can also be empty. Both are valid designs; use only this one today.')
slide('The in-order recipe','For the subtree at p:\n\n1. If p = -1, return.\n2. Do the whole left subtree.\n3. Output this node’s data.\n4. Do the whole right subtree.\n5. Return to the caller.',WT,notes='Left, node, right applies at every node, not just the original root. Put your finger on the current rule. The caller pauses while a child call runs.')
slide('A leaf takes three calls','Start InOrder(1), where data = 3.\nIts two child pointers are -1.',tab=[['Event','Action','Output'],['1','Call InOrder(-1) on the left','—'],['2','Empty call returns to p=1','—'],['3','Output TreeArray(1, 1)','3'],['4','Call InOrder(-1) on the right','—'],['5','Empty call returns; leaf returns','—']],notes='There are three invocations counting the leaf and its two empty calls. Returning from an empty child resumes the leaf, rather than finishing the whole traversal.')
slide('The root waits','Start InOrder(0).\nIt calls InOrder(1).\nThe root call waits before its output.\n\nAfter the left call finishes,\np=0 resumes and outputs 8.',WT,notes='Physical rehearsal: teacher holds the root frame; a pupil performs the left leaf and hands control back. Ask: what is p in the resumed call? Answer 0. It was not permanently replaced by 1.')
slide('A complete three-node trace','All arguments below are indexes.',tab=[['Stage','What happens','Output so far'],['Left subtree','1 calls -1; outputs 3; calls -1; returns','3'],['Resume root 0','Output 8, then call InOrder(2)','3, 8'],['Right subtree','2 calls -1; outputs 12; calls -1; returns','3, 8, 12'],['Resume root 0','Return to Main','3, 8, 12']],notes='Expand each empty call and return orally. Task 3 deliberately uses a non-BST so sorting cannot substitute for a trace.',footer='Task 3 • Draw first, then act out all calls and returns')
slide('A checkpoint before coding','When the left subtree finishes:\n\nWhich call resumes?\nWhat is its p?\nWhich instruction comes next?\n\nUse your paper frames to explain.',WT,notes='For the worked tree: root call InOrder(0), p=0, output TreeArray(0,1)=8. If pupils cannot answer, repeat the leaf and root activities before Task 4. Do not advance merely because final output is correct.')
slide('Your turn to complete the code','Use the recipe to fill Task 4.\n\nCheck for -1 before any array access.\nPass a child’s index to each call.\nOutput the data between those calls.',tab=[['Meaning','Column'],['Left child index','0'],['Node data','1'],['Right child index','2']],notes='Keep the full solution on the following slide hidden until pupils have attempted Task 4. Support: ask what each column means; do not simply dictate the numbers.',footer='Task 4 • Explain each gap as well as filling it')
slide('The complete in-order procedure','Each call gets its own local p.\nThe caller resumes after a child call.\n\nStart with InOrder(RootPointer).',code_=TRAV,notes='Reveal after Task 4. Gap answers: -1, Exit Sub, 0, 1, 2. With RootPointer=-1 there is no output and no array access. ByVal helps pupils see that each invocation has its own parameter value.')
slide('Two checks for broken code','Safety: does the -1 check happen first?\nOrder: is the output between the calls?',code_="' Check the order of these actions\nCheck for -1\nCall left subtree\nOutput current data\nCall right subtree",notes='Task 5A: accessing row -1 before the guard crashes. Moving the guard first prevents that, but output first is pre-order, so the output also needs to move between the child calls.',footer='Task 5A • Explain both bugs before repairing them')
slide('Testing one idea at a time','Predict first, then run each test.\nUse the supplied table; no insertion code needed.',tab=[['Test','What it checks'],['Whole tree','Links and return order'],['A smaller subtree','The parameter sets the starting root'],['A leaf','Two empty child calls'],['-1','Safe empty-tree handling']],notes='Task 6. Starter contains a deliberate TODO. Main test tree is 40,20,60,30. Expected in-order 20,30,40,60; subtree 1 gives 20,30; leaf 2 gives 60; -1 gives no output.')
slide('Optional: a different output position','In-order: left, OUTPUT, right.\nPost-order: left, right, OUTPUT.\n\nThe same guard and child pointers work.\nTry Task 5B after your in-order trace is secure.',WT,notes='Worked tree post-order: 3,12,8. Task 1 tree: 30,20,60,40. Optional extension only. Recursive search and recursive insertion are deferred.')
slide('Optional: records store the same fields','A record groups the three integers.\nIts child pointers still store indexes.\nAll child pointers must be initialised to -1.',code_='Structure NodeRecord\n    Public LeftPointer As Integer\n    Public Data As Integer\n    Public RightPointer As Integer\nEnd Structure\nDim Nodes(3) As NodeRecord\n\n\' Array:  TreeArray(p, 0)\n\' Record: Nodes(p).LeftPointer',notes='This is a record with fields only, no methods or constructors. VB.NET default integers are 0, so explicitly set both child pointers to -1. Optional booklet extension contains the translation task. No chapter 20 concepts are required.')
slide('Exit check','Root: data 8 at index 2.\nOnly child: data 5 at index 0, on the left.\n\nDraw it. Give the first call and output.\nWhere does the root call resume\nafter its left call?',notes='Answer: InOrder(2). Output 5,8. Root call resumes at Console.WriteLine(TreeArray(p,1)) with p=2. If pupils say p=0 or that the whole traversal ends at the leaf, reteach calls and returns.',footer='Next practice • Repeat on a new shape before adding search')

def worksheet():
 d=doc('Binary trees follow up','Student worksheet • Drawings, pointers and recursive in-order traversal\nName: __________________________  Date: __________________')
 d.add_paragraph('Work through Tasks 1–4 before coding. Ask for a check after Task 2 and Task 3. Task 5B and records are optional. These are original practice tasks, not official examination questions.')
 for i,t in enumerate(TASKS):
  if i: d.add_page_break()
  task(d,t)
 d.save(HERE/'Binary_Trees_Follow_Up_Worksheet.docx')

def booklet():
 d=doc('Binary trees follow up','Student booklet • Learn, draw, trace and practise\nName: __________________________  Date: __________________')
 d.add_paragraph('This booklet contains the same tasks as the worksheet. Use either copy. Keep indexes and data visibly different in every drawing. Attempt a task before checking the worked code with your teacher.')
 plans=[[3,4],[5,6],[7,8,9,10,11,12],[14],[16],[17]]
 for i,t in enumerate(TASKS):
  d.add_page_break(); d.add_heading('Learn before Task '+str(i+1),1)
  for j,n in enumerate(plans[i]):
   if j and j%2==0: d.add_page_break()
   p=BUILD/f'slide-{n:02}.png'
   if p.exists(): d.add_picture(str(p),width=Inches(6.95)); d.add_paragraph(f'Slide {n}  {SLIDES[n-1]["title"]}')
   else:
    d.add_heading(SLIDES[n-1]['title'],2); d.add_paragraph(SLIDES[n-1]['body'])
  d.add_page_break(); task(d,t)
 d.add_page_break(); d.add_heading('Optional record translation',1)
 d.add_paragraph('Complete this only after Task 6. These records hold fields only. Their left and right pointers are still integer indexes. No object methods are needed.')
 code(d,SLIDES[18]['code'].split("\n\n' Array")[0])
 d.add_paragraph('A. Write a loop that sets LeftPointer and RightPointer to -1 for every row. B. Copy the Task 2A data and pointers into Nodes. C. Rewrite your working InOrder using Nodes. Predict and test the same four cases from Task 6.')
 space(d,2.5); d.add_paragraph('Reference: Nodes(p).Data reads the data field in record p. The recursion and the -1 base case stay the same.')
 d.save(HERE/'Binary_Trees_Follow_Up_Student_Booklet.docx')

def key():
 d=doc('Binary trees follow up answer key','TEACHER COPY • Covers the worksheet and student booklet')
 d.add_heading('Teaching sequence and checkpoints',1)
 d.add_paragraph('Allow 70–80 minutes, or split after Task 3. Tasks 1–2: 15–20 min. Task 3: 20 min. Task 4: 10 min. Task 5A: 5 min. Task 6 and exit: 15–20 min. Extensions can become a later lesson. All tasks are original formative practice; no official marks are claimed.')
 d.add_paragraph('Scope: retain VB.NET and columns left=0, data=1, right=2. Use integer indexes throughout. No classes, constructors, getters or object references. Supply the table so insertion does not compete with learning recursion. Records are optional and use fields only.')
 d.add_paragraph('Important change from the original lesson: this traversal checks p=-1 on entry and calls both child subtrees unconditionally. The old lesson checked each child pointer before making a call. Explain that both designs can work; use only the entry-check version here because it also safely accepts an empty starting tree.')
 table(d,[['Checkpoint','Ready to move on when…','If not yet secure…'],['After Task 2','Pupil distinguishes index 3 from data 30','Point to pointer cell, row index, then data'],['After Task 3','Pupil names the waiting call and resume rule','Repeat a leaf and a three-node tree with paper frames'],['After Task 4','Pupil explains the guard and the two child arguments','Keep using the recipe before completing code']])
 d.add_heading('Task 1',1)
 d.add_paragraph('A. After 40: root only. After 20: left child of 40. After 60: right child of 40. After 30: right child of 20. Accept correct incremental sketches; preserve left/right placement.')
 code(d,'      40\n     /  \\\n   20    60\n     \\\n      30')
 d.add_paragraph('B. Root 40; leaves 30 and 60; subtree at 20 contains 20 and 30. C. 30 < 40, but 30 > 20. Binary trees have at most two children; only an ordered binary tree adds the ordering rule.')
 d.add_page_break(); d.add_heading('Task 2',1)
 table(d,[['Index','Left (0)','Data (1)','Right (2)']]+MAIN_ROWS)
 d.add_paragraph('A. RootPointer=0. B. Indexes 0,1,3; data 40,20,30. C. TreeArray(1,2)=3 is a pointer; TreeArray(3,1)=30 is the child’s data. D. Root is 2:7, left child 1:4, right child 0:9. Both children are leaves.')
 d.add_heading('Task 3',1)
 d.add_paragraph('Drawing: root 1:25; left leaf 2:10; right leaf 0:15. It is not a BST because right child 15 is less than 25. In-order still means left, node, right.')
 events=[['1',1,'Call InOrder(2); wait at rule 3','—'],['2',2,'Call InOrder(-1); wait at rule 3','—'],['3',-1,'Return to p=2, rule 3','—'],['4',2,'Output data','10'],['5',2,'Call InOrder(-1); wait at rule 5','—'],['6',-1,'Return to p=2, rule 5','—'],['7',2,'Return to p=1, rule 3','—'],['8',1,'Output data','25'],['9',1,'Call InOrder(0); wait at rule 5','—'],['10',0,'Call InOrder(-1); wait at rule 3','—'],['11',-1,'Return to p=0, rule 3','—'],['12',0,'Output data','15'],['13',0,'Call InOrder(-1); wait at rule 5','—'],['14',-1,'Return to p=0, rule 5','—'],['15',0,'Return to p=1, rule 5','—'],['16',1,'Return to original caller','—']]
 table(d,[['Event','Active p','What happens / where next?','Output added']]+events)
 d.add_paragraph('Accept equivalent event descriptions. Each -1 invocation must return before its caller resumes. C. Active p=2; waiting call InOrder(1), resuming at rule 3. D. Output 10,25,15. Each return ends one invocation; earlier calls still have instructions left.')
 d.add_page_break(); d.add_heading('Task 4',1)
 d.add_paragraph('A. (1) -1: missing subtree; (2) Exit Sub: return before array access; (3) 0: left child index; (4) 1: node data; (5) 2: right child index. B. InOrder(RootPointer); -1 outputs nothing. C. Output 20,30,40,60.')
 code(d,TRAV)
 d.add_paragraph('Just before outputting 30: active InOrder(3). Under it, InOrder(1) is waiting after its right call and will finish. Under that, InOrder(0) is waiting after its left call and will output 40. The empty left call from 3 has already returned. D. Column 1 supplies data, not an index. Data 20, for example, would attempt to access outside this four-row array.')
 d.add_heading('Task 5',1)
 d.add_paragraph('A. First mistake: line A reads the array before checking -1, so an empty call attempts row -1 and crashes. Second: after moving the guard first, output before the left call gives pre-order, not in-order. Repair by placing the guard first and output between the recursive calls. Use the complete InOrder above (renaming recursive calls consistently if retaining Broken).')
 post=TRAV.replace('InOrder','PostOrder').replace('    Console.WriteLine(TreeArray(p, 1))\n    PostOrder(TreeArray(p, 2))','    PostOrder(TreeArray(p, 2))\n    Console.WriteLine(TreeArray(p, 1))')
 code(d,post); d.add_paragraph('B/C. Post-order output: 30,20,60,40. A node is output after both of its subtrees have finished. The root therefore appears last.')
 d.add_page_break(); d.add_heading('Task 6 and exit check',1)
 table(d,[['Test','Expected output, one value per line'],['InOrder(RootPointer)','20, 30, 40, 60'],['InOrder(1)','20, 30'],['InOrder(2)','60'],['InOrder(-1)','No output'],['After replacing 30 with 35','20, 35, 40, 60'],['PostOrder(RootPointer)','30, 20, 60, 40'],['PostOrder(2)','60'],['PostOrder(-1)','No output']])
 d.add_paragraph('B. p=3, with calls 1 and 0 waiting (see Task 4). After 3 finishes, call 1 finishes, then call 0 outputs 40. C. Only data changes: 35 fits the same position (greater than 20, less than 40), so the existing links still describe the BST. Exit: InOrder(2), output 5,8; resume at the root’s output line with p=2.')
 d.add_heading('Optional record translation',1)
 code(d,'For i As Integer = 0 To 3\n    Nodes(i).LeftPointer = -1\n    Nodes(i).RightPointer = -1\nNext\nFor i As Integer = 0 To 3\n    Nodes(i).LeftPointer = TreeArray(i, 0)\n    Nodes(i).Data = TreeArray(i, 1)\n    Nodes(i).RightPointer = TreeArray(i, 2)\nNext')
 code(d,TRAV.replace('InOrder','InOrderRecords').replace('TreeArray(p, 0)','Nodes(p).LeftPointer').replace('TreeArray(p, 1)','Nodes(p).Data').replace('TreeArray(p, 2)','Nodes(p).RightPointer'))
 d.add_paragraph('Same outputs as Task 6. Integer fields default to 0 in VB.NET; explicitly initialise child pointers to -1. All four records here are populated; unused rows in a larger array must not be linked into the tree.')
 d.add_page_break(); d.add_heading('Complete runnable model',1)
 d.add_paragraph('The companion Model.vb includes post-order and records. This minimal main program plus the InOrder procedure below is sufficient for the core lesson.')
 code(d,MODEL_CORE)
 d.save(HERE/'Binary_Trees_Follow_Up_Answer_Key.docx')

MODEL_CORE='''Module BinaryTreePractice
    Dim TreeArray(,) As Integer = {
        {1, 40, 2},
        {-1, 20, 3},
        {-1, 60, -1},
        {-1, 30, -1}
    }
    Dim RootPointer As Integer = 0

    Sub Main()
        InOrder(RootPointer)
        ' Other tests: InOrder(1), InOrder(2), InOrder(-1)
    End Sub

'''+ '\n'.join('    '+l for l in TRAV.splitlines())+'\nEnd Module\n'

def simulate():
 def traverse(rows,p,post=False):
  if p==-1:return []
  _,l,v,r=rows[p]
  a=traverse(rows,l,post); b=traverse(rows,r,post)
  return a+b+[v] if post else a+[v]+b
 assert traverse(MAIN_ROWS,0)==[20,30,40,60]
 assert traverse(MAIN_ROWS,1)==[20,30]
 assert traverse(MAIN_ROWS,2)==[60]
 assert traverse(MAIN_ROWS,-1)==[]
 assert traverse(MAIN_ROWS,0,True)==[30,20,60,40]
 assert traverse(SMALL_ROWS,1)==[10,25,15]
 print('Simulations passed: whole tree, subtree, leaf, empty, post-order, non-BST.')

if __name__=='__main__':
 simulate()
 if '--booklet' in sys.argv: booklet()
 else:
  worksheet(); key()
  (BUILD/'slides.json').write_text(json.dumps(SLIDES,ensure_ascii=False),encoding='utf-8')
  (HERE/'Binary_Trees_Follow_Up_Starter.vb').write_text(MODEL_CORE.replace(TRAV,'Sub InOrder(ByVal p As Integer)\n    \' TODO: complete using Task 4\nEnd Sub').replace('InOrder(RootPointer)','\' InOrder(RootPointer)',1).replace("' Other tests: InOrder(1), InOrder(2), InOrder(-1)","' InOrder(1)\n        ' InOrder(2)\n        ' InOrder(-1)"),encoding='utf-8')
  record=TRAV.replace('InOrder','InOrderRecords').replace('TreeArray(p, 0)','Nodes(p).LeftPointer').replace('TreeArray(p, 1)','Nodes(p).Data').replace('TreeArray(p, 2)','Nodes(p).RightPointer')
  post=TRAV.replace('InOrder','PostOrder').replace('    Console.WriteLine(TreeArray(p, 1))\n    PostOrder(TreeArray(p, 2))','    PostOrder(TreeArray(p, 2))\n    Console.WriteLine(TreeArray(p, 1))')
  extra='''    Structure NodeRecord
        Public LeftPointer As Integer
        Public Data As Integer
        Public RightPointer As Integer
    End Structure
    Dim Nodes(3) As NodeRecord
    Sub LoadRecords()
        For i As Integer = 0 To 3
            Nodes(i).LeftPointer = -1
            Nodes(i).RightPointer = -1
        Next
        For i As Integer = 0 To 3
            Nodes(i).LeftPointer = TreeArray(i, 0)
            Nodes(i).Data = TreeArray(i, 1)
            Nodes(i).RightPointer = TreeArray(i, 2)
        Next
    End Sub
'''
  model=MODEL_CORE.replace('End Module',extra+'\n'+post+'\n'+record+'\nEnd Module').replace("' Other tests: InOrder(1), InOrder(2), InOrder(-1)","' Other tests: InOrder(1), InOrder(2), InOrder(-1)\n        ' Optional: PostOrder(RootPointer)\n        ' Call LoadRecords() before InOrderRecords(RootPointer)")
  (HERE/'Binary_Trees_Follow_Up_Model.vb').write_text(model,encoding='utf-8')
  print('Documents, starter, model and slide content created.')
