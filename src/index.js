require('dotenv').config();
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');
const scrapeReviews = require('./scrape-reviews');
const compileReviews = require('./compile-reviews');
const helpers = require('./helpers');

const options = {
    url: `https://www.yext.com/s/${process.env.YEXT_ACCOUNT_ID}/reviews`,
    output: path.join(__dirname, './data/raw-reviews.json'),
    compiledOutput: path.join(__dirname, './data/reviews.json')
};

async function run() {

    console.log('Scraping reviews');
    await scrapeReviews(options);

    const donloadedFile = process.env.DOWNLOADS_PATH + process.env.FILE_PREFIX + helpers.getDateString({ delimiter: '', format: 'yyyymmdd' }) + '.csv';

    const inputData = await fs.readFileSync(donloadedFile, 'utf8');
    const reviews = await csv().fromString(inputData);

    console.log('Writing output');
    fs.writeFile(options.output, JSON.stringify(reviews), err => {
        if(err) console.log(err);
        console.log('Wrote raw output to file');
    });

    console.log('Compiling reviews');
    const compiledReviews = await compileReviews(reviews);

    fs.writeFile(options.compiledOutput, JSON.stringify(compiledReviews), err => {
        if(err) console.log(err);
        console.log('Wrote compiled reviews to file');
        process.exit();
    });

}

run();