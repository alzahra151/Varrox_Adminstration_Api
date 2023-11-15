const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const router = require('../Routes/PriceOfferRequest');
const AdminSchema = mongoose.Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Country: { type: String, required: true },
    Mobile: { type: String, required: true },
    Password: { type: String, required: true },
    Role: { type: String, enum: ['secretarial', 'Manager'], default: 'secretarial' },
    Image: { type: String },
},
    { timestamps: true })

AdminSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(this.Password, salt);
        this.Password = hash

        next()
    }
    catch (err) {
        next(err)
    }
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin