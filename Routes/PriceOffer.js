const { AddPriceOffer, getAllPriceOffers, deleteOffer, updateOffer, getOfferByID } = require('../Controlers/PriceOffer')
const express = require('express')
const router = express.Router()
const { VerfiyToken } = require('../MiddleWare/Auth')

router.post('/AddPriceOffer', async (req, res, next) => {

    try {
        const data = req.body
        const newPriceOffer = await AddPriceOffer(data)
        res.status(200).json(newPriceOffer)
    }
    catch (err) {
        res.status(500).json(err)
    }

})
router.get('/GetAllPriceOffer', async (req, res, next) => {

    try {

        const PriceOffers = await getAllPriceOffers()
        console.log(PriceOffers)
        res.status(200).json(PriceOffers)
    }
    catch (err) {
        res.status(500).json(err)
    }

})
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const update = req.body
    try {
        const updatedReq = await updateOffer(id, update)
        res.status(200).json(updatedReq)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedReq = await deleteOffer(id)
        res.status(200).json("Deleted")
    } catch (err) {
        res.status(401).json(err.message)
    }
})

router.get('/getRepresentativeOffers', VerfiyToken, async (req, res) => {
    try {
        const RepresentativeId = req.Representative.id
        console.log(req.Representative.id)
        const offers = await getAllPriceOffers()
        const filteredOffers = offers.filter(offer => offer.PriceOfferReq.ReprsentativeID._id.valueOf() === RepresentativeId);
        console.log(filteredOffers);
        res.status(200).json(filteredOffers)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/:id', async (req, res) => {
    try {
        let offerID = req.params.id
        const offer = await getOfferByID(offerID)
        res.status(200).json(offer)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router