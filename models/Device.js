const mongoose = require('mongoose')
const Service = require('./Service')
const DeviceSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Price: { type: String, required: true },
    ServiceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
}, { timestamps: true });

// Define pre 'remove' middleware on the DeviceSchema
// DeviceSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
//     // update the associated parent documents
//     const DeviceId = this.getFilter()._id
//     console.log(this.ServiceID, DeviceId)
//     try {
//         await Service.update({}, { $pull: { Devices: DeviceId } });
//         console.log("done")
//         next();
//     } catch (err) {
//         next(err)
//     }
// });
const Device = mongoose.model('Device', DeviceSchema)
module.exports = Device