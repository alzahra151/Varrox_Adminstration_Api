const Service = require('../models/Service')

async function AddService(data) {
  const service = await Service.create(data)
  return service
}
async function GetAllServices() {
  const services = await Service.find().populate('Devices')
  return services
}
async function UpdateService(id, data) {
  const service = await Service.findOneAndUpdate({ _id: id }, data, {
    new: true
  })
  return service
}
async function DeleteService(id) {
  const service = await Service.findById(id)
  if (service == null) {
    return "Incorrect Service Id"
  }
  else {
    await Service.deleteOne({ _id: id })
    return "Deleted Successfully"
  }
}
module.exports = { AddService, GetAllServices, UpdateService, DeleteService }