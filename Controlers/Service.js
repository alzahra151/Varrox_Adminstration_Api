const Service = require('../models/Service')
const Device = require('../models/Device')
async function AddService(data) {
  console.log(data)
  const NewService = new Service({
    Name: data.Name,
    Details: data.Details,
    Maintenance: data.Maintenance
  })
  await NewService.save()
  const devices = await Device.create(data.Devices)
  const service = await Service.findByIdAndUpdate(NewService._id.valueOf(), {
    $push: { Devices: { $each: devices } }
  }, { new: true });

  return service
}
async function GetAllServices() {
  const services = await Service.find().populate('Devices')
  return services
}
async function UpdateService(id, data) {
  console.log(id)
  const devices = await Device.create(data.Devices)
  // const { Name, Details, Maintenance } = data
  const serviceData = {
    Name: data.Name,
    Details: data.Details,
    Maintenance: data.Maintenance
  }
  console.log(serviceData)
  const service = await Service.findByIdAndUpdate(id, { $set: serviceData, $push: { Devices: { $each: devices } } }, {
    new: true
  })
  // const service = await Service.findByIdAndUpdate(NewService._id.valueOf(), {
  //   $push: { Devices: { $each: devices } }
  // }, { new: true });
  return service
}
async function getServiceById(id) {
  const service = await Service.findById(id)
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
module.exports = { AddService, GetAllServices, UpdateService, DeleteService, getServiceById }