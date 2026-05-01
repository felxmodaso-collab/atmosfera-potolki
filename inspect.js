const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const url = process.argv[2] || 'https://felxmodaso-collab.github.io/atmosfera-potolki/?inspect=1';
  const outDir = process.argv[3] || './screenshots/inspect';
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio']
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  page.on('console', msg => console.log(`[console.${msg.type()}]`, msg.text()));
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  page.on('requestfailed', r => console.log('[reqfail]', r.url(), r.failure()?.errorText));

  await page.goto(url, { waitUntil: 'load', timeout: 30000 });

  // wait for video to actually start playing
  await page.waitForTimeout(4000);

  const heroState = await page.evaluate(() => {
    const v = document.querySelector('section video');
    if (!v) return { ok: false, reason: 'no video element' };
    return {
      ok: true,
      readyState: v.readyState,
      paused: v.paused,
      currentTime: v.currentTime,
      duration: v.duration,
      videoWidth: v.videoWidth,
      videoHeight: v.videoHeight,
      networkState: v.networkState,
      currentSrc: v.currentSrc,
      error: v.error ? { code: v.error.code, message: v.error.message } : null,
      computedOpacity: getComputedStyle(v).opacity,
    };
  });
  console.log('HERO_VIDEO', JSON.stringify(heroState, null, 2));

  await page.screenshot({ path: path.join(outDir, '01-hero.png'), fullPage: false });

  // scroll for sticky widget
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(800);

  const stickyState = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('a[aria-label="WhatsApp"], a[aria-label="Telegram"], a[aria-label="MAX"], a[aria-label="Звонок"]'));
    return items.map(a => {
      const r = a.getBoundingClientRect();
      return {
        label: a.getAttribute('aria-label'),
        width: r.width,
        height: r.height,
        right: window.innerWidth - r.right,
        visible: r.width > 0 && r.height > 0,
      };
    });
  });
  console.log('STICKY', JSON.stringify(stickyState, null, 2));

  await page.screenshot({ path: path.join(outDir, '02-scrolled.png'), fullPage: false });

  // Hover on telegram
  const telegram = await page.$('a[aria-label="Telegram"]');
  if (telegram) {
    await telegram.hover();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, '03-tg-hover.png'), fullPage: false });

    const tgWidths = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[aria-label="WhatsApp"], a[aria-label="Telegram"], a[aria-label="MAX"], a[aria-label="Звонок"]')).map(a => ({
        label: a.getAttribute('aria-label'),
        width: a.getBoundingClientRect().width,
      }));
    });
    console.log('TG_HOVER', JSON.stringify(tgWidths, null, 2));
  }

  await browser.close();
  console.log('DONE');
})().catch(e => { console.error(e); process.exit(1); });
