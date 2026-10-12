import * as pdfjs from './vendor/pdfjs/pdf.min.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;
const $ = id => document.getElementById(id);
let lessons = [];
let topics = [];
let selectedLesson = null;
let selectedDocument = null;
const syllabusNames = { '0478': 'IGCSE', '9618': 'AS & A Level' };

function matchesCourse(lesson) {
  return (!$('syllabus').value || lesson.syllabus === $('syllabus').value)
    && (!$('paper').value || lesson.paper === $('paper').value);
}

function matches(lesson) {
  const query = $('search').value.trim().toLowerCase();
  return matchesCourse(lesson)
    && (!$('topic').value || lesson.topicId === $('topic').value)
    && `${lesson.title} ${lesson.syllabus} ${lesson.paper} ${syllabusNames[lesson.syllabus] || ''} ${lesson.topic || ''} chapter ${lesson.chapter || ''} ${(lesson.sections || []).join(' ')}`.toLowerCase().includes(query);
}

function refreshTopics() {
  const selected = $('topic').value;
  const available = new Set(lessons.filter(matchesCourse).map(x => x.topicId));
  $('topic').replaceChildren(new Option('All topics', ''));
  for (const syllabus of Object.keys(syllabusNames)) {
    const choices = topics.filter(x => x.syllabus === syllabus && available.has(x.id));
    if (!choices.length) continue;
    const group = document.createElement('optgroup');
    group.label = `${syllabus} · ${syllabusNames[syllabus]}`;
    for (const topic of choices) group.append(new Option(`${topic.chapter ? `${topic.chapter} · ` : ''}${topic.title}`, topic.id));
    $('topic').append(group);
  }
  $('topic').value = available.has(selected) ? selected : '';
}

function renderList() {
  const visible = lessons.filter(matches).sort((a,b) => a.syllabus.localeCompare(b.syllabus)
    || a.paper.localeCompare(b.paper) || (a.chapter ?? 999)-(b.chapter ?? 999)
    || (a.sections?.[0] || '').localeCompare(b.sections?.[0] || '', undefined, {numeric:true})
    || a.title.localeCompare(b.title));
  $('lesson-list').replaceChildren();
  $('count').textContent = `${visible.length} lesson${visible.length === 1 ? '' : 's'}`;
  $('empty').hidden = visible.length > 0;
  let groupKey = null, container;
  for (const lesson of visible) {
    const key = `${lesson.syllabus}:${lesson.paper}:${lesson.topicId}`;
    if (key !== groupKey) {
      groupKey = key;
      container = document.createElement('section');
      container.className = 'lesson-group';
      const heading = document.createElement('h3');
      heading.id = `topic-${key.replaceAll(':','-')}`;
      heading.textContent = `${lesson.chapter ? `${lesson.chapter} · ` : ''}${lesson.topic || 'Other lessons'}`;
      const course = document.createElement('p');
      course.className = 'topic-course';
      course.textContent = `${lesson.syllabus} · ${syllabusNames[lesson.syllabus] || ''} · ${lesson.paper}`;
      container.setAttribute('aria-labelledby', heading.id);
      container.append(course, heading);
      $('lesson-list').append(container);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lesson-item';
    button.setAttribute('aria-current', String(selectedLesson?.id === lesson.id));
    const label = document.createElement('span');
    const title = document.createElement('strong');
    title.textContent = lesson.title;
    const meta = document.createElement('small');
    meta.textContent = `${(lesson.sections || []).join(' / ')}${lesson.sections?.length ? ' · ' : ''}${lesson.documents.length} materials`;
    label.append(title, meta);
    const arrow = document.createElement('span');
    arrow.className = 'item-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '›';
    button.append(label, arrow);
    button.addEventListener('click', () => selectLesson(lesson, null, true));
    container.append(button);
  }
}

function selectLesson(lesson, documentId, focus = false) {
  selectedLesson = lesson;
  $('welcome').hidden = true;
  $('lesson').hidden = false;
  $('lesson-title').textContent = lesson.title;
  $('lesson-meta').textContent = `${lesson.syllabus} · ${syllabusNames[lesson.syllabus] || ''} · Paper ${lesson.paper.slice(1)} · ${lesson.topic || 'Other lessons'}${lesson.sections?.length ? ` · ${lesson.sections.join(' / ')}` : ''}`;
  $('documents').replaceChildren();
  for (const material of lesson.documents) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'document';
    button.dataset.id = material.id;
    button.append(document.createTextNode(material.label));
    const type = document.createElement('span');
    type.className = 'file-type';
    type.textContent = material.format;
    button.append(type);
    button.title = material.name;
    button.addEventListener('click', () => selectDocument(material));
    $('documents').append(button);
  }
  selectDocument(lesson.documents.find(x => x.id === documentId) || lesson.documents[0]);
  renderList();
  if (focus) $('lesson-title').focus({ preventScroll: true });
}

function materialUrl(material, kind) {
  const url = new URL(material[kind], location.href);
  if (material.revision) url.searchParams.set('v', material.revision);
  return url.href;
}

function selectDocument(material) {
  selectedDocument = material;
  for (const button of $('documents').children) {
    button.setAttribute('aria-pressed', String(button.dataset.id === material.id));
  }
  $('document-label').textContent = material.label;
  $('open-pdf').href = materialUrl(material, 'pdf');
  $('download').href = materialUrl(material, 'original');
  $('download').download = material.name;
  loadPdf(material);
  document.title = `${selectedLesson.title} · Lesson Library`;
  const hash = new URLSearchParams({ lesson: selectedLesson.id, material: material.id }).toString();
  if (location.hash.slice(1) !== hash) history.replaceState(null, '', `#${hash}`);
}

function restoreSelection() {
  const params = new URLSearchParams(location.hash.slice(1));
  const lesson = lessons.find(x => x.id === params.get('lesson')) || lessons[0];
  if (lesson) selectLesson(lesson, params.get('material'));
}

for (const id of ['search', 'topic']) {
  $(id).addEventListener(id === 'search' ? 'input' : 'change', renderList);
}
for (const id of ['syllabus', 'paper']) {
  $(id).addEventListener('change', () => { refreshTopics(); renderList(); });
}
window.addEventListener('hashchange', restoreSelection);
// Read the latest catalogue; individual materials retain content-based caching.
fetch(`catalog.json?v=${Date.now()}`)
  .then(response => {
    if (!response.ok) throw new Error('Catalogue unavailable');
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data.lessons) || !data.lessons.length) throw new Error('Empty catalogue');
    lessons = data.lessons;
    topics = data.topics || [];
    for (const lesson of lessons) {
      if (!topics.some(x => x.id === lesson.topicId)) topics.push({id:lesson.topicId,syllabus:lesson.syllabus,chapter:lesson.chapter,title:lesson.topic || 'Other lessons'});
    }
    topics.sort((a,b) => a.syllabus.localeCompare(b.syllabus) || (a.chapter ?? 999)-(b.chapter ?? 999));
    refreshTopics();
    restoreSelection();
  })
  .catch(() => {
    $('count').textContent = 'Library unavailable';
    $('error').hidden = false;
    $('error').textContent = 'The lesson library could not load. Please refresh the page. For local use, serve the built site over HTTP as described in the viewer guide.';
  });

let pdf = null;
let loadingTask = null;
let renderingTask = null;
let pageNumber = 1;
let loadVersion = 0;
let renderVersion = 0;

function updatePageControls() {
  $('previous-page').disabled = !pdf || pageNumber <= 1;
  $('next-page').disabled = !pdf || pageNumber >= pdf.numPages;
  $('page-count').textContent = pdf ? `Page ${pageNumber} of ${pdf.numPages}` : 'Loading…';
}

async function loadPdf(material) {
  const version = ++loadVersion;
  ++renderVersion;
  if (renderingTask) renderingTask.cancel();
  if (loadingTask) loadingTask.destroy();
  pdf = null;
  pageNumber = 1;
  $('zoom').value = '1';
  $('pdf-page').hidden = true;
  $('pdf-status').hidden = false;
  $('pdf-status').textContent = 'Loading preview…';
  $('preview').setAttribute('aria-busy', 'true');
  updatePageControls();
  try {
    loadingTask = pdfjs.getDocument(materialUrl(material, 'pdf'));
    const loaded = await loadingTask.promise;
    if (version !== loadVersion) return;
    pdf = loaded;
    updatePageControls();
    await renderPage();
  } catch (error) {
    if (version !== loadVersion) return;
    showPdfError();
  }
}

function showPdfError() {
  $('pdf-status').hidden = false;
  $('pdf-status').textContent = 'The preview could not load. Use Open PDF to view or download this material.';
  $('pdf-page').hidden = true;
  $('preview').setAttribute('aria-busy', 'false');
  $('page-count').textContent = 'Preview unavailable';
}

async function renderPage() {
  if (!pdf) return;
  const version = ++renderVersion;
  const load = loadVersion;
  if (renderingTask) renderingTask.cancel();
  $('preview').setAttribute('aria-busy', 'true');
  try {
    const page = await pdf.getPage(pageNumber);
    if (version !== renderVersion || load !== loadVersion) return;
    const container = $('preview');
    const padding = parseFloat(getComputedStyle(container).paddingLeft) * 2;
    const width = container.clientWidth - padding;
    const natural = page.getViewport({ scale: 1 });
    const widthFit = width / natural.width;
    const isPresentation = isExpanded();
    const heightFit = (container.clientHeight - padding) / natural.height;
    const fit = isPresentation ? Math.min(widthFit, heightFit) : widthFit;
    const scale = isPresentation ? fit : fit * Number($('zoom').value);
    const viewport = page.getViewport({ scale });
    const resolution = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = $('pdf-page');
    canvas.width = Math.round(viewport.width * resolution);
    canvas.height = Math.round(viewport.height * resolution);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    canvas.setAttribute('aria-label', `${selectedLesson.title} — ${selectedDocument.label}, page ${pageNumber} of ${pdf.numPages}. Use Open PDF for selectable text.`);
    renderingTask = page.render({ canvasContext: canvas.getContext('2d'), viewport,
                                 transform: [resolution, 0, 0, resolution, 0, 0] });
    await renderingTask.promise;
    if (version !== renderVersion || load !== loadVersion) return;
    $('pdf-status').hidden = true;
    canvas.hidden = false;
    container.scrollTop = 0;
    container.scrollLeft = 0;
    container.setAttribute('aria-busy', 'false');
  } catch (error) {
    if (error.name !== 'RenderingCancelledException' && version === renderVersion && load === loadVersion) showPdfError();
  }
}

$('previous-page').addEventListener('click', () => {
  if (pdf && pageNumber > 1) { pageNumber--; updatePageControls(); renderPage(); }
});
$('next-page').addEventListener('click', () => {
  if (pdf && pageNumber < pdf.numPages) { pageNumber++; updatePageControls(); renderPage(); }
});
$('zoom').addEventListener('change', renderPage);
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderPage, 150);
});

function isExpanded() {
  return document.fullscreenElement === $('material-viewer') || $('material-viewer').classList.contains('expanded');
}

function updateFullscreen() {
  const expanded = isExpanded();
  $('fullscreen').textContent = expanded ? 'Exit fullscreen' : 'Fullscreen';
  $('fullscreen').setAttribute('aria-pressed', String(expanded));
  $('exit-fullscreen').hidden = !expanded;
  $('material-viewer').classList.toggle('presenting', expanded);
  for (const element of $('material-viewer').querySelectorAll('.viewer-bar, .pdf-toolbar, .preview-help')) {
    element.hidden = expanded;
  }
  document.body.classList.toggle('viewer-expanded', expanded);
  (expanded ? $('pdf-page') : $('fullscreen')).focus({ preventScroll: true });
  requestAnimationFrame(renderPage);
}

async function exitPresentation() {
  if (document.fullscreenElement === $('material-viewer')) {
    await document.exitFullscreen();
  } else {
    $('material-viewer').classList.remove('expanded');
    updateFullscreen();
  }
}

$('exit-fullscreen').addEventListener('click', exitPresentation);
$('fullscreen').addEventListener('click', async () => {
  const viewer = $('material-viewer');
  if (isExpanded()) {
    await exitPresentation();
  } else {
    try {
      if (!viewer.requestFullscreen) throw new Error('Fullscreen unavailable');
      await viewer.requestFullscreen();
    } catch {
      // Some mobile browsers do not expose or permit the Fullscreen API.
      viewer.classList.add('expanded');
      updateFullscreen();
    }
  }
});
document.addEventListener('fullscreenchange', updateFullscreen);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isExpanded()) {
    event.preventDefault();
    void exitPresentation();
    return;
  }
  if (!pdf || (selectedDocument?.label !== 'Slides' && !isExpanded()) || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest('input, select, textarea, [contenteditable="true"]')) return;
  const next = ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key);
  const previous = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key);
  if (event.key === ' ' && event.target.closest('button, a')) return;
  if (!next && !previous && !['Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const target = event.key === 'Home' ? 1 : event.key === 'End' ? pdf.numPages
    : Math.max(1, Math.min(pdf.numPages, pageNumber + (next ? 1 : -1)));
  if (target !== pageNumber) { pageNumber = target; updatePageControls(); renderPage(); }
});
