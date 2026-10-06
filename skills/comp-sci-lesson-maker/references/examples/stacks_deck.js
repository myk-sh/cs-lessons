const L = require('../../scripts/lib.js');
const { C, F } = L;
const pres = L.newDeck('Stacks');

// vertical stack diagram, index 0 at the bottom
function drawStack(s, x, yTop, vals, ptrIdx, ptrLabel, o = {}) {
  const bw = o.bw || 1.3, bh = o.bh || 0.42, n = vals.length;
  for (let i = 0; i < n; i++) {
    const y = yTop + (n - 1 - i) * bh;
    const filled = vals[i] !== null && vals[i] !== undefined;
    s.addText(filled ? String(vals[i]) : '', {
      shape: pres.shapes.RECTANGLE, x, y, w: bw, h: bh,
      fill: { color: filled ? C.soft : C.white }, line: { color: C.navy, width: 1 },
      fontFace: F.mono, fontSize: 13, bold: true, color: C.dark, align: 'center', valign: 'middle', margin: 0
    });
    s.addText(String(i), { x: x - 0.45, y, w: 0.35, h: bh, fontFace: F.mono, fontSize: 11, color: C.grey, align: 'right', valign: 'middle', margin: 0, isTextBox: true });
  }
  if (ptrIdx !== null && ptrIdx !== undefined) {
    const py = yTop + (n - 1 - ptrIdx) * bh + bh / 2;
    L.arrow(pres, s, x + bw + 0.7, py, x + bw + 0.08, py, C.navy, 2);
    s.addText(ptrLabel, { x: x + bw + 0.75, y: py - 0.2, w: 2.3, h: 0.4, fontFace: F.body, fontSize: 13, bold: true, color: C.navy, valign: 'middle', margin: 0, isTextBox: true });
  }
  if (o.caption) s.addText(o.caption, { x: x - 0.5, y: yTop + n * bh + 0.12, w: bw + 3.2, h: 0.35, fontFace: F.body, fontSize: 12, italic: true, color: C.grey, margin: 0, isTextBox: true });
}

// 1 Title
L.titleSlide(pres, 'Stacks', 'Y13 - Cambridge International 9618',
  'Lesson follows the same structure as the queues lesson: retrieval, concept, trace by hand, read code, mark scheme, then worksheet (trace, fill the gaps, write from spec, debug, build it at the computer).');

// 2 Starter
let s = L.base(pres, 'True or False', 'Starter activity', 2,
  'Answers: 1 True. 2 False - Push adds to the TOP. 3 True. 4 True (with the next-free-space convention). 5 False - a stack only needs one pointer because items are added and removed at the same end. Q4 is a good one to revisit on slide 9, where the other pointer convention appears.');
L.text(s, 'Choose whether each statement is True or False.', { x: 0.92, y: 1.3, w: 10, h: 0.4 });
L.table(s, [
  ['Statement', 'True', 'False'],
  ['A stack follows Last In First Out (LIFO).', '', ''],
  ['Push adds a new item to the bottom of the stack.', '', ''],
  ['Pop removes the item that was added most recently.', '', ''],
  ['If StackPointer holds the next free space and equals 0, the stack is empty.', '', ''],
  ['Like a queue, a stack needs a head pointer and a tail pointer.', '', '']
], { x: 1.04, y: 1.85, w: 11.25, colW: [8.85, 1.2, 1.2], rowH: 0.62 });

// 3 Objectives
s = L.base(pres, 'In this lesson, you will', 'Objectives', 3);
L.bullets(s, [
  'Explain what a stack is and where LIFO structures are used',
  'Describe how a stack is implemented using a 1D array and a single top pointer',
  'Trace Push() and Pop() operations by hand, including full and empty stacks',
  'Recognise the two pointer conventions used in 9618 exam questions',
  'Write and test VB.NET code for Push() and Pop() and a main program that uses them'
], { x: 0.92, y: 1.6, w: 11.2, h: 4.2, fontSize: 18, paraSpaceAfter: 14 });

// 4 What is a stack
s = L.base(pres, 'What is a stack?', 'Activity 1', 4,
  'Draw out the call stack example - students met it with recursion. Ask: what happens if the call stack runs out of space? (stack overflow)');
L.callout(s, 'A stack is a linear data structure where items are added and removed at the same end (the top): Last In, First Out (LIFO).', { x: 0.96, y: 1.35, w: 11.2, h: 0.8, fontSize: 16, color: C.dark });
L.table(s, [
  ['Everyday / computing example', 'Why LIFO fits'],
  ['Undo button in a word processor', 'The most recent change is the first one undone'],
  ['Back button in a web browser', 'The last page visited is the first one returned to'],
  ['The call stack (procedure calls, recursion)', 'The most recently called procedure must finish first'],
  ['Reversing a string or a list', 'Items come off in the opposite order they went on'],
  ['Evaluating expressions (e.g. Reverse Polish)', 'The two most recent operands are the ones used next']
], { x: 1.31, y: 2.35, w: 10.73, colW: [5.0, 5.73], rowH: 0.52 });

// 5 Think pair share
s = L.base(pres, 'Think, pair, share', 'Activity 1', 5,
  'Expected: a printer using a stack would print the most recently sent job first - the first person could wait forever if new jobs keep arriving (starvation). A stack is better for undo/back/recursion, where the most recent item is the one you need.');
L.text(s, 'A queue adds at one end and removes from the other (FIFO). A stack adds and removes at the same end (LIFO).', { x: 0.96, y: 1.45, w: 6.4, h: 1.0, fontSize: 17 });
L.text(s, 'With a partner: explain what would go wrong if the school printer used a stack instead of a queue. Then give one situation where a stack is the better choice, and say why.', { x: 0.96, y: 2.7, w: 6.4, h: 1.6, fontSize: 17 });
// mini visual: queue vs stack
s.addText('Queue', { x: 7.9, y: 1.45, w: 4.3, h: 0.35, fontFace: F.body, fontSize: 14, bold: true, color: C.navy, margin: 0, isTextBox: true });
['A', 'B', 'C', 'D'].forEach((v, i) => s.addText(v, { shape: pres.shapes.RECTANGLE, x: 8.6 + i * 0.7, y: 1.95, w: 0.7, h: 0.55, fill: { color: C.soft }, line: { color: C.navy, width: 1 }, fontFace: F.mono, fontSize: 14, bold: true, align: 'center', valign: 'middle', color: C.dark, margin: 0 }));
L.arrow(pres, s, 8.55, 2.22, 8.05, 2.22); // out front
L.arrow(pres, s, 11.95, 2.22, 11.45, 2.22); // in back
s.addText('out', { x: 7.85, y: 2.55, w: 0.7, h: 0.3, fontFace: F.body, fontSize: 11, color: C.grey, margin: 0, isTextBox: true });
s.addText('in', { x: 11.6, y: 2.55, w: 0.7, h: 0.3, fontFace: F.body, fontSize: 11, color: C.grey, margin: 0, isTextBox: true });
s.addText('Stack', { x: 7.9, y: 3.25, w: 4.3, h: 0.35, fontFace: F.body, fontSize: 14, bold: true, color: C.navy, margin: 0, isTextBox: true });
['D', 'C', 'B', 'A'].forEach((v, i) => s.addText(v, { shape: pres.shapes.RECTANGLE, x: 9.3, y: 3.75 + i * 0.5, w: 1.1, h: 0.5, fill: { color: C.soft }, line: { color: C.navy, width: 1 }, fontFace: F.mono, fontSize: 14, bold: true, align: 'center', valign: 'middle', color: C.dark, margin: 0 }));
L.arrow(pres, s, 10.95, 3.35, 10.95, 3.95);
L.arrow(pres, s, 11.35, 3.95, 11.35, 3.35);
s.addText('in and out at the top', { x: 11.5, y: 3.5, w: 1.5, h: 0.6, fontFace: F.body, fontSize: 11, color: C.grey, margin: 0, isTextBox: true });

// 6 Array + one pointer
s = L.base(pres, 'A stack: an array with one pointer', 'Activity 2', 6,
  'Stress: only ONE pointer. In this convention StackPointer is the next free space, so it also equals the number of items in the stack.');
L.bullets(s, [
  'StackData stores the items in a fixed-size 1D array',
  'Index 0 is the bottom of the stack',
  'StackPointer holds the index of the next free space, so it also tells you how many items are stored'
], { x: 0.96, y: 1.4, w: 7.2, h: 1.9, fontSize: 16 });
L.code(pres, s, [
  'Dim StackData(9) As Integer    \' 10 spaces, index 0 to 9',
  'Dim StackPointer As Integer = 0'
], { x: 0.96, y: 3.3, w: 7.2, h: 0.85, fontSize: 13 });
L.callout(s, 'Push: store DataToPush at StackData(StackPointer), then StackPointer += 1', { x: 0.96, y: 4.45, w: 7.2, h: 0.7 });
L.callout(s, 'Pop: StackPointer -= 1, then return StackData(StackPointer)', { x: 0.96, y: 5.3, w: 7.2, h: 0.4 });
drawStack(s, 9.0, 1.4, [4, 9, 2, null, null], 3, 'StackPointer = 3', { caption: 'After Push 4, Push 9, Push 2' });

// 7 Tracing
s = L.base(pres, 'Tracing a stack', 'Activity 2', 7,
  'Pause before revealing each row and ask students to predict. Key point: 7 overwrites the old 2 at index 2 - Pop never deleted it. Items come off in reverse order.');
L.text(s, 'A stack of size 5 (StackPointer = next free space) starts empty with StackPointer = 0.', { x: 0.96, y: 1.37, w: 11.26, h: 0.45 });
L.table(s, [
  ['Operation', 'StackPointer', 'Value returned', 'Array contents (index 0-4)'],
  ['Push 4, Push 9, Push 2', '3', '-', '4, 9, 2, _, _'],
  ['Pop', '2', '2', '4, 9, _, _, _'],
  ['Push 7', '3', '-', '4, 9, 7, _, _'],
  ['Pop, Pop', '1', '7 then 9', '4, _, _, _, _']
], { x: 1.09, y: 2.0, w: 11.15, colW: [3.4, 2.0, 2.2, 3.55], rowH: 0.55 });
L.callout(s, 'Items come off in reverse order. Push 7 reused index 2 - the old value 2 was simply overwritten, because Pop never deleted it.', { x: 0.96, y: 5.0, w: 11.26, h: 0.7 });

// 8 Full and empty
s = L.base(pres, 'Full and empty: the boundary checks', 'Activity 3', 8,
  'These two checks are worth marks in every stack question. Link back to the queue lesson: the queue needed NumberItems; here StackPointer does that job.');
L.table(s, [
  ['Situation', 'Test (StackPointer = next free space)', 'What goes wrong without the check'],
  ['Stack is empty', 'StackPointer = 0', 'Pop reads index -1: run-time error (stack underflow)'],
  ['Stack is full', 'StackPointer = 10  (the array size)', 'Push writes to index 10: run-time error (stack overflow)']
], { x: 0.98, y: 1.45, w: 11.36, colW: [2.4, 4.0, 4.96], rowH: 0.62 });
L.stepCard(pres, s, 1, 'Push() checks FULL first', 'If full, return False (or output a message) and do not change anything.', { x: 0.98, y: 3.7, w: 5.5, h: 1.3 });
L.stepCard(pres, s, 2, 'Pop() checks EMPTY first', 'If empty, return the rogue value the question asks for (e.g. -1, "-1", -999 or "No data").', { x: 6.84, y: 3.7, w: 5.5, h: 1.3 });
L.callout(s, 'Read the question: the rogue value changes from paper to paper.', { x: 0.98, y: 5.35, w: 11.3, h: 0.4 });

// 9 Two conventions
s = L.base(pres, 'Two pointer conventions', 'Activity 3', 9,
  'Exam wording to look for: "points to the next available space" (June 2022, June 2023, Nov 2023) versus "stores the index of the last element" (June 2025, Nov 2025). Revisit starter statement 4.');
L.table(s, [
  ['', 'Next free space', 'Last item stored (top of stack)'],
  [{ t: 'Example identifier', b: true }, 'StackPointer', 'TopOfStack'],
  [{ t: 'Initial value (empty)', b: true }, '0', '-1'],
  [{ t: 'Empty when...', b: true }, 'StackPointer = 0', 'TopOfStack = -1'],
  [{ t: 'Full when (size 10)...', b: true }, 'StackPointer = 10', 'TopOfStack = 9'],
  [{ t: 'Push order', b: true }, 'store, then add 1', 'add 1, then store'],
  [{ t: 'Pop order', b: true }, 'subtract 1, then read', 'read, then subtract 1'],
  [{ t: 'Seen in', b: true }, 'June 2022, June 2023, Nov 2023', 'June 2025, Nov 2025']
], { x: 1.2, y: 1.35, w: 10.9, colW: [3.0, 3.95, 3.95], rowH: 0.52 });
L.callout(s, 'Look for the phrase "next available space" or "index of the last element" before you write any code.', { x: 1.2, y: 5.75, w: 10.9, h: 0.45 });

// 10 Push
s = L.base(pres, 'Writing Push() in VB.NET', 'Activity 4', 10,
  'Globals are declared at module level, outside Sub Main - this is how Cambridge phrases it ("global data structures"). Ask: what would happen if the two middle lines were swapped?');
L.code(pres, s, [
  { t: "' Global declarations - at module level, outside any Sub", c: true },
  'Dim StackData(9) As Integer',
  'Dim StackPointer As Integer = 0',
  '',
  'Function Push(ByVal DataToPush As Integer) As Boolean',
  '',
  { t: '    If StackPointer = 10 Then', hl: true },
  '        Return False',
  '    End If',
  '',
  { t: '    StackData(StackPointer) = DataToPush', hl: true },
  { t: '    StackPointer = StackPointer + 1', hl: true },
  '    Return True',
  '',
  'End Function'
], { x: 0.77, y: 1.37, w: 7.3, h: 5.1, fontSize: 14.5 });
L.stepCard(pres, s, 1, 'Check if full', 'StackPointer = 10 means every space 0-9 is used.', { x: 8.4, y: 1.37, w: 4.2, h: 1.15 });
L.stepCard(pres, s, 2, 'Store at the pointer', 'StackPointer is the next free space, so store there.', { x: 8.4, y: 2.67, w: 4.2, h: 1.15 });
L.stepCard(pres, s, 3, 'Move the pointer up', 'The next free space is now one higher.', { x: 8.4, y: 3.97, w: 4.2, h: 1.15 });
L.stepCard(pres, s, 4, 'Report success', 'Return True so the caller can output a message.', { x: 8.4, y: 5.27, w: 4.2, h: 1.15 });

// 11 Pop
s = L.base(pres, 'Writing Pop() in VB.NET', 'Activity 4', 11,
  'This matches June 2022 Q1(e): Pop returns -1 if the stack is empty. Common error: reading StackData(StackPointer) before decrementing - that reads the empty space above the top.');
L.code(pres, s, [
  'Function Pop() As Integer',
  '',
  { t: '    If StackPointer = 0 Then', hl: true },
  '        Return -1',
  '    End If',
  '',
  { t: '    StackPointer = StackPointer - 1', hl: true },
  { t: '    Return StackData(StackPointer)', hl: true },
  '',
  'End Function'
], { x: 0.77, y: 1.37, w: 7.3, h: 3.8, fontSize: 15 });
L.stepCard(pres, s, 1, 'Check if empty', 'StackPointer = 0 means there is nothing to pop.', { x: 8.4, y: 1.37, w: 4.2, h: 1.15 });
L.stepCard(pres, s, 2, 'Move the pointer down first', 'The top item is one BELOW the next free space.', { x: 8.4, y: 2.67, w: 4.2, h: 1.15 });
L.stepCard(pres, s, 3, 'Return the top item', 'The data stays in the array - it will be overwritten later.', { x: 8.4, y: 3.97, w: 4.2, h: 1.15 });
L.callout(s, 'Quick check: StackData holds 4, 9, 7 and StackPointer = 3. What does Pop() return, and what is StackPointer afterwards?', { x: 0.77, y: 5.45, w: 11.8, h: 0.8 });

// 12 TopOfStack version
s = L.base(pres, 'The TopOfStack version (Nov 2025 style)', 'Activity 4', 12,
  'Same logic, different pointer meaning. Compare line by line with slides 10-11: the full test is now 29 (size - 1), and the order of "move pointer" and "store/read" is reversed. Stack of 30 integers, Pop returns -999 when empty.');
L.code(pres, s, [
  'Dim Stack(29) As Integer',
  'Dim TopOfStack As Integer = -1',
  '',
  'Function Push(ByVal Value As Integer) _',
  '              As Boolean',
  { t: '    If TopOfStack = 29 Then', hl: true },
  '        Return False',
  '    End If',
  { t: '    TopOfStack = TopOfStack + 1', hl: true },
  { t: '    Stack(TopOfStack) = Value', hl: true },
  '    Return True',
  'End Function'
], { x: 0.77, y: 1.37, w: 5.75, h: 4.55, fontSize: 14 });
L.code(pres, s, [
  'Function Pop() As Integer',
  '',
  { t: '    If TopOfStack = -1 Then', hl: true },
  '        Return -999',
  '    End If',
  '',
  { t: '    Dim Value As Integer = Stack(TopOfStack)', hl: true },
  { t: '    TopOfStack = TopOfStack - 1', hl: true },
  '    Return Value',
  '',
  'End Function'
], { x: 6.82, y: 1.37, w: 5.75, h: 4.55, fontSize: 14 });
L.callout(s, 'Spot the differences with slides 10 and 11: the full test, the empty test, and the order of the two highlighted lines.', { x: 0.77, y: 6.1, w: 11.8, h: 0.5 });

// 13 Mark scheme
s = L.base(pres, 'How Cambridge examiners mark this', 'Activity 5', 13,
  'Push() was worth 6 marks in 9618 Paper 4, June 2022 (Q1c). These are the typical marking points for that style of question, written for VB.NET. Emphasise that the header (parameter + return type) and the full check are "easy" marks students often drop.');
L.text(s, 'Push() was worth 6 marks in June 2022 (next-free-space convention). Typical marking points:', { x: 0.92, y: 1.3, w: 11.3, h: 0.44, fontSize: 15, bold: true });
L.table(s, [
  ['Mark', 'What the examiner is looking for'],
  ['1', 'Function header taking an Integer parameter, returning Boolean, with matching End Function'],
  ['1', 'Checks whether the stack is full: IF StackPointer = 10'],
  ['1', 'Returns False when the stack is full'],
  ['1', 'Otherwise stores the parameter at StackData(StackPointer)'],
  ['1', 'Increments StackPointer'],
  ['1', 'Returns True after a successful push']
], { x: 0.98, y: 1.85, w: 11.36, colW: [1.0, 10.36], rowH: 0.56 });

// 14 Main program
s = L.base(pres, 'From functions to a full program', 'Activity 5', 14,
  'June 2022 Q1(d) asked for exactly this (5 marks): input 11 numbers, message for added / not added, then output the stack. The 11th number tests the full condition. OutputStack is the procedure from part (b): loop 0 to 9, then output StackPointer.');
L.code(pres, s, [
  'Sub Main()',
  '    For Count As Integer = 1 To 11',
  '        Console.Write("Enter a number: ")',
  '        Dim Number As Integer = Integer.Parse(Console.ReadLine())',
  { t: '        If Push(Number) Then', hl: true },
  '            Console.WriteLine(Number & " added to the stack")',
  '        Else',
  '            Console.WriteLine(Number & " not added - the stack is full")',
  '        End If',
  '    Next',
  '    OutputStack()',
  '    Console.ReadLine()',
  'End Sub'
], { x: 0.77, y: 1.37, w: 8.3, h: 4.4, fontSize: 13 });
L.stepCard(pres, s, 1, 'Call and test', 'If Push(Number) Then runs the function AND uses its Boolean result.', { x: 9.35, y: 1.37, w: 3.25, h: 1.75, ds: 12 });
L.stepCard(pres, s, 2, 'Why 11 inputs?', 'The 11th number proves your full check works - examiners look for that message.', { x: 9.35, y: 3.3, w: 3.25, h: 1.75, ds: 12 });
L.callout(s, 'Always test the boundary: one more item than the stack can hold, and one more Pop than it has items.', { x: 0.77, y: 6.0, w: 11.8, h: 0.5 });

// 15 Guided practice
s = L.base(pres, 'Guided practice', 'Activity 5', 15,
  'Tasks 1-5 on paper (about 25 minutes), Task 6 at the computer. The Task 6 test data is the real June 2022 data, so students can compare their output with the expected output in the mark scheme.');
L.bullets(s, [
  'Turn to the worksheet - tasks get progressively harder, just like Cambridge exam questions',
  'Task 2: trace a stack by hand, using both pointer conventions',
  'Task 3: complete the missing lines of a VB.NET Push() function',
  'Task 4: write a full Pop() function from a specification (like a real Paper 4 question)',
  'Task 5: find and fix two bugs in a broken Pop()',
  'Task 6 (at the computer): build and test a complete stack program, then check your output',
  'Check your work against the answer key when your teacher shares it'
], { x: 0.96, y: 1.42, w: 11.26, h: 4.8, fontSize: 17, paraSpaceAfter: 12 });

// 16 Misconceptions
s = L.base(pres, 'Common misconceptions', 'Plenary', 16);
L.table(s, [
  ['Misconception', 'Why it is wrong'],
  ['"Pop deletes the item from the array."', 'Pop only moves the pointer. The value stays until a later Push overwrites it.'],
  ['"StackPointer always points at the top item."', 'Only in the TopOfStack convention. Often it points to the next FREE space - read the question.'],
  ['"A stack needs a head and a tail pointer."', 'Items enter and leave at the same end, so one pointer is enough.'],
  ['"If the stack is full, Push can just do nothing."', 'It must report failure (return False / output a message) - that check earns marks.']
], { x: 0.77, y: 1.5, w: 11.8, colW: [4.7, 7.1], rowH: 0.75, fontSize: 14 });

// 17 Exit
s = L.base(pres, 'Exit question', 'Plenary', 17,
  'Answer: after Push A, Push B -> TopOfStack = 1. Pop removes B -> 0. Push C -> 1, Push D -> 2. TopOfStack = 2 and the next Pop returns D. Full would be TopOfStack = 7 for a stack of size 8.');
L.callout(s, 'A stack of size 8 uses TopOfStack (the index of the last item stored), initialised to -1.', { x: 0.96, y: 1.7, w: 11.26, h: 0.6, fontSize: 18, color: C.dark });
L.callout(s, 'These operations happen in order: Push("A"), Push("B"), Pop(), Push("C"), Push("D").', { x: 0.96, y: 2.6, w: 11.26, h: 0.6, fontSize: 18, color: C.dark });
L.callout(s, 'State the final value of TopOfStack and what the next Pop() will return. What value of TopOfStack would mean the stack is full?', { x: 0.96, y: 3.5, w: 11.26, h: 1.0, fontSize: 18, color: C.dark });

// 18 Summary
s = L.base(pres, 'In this lesson, you', 'Summary', 18);
L.bullets(s, [
  'Defined a stack as a LIFO structure and identified real-world and computing uses',
  'Implemented a stack using a 1D array and a single top pointer',
  'Traced Push() and Pop() by hand, including the full and empty boundary cases',
  'Compared the "next free space" and "TopOfStack" pointer conventions',
  'Wrote, tested and self-marked VB.NET code for Push(), Pop() and a main program'
], { x: 0.96, y: 1.55, w: 11.26, h: 3.8, fontSize: 18, paraSpaceAfter: 14 });
L.callout(s, 'Next lesson: linked lists - storing data in any order and linking it with pointers.', { x: 0.96, y: 5.4, w: 11.26, h: 0.5 });

pres.writeFile({ fileName: '/mnt/user-data/outputs/Y13_9618_Lesson_-_Stacks.pptx' }).then(f => console.log('wrote', f));
