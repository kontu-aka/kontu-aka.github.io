import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const refs = new Set([...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m => m[1]));
const errors = [];
let checked = 0;
for (const ref of refs) {
  if (/^https?:/.test(ref)) continue;
  if (!ref.startsWith('/')) { errors.push(`Unexpected asset: ${ref}`); continue; }
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (clean.startsWith('/_next/image')) errors.push('Runtime image optimization is unsupported');
  try { await stat(path.join(root, clean)); checked++; }
  catch { errors.push(`Missing local asset: ${clean}`); }
}
for (const id of [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1])) {
  if (!html.includes(`id="${id}"`)) errors.push(`Missing anchor: ${id}`);
}

// v1.0.0 (ex-v0.15): the site ships ONE intentional, Human-approved contact form
// that submits to Formspree (form id mqpenzan).
// R5.2a hardens this. The earlier version only failed on a *wrong* action value,
// so removing the attribute, switching to GET, or dropping the form entirely all
// passed silently - which is precisely the regression R5.2 was added to prevent.
// Every property the no-JS fallback depends on is now asserted positively.
const FORM_ID = 'mqpenzan';
const FORM_ACTION = `https://formspree.io/f/${FORM_ID}`;

if (/mailto:/i.test(html)) errors.push('Unexpected mailto: link');

const formTags = [...html.matchAll(/<form\b[^>]*>/gi)];
if (formTags.length !== 1) {
  errors.push(`Expected exactly 1 <form>, found ${formTags.length}`);
} else {
  const formOpenTag = formTags[0][0];
  // \b is load-bearing: without it `action=` also matches inside `formaction=`.
  const action = /\baction="([^"]*)"/i.exec(formOpenTag)?.[1];
  const method = /\bmethod="([^"]*)"/i.exec(formOpenTag)?.[1];
  // With neither attribute, a browser that never ran the JS submits a GET to the
  // current URL and writes every field the visitor typed into the address bar.
  if (action === undefined) errors.push(`Contact form has no action attribute; a no-JS submit would GET this page: ${formOpenTag}`);
  else if (action !== FORM_ACTION) errors.push(`Contact form action is '${action}', expected '${FORM_ACTION}'`);
  if (method === undefined) errors.push(`Contact form has no method attribute, so it defaults to GET: ${formOpenTag}`);
  else if (method.toUpperCase() !== 'POST') errors.push(`Contact form method is '${method}', expected POST`);
}
// A submit button's formaction overrides the form's action without touching it.
if (/\bformaction=/i.test(html)) errors.push('Unexpected formaction attribute');

// The scripted path is a second, independent destination: the HTML action can be
// right while the JS posts somewhere else. The form id is a build-time string in
// the client bundle and @formspree/core builds the submit URL there, so assert
// that every <host>/f/<id> endpoint in the bundle is Formspree's and carries our
// id. A changed host or a changed id now fails instead of passing on mere presence.
const jsDir = path.join(root, '_next', 'static', 'chunks');
let foundFormId = false;
const endpoints = new Set();
try {
  for (const entry of await readdir(jsDir, { recursive: true })) {
    if (!entry.endsWith('.js')) continue;
    const text = await readFile(path.join(jsDir, entry), 'utf8');
    if (text.includes(FORM_ID)) foundFormId = true;
    // The id is often still a template hole (`/f/${s}`) after minification.
    for (const m of text.matchAll(/https?:\/\/([A-Za-z0-9.-]+)\/f\/(\$\{[^}]*\}|[A-Za-z0-9_-]+)/g)) {
      endpoints.add(`${m[1]}|${m[2]}`);
    }
  }
} catch { /* nothing collected; the checks below report it */ }
if (!foundFormId) errors.push(`Expected Formspree form id '${FORM_ID}' to appear in the built client JS`);
if (endpoints.size === 0) errors.push('Found no Formspree submit endpoint in the built client JS (bundler output changed?)');
for (const endpoint of endpoints) {
  const [host, id] = endpoint.split('|');
  if (host !== 'formspree.io') errors.push(`Client JS builds a submit URL on unexpected host '${host}'`);
  // A template hole resolves from the form-id constant, already asserted above.
  else if (!id.startsWith('${') && id !== FORM_ID) errors.push(`Client JS uses unexpected form id '${id}'`);
}

if (/ctx-handoff(?:\.git|["/])|keiba-ai-demo|park-b\.webp|localhost:|127\.0\.0\.1:/i.test(html)) errors.push('Unexpected private/comparison/local URL in page');
// The intro-video button must never ship without the file it plays, so the
// video and its poster are required export members like the photos are.
for (const required of ['.nojekyll', '404.html', 'images/park-a.webp', 'images/procurement-overview.jpg',
  'video/ctx-enterprise-r6-integrated-review-20261112.mp4', 'video/ctx-enterprise-r6-integrated-20261112-poster.jpg']) {
  try { await stat(path.join(root, required)); } catch { errors.push(`Missing ${required}`); }
}
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else {
      if (/\.map$|^\.env|^CNAME$|^README|^package(?:-lock)?\.json$/.test(entry.name)) errors.push(`Unexpected public file: ${path.relative(root, file)}`);
      if (/\.(html|txt|json|js|css)$/.test(file)) {
        const text = await readFile(file, 'utf8');
        if (/C:\\\\Users\\\\|C:\\Users\\|\/Users\/|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|AKIA[0-9A-Z]{16}|sk-proj-[A-Za-z0-9_-]{20,}/.test(text)) errors.push(`Sensitive pattern: ${path.relative(root, file)}`);
      }
    }
  }
}
await walk(root);
console.log(JSON.stringify({ localReferences: checked, contactForm: formTags.length === 1, errors }, null, 2));
if (errors.length) process.exitCode = 1;
