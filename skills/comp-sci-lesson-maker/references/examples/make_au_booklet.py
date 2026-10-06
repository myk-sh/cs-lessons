from gen_booklet import build
plan = [
 ('js', "add(I('Do Task 1 from memory before you turn the page.'));\n"),
 ('task', 'Task 1', None, None),
 ('js', "add(pb());\nadd(learn('Automated systems and sensors'));\nadd(slide(4, 'What is an automated system?'));\nadd(slide(5, 'Choosing a sensor'));\nadd(slide(6, 'Actuators and the ADC'));\nadd(slide(16, 'Exam technique: the question types'));\nadd(pb());\n"),
 ('task', 'Task 2', None, None),
 ('js', "add(pb());\nadd(learn('The control loop'));\nadd(slide(7, 'The control loop'));\nadd(slide(8, 'Worked example: adaptive cruise control'));\nadd(slide(17, 'Role of the microprocessor'));\nadd(pb());\n"),
 ('task', 'Task 3', None, None),
 ('js', "add(pb());\nadd(learn('Automated systems in action'));\nadd(slide(9, 'Industry: nuclear power station'));\nadd(slide(11, 'Agriculture: automatic irrigation'));\nadd(slide(13, 'Lighting and gaming'));\nadd(slide(14, 'Science: laboratory experiment'));\nadd(slide(15, 'Advantages and disadvantages'));\nadd(slide(18, 'Advantages and linked questions'));\nadd(pb());\n"),
 ('task', 'Task 4', None, None),
 ('js', "add(pb());\nadd(learn('Check your Task 4 answers'));\nadd(P('Only look at these slides once you have finished Task 4.'));\nadd(slide(12, 'Weather: automated weather station'));\nadd(slide(10, 'Transport: self-parking cars'));\n"),
 ('task', 'Task 5', None, None),
 ('js', "add(pb());\nadd(learn('Review'));\nadd(slide(20, 'Common misconceptions'));\nadd(H('Exit question'));\nadd(slide(21, 'Exit question'));\nadd(lines(5));\n"),
]
build('au_ws.js', plan, 'Automated systems', '/home/claude/slides_au/s-', 'au_booklet.js', '/mnt/user-data/outputs/Automated_Systems_Student_Booklet.docx',
      subtitle='IGCSE Computer Science 0478  |  6.1  |  Student booklet',
      last='Tasks use real Cambridge IGCSE exam questions and get harder as you go. Task 5 is an extension.')
