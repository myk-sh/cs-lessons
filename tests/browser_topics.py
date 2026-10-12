"""Integration checks for chapter grouping and filters; requires Playwright."""
import argparse
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:8000/')
parser.add_argument('--browser-executable', default=None)
parser.add_argument('--screenshot', default=None)
args = parser.parse_args()
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=args.browser_executable, headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1440, 'height':1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(args.url)
    page.wait_for_selector('.lesson-item')
    assert 'Data transmission' in page.locator('.lesson-group h3').all_text_contents()[0]
    assert page.locator('.lesson-group h3').filter(has_text='Automated and emerging technologies').count()==1
    page.locator('#syllabus').select_option('0478')
    page.locator('#topic').select_option('0478:2')
    assert set(page.locator('.lesson-item strong').all_text_contents())=={'Packet Switching','Symmetric and Asymmetric Encryption'}
    page.locator('.lesson-item').filter(has_text='Symmetric and Asymmetric Encryption').click()
    page.wait_for_selector('#pdf-page:not([hidden])')
    page.wait_for_function("document.getElementById('preview').getAttribute('aria-busy')==='false'")
    assert '2.3' in page.locator('#lesson-meta').inner_text()
    assert page.locator('#page-count').inner_text()=='Page 1 of 30'
    assert page.locator('#documents button').count()==3
    assert 'Answer key' not in page.locator('#documents').inner_text()
    # Switching during a delayed worker start must not leave an unhandled
    # cancellation or replace the newly selected material with the old one.
    def delay_worker(route):
        page.wait_for_timeout(250)
        route.fallback()
    page.route('**/pdf.worker.min.mjs', delay_worker)
    page.locator('#documents button').filter(has_text='Student booklet').click()
    page.locator('#documents button').filter(has_text='Worksheet').click()
    page.locator('#documents button').filter(has_text='Slides').click()
    page.wait_for_selector('#pdf-page:not([hidden])')
    page.wait_for_function("document.getElementById('preview').getAttribute('aria-busy')==='false'")
    assert page.locator('#page-count').inner_text()=='Page 1 of 30'
    page.unroute('**/pdf.worker.min.mjs', delay_worker)
    if args.screenshot: page.screenshot(path=args.screenshot)
    page.locator('#topic').select_option('0478:6')
    assert set(page.locator('.lesson-item strong').all_text_contents())=={'Artificial Intelligence','Automated Systems','Robotics'}
    page.locator('.lesson-item').filter(has_text='Artificial Intelligence').click()
    assert 'lesson=a082db5543bedde0' in page.url
    page.locator('#syllabus').select_option('9618')
    assert page.locator('#topic').input_value()==''
    page.locator('#paper').select_option('P4')
    page.locator('#topic').select_option('9618:19')
    assert set(page.locator('.lesson-item strong').all_text_contents())=={'Binary Trees','Linked Lists','Queues','Stacks','Tree Traversals'}
    page.locator('#search').fill('19.2')
    assert page.locator('.lesson-item strong').all_text_contents()==['Tree Traversals']
    page.locator('#search').fill('')
    page.locator('#paper').select_option('P1')
    assert page.locator('#topic').input_value()==''
    assert set(page.locator('.lesson-item strong').all_text_contents())=={'Topologies and Cloud','Wired and Wireless','Network Hardware'}
    page.locator('#search').fill('does-not-match-any-lesson')
    assert page.locator('#empty').is_visible() and page.locator('.lesson-item').count()==0
    page.locator('#search').fill('')
    page.locator('#paper').select_option('')
    page.locator('#syllabus').select_option('0478')
    page.locator('#topic').select_option('0478:2')
    page.set_viewport_size({'width':390,'height':844})
    page.locator('.lesson-item').filter(has_text='Symmetric and Asymmetric Encryption').click()
    page.wait_for_selector('#pdf-page:not([hidden])')
    assert page.locator('#topic').is_visible()
    assert not errors, errors
    browser.close()
    print('PASS: chapter groups; topic/course/paper filters; section search; old bookmark; encryption preview; excluded key; empty result; mobile navigation')
