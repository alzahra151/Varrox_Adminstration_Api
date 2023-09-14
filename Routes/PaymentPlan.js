const express=require('express')
const router = express.Router()
const {AddPaymentPlan ,GetPaymentPlans}=require('../Controlers/PaymentPlan')

router.post('/AddPaymentPlan', async (req, res) => {
    const planData = req.body
    try {
        const plan = await AddPaymentPlan(planData)
        res.status(200).json(plan)
    } catch (error) {
        res.status(401).json(error)
    }
})
router.get('/getPaymentPlans', async (req, res) => {
    try {
        const plans = await GetPaymentPlans()
        res.status(200).json(plans)
    } catch (err) {
                res.status(401).json(err)
    }
})
module.exports=router