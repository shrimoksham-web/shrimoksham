const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('file:///d:/Website/Astrology/index.html', { waitUntil: 'networkidle0' });

  console.log('Waiting for preloader to finish...');
  await new Promise(r => setTimeout(r, 4000));
  
  // Find the Seva link
  const link = await page.$('a[href="#seva-drops"]');
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
  } else {
    console.log('Seva link NOT found!');
  }

  await browser.close();
})();
