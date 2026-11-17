// Post-build: writes a route-specific index.html (title, description, canonical, OG/Twitter tags) for every
// route so crawlers and social previews see correct metadata without executing JS, and regenerates
// sitemap.xml. Route metadata comes from src/data/seo.ts (bundled on the fly with Vite's esbuild).
import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://www.hekayahaus.com';

const tmp = join(root, 'node_modules', '.cache', 'seo-routes.mjs');
await mkdir(dirname(tmp), { recursive: true });
await build({ entryPoints: [join(root, 'src/data/seo.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error' });
const { allRoutes } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
await rm(tmp, { force: true });

const template = await readFile(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const routes = allRoutes();
for (const r of routes) {
  const url = `${SITE}${r.path === '/' ? '/' : r.path}`;
  const image = `${SITE}${r.image ?? '/media/img/portrait-lightbulb-duo-1440.webp'}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(r.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${image}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(r.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(r.description)}`)
    .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${image}`);
  if (r.path !== '/') {
    // The hero preload only helps the homepage.
    html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/, '');
    const dir = join(dist, r.path);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), html);
  } else {
    await writeFile(join(dist, 'index.html'), html);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.noindex)
  .map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod><priority>${(r.priority ?? 0.5).toFixed(1)}</priority></url>`)
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(root, 'public', 'sitemap.xml'), sitemap);
console.log(`prerendered ${routes.length} routes + sitemap.xml`);
