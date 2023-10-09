const ejs = require("ejs");
const puppeteer = require('puppeteer')

async function generatePdf(data) {
  
    let browser;
    try {
        browser = await puppeteer.launch({
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
