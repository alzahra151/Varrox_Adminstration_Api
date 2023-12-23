const mongoose = require("mongoose");

const ContrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    currency: { type: String, required: true, default: "USD" }
});

const Country = mongoose.model("Country", ContrySchema);
module.exports = Country;