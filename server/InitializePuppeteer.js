const puppeteer = require('puppeteer');
let browser = null;
async function initPuppeteer() {
    if(!browser) {
        browser = await puppeteer.launch();
    }
    return browser;
}

async function newPagePuppeteer() {
    const browser = await initPuppeteer();
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    return page;
}

async function closePuppeteer() {
    if(browser) {
        await browser.close();
    }

}
module.exports = {
    newPagePuppeteer,
    closePuppeteer
};