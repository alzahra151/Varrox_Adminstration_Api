const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    Title: { type: String },
    Price: { type: Number },
    // ServiceID: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);
DeviceSchema.plugin(require('mongoose-autopopulate'));

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
