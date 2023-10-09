const ejs = require("ejs");
const chrome = require("chrome-aws-lambda");
const { PUPPETEER_REVISIONS } = require('puppeteer-core');
const puppeteer = require('puppeteer-core')
const { install } = require('@puppeteer/browsers');
const config = require('../puppeteer.config.cjs');
const buildId = PUPPETEER_REVISIONS?.chrome;
const cacheDir = config.cacheDirectory;
async function generatePdf(data) {
    // console.log("test")
    // console.log(data)
    let platform = 'windows'
    console.log('Installing Chrome version', buildId, 'for platform', platform, 'to', cacheDir);
    try {
        await install({ platform, browser: 'chrome', buildId, cacheDir });
        console.log('Chrome installed successfully');
    } catch (err) {
        console.error('Chrome installation failed', err);
        throw err;
    }
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ["--hide-scrollbars", "--disable-web-security"],
            // defaultViewport: chrome.defaultViewport,
            executablePath: "./.cache/puppeteer/chrome/win64-1108766/chrome-win/chrome.exe",
            headless: false,
            ignoreHTTPSErrors: true,
        });
        const [page] = await browser.pages();
        const html = await ejs.renderFile("./views/OfferMail.ejs", { data: data })
        // console.log(html)
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.emulateMediaType('screen');
        const pdf = await page.pdf({
            // path: `${data.QrCode}.pdf`,
            format: 'A4',
            printBackground: true
        });
        // console.log(pdf.path)
        return pdf

    } catch (err) {
        browser?.close();
        console.error(err);
        return err
    }
}

module.exports = { generatePdf }