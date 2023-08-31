let ejs = require("ejs");
const express = require('express')
const router = express.Router()
let pdf = require("html-pdf");
// const puppeteer = require('puppeteer')
const fs = require('fs')
const { SendEmail } = require('../Controlers/NodeMailer')


router.post('/SendEmail', async (req, res, next) => {
    let OfferData = req.body
    await ejs.renderFile(("./views/OfferMail.ejs"), { data: OfferData }, (err, data) => {
        if (err) {
            res.send(err);
            console.log(err)
        } else {
            let options = {
                "height": "13.25in",
                "width": "8.5in",
                border: {
                    top: "0px",
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                },
                margin: {
                    top: "0px",
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                },
                padding: {
                    top: "0px",
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                }
            };
            pdf.create(data, options).toFile("./PDF/VarroOffer.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                    console.log('failed')
                } else {
                    SendEmail(OfferData)
                    res.send("File created successfully");

                }
            });
        }
    });
})

router.post('/Download', async (req, res, next) => {
    let OfferData = req.body
    await ejs.renderFile(("./views/OfferMail.ejs"), { data: OfferData }, (err, data) => { //create pdf 
        if (err) {
            res.send(err);
            console.log("faild render")
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                border: {
                    top: "0px",
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                },
                margin: {
                    top: "0px",
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                },
                padding: {
                    top: "0px",
                    bottom: "0px",
                    left: "0px",
                    right: "0px"
                }
            };

            pdf.create(data, options).toFile("./public/test3.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                    console.log("failed create")
                } else {
                    // const filePath = './public/PDF/VarroOffer.pdf';
                    // const fileName = 'VarroOffer.pdf';
                    // fs.readFile(filePath, function (err, data) {
                    //     if (err) {
                    //         console.error(err);
                    //         res.status(500).send('Error reading file');
                    //     } else {
                    //         res.setHeader('Content-Type', 'application/pdf');
                    //         res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
                    //         res.send(data);
                    //     }
                    // });
                    res.send("File created successfully")

                }
            });
        }
    });
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setContent(html);
    // const pdfPath = 'PDF/output.pdf';
    // await page.pdf({ path: pdfPath });
    // await browser.close();
    // const pdfBuffer = await page.pdf();
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=download.pdf');
    // res.send(pdfBuffer);

})

module.exports = router