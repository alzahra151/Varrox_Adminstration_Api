const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const RepresentativeRoute = require("./Routes/Representative");
const PriceOfferReqRoute = require("./Routes/PriceOfferRequest");
const ServiceRoute = require("./Routes/Service");
const PriceOfferRoute = require("./Routes/PriceOffer");
const PDFRoute = require("./Routes/GeneratePDF");
const AdminRoute = require("./Routes/Admin");
const DeviceRout = require("./Routes/Device");
const PriceOfferReq = require("./models/PriceOfferRequest");
const PriceOffer = require("./models/PriceOffer");
const PaymentPlanRoute=require('./Routes/PaymentPlan')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express());
dotenv.config();
mongoose.connect(
  "mongodb+srv://alzahradesoky15:alzahradesoky15@cluster0.end0ljd.mongodb.net/VARROXSYSTEM"
);
mongoose.connection.on("open", function (ref) {
  console.log("Connected to mongo server.");

  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names);
  });
});
// Create the change streams
io.on("connection", (socket) => {
  console.log("a user connected");
  const reqChangeStream = PriceOfferReq.watch();
  const offerChangeStream = PriceOffer.watch();

  // Listen for changes on the req change stream
  reqChangeStream.on("change", (change) => {
    io.emit("ReqChange", change);
  });

  // Listen for changes on the offer change stream
  offerChangeStream.on("change", (change) => {
    io.emit("OfferChange", change);
  });
});

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use("/Representative", RepresentativeRoute);
app.use("/Admin", AdminRoute);
app.use("/PriceOfferReq", PriceOfferReqRoute);
app.use("/PriceOffer", PriceOfferRoute);
app.use("/Service", ServiceRoute);
app.use("/Device", DeviceRout);
app.use('/PaymentPlan' ,PaymentPlanRoute)
app.use("/PDF", PDFRoute);
// app.get("/", (req, res) => {
//   res.render("OfferMail", { data: data });
// });

httpServer.listen(3000, () => {
  console.log("server listening at port 3000");
});
