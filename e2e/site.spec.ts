import { expect, test } from '@playwright/test';

test('core routes render with their primary heading', async ({ page }) => {
  for (const route of ['/', '/projects/', '/projects/ecc-init/', '/blog/', '/about/']) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  }
});

test('search finds indexed content', async ({ page }) => {
  await page.goto('/search/');
  const input = page.locator('.pagefind-ui__search-input');
  await expect(input).toBeVisible();
  await input.fill('证据');
  await expect(page.locator('.pagefind-ui__result').first()).toBeVisible();
});

test('theme choice persists and the skip link works', async ({ page }) => {
  await page.goto('/');
  const before = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: '切换深色或浅色主题' }).click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', before ?? '');
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', before ?? '');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused();
});

test('GitHub calls to action use fixed tracked routes', async ({ page }) => {
  await page.goto('/');
  const profileLinks = page.locator('a[href="/go/github"]');
  expect(await profileLinks.count()).toBeGreaterThanOrEqual(2);
  for (const link of await profileLinks.all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }

  await page.goto('/projects/ecc-init/');
  await expect(page.locator('a[href="/go/github/ecc-init"]')).toBeVisible();
});

test('mobile layout has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  await expect(page.getByRole('navigation', { name: '主要导航' })).toBeVisible();
});

test('core content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('把 AI 的能力');
  await expect(page.getByRole('link', { name: '查看项目' })).toBeVisible();
  await context.close();
});

test('unknown routes return the custom 404 page', async ({ page }) => {
  const response = await page.goto('/missing-e2e-route');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toBeVisible();
});
