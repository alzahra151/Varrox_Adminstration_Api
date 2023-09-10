const { response } = require('express')
const PriceOfferRequest = require('../models/PriceOfferRequest')

async function AddPriceOfferReq(data) {

   const NewClient = new PriceOfferRequest(data)
   console.log(NewClient)
   //  const NewClient=await PriceOfferRequest.create(data)

   return NewClient.save()
}
async function GetAllRequests() {
   const requests = await PriceOfferRequest.find().populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },

   }).sort({ createdAt: -1 })
   return requests
}
async function GetAllSendRequests() {
   const requests = await PriceOfferRequest.find({ SendToAdmin: true }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
   return requests
}
async function GetAllRequestsForSalesManger() {
   const requests = await PriceOfferRequest.find({ SendToAdmin: false, Complete: true }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
   return requests
}
async function getReqByID(id) {
   const request = await PriceOfferRequest.findById(id).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   })
   return request
}
async function getRepresentativeRequests(id) {
   const requests = await PriceOfferRequest.find({ ReprsentativeID: id, Complete: false }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
   return requests
}
async function getCommentedReq(id) {
   const requests = await PriceOfferRequest.find({ ReprsentativeID: id, Comment: { $ne: null }, Complete: false })
   return requests
}
async function getCompletedReqs() {
   const requests = await PriceOfferRequest.find({ SendToAdmin: true, Complete: true, InitialAmountOfMoney: { $ne: null } }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
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
async function GetReprsentativeApprovedReq(id) {
   const requests = await PriceOfferRequest.find({ ReprsentativeID: id, ApproveToReprsentative: true }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
   return requests
}
async function GetSalesMangersApprovedReq() {
   const requests = await PriceOfferRequest.find({ ApproveToSalesManger: true }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
   return requests
}
async function GetRejectedReq() {
   const requests = await PriceOfferRequest.find({ Rejected: true }).populate('ReprsentativeID').populate({
      path: 'Services',
      populate: {
         path: 'Devices',
         model: 'Device'
      },
   }).sort({ createdAt: -1 })
   return requests
}

async function NewReqCount() {
   const count = await PriceOfferRequest.countDocuments({ SendToAdmin: false, Complete: true })
   return count
}
async function NewPriceOfferCount() {
   const count = await PriceOfferRequest.countDocuments({ SendToAdmin: true, Complete: true })
   return count
}
module.exports = {
   AddPriceOfferReq, GetAllRequestsForSalesManger, getRepresentativeRequests, updateReq, DeleteReq, GetReprsentativeApprovedReq, GetRejectedReq, NewReqCount, GetAllSendRequests,
   getReqByID, getCommentedReq, getCompletedReqs, GetAllRequests, GetSalesMangersApprovedReq, NewPriceOfferCount
}