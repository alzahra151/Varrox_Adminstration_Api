let ejs = require("ejs");
const express = require('express')
const router = express.Router()
let pdf = require("html-pdf");
const fs = require('fs')
const path = require('path')
const { SendEmail } = require('../Controlers/NodeMailer')


router.post('/SendEmail', async (req, res, next) => {
    let OfferData = req.body
    await ejs.renderFile(("./views/OfferMail.ejs"), { data: OfferData }, (err, data) => {
        if (err) {
            res.send(err);
            console.log(err)
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
            pdf.create(data, options).toFile("PDF/VarroOffer.pdf", function (err, data) {
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
    await ejs.renderFile(("views/OfferMail.ejs"), { data: OfferData }, (err, data) => { //create pdf 
        if (err) {
            res.send(err);
            console.log(err)
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
            pdf.create(data, options).toFile("PDF/VarroOffer.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                    console.log('failed')
                } else {
                    const filePath = './PDF/VarroOffer.pdf';
                    const fileName = 'varroxOffer.pdf';
                    fs.readFile(filePath, function (err, data) {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Error reading file');
                        } else {
                            res.setHeader('Content-Type', 'application/pdf');
                            res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
                            res.send(data);
                        }
                    });

                }
            });
        }
    });

})

module.exports = router