import { expect, test } from '@playwright/test';

test('core routes render with their primary heading', async ({ page }) => {
  for (const route of [
    '/',
    '/projects/',
    '/projects/ecc-init/',
    '/projects/eval42/',
    '/projects/phonemall/',
    '/blog/',
    '/about/',
    '/en/',
    '/en/projects/',
    '/en/projects/ecc-init/',
    '/en/projects/eval42/',
    '/en/projects/phonemall/',
    '/en/blog/',
    '/en/about/',
  ]) {
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

  await page.goto('/en/search/');
  const englishInput = page.locator('.pagefind-ui__search-input');
  await expect(englishInput).toBeVisible();
  await englishInput.fill('evidence');
  await expect(page.locator('.pagefind-ui__result').first()).toBeVisible();
});

test('theme choice persists and the skip link works', async ({ page }) => {
  await page.goto('/');
  const before = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: '切换明暗主题' }).click();
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

  for (const project of [
    'ecc-init',
    'eval42',
    'grounded-seek',
    'guarded-agent-pipeline',
    'novelflow',
    'phonemall',
  ]) {
    await page.goto(`/projects/${project}/`);
    await expect(page.locator(`a[href="/go/github/${project}"]`)).toBeVisible();
  }
});

test('featured projects follow the evidence-gated order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-grid h3')).toHaveText([
    'ecc-init',
    'GroundedSeek',
    'PhoneMall',
  ]);
  await page.goto('/en/');
  await expect(page.locator('.project-grid h3')).toHaveText([
    'ecc-init',
    'GroundedSeek',
    'PhoneMall',
  ]);
});

test('language switch preserves the current content route and exposes hreflang links', async ({
  page,
}) => {
  await page.goto('/projects/ecc-init/');
  await expect(page.getByRole('link', { name: 'Read in English' })).toHaveAttribute(
    'href',
    '/en/projects/ecc-init/',
  );
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    'href',
    'https://www.execute42.top/en/projects/ecc-init/',
  );

  await page.goto('/en/projects/ecc-init/');
  await expect(page.getByRole('link', { name: '切换到中文' })).toHaveAttribute(
    'href',
    '/projects/ecc-init/',
  );
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('mobile layout has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();
});

test('section headings use the available desktop width in both languages', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const route of ['/', '/en/']) {
    await page.goto(route);
    const headings = page.locator('.section-heading h2');
    await expect(headings.first()).toBeVisible();

    for (const heading of await headings.all()) {
      const metrics = await heading.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          lines: Math.round(element.getBoundingClientRect().height / parseFloat(style.lineHeight)),
          width: element.getBoundingClientRect().width,
        };
      });
      expect(metrics.lines).toBeLessThanOrEqual(2);
      expect(metrics.width).toBeGreaterThan(700);
    }
  }
});

test('core content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('面向真实业务');
  await expect(page.getByRole('link', { name: '查看精选项目' })).toBeVisible();
  await page.goto('/en/');
  await expect(page.locator('h1')).toContainText('AI products that work beyond the demo');
  await expect(page.getByRole('link', { name: 'View featured work' })).toBeVisible();
  await context.close();
});

test('unknown routes return the custom 404 page', async ({ page }) => {
  const response = await page.goto('/missing-e2e-route');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toBeVisible();
});
