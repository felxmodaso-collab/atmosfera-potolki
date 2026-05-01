const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const base = 'https://felxmodaso-collab.github.io/atmosfera-potolki';
  const cb = '?cb=' + Date.now();
  const pages = ['', 'services/', 'calculator/', 'portfolio/', 'prices/', 'about/', 'contacts/', 'privacy/'];
  const outDir = './screenshots/audit-all';
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio']
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  for (const p of pages) {
    const name = p === '' ? 'home' : p.replace(/\//g, '');
    const url = base + '/' + p + cb;
    console.log(`→ ${name}: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(2500);
      // disable hero animations for stable shot
      await page.addStyleTag({ content: `
        .hero-image, video { animation: none !important; }
      `});
      await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
    } catch (e) {
      console.log(`  ERR: ${e.message}`);
    }
  }
  await browser.close();
  console.log('done.');
})();
