const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const ejs = require("ejs");
const pdf = require("html-pdf");
const fs = require('fs');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const RepresentativeRoute = require('./Routes/Representative')
const PriceOfferReqRoute = require('./Routes/PriceOfferRequest')
const ServiceRoute = require('./Routes/Service')
const PriceOfferRoute = require('./Routes/PriceOffer')
const PDFRoute = require('./Routes/GeneratePDF')
const AdminRoute = require('./Routes/Admin')
const PriceOfferReq = require('./models/PriceOfferRequest')
const PriceOffer = require('./models/PriceOffer')
const { GeneratePDF } = require('./Controlers/GeneratePDF')
const { SendEmail } = require('./Controlers/NodeMailer')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser')
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});
app.use(cors({
    origin: "*",
}))
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:52947');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     // Other CORS headers

//     if (req.method === 'OPTIONS') {
//         // Handle preflight requests
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         res.status(200).send();
//     } else {
//         next();
//     }
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express())
dotenv.config()
mongoose.connect('mongodb+srv://alzahradesoky15:alzahradesoky15@cluster0.end0ljd.mongodb.net/VARROXSYSTEM')
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');

    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names);
    });
})
// Create the change streams
io.on('connection', (socket) => {
    console.log('a user connected');
    const reqChangeStream = PriceOfferReq.watch();
    const offerChangeStream = PriceOffer.watch();

    // Listen for changes on the req change stream
    reqChangeStream.on('change', (change) => {
        io.emit('ReqChange', change);
    });

    // Listen for changes on the offer change stream
    offerChangeStream.on('change', (change) => {
        io.emit('OfferChange', change);
    });
})
data = {
    "_id": "64cd57dbfc4960c35ffc10d4",
    "PriceOfferReq": {
        "_id": "64ad34fa7a5c0a27f878e8ab",
        "ActivityName": "hello",
        "ActivityNature": "test",
        "activityLocation": "cairo",
        "Country": "egypt",
        "Governorate": "sohag",
        "City": "sohag",
        "ReprsentativeID": {
            "_id": "64a574110b942737efe0832f",
            "FullName": "Alzahra Mohamed desoky",
            "Email": "alzahradesoky@gmail.com",
            "Country": "sohag",
            "Mobile": "01151106875",
            "Password": "$2b$10$c9wtM7RGxApEMbpx1ApLpOaNls45Lv.UzZN4AlVuZTwGntKe07Poa",
            "createdAt": "2023-07-05T13:45:53.062Z",
            "updatedAt": "2023-07-05T13:45:53.062Z",
            "__v": 0
        },
        "Accept": true,
        "Pending": false,
        "Name": "ahmed",
        "Mobile": "01012354",
        "Phone": "21002584",
        "Email": "alzahradesoky@gmail.com",
        "Location": "cairo",
        "Services": [
            {
                "Devices": [
                    "pc",
                    "laptop"
                ],
                "Service": "64a8d231877d381096439859",
                "Notes": "any thing ",
                "_id": "64aed979d0272d5fcda33923"
            }
        ],
        "createdAt": "2023-07-11T10:54:50.488Z",
        "updatedAt": "2023-08-04T19:56:11.738Z",
        "Code": 2,
        "__v": 0
    },
    "PriceOffer": [
        {
            "Service": {
                "Details": ['test'],
                "_id": "64a8d231877d381096439859",
                "Name": "optics",
                "createdAt": "2023-07-08T03:04:17.731Z",
                "updatedAt": "2023-07-08T03:04:17.731Z",
                "__v": 0
            },
            "ServicePriceOffer": "2000",
            "DeviceOffer": [
                {
                    "Device": "pc",
                    "DevicePricrOffer": "1000",
                    "_id": "64cd57dbfc4960c35ffc10d6"
                },
                {
                    "Device": "laptop",
                    "DevicePricrOffer": "1000",
                    "_id": "64cd57dbfc4960c35ffc10d7"
                }
            ],
            "_id": "64cd57dbfc4960c35ffc10d5"
        },
        {
            "Service": {
                "Details": ['test1', 'test2'],
                "_id": "64a8d231877d381096439859",
                "Name": "optics",
                "createdAt": "2023-07-08T03:04:17.731Z",
                "updatedAt": "2023-07-08T03:04:17.731Z",
                "__v": 0
            },
            "ServicePriceOffer": "2000",
            "DeviceOffer": [
                {
                    "Device": "pc",
                    "DevicePricrOffer": "1000",
                    "_id": "64cd57dbfc4960c35ffc10d6"
                },
                {
                    "Device": "laptop",
                    "DevicePricrOffer": "1000",
                    "_id": "64cd57dbfc4960c35ffc10d7"
                }
            ],
            "_id": "64cd57dbfc4960c35ffc10d5"
        }
    ],
    "TotalPrice": "30000",
    "createdAt": "2023-08-04T19:56:11.264Z",
    "updatedAt": "2023-08-04T19:56:11.264Z",
    "__v": 0
},
    app.set('views', 'views');
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use('/Representative', RepresentativeRoute)
app.use('/Admin', AdminRoute)
app.use('/PriceOfferReq', PriceOfferReqRoute)
app.use('/PriceOffer', PriceOfferRoute)
app.use('/Service', ServiceRoute)
// app.post('/SendEmail', (req, res) => {
//     let OfferData = req.body
//     ejs.renderFile(("./views/OfferMail.ejs"), { data: OfferData }, (err, data) => {
//         console.log(data)
//         if (err) {
//             res.send(err);
//             // console.log(err)
//         } else {
//             let options = {
//                 "height": "11.25in",
//                 "width": "8.5in",
//                 border: {
//                     top: "0px",
//                     bottom: "0px",
//                     left: "0px",
//                     right: "0px"
//                 },
//                 margin: {
//                     top: "0px",
//                     bottom: "0px",
//                     left: "0px",
//                     right: "0px"
//                 },
//                 padding: {
//                     top: "0px",
//                     bottom: "0px",
//                     left: "0px",
//                     right: "0px"
//                 }
//             };
//             pdf.create(data, options).toFile("PDF/OfferEmail2.pdf", function (err, data) {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     SendEmail(OfferData)


//                     res.send("File created successfully");

//                 }
//             });
//         }
//     });

// },
// );
app.use('/PDF', PDFRoute)
app.get('/', (req, res) => {
    // GeneratePDF()
    res.render('OfferMail', { data: data });
    // const filePath = './PDF/OfferEmail.pdf';
    // console.log(filePath)
    // const fileName = 'OfferEmail.pdf';
    // fs.readFile(filePath, function (err, data) {
    //     if (err) return console.error(err);
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    //     res.setHeader('Content-Length', data.length);
    //     res.end(data);
    // });
});

app.post('/api/download', function (req, res) {
    const filePath = './PDF/VarroOffer.pdf';
    const fileName = 'varroxOffer.pdf';
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
        } else {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
            res.send(data);
        }
    });
});


httpServer.listen(3000, () => {
    console.log('server listening at port 3000')
})
