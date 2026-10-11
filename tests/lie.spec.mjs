import { test, expect } from '@playwright/test';
import { lieAppUrl } from '../content/site.mjs';

test('Chinese LIE entry goes through the product page and exposes the configured public demo link', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.getByRole('link', { name: '体验 LIE', exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: '了解 LIE', exact: true }).click();
  await expect(page).toHaveURL(/\/product\.html$/);
  await expect(page.getByRole('link', { name: '体验 LIE', exact: true })).toHaveAttribute('href', lieAppUrl);
});
