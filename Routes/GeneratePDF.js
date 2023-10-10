
const express = require("express");
const router = express.Router();
const { SendEmail } = require("../Controlers/NodeMailer");
const QRCode = require('qrcode');
const { generatePdf } = require("../Controlers/generate-pdf")

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

// router.post("/Download", async (req, res, next) => {
//   let OfferData = req.body;
//   let code = 129
//   const qrcode = code++
//   const stringQrCode = qrcode.toString()
//   console.log(stringQrCode)
//   const qr = await QRLogo.generateQRWithLogo(stringQrCode, "logo.png", {}, "PNG", "public/images/Varrox-Logo.png")
//   console.log(qr)
//   QRCode.toDataURL(stringQrCode, async (err, qrCodeDataURL) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     OfferData.qrCodeImage = qrCodeDataURL
//     // console.log(OfferData)
//     await ejs.renderFile("./views/OfferMail.ejs", { data: OfferData },
//       (err, data) => {
//         //create pdf
//         if (err) {
//           res.send(err);
//           console.log("faild render", data);
//         } else {
//           var options = {
//             // format: 'A4',
//             // border: '10mm',
//             height: "10.5in",
//             width: "7in",
//             // border: {
//             //   top: "1px",
//             //   bottom: "1px",
//             //   left: "1px",
//             //   right: "1px",

//             // },
//             // margin: {
//             //   top: "0px",
//             //   bottom: "0px",
//             //   left: "0px",
//             //   right: "0px",
//             // },
//             // padding: {
//             //   top: "5px",
//             //   bottom: "0px",
//             //   left: "5px",
//             //   right: "0px",
//             // },
//             // childProcessOptions: {
//             //   env: {
//             //     OPENSSL_CONF: "/dev/null",
//             //   },
//             // },
//           };
//           console.log(options);
//           pdf
//             .create(data, options)
//             .toFile("./PDF/VarroOffer.pdf", function (err, data) {
//               if (err) {
//                 // console.log(data)
//                 console.log(err.message);
//                 res.send(err);
//               } else {
//                 const filePath = "./PDF/VarroOffer.pdf";
//                 const fileName = "VarroOffer.pdf";
//                 fs.readFile(filePath, function (err, data) {
//                   if (err) {
//                     console.error(err);
//                     res.status(500).send("Error reading file");
//                   } else {
//                     res.setHeader("Content-Type", "application/pdf");
//                     res.setHeader(
//                       "Content-Disposition",
//                       "attachment; filename=" + fileName
//                     );
//                     res.send(data);
//                   }
//                 });
//               }
//             });
//         }
//       }
//     );
//   });
// });
// router.post('/down-pdf', async (req, res) => {
//   let OfferData = req.body;
//   const qrCode = OfferData.QrCode
//   QRCode.toDataURL(JSON.stringify(qrCode), async (err, qrCodeDataURL) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     OfferData.qrCodeImage = qrCodeDataURL
//     // console.log(OfferData)
//     let browser;
//     (async () => {
//       browser = await puppeteer.launch({ headless: false });
//       const [page] = await browser.pages();
//       const html = await ejs.renderFile("./views/OfferMail.ejs", { data: OfferData })
//       // console.log(html)

//       await page.setContent(html, { waitUntil: 'networkidle0' });
//       await page.emulateMediaType('screen');
//       const pdf = await page.pdf({
//         path: './PDF/file.pdf',
//         format: 'A4',
//         printBackground: true
//       });
//       fs.writeFileSync('output.pdf', pdf);
//       res.contentType("application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         "attachment; filename=invoice.pdf"
//       );
//       res.send(pdf);
//     })()
//       .catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//       })
//       .finally(() => browser?.close());
//   })
// })
router.post('/down-pdf', async (req, res) => {
  let OfferData = req.body;
  const qrCode = OfferData.QrCode
  const strCode = JSON.stringify(qrCode)
  console.log(qrCode, strCode)
  QRCode.toDataURL(strCode, async (err, qrCodeDataURL) => {
    // console.log(img)
    if (err) {
      console.error(err);
      return;
    }
    OfferData.qrCodeImage = qrCodeDataURL
    try {
      const pdf = await generatePdf(OfferData)
      res.contentType("application/pdf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${OfferData.QrCode}.pdf`
      );
      res.send(pdf)
    } catch (err) {
      res.json(err)
    }
  })
})


module.exports = router;
