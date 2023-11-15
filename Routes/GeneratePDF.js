
const express = require("express");
const router = express.Router();
const { SendEmail } = require("../Controlers/NodeMailer");
const QRCode = require('qrcode');
const { generatePdf } = require("../Controlers/generate-pdf")
const pdf = require('html-pdf')
const ejs = require('ejs')
const fs = require('fs')
router.post("/SendEmail", async (req, res, next) => {
  let OfferData = req.body;
  const qrCode = OfferData.QrCode
  QRCode.toDataURL(JSON.stringify(qrCode), async (err, qrCodeDataURL) => {
    if (err) {
      console.error(err);
      return;
    }
    OfferData.qrCodeImage = qrCodeDataURL
    try {
      const pdf = await generatePdf(OfferData)
      res.contentType("application/pdf");
      SendEmail(OfferData, pdf)
      res.json("send successfully")
    } catch (err) {
      res.send(err)
    }
  });
});


router.post('/down-pdf', async (req, res) => {
  let OfferData = req.body;
  // console.log(OfferData)
  const qrCode = OfferData.QrCode
  const strCode = JSON.stringify(qrCode)
  // console.log(qrCode, strCode)
  QRCode.toDataURL(strCode, async (err, qrCodeDataURL) => {
    if (err) {
      console.error(err);
      return;
    }
    OfferData.qrCodeImage = qrCodeDataURL
    try {
      const pdf = await generatePdf(OfferData)
      res.contentType("application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${OfferData.QrCode}.pdf`
      );
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
      // console.log(pdf)
      res.send(pdf)
      // res.status(200).json(newBlob)
    } catch (err) {
      res.json(err)
    }
  })
})



module.exports = router;
