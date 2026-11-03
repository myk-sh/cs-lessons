Module Module1
    Sub Main()
        ' Stores 10 quiz scores (0 to 50), outputs the average and the number of passes,
        ' then searches for a score. This program contains FIVE bugs, marked A to E.
        Dim Scores(9) As Integer
        Dim Total As Integer
        Dim Passes As Integer
        Dim Index As Integer
        Dim Search As Integer
        Dim Position As Integer

        For Index = 1 To 10                                   ' line A
            Console.Write("Enter score " & Index & ": ")
            Scores(Index) = Console.ReadLine()
            If Scores(Index) < 0 Or Scores(Index) > 50 Then  ' line B
                Console.Write("Score must be 0 to 50. Enter again: ")
                Scores(Index) = Console.ReadLine()
            End If
        Next

        Total = 0
        Passes = 0
        For Index = 0 To 9
            Total = Total + Index                             ' line C
            If Scores(Index) >= 25 Then
                Passes = Passes + 1
            End If
        Next
        Console.WriteLine("Average score: " & Total \ 10)    ' line D
        Console.WriteLine("Number of passes: " & Passes)

        Console.Write("Enter a score to find: ")
        Search = Console.ReadLine()
        Position = 0
        While Scores(Position) <> Search                      ' line E
            Position = Position + 1
        End While
        If Position < 10 Then
            Console.WriteLine("First found at position " & Position)
        Else
            Console.WriteLine("Score not found")
        End If
    End Sub
End Module
