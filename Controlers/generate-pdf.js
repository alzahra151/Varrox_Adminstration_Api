const ejs = require("ejs");
const puppeteer = require('puppeteer')
require("dotenv").config()
async function generatePdf(data) {
    console.log("test")
    // console.log(data)
    let browser;
    try {
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
        const [page] = await browser.pages();

        const html = await ejs.renderFile("./views/OfferMail.ejs", { data: data })
        // console.log(html)

        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        // await page.waitForNavigation({ timeout: 60000 });
        // await page.waitForEvent('domcontentloaded', { timeout: 60000 });
        await page.emulateMediaType('screen');
        // await page.waitForNavigation({
        //     waitUntil: 'networkidle0',
        //     timeout: 9000,
        // });


        const pdf = await page.pdf({

            format: 'A4',
            printBackground: true
        });

        browser.close();
        return pdf

    } catch (err) {
        browser?.close();
        console.error(err);
        return err
    }
}

module.exports = { generatePdf }
