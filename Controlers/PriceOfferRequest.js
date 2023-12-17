const { response } = require("express");
const PriceOfferRequest = require("../models/PriceOfferRequest");
const Representative = require('../models/Representative');
const PriceOffer = require("../models/PriceOffer");
async function AddPriceOfferReq(data) {
  const NewClient = new PriceOfferRequest(data);
  const num = await PriceOfferRequest.collection.getIndexes()
  console.log(num);

  return NewClient.save();
}
async function GetAllRequests(query) {
  const { limit = 5, page = 1 } = query
  const requests = await PriceOfferRequest.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  const count = await PriceOfferRequest.countDocuments();
  return {
    requests,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
  }
}
async function GetAllSendRequests() {
  const requests = await PriceOfferRequest.find({ SendToAdmin: true })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function GetAllRequestsForSalesManger(query) { ////done
  const { limit = 5, page = 0 } = query
  const requests = await PriceOfferRequest.find({
    SendToAdmin: false,
    Complete: true,
  })
    .limit(limit * 1)
    .skip((page) * limit)
    .sort({ createdAt: -1 });
  const count = await PriceOfferRequest.countDocuments({
    SendToAdmin: false,
    Complete: true,
  });
  return {
    requests,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
    count,
    limit
  }
}
async function getReqByID(id) { ///done
  const request = await PriceOfferRequest.findById(id)
    .populate("ReprsentativeID")
  return request;
}
async function getRepresentativeRequests(id, query) { ///done
  const { limit = 5, page = 0 } = query
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    Complete: false,
  })
    .limit(limit * 1)
    .skip((page) * limit)
    .sort({ createdAt: -1 });
  const count = await PriceOfferRequest.countDocuments({
    ReprsentativeID: id,
    Complete: false,
  });
  return {
    requests,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
    count,
    limit
  }
}
async function getRerpresentCommentedReq(id) {  ///// done
  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    Comment: { $ne: null },
    Complete: false,
  });
  return requests;
}
async function getCompletedReqs(query) { //// done
  const { limit = 5, page = 0 } = query

  const requests = await PriceOfferRequest.find({
    SendToAdmin: true,
    Complete: true,
    InitialAmountOfMoney: { $ne: null },
  })
    .limit(limit * 1)
    .skip((page) * limit)
    .sort({ createdAt: -1 });
  const count = await PriceOfferRequest.countDocuments({
    SendToAdmin: true,
    Complete: true,
    InitialAmountOfMoney: { $ne: null },
  });
  return {
    requests,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
    count,
    limit
  }

}
async function getRepresentCompletedReqs(id, query) { //// done
  const { limit = 5, page = 0 } = query

  const requests = await PriceOfferRequest.find({
    ReprsentativeID: id,
    // SendToAdmin: true,
    Complete: true,
    // InitialAmountOfMoney: { $ne: null },
  })
    .limit(limit * 1)
    .skip((page) * limit)
    .sort({ createdAt: -1 });
  const count = await PriceOfferRequest.countDocuments({
    ReprsentativeID: id,
    Complete: true,
  });
  return {
    requests,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
    count,
    limit
  }
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
    Approve: true,
    Complete: true,
    SendToAdmin: true,
  })
    .populate("ReprsentativeID")
    .sort({ createdAt: -1 });
  return requests;
}
async function GetSalesMangersApprovedReq(query) {  /// done
  const { limit = 5, page = 0 } = query
  const requests = await PriceOfferRequest.find({
    Approve: true,
    Complete: true,
    SendToAdmin: true,
  })
    .limit(limit * 1)
    .skip((page) * limit)
    .sort({ createdAt: -1 });
  const count = await PriceOfferRequest.countDocuments({
    Approve: true,
    Complete: true,
    SendToAdmin: true,
  });
  return {
    requests,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
    count,
    limit: +limit
  }
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
    Approve: true,
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
async function acceptReq() {

}
async function searchData(query) {

  const { column, q } = query;
  const searchQuery = q ? { [column]: q } : {};
  if (column == 'Reprsentative') {
    // const represent = await Representative.find({ FullName: q })
    const data = await PriceOfferRequest.find({
      ReprsentativeID: q,
      SendToAdmin: false,
      Complete: true
    })
    // .limit(limit * 1)
    // .skip((page) * limit)
    // .sort({ createdAt: -1 });
    return { requests: data }

  } else if (column == 'createdAt') {
    const startDate = new Date(q);
    const endDate = new Date(q);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    console.log(startDate, endDate)
    const data = await PriceOfferRequest.find({
      createdAt: { $gte: startDate, $lt: endDate },
      SendToAdmin: false,
      Complete: true
    })
    return { requests: data }
  } else {
    console.log(searchQuery)
    const data = await PriceOfferRequest.find(searchQuery);
    return { requests: data }
  }
  // Create a Mongoose query based on the search term and selected column
}
module.exports = {
  searchData,
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
  AllCommentedRequsetsCount,
  getRepresentCompletedReqs
};
