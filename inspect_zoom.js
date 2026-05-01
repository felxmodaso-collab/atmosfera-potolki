const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = 'https://felxmodaso-collab.github.io/atmosfera-potolki/?zoom=' + Date.now();
  const outDir = './screenshots/zoom';
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  page.on('requestfailed', r => console.log('REQFAIL:', r.url()));

  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  // Scroll the home page in steps and capture viewport at each y
  const total = await page.evaluate(() => document.body.scrollHeight);
  console.log('totalHeight:', total);

  for (let y = 0; y < total; y += 900) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, `y-${String(y).padStart(5, '0')}.png`), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }

  // Also take portfolio page
  await page.goto('https://felxmodaso-collab.github.io/atmosfera-potolki/portfolio/?zoom=' + Date.now(), { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const total2 = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total2; y += 900) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, `portfolio-${String(y).padStart(5, '0')}.png`), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }

  await browser.close();
  console.log('done');
})();
