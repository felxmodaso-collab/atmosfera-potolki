const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const outDir = './screenshots/calc';
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  await page.goto('https://felxmodaso-collab.github.io/atmosfera-potolki/calculator/?cb=' + Date.now(), { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 900) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, `${String(y).padStart(5, '0')}.png`), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }

  await browser.close();
})();
