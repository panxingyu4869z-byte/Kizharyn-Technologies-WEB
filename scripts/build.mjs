import { writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { locales } from '../content/locales/index.mjs';
import { renderPage } from './templates.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = process.argv[2] ? resolve(process.argv[2]) : root;
for (const locale of locales) {
  const directory = resolve(output, locale.directory);
  await mkdir(directory, { recursive: true });
  for (const page of locale.pages) {
    await writeFile(resolve(directory, page.file), renderPage(page, locale, locales), 'utf8');
  }
}
if (output !== root) {
  for (const file of ['assets/wireframe.css', 'assets/wireframe.js', 'assets/favicon.svg']) {
    await mkdir(dirname(resolve(output, file)), { recursive: true });
    await copyFile(resolve(root, file), resolve(output, file));
  }
}
console.log(`Built ${locales.length * locales[0].pages.length} static pages in ${locales.length} languages.`);
