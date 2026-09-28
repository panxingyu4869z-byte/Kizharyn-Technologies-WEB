import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { request } from 'node:http';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { once } from 'node:events';
import { createStaticServer } from '../scripts/serve.mjs';

let root;
let server;
let port;

before(async () => {
  root = await mkdtemp(join(tmpdir(), 'kizharyn-site-test-'));
  await mkdir(join(root, 'assets'));
  for (const file of ['index.html', 'research.html', 'product.html', 'about.html', 'contact.html']) {
    await writeFile(join(root, file), `<h1>${file}</h1>`);
    for (const locale of ['en', 'de']) {
      await mkdir(join(root, locale), { recursive: true });
      await writeFile(join(root, locale, file), `<h1>${locale}/${file}</h1>`);
    }
  }
  await writeFile(join(root, 'assets', 'test.css'), 'body { color: #123; }');
  await writeFile(join(root, 'assets', 'test.js'), 'console.log("site");');
  await writeFile(join(root, 'assets', 'test.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await writeFile(join(root, 'package.json'), '{"private":true}');
  await writeFile(join(root, 'assets', '.private'), 'private');
  server = createStaticServer(root);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  port = server.address().port;
});

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  if (root) {
    const target = resolve(root);
    assert.ok(target.startsWith(join(resolve(tmpdir()), 'kizharyn-site-test-')));
    await rm(target, { recursive: true, force: true });
  }
});

function get(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path, method }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('serves all fifteen pages, locale roots and query strings', async () => {
  const routes = ['/', '/en/', '/de/'];
  for (const prefix of ['', '/en', '/de']) {
    for (const file of ['index.html', 'research.html', 'product.html', 'about.html', 'contact.html?intent=research']) routes.push(`${prefix}/${file}`);
  }
  for (const path of routes) {
    const result = await get(path);
    assert.equal(result.status, 200, path);
    assert.equal(result.headers['content-type'], 'text/html; charset=utf-8');
  }
});

test('locale root redirects preserve the query and correct relative-link base', async () => {
  for (const locale of ['en', 'de']) {
    const result = await get(`/${locale}?intent=product`);
    assert.equal(result.status, 308);
    assert.equal(result.headers.location, `/${locale}/?intent=product`);
  }
});

test('serves asset MIME types and an empty HEAD response', async () => {
  for (const [path, type] of [['test.css', 'text/css; charset=utf-8'], ['test.js', 'text/javascript; charset=utf-8'], ['test.svg', 'image/svg+xml']]) {
    const result = await get(`/assets/${path}`);
    assert.equal(result.status, 200);
    assert.equal(result.headers['content-type'], type);
    assert.equal(result.headers['x-content-type-options'], 'nosniff');
  }
  const result = await get('/index.html', 'HEAD');
  assert.equal(result.status, 200);
  assert.equal(result.body, '');
  assert.ok(Number(result.headers['content-length']) > 0);
});

test('rejects traversal, private source files, directories and malformed paths', async () => {
  for (const path of ['/package.json', '/scripts/serve.mjs', '/content/locales/de.mjs', '/.env.local', '/en/package.json', '/fr/index.html', '/de/../index.html', '/assets', '/assets/', '/assets/.private', '/assets/../package.json', '/assets/%2e%2e/package.json', '/assets%5c..%5cpackage.json', '/assets/%00', '/missing.html']) {
    const result = await get(path);
    assert.equal(result.status, 404, path);
  }
  assert.equal((await get('/assets/%E0%A4%A')).status, 400);
});

test('never accepts writes', async () => {
  const before = await readFile(join(root, 'index.html'), 'utf8');
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
    const result = await get('/index.html', method);
    assert.equal(result.status, 405, method);
    assert.equal(result.headers.allow, 'GET, HEAD');
  }
  assert.equal(await readFile(join(root, 'index.html'), 'utf8'), before);
});
