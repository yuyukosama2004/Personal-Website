import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const required = [
  'index.html',
  '404.html',
  'about/index.html',
  'blog/index.html',
  'projects/index.html',
  'projects/eval42/index.html',
  'projects/phonemall/index.html',
  'search/index.html',
  'en/index.html',
  'en/about/index.html',
  'en/blog/index.html',
  'en/projects/index.html',
  'en/projects/eval42/index.html',
  'en/projects/phonemall/index.html',
  'en/search/index.html',
  'en/rss.xml',
  'rss.xml',
  'robots.txt',
  'sitemap-index.xml',
  'pagefind/pagefind.js',
  'pagefind/pagefind-ui.js',
  'pagefind/pagefind-ui.css',
];

const files = [];
const serverRoutes = new Set([
  '/go/github',
  '/go/github/ecc-init',
  '/go/github/eval42',
  '/go/github/grounded-seek',
  '/go/github/guarded-agent-pipeline',
  '/go/github/novelflow',
  '/go/github/phonemall',
]);
const seenServerRoutes = new Set();
const walk = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else files.push(absolute);
  }
};

const exists = async (target) => {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
};

const routeFor = (relative) => {
  const normalized = relative.split(path.sep).join('/');
  if (normalized === 'index.html') return '/';
  if (normalized.endsWith('/index.html')) return `/${normalized.slice(0, -'index.html'.length)}`;
  return `/${normalized}`;
};

const candidatesFor = (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!clean || pathname.endsWith('/')) return [path.join(dist, clean, 'index.html')];
  if (path.extname(clean)) return [path.join(dist, clean)];
  return [path.join(dist, clean), path.join(dist, clean, 'index.html')];
};

for (const relative of required) {
  if (!(await exists(path.join(dist, relative))))
    throw new Error(`Missing required output: ${relative}`);
}

await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const failures = [];

for (const file of htmlFiles) {
  const relative = path.relative(dist, file);
  const route = routeFor(relative);
  const html = await readFile(file, 'utf8');

  if (relative !== '404.html') {
    if (!/<link rel="canonical" href="https:\/\/www\.execute42\.top\//.test(html)) {
      failures.push(`${relative}: missing absolute canonical URL`);
    }
    if (!/<meta name="description" content="[^"]+"/.test(html)) {
      failures.push(`${relative}: missing meta description`);
    }
    if (
      !/<link rel="alternate" hreflang="zh-CN" href="https:\/\/www\.execute42\.top\//.test(html)
    ) {
      failures.push(`${relative}: missing Chinese hreflang URL`);
    }
    if (
      !/<link rel="alternate" hreflang="en" href="https:\/\/www\.execute42\.top\/en\//.test(html)
    ) {
      failures.push(`${relative}: missing English hreflang URL`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#|\/\/)/.test(value)) continue;
    const pathname = new URL(value, `https://www.execute42.top${route}`).pathname;
    if (serverRoutes.has(pathname)) {
      seenServerRoutes.add(pathname);
      continue;
    }
    const candidates = candidatesFor(pathname);
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      failures.push(`${relative}: broken internal reference ${value}`);
    }
  }
}

for (const route of serverRoutes) {
  if (!seenServerRoutes.has(route)) failures.push(`missing tracked server route ${route}`);
}

if (failures.length > 0) {
  throw new Error(`Built-site audit failed:\n${failures.join('\n')}`);
}

console.log(
  `Built-site audit passed: ${htmlFiles.length} HTML files and ${required.length} required outputs.`,
);
