from gen_booklet import build
plan = [
 ('js', "add(I('Do Task 1 from memory before you turn the page.'));\n"),
 ('task', 'Task 1', None, None),
 ('js', "add(pb());\nadd(learn('Wireless networking'));\nadd(slide(4, 'Wireless: electromagnetic radiation'));\nadd(slide(5, 'Wi-Fi vs Bluetooth'));\nadd(slide(6, 'Bluetooth: frequency hopping'));\nadd(slide(7, 'Why do we need satellites?'));\nadd(pb());\nadd(learn('Wired networking'));\nadd(slide(8, 'Wired: three types of cable'));\nadd(slide(9, 'Fibre optic: single-mode and multi-mode'));\nadd(slide(10, 'Wired or wireless?'));\n"),
 ('task', 'Task 2', None, None),
 ('task', 'Task 3', None, None),
 ('js', "add(pb());\nadd(learn('Exam technique'));\nadd(slide(11, 'Exam technique: recommend and justify'));\n"),
 ('task', 'Task 4', None, None),
 ('js', "add(learn('Review'));\nadd(slide(12, 'Misconceptions and exit question'));\nadd(lines(3));\n"),
]
build('wn_ws.js', plan, 'Wired & wireless networking', '/home/claude/slides_wn/s-', 'wn_booklet.js', '/mnt/user-data/outputs/Wired_and_Wireless_Student_Booklet.docx',
      subtitle='Y12 - Cambridge International 9618  |  2.1.5  |  Student booklet', last='Tasks get harder as you go and are written like Cambridge 9618 Paper 1 questions. Task 4 is extension or homework.')
