const express = require("express");
const router = express.Router();

const {
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
  getRepresentCommentedReq,
  getCompletedReqs,
  GetAllRequests,
  GetSalesMangersApprovedReq,
  getRepRejectedreqs,
  getAllCommentedReq,
  NewReqs,
  AllRequsetsCount,
  AllAcceptedRequsetsCount,
  AllRejectedRequsetsCount,
  AllCommentedRequsetsCount,
  getRepresentCompletedReqs,
  searchData
} = require("../Controlers/PriceOfferRequest");
const PriceOfferRequest = require("../models/PriceOfferRequest");

const { VerfiyToken, AuthorizeRoles } = require("../MiddleWare/Auth");
const { VerfiyAdminToken } = require("../MiddleWare/AdminAuth");
const { json } = require("body-parser");
router.get("/search", async (req, res, next) => {
  const query = req.query
  try {
    const data = await searchData(query)

    res.status(200).json(data);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/searchtest", async (req, res, next) => {
  // const query = req.query
  try {
    const r = await PriceOfferRequest.find({ Approve: true })
    res.json(r)
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.post("/AddRequest", VerfiyToken, async (req, res, next) => {
  const data = req.body;
  req.body.ReprsentativeID = req.Representative.id;
  const NewClient = await AddPriceOfferReq(data);
  console.log(NewClient);
  res.status(200).json(NewClient);
});


router.get("/SalesMangerRequests", VerfiyToken, async (req, res, next) => { ///done
  const query = req.query
  console.log(query)
  try {
    const requestes = await GetAllRequestsForSalesManger(query);
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.get("/completed-requests", VerfiyToken, async (req, res, next) => { ///done
  const query = req.query
  try {
    const requestes = await getCompletedReqs(query);
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/representative-complete-reqs", VerfiyToken, async (req, res, next) => {
  const RepresentativeId = req.Representative.id;
  const query = req.query
  try {
    const reqs = await getRepresentCompletedReqs(RepresentativeId, query)
    res.status(200).json(reqs);

  } catch (err) {
    res.status(401).json(err.message);
  }
})
router.get("/GetAllSendRequests", async (req, res, next) => {
  try {
    const requestes = await GetAllSendRequests();
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/reprsentative-approved-req", VerfiyToken, async (req, res, next) => { ///done
  const RepresentativeId = req.Representative.id;
  try {
    const requestes = await GetReprsentativeApprovedReq(RepresentativeId);
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
// router.get("/reprsentative-approved-req", VerfiyToken, async (req, res, next) => {
//   const RepresentativeId = req.Representative.id;
//   try {
//     const requestes = await GetReprsentativeApprovedReq(RepresentativeId);
//     res.status(200).json(requestes);
//   } catch (err) {
//     res.status(401).json(err.message);
//   }
// });
router.get("/reprsentative-rejected-req", VerfiyToken, async (req, res, next) => { /// done
  const RepresentativeId = req.Representative.id;
  try {
    const requestes = await getRepRejectedreqs(RepresentativeId);
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/commented-reqs", VerfiyToken, async (req, res, next) => { /// done
  try {
    const requestes = await getAllCommentedReq();
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/salesMangersApprovedReq", async (req, res, next) => { //done
  const query = req.query

  try {
    const requestes = await GetSalesMangersApprovedReq(query);
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/rejected-req", async (req, res, next) => { //done
  try {
    const requestes = await GetAllRejectedReq();
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/PendingReq", async (req, res, next) => {
  try {
    const requestes = await GetPendingReq();
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/NewReqCount", async (req, res) => { ///done
  try {
    const count = await NewReqCount();
    res.status(200).json(count);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/reqs-count", async (req, res) => { ///done
  try {
    const count = await AllRequsetsCount();
    const Accepted = await AllAcceptedRequsetsCount()
    const Rejected = await AllRejectedRequsetsCount()
    const commented = await AllCommentedRequsetsCount()
    res.status(200).json({ "All": count, "Accepted": Accepted, "rejected": Rejected, "commented": commented });
  } catch (err) {
    res.status(401).json(err.message);
  }
});
// router.get("/reqs-count", async (req, res) => {
//   try {
//     const Allreq = await AllRequsetsCount()
//     // const Accepted = await AllAcceptedRequsetsCount()
//     // const Rejected = await AllRejectedRequsetsCount()
//     // const commented = await AllCommentedRequsetsCount()
//     res.status(200).json(Allreq)
//   } catch (err) {
//     res.status(401).json(err)
//   }
// });
router.get("/new-reqs", async (req, res) => {
  try {
    const reqs = await NewReqs();
    res.status(200).json(reqs);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/RepresenetitaveRequests", [VerfiyToken, AuthorizeRoles(["Representative"])], ///done (archieve)

  async (req, res, next) => {
    const query = req.query

    try {
      const RepresentativeId = req.Representative.id;
      const requestes = await getRepresentativeRequests(RepresentativeId, query);
      res.status(200).json(requestes);
    } catch (err) {
      res.status(401).json(err.message);
    }
  }
);
router.get("/commented-represent-reqs", AuthorizeRoles(["Representative"]), //done
  async (req, res, next) => {
    try {
      const RepresentativeId = req.Representative.id;
      const Requests = await getRepresentCommentedReq(RepresentativeId);
      res.status(200).json(Requests);
    } catch (err) {
      res.status(401).json(err.message);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = await getReqByID(id);
    res.status(200).json(request);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const updatedReq = await updateReq(id, update);
    res.status(200).json(updatedReq);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.delete("/DeleteReq", async (req, res, next) => {
  const id = req.body.id;
  try {
    const deletedReq = await DeleteReq(id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/", async (req, res, next) => {
  const query = req.query
  try {
    const requestes = await GetAllRequests(query);
    res.status(200).json(requestes);
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.patch("/approve-req/:id", async (req, res, next) => {
  const id = req.params.id;
  const acceptedReq = await PriceOfferRequest.findById(id)
  console.log(acceptedReq)
  if (!acceptedReq.QrCode || !acceptedReq.Approve) {
    // await PriceOfferRequest.updateMany({}, { $unset: { ApproveToSalesManger: 1 } }, { multi: true })
    const maxCounterValue = await PriceOfferRequest.findOne().sort({ QrCode: -1 });
    const largestCounter = maxCounterValue.QrCode
    const updatedQrcode = largestCounter ? largestCounter + 1 : 20765;
    console.log(updatedQrcode)
    const update = {
      Approve: true,
      Rejected: false,// Set accepted to true
      QrCode: updatedQrcode       // Increment the counter field by 1
    };

    try {
      const updatedReq = await PriceOfferRequest.findByIdAndUpdate(
        id,
        update,
        {
          new: true,
        }
      );
      res.status(200).json(updatedReq)
    } catch (err) {
      res.status(401).json(err.message);
    }
  } else {
    console.log("req updated")
    res.status(200).json({ message: "req accepted before", req: acceptedReq })
  }
});
// router.delete('/all', async (req, res) => {
//   await PriceOfferRequest.deleteMany({})
//   res.json("deleted")
// })

module.exports = router;
