const PaymentPlan = require('../models/PaymentPlan')

async function AddPaymentPlan(data) {
    const plan = await PaymentPlan.create(data)
    return plan
}

async function GetPaymentPlans() {
    const plans = await PaymentPlan.find()
    return plans
}

module.exports={AddPaymentPlan ,GetPaymentPlans}