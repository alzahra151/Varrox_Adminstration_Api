const { AddService, GetAllServices, UpdateService, DeleteService, getServiceById } = require('../Controlers/Service')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res, next) => {
    const data = req.body
    try {
        const newService = await AddService(data)
        res.status(200).json(newService)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/GetServices', async (req, res, next) => {

    try {
        const Services = await GetAllServices()
        res.status(200).json(Services)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/get-service/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const Service = await getServiceById(id)
        res.status(200).json(Service)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const data = req.body
    try {
        const updatedService = await UpdateService(id, data)
        res.status(200).json(updatedService)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedRes = await DeleteService(id)
        res.status(200).json(deletedRes)
    } catch (error) {
        res.status(401).json(error.message)
    }
})
module.exports = router