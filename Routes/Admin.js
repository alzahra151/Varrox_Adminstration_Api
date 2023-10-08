const { SignUp, Login, changePassword, getUserById, updateAdmin } = require('../Controlers/Admin')
const cloudinary = require("../Controlers/cloud");
const uploader = require("../Controlers/multer");
const admin = require('../models/Admin')
const express = require('express')
const router = express.Router()
const { VerfiyToken } = require('../MiddleWare/Auth');
const { verify } = require('jsonwebtoken');

// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body)
//         const AdminData = req.body
//         const Admin = await SignUp(req.body)
//         res.status(200).json(Admin)
//     } catch (err) {
//         res.status(401).json(err.message)
//     }

// })
router.post('/', uploader.single("Image"), async (req, res) => {
    console.log(req.file);
    try {
        const image = await cloudinary.uploader.upload(req.file.path);
        const AdminData = req.body
        AdminData.Image = image.secure_url
        console.log(AdminData)
        const Admin = await SignUp(AdminData)
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
router.post('/change-password', VerfiyToken, async (request, res) => {
    const userId = request.Representative.id
    console.log(request.Representative.id)
    const { currentPassword, newPassword } = request.body
    try {
        const user = await changePassword(currentPassword, newPassword, userId)
        res.status(200).json(user)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.get('/get-user', VerfiyToken, async (req, res) => {
    const userId = req.Representative.id
    try {
        const user = await getUserById(userId)
        res.status(200).json(user)
    } catch (err) {
        res.status(401).json(err.message)
    }
})
router.patch('/update-user', uploader.single("Image"), VerfiyToken, async (req, res) => {
    const id = req.Representative.id
    console.log(id)
    console.log(req.file);
    try {
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            console.log(image, req.file)
            const AdminData = req.body
            AdminData.Image = image.secure_url
            const user = await updateAdmin(id, AdminData)
            res.status(200).json(user)
        } else {
            const user = await updateAdmin(id, req.body)
            res.status(200).json(user)

        }
        // const user = await updateAdmin(id, req.body)

    } catch (err) {
        console.log(err)
    }
})
module.exports = router