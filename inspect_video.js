const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = 'https://felxmodaso-collab.github.io/atmosfera-potolki/?vidcheck=1';
  const outDir = './screenshots/video-frames';
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio']
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(3500);

  // Pause loop, then sample frames at specific timecodes
  await page.evaluate(() => {
    const v = document.querySelector('section video');
    v.pause();
    v.loop = false;
  });

  const stamps = [0.05, 1.0, 2.0, 3.5, 5.0, 6.5, 7.5, 7.9];
  for (const t of stamps) {
    await page.evaluate((tc) => {
      const v = document.querySelector('section video');
      return new Promise(res => {
        const onSeek = () => { v.removeEventListener('seeked', onSeek); res(); };
        v.addEventListener('seeked', onSeek);
        v.currentTime = tc;
      });
    }, t);
    await page.waitForTimeout(150);
    const safe = String(t).replace('.', '_');
    await page.screenshot({ path: path.join(outDir, `frame-${safe}s.png`), fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  }

  // Also check the loop seam — compare last and first
  const seam = await page.evaluate(() => {
    const v = document.querySelector('section video');
    return new Promise(res => {
      const last = () => {
        v.removeEventListener('seeked', last);
        const c = document.createElement('canvas');
        c.width = 320; c.height = 180;
        c.getContext('2d').drawImage(v, 0, 0, 320, 180);
        const lastFrame = c.toDataURL();
        v.addEventListener('seeked', () => {
          c.getContext('2d').drawImage(v, 0, 0, 320, 180);
          const firstFrame = c.toDataURL();
          res({ lastFrame, firstFrame });
        }, { once: true });
        v.currentTime = 0.05;
      };
      v.addEventListener('seeked', last);
      v.currentTime = 7.95;
    });
  });
  fs.writeFileSync(path.join(outDir, 'seam-last.png'), Buffer.from(seam.lastFrame.split(',')[1], 'base64'));
  fs.writeFileSync(path.join(outDir, 'seam-first.png'), Buffer.from(seam.firstFrame.split(',')[1], 'base64'));

  await browser.close();
  console.log('frames saved:', fs.readdirSync(outDir));
})();
