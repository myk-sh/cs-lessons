"""Rebuild artwork: PYTHONPATH=/workspace/lesson-tools/python python3 render_assets.py.
Lucide icons are ISC licensed; all composed scenes and layouts are original.
"""
from pathlib import Path
import re
import cairosvg
ROOT=Path(__file__).resolve().parent

def render(name,body,width=800,height=600):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">{body}</svg>'
    (ROOT/(name+'.svg')).write_text(svg)
    cairosvg.svg2png(bytestring=svg.encode(),write_to=str(ROOT/(name+'.png')),output_width=width*2,output_height=height*2)

for path in ROOT.glob('*.svg'):
    if 'viewBox="0 0 24 24"' in path.read_text():
        svg=path.read_text().replace('currentColor','#494985')
        cairosvg.svg2png(bytestring=svg.encode(),write_to=str(path.with_suffix('.png')),output_width=320,output_height=320)

# A programmable arm: repeated movement is visible, with no implication of learning.
render('robot-arm','''<rect width="800" height="600" rx="36" fill="#F0EFF9"/>
<ellipse cx="402" cy="501" rx="260" ry="32" fill="#DAD8EF"/>
<path d="M230 469 L260 315 L421 202 L519 299" fill="none" stroke="#494985" stroke-width="64" stroke-linejoin="round"/>
<path d="M230 469 L260 315 L421 202 L519 299" fill="none" stroke="#AAA6D1" stroke-width="34" stroke-linejoin="round"/>
<g fill="#FFD84D" stroke="#494985" stroke-width="12"><circle cx="260" cy="315" r="44"/><circle cx="421" cy="202" r="44"/><circle cx="519" cy="299" r="30"/></g>
<path d="M519 322 v49 m-35 0 h70 m-70 0 v30 m70-30 v30" fill="none" stroke="#494985" stroke-width="16"/>
<rect x="170" y="460" width="150" height="45" rx="10" fill="#494985"/>
<rect x="468" y="407" width="99" height="84" rx="6" fill="#FFD84D" stroke="#494985" stroke-width="7"/>
<path d="M518 408 v30" stroke="#494985" stroke-width="7"/>
<path d="M624 205 q83 114 0 221" fill="none" stroke="#2E7D5B" stroke-width="10" stroke-dasharray="16 12"/>
<path d="M602 411 l24 25 29-22" fill="none" stroke="#2E7D5B" stroke-width="10"/>
''')
render('printer-scene','''<rect width="800" height="600" rx="36" fill="#EEF6F3"/>
<ellipse cx="398" cy="515" rx="292" ry="32" fill="#CFE2DA"/>
<rect x="252" y="73" width="296" height="242" rx="10" fill="white" stroke="#494985" stroke-width="10"/>
<path d="M295 130 h212 m-212 42 h212 m-212 42 h120" stroke="#DAD8EF" stroke-width="12"/>
<rect x="158" y="242" width="484" height="206" rx="32" fill="#AAA6D1" stroke="#494985" stroke-width="12"/>
<rect x="190" y="283" width="159" height="67" rx="10" fill="#494985"/>
<circle cx="216" cy="317" r="12" fill="#5DD398"/>
<path d="M246 308 h72 m-72 19 h54" stroke="white" stroke-width="5"/>
<rect x="251" y="387" width="299" height="116" rx="8" fill="#494985"/>
<path d="M279 449 h244" stroke="#FFD84D" stroke-width="12" stroke-dasharray="12 9"/>
<circle cx="657" cy="162" r="57" fill="#FFD84D"/><path d="M657 130 v43 m0 18 v7" stroke="#494985" stroke-width="14"/>
''')
# No text in the illustration: PowerPoint keeps the labels editable and accessible.
render('email-scene','''<rect width="800" height="600" rx="36" fill="#F0EFF9"/>
<ellipse cx="397" cy="513" rx="310" ry="30" fill="#DAD8EF"/>
<rect x="170" y="144" width="480" height="310" rx="25" fill="white" stroke="#494985" stroke-width="12"/>
<rect x="170" y="144" width="480" height="55" rx="20" fill="#494985"/>
<g fill="#FFD84D"><circle cx="203" cy="171" r="7"/><circle cx="228" cy="171" r="7"/><circle cx="253" cy="171" r="7"/></g>
<path d="M327 455 v53 m-96 0 h264" stroke="#494985" stroke-width="14"/>
<rect x="265" y="235" width="291" height="168" rx="12" fill="#FFD84D" stroke="#494985" stroke-width="9"/>
<path d="M271 245 l139 103 139-103 M271 390 l102-82 m176 82-102-82" fill="none" stroke="#494985" stroke-width="8"/>
<g transform="translate(572 66)"><circle r="67" fill="#2E7D5B"/><path d="M-31 0 l22 22 40-43" fill="none" stroke="white" stroke-width="13"/></g>
''')
for variant in ['healthy','spotted','dark']:
    bg='#F0EFF9' if variant!='dark' else '#29283D'
    leaf='#62B17A' if variant!='dark' else '#306848'
    body=f'<rect width="800" height="600" rx="36" fill="{bg}"/>'
    body+=f'<path d="M171 490 C76 191 361 53 660 97 C681 395 451 547 171 490Z" fill="{leaf}" stroke="#2E7D5B" stroke-width="14"/>'
    body+='<path d="M140 528 L604 153 M310 381 L255 208 M398 299 L533 311 M460 240 L418 143 M251 432 L435 457" stroke="#C5E6AC" stroke-width="11" fill="none"/>'
    if variant=='spotted':
        for x,y,r in [(290,270,40),(489,187,33),(430,391,43),(547,290,32),(224,393,30)]:
            body+=f'<circle cx="{x}" cy="{y}" r="{r}" fill="#C88643"/><circle cx="{x}" cy="{y}" r="{r*.48}" fill="#885435"/>'
    if variant=='dark': body+='<path d="M0 0 H470 L350 600 H0Z" fill="#101421" opacity=".5"/>'
    render('leaf-'+variant,body)
print('Rendered icons and six original scenes')
