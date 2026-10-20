"""Private visual previews plus executable VB.NET test harness."""
from pathlib import Path
import json
import pypdfium2 as pdfium
from pypdf import PdfReader
from PIL import Image,ImageOps,ImageDraw
root=Path(__file__).resolve().parent
build=root/'.build'
for pdf in build.glob('*.pdf'):
    doc=pdfium.PdfDocument(str(pdf)); out=build/pdf.stem;out.mkdir(exist_ok=True)
    for i in range(len(doc)):
        im=doc[i].render(scale=1.3).to_pil();im.save(out/f'page-{i+1}.png')
    reader=PdfReader(str(pdf))
    (out/'text.txt').write_text('\n'.join(f'PAGE {i+1}\n{p.extract_text()}' for i,p in enumerate(reader.pages)),encoding='utf-8')
    print(pdf.stem, [(i+1,len(p.extract_text())) for i,p in enumerate(reader.pages)])
def contact(files,name,w=410,cols=3):
    thumbs=[]
    for f in files:
        im=Image.open(f).convert('RGB');im.thumbnail((w,580))
        tile=Image.new('RGB',(w,im.height+28),'white');tile.paste(im,(0,28));ImageDraw.Draw(tile).text((5,5),f.parent.name+' / '+f.stem,fill='black');thumbs.append(tile)
    h=max(t.height for t in thumbs);out=Image.new('RGB',(w*cols,h*((len(thumbs)+cols-1)//cols)), '#cccccc')
    for i,t in enumerate(thumbs):out.paste(t,((i%cols)*w,(i//cols)*h))
    out.save(build/name)
for folder in build.glob('Binary_Trees*'):
    if folder.is_dir():contact(sorted(folder.glob('page-*.png'),key=lambda p:int(p.stem.split('-')[1])),folder.name+'-contact.png')
for i in range(0,20,6):contact([build/f'slide-{j:02}.png' for j in range(i+1,min(i+7,21))],f'slides-{i+1}.png',600,2)
proj=build/'vb-check';proj.mkdir(exist_ok=True)
(proj/'Check.vbproj').write_text('<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><OptionStrict>On</OptionStrict></PropertyGroup></Project>')
model=(root/'Binary_Trees_Follow_Up_Model.vb').read_text(encoding='utf-8')
start=model.index('    Sub Main()');end=model.index('    End Sub',start)+len('    End Sub')
harness='''    Sub Main()
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
    End Sub'''
(proj/'Program.vb').write_text(model[:start]+harness+model[end:],encoding='utf-8')
