const SpecialRequest = require('../models/special-request')

async function addSpecialRequest(data) {
    const newRequest = await SpecialRequest.create(data)
    return newRequest
}
async function getSpecialRequests(req, res, next) {
    try {
        const Requests = await SpecialRequest.find().populate("ReprsentativeID")
        res.status(200).json(Requests)
    } catch (error) {
        res.status(400).json("failed get data")
    }
}
async function updateReq(req, res, next) {
    const reqData = req.body
    const id = req.params.id
    try {
        const Requests = await SpecialRequest.findByIdAndUpdate(id, reqData, { new: true })
        res.status(200).json(Requests)
    } catch (error) {
        res.status(400).json("failed update data")
    }
}
async function getCompleteSpecialRequests(req, res, next) {
    try {
        const Requests = await SpecialRequest.find({ status: 'complete' }).populate("ReprsentativeID")
        res.status(200).json(Requests)
    } catch (error) {
        res.status(400).json("failed get data")
    }
}

module.exports = {
    addSpecialRequest,
    getSpecialRequests,
    updateReq,
    getCompleteSpecialRequests
}