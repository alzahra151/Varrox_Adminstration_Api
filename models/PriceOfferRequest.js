const mongoose = require('mongoose')
const Representative = require('./Representative')
const Service = require('../models/Service')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ServicesSchema = new mongoose.Schema({
  Devices: [String],
  Service: { type: mongoose.Schema.Types.ObjectId, ref: Service },
  Notes: { type: String }
});
const PriceOfferRequestSchema = mongoose.Schema({
  ActivityName: { type: String, require: true },
  ActivityNature: { type: String, require: true },
  activityLocation: { type: String, require: true },
  Country: { type: String, require: true },
  Governorate: { type: String, require: true },
  City: { type: String, require: true },
  ReprsentativeID: { type: mongoose.Schema.Types.ObjectId, ref: Representative },
  HavePriceOffer: { type: Boolean, default: false },
  Name: { type: String, required: true },
  Mobile: { type: String, required: true },
  Phone: { type: String },
  Email: { type: String },
  Location: { type: String },
  Services: [ServicesSchema],
  SendToAdmin: { type: Boolean, default: false },
  Complete: { type: Boolean, default: false },
  Comment: { type: String },
  InitialAmountOfMoney: { type: String },
  // Devices:[String],
  // Services:{type:mongoose.Schema.Types.ObjectId,ref:Service},
  Code: { type: Number, unique: true }
}, { timestamps: true })


PriceOfferRequestSchema.pre('save', async function (next) {
  const doc = this;
  const highestCode = await PriceOfferRequest.findOne().sort('-Code');
  doc.Code = highestCode ? highestCode.Code + 1 : 1;
  if (!this.QrCode) {
    this.QrCode = generateRandomNumber();
  }
  next();
});

const PriceOfferRequest = mongoose.model('PriceOfferRequest', PriceOfferRequestSchema)

module.exports = PriceOfferRequest

