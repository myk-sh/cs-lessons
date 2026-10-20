$lessonDir = $PSScriptRoot
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    foreach ($file in Get-ChildItem -LiteralPath $lessonDir -Filter '*.docx') {
        $document = $word.Documents.Open($file.FullName, $false, $true)
        try {
            $document.Repaginate()
            $pdfPath = Join-Path $lessonDir ('.build/' + $file.BaseName + '.pdf')
            $document.ExportAsFixedFormat($pdfPath, 17)
            Write-Output ($file.Name + ': ' + $document.ComputeStatistics(2) + ' pages')
        } finally { $document.Close(0) }
    }
} finally { $word.Quit() }
