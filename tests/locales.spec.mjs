import { test, expect } from '@playwright/test';
import { locales } from '../content/locales/index.mjs';
import { lieAppUrl } from '../content/site.mjs';
const pagePath = (locale, file) => `/${locale.directory ? `${locale.directory}/` : ''}${file}`;
const translatedLocales = locales.filter(locale => locale.id !== 'zh');

async function expectNoOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, label).toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.body, label).toBeLessThanOrEqual(dimensions.viewport + 1);
  for (const element of await page.locator('.main-nav a, .language-nav a, .architecture, .contact-card, .mail-actions:not([hidden])').all()) {
    if (!await element.isVisible()) continue;
    const bounds = await element.boundingBox();
    expect(bounds.x, label).toBeGreaterThanOrEqual(-1);
    expect(bounds.x + bounds.width, label).toBeLessThanOrEqual(dimensions.viewport + 1);
  }
}

for (const locale of locales) {
  for (const entry of locale.pages) {
    test(`${locale.id}/${entry.file}: translated metadata, working links and same-page language switching`, async ({ page, request }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(pagePath(locale, entry.file));
      expect(response.status()).toBe(200);
      await expect(page).toHaveTitle(`${entry.title} · ${locale.company.name} ${locale.company.english}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale.lang);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', entry.description);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('.main-nav [aria-current="page"]')).toHaveText(entry.label);
      await expect(page.locator('.language-nav [aria-current="true"]')).toHaveText(locale.label);

      if (locale.id !== 'zh') {
        const content = await page.locator('body').evaluate(body => {
          const clone = body.cloneNode(true);
          clone.querySelectorAll('.language-nav, script').forEach(element => element.remove());
          return clone.textContent;
        });
        expect(content.replaceAll(locale.company.name, '')).not.toMatch(/[\u3400-\u9fff]/);
      }

      const references = await page.locator('a[href], link[href], script[src], img[src]').evaluateAll(elements => elements.map(element => ({
        reference: element.getAttribute('href') ?? element.getAttribute('src'),
        link: element.tagName === 'A',
        language: element.hasAttribute('data-language'),
      })));
      const siteOrigin = new URL(page.url()).origin;
      let applicationLinks = 0;
      const checked = new Set();
      for (const { reference, link, language } of references) {
        if (!reference) continue;
        const url = new URL(reference, page.url());
        if (url.protocol === 'mailto:') continue;
        if (url.origin !== siteOrigin) {
          expect(locale.id).toBe('zh');
          expect(entry.key).toBe('product');
          expect(url.href).toBe(lieAppUrl);
          applicationLinks += 1;
        } else if (link && !language) {
          const directory = url.pathname.substring(0, url.pathname.lastIndexOf('/') + 1);
          expect(directory, reference).toBe(pagePath(locale, ''));
        }
        if (checked.has(url.href)) continue;
        checked.add(url.href);
        const resource = await request.get(url.href);
        expect(resource.status(), reference).toBe(200);
        if (url.origin === siteOrigin && url.hash) {
          expect(await resource.text(), reference).toContain(`id="${decodeURIComponent(url.hash.slice(1))}"`);
        }
      }
      expect(applicationLinks).toBe(lieAppUrl && locale.id === 'zh' && entry.key === 'product' ? 1 : 0);

      for (const target of locales) {
        await page.locator(`.language-nav [data-language="${target.id}"]`).click();
        expect(new URL(page.url()).pathname).toBe(pagePath(target, entry.file));
        await expect(page.locator('html')).toHaveAttribute('lang', target.lang);
        await expect(page.locator('.language-nav [aria-current="true"]')).toHaveText(target.label);
        await expect(page.locator('.main-nav [aria-current="page"]')).toHaveText(target.pages.find(item => item.key === entry.key).label);
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const locale of translatedLocales) {
  test(`${locale.id}: mail content, clipboard and draft invalidation use the selected language`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(`${pagePath(locale, 'contact.html')}?intent=product`);
    await expect(page.locator('[name="intent"][value="product"]')).toBeChecked();
    await page.locator('[name="email"]').fill('person+locale@example.com');
    await page.locator('[name="name"]').fill('Alex & Kim');
    await page.locator('[name="organization"]').fill('R&D / München');
    const message = 'Integration A & B = C + D\n<example> #1';
    await page.locator('[name="message"]').fill(message);
    const requests = [];
    page.on('request', request => requests.push(`${request.method()} ${request.url()}`));
    await page.getByRole('button', { name: locale.form.submit }).click();
    await expect(page.locator('#contact-status')).toHaveText(locale.form.ready);
    await expect(page.locator('#mail-actions')).toBeVisible();
    const mail = new URL(await page.locator('#mail-link').getAttribute('href'));
    expect(mail.protocol).toBe('mailto:');
    expect(mail.pathname).toBe(locale.company.email);
    expect(mail.searchParams.get('subject')).toBe(locale.form.product);
    const body = mail.searchParams.get('body');
    for (const text of [locale.form.intent, locale.form.email, locale.form.name, locale.form.organization, locale.form.message, message]) expect(body).toContain(text);
    expect(body).not.toMatch(/[\u3400-\u9fff]/);
    await page.getByRole('button', { name: locale.form.copyMail }).click();
    await expect(page.locator('#contact-status')).toHaveText(locale.form.copied);
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied.replaceAll('\r\n', '\n')).toBe(`${locale.form.recipient}${locale.form.separator}${locale.company.email}\n${locale.form.subject}${locale.form.separator}${locale.form.product}\n\n${body}`);
    expect(requests).toEqual([]);

    for (const field of ['email', 'name', 'organization', 'message', 'intent']) {
      if (field === 'intent') await page.locator('[name="intent"][value="research"]').check();
      else await page.locator(`[name="${field}"]`).fill(field === 'email' ? 'changed@example.com' : `Changed ${field}`);
      await expect(page.locator('#mail-actions')).toBeHidden();
      await expect(page.locator('#contact-status')).toHaveText(locale.form.changed);
      await expect(page.locator('#mail-link')).toHaveAttribute('href', `mailto:${locale.company.email}`);
      await page.getByRole('button', { name: locale.form.submit }).click();
      await expect(page.locator('#contact-status')).toHaveText(locale.form.ready);
    }
    expect(new URL(await page.locator('#mail-link').getAttribute('href')).searchParams.get('subject')).toBe(locale.form.research);
  });

  test(`${locale.id}: validation and clipboard failure remain localized`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => { throw new DOMException('Clipboard access denied', 'NotAllowedError'); } },
      });
    });
    await page.goto(`${pagePath(locale, 'contact.html')}?intent=research`);
    await page.locator('[name="email"]').fill('person@example.com');
    await page.locator('[name="message"]').fill('   \n\t  ');
    await page.getByRole('button', { name: locale.form.submit }).click();
    await expect(page.locator('#mail-actions')).toBeHidden();
    expect(await page.locator('[name="message"]').evaluate(field => field.validationMessage)).toBe(locale.form.messageRequired);
    await page.locator('[name="message"]').fill('Technical enquiry');
    await page.getByRole('button', { name: locale.form.submit }).click();
    await page.getByRole('button', { name: locale.form.copyMail }).click();
    await expect(page.locator('#contact-status')).toHaveText(locale.form.copyFailed);
    await expect(page.locator('#mail-link')).toBeVisible();
  });
}

for (const intent of ['research', 'product']) {
  test(`language changes preserve the ${intent} contact intent and privacy anchor`, async ({ page }) => {
    await page.goto(`/contact.html?intent=${intent}`);
    await expect(page.locator('#privacy')).not.toHaveAttribute('open');
    await page.locator('.site-footer').getByRole('link', { name: locales[0].form.privacyTitle }).click();
    expect(new URL(page.url()).hash).toBe('#privacy');
    await expect(page.locator('#privacy')).toHaveAttribute('open', '');
    for (const locale of [...translatedLocales, locales[0]]) {
      await page.locator(`.language-nav [data-language="${locale.id}"]`).click();
      const current = new URL(page.url());
      expect(current.pathname).toBe(pagePath(locale, 'contact.html'));
      expect(current.searchParams.get('intent')).toBe(intent);
      expect(current.hash).toBe('#privacy');
      await expect(page.locator(`[name="intent"][value="${intent}"]`)).toBeChecked();
      await expect(page.locator('#privacy')).toHaveAttribute('open', '');
    }
  });
}

for (const width of [320, 390, 1440]) {
  test(`all locales fit ${width}px including architecture details and prepared mail`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of locales) {
      for (const entry of locale.pages) {
        const label = `${locale.id}/${entry.file} at ${width}px`;
        await page.goto(pagePath(locale, entry.file));
        await expectNoOverflow(page, label);
        if (entry.key === 'research') {
          await page.getByText(locale.ui.architectureDetails, { exact: true }).click();
          await expect(page.locator('.definition')).toBeVisible();
          await expect(page.locator('.definition')).toHaveText(locale.research.definition);
          await expectNoOverflow(page, `${label}, details open`);
        }
        if (entry.key === 'contact') {
          await page.locator('[name="email"]').fill('person@example.com');
          await page.locator('[name="intent"][value="product"]').check();
          await page.locator('[name="message"]').fill('Integration enquiry');
          await page.getByRole('button', { name: locale.form.submit }).click();
          await expect(page.locator('#mail-actions')).toBeVisible();
          await expectNoOverflow(page, `${label}, email prepared`);
        }
      }
    }
  });
}
