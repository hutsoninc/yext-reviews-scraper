const puppeteer = require('puppeteer');
const helpers = require('./helpers');

async function scrapeReviews(options) {

    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();

    try {

        await page.goto(options.url);

        // Wait for page content to load
        await page.waitForSelector('#username');

        // Sign in to Yext
        await page.type('#username', process.env.YEXT_USERNAME);
        await page.type('#password', process.env.YEXT_PASSWORD);
        await page.click('#login button');

        await helpers.delay(10000);

        const result = await page.evaluate(async (options) => {
            return fetch(options.url + 'export', {
                method: 'GET'
            })
                .then(response => response.text());
        }, options);

        await browser.close();

        console.log('Scraped reviews');

        return result;

    } catch (error) {
        console.log(error);
        browser.close();
    }
}

module.exports = scrapeReviews;