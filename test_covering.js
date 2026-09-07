const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('file:///d:/Website/Astrology/index.html', { waitUntil: 'networkidle0' });

  console.log('Waiting for preloader to finish...');
  await new Promise(r => setTimeout(r, 4000));
  
  const linkInfo = await page.evaluate(() => {
    const link = document.querySelector('a[href="#seva-drops"]');
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

  await browser.close();
})();
