const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = 'https://felxmodaso-collab.github.io/atmosfera-potolki/?seamcheck=' + Date.now();
  const outDir = './screenshots/seam';
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio']
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    const v = document.querySelector('section video');
    v.pause();
    v.loop = false;
  });

  const stamps = [0, 0.5, 1.0, 1.5, 2.0, 6.0, 6.5, 7.0, 7.5, 7.9];
  for (const t of stamps) {
    await page.evaluate((tc) => {
      const v = document.querySelector('section video');
      return new Promise(res => {
        const onSeek = () => { v.removeEventListener('seeked', onSeek); res(); };
        v.addEventListener('seeked', onSeek);
        v.currentTime = tc;
      });
    }, t);
    await page.waitForTimeout(120);
    const safe = String(t).replace('.', '_');
    await page.screenshot({ path: path.join(outDir, `${safe}s.png`), clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }

  await browser.close();
  console.log('saved:', fs.readdirSync(outDir));
})();
