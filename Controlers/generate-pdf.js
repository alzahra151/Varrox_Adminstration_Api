const ejs = require("ejs");
const puppeteer = require('puppeteer')
require("dotenv").config()
async function generatePdf(data) {
    console.log("test")
    // console.log(data)
    let browser;
    try {
        console.time('launch')
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath:
                process.env.NODE_ENV === "production"
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
        });
        console.timeEnd('launch');
        console.time('page')
        const page = await browser.newPage();
        console.timeEnd('page')
        console.time('html')
        const html = await ejs.renderFile("./views/OfferMail.ejs", { data: data })
        console.timeEnd('html')
        console.time('setContent')
        await page.setContent(html);
        // await page.waitForSelector('#backgroundContainer');
        await page.waitForSelector('.content1');
        await page.waitForFunction(() => {
            const element = document.querySelector('.content1');
            const computedStyle = window.getComputedStyle(element);
            const backgroundImage = computedStyle.getPropertyValue('background-image');
            return backgroundImage && backgroundImage !== 'none';
        });
        console.timeEnd('setContent')
        console.time('emulateMediaType')
        await page.emulateMediaType('screen');
        console.timeEnd('emulateMediaType')

        console.time('pdf')
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true
        });
        console.timeEnd('pdf')
        browser.close();
        return pdf

    } catch (err) {
        browser?.close();
        console.error(err);
        return err
    }
}

module.exports = { generatePdf }
