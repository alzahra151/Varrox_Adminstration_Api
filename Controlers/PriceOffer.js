const PriceOffer = require('../models/PriceOffer')
// const PriceOffer = require('../models/PriceOffer')

async function AddPriceOffer(data) {
  const newPriceOffer = await PriceOffer.create(data)
  return newPriceOffer
}
async function getAllPriceOffers() {
  const PriceOffers = await PriceOffer.find()
    .populate({
      path: 'PriceOfferReq',
      populate: {
        path: 'ReprsentativeID',
        model: 'Representative'
      },

    }).populate('PriceOffer.Service').sort({ createdAt: -1 })
  return PriceOffers
}
async function deleteOffer(id) {
  const Req = await PriceOffer.findById(id)
  if (Req == null) {
    return "Incorrect Req Id"
  }
  else {
    await PriceOffer.findByIdAndDelete(id)
    return "Deleted Successfully"
  }

}
async function updateOffer(id, updatedData) {
  const Req = await PriceOffer.findById(id)
  if (Req == null) {
    return "Request Id not Found or Incorrect"
  }
  else {
    return await PriceOffer.findByIdAndUpdate(id, { $set: updatedData }, { new: true })
  }

}
async function getOfferByID(id) {
  const offer = await PriceOffer.findById(id)
  return offer
}
async function getPriceOfferService(id, allmentenanceData) {
  const priceOffer = await PriceOffer.findById(id)
  // console.log(priceOffer)
  if (priceOffer) {
    allmentenanceData.forEach(async (maintenanceUpdate) => {
      const { serviceId, maintainanceData } = maintenanceUpdate;
      // console.log(serviceId, maintainanceData)
      const service = await priceOffer.Services.id(serviceId)
      if (service === null) {
        return { status: 401, result: "service not found" }

      } else {
        service.Maintenance = maintainanceData
        return { status: 200, result: priceOffer }
      }
    })
    await priceOffer.save();
    return { status: 200, result: priceOffer }
  } else {
    return { status: 401, result: "price offer not found" }
  }
}
module.exports = { AddPriceOffer, getAllPriceOffers, deleteOffer, updateOffer, getOfferByID, getPriceOfferService }