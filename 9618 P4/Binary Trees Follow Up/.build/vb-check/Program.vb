Module BinaryTreePractice
    Dim TreeArray(,) As Integer = {
        {1, 40, 2},
        {-1, 20, 3},
        {-1, 60, -1},
        {-1, 30, -1}
    }
    Dim RootPointer As Integer = 0

    Sub Main()
        Check("whole", Sub() InOrder(RootPointer), "20,30,40,60")
        Check("subtree", Sub() InOrder(1), "20,30")
        Check("leaf", Sub() InOrder(2), "60")
        Check("empty", Sub() InOrder(-1), "")
        Check("post", Sub() PostOrder(RootPointer), "30,20,60,40")
        Check("post leaf", Sub() PostOrder(2), "60")
        Check("post empty", Sub() PostOrder(-1), "")
        TreeArray(3, 1) = 35
        Check("changed data", Sub() InOrder(0), "20,35,40,60")
        TreeArray(3, 1) = 30
        LoadRecords()
        Check("records", Sub() InOrderRecords(0), "20,30,40,60")
        Check("record subtree", Sub() InOrderRecords(1), "20,30")
        Check("record leaf", Sub() InOrderRecords(2), "60")
        Check("record empty", Sub() InOrderRecords(-1), "")
        TreeArray = {{-1, 15, -1}, {2, 25, 0}, {-1, 10, -1}}
        Check("non BST", Sub() InOrder(1), "10,25,15")
    End Sub
    Sub Check(label As String, action As Action, expected As String)
        Dim original = Console.Out
        Dim capture As New IO.StringWriter()
        Console.SetOut(capture)
        action()
        Console.SetOut(original)
        Dim actual = capture.ToString().Trim().Replace(Environment.NewLine, ",")
        If actual <> expected Then Throw New Exception(label & ": " & actual)
        Console.WriteLine("PASS " & label & ": " & actual)
    End Sub

    Sub InOrder(ByVal p As Integer)
        If p = -1 Then
            Exit Sub
        End If
        InOrder(TreeArray(p, 0))
        Console.WriteLine(TreeArray(p, 1))
        InOrder(TreeArray(p, 2))
    End Sub
    Structure NodeRecord
        Public LeftPointer As Integer
        Public Data As Integer
        Public RightPointer As Integer
    End Structure
    Dim Nodes(3) As NodeRecord
    Sub LoadRecords()
        For i As Integer = 0 To 3
            Nodes(i).LeftPointer = -1
            Nodes(i).RightPointer = -1
        Next
        For i As Integer = 0 To 3
            Nodes(i).LeftPointer = TreeArray(i, 0)
            Nodes(i).Data = TreeArray(i, 1)
            Nodes(i).RightPointer = TreeArray(i, 2)
        Next
    End Sub

Sub PostOrder(ByVal p As Integer)
    If p = -1 Then
        Exit Sub
    End If
    PostOrder(TreeArray(p, 0))
    PostOrder(TreeArray(p, 2))
    Console.WriteLine(TreeArray(p, 1))
End Sub
Sub InOrderRecords(ByVal p As Integer)
    If p = -1 Then
        Exit Sub
    End If
    InOrderRecords(Nodes(p).LeftPointer)
    Console.WriteLine(Nodes(p).Data)
    InOrderRecords(Nodes(p).RightPointer)
End Sub
End Module
