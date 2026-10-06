from gen_booklet import build

def box_after(h=1300): return f"add(box({h}));\n"

# ---------------- Stacks
st = [
 ('task', 'Task 1', None, None),
 ('js', "add(pb());\nadd(learn('What is a stack?'));\nadd(slide(4, 'What is a stack?'));\nadd(slide(5, 'Think, pair, share'));\nadd(P('Your answer to the think, pair, share question:', { keepNext: true }));\n" + box_after()),
 ('js', "add(learn('Storing a stack in an array'));\nadd(slide(6, 'A stack: an array with one pointer'));\nadd(slide(7, 'Tracing a stack'));\n"),
 ('task', 'Task 2', None, "add(P([['Part B'"),
 ('js', "add(pb());\nadd(learn('Full, empty and the two pointer conventions'));\nadd(slide(8, 'Full and empty: the boundary checks'));\nadd(slide(9, 'Two pointer conventions'));\nadd(H('Task 2 (continued)'));\n"),
 ('task', 'Task 2', "add(P([['Part B'", None),
 ('js', "add(learn('Writing Push() and Pop()'));\nadd(slide(10, 'Writing Push() in VB.NET'));\nadd(slide(11, 'Writing Pop() in VB.NET'));\nadd(slide(12, 'The TopOfStack version (Nov 2025 style)'));\nadd(P('Tasks 3 and 4 use the TopOfStack convention from slide 12, but with a different stack size and different return values. Read each specification carefully.'));\n"),
 ('task', 'Task 3', None, None),
 ('task', 'Task 4', None, None),
 ('task', 'Task 5', None, None),
 ('js', "add(pb());\nadd(learn('How you will be marked'));\nadd(P('Before you build the program in Task 6, read how examiners marked Push() in the real exam. Use it as a checklist for your own code.'));\nadd(slide(13, 'How Cambridge examiners mark this'));\n"),
 ('task', 'Task 6', None, None),
 ('js', "add(pb());\nadd(learn('Review'));\nadd(slide(16, 'Common misconceptions'));\nadd(P('Look back at your Task 1 answers. Correct any you got wrong, using what you have learned.'));\nadd(H('Exit question'));\nadd(slide(17, 'Exit question'));\nadd(lines(4));\n"),
]
build('stacks_ws.js', st, 'Stacks', '/home/claude/slides_st/s-', 'st_booklet.js', '/mnt/user-data/outputs/Stacks_Student_Booklet.docx')

# ---------------- Linked lists
addnode = r"""add(H2('Slide 12 - Writing AddNode() in VB.NET'));
add(P('This is the June 2021 exam version: it adds the new node to the END of the list. The comments match the four steps on slide 11.', { keepNext: true }));
add(code([
  'Function AddNode(ByRef LinkedList() As Node, ByRef StartPointer As Integer, _',
  '                 ByRef EmptyList As Integer) As Boolean',
  '    Console.Write("Enter the data to add: ")',
  '    Dim DataToAdd As Integer = Integer.Parse(Console.ReadLine())',
  '    If EmptyList = -1 Then',
  "        Return False                              ' 1: no free nodes",
  '    End If',
  "    Dim NewNode As Integer = EmptyList            ' 2: take the first free node",
  "    EmptyList = LinkedList(NewNode).NextNode      '    free list moves on",
  "    LinkedList(NewNode).Data = DataToAdd          ' 3: fill it in",
  "    LinkedList(NewNode).NextNode = -1             '    it will be the last node",
  '    If StartPointer = -1 Then',
  "        StartPointer = NewNode                    ' 4: the list was empty",
  '    Else',
  '        Dim Current As Integer = StartPointer',
  "        While LinkedList(Current).NextNode <> -1  '    find the last node",
  '            Current = LinkedList(Current).NextNode',
  '        End While',
  "        LinkedList(Current).NextNode = NewNode    '    link it on",
  '    End If',
  '    Return True',
  'End Function'
]));
"""
ll = [
 ('task', 'Task 1', None, None),
 ('js', "add(pb());\nadd(learn('What is a linked list?'));\nadd(slide(4, 'What is a linked list?'));\nadd(slide(5, 'Array or linked list?'));\nadd(H2('Think, pair, share'));\nadd(P('A linked list makes inserting and deleting cheap, but you can only reach an item by following pointers from the start. With a partner: describe one program where a linked list is the better choice, and one where an ordinary array is better. Use the words \"pointer\" and \"index\".', { keepNext: true }));\n" + box_after()),
 ('js', "add(learn('Storing a linked list in an array'));\nadd(slide(7, 'Storing a linked list in an array'));\nadd(slide(8, 'Follow the pointers (June 2021)'));\n"),
 ('js', "add(pb());\nadd(learn('Traversing a linked list'));\nadd(slide(9, 'Traversing: OutputNodes()'));\nadd(slide(10, 'Tracing OutputNodes()'));\n"),
 ('task', 'Task 2', None, "add(P([['Part B'"),
 ('js', "add(pb());\nadd(learn('Adding a node'));\nadd(slide(11, 'Adding a node at the end'));\n" + addnode + "add(H('Task 2 (continued)'));\n"),
 ('task', 'Task 2', "add(P([['Part B'", "add(P([['Part C'"),
 ('js', "add(learn('Removing a node, and the 2D array version'));\nadd(slide(13, 'Inserting at the front (2D array)'));\nadd(slide(14, 'Removing a node'));\nadd(H('Task 2 (continued)'));\n"),
 ('task', 'Task 2', "add(P([['Part C'", None),
 ('task', 'Task 3', None, None),
 ('js', "add(pb());\nadd(learn('Check your Task 3 answers'));\nadd(P('Only look at this slide once you have finished Task 3. Mark your own answers.'));\nadd(slide(15, 'Writing RemoveData() in VB.NET'));\nadd(P('Task 4 below uses the traversal loop from slide 9 - start from that shape.'));\n"),
 ('task', 'Task 4', None, None),
 ('task', 'Task 5', None, None),
 ('js', "add(pb());\nadd(learn('How you will be marked'));\nadd(P('Before you build the program in Task 6, read how examiners marked AddNode() in the real exam. The same ideas are marked in InsertData() and RemoveData(). Use it as a checklist for your own code.'));\nadd(slide(16, 'How Cambridge examiners mark this'));\n"),
 ('task', 'Task 6', None, None),
 ('js', "add(pb());\nadd(learn('Review'));\nadd(slide(18, 'Common misconceptions'));\nadd(P('Look back at your Task 1 answers. Correct any you got wrong, using what you have learned.'));\nadd(H('Exit question'));\nadd(slide(19, 'Exit question'));\nadd(lines(5));\n"),
]
build('ll_ws.js', ll, 'Linked lists', '/home/claude/slides_ll/s-', 'll_booklet.js', '/mnt/user-data/outputs/Linked_Lists_Student_Booklet.docx')
