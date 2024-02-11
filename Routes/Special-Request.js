const express = require('express')
const router = express.Router()
const { addSpecialRequest, getSpecialRequests, updateReq, getCompleteSpecialRequests } = require('../Controlers/Special-Request')
const { VerfiyToken, AuthorizeRoles } = require("../MiddleWare/Auth");

router.post('/add-spical-request', VerfiyToken, async (req, res, next) => {
    console.log(req.data)
    const data = req.body
    data.ReprsentativeID = req.Representative.id;
    try {
        const newService = await addSpecialRequest(data)
        res.status(200).json(newService)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/get-spical-requests', getSpecialRequests)
router.get('/get-complete-spical-requests', getCompleteSpecialRequests)

router.patch('/update-request/:id', updateReq)


module.exports = router
