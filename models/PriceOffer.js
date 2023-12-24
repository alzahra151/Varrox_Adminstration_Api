const mongoose = require('mongoose')
const PriceOfferReq = require('./PriceOfferRequest')
const Service = require('./Service')
const Device = require('./Device')

const DeviceSchema = new mongoose.Schema({
  Device: { type: mongoose.Schema.Types.ObjectId, ref: Device, autopopulate: true },
  Quantity: { type: Number, required: true },
  SubTotalPrice: { type: Number, required: true }
})
const mentenanceSchema = mongoose.Schema({
  description: [{
    type: String
  }],
  price: { type: Number }
})
const ServiceSchema = new mongoose.Schema({
  Service: {
    type: mongoose.Schema.Types.ObjectId, ref: Service, autopopulate: true
  },
  Devices: [DeviceSchema],
  Maintenance: mentenanceSchema,
  serviceTotalPrice: { type: Number, required: true },
  TotalCopies: { type: Number }
});

const PriceOfferSchema = mongoose.Schema({
  Services: [ServiceSchema],
  TotalPrice: { type: Number },

}, { timestamps: true })
// description: {
//   type: Array, default: ["تدريب ومتابعة", "صيانة ودعم فنى", "تحديث وتطوير", "تدفع سنويا للفروع المذكورة وف حالةزيادة الفروع يتم االتفاق على مبلغ مقابل اشتراك سنوي يدفع بعد اول سنة"]
// },
PriceOfferSchema.plugin(require('mongoose-autopopulate'));
const PriceOffer = mongoose.model('PriceOffer', PriceOfferSchema)
module.exports = PriceOffer