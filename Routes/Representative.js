const {SignUp ,Login}=require('../Controlers/Representative')
const express=require('express')
const router=express.Router()

router.post('/' , async(req ,res )=>{
    try{
        console.log(req.body)
        const RepresentativeData=req.body
        const Representative=await SignUp(req.body)
        res.status(200).json(Representative)
    }catch(err){
        res.status(401).json(err.message)
    }
    
})
router.post('/Login' , async(req ,res ,next)=>{
    try{
       const StoredRepresentative= await Login(req.body)
       res.status(200).json(StoredRepresentative)
    }catch(err){
        res.status(401).json(err.message)
    }
})

module.exports=router