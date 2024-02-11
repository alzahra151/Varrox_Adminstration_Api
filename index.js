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
const CounteryRoute = require('./Routes/Country')
const DeviceRout = require("./Routes/Device");
const PriceOfferReq = require("./models/PriceOfferRequest");
const SpecialRequestRoute = require("./Routes/Special-Request")

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
  "_id": "654ce7c0be93ab4e2e9564e1",
  "ActivityName": "مطعم جديد جدا ",
  "ActivityNature": "مطاعم ",
  "activityLocation": "طهطا ",
  "Country": {
    "_id": "65839143dc4e37385f4c8bf3",
    "name": "مصر",
    "currency": "EGP",
    "__v": 0
  },
  "Governorate": "سوهاج ",
  "City": "طهطا ",
  "ReprsentativeID": {
    "_id": "64d4162d837d435ace272301",
    "FullName": "hossam Mohamed",
    "Email": "hossam@gmail.com",

    "Mobile": "012456879",
    "Password": "$2b$10$0Sno0GtlRYX3Od3NKo70merZVL.HjJnkEqPT1/yJI4W7YUInPL2Hq",
    "Role": "Representative",
    "createdAt": "2023-08-09T22:41:49.424Z",
    "updatedAt": "2023-08-09T22:41:49.424Z",
    "__v": 0
  },
  "Name": "احمد ",
  "Mobile": "01064144493",
  "Phone": "0934293858",
  "Email": "abdulrahmanahmed@varroxsystems.com",
  "PriceOffer": {
    "_id": "654ce7c0be93ab4e2e9564da",
    "Services": [
      {
        "Service": {
          "_id": "6547a23f2c74706a7f40d672",
          "Name": "VARROX SYSTEMS Semi Pro 1.0.5. ERP Solution",
          "Details": [
            "قسم المبيعات ونقاط البيع وإدارة العملاء ",
            "قسم المشتريات و إدارة الموردين ",
            "قسم المخازن و ادارة حركة الاصناف ",
            "قسم الحسابات ومتابعة حركة القيود ",
            "قسم المالية وإدارة النقد و البنوك ",
            "قسم مركز التقارير"
          ],
          "Devices": [
            {
              "_id": "6547a23f2c74706a7f40d675",
              "Title": " جهاز ادارة 1 ",
              "Price": 15000,
              "createdAt": "2023-11-05T14:10:07.421Z",
              "updatedAt": "2023-11-05T14:10:07.421Z",
              "__v": 0
            },
            {
              "_id": "6547a23f2c74706a7f40d676",
              "Title": "جهاز نقطة بيع ",
              "Price": 5000,
              "createdAt": "2023-11-05T14:10:07.421Z",
              "updatedAt": "2023-11-05T14:10:07.421Z",
              "__v": 0
            },
            {
              "_id": "6547a23f2c74706a7f40d677",
              "Title": "جهاز مجاني ",
              "Price": 0,
              "createdAt": "2023-11-05T14:10:07.421Z",
              "updatedAt": "2023-11-05T14:10:07.421Z",
              "__v": 0
            },
            {
              "_id": "655e9125407f90095597c511",
              "Title": "",
              "Price": null,
              "createdAt": "2023-11-22T23:39:17.315Z",
              "updatedAt": "2023-11-22T23:39:17.315Z",
              "__v": 0
            }
          ],
          "Maintenance": {
            "description": "تدريب ومتابعة صيانة ودعم فنى تحديث وتطوير تدفع سنويا للفروع المذكورة وف حالة زيادة الفروع يتم الاتفاق على مبلغ مقابل اشتراك سنوي يدفع بعد اول سنة\n",
            "price": 5000,
            "_id": "655e9125407f90095597c513"
          },
          "createdAt": "2023-11-05T14:10:07.215Z",
          "updatedAt": "2023-11-22T23:39:17.398Z",
          "__v": 0
        },
        "Devices": [
          {
            "Device": {
              "_id": "6547a23f2c74706a7f40d675",
              "Title": " جهاز ادارة 1 ",
              "Price": 15000,
              "createdAt": "2023-11-05T14:10:07.421Z",
              "updatedAt": "2023-11-05T14:10:07.421Z",
              "__v": 0
            },
            "Quantity": 1,
            "SubTotalPrice": 15000,
            "_id": "654ce7c0be93ab4e2e9564dc"
          }, {
            "Device": {
              "_id": "6547a23f2c74706a7f40d675",
              "Title": " جهاز ادارة 1 ",
              "Price": 15000,
              "createdAt": "2023-11-05T14:10:07.421Z",
              "updatedAt": "2023-11-05T14:10:07.421Z",
              "__v": 0
            },
            "Quantity": 1,
            "SubTotalPrice": 15000,
            "_id": "654ce7c0be93ab4e2e9564dc"
          }
        ],
        "serviceTotalPrice": 15000,
        "_id": "654ce7c0be93ab4e2e9564db",
        "Maintenance": {
          "description": ["test maintainace", "test maintainace", "تدفع سنويا للفروع المذكورة وف حالة زيادة الفروع يتم االتفاق على مبلغ مقابل"],
          "price": 2000,
          "_id": "6562dd3777ae0b15899813f7"
        }
      }
    ],
    "TotalPrice": 15000,
    "TotalCopies": 4,
    "createdAt": "2023-11-09T14:08:00.034Z",
    "updatedAt": "2023-11-26T05:52:55.051Z",
    "__v": 0
  },
  "SendToAdmin": true,
  "Complete": true,
  "Comment": null,
  "IsOpen": true,
  "ApproveToSalesManger": false,
  "ApproveToReprsentative": false,
  "Rejected": false,
  "BranchesNumber": 1,
  "PaymentPlan": {
    "_id": "64ffd269f72c1e1236fab793",
    "Plan": "100% payment before installation",
    "__v": 0
  },
  "Notes": "",
  "createdAt": "2023-11-09T14:08:00.894Z",
  "updatedAt": "2023-11-26T06:12:46.154Z",
  "Code": 36,
  "QrCode": 130,
  "__v": 0,
  "InitialAmountOfMoney": "5000"
}
// app.locals({

// }

// );
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express());
app.use(compression());
dotenv.config();
mongoose.connect(
  "mongodb+srv://alzahradesoky15:alzahradesoky15@cluster0.odxzqs1.mongodb.net/test"
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
app.use("/Country", CounteryRoute);
app.use('/PaymentPlan', PaymentPlanRoute)
app.use('/SpcialRequest', SpecialRequestRoute)
app.use("/PDF", PDFRoute);
app.get("/", (req, res) => {
  res.render("OfferMail", { data: data });
});
app.get('/wakeup', (req, res) => {
  res.json('wake up')
})
httpServer.listen(3000, () => {
  console.log("server listening at port 3000");
});
