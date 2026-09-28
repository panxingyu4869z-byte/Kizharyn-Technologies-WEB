import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pageFiles = new Set(['index.html', 'research.html', 'product.html', 'about.html', 'contact.html']);
for (const locale of ['en', 'de']) {
  for (const file of [...pageFiles].filter(file => !file.includes('/'))) pageFiles.add(`${locale}/${file}`);
}
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function isWithin(root, target) {
  const path = relative(root, target);
  return path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

export function createStaticServer(root = siteRoot) {
  const rootPath = resolve(root);
  return createServer(async (request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent((request.url ?? '/').split('?')[0]);
    } catch {
      response.writeHead(400);
      response.end('Bad request');
      return;
    }

    const segments = pathname.split('/');
    if (!pathname.startsWith('/') || /[\\\0]/.test(pathname) || segments.some(part => part.startsWith('.'))) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    if (pathname === '/en' || pathname === '/de') {
      const search = (request.url ?? '').includes('?') ? (request.url ?? '').slice((request.url ?? '').indexOf('?')) : '';
      response.writeHead(308, { Location: `${pathname}/${search}` });
      response.end();
      return;
    }
    const file = pathname === '/' ? 'index.html' : /^\/(en|de)\/$/.test(pathname) ? `${pathname.slice(1)}index.html` : pathname.slice(1);
    if (!pageFiles.has(file) && !file.startsWith('assets/')) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    try {
      const target = await realpath(resolve(rootPath, file));
      const realRoot = await realpath(rootPath);
      const allowedRoot = file.startsWith('assets/') ? resolve(realRoot, 'assets') : realRoot;
      if (!isWithin(allowedRoot, target) || !(await stat(target)).isFile()) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }
      const content = await readFile(target);
      response.writeHead(200, {
        'Content-Type': mimeTypes[extname(target).toLowerCase()] ?? 'application/octet-stream',
        'Content-Length': content.byteLength,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const host = '127.0.0.1';
  const port = Number(process.env.PORT ?? 4173);
  const server = createStaticServer();
  server.listen(port, host, () => console.log(`Site preview: http://${host}:${port}`));
}
