from gen_booklet import build
plan = [
 ('js', "add(I('Do Task 1 from memory before you turn the page - it checks what you remember from the online lesson.'));\n"),
 ('task', 'Task 1', None, None),
 ('js', "add(pb());\nadd(learn('Network topologies'));\nadd(slide(4, 'What is a network topology?'));\nadd(slide(5, 'Bus topology'));\nadd(slide(6, 'Star topology'));\nadd(slide(7, 'Star: hub or switch in the middle?'));\nadd(slide(8, 'Mesh topology'));\nadd(slide(9, 'Hybrid topology'));\n"),
 ('js', "add(pb());\n"),
 ('task', 'Task 2', None, None),
 ('task', 'Task 3', None, None),
 ('js', "add(learn('Summary: comparing the topologies'));\nadd(P('Use this table to check your Task 3 answers, then keep it for revision.'));\nadd(slide(10, 'Comparing the topologies'));\nadd(slide(12, 'Think, pair, share'));\nadd(P('Discuss the three scenarios with a partner before you start Task 4.'));\n"),
 ('task', 'Task 4', None, None),
 ('js', "add(pb());\nadd(learn('Check your Task 4 answers'));\nadd(P('Only look at this slide once you have finished Task 4. Mark (a) and (b) against the official marking points.'));\nadd(slide(11, 'Exam focus: packets in a star'));\nadd(pb());\nadd(learn('Cloud computing'));\nadd(slide(13, 'Cloud computing and cloud storage'));\nadd(slide(14, 'Public, private and hybrid cloud'));\nadd(slide(15, 'Benefits and drawbacks of cloud storage'));\nadd(slide(16, 'Security and data loss in the cloud'));\n"),
 ('task', 'Task 5', None, None),
 ('js', "add(pb());\nadd(learn('Check your Task 5 answers'));\nadd(P('Only look at this slide once you have finished Task 5. Mark (b) and (c) against the official marking points.'));\nadd(slide(17, 'Exam focus: cloud questions'));\n"),
 ('task', 'Task 6', None, None),
 ('js', "add(pb());\nadd(learn('Review'));\nadd(slide(19, 'Common misconceptions'));\nadd(H('Exit question'));\nadd(slide(20, 'Exit question'));\nadd(lines(5));\n"),
]
build('tc_ws.js', plan, 'Topologies & cloud computing', '/home/claude/slides_tc/s-', 'tc_booklet.js', '/mnt/user-data/outputs/Topologies_and_Cloud_Student_Booklet.docx',
      subtitle='Y13 - Cambridge International 9618  |  2.1.3 - 2.1.4  |  Student booklet', last='Tasks get harder as you go and use real Cambridge 9618 Paper 1 questions. Task 6 is an extension.')
