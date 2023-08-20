const express = require('express')
const router = express.Router()

const { AddPriceOfferReq, getRepresentativeRequests, GetAllRequestsForSalesManger, updateReq, GetAcceptedReq, GetRejectedReq,
    GetPendingReq, NewReqCount, GetAllSendRequests, getReqByID, getCommentedReq, getCompletedReqs } = require('../Controlers/PriceOfferRequest')
const { VerfiyToken, AuthorizeRoles } = require('../MiddleWare/Auth')
const { VerfiyAdminToken } = require('../MiddleWare/AdminAuth')

router.post('/AddRequest', VerfiyToken, async (req, res, next) => {
    const data = req.body
    req.body.ReprsentativeID = req.Representative.id
    const NewClient = await AddPriceOfferReq(data)
    console.log(NewClient)
    res.status(200).json(NewClient)
})
router.get('/SalesMangerRequests', VerfiyToken, async (req, res, next) => {
    try {
        const requestes = await GetAllRequestsForSalesManger()
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }
})

router.get('/CompletedRequests', VerfiyToken, async (req, res, next) => {
    try {
        const requestes = await getCompletedReqs()
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }
})

router.get('/GetAllSendRequests', async (req, res, next) => {
    try {
        const requestes = await GetAllSendRequests()
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/AcceptedReq', async (req, res, next) => {
    try {
        const requestes = await GetAcceptedReq()
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/RejectedReq', async (req, res, next) => {
    try {
        const requestes = await GetRejectedReq()
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/PendingReq', async (req, res, next) => {
    try {
        const requestes = await GetPendingReq()
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/NewReqCount', async (req, res) => {
    try {
        const count = await NewReqCount()
        res.status(200).json(count)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/RepresenetitaveRequests', AuthorizeRoles(['Representative']), async (req, res, next) => {
    try {
        const RepresentativeId = req.Representative.id
        const requestes = await getRepresentativeRequests(RepresentativeId)
        res.status(200).json(requestes)
    } catch (err) {
        res.status(401).json(err.message)
    }

})
router.get('/CommentedReqs', AuthorizeRoles(['Representative']), async (req, res, next) => {
    try {
        const RepresentativeId = req.Representative.id
        const Requests = await getCommentedReq(RepresentativeId)
        res.status(200).json(Requests)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/:id', async (req, res, next) => {

    try {
        const id = req.params.id
        const request = await getReqByID(id)
        res.status(200).json(request)
    }
    catch (err) {
        res.status(401).json(err.message)
    }

})
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const update = req.body
    try {
        const updatedReq = await updateReq(id, update)
        res.status(200).json(updatedReq)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.delete('/DeleteReq', async (req, res, next) => {
    const id = req.body.id
    try {
        const deletedReq = await updateReq(id)
        res.status(200).json("Deleted")
    } catch (err) {
        res.status(401).json(err.message)
    }
})


module.exports = router