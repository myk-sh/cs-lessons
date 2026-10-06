const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);

add(w.title('Binary trees', 'Y13 - Cambridge International 9618  |  Data Structures  |  One-hour lesson worksheet'));

// ---------- Task 1
add(H('Task 1   Retrieval check', '[5 marks]'));
add(P('Circle True or False for each statement. If a statement is false, write a short correction.'));
const t1 = [
  'Each node in a binary tree has at most two children.',
  'In an ordered binary tree, every value in a node\'s left subtree is smaller than that node.',
  'The root node is always stored at index 0 of the array.',
  'An in-order traversal of an ordered binary tree outputs the data in ascending order.',
  'Adding a node means shuffling existing nodes to make room for it.'
];
add(table([['Statement', 'True', 'False', 'Correction if false'], ...t1.map(s => [s, '', '', ''])], [4300, 700, 700, 4500], { rowH: 560 }));

// ---------- Task 2
add(H('Task 2   Tracing a binary tree', '[10 marks]'));
add(P('This table is from 9618 Paper 4, November 2022. A binary tree is stored in the 2D array TreeArray: column 0 is the left pointer, column 1 is the data and column 2 is the right pointer. RootPointer = 0 and FreeNode = 6.'));
add(table([
  ['Index', '0', '1', '2', '3', '4', '5', '6'],
  [{ t: 'Left (0)', b: true }, '1', '2', '-1', '-1', '-1', '-1', '-1'],
  [{ t: 'Data (1)', b: true }, '20', '15', '3', '9', '10', '58', '-1'],
  [{ t: 'Right (2)', b: true }, '5', '-1', '3', '4', '-1', '-1', '-1']
], [1500, 1242, 1243, 1243, 1243, 1243, 1243, 1243]));
add(spacer(120));
add(P([['Part A', { bold: true }], ' - Draw the tree in the box, then write the output of each traversal. [5]']));
add(box(2600));
add(spacer(80));
add(table([
  ['Traversal', 'Output'],
  ['Pre-order (root, left, right)', ''],
  ['In-order (left, root, right)', ''],
  ['Post-order (left, right, root)', '']
], [3400, 6800], { rowH: 440 }));
add(spacer(120));
add(P([['Part B', { bold: true }], ' - AddNode(12) is called. Complete the trace of the loop, then state which array element changes to link in the new node, and the new value of FreeNode. [3]']));
add(table([
  ['CurrentNode', 'Data there', '12 < Data?', 'Pointer checked', 'Action'],
  ['0', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']
], [1600, 1500, 1500, 2000, 3600], { rowH: 400 }));
add(P('Element that changes: ____________________ = _______        FreeNode = _______', { before: 160 }));
add(P([['Part C', { bold: true }], ' - Using the ORIGINAL table, SearchValue(RootPointer, 9) is called. List the indexes of the nodes it visits, in order, and state the value returned. [2]']));
add(lines(2));

// ---------- Task 3
add(H('Task 3   Complete the VB.NET code', '[5 marks]'));
add(I('Based on 9618 Paper 4, November 2022, Q3(c), where the exam gave incomplete pseudocode.'));
add(P('The recursive function SearchValue() searches the tree in TreeArray for ValueToFind. It returns the index of the node if the value is found, and -1 if it is not. Root is the index of the node being looked at. There are five gaps, numbered (1) to (5). Write the missing VB.NET code for each gap.'));
add(code([
  'Function SearchValue(ByVal Root As Integer, ByVal ValueToFind As Integer) As Integer',
  '',
  '    If Root = (1).................... Then',
  '        Return -1',
  '    End If',
  '',
  '    If TreeArray(Root, 1) = ValueToFind Then',
  '        Return (2)....................',
  '    End If',
  '',
  '    If TreeArray(Root, 1) (3).................... ValueToFind Then',
  '        Return SearchValue(TreeArray((4)...................., 0), ValueToFind)',
  '    Else',
  '        Return SearchValue(TreeArray(Root, (5)....................), ValueToFind)',
  '    End If',
  '',
  'End Function'
]));
add(P('(1) ______________    (2) ______________    (3) ______________    (4) ______________    (5) ______________', { before: 120 }));

// ---------- Task 4
add(H('Task 4   Write a procedure from a specification', '[8 marks]'));
add(I('This task uses the same specification as 9618 Paper 4, November 2022, Q3(d), which was worth 7 marks.'));
add(P('A post-order traversal visits the left subtree, then the right subtree, then outputs the root. The procedure PostOrder() takes the index of a node as its parameter and:'));
add(bullets([
  'if the left pointer is not -1, makes a recursive call with the left child as the root',
  'if the right pointer is not -1, makes a recursive call with the right child as the root',
  'outputs the data of the current node.'
]));
add(part('(a)', 'Write program code for PostOrder(), using the 2D array TreeArray.', '[7]'));
add(box(3500));
add(spacer(120));
add(part('(b)', 'State the output of PostOrder(RootPointer) for the ORIGINAL tree in Task 2.', '[1]'));
add(lines(1));

// ---------- Task 5
add(H('Task 5   Extension - find and fix the bugs'));
add(P('A student wrote the loop part of AddNode(). The rest of the procedure is correct. It contains TWO errors. Identify each error, explain the effect it would have, and write the corrected code.'));
add(code([
  '        Dim CurrentNode As Integer = RootPointer',
  '        Dim Placed As Boolean = False',
  '        While Not Placed',
  "            If NodeData > TreeArray(CurrentNode, 1) Then          ' <-- line A",
  '                If TreeArray(CurrentNode, 0) = -1 Then',
  '                    TreeArray(CurrentNode, 0) = FreeNode',
  '                    Placed = True',
  '                Else',
  '                    CurrentNode = TreeArray(CurrentNode, 0)',
  '                End If',
  '            Else',
  '                If TreeArray(CurrentNode, 2) = -1 Then',
  "                    TreeArray(CurrentNode, 2) = FreeNode         ' <-- line B",
  '                Else',
  '                    CurrentNode = TreeArray(CurrentNode, 2)',
  '                End If',
  '            End If',
  '        End While'
]));
add(P('Error 1 (line A):', { before: 120, after: 0 }), lines(2));
add(P('Error 2 (line B):', { after: 0 }), lines(2));

// ---------- Task 6
add(H('Task 6   Build it - at the computer', '[31 marks]'));
add(I('Based on 9618 Paper 4, November 2025, Q3, with test data from June 2024 Q2 and the search from November 2022 Q3. The marks in brackets come from those mark schemes. Create a new VB.NET console application called Question3_N25, and copy your code and screenshots into an evidence document as you go.'));
add(P('A program stores integers in ascending order in an ordered binary tree. The tree is a global 2D array TreeArray that can store up to 50 nodes. Each node stores a left pointer, the data and a right pointer. All null values are stored as -1. Nodes cannot be deleted.'));
add(part('(a)', 'Write program code to declare TreeArray and initialise all three values of every node to -1. Declare the global variable RootPointer, initialised to -1, and the global variable FreeNode (the next free node), initialised to 0.', '[3]'));
add(part('(b)', 'The procedure AddNode() takes an integer as a parameter. It stores the parameter in the next free node, finds the position for the data in the tree by following the pointers, and updates the pointer of the new node\'s parent. It outputs "The tree is full" if the value cannot be stored. Write program code for AddNode().', '[7]'));
add(part('(c)(i)', 'Write a procedure OutputTree() that outputs the left pointer, data and right pointer of each node that has been used, in array order. If no nodes are stored, it outputs "No nodes".', '[4]'));
add(part('(c)(ii)', 'Amend the main program to add these values in order: 10, 11, 5, 1, 20, 7, 15. Then call OutputTree().', '[2]'));
add(part('(c)(iii)', 'Predict first: complete the table, then test your program and take a screenshot.', '[1]'));
add(table([
  ['Index', 'Left', 'Data', 'Right'],
  ['0', '', '', ''], ['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', ''], ['5', '', '', ''], ['6', '', '', '']
], [1500, 2900, 2900, 2900], { rowH: 360 }));
add(spacer(120));
add(part('(d)(i)', 'Write the recursive procedure InOrder() that takes the index of a node and outputs the data in the tree in ascending order.', '[5]'));
add(part('(d)(ii)', 'Amend the main program to call InOrder(RootPointer). Predict the output, then test it and take a screenshot.', '[1]'));
add(lines(1));
add(part('(e)(i)', 'Write the recursive function SearchValue() from Task 3.', '[5]'));
add(part('(e)(ii)', 'Amend the main program to search for 15 and then for 12. For each, output the index if it is found, or a suitable message if it is not.', '[2]'));
add(part('(e)(iii)', 'Predict the two outputs, then test your program and take a screenshot.', '[1]'));
add(lines(1));
add(H2('Stretch 1 (Nov 2025 Q3(d), 5 marks)'));
add(P('Write a procedure WriteAllToFile() that writes every node of TreeArray to a new text file Tree.txt, one node per line, with the three values separated by commas (for example -1,20,1). Use exception handling. Call it at the end of your main program and take a screenshot of the file that shows its filename.'));
add(H2('Stretch 2 (June 2025 Q3)'));
add(P('Rewrite the tree using OOP. The class Node has private attributes NodeData (Integer), LeftNode and RightNode (both Node, initialised to Nothing), a constructor, get methods and SetLeft()/SetRight(). The class Tree stores the root node and has an Insert() method (smaller values go left, greater than or equal go right). Write OutputInOrder() so that it takes a Node, and test it by inserting 10, 20, 5, 15, 7.'));

// ================= MARK SCHEME
w.build(K.splice(0), '/mnt/user-data/outputs/Binary_Trees_Worksheet.docx');
// ================= ANSWER KEY (separate teacher document)
add(w.title('Binary trees - Answer key', 'Y13 - Cambridge International 9618  |  Data Structures  |  Teacher copy - not for students', { noName: true }));
add(w.keyBanner('Answers and marking points for every task on the binary trees worksheet and student booklet (same task numbers).'));
add(H('Mark scheme and answers', ''));
add(I('Marking points are summarised from the published Cambridge 9618 Paper 4 mark schemes: 9618/41 Oct/Nov 2022 Q3, 9618/42 May/June 2024 Q2, 9618/41 May/June 2025 Q3 and 9618/42 Oct/Nov 2025 Q3. Model answers are written in VB.NET for this lesson.'));

add(H2('Task 1 Retrieval check - answers'));
add(table([
  ['Statement', 'Answer', 'Correction if false'],
  [t1[0], 'True', '-'],
  [t1[1], 'True', '-'],
  [t1[2], 'False', 'RootPointer stores the index of the root; it is only 0 if that value was added first.'],
  [t1[3], 'True', '-'],
  [t1[4], 'False', 'The new node is stored at FreeNode as a new leaf; only its parent\'s pointer changes.']
], [4500, 1000, 4700]));
add(I('1 mark per correct True/False.'));

add(H2('Task 2 Tracing a binary tree - answers'));
add(P('Part A: 20 is the root. Its left child is 15 and its right child is 58. 15 has a left child 3 (and no right child). 3 has a right child 9, and 9 has a right child 10.'));
add(table([
  ['Traversal', 'Output'],
  ['Pre-order', '20, 15, 3, 9, 10, 58'],
  ['In-order', '3, 9, 10, 15, 20, 58'],
  ['Post-order', '10, 9, 3, 15, 58, 20']
], [3400, 6800]));
add(I('[1] root with 15 left and 58 right; [1] 3, 9, 10 placed correctly; [1] per correct traversal.'));
add(P('Part B:'));
add(table([
  ['CurrentNode', 'Data there', '12 < Data?', 'Pointer checked', 'Action'],
  ['0', '20', 'Yes', 'left = 1', 'CurrentNode = 1'],
  ['1', '15', 'Yes', 'left = 2', 'CurrentNode = 2'],
  ['2', '3', 'No', 'right = 3', 'CurrentNode = 3'],
  ['3', '9', 'No', 'right = 4', 'CurrentNode = 4'],
  ['4', '10', 'No', 'right = -1', { t: 'TreeArray(4, 2) = 6, Placed = True', b: true }]
], [1600, 1500, 1500, 2000, 3600]));
add(P('Element that changes: TreeArray(4, 2) = 6.   FreeNode = 7.   Row 6 now holds -1, 12, -1.', { before: 100 }));
add(I('[1] first two rows; [1] remaining rows; [1] TreeArray(4, 2) = 6 and FreeNode = 7.'));
add(P('Part C: visits indexes 0, 1, 2, 3 and returns 3 (the index of 9, not the value 9).'));
add(I('[1] correct nodes visited in order; [1] returns 3.'));

add(H2('Task 3 Code completion - answers'));
add(code(['(1) -1', '(2) Root', '(3) >', '(4) Root', '(5) 2']));
add(I('In the November 2022 mark scheme this was 1 mark per completed statement plus 1 mark for the rest of the function. Watch out: return the INDEX (Root), not the data. The first check (Root = -1) is what stops the recursion when the value is not in the tree. The published VB.NET model answer left this check out, so it would crash when searching for a missing value.'));

add(H2('Task 4 Model answer - PostOrder()'));
add(code([
  'Sub PostOrder(ByVal Root As Integer)',
  '    If TreeArray(Root, 0) <> -1 Then',
  '        PostOrder(TreeArray(Root, 0))',
  '    End If',
  '    If TreeArray(Root, 2) <> -1 Then',
  '        PostOrder(TreeArray(Root, 2))',
  '    End If',
  '    Console.WriteLine(TreeArray(Root, 1))',
  'End Sub'
]));
add(table([
  ['Mark', 'Marking point (9618/41 Nov 2022 Q3(d), max 7)'],
  ['1', 'Procedure header with one parameter (the root node or its index) and at least one recursive call'],
  ['1', 'Checking whether the left pointer is -1 ...'],
  ['1', '... if not, a recursive call with the left child'],
  ['1', 'Checking whether the right pointer is -1 ...'],
  ['1', '... if not, a recursive call with the right child'],
  ['1', 'Outputting the data of the current node'],
  ['1', 'All three in the correct order (left, right, then output)']
], [900, 9300]));
add(P('(b) 10, 9, 3, 15, 58, 20'));
add(I('The published VB.NET answer copied each row into a temporary array and passed that. Passing the index, as here, is simpler and is accepted ("root node or index of root node").'));

add(H2('Task 5 Extension - answers'));
add(P('Error 1 (line A): the comparison is the wrong way round. It should be If NodeData < TreeArray(CurrentNode, 1) Then. As written, larger values go LEFT, so the tree is ordered in reverse and an in-order traversal outputs descending order. A search that assumes smaller values are on the left will then fail.'));
add(P('Error 2 (line B): Placed = True is missing after the right pointer is set. The loop never ends: on the next pass CurrentNode moves to the new node and the program keeps looping (it hangs). Fix: add Placed = True on the line after line B.'));

add(H2('Task 6 Build it - model answer'));
add(code([
  'Module Module1',
  '',
  '    Dim TreeArray(49, 2) As Integer',
  '    Dim RootPointer As Integer = -1',
  '    Dim FreeNode As Integer = 0',
  '',
  '    Sub AddNode(ByVal NodeData As Integer)',
  '        If FreeNode = 50 Then',
  '            Console.WriteLine("The tree is full")',
  '            Exit Sub',
  '        End If',
  '        TreeArray(FreeNode, 0) = -1',
  '        TreeArray(FreeNode, 1) = NodeData',
  '        TreeArray(FreeNode, 2) = -1',
  '        If RootPointer = -1 Then',
  '            RootPointer = FreeNode',
  '        Else',
  '            Dim CurrentNode As Integer = RootPointer',
  '            Dim Placed As Boolean = False',
  '            While Not Placed',
  '                If NodeData < TreeArray(CurrentNode, 1) Then',
  '                    If TreeArray(CurrentNode, 0) = -1 Then',
  '                        TreeArray(CurrentNode, 0) = FreeNode',
  '                        Placed = True',
  '                    Else',
  '                        CurrentNode = TreeArray(CurrentNode, 0)',
  '                    End If',
  '                Else',
  '                    If TreeArray(CurrentNode, 2) = -1 Then',
  '                        TreeArray(CurrentNode, 2) = FreeNode',
  '                        Placed = True',
  '                    Else',
  '                        CurrentNode = TreeArray(CurrentNode, 2)',
  '                    End If',
  '                End If',
  '            End While',
  '        End If',
  '        FreeNode = FreeNode + 1',
  '    End Sub',
  '',
  '    Sub OutputTree()',
  '        If FreeNode = 0 Then',
  '            Console.WriteLine("No nodes")',
  '        Else',
  '            For Index As Integer = 0 To FreeNode - 1',
  '                Console.WriteLine(TreeArray(Index, 0) & " " & _',
  '                                  TreeArray(Index, 1) & " " & TreeArray(Index, 2))',
  '            Next',
  '        End If',
  '    End Sub',
  '',
  '    Sub InOrder(ByVal Root As Integer)',
  '        If TreeArray(Root, 0) <> -1 Then',
  '            InOrder(TreeArray(Root, 0))',
  '        End If',
  '        Console.WriteLine(TreeArray(Root, 1))',
  '        If TreeArray(Root, 2) <> -1 Then',
  '            InOrder(TreeArray(Root, 2))',
  '        End If',
  '    End Sub',
  '',
  '    Function SearchValue(ByVal Root As Integer, _',
  '                         ByVal ValueToFind As Integer) As Integer',
  '        If Root = -1 Then',
  '            Return -1',
  '        End If',
  '        If TreeArray(Root, 1) = ValueToFind Then',
  '            Return Root',
  '        End If',
  '        If TreeArray(Root, 1) > ValueToFind Then',
  '            Return SearchValue(TreeArray(Root, 0), ValueToFind)',
  '        Else',
  '            Return SearchValue(TreeArray(Root, 2), ValueToFind)',
  '        End If',
  '    End Function',
  '',
  '    Sub Main()',
  '        For Index As Integer = 0 To 49',
  '            TreeArray(Index, 0) = -1',
  '            TreeArray(Index, 1) = -1',
  '            TreeArray(Index, 2) = -1',
  '        Next',
  '',
  '        Dim Values() As Integer = {10, 11, 5, 1, 20, 7, 15}',
  '        For Each Value As Integer In Values',
  '            AddNode(Value)',
  '        Next',
  '        OutputTree()',
  '',
  '        Console.WriteLine("In order:")',
  '        InOrder(RootPointer)',
  '',
  '        For Each Target As Integer In {15, 12}',
  '            Dim Position As Integer = SearchValue(RootPointer, Target)',
  '            If Position = -1 Then',
  '                Console.WriteLine(Target & " not found")',
  '            Else',
  '                Console.WriteLine(Target & " found at index " & Position)',
  '            End If',
  '        Next',
  '        Console.ReadLine()',
  '    End Sub',
  '',
  'End Module'
], { keepLines: false }));
add(table([
  ['Part', 'Marking points (from the published mark schemes)'],
  ['(a) [3]', 'Nov 2025 Q3(a): (global) TreeArray declared as a 2D array of 50 x 3 ...; ... all elements initialised to -1; (global) RootPointer initialised to -1 and FreeNode to 0'],
  ['(b) [7]', 'Nov 2025 Q3(b), 1 per point to max 7: header taking an integer and storing it at TreeArray(FreeNode, 1); full check (FreeNode = 50) with "The tree is full"; empty check setting RootPointer; comparing with the data at the root ...; ... if less, accessing the left node ...; ... if greater (or equal), accessing the right node ...; ... until the location is found ...; ... updating the parent\'s correct pointer; incrementing FreeNode'],
  ['(c)(i) [4]', 'June 2024 Q2(b)(iii) style: header, and "No nodes" if there are none; loop from index 0 for the number of nodes used ...; ... outputting left pointer, data then right pointer'],
  ['(c)(ii) [2]', 'Calls AddNode() with each value in the given order; calls OutputTree()'],
  ['(c)(iii) [1]', 'Screenshot matching the expected output below'],
  ['(d)(i) [5]', 'June 2025 Q3(d): recursive procedure header taking the node; checking left and recursive call if not null; outputting the data; checking right and recursive call if not null; all in the correct order'],
  ['(d)(ii) [1]', 'Screenshot showing 1, 5, 7, 10, 11, 15, 20'],
  ['(e)(i) [5]', 'Nov 2022 Q3(c): the not-found base case, the found case returning the index, going left when the data is greater than the target, going right otherwise, with recursive calls returning their result'],
  ['(e)(ii) [2]', 'Nov 2022 Q3(e)(i): calling SearchValue() with RootPointer and the value ...; ... outputting the index if found and a "not found" message if -1'],
  ['(e)(iii) [1]', 'Screenshot: "15 found at index 6" and "12 not found"']
], [1500, 8700]));
add(P('Expected output of OutputTree() for (c)(iii):', { before: 120 }));
add(table([
  ['Index', 'Left', 'Data', 'Right'],
  ['0', '2', '10', '1'], ['1', '-1', '11', '4'], ['2', '3', '5', '5'], ['3', '-1', '1', '-1'],
  ['4', '6', '20', '-1'], ['5', '-1', '7', '-1'], ['6', '-1', '15', '-1']
], [1500, 2900, 2900, 2900]));
add(I('This matches the June 2024 test data (10, 11, 5, 1, 20, 7, 15). Note that June 2024 stored the nodes in an array of Node objects, but the pointer values are the same.'));

add(H2('Stretch 1 - WriteAllToFile() model answer'));
add(code([
  'Sub WriteAllToFile()',
  '    Try',
  '        Dim FileWriter As New IO.StreamWriter("Tree.txt", False)',
  '        For Index As Integer = 0 To 49',
  '            FileWriter.WriteLine(TreeArray(Index, 0) & "," & _',
  '                                 TreeArray(Index, 1) & "," & TreeArray(Index, 2))',
  '        Next',
  '        FileWriter.Close()',
  '    Catch ex As Exception',
  '        Console.WriteLine("Cannot open or write to file")',
  '    End Try',
  'End Sub'
]));
add(I('Nov 2025 Q3(d), 5 marks: header with exception handling (try/catch with a message); opening Tree.txt to write and closing it; looping through each element ...; ... building the comma-separated string ...; ... writing each string to the file. The published VB.NET answer created the StreamWriter before the Try; putting it inside the Try means a failure to open the file is caught too.'));

add(H2('Stretch 2 - OOP model answer'));
add(code([
  'Class Node',
  '    Private NodeData As Integer',
  '    Private LeftNode As Node',
  '    Private RightNode As Node',
  '    Sub New(ByVal pNodeData As Integer)',
  '        NodeData = pNodeData',
  '        LeftNode = Nothing',
  '        RightNode = Nothing',
  '    End Sub',
  '    Function GetLeft() As Node',
  '        Return LeftNode',
  '    End Function',
  '    Function GetRight() As Node',
  '        Return RightNode',
  '    End Function',
  '    Function GetData() As Integer',
  '        Return NodeData',
  '    End Function',
  '    Sub SetLeft(ByVal NewNode As Node)',
  '        LeftNode = NewNode',
  '    End Sub',
  '    Sub SetRight(ByVal NewNode As Node)',
  '        RightNode = NewNode',
  '    End Sub',
  'End Class',
  '',
  'Class Tree',
  '    Private FirstNode As Node',
  '    Sub New(ByVal pFirstNode As Node)',
  '        FirstNode = pFirstNode',
  '    End Sub',
  '    Function GetRootNode() As Node',
  '        Return FirstNode',
  '    End Function',
  '    Sub Insert(ByVal NewNode As Node)',
  '        Dim CurrentNode As Node = FirstNode',
  '        Dim Placed As Boolean = False',
  '        While Not Placed',
  '            If NewNode.GetData() < CurrentNode.GetData() Then',
  '                If CurrentNode.GetLeft() Is Nothing Then',
  '                    CurrentNode.SetLeft(NewNode)',
  '                    Placed = True',
  '                Else',
  '                    CurrentNode = CurrentNode.GetLeft()',
  '                End If',
  '            Else',
  '                If CurrentNode.GetRight() Is Nothing Then',
  '                    CurrentNode.SetRight(NewNode)',
  '                    Placed = True',
  '                Else',
  '                    CurrentNode = CurrentNode.GetRight()',
  '                End If',
  '            End If',
  '        End While',
  '    End Sub',
  'End Class'
], { keepLines: false }));
add(I('Expected output of OutputInOrder(MyTree.GetRootNode()) after inserting 10, 20, 5, 15, 7: 5, 7, 10, 15, 20 (June 2025 Q3(e)(ii)). June 2025 marks: Node class and constructor 4, get methods 3, set methods 3, main program nodes 2, Tree class 2, GetRootNode 1, Insert 6, OutputInOrder 5, main program 3, screenshot 1.'));

w.build(K, '/mnt/user-data/outputs/Binary_Trees_Answer_Key.docx');
