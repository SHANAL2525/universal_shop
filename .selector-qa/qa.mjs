import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const baseUrl = 'http://127.0.0.1:5173';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = 'C:\\Users\\slshe\\AppData\\Local\\Temp\\universal-shop-selector-qa';
const viewports = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: edgePath, headless: true });
const errors = [];
const results = [];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`${viewport.width}x${viewport.height} console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`${viewport.width}x${viewport.height} page: ${error.message}`));
  page.on('requestfailed', (request) => errors.push(`${viewport.width}x${viewport.height} request: ${request.url()} ${request.failure()?.errorText ?? ''}`));

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Choose your catalogue style' }).waitFor();
  const metrics = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.template-card')];
    const actions = [...document.querySelectorAll('.template-action')];
    const rects = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height };
    });
    const actionRects = actions.map((action) => {
      const rect = action.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    });
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      cards: rects,
      actions: actionRects,
      availableLinks: document.querySelectorAll('a.template-card').length,
      pendingLinks: document.querySelectorAll('.template-card-pending a').length,
      pendingStatus: document.querySelector('.template-card-pending .template-action')?.textContent?.trim(),
    };
  });

  assert(metrics.cards.length === 3, `${viewport.width}x${viewport.height}: expected 3 cards`);
  assert(metrics.actions.length === 3, `${viewport.width}x${viewport.height}: expected 3 actions`);
  assert(metrics.availableLinks === 2, `${viewport.width}x${viewport.height}: expected 2 available card links`);
  assert(metrics.pendingLinks === 0, `${viewport.width}x${viewport.height}: Style 03 must not be a link`);
  assert(metrics.pendingStatus === 'Coming Soon', `${viewport.width}x${viewport.height}: missing Coming Soon status`);
  assert(metrics.scrollWidth <= metrics.innerWidth, `${viewport.width}x${viewport.height}: horizontal overflow`);
  assert(metrics.scrollHeight <= metrics.innerHeight, `${viewport.width}x${viewport.height}: selector requires vertical scroll`);
  assert(metrics.cards.every((rect) => rect.left >= 0 && rect.right <= metrics.innerWidth && rect.bottom <= metrics.innerHeight), `${viewport.width}x${viewport.height}: card clipped`);
  assert(metrics.actions.every((rect) => rect.top >= 0 && rect.bottom <= metrics.innerHeight), `${viewport.width}x${viewport.height}: action clipped`);

  if ([390, 768, 1440].includes(viewport.width)) {
    await page.screenshot({ path: `${outputDir}\\selector-${viewport.width}x${viewport.height}.png`, fullPage: false });
  }
  results.push({ viewport: `${viewport.width}x${viewport.height}`, scroll: `${metrics.scrollWidth}x${metrics.scrollHeight}`, cardHeight: metrics.cards[0].height });
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`navigation console: ${message.text()}`);
});
page.on('pageerror', (error) => errors.push(`navigation page: ${error.message}`));

await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await page.getByRole('link', { name: 'View Editorial Boutique demo' }).click();
await page.waitForURL('**/clothing/style-01');
await page.locator('.site-header .brand').waitFor({ state: 'visible' });
assert(await page.evaluate(() => window.scrollY) === 0, 'selector to Style 01 did not land at top');
assert(await page.locator('.site-header .brand').isVisible(), 'Style 01 VÉRA header not visible');

await page.goto(`${baseUrl}/clothing/style-02`, { waitUntil: 'networkidle' });
assert(await page.evaluate(() => window.scrollY) === 0, 'direct Style 02 load did not land at top');
assert(await page.getByText('New season / 26', { exact: false }).isVisible(), 'Style 02 catalogue intro missing');

const search = page.getByPlaceholder('Search products or item code');
await search.fill('sneakers');
assert(await page.locator('.product-card').count() === 1, 'Style 02 search did not filter to one product');
await search.fill('');
await page.getByRole('button', { name: 'Shoes', exact: true }).click();
assert(await page.locator('.product-card').count() === 2, 'Style 02 Shoes category did not show two products');
await page.getByRole('button', { name: 'All', exact: true }).click();

await page.evaluate(() => window.scrollTo(0, 720));
const cataloguePosition = await page.evaluate(() => window.scrollY);
assert(cataloguePosition > 300, 'catalogue did not reach a meaningful scroll position');
const firstProduct = page.locator('.product-card a').first();
const productHref = await firstProduct.getAttribute('href');
await firstProduct.click();
await page.waitForURL('**/clothing/style-02/product/**');
await page.locator('.product-info h1').waitFor({ state: 'visible' });
const productPosition = await page.evaluate(() => window.scrollY);
assert(productPosition === 0, `catalogue to product landed at ${productPosition}, expected 0`);
assert(await page.locator('.product-info h1').isVisible(), 'product details did not visibly render');
await page.screenshot({ path: `${outputDir}\\style-02-product-1440x900.png`, fullPage: false });

await page.goBack({ waitUntil: 'networkidle' });
await page.waitForURL('**/clothing/style-02');
const restoredPosition = await page.evaluate(() => window.scrollY);
assert(restoredPosition > 300, `browser Back lost catalogue context and restored ${restoredPosition}`);

await page.getByRole('link', { name: 'View other designs' }).click();
await page.waitForURL(`${baseUrl}/`);
await page.getByRole('heading', { name: 'Choose your catalogue style' }).waitFor();
assert(await page.evaluate(() => window.scrollY) === 0, 'template to selector did not land at top');

await page.goto(`${baseUrl}${productHref}`, { waitUntil: 'networkidle' });
assert(await page.evaluate(() => window.scrollY) === 0, 'direct product load did not land at top');
await page.reload({ waitUntil: 'networkidle' });
assert(await page.locator('.product-info h1').isVisible(), 'product refresh did not visibly render');
assert(await page.evaluate(() => window.scrollY) === 0, 'product refresh did not land at top');

assert(errors.length === 0, `browser runtime errors:\n${errors.join('\n')}`);
console.log(JSON.stringify({ results, navigation: { cataloguePosition, restoredPosition, productHref }, errors, screenshots: outputDir }, null, 2));
await browser.close();
