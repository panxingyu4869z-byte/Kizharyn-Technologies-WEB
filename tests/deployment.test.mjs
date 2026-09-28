import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { access, cp, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales } from '../content/locales/index.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('Vercel build creates a complete static output directory from a clean checkout', async () => {
  const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
  const workspace = await mkdtemp(join(tmpdir(), 'kizharyn-deploy-test-'));
  try {
    for (const directory of ['content', 'scripts', 'assets']) {
      await cp(join(root, directory), join(workspace, directory), { recursive: true });
    }
    const [runtime, ...args] = config.buildCommand.split(' ');
    assert.equal(runtime, 'node');
    execFileSync(process.execPath, args, { cwd: workspace, stdio: 'pipe' });
    const output = join(workspace, config.outputDirectory);
    const expected = ['assets/favicon.svg', 'assets/wireframe.css', 'assets/wireframe.js'];
    for (const locale of locales) {
      for (const page of locale.pages) {
        const file = `${locale.directory ? `${locale.directory}/` : ''}${page.file}`;
        expected.push(file);
        const html = await readFile(join(output, file), 'utf8');
        assert.ok(html.includes(`lang="${locale.lang}"`), file);
        for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
          const url = new URL(match[1], `https://site.example/${file}`);
          if (url.origin === 'https://site.example') await access(join(output, url.pathname.slice(1)));
        }
      }
    }
    const entries = await readdir(output, { recursive: true, withFileTypes: true });
    const files = entries.filter(entry => entry.isFile()).map(entry =>
      join(entry.parentPath, entry.name).slice(output.length + 1).replaceAll('\\', '/'));
    assert.deepEqual(files.sort(), expected.sort());
  } finally {
    const target = resolve(workspace);
    assert.equal(dirname(target), resolve(tmpdir()));
    assert.ok(basename(target).startsWith('kizharyn-deploy-test-'));
    await rm(target, { recursive: true, force: true });
  }
});
