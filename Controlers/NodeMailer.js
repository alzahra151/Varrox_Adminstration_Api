const nodemailer = require('nodemailer')
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alzahradesoky.15@gmail.com',
        pass: 'qgjk gpbx idjk clfw'
    }
})
async function SendEmail(OfferData) {
    let sender = OfferData.PriceOfferReq.ReprsentativeID.Email
    let reciver = OfferData.PriceOfferReq.Email

    let mailDetails = {
        from: sender,
        to: reciver,
        subject: 'Test mail',
        text: 'Node.js testing mail ',
        attachments: [{
            filename: 'VarroOffer.pdf',
            path: './PDF/VarroOffer.pdf'
        }]
    };
    const info = await mailTransporter.sendMail(mailDetails)
    console.log("Message sent: %s", info.messageId);
}

module.exports = { SendEmail }