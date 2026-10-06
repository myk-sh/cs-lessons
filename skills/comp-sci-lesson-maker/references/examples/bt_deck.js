const L = require('../../scripts/lib.js');
const { C, F } = L;
const pres = L.newDeck('Binary trees');

// draw a tree. spec: [{v, x, y, p, hl}] in unit coords; o: {ox, oy, dx, dy, bw, bh, fs}
function tree(s, spec, o) {
  const bw = o.bw || 0.75, bh = o.bh || 0.45, fs = o.fs || 15;
  const pos = spec.map(n => ({ cx: o.ox + n.x * o.dx, cy: o.oy + n.y * o.dy }));
  spec.forEach((n, i) => {
    if (n.p === undefined) return;
    const a = pos[n.p], b = pos[i];
    const x1 = a.cx, y1 = a.cy + bh / 2, x2 = b.cx, y2 = b.cy - bh / 2;
    const opt = { x: Math.min(x1, x2), y: y1, w: Math.max(Math.abs(x2 - x1), 0.001), h: y2 - y1, line: { color: n.hlEdge ? C.navy : '9A9AB5', width: n.hlEdge ? 3 : 1.5 } };
    if (x2 < x1) opt.flipH = true;
    s.addShape(pres.shapes.LINE, opt);
  });
  spec.forEach((n, i) => {
    s.addText(String(n.v), {
      shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.08, x: pos[i].cx - bw / 2, y: pos[i].cy - bh / 2, w: bw, h: bh,
      fill: { color: n.hl ? C.yellow : C.soft }, line: { color: C.navy, width: 1.25 },
      fontFace: F.body, fontSize: fs, bold: true, color: C.dark, align: 'center', valign: 'middle', margin: 0
    });
    if (n.lab) s.addText(n.lab, { x: pos[i].cx - 1, y: pos[i].cy + bh / 2 + 0.03, w: 2, h: 0.28, fontFace: F.body, fontSize: 10.5, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
  });
}
// the lesson tree: 10, 11, 5, 1, 20, 7, 15 inserted in that order
const LT = (hl15) => [
  { v: 10, x: 3, y: 0 }, { v: 5, x: 1.5, y: 1, p: 0 }, { v: 11, x: 4.5, y: 1, p: 0, hlEdge: hl15 },
  { v: 1, x: 0.75, y: 2, p: 1 }, { v: 7, x: 2.25, y: 2, p: 1 }, { v: 20, x: 5.4, y: 2, p: 2, hlEdge: hl15 },
  { v: 15, x: 4.7, y: 3, p: 5, hl: hl15, hlEdge: hl15 }
];

// 1
L.titleSlide(pres, 'Binary trees', 'Y13 - Cambridge International 9618',
  'Final ADT lesson in the series. Built around the four binary tree questions from 9618 Paper 4 (Nov 2022, June 2024, June 2025, Nov 2025) and their published mark schemes. Main representation: 2D array (Nov 2022, Nov 2025). OOP versions (June 2024, June 2025) are covered on slides 16-17.');

// 2 Starter
let s = L.base(pres, 'True or False', 'Starter activity', 2,
  'Answers: 1 True. 2 True (in an ordered tree; Cambridge sends equal values right, e.g. June 2025). 3 False - RootPointer says where the root is. 4 True. 5 False - a new node is always added as a new leaf; nothing moves.');
L.text(s, 'Choose whether each statement is True or False.', { x: 0.92, y: 1.3, w: 10, h: 0.4 });
L.table(s, [
  ['Statement', 'True', 'False'],
  ['Each node in a binary tree has at most two children.', '', ''],
  ['In an ordered binary tree, every value in a node\'s left subtree is smaller than that node.', '', ''],
  ['The root node is always stored at index 0 of the array.', '', ''],
  ['An in-order traversal of an ordered binary tree outputs the data in ascending order.', '', ''],
  ['Adding a node means shuffling existing nodes to make room for it.', '', '']
], { x: 1.04, y: 1.85, w: 11.25, colW: [8.85, 1.2, 1.2], rowH: 0.62 });

// 3 Objectives
s = L.base(pres, 'In this lesson, you will', 'Objectives', 3);
L.bullets(s, [
  'Use the vocabulary of binary trees: root, parent, child, leaf, subtree',
  'Build an ordered binary tree by hand and store it in a 2D array with left and right pointers',
  'Write and trace VB.NET code to add a node, following the pointers to the correct parent',
  'Write and trace recursive pre-order, in-order and post-order traversals and a recursive search',
  'Recognise the OOP versions of the tree and apply real 9618 mark schemes to your code'
], { x: 0.92, y: 1.6, w: 11.2, h: 4.2, fontSize: 18, paraSpaceAfter: 14 });

// 4 Vocabulary
s = L.base(pres, 'What is a binary tree?', 'Activity 1', 4,
  'Point to each part on the diagram. A leaf has no children (both pointers -1). Each node is the root of its own subtree - this is what makes recursion so natural for trees.');
L.callout(s, 'A binary tree is a hierarchical data structure: each node holds data and up to two pointers, one to a left child and one to a right child.', { x: 0.96, y: 1.35, w: 11.3, h: 0.8, fontSize: 16, color: C.dark });
tree(s, [
  { v: 10, x: 3, y: 0, lab: 'root' }, { v: 5, x: 1.5, y: 1, p: 0, lab: 'parent' }, { v: 11, x: 4.5, y: 1, p: 0 },
  { v: 1, x: 0.75, y: 2, p: 1, lab: 'leaf' }, { v: 7, x: 2.25, y: 2, p: 1, lab: 'leaf' }, { v: 20, x: 5.4, y: 2, p: 2 },
  { v: 15, x: 4.7, y: 3, p: 5, lab: 'leaf' }
], { ox: 0.9, oy: 2.75, dx: 0.95, dy: 1.0 });
L.stepCard(pres, s, 1, 'Root', 'The top node. RootPointer stores its index.', { x: 7.4, y: 2.35, w: 5.2, h: 0.95 });
L.stepCard(pres, s, 2, 'Parent and child', 'A node points to at most two children: left and right.', { x: 7.4, y: 3.4, w: 5.2, h: 0.95 });
L.stepCard(pres, s, 3, 'Leaf', 'A node with no children - both pointers are -1.', { x: 7.4, y: 4.45, w: 5.2, h: 0.95 });
L.stepCard(pres, s, 4, 'Subtree', 'Any node plus everything below it is a tree too.', { x: 7.4, y: 5.5, w: 5.2, h: 0.95 });

// 5 Building an ordered tree
s = L.base(pres, 'Building an ordered binary tree', 'Activity 1', 5,
  'Build it live on the board: insert 10, 11, 5, 1, 20, 7, 15 in that order. For every insert, start at the root and ask "smaller or not?" at each node. The highlighted path shows where 15 goes. Same data as June 2024 Q2(c).');
L.callout(s, 'Rule: start at the root. Smaller - go left. Greater than or equal - go right. Repeat until you reach an empty spot.', { x: 0.96, y: 1.35, w: 11.3, h: 0.7, fontSize: 16, color: C.dark });
L.text(s, 'Insert in this order: 10, 11, 5, 1, 20, 7, 15', { x: 0.96, y: 2.25, w: 6, h: 0.4, bold: true, color: C.navy });
tree(s, LT(true), { ox: 0.9, oy: 3.1, dx: 0.95, dy: 1.0 });
L.stepCard(pres, s, 1, '15 vs 10', '15 is not smaller, so go right to 11.', { x: 7.4, y: 2.3, w: 5.2, h: 1.0 });
L.stepCard(pres, s, 2, '15 vs 11', 'Not smaller, so go right to 20.', { x: 7.4, y: 3.45, w: 5.2, h: 1.0 });
L.stepCard(pres, s, 3, '15 vs 20', 'Smaller, so go left - it is empty, so 15 goes here.', { x: 7.4, y: 4.6, w: 5.2, h: 1.0 });
L.callout(s, 'Nothing moves. A new value always becomes a new leaf.', { x: 7.4, y: 5.85, w: 5.2, h: 0.6 });

// 6 Think pair share
s = L.base(pres, 'Think, pair, share', 'Activity 1', 6,
  'Sorted input gives a "stick": every node goes right, so the tree is really a linked list and searching checks every node. Random order tends to give a bushy tree where each comparison discards about half of what is left.');
L.text(s, 'Insert the SAME seven values in sorted order: 1, 5, 7, 10, 11, 15, 20.', { x: 0.96, y: 1.53, w: 10.94, h: 0.8, fontSize: 18 });
L.text(s, 'With a partner: sketch the tree you get. How many comparisons does it take to find 20 in this tree, compared with the tree on the last slide? What does this tell you about the order data is inserted in?', { x: 0.96, y: 2.6, w: 10.94, h: 1.6, fontSize: 18 });

// 7 Storing in a 2D array
s = L.base(pres, 'Storing a tree in a 2D array', 'Activity 2', 7,
  'This is the Nov 2025 layout (TreeArray, 50 nodes). Nov 2022 used the same idea with ArrayNodes(19, 2). Column order matters: 0 = left, 1 = data, 2 = right. Mark scheme for (a), 3 marks: global 2D array 50 x 3; all elements -1; RootPointer -1 and FreeNode 0.');
L.code(pres, s, [
  'Dim TreeArray(49, 2) As Integer',
  'Dim RootPointer As Integer = -1',
  'Dim FreeNode As Integer = 0',
  '',
  { t: "' In Main: every value starts as -1", c: true },
  'For Index As Integer = 0 To 49',
  '    TreeArray(Index, 0) = -1',
  '    TreeArray(Index, 1) = -1',
  '    TreeArray(Index, 2) = -1',
  'Next'
], { x: 0.77, y: 1.37, w: 6.0, h: 3.9, fontSize: 16 });
L.stepCard(pres, s, 1, 'Column 0 = left pointer', 'Index of the left child, or -1 if there is none.', { x: 7.1, y: 1.37, w: 5.5, h: 1.15 });
L.stepCard(pres, s, 2, 'Column 1 = data', 'The value stored in the node.', { x: 7.1, y: 2.67, w: 5.5, h: 1.15 });
L.stepCard(pres, s, 3, 'Column 2 = right pointer', 'Index of the right child, or -1 if there is none.', { x: 7.1, y: 3.97, w: 5.5, h: 1.15 });
L.callout(s, 'RootPointer = index of the root (-1 = empty tree). FreeNode = the next unused row. Nodes are never deleted, so FreeNode only goes up.', { x: 0.77, y: 5.7, w: 11.8, h: 0.8 });

// 8 Reading the table
s = L.base(pres, 'From the table to the tree', 'Activity 2', 8,
  'Students should be able to go both ways: draw the tree from a table, and fill in a table from a tree. Note node 0 is the root here only because 10 was inserted first - always check RootPointer.');
L.text(s, 'RootPointer = 0     FreeNode = 7', { x: 0.9, y: 1.3, w: 5, h: 0.4, bold: true, color: C.navy });
L.table(s, [
  ['Index', 'Left (0)', 'Data (1)', 'Right (2)'],
  ['0', '2', { t: '10', b: true }, '1'], ['1', '-1', { t: '11', b: true }, '4'], ['2', '3', { t: '5', b: true }, '5'],
  ['3', '-1', { t: '1', b: true }, '-1'], ['4', '6', { t: '20', b: true }, '-1'], ['5', '-1', { t: '7', b: true }, '-1'],
  ['6', '-1', { t: '15', b: true }, '-1'], ['7', '-1', { t: '-1', color: 'A0A0A8' }, '-1']
], { x: 0.9, y: 1.85, w: 5.4, colW: [1.2, 1.4, 1.4, 1.4], rowH: 0.47, fontSize: 13 });
tree(s, LT(false), { ox: 7.0, oy: 2.1, dx: 0.9, dy: 1.0, bw: 0.7 });
L.callout(s, 'Row 0 says: 10 has left child at index 2 (5) and right child at index 1 (11).', { x: 6.8, y: 5.95, w: 5.8, h: 0.7 });

// 9 AddNode steps
s = L.base(pres, 'Adding a node: the algorithm', 'Activity 3', 9,
  'These four steps map directly onto the Nov 2025 mark scheme points. The new node is always stored at FreeNode - only the parent\'s pointer changes.');
L.stepCard(pres, s, 1, 'Is the tree full?', 'If FreeNode = 50, output "The tree is full" and stop.', { x: 0.96, y: 1.4, w: 5.5, h: 1.45, ds: 14 });
L.stepCard(pres, s, 2, 'Store the new node', 'At row FreeNode: left = -1, data = the value, right = -1.', { x: 6.8, y: 1.4, w: 5.8, h: 1.45, ds: 14 });
L.stepCard(pres, s, 3, 'Empty tree? It becomes the root', 'If RootPointer = -1, set RootPointer to this node.', { x: 0.96, y: 3.05, w: 5.5, h: 1.45, ds: 14 });
L.stepCard(pres, s, 4, 'Otherwise walk down from the root', 'Smaller: look left; otherwise look right. If that pointer is -1, point it at the new node. If not, move there and repeat.', { x: 6.8, y: 3.05, w: 5.8, h: 1.45, ds: 14 });
L.callout(s, 'Finally, add 1 to FreeNode - whichever branch you took.', { x: 0.96, y: 4.85, w: 11.6, h: 0.5 });

// 10 AddNode code
s = L.base(pres, 'Writing AddNode() in VB.NET', 'Activity 3', 10,
  'Same structure as the Nov 2025 mark scheme model answer: a CurrentNode index and a Placed flag. June 2024 used a Previous index and a Direction variable instead - both are fine. Use Else (not ElseIf >) for the right branch: the June 2024 model answer only tested < and >, so a duplicate value would loop forever.');
L.code(pres, s, [
  'Sub AddNode(ByVal NodeData As Integer)',
  { t: '    If FreeNode = 50 Then', hl: true },
  '        Console.WriteLine("The tree is full")',
  '        Exit Sub',
  '    End If',
  '    TreeArray(FreeNode, 0) = -1',
  '    TreeArray(FreeNode, 1) = NodeData',
  '    TreeArray(FreeNode, 2) = -1',
  { t: '    If RootPointer = -1 Then', hl: true },
  '        RootPointer = FreeNode',
  '    Else',
  '        Dim CurrentNode As Integer = RootPointer',
  '        Dim Placed As Boolean = False',
  '        While Not Placed',
  { t: "            ' ... continued on the right", c: true }
], { x: 0.77, y: 1.3, w: 5.75, h: 5.35, fontSize: 13 });
L.code(pres, s, [
  { t: '            If NodeData < TreeArray(CurrentNode, 1) Then', hl: true },
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
  { t: '    FreeNode = FreeNode + 1', hl: true },
  'End Sub'
], { x: 6.72, y: 1.3, w: 5.85, h: 5.35, fontSize: 11 });

// 11 Trace AddNode(15)
s = L.base(pres, 'Tracing AddNode(15)', 'Activity 3', 11,
  'Tree before the call holds 10, 11, 5, 1, 20, 7 (indexes 0-5), so FreeNode = 6. Reveal one row at a time. Only one existing value changes: TreeArray(4, 0).');
L.text(s, 'Before the call: the tree holds 10, 11, 5, 1, 20, 7 (indexes 0 to 5), so FreeNode = 6. Row 6 is set to -1, 15, -1.', { x: 0.96, y: 1.37, w: 11.3, h: 0.7 });
L.table(s, [
  ['CurrentNode', 'Data there', '15 < Data?', 'Pointer checked', 'Action'],
  ['0', '10', 'No', 'right = 1', 'not -1, so CurrentNode = 1'],
  ['1', '11', 'No', 'right = 4', 'not -1, so CurrentNode = 4'],
  ['4', '20', 'Yes', 'left = -1', { t: 'TreeArray(4, 0) = 6, Placed = True', b: true }]
], { x: 0.98, y: 2.2, w: 11.36, colW: [1.8, 1.6, 1.6, 2.2, 4.16], rowH: 0.55 });
L.callout(s, 'After the loop: FreeNode = 7. Row 6 holds -1, 15, -1 and row 4\'s left pointer now points to it.', { x: 0.98, y: 4.6, w: 11.3, h: 0.7 });

// 12 Traversals
s = L.base(pres, 'Three ways to traverse a tree', 'Activity 4', 12,
  'Memory trick: the name says where the ROOT goes - PRE (first), IN (in the middle), POST (last). The left subtree is always visited before the right. In-order on an ordered tree gives ascending order - that is why June 2025 asked for it.');
L.table(s, [
  ['Traversal', 'Order of visiting', 'Output for our tree'],
  [{ t: 'Pre-order', b: true }, 'root, left, right', '10, 5, 1, 7, 11, 20, 15'],
  [{ t: 'In-order', b: true }, 'left, root, right', '1, 5, 7, 10, 11, 15, 20'],
  [{ t: 'Post-order', b: true }, 'left, right, root', '1, 7, 5, 15, 20, 11, 10']
], { x: 0.98, y: 1.45, w: 7.3, colW: [1.8, 2.3, 3.2], rowH: 0.62, fontSize: 14 });
tree(s, LT(false), { ox: 8.35, oy: 1.75, dx: 0.72, dy: 0.95, bw: 0.62, bh: 0.4, fs: 13 });
L.callout(s, 'The name tells you where the ROOT goes: pre = first, in = middle, post = last. Left always comes before right.', { x: 0.98, y: 4.3, w: 7.3, h: 0.9 });
L.callout(s, 'In-order on an ordered tree always gives ascending order.', { x: 0.98, y: 5.35, w: 7.3, h: 0.5, color: C.dark });

// 13 InOrder code
s = L.base(pres, 'Writing a recursive traversal', 'Activity 4', 13,
  'Matches the outline Cambridge gives (Nov 2022 PostOrder, June 2025 OutputInOrder): check left is not -1 and recurse, output, check right is not -1 and recurse. The Nov 2022 mark scheme accepted either the node or its index as the parameter; passing the index is simplest in VB.NET. Called with InOrder(RootPointer) - assumes the tree is not empty.');
L.code(pres, s, [
  'Sub InOrder(ByVal Root As Integer)',
  '',
  { t: '    If TreeArray(Root, 0) <> -1 Then', hl: true },
  '        InOrder(TreeArray(Root, 0))',
  '    End If',
  '',
  { t: '    Console.WriteLine(TreeArray(Root, 1))', hl: true },
  '',
  { t: '    If TreeArray(Root, 2) <> -1 Then', hl: true },
  '        InOrder(TreeArray(Root, 2))',
  '    End If',
  '',
  'End Sub'
], { x: 0.77, y: 1.37, w: 7.3, h: 4.6, fontSize: 14 });
L.stepCard(pres, s, 1, 'Visit the left subtree', 'Only if the left pointer is not -1: call InOrder on it.', { x: 8.4, y: 1.37, w: 4.2, h: 1.2 });
L.stepCard(pres, s, 2, 'Output this node', 'Move this line to change the traversal.', { x: 8.4, y: 2.72, w: 4.2, h: 1.2 });
L.stepCard(pres, s, 3, 'Visit the right subtree', 'Only if the right pointer is not -1.', { x: 8.4, y: 4.07, w: 4.2, h: 1.2 });
L.callout(s, 'Move the output line to the top for pre-order, or to the bottom for post-order.', { x: 0.77, y: 6.15, w: 11.8, h: 0.45 });

// 14 Tracing recursion
s = L.base(pres, 'Tracing the recursion', 'Activity 4', 14,
  'Link back to the stacks lesson: each call is pushed onto the call stack and popped when it returns - that is how the program "remembers" to come back to node 5 and node 10. Nodes are labelled by their data here for readability; the real parameter is the index.');
L.text(s, 'InOrder on the tree 10, 5, 11, 1, 7 (nodes labelled by their data):', { x: 0.96, y: 1.3, w: 8, h: 0.4 });
L.table(s, [
  ['Step', 'Call', 'What happens', 'Output so far'],
  ['1', 'InOrder(10)', 'left exists, so call InOrder(5)', ''],
  ['2', 'InOrder(5)', 'left exists, so call InOrder(1)', ''],
  ['3', 'InOrder(1)', 'no left; output 1; no right; return', '1'],
  ['4', 'back in (5)', 'output 5; right exists, so call InOrder(7)', '1 5'],
  ['5', 'InOrder(7)', 'no left; output 7; no right; return', '1 5 7'],
  ['6', 'back in (10)', 'output 10; right exists, so call InOrder(11)', '1 5 7 10'],
  ['7', 'InOrder(11)', 'output 11; return. All calls finished', '1 5 7 10 11']
], { x: 0.9, y: 1.8, w: 9.0, colW: [0.8, 1.7, 4.6, 1.9], rowH: 0.5, fontSize: 12.5 });
tree(s, [{ v: 10, x: 1, y: 0 }, { v: 5, x: 0.4, y: 1, p: 0 }, { v: 11, x: 1.6, y: 1, p: 0 }, { v: 1, x: 0, y: 2, p: 1 }, { v: 7, x: 0.8, y: 2, p: 1 }],
  { ox: 10.4, oy: 2.1, dx: 1.1, dy: 1.0, bw: 0.6, bh: 0.42, fs: 13 });
L.callout(s, 'Each call waits on the call stack until the call it made returns.', { x: 10.1, y: 4.6, w: 2.6, h: 1.3, fontSize: 13 });

// 15 SearchValue
s = L.base(pres, 'Searching recursively: SearchValue()', 'Activity 4', 15,
  'Nov 2022 Q3(c), 5 marks: 1 mark per completed statement (the exam gave pseudocode with four gaps) plus 1 for the rest. Note: the published VB.NET answer left out the Root = -1 check, which crashes when the value is not in the tree - a good discussion point. Call with SearchValue(RootPointer, 15).');
L.code(pres, s, [
  'Function SearchValue(ByVal Root As Integer, _',
  '                     ByVal ValueToFind As Integer) As Integer',
  { t: '    If Root = -1 Then', hl: true },
  '        Return -1',
  '    End If',
  { t: '    If TreeArray(Root, 1) = ValueToFind Then', hl: true },
  '        Return Root',
  '    End If',
  '    If TreeArray(Root, 1) > ValueToFind Then',
  '        Return SearchValue(TreeArray(Root, 0), ValueToFind)',
  '    Else',
  '        Return SearchValue(TreeArray(Root, 2), ValueToFind)',
  '    End If',
  'End Function'
], { x: 0.77, y: 1.37, w: 7.6, h: 4.7, fontSize: 13 });
L.stepCard(pres, s, 1, 'Base case: not found', 'Ran off the tree (-1): return -1.', { x: 8.65, y: 1.37, w: 3.95, h: 1.2 });
L.stepCard(pres, s, 2, 'Base case: found', 'Return the INDEX, not the data.', { x: 8.65, y: 2.72, w: 3.95, h: 1.2 });
L.stepCard(pres, s, 3, 'Recursive case', 'Search only ONE subtree - the other half is ignored.', { x: 8.65, y: 4.07, w: 3.95, h: 1.2 });
L.callout(s, 'Searching our tree for 15 visits indexes 0, 1, 4, 6 and returns 6. Searching for 12 visits the same nodes and returns -1.', { x: 0.77, y: 6.2, w: 11.8, h: 0.5 });

// 16 Representations
s = L.base(pres, 'Three ways Cambridge stores a tree', 'Activity 5', 16,
  'Every recent paper used one of these. The algorithm is identical - only the syntax for "follow the left pointer" changes.');
L.table(s, [
  ['', '2D array', 'OOP: array of Node objects', 'OOP: nodes point to nodes'],
  [{ t: 'Papers', b: true }, 'Nov 2022, Nov 2025', 'June 2024', 'June 2025'],
  [{ t: 'A child pointer is...', b: true }, 'an index in column 0 or 2', 'an index, via GetLeft()', 'a Node object, via GetLeft()'],
  [{ t: 'Null / no child', b: true }, '-1', '-1', 'Nothing'],
  [{ t: 'Go left', b: true }, 'TreeArray(Current, 0)', 'Tree(Current).GetLeft()', 'Current.GetLeft()'],
  [{ t: 'Check for no child', b: true }, '= -1', '= -1', 'Is Nothing']
], { x: 0.9, y: 1.45, w: 11.5, colW: [2.6, 2.8, 3.1, 3.0], rowH: 0.58, fontSize: 13.5 });
L.callout(s, 'Same algorithm every time. Only the way you "follow a pointer" changes.', { x: 0.9, y: 5.25, w: 11.5, h: 0.5 });

// 17 OOP version
s = L.base(pres, 'The OOP version (June 2025)', 'Activity 5', 17,
  'June 2025 marks: Node class and constructor 4, three get methods 3, SetLeft/SetRight 3, OutputInOrder 5. VB.NET uses Nothing for null and "IsNot Nothing" to test for a child. Attributes are Private, so the traversal must use the get methods.');
L.code(pres, s, [
  'Class Node',
  '    Private NodeData As Integer',
  '    Private LeftNode As Node',
  '    Private RightNode As Node',
  '',
  '    Sub New(ByVal pNodeData As Integer)',
  '        NodeData = pNodeData',
  '        LeftNode = Nothing',
  '        RightNode = Nothing',
  '    End Sub',
  '',
  '    Function GetLeft() As Node',
  '        Return LeftNode',
  '    End Function',
  { t: "    ' GetRight, GetData, SetLeft, SetRight", c: true },
  { t: "    ' follow the same pattern", c: true },
  'End Class'
], { x: 0.77, y: 1.3, w: 5.4, h: 5.35, fontSize: 12.5 });
L.code(pres, s, [
  'Sub OutputInOrder(ByVal RootNode As Node)',
  '',
  { t: '    If RootNode.GetLeft() IsNot Nothing Then', hl: true },
  '        OutputInOrder(RootNode.GetLeft())',
  '    End If',
  '',
  '    Console.WriteLine(RootNode.GetData())',
  '',
  { t: '    If RootNode.GetRight() IsNot Nothing Then', hl: true },
  '        OutputInOrder(RootNode.GetRight())',
  '    End If',
  '',
  'End Sub'
], { x: 6.4, y: 1.3, w: 6.2, h: 4.2, fontSize: 12.5 });
L.callout(s, 'Compare with slide 13: identical shape. -1 has become Nothing and the array look-ups have become get methods.', { x: 6.4, y: 5.7, w: 6.2, h: 0.95, fontSize: 14 });

// 18 Mark scheme AddNode
s = L.base(pres, 'How examiners mark AddNode()', 'Activity 6', 18,
  'From the published mark scheme for 9618/42 Nov 2025 Q3(b): 9 marking points, maximum 7 marks. Wording here is summarised. Note that the full check and the empty-tree check are separate marks - students often forget the empty tree.');
L.text(s, 'Nov 2025 (9618/42) Q3(b): 1 mark per point, maximum 7 from 9.', { x: 0.92, y: 1.3, w: 11.3, h: 0.44, fontSize: 15, bold: true });
L.table(s, [
  ['#', 'Marking point'],
  ['1', 'Procedure header taking an integer parameter, and storing it at TreeArray(FreeNode, 1)'],
  ['2', 'Checking if the tree is full (FreeNode = 50) and outputting "The tree is full"'],
  ['3', 'Checking if the tree is empty (RootPointer = -1) and, if so, setting RootPointer'],
  ['4', 'Otherwise, comparing the parameter with the data at the root'],
  ['5', '... if less than, accessing the left node'],
  ['6', '... if greater than (or equal), accessing the right node'],
  ['7', '... repeating until the position is found'],
  ['8', 'Updating the correct pointer of the parent node'],
  ['9', 'Incrementing FreeNode']
], { x: 0.98, y: 1.8, w: 11.36, colW: [0.8, 10.56], rowH: 0.47, fontSize: 13.5 });

// 19 Mark scheme traversal
s = L.base(pres, 'Marking a recursive traversal', 'Activity 6', 19,
  'June 2025 (9618/41) Q3(d) OutputInOrder, 5 marks. Nov 2022 (9618/41) Q3(d) PostOrder was worth 7 with the same ideas split more finely (checking left, recursive call left, checking right, recursive call right, output, all three in the correct order). The Nov 2022 scheme accepted the node or its index as the parameter.');
L.text(s, 'June 2025 (9618/41) Q3(d) OutputInOrder(): 5 marks.', { x: 0.92, y: 1.3, w: 11.3, h: 0.44, fontSize: 15, bold: true });
L.table(s, [
  ['Mark', 'Marking point'],
  ['1', 'Procedure header taking a node as its parameter, and it is recursive'],
  ['1', 'Checking whether the left node is null, and a recursive call if it is not'],
  ['1', 'Outputting the node\'s data'],
  ['1', 'Checking whether the right node is null, and a recursive call if it is not'],
  ['1', 'All three in the correct order']
], { x: 0.98, y: 1.85, w: 11.36, colW: [1.0, 10.36], rowH: 0.55 });
L.callout(s, 'The last mark is only for getting the ORDER right - so learn which traversal is which. Nov 2022 PostOrder() was worth 7 marks with the same ideas.', { x: 0.98, y: 5.35, w: 11.3, h: 0.8 });

// 20 Guided practice
s = L.base(pres, 'Guided practice', 'Activity 6', 20,
  'Tasks 1-5 on paper, Task 6 at the computer. Task 6 follows the Nov 2025 question closely, uses the June 2024 test data, and adds the Nov 2022 search - the marks shown come from those mark schemes.');
L.bullets(s, [
  'Turn to the worksheet - tasks get progressively harder, just like Cambridge exam questions',
  'Task 2: draw a tree from the Nov 2022 table, write its traversals, trace AddNode() and a search',
  'Task 3: complete the missing parts of SearchValue()',
  'Task 4: write PostOrder() from a specification (Nov 2022, 7 marks)',
  'Task 5: find and fix two bugs in a broken AddNode()',
  'Task 6 (at the computer): build and test a complete binary tree program',
  'Check your work against the answer key when your teacher shares it'
], { x: 0.96, y: 1.42, w: 11.26, h: 4.8, fontSize: 17, paraSpaceAfter: 12 });

// 21 Misconceptions
s = L.base(pres, 'Common misconceptions', 'Plenary', 21);
L.table(s, [
  ['Misconception', 'Why it is wrong'],
  ['"The root is always at index 0."', 'RootPointer says where the root is. Always start from it.'],
  ['"In-order means the order the data was inserted."', 'In-order visits left, root, right - on an ordered tree that gives ascending order.'],
  ['"Adding a node moves other nodes down."', 'The new node goes in at FreeNode; only its parent\'s pointer changes.'],
  ['"A recursive procedure also needs a loop."', 'The recursive calls do the repeating. It needs a base case (a -1 / Nothing check) to stop.'],
  ['"Equal values can go either way."', 'Follow the question. Cambridge has sent equal values right ("greater than or equal").']
], { x: 0.77, y: 1.4, w: 11.8, colW: [4.9, 6.9], rowH: 0.72, fontSize: 14 });

// 22 Exit
s = L.base(pres, 'Exit question', 'Plenary', 22,
  'Answers: tree 50 (30 (20, 40), 70 (60, -)). Pre-order 50 30 20 40 70 60. Post-order 20 40 30 60 70 50. 40 is stored at index 4; TreeArray(1, 2) = 4 (the right pointer of 30).');
L.callout(s, 'These values are added to an empty tree, in order: 50, 30, 70, 20, 40, 60.', { x: 0.96, y: 1.6, w: 11.26, h: 0.6, fontSize: 18, color: C.dark });
L.callout(s, '1. Draw the tree.', { x: 0.96, y: 2.45, w: 11.26, h: 0.5, fontSize: 18, color: C.dark });
L.callout(s, '2. Write the pre-order and post-order traversals.', { x: 0.96, y: 3.1, w: 11.26, h: 0.5, fontSize: 18, color: C.dark });
L.callout(s, '3. At which index of TreeArray is 40 stored, and which array element points to it?', { x: 0.96, y: 3.75, w: 11.26, h: 0.8, fontSize: 18, color: C.dark });

// 23 Summary
s = L.base(pres, 'In this lesson, you', 'Summary', 23);
L.bullets(s, [
  'Used the vocabulary of binary trees and built ordered trees by hand',
  'Stored a tree in a 2D array with left pointer, data and right pointer columns',
  'Wrote and traced AddNode(), following pointers to the correct parent',
  'Wrote and traced recursive traversals and a recursive search',
  'Compared the array and OOP versions and applied real 9618 mark schemes'
], { x: 0.96, y: 1.55, w: 11.26, h: 3.8, fontSize: 18, paraSpaceAfter: 14 });
L.callout(s, 'Revision: stacks, queues, linked lists and binary trees all follow pointers - choose the ADT that fits the problem.', { x: 0.96, y: 5.4, w: 11.26, h: 0.7 });

pres.writeFile({ fileName: '/mnt/user-data/outputs/Y13_9618_Lesson_-_Binary_Trees.pptx' }).then(f => console.log('wrote', f));
