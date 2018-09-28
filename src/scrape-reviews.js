const puppeteer = require('puppeteer');
const path = require('path');
const helpers = require('./helpers');

async function scrapeReviews(options) {

    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();

    try {

        if(process.env.NODE_ENV === 'production') {
            await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: path.join(__dirname, './data/downloads')});
        }

        await page.goto(options.url);

        // Wait for page content to load
        await page.waitForSelector('#username');
        
        // Sign in to Yext
        await page.type('#username', process.env.YEXT_USERNAME);
        await page.type('#password', process.env.YEXT_PASSWORD);
        await page.click('#login button');

        await helpers.delay(15000);
        
        // Download the reviews
        await page.waitForSelector('.action-menu-toggler-text');
        await page.click('.action-menu-toggler-text');
        await page.waitForSelector('.js-export-button');
        await page.click('.js-export-button');

        await helpers.delay(10000);

        await browser.close();

        console.log('Scraped reviews');

    } catch (error) {
        console.log(error);
        browser.close();
    }
}

module.exports = scrapeReviews;