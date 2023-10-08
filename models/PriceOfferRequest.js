const mongoose = require('mongoose')
const Representative = require('./Representative')
const Service = require('../models/Service')
const PriceOffer = require('../models/PriceOffer')
const PaymentPlan = require('./PaymentPlan')

const PriceOfferRequestSchema = mongoose.Schema({
  ActivityName: { type: String, required: true },
  ActivityNature: { type: String, required: true },
  activityLocation: { type: String, required: true },
  Country: { type: String, require: true },
  Governorate: { type: String },
  City: { type: String },
  ReprsentativeID: { type: mongoose.Schema.Types.ObjectId, ref: Representative },
  Name: { type: String, required: true },
  Mobile: { type: String, required: true },
  Phone: { type: String },
  Email: { type: String },
  PriceOffer: { type: mongoose.Schema.Types.ObjectId, ref: PriceOffer, autopopulate: true },
  SendToAdmin: { type: Boolean, default: false },
  Complete: { type: Boolean, default: false },
  Comment: { type: String },
  InitialAmountOfMoney: { type: String },
  IsOpen: { type: Boolean, default: false }, //where admin open offer
  ApproveToSalesManger: { type: Boolean, default: false }, //when admin sent offer to accountant and sales mangers
  ApproveToReprsentative: { type: Boolean, default: false },
  Rejected: { type: Boolean, default: false },
  // SecretarialComment: { type: String },
  Code: { type: Number, unique: true },
  QrCode: { type: Number, unique: true },
  BranchesNumber: { type: Number, required: true },
  PaymentPlan: { type: mongoose.Schema.Types.ObjectId, ref: PaymentPlan, autopopulate: true },
  Notes: { type: String }
}, { timestamps: true })

PriceOfferRequestSchema.plugin(require('mongoose-autopopulate'));
PriceOfferRequestSchema.pre('save', async function (next) {
  const doc = this;
  const highestCode = await PriceOfferRequest.findOne().sort('-Code');
  doc.Code = highestCode ? highestCode.Code + 1 : 1;
  const highestQrCode = await PriceOfferRequest.findOne().sort('-QrCode');
  doc.QrCode = highestQrCode ? highestQrCode.QrCode + 1 : 192;
  next();
});


const PriceOfferRequest = mongoose.model('PriceOfferRequest', PriceOfferRequestSchema)

module.exports = PriceOfferRequest

