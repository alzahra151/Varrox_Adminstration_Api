const Device = require("../models/Device");
const Service = require("../models/Service");
const mongoose = require("mongoose");

async function AddDevice(data) {
  const device = await Device.create(data);
  const service = await Service.findByIdAndUpdate(data.ServiceID, {
    $push: { Devices: device._id },
  }); //Add device to his service
  return service;
}
async function GetAllDevices() {
  const devices = await Device.find();
  return devices;
}
async function GetDeviceByID(id) {
  const device = await Device.findById(id);
  return device;
}
async function UpdateDevice(id, data) {
  const device = await Device.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return device;
}
async function DeleteDevice(id) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const device = await Device.findById(id);
  if (device == null) {
    return "Incorrect Service Id";
  } else {
    try {
      await Device.deleteOne({ _id: id }, { session });
      // Remove child ID from parent's children array
      await Service.update(
        { _id: device.ServiceID },
        { $pull: { Devices: device._id } },
        { session }
      );
      // Commit the transaction
      await session.commitTransaction();
      return "Deleted Successfully";
    } catch (err) {
      await session.abortTransaction();
      console.error(
        "An error occurred while deleting relational devices and service:",
        error
      );
    } finally {
      // End the session
      session.endSession();
    }
  }
}
module.exports = {
  AddDevice,
  GetAllDevices,
  UpdateDevice,
  DeleteDevice,
  GetDeviceByID,
};
