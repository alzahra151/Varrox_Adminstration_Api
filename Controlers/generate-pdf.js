const ejs = require("ejs");
const chrome = require("chrome-aws-lambda");
const puppeteer = require('puppeteer')
// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//     chrome = require("chrome-aws-lambda");
//     puppeteer = require("puppeteer-core");
// } else {
//     puppeteer = require("puppeteer");
// }
async function generatePdf(data) {
    console.log("test")
    console.log(data)
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ["--hide-scrollbars", "--disable-web-security"],
            // defaultViewport: chrome.defaultViewport,
            executablePath: "./.cache/puppeteer/chrome/win64-1108766/chrome-win/chrome.exe",
            headless: true,
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