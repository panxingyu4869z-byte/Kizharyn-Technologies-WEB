import assert from 'node:assert/strict';
import { test } from 'node:test';
import { locales } from '../content/locales/index.mjs';
import { renderPage } from '../scripts/templates.mjs';
import { lieAppUrl, lieConsoleUrl } from '../content/site.mjs';
import { experience } from '../content/experience.mjs';

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

test('product pages connect the complete directory to independent Console details', () => {
  for (const locale of locales) {
    for (const page of locale.pages) {
      const html = renderPage(page, locale, locales);
      const shouldConnect = page.key === 'product';
      assert.equal(html.includes(`href="${lieAppUrl}"`), shouldConnect, `${locale.id}/${page.file}`);
      assert.equal(html.includes(`href="${lieConsoleUrl}console/index.html?lang=${locale.id}"`), page.key === 'product', `${locale.id}/${page.file} Console`);
      if (page.key === 'product') {
        for (const item of experience[locale.id].modules) assert.ok(html.includes(`console/modules/${item.id}.html`));
        for (const item of experience[locale.id].capabilities) assert.ok(html.includes(`console/capabilities/${item.id}.html`));
      }
    }
  }
});

test('public experience content uses one schema and paired sample identities in three languages', () => {
  for (const locale of locales) {
    assert.deepEqual(schema(experience[locale.id]), schema(experience.zh), locale.id);
    assert.deepEqual(experience[locale.id].samples.map(item => item.id), ['task', 'diagnostic', 'statistics']);
    assert.equal(experience[locale.id].modules.length, 4);
    assert.equal(experience[locale.id].capabilities.length, 8);
    if (locale.id !== 'zh') assert.doesNotMatch(JSON.stringify(experience[locale.id]), /[\u3400-\u9fff]/);
  }
});
