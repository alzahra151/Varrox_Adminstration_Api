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
const PaymentPlanRoute = require('./Routes/PaymentPlan')
const compression = require('compression')
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
data = {
  "_id": "650958cafc7af606145e5c33",
  "ActivityName": "test",
  "ActivityNature": "test2",
  "activityLocation": "test",
  "Country": "teest",
  "Governorate": "test test",
  "City": "tahta",
  "ReprsentativeID": {
    "_id": "64d41329deb63b50ae4adb22",
    "FullName": "Alzahra desoky",
    "Email": "alzahradesoky.15@gmail.com",
    "Country": "egypt",
    "Mobile": "01151105670",
    "Password": "$2b$10$NzHdJu9yL/SrZMGPjNIMMeX374AmPLYHyKi71KLfQ6kYQibdRJxWa",
    "Role": "SalesManager",
    "createdAt": "2023-08-09T22:28:57.234Z",
    "updatedAt": "2023-08-09T22:28:57.234Z",
    "__v": 0
  },
  "Name": "test",
  "Mobile": "2133331",
  "Phone": "2133331",
  "Email": "",
  "PriceOffer": {
    "_id": "650958c9fc7af606145e5c2a",
    "Services": [
      {
        "Service": {
          "_id": "64e26979a2df7c7d11855fd3",
          "Name": "service test",
          "Details": [
            "Resturant Screen – POS withSales Reportstest",
            "Stores Screen with Reports"
          ],
          "Devices": [
            {
              "_id": "64f26e2e790f588ca9d29cb9",
              "Title": "pos1 pc",
              "Price": 2000,
              "ServiceID": "64e26979a2df7c7d11855fd3",
              "createdAt": "2023-09-01T23:05:18.823Z",
              "updatedAt": "2023-09-01T23:05:18.823Z",
              "__v": 0
            },
            {
              "_id": "64f26f6f3c9726b6454f458e",
              "Title": "pos2 pc",
              "Price": 2000,
              "ServiceID": "64e26979a2df7c7d11855fd3",
              "createdAt": "2023-09-01T23:10:39.420Z",
              "updatedAt": "2023-09-01T23:10:39.420Z",
              "__v": 0
            }
          ],
          "createdAt": "2023-09-01T23:04:31.004Z",
          "updatedAt": "2023-09-02T00:43:23.574Z",
          "__v": 0
        },
        "Devices": [
          {
            "Device": {
              "_id": "64f26e2e790f588ca9d29cb9",
              "Title": "pos1 pc",
              "Price": 2000,
              "ServiceID": "64e26979a2df7c7d11855fd3",
              "createdAt": "2023-09-01T23:05:18.823Z",
              "updatedAt": "2023-09-01T23:05:18.823Z",
              "__v": 0
            },
            "Quantity": 2,
            "SubTotalPrice": 4000,
            "_id": "650958c9fc7af606145e5c2c"
          },
          {
            "Device": {
              "_id": "64f26f6f3c9726b6454f458e",
              "Title": "pos2 pc",
              "Price": 2000,
              "ServiceID": "64e26979a2df7c7d11855fd3",
              "createdAt": "2023-09-01T23:10:39.420Z",
              "updatedAt": "2023-09-01T23:10:39.420Z",
              "__v": 0
            },
            "Quantity": 1,
            "SubTotalPrice": 2000,
            "_id": "650958c9fc7af606145e5c2d"
          }
        ],
        "serviceTotalPrice": 6000,
        "_id": "650958c9fc7af606145e5c2b"
      },
      {
        "Service": null,
        "Devices": [
          {
            "Device": {
              "_id": "64f26f6f3c9726b6454f458e",
              "Title": "pos2 pc",
              "Price": 2000,
              "ServiceID": "64e26979a2df7c7d11855fd3",
              "createdAt": "2023-09-01T23:10:39.420Z",
              "updatedAt": "2023-09-01T23:10:39.420Z",
              "__v": 0
            },
            "Quantity": 2,
            "SubTotalPrice": 4000,
            "_id": "650958c9fc7af606145e5c2f"
          }
        ],
        "serviceTotalPrice": 4000,
        "_id": "650958c9fc7af606145e5c2e"
      }
    ],
    "TotalPrice": 10000,
    "createdAt": "2023-09-19T08:16:09.691Z",
    "updatedAt": "2023-09-19T08:16:09.691Z",
    "__v": 0
  },
  "SendToAdmin": true,
  "Complete": false,
  "Comment": "test comment",
  "IsOpen": true,
  "ApproveToSalesManger": true,
  "ApproveToReprsentative": true,
  "Rejected": false,
  "BranchesNumber": 2,
  "PaymentPlan": {
    "_id": "64ffd269f72c1e1236fab793",
    "Plan": "100% payment before installation",
    "__v": 0
  },
  "Notes": "test",
  "createdAt": "2023-09-19T08:16:10.122Z",
  "updatedAt": "2023-09-21T02:56:35.271Z",
  "Code": 16,
  "QrCode": 192,
  "__v": 0,
  "InitialAmountOfMoney": "5000"
}
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express());
app.use(compression());
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
const reqChangeStream = PriceOfferReq.watch();
io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
});
// Listen for changes on the req change stream
reqChangeStream.on("change", (change) => {
  io.emit("ReqChange", change);
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
app.use('/PaymentPlan', PaymentPlanRoute)
app.use("/PDF", PDFRoute);
app.get("/", (req, res) => {
  res.render("OfferMail", { data: data });
});

httpServer.listen(3000, () => {
  console.log("server listening at port 3000");
});
