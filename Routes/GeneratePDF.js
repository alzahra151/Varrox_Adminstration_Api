
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
  const qrCode = OfferData.QrCode
  const options = {
    errorCorrectionLevel: 'H', // Adjust the error correction level (L, M, Q, H)
    width: 300, // Adjust the size of the QR code

  };
  if (OfferData.Approve) {
    const strCode = `https://varroxsystems.com/varroxapproveddocs/02-${qrCode}.pdf`
    QRCode.toDataURL(strCode, options, async (err, qrCodeDataURL) => {
      if (err) {
        console.error(err);
        return;
      }
      OfferData.qrCodeImage = qrCodeDataURL
      try {
        // console.time(pdf)
        const pdf = await generatePdf(OfferData)
        // console.timeEnd(pdf)

        res.contentType("application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${OfferData.QrCode}.pdf`
        );
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        console.log(pdf)
        res.send(pdf)
      } catch (err) {
        res.json(err)
      }
    })
  } else {
    res.json({ message: "not approve document" })
  }
})



module.exports = router;
