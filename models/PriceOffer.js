const mongoose = require('mongoose')
const PriceOfferReq = require('../models/PriceOfferRequest')
const Service = require('../models/Service')

const DevicesSchema = new mongoose.Schema({
  Device: { type: String, required: true },
  DevicePricrOffer: { type: String, required: true },
});
const ServicesSchema = new mongoose.Schema({
  Service: { type: mongoose.Schema.Types.ObjectId, ref: Service },
  ServicePriceOffer: { type: String, required: true },
  DeviceOffer: [DevicesSchema]
});
const PriceOfferSchema = mongoose.Schema({
  PriceOfferReq: { type: mongoose.Schema.Types.ObjectId, ref: PriceOfferReq },
  PriceOffer: [ServicesSchema],
  TotalPrice: { type: String },
  ManagerComment: { type: String },
  IsOpen: { type: Boolean, default: false }, //where admin accept offer
  Approve: { type: Boolean, default: false }, //when admin sent offer to accountant
  Comment: { type: String },
  QrCode: {
    type: Number,
    unique: true
  },
}, { timestamps: true })

// Helper function to generate a random number with 7 digits
function generateRandomNumber() {
  const min = 1000000;  // Minimum 7-digit number
  const max = 9999999;  // Maximum 7-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
PriceOfferSchema.pre('save', async function (next) {
  if (!this.QrCode) {
    this.QrCode = generateRandomNumber();
  }
  next();
});
const PriceOffer = mongoose.model('PriceOffer', PriceOfferSchema)
module.exports = PriceOffer