import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description='Browser regression checks for fullscreen and presenter keys; requires Playwright.')
parser.add_argument('--url', default='http://127.0.0.1:8000/')
parser.add_argument('--browser-executable', default=None)
parser.add_argument('--screenshot', default=None)
args = parser.parse_args()
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=args.browser_executable,headless=True,args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1280,'height':900})
 errors=[]
 page.on('pageerror',lambda err:errors.append(str(err)))
 page.goto(args.url)
 page.wait_for_selector('#pdf-page:not([hidden])')
 page.locator('#fullscreen').click()
 page.wait_for_function("document.fullscreenElement?.id==='material-viewer'")
 page.wait_for_function("document.getElementById('fullscreen').getAttribute('aria-pressed')==='true'")
 page.wait_for_function("document.getElementById('preview').getAttribute('aria-busy')==='false'")
 assert page.locator('#fullscreen').inner_text()=='Exit fullscreen'
 assert page.locator('#fullscreen').get_attribute('aria-pressed')=='true'
 page.wait_for_function("document.getElementById('pdf-page').getBoundingClientRect().height <= document.getElementById('preview').clientHeight")
 page.keyboard.press('PageDown')
 assert page.locator('#page-count').inner_text().startswith('Page 2 of')
 page.keyboard.press('PageUp')
 assert page.locator('#page-count').inner_text().startswith('Page 1 of')
 page.keyboard.press('ArrowRight')
 assert page.locator('#page-count').inner_text().startswith('Page 2 of')
 page.keyboard.press('Space')
 assert page.locator('#page-count').inner_text().startswith('Page 3 of')
 page.keyboard.press('End')
 last=page.locator('#page-count').inner_text()
 page.keyboard.press('PageDown')
 assert page.locator('#page-count').inner_text()==last
 page.keyboard.press('Home')
 page.wait_for_function("document.getElementById('preview').getAttribute('aria-busy')==='false'")
 if args.screenshot:
  page.screenshot(path=args.screenshot)
 page.locator('#fullscreen').click()
 page.wait_for_function('!document.fullscreenElement')
 page.wait_for_function("document.getElementById('fullscreen').getAttribute('aria-pressed')==='false'")
 page.locator('#search').focus()
 page.keyboard.press('ArrowRight')
 assert page.locator('#page-count').inner_text().startswith('Page 1 of')
 # Unsupported Fullscreen API: same button expands the viewer and Escape exits.
 page.evaluate("Object.defineProperty(document.getElementById('material-viewer'),'requestFullscreen',{value:undefined})")
 page.locator('#fullscreen').click()
 assert page.locator('#material-viewer').evaluate("el=>el.classList.contains('expanded')")
 page.keyboard.press('PageDown')
 assert page.locator('#page-count').inner_text().startswith('Page 2 of')
 page.keyboard.press('Escape')
 assert not page.locator('#material-viewer').evaluate("el=>el.classList.contains('expanded')")
 assert not errors,errors
 browser.close()
 print('PASS: fullscreen enter/exit; slide fit; clicker Page Up/Down; arrows, Space, Home/End; input focus; unsupported-browser fallback and Escape')
