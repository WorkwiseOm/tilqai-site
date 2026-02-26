import { chromium } from 'playwright';
import fs from 'fs';

const pages = [
    '/',
    '/services',
    '/about',
    '/privacy',
    '/terms'
];

(async () => {
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
    const page = await context.newPage();

    for (const urlPath of pages) {
        const url = `http://localhost:8080${urlPath}`;
        const filename = urlPath === '/' ? 'home' : urlPath.substring(1);

        // English
        console.log(`Processing EN: ${urlPath}...`);
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => { localStorage.setItem('tilqai-lang', 'en'); });
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(3000); // Wait for custom animations to settle
        await page.screenshot({ path: `screenshots/${filename}_en.png`, fullPage: true });

        // Arabic
        console.log(`Processing AR: ${urlPath}...`);
        await page.evaluate(() => { localStorage.setItem('tilqai-lang', 'ar'); });
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(3000); // Wait for custom animations to settle
        await page.screenshot({ path: `screenshots/${filename}_ar.png`, fullPage: true });
    }
    await browser.close();
    console.log('Screenshots complete! Check the /screenshots directory.');
})();
