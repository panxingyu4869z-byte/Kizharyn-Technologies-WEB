import { test, expect } from '@playwright/test';
import { lieAppUrl } from '../content/site.mjs';

test('Chinese LIE entry goes through the product page before opening the public demo', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.getByRole('link', { name: '体验 LIE', exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: '了解 LIE', exact: true }).click();
  await expect(page).toHaveURL(/\/product\.html$/);
  await expect(page.getByRole('link', { name: '体验 LIE', exact: true })).toHaveAttribute('href', lieAppUrl);
  await page.getByRole('link', { name: '体验 LIE', exact: true }).click();
  await expect(page).toHaveURL(lieAppUrl);
  await expect(page).toHaveTitle(/LIE.*能力演示与验证/);
});
