const { response } = require('express')
const PriceOfferRequest = require('../models/PriceOfferRequest')

async function AddPriceOfferReq(data) {

   const NewClient = new PriceOfferRequest(data)
   console.log(NewClient)
   //  const NewClient=await PriceOfferRequest.create(data)

   return NewClient.save()
}
async function GetAllSendRequests() {
   const requests = await PriceOfferRequest.find({ SendToAdmin: true }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function GetAllRequestsForSalesManger() {
   const requests = await PriceOfferRequest.find({ SendToAdmin: false, Complete: true }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function getReqByID(id) {
   const request = await PriceOfferRequest.findById(id).populate('ReprsentativeID').populate('Services.Service')
   return request
}
async function getRepresentativeRequests(id) {
   const requests = await PriceOfferRequest.find({ ReprsentativeID: id, Complete: false }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function getCommentedReq(id) {
   const requests = await PriceOfferRequest.find({ ReprsentativeID: id, Comment: { $ne: null }, Complete: false })
   return requests
}
async function getCompletedReqs() {
   const requests = await PriceOfferRequest.find({ SendToAdmin: true, Complete: true, InitialAmountOfMoney: { $ne: null } }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function updateReq(id, update) {
   const updatedReq = await PriceOfferRequest.findByIdAndUpdate(id, update, {
      new: true
   })
   return updatedReq
}
async function DeleteReq(id) {
   const deletedReq = await PriceOfferRequest.findOneAndDelete(id)
   return response.json("deleted")
}
async function GetAcceptedReq() {
   const requests = await PriceOfferRequest.find({ Accept: true }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function GetRejectedReq() {
   const requests = await PriceOfferRequest.find({ Accept: false, Pending: false }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function GetPendingReq() {
   const requests = await PriceOfferRequest.find({ Pending: true }).populate('ReprsentativeID').populate('Services.Service').sort({ createdAt: -1 })
   return requests
}
async function NewReqCount() {
   const count = await PriceOfferRequest.countDocuments({ Pending: true })
   return count
}

module.exports = {
   AddPriceOfferReq, GetAllRequestsForSalesManger, getRepresentativeRequests, updateReq, DeleteReq, GetAcceptedReq, GetRejectedReq, GetPendingReq, NewReqCount, GetAllSendRequests,
   getReqByID, getCommentedReq, getCompletedReqs
}