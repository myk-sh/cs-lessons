# Lesson viewer

A static, responsive viewer for the lesson decks and Word documents in this repository. It has search, syllabus/paper filters, shareable lesson/material URLs, PDF previews with page controls and zoom, and downloads of the original files. It runs entirely on GitHub Pages with no server, login, or external Office embedding service.

## How it works

`scripts/build_viewer.py` finds materials inside `<syllabus> P<paper>/<lesson>/` folders. Supported inputs are `.pptx`, `.ppt`, `.docx`, `.doc`, and `.pdf`. LibreOffice converts Office files to PDFs at build time, preserving slide and page layouts. The generated site contains the PDFs and original files; the source documents stay unchanged. New lesson folders are picked up automatically.

**Answer keys are excluded by default**, both from the catalogue and from the output files. Never put teacher-only answers inside student documents you publish. This site has no access control: readers can access every file uploaded to Pages. `--include-answer-keys` explicitly opts into publishing the separate answer-key files; the workflow does not use that option.

## Run locally

Requires Python 3 and LibreOffice Writer/Impress (`soffice` on PATH). Install Quicksand and DejaVu fonts; the repository's `skills/comp-sci-lesson-maker/scripts/fonts.conf` provides the same-width fallback for Roboto Mono/Consolas. No Python or npm installation is needed by the builder or website; PDF.js 5.4.624 is bundled locally with its Apache-2.0 license.

```sh
python3 -m unittest discover -s tests -v
python3 scripts/build_viewer.py
python3 -m http.server 8000 --directory dist
```

In the prepared Codex cloud environment, first `source /workspace/lesson-tools/activate.sh` to activate the local LibreOffice installation. Alternatively, pass `--soffice /workspace/lesson-tools/bin/soffice` when building. Do not run parallel builds with that cloud wrapper because it uses a shared LibreOffice profile.

The viewer's `render.sh` helpers are not required for this site. Preview the local HTTP server in a browser; opening `index.html` directly from disk cannot load the JSON catalogue in many browsers. The bundled PDF.js renderer displays previews on desktop and mobile without relying on browser PDF plugins. Use **Open PDF** for printing, selecting text, or accessibility tools. The original PPT/Word files remain downloadable for editing. Animations, transitions, audio, video, and interactive Office features are not reproduced in the PDF preview.

The `dist/` directory is generated and ignored by Git. A build stages all conversions before replacing an earlier build, and refuses to overwrite unrelated existing directories. Conversion failures stop the build instead of leaving broken preview links. To rebuild after changing a lesson, rerun the command.

## Host on GitHub Pages

1. Commit and push the viewer, builder, and `.github/workflows/pages.yml` to `main`.
2. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run the **Lesson viewer** workflow from **Actions**, or push a change to a lesson or viewer file. Pull requests build and validate the site without deploying it.
4. Once deployment succeeds, open the URL reported by the deployment. For this repository the usual project-site address is `https://myk-sh.github.io/cs-lessons/` (custom domains or account settings may change it).

The workflow installs LibreOffice and fonts, checks discovery/publication behavior, converts every student material, uploads only `dist/`, and deploys on `main`. All asset URLs are relative so project sites under `/cs-lessons/` work.

GitHub Pages is available for public repositories on GitHub Free; publishing from a private repository requires a supported paid plan. A Pages site is normally public even if its source repository is private. If Pages is unavailable for this repository, the same `dist/` folder can be hosted on another static host. No repository visibility change or deployment has been performed by adding these files.

## Troubleshoot Pages 404s

If the homepage displays the repository README and links such as `/cs-lessons/9618%20P1/Topologies%20and%20Cloud/` return 404, Pages is serving the repository files instead of the generated viewer. Lesson folders contain Office documents, not an `index.html` web page. Select **GitHub Actions** under **Settings → Pages → Build and deployment**, then run the **Lesson viewer** workflow on `main`. The published homepage should show the searchable **Lesson Library**, and its preview/download links should point into `materials/`.

Check that both the workflow's build and deploy jobs succeeded. A failed workflow leaves the previously published site in place. The deployment artifact must come from `dist/`; do not publish the repository root or the `viewer/` source directory. The builder gives published files mode `644` and directories mode `755`, including LibreOffice exports that initially have owner-only permissions.

## Present slides with a clicker

Choose **Slides**, then **Fullscreen**. The slide fits both the width and height of the screen; page controls remain available. Clickers that send Page Down/Page Up or arrow keys advance/go back. Space also advances; Home/End jump to the first/last slide. These keys work for slides in the normal viewer too and do not interfere with typing in search or selecting filters. A clicker mapped to mouse clicks or custom keys may need its presenter setting changed to Page Down/Page Up.

Use **Exit fullscreen** or the browser's Escape shortcut to return. If native fullscreen is unavailable, the button expands the viewer to fill the browser window; Escape closes this fallback. Word/PDF documents can use fullscreen too, with normal vertical scrolling.

Optional browser regression check (requires Python Playwright and Chromium): after serving `dist/`, run `python3 tests/browser_presenter.py --url http://127.0.0.1:8000/`. Use `--browser-executable /path/to/chromium` to select an installed browser. This checks fullscreen, clicker keys, slide fit, input focus, and the unsupported-browser fallback. The standard Python build tests remain dependency-free.
