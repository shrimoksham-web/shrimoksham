const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('file:///d:/Website/Astrology/index.html', { waitUntil: 'networkidle0' });

  console.log('Page loaded. Clicking "Seva" link...');
  
  // Find the Seva link
  const link = await page.$('a[href="#seva-drops"]');
  if (link) {
    console.log('Seva link found. Clicking...');
    await link.click();
    await page.waitForTimeout(2000);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    console.log('Scroll Y after click:', scrollY);
  } else {
    console.log('Seva link NOT found!');
  }

  await browser.close();
})();
