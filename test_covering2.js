const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 } });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('file:///d:/Website/Astrology/index.html', { waitUntil: 'networkidle0' });

  console.log('Waiting for preloader to finish...');
  await new Promise(r => setTimeout(r, 4000));
  
  const linkInfo = await page.evaluate(() => {
    const link = document.querySelector('.nav-link-item a[href="#seva-drops"]');
    if (!link) return 'Link not found';
    
    const rect = link.getBoundingClientRect();
    const cx = rect.x + rect.width / 2;
    const cy = rect.y + rect.height / 2;
    
    const element = document.elementFromPoint(cx, cy);
    return {
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      coveringElement: element ? {
        tagName: element.tagName,
        id: element.id,
        className: element.className
      } : 'none'
    };
  });

  console.log('Link Info:', linkInfo);

  // Find the Seva link
  const link = await page.$('.nav-link-item a[href="#seva-drops"]');
  if (link) {
    console.log('Seva link found. Clicking...');
    try {
      await link.click();
      await new Promise(r => setTimeout(r, 2000));
      const scrollY = await page.evaluate(() => window.scrollY);
      console.log('Scroll Y after click:', scrollY);
    } catch (err) {
      console.log('CLICK ERROR:', err.message);
    }
  }

  await browser.close();
})();
