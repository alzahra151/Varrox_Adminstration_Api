const mongoose = require('mongoose')
const Representative = require('./Representative')
const Service = require('../models/Service')
const PriceOffer = require('../models/PriceOffer')
const PaymentPlan = require('./PaymentPlan')
const Country = require('./Country')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PriceOfferRequestSchema = mongoose.Schema({
  ActivityName: { type: String, required: true },
  ActivityNature: { type: String, required: true },
  activityLocation: { type: String, required: true },
  Country: { type: mongoose.Schema.Types.ObjectId, ref: Country, autopopulate: true, require: true },
  Governorate: { type: String },
  City: { type: String },
  ReprsentativeID: { type: mongoose.Schema.Types.ObjectId, ref: Representative, autopopulate: true },
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
  Approve: { type: Boolean, default: false }, //when admin sent offer to accountant and sales mangers
  Rejected: { type: Boolean, default: false },
  // SecretarialComment: { type: String },
  Code: { type: Number, unique: true },
  // AcceptedCode: { type: String, default: 0, unique: true },
  QrCode: { type: Number },
  BranchesNumber: { type: Number, required: true },
  PaymentPlan: { type: mongoose.Schema.Types.ObjectId, ref: PaymentPlan, autopopulate: true },
  Notes: { type: String },
  TotalCopies: { type: Number },
  // test: { type: Number, unique: true, required: true },
}, { timestamps: true })

PriceOfferRequestSchema.plugin(require('mongoose-autopopulate'));
PriceOfferRequestSchema.pre('save', async function (next) {
  const doc = this;
  const highestCode = await PriceOfferRequest.findOne().sort('-Code');
  doc.Code = highestCode ? highestCode.Code + 1 : 1;
  next();
});
// PriceOfferRequestSchema.plugin(AutoIncrement, { inc_field: 'test', disable_hooks: false });

const PriceOfferRequest = mongoose.model('PriceOfferRequest', PriceOfferRequestSchema)

module.exports = PriceOfferRequest

