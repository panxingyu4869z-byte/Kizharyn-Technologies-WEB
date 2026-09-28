import { test, expect } from '@playwright/test';
import { company, pages, research } from '../content/site.mjs';
import { lieAppUrl } from '../content/site.mjs';

const internalTerms = /未给出|待补充|待填写|内部能力核实|拟发布表述|公开状态|公开批准|首发安排|能力核实目录|产品版本\s*→|TODO|Lorem ipsum/i;

for (const entry of pages) {
  test(`${entry.label}: navigation, resources, anchors and public content`, async ({ page, request }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`/${entry.file}`);
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(new RegExp(company.name));
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
    await expect(page.locator('main h1')).toHaveCount(1);
    const nav = page.getByRole('navigation', { name: '主导航' });
    await expect(nav.getByRole('link')).toHaveCount(pages.length);
    await expect(nav.locator('[aria-current="page"]')).toHaveText(entry.label);
    for (const target of pages) {
      await expect(nav.getByRole('link', { name: target.label, exact: true })).toHaveAttribute('href', `./${target.file}`);
    }
    expect(await page.locator('body').innerText()).not.toMatch(internalTerms);

    const references = await page.locator('a[href], link[href], script[src], img[src]').evaluateAll(elements =>
      elements.map(element => element.getAttribute('href') ?? element.getAttribute('src')).filter(Boolean));
    for (const reference of new Set(references)) {
      const url = new URL(reference, page.url());
      if (url.protocol === 'mailto:') {
        expect(url.pathname).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
        continue;
      }
      if (url.origin !== new URL(page.url()).origin) {
        expect(url.href).toBe(lieAppUrl);
        expect((await request.get(lieAppUrl)).status()).toBe(200);
        continue;
      }
      const resource = await request.get(`${url.pathname}${url.search}`);
      expect(resource.status(), reference).toBe(200);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        expect(await resource.text(), reference).toContain(`id="${id}"`);
      }
    }
    expect(errors).toEqual([]);
  });
}

test('home preserves the four approved sections without empty progress blocks', async ({ page }) => {
  await page.goto('/');
  const sections = await page.locator('main > section').evaluateAll(elements => elements.map(element => element.className));
  expect(sections).toHaveLength(4);
  expect(sections[0]).toContain('hero');
  expect(sections[1]).toContain('research-section');
  expect(sections[2]).toContain('product-section');
  expect(sections[3]).toContain('invitation');
  await expect(page.locator('main')).not.toContainText('研究与产品进展');
  await expect(page.locator('main')).toContainText(company.description);
  await expect(page.locator('main')).toContainText(research.description);
});

test('research retains the full definition and labels the diagram as conceptual', async ({ page }) => {
  await page.goto('/research.html');
  await expect(page.locator('.definition')).toBeHidden();
  await page.getByText('查看架构说明', { exact: true }).click();
  await expect(page.locator('.definition')).toBeVisible();
  await expect(page.locator('.definition')).toHaveText(research.definition);
  await expect(page.locator('main')).toContainText('架构概念示意');
  await expect(page.locator('main')).toContainText('不表示固定执行顺序');
  await expect(page.locator('main')).not.toContainText(/性能领先|已经实现通用智能|实验验证成功/);
});

for (const intent of ['research', 'product']) {
  test(`contact intent ${intent} is preselected and editable`, async ({ page }) => {
    await page.goto(`/contact.html?intent=${intent}`);
    await expect(page.locator(`input[name="intent"][value="${intent}"]`)).toBeChecked();
    const other = intent === 'research' ? 'product' : 'research';
    await page.locator(`input[name="intent"][value="${other}"]`).check();
    await expect(page.locator(`input[name="intent"][value="${other}"]`)).toBeChecked();
  });
}

test('unknown contact intent never selects an option', async ({ page }) => {
  await page.goto('/contact.html?intent=unsupported');
  await expect(page.locator('input[name="intent"]:checked')).toHaveCount(0);
});

test('contact requires only email, intention and message', async ({ page }) => {
  await page.goto('/contact.html');
  const required = await page.locator('#contact-form [required]').evaluateAll(elements => [...new Set(elements.map(element => element.getAttribute('name')))].sort());
  expect(required).toEqual(['email', 'intent', 'message']);
  await expect(page.locator('[name="name"]')).not.toHaveAttribute('required');
  await expect(page.locator('[name="organization"]')).not.toHaveAttribute('required');
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  await expect(page.locator('#mail-actions')).toBeHidden();
  await expect(page.locator('[name="email"]')).toBeFocused();
});

test('mail draft encodes user text without submitting or claiming delivery', async ({ page }) => {
  await page.goto('/contact.html?intent=product');
  await page.locator('[name="email"]').fill('person+tag@example.com');
  await page.locator('[name="name"]').fill('张三 & Jane');
  await page.locator('[name="organization"]').fill('研究室 / R&D');
  const message = '讨论输入 A & B = C + D？\n第二行：<script>alert("x")</script> #样例';
  await page.locator('[name="message"]').fill(message);
  const requests = [];
  page.on('request', request => requests.push(`${request.method()} ${request.url()}`));
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  await expect(page.locator('#mail-actions')).toBeVisible();
  const link = await page.locator('#mail-link').getAttribute('href');
  expect(link).toMatch(/^mailto:/);
  expect(link).toContain('%26');
  expect(link).not.toContain('<script>');
  const mail = new URL(link);
  expect(mail.pathname).toBe(company.email);
  expect(mail.searchParams.get('subject')).toContain('产品合作');
  const body = mail.searchParams.get('body');
  for (const text of ['person+tag@example.com', '张三 & Jane', '研究室 / R&D', message]) expect(body).toContain(text);
  expect(requests).toEqual([]);
  await expect(page).toHaveURL(/\/contact\.html\?intent=product$/);
  await expect(page.locator('#contact-status')).not.toContainText(/信息已提交|提交成功|发送成功|已送达/);
});

for (const field of ['email', 'name', 'organization', 'message', 'intent']) {
  test(`editing ${field} invalidates the existing draft`, async ({ page }) => {
    await page.goto('/contact.html?intent=research');
    await page.locator('[name="email"]').fill('person@example.com');
    await page.locator('[name="message"]').fill('希望讨论认知架构。');
    await page.getByRole('button', { name: '生成联系邮件' }).click();
    await expect(page.locator('#mail-actions')).toBeVisible();
    if (field === 'intent') await page.locator('[name="intent"][value="product"]').check();
    else await page.locator(`[name="${field}"]`).fill(field === 'email' ? 'new@example.com' : '修改后的内容');
    await expect(page.locator('#mail-actions')).toBeHidden();
  });
}

test('whitespace-only message cannot create a draft and can be corrected', async ({ page }) => {
  await page.goto('/contact.html?intent=research');
  await page.locator('[name="email"]').fill('person@example.com');
  await page.locator('[name="message"]').fill('   \n\t  ');
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  await expect(page.locator('#mail-actions')).toBeHidden();
  await page.locator('[name="message"]').fill('希望讨论研究问题。');
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  await expect(page.locator('#mail-actions')).toBeVisible();
});

test('keyboard users can skip navigation and select an intention', async ({ page }) => {
  await page.goto('/contact.html');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '跳到主要内容' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.locator('[name="email"]').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('[name="intent"][value="research"]')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.locator('[name="intent"][value="research"]')).toBeChecked();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[name="intent"][value="product"]')).toBeChecked();
});

test('copying a contact draft preserves the recipient, subject and user content', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/contact.html?intent=research');
  await page.locator('[name="email"]').fill('person+copy@example.com');
  await page.locator('[name="name"]').fill('张三 & Jane');
  await page.locator('[name="organization"]').fill('研究室 / R&D');
  await page.locator('[name="message"]').fill('研究交流：A & B\n第二行 + #样例');
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  const mail = new URL(await page.locator('#mail-link').getAttribute('href'));
  await page.getByRole('button', { name: '复制邮件内容' }).click();
  await expect(page.locator('#contact-status')).toHaveText('邮件内容已复制，请粘贴到邮件应用中发送。');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied.replaceAll('\r\n', '\n')).toBe(`收件人：${company.email}\n主题：${mail.searchParams.get('subject')}\n\n${mail.searchParams.get('body')}`);
  await expect(page.locator('#contact-status')).not.toContainText(/信息已提交|提交成功|发送成功|已发送|已送达/);
});

test('clipboard rejection gives an honest fallback without claiming delivery', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => { throw new DOMException('Clipboard access denied', 'NotAllowedError'); } },
    });
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/contact.html?intent=product');
  await page.locator('[name="email"]').fill('person@example.com');
  await page.locator('[name="message"]').fill('希望讨论产品接入。');
  await page.getByRole('button', { name: '生成联系邮件' }).click();
  await page.getByRole('button', { name: '复制邮件内容' }).click();
  await expect(page.locator('#contact-status')).toHaveText('暂时无法复制，请通过页面上的邮箱直接联系。');
  await expect(page.locator('#contact-status')).not.toContainText(/内容已复制|信息已提交|提交成功|发送成功|已发送|已送达/);
  await expect(page.locator('#mail-link')).toBeVisible();
  await expect(page.locator('.email-link').first()).toHaveAttribute('href', `mailto:${company.email}`);
  expect(errors).toEqual([]);
});

test('privacy links open their details and static navigation works without JavaScript', async ({ page, browser }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '联系信息说明' }).click();
  await expect(page).toHaveURL(/\/contact\.html#privacy$/);
  await expect(page.locator('#privacy')).toHaveAttribute('open', '');
  await page.goto('/contact.html');
  await expect(page.locator('#privacy')).not.toHaveAttribute('open');
  await page.getByRole('link', { name: '联系信息说明' }).click();
  await expect(page.locator('#privacy')).toHaveAttribute('open', '');

  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await staticContext.newPage();
    await staticPage.goto(new URL('/index.html', page.url()).href);
    for (const entry of pages) {
      await staticPage.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: entry.label, exact: true }).click();
      await expect(staticPage).toHaveURL(new RegExp(`/${entry.file}$`));
      await expect(staticPage.locator('main h1')).toBeVisible();
    }
    await expect(staticPage.locator('noscript p')).toHaveText('请直接使用页面提供的邮箱联系。');
    await expect(staticPage.locator('noscript p')).toBeVisible();
    await expect(staticPage.locator('.email-link').first()).toHaveAttribute('href', `mailto:${company.email}`);
    const submit = staticPage.getByRole('button', { name: '生成联系邮件' });
    await expect(submit).toBeDisabled();
    await staticPage.locator('[name="email"]').fill('private@example.com');
    await staticPage.locator('[name="intent"][value="research"]').check();
    await staticPage.locator('[name="message"]').fill('私人联系内容不得出现在网址中');
    const requests = [];
    staticPage.on('request', request => requests.push(request.url()));
    await submit.click({ force: true });
    await staticPage.locator('[name="email"]').press('Enter');
    await expect(staticPage).toHaveURL(/\/contact\.html$/);
    await expect(staticPage.locator('#mail-actions')).toBeHidden();
    expect(requests).toEqual([]);
  } finally {
    await staticContext.close();
  }
});

for (const width of [320, 390, 1440]) {
  test(`all five pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const entry of pages) {
      await page.goto(`/${entry.file}`);
      const sizes = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      expect(sizes.scroll, entry.file).toBeLessThanOrEqual(sizes.width + 1);
      const nav = page.getByRole('navigation', { name: '主导航' });
      for (const link of await nav.getByRole('link').all()) {
        await expect(link).toBeVisible();
        const bounds = await link.boundingBox();
        expect(bounds.x, entry.file).toBeGreaterThanOrEqual(0);
        expect(bounds.x + bounds.width, entry.file).toBeLessThanOrEqual(width + 1);
      }
    }
  });
}
