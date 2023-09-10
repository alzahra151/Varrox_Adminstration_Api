const mongoose = require('mongoose')
const PriceOfferReq = require('../models/PriceOfferRequest')
const Service = require('../models/Service')
const Device = require('../models/Device')

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
  TotalPrice: { type: String },
}, { timestamps: true })


const PriceOffer = mongoose.model('PriceOffer', PriceOfferSchema)
module.exports = PriceOffer