const { response } = require("express");
const PriceOfferRequest = require("../models/PriceOfferRequest");

async function AddPriceOfferReq(data) {
  const NewClient = new PriceOfferRequest(data);
  console.log(NewClient);
  return NewClient.save();
}
async function GetAllRequests() {
  const requests = await PriceOfferRequest.find()
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function GetAllSendRequests() {
  const requests = await PriceOfferRequest.find({ SendToAdmin: true })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function GetAllRequestsForSalesManger() { ////done
  const requests = await PriceOfferRequest.find({
    SendToAdmin: false,
    Complete: true,
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function getReqByID(id) { ///done
  const request = await PriceOfferRequest.findById(id)
    .populate("ReprsentativeID")
  return request;
}
async function getRepresentativeRequests(id) { ///done
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    Complete: false,
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function getRerpresentCommentedReq(id) {  ///// done
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    Comment: { $ne: null },
    Complete: false,
  });
  return requests;
}
async function getCompletedReqs() { //// done
  const requests = await PriceOfferRequest.find({
    SendToAdmin: true,
    Complete: true,
    InitialAmountOfMoney: { $ne: null },
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function updateReq(id, updatedData) { /// done
  const updatedReq = await PriceOfferRequest.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
    }
  );
  return updatedReq;
}
async function DeleteReq(id) { ///done
  const deletedReq = await PriceOfferRequest.findOneAndDelete(id);
  return response.json("deleted");
}
async function GetReprsentativeApprovedReq(id) { //done
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    ApproveToReprsentative: true,
    Complete: true,
    SendToAdmin: true,
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function GetSalesMangersApprovedReq() {  /// done
  const requests = await PriceOfferRequest.find({
    ApproveToSalesManger: true, Complete: true,
    SendToAdmin: true,
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function GetAllRejectedReq() {
  const requests = await PriceOfferRequest.find({
    Rejected: true,
    Complete: true,
    SendToAdmin: true,
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function getRepRejectedreqs(id) { /// done
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    Rejected: true,
  }).sort({ createdAt: -1 })
  return requests
}
async function getRepresentCommentedReq(id) { /// 
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    Comment: { $ne: null },
    Complete: false,
    SendToAdmin: true,
  }).sort({ createdAt: -1 })
  return requests
}
async function getAllCommentedReq() { ////done
  const requests = await PriceOfferRequest.find({
    Comment: { $ne: null },
    Complete: false,
    SendToAdmin: true,
  }).sort({ createdAt: -1 })
  return requests
}

async function NewReqCount() { /// done
  const count = await PriceOfferRequest.countDocuments({
    IsOpen: false,
    Complete: true,
    SendToAdmin: true,
  });
  return count;
}
async function NewReqs() { /// done
  const count = await PriceOfferRequest.find({
    IsOpen: false,
    Complete: true,
    SendToAdmin: true,
  });
  return count;
}

async function AllRequsetsCount() { /// done
  const count = await PriceOfferRequest.countDocuments({
    // IsOpen: false,
    Complete: true,
    SendToAdmin: true,
  });
  return count;
}
async function AllAcceptedRequsetsCount() {
  const count = await PriceOfferRequest.countDocuments({
    SendToAdmin: true,
    Complete: true,
    ApproveToSalesManger: true,
    ApproveToReprsentative: true
  });
  return count;
}
async function AllRejectedRequsetsCount() {
  const count = await PriceOfferRequest.countDocuments({
    SendToAdmin: true,
    Complete: true,
    Rejected: true,
  });
  return count;
}
async function AllCommentedRequsetsCount() {
  const count = await PriceOfferRequest.countDocuments({
    Comment: { $ne: null },
    Complete: false,

  });
  return count;
}
async function generateRandomNumber() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number

  // Generate a random number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Check if the generated number is unique
  // You can implement your own logic to ensure uniqueness,
  // such as checking against a database or an existing list of numbers.

  return randomNumber;
}
module.exports = {
  AddPriceOfferReq,
  GetAllRequestsForSalesManger,
  getRepresentativeRequests,
  updateReq,
  DeleteReq,
  GetReprsentativeApprovedReq,
  GetAllRejectedReq,
  NewReqCount,
  GetAllSendRequests,
  getReqByID,
  getRerpresentCommentedReq,
  getCompletedReqs,
  GetAllRequests,
  GetSalesMangersApprovedReq,
  getRepRejectedreqs,
  getRepresentCommentedReq,
  getAllCommentedReq,
  NewReqs,
  AllRequsetsCount,
  AllAcceptedRequsetsCount,
  AllRejectedRequsetsCount,
  AllCommentedRequsetsCount
};
