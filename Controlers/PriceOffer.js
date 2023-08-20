const PriceOffer = require('../models/PriceOffer')

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
    .populate({
      path: 'PriceOfferReq',
      populate: {
        path: 'ReprsentativeID',
        model: 'Representative'
      },

    }).populate('PriceOffer.Service')
  return offer
}

module.exports = { AddPriceOffer, getAllPriceOffers, deleteOffer, updateOffer, getOfferByID }