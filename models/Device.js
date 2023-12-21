const mongoose = require("mongoose");
const Country = require('./Country')

const PriceSchema = new mongoose.Schema({
  country: { type: mongoose.Schema.Types.ObjectId, ref: Country, required: true, autopopulate: true },
  price: { type: Number, required: true },
});
const DeviceSchema = new mongoose.Schema(
  {
    Title: { type: String },
    Price: [PriceSchema],
  },
  { timestamps: true }
);
DeviceSchema.plugin(require('mongoose-autopopulate'));

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
