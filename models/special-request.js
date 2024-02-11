const mongoose = require("mongoose");
const Country = require('../models/Country')
const Representative = require('../models/Representative')
const SpecialRequestSchema = new mongoose.Schema({
    activityType: { type: String, required: true },
    description: { type: String, required: true, default: "USD" },
    Country: { type: String, required: true },
    Governorate: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    ReprsentativeID: { type: mongoose.Schema.Types.ObjectId, ref: Representative, autopopulate: true },
    price: { type: String },
    status: { type: String, enum: ['pending', 'complete', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

const SpecialRequest = mongoose.model("SpecialRequest", SpecialRequestSchema);
module.exports = SpecialRequest;