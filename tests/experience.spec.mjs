import { test, expect } from '@playwright/test';
import { locales } from '../content/locales/index.mjs';
import { experience } from '../content/experience.mjs';
import { lieAppUrl, lieConsoleUrl } from '../content/site.mjs';

for (const locale of locales) {
  const base = locale.directory ? `/${locale.directory}/` : '/';
  test(`${locale.id}: homepage opens product details and public pages have no configuration metadata`, async ({ page }) => {
    await page.goto(base);
    await expect(page.locator('[role="tab"]')).toHaveCount(0);
    await page.locator('.home-product-entry a').click();
    await expect(page).toHaveURL(new RegExp(`${base}product\\.html$`));
    for (const file of ['index.html','product.html','research.html','about.html','contact.html']) {
      await page.goto(`${base}${file}`);
      await expect(page.locator('body')).not.toContainText(/books-001|合成示例\s*·|theme=|indigo|copper/i);
      await expect(page.locator('[data-theme], [name="theme"], [data-theme-selector]')).toHaveCount(0);
    }
  });
  test(`${locale.id}: each sample tab keeps its own input/result pair and keyboard state`, async ({ page }) => {
    await page.goto(`${base}product.html`);
    const copy = experience[locale.id];
    for (const item of copy.samples) {
      await page.getByRole('tab', { name: item.name, exact: true }).click();
      const panel = page.getByRole('tabpanel');
      await expect(panel).toHaveCount(1);
      for (const key of ['input', 'output', 'verify']) await expect(panel).toContainText(item[key]);
    }
    await page.getByRole('tab', { name: copy.samples[2].name, exact: true }).press('ArrowRight');
    await expect(page.locator('#tab-task')).toBeFocused();
    await expect(page.locator('#tab-task')).toHaveAttribute('aria-selected', 'true');
    await page.locator('#tab-task').press('End');
    await expect(page.locator('#tab-statistics')).toBeFocused();
  });
  test(`${locale.id}: scope and enterprise materials dependencies stay visible`, async ({ page }) => {
    await page.goto(`${base}product.html`);
    await expect(page.locator('[data-console-capability]')).toHaveCount(12);
    await expect(page.locator('main')).toContainText(experience[locale.id].conditions);
    await expect(page.getByRole('link', {name:experience[locale.id].demo,exact:true})).toHaveAttribute('href',lieAppUrl);
    for (const href of await page.locator('[data-console-capability]').evaluateAll(elements=>elements.map(element=>element.href))) { expect(href.startsWith(`${lieConsoleUrl}console/`)).toBe(true); expect(new URL(href).searchParams.get('lang')).toBe(locale.id); }
  });
}

test('structured enquiry fields are included in the draft and edits invalidate it', async ({ page }) => {
  await page.goto('/contact.html?intent=product');
  await page.locator('[name="email"]').fill('person@example.com');
  await page.locator('[name="message"]').fill('检查实际作答');
  for (const name of ['availableInput', 'expectedResult', 'acceptanceCriteria']) await page.locator(`[name="${name}"]`).fill(`${name}: A & B`);
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  const body = new URL(await page.locator('#mail-link').getAttribute('href')).searchParams.get('body');
  for (const name of ['availableInput', 'expectedResult', 'acceptanceCriteria']) expect(body).toContain(`${name}: A & B`);
  await page.locator('[name="availableInput"]').fill('changed');
  await expect(page.locator('#mail-actions')).toBeHidden();
});

// WCAG relative luminance and contrast ratio:
// https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
// L = .2126 R + .7152 G + .0722 B, after sRGB linearisation;
// contrast = (max(L1,L2)+.05)/(min(L1,L2)+.05).
const contrast = (foreground, background) => {
  const luminance = color => color.match(/[\d.]+/g).slice(0, 3).map(value => Number(value) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
};
test('rendered text, controls and dark research metadata meet their contrast roles', async ({ page }) => {
    await page.goto('/');
    const pair = async (selector, backgroundSelector, property = 'color') => {
      const foreground = await page.locator(selector).first().evaluate((element, key) => getComputedStyle(element).getPropertyValue(key), property);
      const background = await page.locator(backgroundSelector).first().evaluate(element => getComputedStyle(element).backgroundColor);
      return contrast(foreground, background);
    };
    expect(await pair('.hero__lead', 'body')).toBeGreaterThanOrEqual(4.5);
    expect(await pair('.button--primary', '.button--primary')).toBeGreaterThanOrEqual(4.5);
    expect(await pair('.research-section .source-date', '.research-section')).toBeGreaterThanOrEqual(4.5);
    expect(await pair('.research-section .figure-heading strong', '.research-section')).toBeGreaterThanOrEqual(4.5);
    await page.goto('/product.html');
    expect(await pair('.sample-columns p', '.sample-viewer')).toBeGreaterThanOrEqual(4.5);
    await page.goto('/contact.html');
    expect(await pair('#email', '#email', 'border-top-color')).toBeGreaterThanOrEqual(3);
    await page.locator('#email').focus();
    await page.keyboard.press('Tab');
    const focus = await page.locator('input[name="intent"][value="research"]').evaluate(element => {
      const style = getComputedStyle(element);
      return {width:style.outlineWidth, color:style.outlineColor};
    });
    expect(parseFloat(focus.width)).toBeGreaterThanOrEqual(3);
    expect(contrast(focus.color,'rgb(255, 255, 255)')).toBeGreaterThanOrEqual(3);
  });
