const Service=require('../models/Service')

async function AddService(data){
  const service=await Service.create(data)
  return service
}
async function GetAllServices(){
  const services= await Service.find()
  return services
}
module.exports={AddService ,GetAllServices}