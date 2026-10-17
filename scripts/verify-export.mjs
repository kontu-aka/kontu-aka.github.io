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

// v1.0.0 (ex-v0.15): the site now ships ONE intentional, Human-approved contact
// form that submits to Formspree (form id mqpenzan) via client-side JS. This is
// expected. We still fail if there is any OTHER form mechanism: a mailto: link,
// a form posting anywhere other than Formspree, or more than one <form> element.
if (/mailto:/i.test(html)) errors.push('Unexpected mailto: link');
const formTags = [...html.matchAll(/<form\b[^>]*>/gi)];
if (formTags.length > 1) errors.push(`Expected at most 1 <form>, found ${formTags.length}`);
if (formTags.length === 1) {
  const formOpenTag = formTags[0][0];
  if (/\baction=/i.test(formOpenTag) && !/action="https:\/\/formspree\.io\/f\/mqpenzan"/i.test(formOpenTag)) {
    errors.push(`Contact form has unexpected action attribute: ${formOpenTag}`);
  }
  // The Formspree form id is a build-time string compiled into the client JS
  // bundle (not inlined in index.html for a client component), so search there.
  const jsDir = path.join(root, '_next', 'static', 'chunks');
  let foundFormId = false;
  try {
    for (const entry of await readdir(jsDir, { recursive: true })) {
      if (!entry.endsWith('.js')) continue;
      const text = await readFile(path.join(jsDir, entry), 'utf8');
      if (text.includes('mqpenzan')) { foundFormId = true; break; }
    }
  } catch { /* leave foundFormId false, reported below */ }
  if (!foundFormId) errors.push('Expected Formspree form id "mqpenzan" to appear in the built client JS');
}

if (/ctx-handoff(?:\.git|["/])|keiba-ai-demo|park-b\.webp|localhost:|127\.0\.0\.1:/i.test(html)) errors.push('Unexpected private/comparison/local URL in page');
for (const required of ['.nojekyll', '404.html', 'images/park-a.webp', 'images/procurement-overview.jpg']) {
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
