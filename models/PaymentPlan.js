const mongoose = require('mongoose')

const paymentPlanSchema = new mongoose.Schema({
    Plan:{type:String ,required:true},
})

const PaymentPlan = mongoose.model('PaymentPlan', paymentPlanSchema)
module.exports=PaymentPlan