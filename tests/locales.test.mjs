import assert from 'node:assert/strict';
import { test } from 'node:test';
import { locales } from '../content/locales/index.mjs';
import { renderPage } from '../scripts/templates.mjs';
import { lieAppUrl } from '../content/site.mjs';

function schema(value, path = '') {
  if (Array.isArray(value)) return value.map((entry, index) => schema(entry, `${path}.${index}`));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, schema(entry, path ? `${path}.${key}` : key)]));
  }
  assert.equal(typeof value, 'string');
  assert.ok(value.length > 0 || path === 'directory', path);
  return typeof value;
}

test('all three locales share the same fields and five page identities', () => {
  assert.deepEqual(locales.map(locale => locale.id), ['zh', 'en', 'de']);
  const pageIdentities = locales[0].pages.map(({ key, file }) => ({ key, file }));
  assert.equal(pageIdentities.length, 5);
  for (const locale of locales) {
    assert.deepEqual(schema(locale), schema(locales[0]), locale.id);
    assert.deepEqual(locale.pages.map(({ key, file }) => ({ key, file })), pageIdentities, locale.id);
    assert.equal(locale.company.email, locales[0].company.email);
    assert.equal(locale.company.alternateEmail, locales[0].company.alternateEmail);
    if (locale.id !== 'zh') {
      assert.doesNotMatch(JSON.stringify(locale).replaceAll(locale.company.name, ''), /[\u3400-\u9fff]/, locale.id);
    }
  }
});

test('only the Chinese product page links to the public LIE application', () => {
  for (const locale of locales) {
    for (const page of locale.pages) {
      const html = renderPage(page, locale, locales);
      const shouldConnect = locale.id === 'zh' && page.key === 'product';
      assert.equal(html.includes(`href="${lieAppUrl}"`), shouldConnect, `${locale.id}/${page.file}`);
      if (locale.id !== 'zh') assert.ok(!html.includes(lieAppUrl), `${locale.id}/${page.file}`);
    }
  }
});
