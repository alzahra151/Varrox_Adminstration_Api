const { getCountries, addCountry } = require('../Controlers/Country')
const express = require('express')
const router = express.Router()

router.get('/countries', async (req, res) => {
    try {
        const Countries = await getCountries()
        res.status(200).json(Countries)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/add-country', async (req, res) => {
    try {
        const country = await addCountry(req.body)
        res.status(200).json(country)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
module.exports = router
