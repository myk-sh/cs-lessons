#!/bin/bash
# Render a .pptx or .docx to JPG contact sheets for visual QA.
# usage: render.sh <file.pptx|file.docx> <prefix>
# Output: <prefix>-N.jpg per page/slide and <prefix>gridN.jpg contact sheets
# (9 slides per sheet for decks, 4 pages per sheet for documents).
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
# Map Roboto Mono / Consolas to a same-width mono font so code-width QA is trustworthy
mkdir -p ~/.config/fontconfig
[ -f ~/.config/fontconfig/fonts.conf ] || cp "$HERE/fonts.conf" ~/.config/fontconfig/fonts.conf
SOFFICE=/mnt/skills/public/pptx/scripts/office/soffice.py
EXT="${1##*.}"
cp "$1" "$2.$EXT"
python "$SOFFICE" --headless --convert-to pdf "$2.$EXT" >/dev/null 2>&1
rm -f "$2"-*.jpg "$2"grid*.jpg
if [ "$EXT" = "pptx" ]; then RES=55; else RES=80; fi
pdftoppm -jpeg -r $RES "$2.pdf" "$2"
python - "$2" "$EXT" <<'PY'
import sys, glob
from PIL import Image
p, ext = sys.argv[1], sys.argv[2]
fs = sorted(glob.glob(p + '-*.jpg')); ims = [Image.open(f) for f in fs]; w, h = ims[0].size
per, cols = (9, 3) if ext == 'pptx' else (4, 4)
for part in range(0, len(ims), per):
    chunk = ims[part:part + per]; rows = (len(chunk) + cols - 1) // cols
    g = Image.new('RGB', (w * cols, h * rows), 'white')
    for i, im in enumerate(chunk): g.paste(im, ((i % cols) * w, (i // cols) * h))
    g.save(f'{p}grid{part // per}.jpg')
print(len(fs), 'pages ->', sorted(glob.glob(p + 'grid*.jpg')))
PY
