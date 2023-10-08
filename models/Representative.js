const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const RepresentativeSchema = mongoose.Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Country: { type: String, required: true },
    Mobile: { type: String, required: true },
    Password: { type: String, required: true },
    Image: { type: String },
    Role: { type: String, enum: ['SalesManager', 'Representative'], default: 'Representative' }
},
    { timestamps: true })

RepresentativeSchema.pre('save', async function (next) {
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

const Representative = mongoose.model('Representative', RepresentativeSchema)
module.exports = Representative