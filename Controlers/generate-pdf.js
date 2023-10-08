const ejs = require("ejs");

const puppeteer = require('puppeteer')

async function generatePdf(data) {
    console.log("test")
    console.log(data)
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false, args: ['--disable-extensions', '--disable-web-security'], });
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