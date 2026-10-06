const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));

add(w.title('Stacks', 'Y13 - Cambridge International 9618  |  Data Structures  |  One-hour lesson worksheet'));

// ---------- Task 1
add(H('Task 1   Retrieval check', '[5 marks]'));
add(P('Circle True or False for each statement. If a statement is false, write a short correction.'));
const t1 = [
  'A stack follows Last In First Out (LIFO).',
  'Push adds a new item to the bottom of the stack.',
  'Pop removes the item that was added most recently.',
  'If StackPointer holds the next free space and equals 0, the stack is empty.',
  'Like a queue, a stack needs a head pointer and a tail pointer.'
];
add(table([['Statement', 'True', 'False', 'Correction if false'], ...t1.map(s => [s, '', '', ''])], [4300, 700, 700, 4500], { rowH: 560 }));

// ---------- Task 2
add(H('Task 2   Tracing a stack', '[6 marks]'));
add(P('A stack is implemented as an array StackData of size 5 (indices 0 to 4). StackPointer stores the index of the next free space and starts at 0. Push() returns False if the stack is full. Pop() returns -1 if the stack is empty.'));
add(P([['Part A', { bold: true }], ' - Complete the table as these operations are carried out in order: Push(15), Push(8), Push(23), Pop(), Push(4), Push(16), Push(42), Push(7), Pop().  Use _ for a space that is not part of the stack. [4]']));
add(table([
  ['Operation', 'StackPointer', 'Value returned', 'Array contents (index 0-4)'],
  ['Push(15), Push(8), Push(23)', '', '', ''],
  ['Pop()', '', '', ''],
  ['Push(4), Push(16), Push(42)', '', '', ''],
  ['Push(7)', '', '', ''],
  ['Pop()', '', '', '']
], [3000, 1500, 1700, 4000], { rowH: 480 }));
add(spacer(120));
add(P([['Part B', { bold: true }], ' - The SAME operations are carried out on a stack that uses TopOfStack instead (the index of the last item stored), initialised to -1. State the value of TopOfStack after the final Pop(), and write the condition that caused Push(7) to be rejected. [2]']));
add(lines(3));

// ---------- Task 3
add(H('Task 3   Complete the VB.NET code', '[5 marks]'));
add(P('A stack is stored in the global array Stack, which holds up to 20 strings (indices 0 to 19). The global variable TopOfStack stores the index of the LAST item stored and is initialised to -1.'));
add(P('The function Push() takes a string parameter. It returns -1 if the stack is full, and returns 1 if the item is pushed successfully. There are five gaps, numbered (1) to (5). Write the missing VB.NET code for each gap.'));
add(code([
  'Function Push(ByVal DataToPush As String) As Integer',
  '',
  '    If TopOfStack = (1)................................ Then',
  '        Return (2)................................',
  '    End If',
  '',
  '    TopOfStack = TopOfStack (3)................................',
  '    Stack((4)................................) = DataToPush',
  '    Return (5)................................',
  '',
  'End Function'
]));
add(P('(1) ______________    (2) ______________    (3) ______________    (4) ______________    (5) ______________', { before: 120 }));
add(I('Hint: in this convention, which comes first - moving the pointer or storing the item?'));

// ---------- Task 4
add(H('Task 4   Write a function from a specification', '[4 marks]'));
add(I('This task is written in the same style as a real Cambridge 9618 Paper 4 question (June 2025). Read the specification carefully before you write any code.'));
add(P('Using the same Stack and TopOfStack as Task 3, write program code for a function Pop() that:'));
add(bullets(['returns the string "-1" if the stack is empty', 'if the stack is not empty, returns the item at the top of the stack', 'updates TopOfStack.']));
add(spacer(60));
add(box(3900));

// ---------- Task 5
add(H('Task 5   Extension - find and fix the bugs'));
add(P('A student wrote Pop() for a stack of 10 integers where StackPointer holds the next FREE space (the convention used in the lesson, initialised to 0). Pop() should return -1 if the stack is empty. The function contains TWO errors. Identify each error, explain the effect it would have, and write the corrected code.'));
add(code([
  'Function Pop() As Integer',
  '',
  "    If StackPointer = 10 Then                          ' <-- line A",
  '        Return -1',
  '    End If',
  '',
  "    Dim Item As Integer = StackData(StackPointer)      ' <-- line B",
  '    StackPointer = StackPointer - 1',
  '    Return Item',
  '',
  'End Function'
]));
add(P('Error 1 (line A):', { before: 120, after: 0 }), lines(2));
add(P('Error 2 (line B):', { after: 0 }), lines(2));

// ---------- Task 6
add(H('Task 6   Build it - at the computer', '[25 marks]'));
add(I('Based on Cambridge 9618 Paper 4, June 2022, Question 1. Create a new VB.NET console application called Question1_J22. Copy your code and screenshots into an evidence document as you go, exactly as you would in the exam.'));
add(P('A program needs a stack that can store up to 10 integers. A global 1D array StackData stores the stack. The global variable StackPointer points to the next available space in the stack and is initialised to 0.'));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);
add(part('(a)', 'Write program code to declare the array and the pointer as global data structures. Initialise the pointer to 0.', '[3]'));
add(part('(b)', 'Write a procedure OutputStack() that outputs all 10 elements in the stack, followed by the value of StackPointer.', '[3]'));
add(part('(c)', 'The function Push() takes an integer parameter. It returns False if the stack is full. If the stack is not full, it puts the parameter on the stack, updates the pointer and returns True. Write program code for Push() - try to do it without looking back at the slides.', '[6]'));
add(part('(d)(i)', 'Write the main program so that it:', '[5]'));
add(bullets([
  'allows the user to enter 11 numbers and attempts to push each one onto the stack',
  'outputs a suitable message when a number is added to the stack',
  'outputs a suitable message when a number is not added because the stack is full',
  'outputs the contents of the stack after all 11 numbers have been attempted.'
]));
add(part('(d)(ii)', 'Test your program with these 11 inputs, and take a screenshot of the output:   11  12  13  14  15  16  17  18  19  20  21', '[1]'));
add(part('(e)(i)', 'The function Pop() returns -1 if the stack is empty. Otherwise it returns the item at the top of the stack and updates the pointer. Write program code for Pop().', '[5]'));
add(part('(e)(ii)', 'After your code from part (d)(i), add code to remove two items from the stack using Pop(), then output the updated contents of the stack using OutputStack().', '[2]'));
add(P([['Predict before you run: ', { bold: true }], 'after the two Pop() calls, what will OutputStack() show at index 8 and index 9, and what will StackPointer be? Explain why.'], { before: 80, after: 0 }));
add(lines(3));
add(P('Now run your program. Take a screenshot of the output. Was your prediction right?'));
add(H2('Stretch (Nov 2025 style)'));
add(P('Write a procedure FindValues() that pops each integer from the stack until the stack is empty, then outputs the largest and the smallest numbers that were in the stack, each with a suitable message. Call it at the end of your main program and test it.'));

// ================= MARK SCHEME
w.build(K.splice(0), '/mnt/user-data/outputs/Stacks_Worksheet.docx');
// ================= ANSWER KEY (separate teacher document)
add(w.title('Stacks - Answer key', 'Y13 - Cambridge International 9618  |  Data Structures  |  Teacher copy - not for students', { noName: true }));
add(w.keyBanner('Answers and marking points for every task on the stacks worksheet and student booklet (same task numbers).'));
add(H('Mark scheme and answers', ''));
add(I('Adapted from Cambridge International AS & A Level Computer Science (9618) Paper 4 question styles (June 2022, June 2025, Nov 2025), written in VB.NET. Marking points are typical of Cambridge mark schemes for these questions.'));

add(H2('Task 1 Retrieval check - answers'));
add(table([
  ['Statement', 'Answer', 'Correction if false'],
  [t1[0], 'True', '-'],
  [t1[1], 'False', 'Push adds to the TOP of the stack.'],
  [t1[2], 'True', '-'],
  [t1[3], 'True', '-'],
  [t1[4], 'False', 'Items are added and removed at the same end, so a stack needs only one (top) pointer.']
], [4500, 1000, 4700]));
add(I('1 mark per correct True/False.'));

add(H2('Task 2 Tracing a stack - answers'));
add(table([
  ['Operation', 'StackPointer', 'Value returned', 'Array contents (index 0-4)'],
  ['Push(15), Push(8), Push(23)', '3', '-  (True x3)', '15, 8, 23, _, _'],
  ['Pop()', '2', '23', '15, 8, _, _, _'],
  ['Push(4), Push(16), Push(42)', '5', '-  (True x3)', '15, 8, 4, 16, 42'],
  ['Push(7)', '5', 'False', 'REJECTED - stack full (StackPointer = 5, the array size)'],
  ['Pop()', '4', '42', '15, 8, 4, 16, _']
], [3000, 1400, 1600, 4200]));
add(I('[1] rows 1-2 correct; [1] row 3 correct, with 4 stored at index 2 (overwriting the old 23); [1] Push(7) rejected with a reason; [1] final Pop() returns 42 and StackPointer = 4.'));
add(P('Part B: TopOfStack = 3 after the final Pop(). Push(7) was rejected because TopOfStack = 4 (the last index, MaxSize - 1).'));
add(I('[1] TopOfStack = 3; [1] condition TopOfStack = 4 (accept TopOfStack = MaxSize - 1).'));

add(H2('Task 3 Code completion - answers'));
add(code(['(1) 19', '(2) -1', '(3) + 1', '(4) TopOfStack', '(5) 1']));
add(I('1 mark per gap. The pointer is moved BEFORE the item is stored, because TopOfStack points at the last item, not the next free space. Storing first would overwrite the current top item.'));

add(H2('Task 4 Model answer - Pop()'));
add(code([
  'Function Pop() As String',
  '',
  '    If TopOfStack = -1 Then',
  '        Return "-1"',
  '    End If',
  '',
  '    Dim ReturnData As String = Stack(TopOfStack)',
  '    TopOfStack = TopOfStack - 1',
  '    Return ReturnData',
  '',
  'End Function'
]));
add(table([
  ['Mark', 'Marking point'],
  ['1', 'Function header returning a String, with End Function'],
  ['1', 'Checks if the stack is empty (TopOfStack = -1) and returns "-1"'],
  ['1', 'Returns the item at Stack(TopOfStack), read before the pointer changes'],
  ['1', 'Decrements TopOfStack']
], [900, 9300]));
add(I('Accept equivalent logic, e.g. decrementing first and returning Stack(TopOfStack + 1).'));

add(H2('Task 5 Extension - answers'));
add(P('Error 1 (line A): the test checks for a FULL stack, not an EMPTY one. It should be If StackPointer = 0 Then. As written, popping a full stack wrongly returns -1, and popping an empty stack carries on: StackPointer becomes -1, causing an index-out-of-range error on the next access.'));
add(P('Error 2 (line B): StackPointer is the next free space, so StackData(StackPointer) is one ABOVE the top item. Pop() returns an old or empty value instead of the top item. Fix: decrement StackPointer first and then read StackData(StackPointer), or use StackData(StackPointer - 1).'));

add(H2('Task 6 Build it - model answer'));
add(code([
  'Module Module1',
  '',
  '    Dim StackData(9) As Integer',
  '    Dim StackPointer As Integer = 0',
  '',
  '    Sub OutputStack()',
  '        For Index As Integer = 0 To 9',
  '            Console.WriteLine(StackData(Index))',
  '        Next',
  '        Console.WriteLine("StackPointer: " & StackPointer)',
  '    End Sub',
  '',
  '    Function Push(ByVal DataToPush As Integer) As Boolean',
  '        If StackPointer = 10 Then',
  '            Return False',
  '        End If',
  '        StackData(StackPointer) = DataToPush',
  '        StackPointer = StackPointer + 1',
  '        Return True',
  '    End Function',
  '',
  '    Function Pop() As Integer',
  '        If StackPointer = 0 Then',
  '            Return -1',
  '        End If',
  '        StackPointer = StackPointer - 1',
  '        Return StackData(StackPointer)',
  '    End Function',
  '',
  '    Sub Main()',
  '        For Count As Integer = 1 To 11',
  '            Console.Write("Enter a number: ")',
  '            Dim Number As Integer = Integer.Parse(Console.ReadLine())',
  '            If Push(Number) Then',
  '                Console.WriteLine(Number & " added to the stack")',
  '            Else',
  '                Console.WriteLine(Number & " not added - the stack is full")',
  '            End If',
  '        Next',
  '        OutputStack()',
  '',
  "        Pop()                ' part (e)(ii)",
  '        Pop()',
  '        OutputStack()',
  '        Console.ReadLine()',
  '    End Sub',
  '',
  'End Module'
], { keepLines: false }));
add(table([
  ['Part', 'Typical marking points'],
  ['(a) [3]', 'Array of 10 integers (index 0 to 9) declared globally; StackPointer declared globally as Integer; StackPointer initialised to 0'],
  ['(b) [3]', 'Procedure header and end; loop outputs all 10 elements; outputs StackPointer'],
  ['(c) [6]', 'Header with Integer parameter returning Boolean; checks StackPointer = 10; returns False if full; stores at StackData(StackPointer); increments StackPointer; returns True'],
  ['(d)(i) [5]', 'Loops 11 times; inputs a number; calls Push() with the number; message when added / message when not added (uses the return value); calls OutputStack() after the loop'],
  ['(d)(ii) [1]', 'Screenshot: 11-20 added, 21 not added, stack shows 11 to 20 and StackPointer 10'],
  ['(e)(i) [5]', 'Header returning Integer; checks StackPointer = 0; returns -1 if empty; decrements StackPointer; returns StackData(StackPointer) (after decrementing)'],
  ['(e)(ii) [2]', 'Pop() called twice then OutputStack(); screenshot showing StackPointer 8']
], [1500, 8700]));
add(P([['Expected output after (e)(ii): ', { bold: true }], 'the stack still shows 11 to 20 at indexes 0 to 9, but StackPointer is now 8. The values 19 and 20 are still in the array because Pop() only moves the pointer - they are no longer part of the stack and will be overwritten by the next two Push() calls. This is exactly the "Pop deletes the item" misconception from the plenary.'], { before: 120 }));

add(H2('Stretch - FindValues() model answer'));
add(code([
  'Sub FindValues()',
  '    Dim Value As Integer = Pop()',
  '    If Value = -1 Then',
  '        Console.WriteLine("The stack is empty")',
  '        Exit Sub',
  '    End If',
  '    Dim Largest As Integer = Value',
  '    Dim Smallest As Integer = Value',
  '    Value = Pop()',
  '    While Value <> -1',
  '        If Value > Largest Then Largest = Value',
  '        If Value < Smallest Then Smallest = Value',
  '        Value = Pop()',
  '    End While',
  '    Console.WriteLine("Largest number: " & Largest)',
  '    Console.WriteLine("Smallest number: " & Smallest)',
  'End Sub'
]));
add(I('After the test above (11 to 18 left in the stack) the output is Largest number: 18 and Smallest number: 11. Discussion point: if -1 could be a genuine data value, the rogue value -1 would stop the loop early - one reason the Nov 2025 paper used -999, and a better design is to loop While StackPointer > 0.'));

w.build(K, '/mnt/user-data/outputs/Stacks_Answer_Key.docx');
