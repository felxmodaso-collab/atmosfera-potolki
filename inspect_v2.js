const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = 'https://felxmodaso-collab.github.io/atmosfera-potolki/?v=' + Date.now();
  const outDir = './screenshots/check';
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio']
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(4500);

  // Check both videos
  const heroState = await page.evaluate(() => {
    const vs = Array.from(document.querySelectorAll('section video'));
    return vs.map((v, i) => ({
      i,
      ready: v.readyState,
      paused: v.paused,
      t: +v.currentTime.toFixed(2),
      dur: v.duration,
      opacity: getComputedStyle(v).opacity,
    }));
  });
  console.log('VIDEOS', JSON.stringify(heroState, null, 2));

  // sticky widget at scroll
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '01-sticky-collapsed.png'), clip: { x: 1280, y: 250, width: 160, height: 350 } });

  const sticky = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[aria-label="WhatsApp"], a[aria-label="Telegram"], a[aria-label="MAX"], a[aria-label="Звонок"]')).map(a => {
      const r = a.getBoundingClientRect();
      const icon = a.querySelector('svg');
      const ir = icon ? icon.getBoundingClientRect() : null;
      return {
        label: a.getAttribute('aria-label'),
        a: { w: r.width, h: r.height, x: r.x, right: window.innerWidth - r.right },
        icon: ir ? { w: ir.width, h: ir.height, x: ir.x, visibleFromRight: window.innerWidth - ir.right, fullyVisible: ir.right <= window.innerWidth && ir.left >= r.left }
              : null,
      };
    });
  });
  console.log('STICKY', JSON.stringify(sticky, null, 2));

  // hover TG
  const tg = await page.$('a[aria-label="Telegram"]');
  if (tg) {
    await tg.hover();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, '02-tg-hover.png'), clip: { x: 1230, y: 250, width: 210, height: 350 } });

    const widths = await page.evaluate(() => Array.from(document.querySelectorAll('a[aria-label]')).filter(a=>['WhatsApp','Telegram','MAX','Звонок'].includes(a.getAttribute('aria-label'))).map(a=>({ l: a.getAttribute('aria-label'), w: a.getBoundingClientRect().width })));
    console.log('TG_HOVER', JSON.stringify(widths));
  }

  await browser.close();
})();
