from gen_booklet import build
plan = [
 ('js', "add(I('Do Task 1 before you turn the page - you will come back to it at the end.'));\n"),
 ('task', 'Task 1', None, None),
 ('js', "add(pb());\nadd(learn('Packets and their structure'));\nadd(slide(4, 'Why break data into packets?'));\nadd(slide(5, 'The structure of a packet'));\nadd(slide(6, 'What is in the packet header?'));\nadd(slide(7, 'Worked example: HELLO WORLD'));\n"),
 ('task', 'Task 2', None, None),
 ('js', "add(pb());\nadd(learn('Packet switching'));\nadd(slide(8, 'Packet switching'));\nadd(slide(9, 'The process of packet switching'));\nadd(slide(10, 'Reordering the packets'));\nadd(slide(11, 'The role of the router'));\n"),
 ('js', "add(pb());\n"),
 ('task', 'Task 3', None, None),
 ('js', "add(pb());\nadd(learn('Why packet switching?'));\nadd(slide(12, 'Benefits and drawbacks'));\nadd(slide(13, 'Think, pair, share'));\n"),
 ('task', 'Task 4', None, None),
 ('js', "add(pb());\nadd(learn('Check your Task 4(c) answer'));\nadd(P('Only look at this slide once you have finished Task 4. Mark (c) against these points.'));\nadd(slide(14, 'Exam focus: describe packet switching'));\n"),
 ('task', 'Task 5', None, None),
 ('js', "add(pb());\nadd(learn('Review'));\nadd(slide(16, 'Common misconceptions'));\nadd(P('Now go back to Task 1 and write a correction next to any statement you got wrong.'));\nadd(H('Exit question'));\nadd(slide(17, 'Exit question'));\nadd(lines(4));\n"),
]
build('ps_ws.js', plan, 'Packet switching', '/home/claude/slides_ps/s-', 'ps_booklet.js', '/mnt/user-data/outputs/Packet_Switching_Student_Booklet.docx',
      subtitle='IGCSE Computer Science 0478  |  2.1 Data transmission  |  Student booklet',
      last='Tasks get harder as you go and are written like Cambridge IGCSE Paper 1 questions. Task 5 is an extension.')
