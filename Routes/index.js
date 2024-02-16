const express = require('express')
const router = express.Router()
const RepresentativeRoute = require("./Representative");
const PriceOfferReqRoute = require("./PriceOfferRequest");
const ServiceRoute = require("./Service");
const PriceOfferRoute = require("./PriceOffer");
const PDFRoute = require("./GeneratePDF");
const AdminRoute = require("./Admin");
const CounteryRoute = require('./Country')
const DeviceRout = require("./Device");
const SpecialRequestRoute = require("./Special-Request")
// const PriceOffer = require("./models/PriceOffer");
const PaymentPlanRoute = require('./PaymentPlan')

router.use("/api/Representative", RepresentativeRoute);
router.use("/api/Admin", AdminRoute);
router.use("/api/PriceOfferReq", PriceOfferReqRoute);
router.use("/api/PriceOffer", PriceOfferRoute);
router.use("/api/Service", ServiceRoute);
router.use("/api/Device", DeviceRout);
router.use("/api/Country", CounteryRoute);
router.use('/api/PaymentPlan', PaymentPlanRoute)
router.use('/api/SpcialRequest', SpecialRequestRoute)
router.use("/api/PDF", PDFRoute);

module.exports = router