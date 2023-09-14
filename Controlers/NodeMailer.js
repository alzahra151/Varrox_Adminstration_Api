const nodemailer = require("nodemailer");
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alzahradesoky.15@gmail.com",
    pass: "qgjk gpbx idjk clfw",
  },
});
async function SendEmail(OfferData) {
  let sender = OfferData.PriceOfferReq.ReprsentativeID.Email;
  let reciver = OfferData.PriceOfferReq.Email;
  // let sender = 'alzahradesoky@gmail.com'
  // let reciver = 'alzahradesoky.15@gmail.com'
  let mailDetails = {
    from: sender,
    to: reciver,
    subject: "Varrox Price offer",
    text: "our Offer from varrox systems ",
    attachments: [
      {
        filename: "VarroOffer.pdf",
        path: "./PDF/VarroOffer.pdf",
      },
    ],
  };
  const info = await mailTransporter.sendMail(mailDetails);
  console.log("Message sent: %s", info.messageId);
}

module.exports = { SendEmail };
