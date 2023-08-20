const {AddService ,GetAllServices}=require('../Controlers/Service')
const express=require('express')
const router = express.Router()

router.post('/' ,async(req ,res ,next) => {
    const data = req.body
    try{
        const newService =await AddService(data)
        res.status(200).json(newService)
    }catch(error){
        res.status(401).json(error.message)
    }  
})
router.get('/GetServices' ,async(req ,res ,next) => {

    try{
        const Services =await GetAllServices()
        res.status(200).json(Services)
    }catch(error){
        res.status(401).json(error.message)
    }  
})
module.exports=router