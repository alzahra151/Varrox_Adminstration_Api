const { SignUp, Login } = require('../Controlers/Admin')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const AdminData = req.body
        const Admin = await SignUp(req.body)
        res.status(200).json(Admin)
    } catch (err) {
        res.status(401).json(err.message)
    }

})
router.post('/Login', async (req, res, next) => {
    try {
        const StoredAdmin = await Login(req.body)
        const token = StoredAdmin.result.AccessToken
        // res.cookie('token', token, { maxAge: 3600000, httpOnly: true, secure: true })
        res.status(200).json(StoredAdmin);
    } catch (err) {
        res.status(401).json(err.message)
    }
})

module.exports = router