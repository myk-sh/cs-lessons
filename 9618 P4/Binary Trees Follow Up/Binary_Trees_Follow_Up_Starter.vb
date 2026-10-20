Module BinaryTreePractice
    Dim TreeArray(,) As Integer = {
        {1, 40, 2},
        {-1, 20, 3},
        {-1, 60, -1},
        {-1, 30, -1}
    }
    Dim RootPointer As Integer = 0

    Sub Main()
        ' InOrder(RootPointer)
        ' InOrder(1)
        ' InOrder(2)
        ' InOrder(-1)
    End Sub

    Sub InOrder(ByVal p As Integer)
        If p = -1 Then
            Exit Sub
        End If
        InOrder(TreeArray(p, 0))
        Console.WriteLine(TreeArray(p, 1))
        InOrder(TreeArray(p, 2))
    End Sub
End Module
