const mongoose = require('mongoose')
const Device = require('./Device')
const ServiceSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Details: [{ type: String }],
    Devices: [{ type: mongoose.Schema.Types.ObjectId, ref: Device }],

}, { timestamps: true })

// Define pre 'remove' middleware on the ServiceSchema
ServiceSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    // Remove the associated child documents
    const ServiceId = this.getFilter()._id
    try {
        await Device.deleteMany({ ServiceID: ServiceId });
        console.log("done")
        next();
    } catch (err) {
        next(err)
    }

});
const Service = mongoose.model('Service', ServiceSchema)
module.exports = Service
