const mongoose=require('mongoose')

const ServiceSchema = mongoose.Schema({
    Name:{type:String,required:true},
    Details: [{type:String}],
    
},{ timestamps: true })

const Service = mongoose.model('Service', ServiceSchema)
module.exports=Service
