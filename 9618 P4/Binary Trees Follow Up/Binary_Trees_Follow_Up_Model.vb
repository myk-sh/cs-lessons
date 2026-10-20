Module BinaryTreePractice
    Dim TreeArray(,) As Integer = {
        {1, 40, 2},
        {-1, 20, 3},
        {-1, 60, -1},
        {-1, 30, -1}
    }
    Dim RootPointer As Integer = 0

    Sub Main()
        InOrder(RootPointer)
        ' Other tests: InOrder(1), InOrder(2), InOrder(-1)
        ' Optional: PostOrder(RootPointer)
        ' Call LoadRecords() before InOrderRecords(RootPointer)
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
