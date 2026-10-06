#!/bin/bash
# Render every slide of a deck to a JPG for embedding in the student booklet.
# usage: render_slides.sh <deck.pptx> <outdir>   ->  <outdir>/s-01.jpg, s-02.jpg, ...
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.config/fontconfig "$2"
[ -f ~/.config/fontconfig/fonts.conf ] || cp "$HERE/fonts.conf" ~/.config/fontconfig/fonts.conf
cp "$1" "$2/deck.pptx"
( cd "$2" && python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf deck.pptx >/dev/null 2>&1 )
rm -f "$2"/s-*.jpg
pdftoppm -jpeg -jpegopt quality=88 -r 150 "$2/deck.pdf" "$2/s"
ls "$2"/s-*.jpg | wc -l
