const { AddDevice, GetAllDevices, UpdateDevice, DeleteDevice, GetDeviceByID } = require('../Controlers/Device')
const express = require('express')
const router = express.Router()
const country = require('../models/Country')

router.post('/', async (req, res, next) => {
    const data = req.body
    try {
        const newDevice = await AddDevice(data)
        res.status(200).json(newDevice)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/GetDevices', async (req, res, next) => {

    try {
        const Devices = await GetAllDevices()
        res.status(200).json(Devices)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const device = await GetDeviceByID(id)
        res.status(200).json(device)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const data = req.body
    try {
        const updatedDevice = await UpdateDevice(id, data)
        res.status(200).json(updatedDevice)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedRes = await DeleteDevice(id)
        res.status(200).json(deletedRes)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/country', async (req, res) => {
    const data = await country.create(req.body)
    res.json(data)
})
module.exports = router