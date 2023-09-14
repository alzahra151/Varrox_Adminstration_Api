const mongoose = require('mongoose')
const PriceOfferReq = require('./PriceOfferRequest')
const Service = require('./Service')
const Device = require('./Device')
const PaymentPlan = require('./PaymentPlan')

const DeviceSchema = new mongoose.Schema({
  Device: { type: mongoose.Schema.Types.ObjectId, ref: Device },
  Quantity: { type: Number, required: true },
  SubTotalPrice: { type: Number, required: true }
})
const ServiceSchema = new mongoose.Schema({
  Service: { type: mongoose.Schema.Types.ObjectId, ref: Service },
  Devices: [DeviceSchema],

});
const PriceOfferSchema = mongoose.Schema({
  Services: [ServiceSchema],
  TotalPrice: { type: Number },
}, { timestamps: true })


const PriceOffer = mongoose.model('PriceOffer', PriceOfferSchema)
module.exports = PriceOffer