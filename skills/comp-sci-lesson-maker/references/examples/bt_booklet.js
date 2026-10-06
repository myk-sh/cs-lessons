const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);
// Slide images come from: scripts/render_slides.sh <deck.pptx> <outdir>
const IMG = '/home/claude/slideimg/s-';

const { learn } = w;
const pb = w.pageBreak;
// slide(n, caption): rendered slide image from the deck (see scripts/render_slides.sh)
const slide = (n, caption) => w.slideImage(IMG + String(n).padStart(2, '0') + '.jpg', 'Slide ' + n + ' - ' + caption);

// ---------------- cover
add(w.title('Binary trees', 'Y13 - Cambridge International 9618  |  Data Structures  |  Student booklet'));
add(P('This booklet has everything you need for the lesson in one place. Work through it in order:'));
add(bullets([
  [['Learn', { bold: true, color: w.COL.navy }], ' sections show the key slides. Read them carefully - they explain the ideas and show worked examples.'],
  [['Task', { bold: true, color: w.COL.navy }], ' sections are where you practise. Each task uses what the slides just before it taught you.'],
  'Tasks get harder as you go, and are written like real Cambridge 9618 Paper 4 questions. Task 6 is done at the computer.'
]));

// ---------------- Task 1
add(H('Task 1   Retrieval check', '[5 marks]'));
add(P('Before you start: circle True or False for each statement. If a statement is false, write a short correction. You will find out if you were right as you work through the booklet.'));
const t1 = [
  'Each node in a binary tree has at most two children.',
  'In an ordered binary tree, every value in a node\'s left subtree is smaller than that node.',
  'The root node is always stored at index 0 of the array.',
  'An in-order traversal of an ordered binary tree outputs the data in ascending order.',
  'Adding a node means shuffling existing nodes to make room for it.'
];
add(table([['Statement', 'True', 'False', 'Correction if false'], ...t1.map(s => [s, '', '', ''])], [4300, 700, 700, 4500], { rowH: 560 }));

// ---------------- Learn: what a tree is
add(pb());
add(learn('What is a binary tree?'));
add(slide(4, 'What is a binary tree?'));
add(slide(5, 'Building an ordered binary tree'));
add(H2('Think, pair, share'));
add(P('Insert the same seven values in sorted order: 1, 5, 7, 10, 11, 15, 20. Sketch the tree. How many comparisons does it take to find 20 now, compared with the tree on slide 5? What does this tell you about the order data is inserted in?', { keepNext: true }));
add(box(1500));

add(learn('Storing a tree in an array'));
add(slide(7, 'Storing a tree in a 2D array'));
add(slide(8, 'From the table to the tree'));

add(learn('Traversing a tree'));
add(slide(12, 'Three ways to traverse a tree'));

// ---------------- Task 2 Part A
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

// ---------------- Learn: adding a node
add(pb());
add(learn('Adding a node'));
add(slide(9, 'Adding a node: the algorithm'));
add(H2('Slide 10 - Writing AddNode() in VB.NET'));
add(P('The highlighted parts of the algorithm on slide 9 appear in the code as: the full check, storing the new node at FreeNode, the empty-tree check, the loop that walks down from the root, and adding 1 to FreeNode.', { keepNext: true }));
add(code([
  'Sub AddNode(ByVal NodeData As Integer)',
  '    If FreeNode = 50 Then                          \' step 1: is the tree full?',
  '        Console.WriteLine("The tree is full")',
  '        Exit Sub',
  '    End If',
  '    TreeArray(FreeNode, 0) = -1                   \' step 2: store the new node',
  '    TreeArray(FreeNode, 1) = NodeData',
  '    TreeArray(FreeNode, 2) = -1',
  '    If RootPointer = -1 Then                       \' step 3: empty tree?',
  '        RootPointer = FreeNode',
  '    Else                                           \' step 4: walk down from the root',
  '        Dim CurrentNode As Integer = RootPointer',
  '        Dim Placed As Boolean = False',
  '        While Not Placed',
  '            If NodeData < TreeArray(CurrentNode, 1) Then',
  '                If TreeArray(CurrentNode, 0) = -1 Then',
  '                    TreeArray(CurrentNode, 0) = FreeNode',
  '                    Placed = True',
  '                Else',
  '                    CurrentNode = TreeArray(CurrentNode, 0)',
  '                End If',
  '            Else',
  '                If TreeArray(CurrentNode, 2) = -1 Then',
  '                    TreeArray(CurrentNode, 2) = FreeNode',
  '                    Placed = True',
  '                Else',
  '                    CurrentNode = TreeArray(CurrentNode, 2)',
  '                End If',
  '            End If',
  '        End While',
  '    End If',
  '    FreeNode = FreeNode + 1                        \' finally: next free row',
  'End Sub'
]));
add(spacer(120));
add(slide(11, 'Tracing AddNode(15)'));

// ---------------- Task 2 Parts B, C
add(H('Task 2 (continued)'));
add(P([['Part B', { bold: true }], ' - Using the Task 2 table, AddNode(12) is called. Complete the trace of the loop (use slide 11 as a model), then state which array element changes to link in the new node, and the new value of FreeNode. [3]']));
add(table([
  ['CurrentNode', 'Data there', '12 < Data?', 'Pointer checked', 'Action'],
  ['0', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']
], [1600, 1500, 1500, 2000, 3600], { rowH: 400 }));
add(P('Element that changes: ____________________ = _______        FreeNode = _______', { before: 160 }));
add(P([['Part C', { bold: true }], ' - Using the ORIGINAL table, a search for 9 starts at the root and follows the same rule as slide 5 (smaller - go left, otherwise go right). List the indexes of the nodes it visits, in order, and the index where 9 is found. [2]']));
add(lines(2));

// ---------------- Learn: recursion
add(pb());
add(learn('Recursive traversal'));
add(slide(13, 'Writing a recursive traversal'));
add(slide(14, 'Tracing the recursion'));

// ---------------- Task 3
add(H('Task 3   Complete the VB.NET code', '[5 marks]'));
add(I('Based on 9618 Paper 4, November 2022, Q3(c).'));
add(P('The recursive function SearchValue() searches the tree in TreeArray for ValueToFind. It returns the index of the node if the value is found, and -1 if it is not. Root is the index of the node being looked at. It works like InOrder() on slide 13, but only follows ONE pointer each time. There are five gaps, numbered (1) to (5). Write the missing VB.NET code for each gap.'));
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

add(pb());
add(learn('Check your Task 3 answers'));
add(P('Only look at this slide once you have finished Task 3. Mark your own answers, then read the three step cards.'));
add(slide(15, 'Searching recursively: SearchValue()'));

// ---------------- Task 4
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

// ---------------- Task 5
add(H('Task 5   Extension - find and fix the bugs'));
add(P('A student wrote the loop part of AddNode(). The rest of the procedure is correct. It contains TWO errors. Compare it with slide 10, identify each error, explain the effect it would have, and write the corrected code.'));
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

// ---------------- Learn: marking + OOP reference
add(pb());
add(learn('How you will be marked'));
add(P('Before you build the program in Task 6, read how examiners mark the two biggest parts. Use these as a checklist for your own code.'));
add(slide(18, 'How examiners mark AddNode()'));
add(slide(19, 'Marking a recursive traversal'));

// ---------------- Task 6
add(H('Task 6   Build it - at the computer', '[31 marks]'));
add(I('Based on 9618 Paper 4, November 2025, Q3, with test data from June 2024 Q2 and the search from November 2022 Q3. Create a new VB.NET console application called Question3_N25, and copy your code and screenshots into an evidence document as you go.'));
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
add(P('Rewrite the tree using OOP, using the two slides below as a guide. The class Node has private attributes NodeData (Integer), LeftNode and RightNode (both Node, initialised to Nothing), a constructor, get methods and SetLeft()/SetRight(). The class Tree stores the root node and has an Insert() method (smaller values go left, greater than or equal go right). Write OutputInOrder() so that it takes a Node, and test it by inserting 10, 20, 5, 15, 7.'));
add(slide(16, 'Three ways Cambridge stores a tree'));
add(slide(17, 'The OOP version (June 2025)'));

// ---------------- Review
add(pb());
add(learn('Review'));
add(slide(21, 'Common misconceptions'));
add(P('Look back at your Task 1 answers. Correct any you got wrong, using what you have learned.'));
add(H('Exit question'));
add(P('These values are added to an empty tree, in order: 50, 30, 70, 20, 40, 60.'));
add(P('1. Draw the tree.'));
add(box(1800));
add(spacer(80));
add(P('2. Write the pre-order and post-order traversals.', { after: 0 }));
add(lines(2));
add(P('3. At which index of TreeArray is 40 stored, and which array element points to it?', { after: 0 }));
add(lines(2));

w.build(K, '/mnt/user-data/outputs/Binary_Trees_Student_Booklet.docx');
