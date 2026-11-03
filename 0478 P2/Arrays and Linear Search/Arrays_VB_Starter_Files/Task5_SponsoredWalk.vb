Module Module1
    Sub Main()
        ' Data for the sponsored walk - already stored, do not change
        Dim WalkerName() As String = {"Ana", "Ben", "Chen", "Dara",
                                      "Eli", "Fah", "Gus", "Hana"}
        Dim Distance() As Double = {12.5, 8.0, 15.0, 5.5, 10.0, 20.0, 9.5, 14.0}
        Dim Total As Double
        Dim LongWalks As Integer
        Dim Index As Integer

        ' Fill in the gaps (1) to (6), then run the program
        Total = ..(1)..
        LongWalks = 0
        For Index = 0 To ..(2)..
            Total = ..(3)..
            If Distance(Index) >= 10 Then
                ..(4)..
            End If
        Next
        Console.WriteLine("Total distance: " & Total & " km")
        Console.WriteLine("Average distance: " & ..(5).. & " km")
        Console.WriteLine("Walkers who walked at least 10 km: " & ..(6)..)
    End Sub
End Module
