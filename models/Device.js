const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Price: { type: Number, required: true },
    // ServiceID: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);
DeviceSchema.plugin(require('mongoose-autopopulate'));

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
