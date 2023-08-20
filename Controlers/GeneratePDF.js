let ejs = require("ejs");

let pdf = require("html-pdf");
const fs = require('fs')
const path = require('path')
const offerFile = require('./NodeMailer')
data = {
    "_id": "64b5d2cc5844d8864ba30408",
    "PriceOfferReq": {
        "_id": "64ab789fb9d35ab56a3be316",
        "ActivityName": "hello",
        "ActivityNature": "test",
        "activityLocation": "cairo",
        "Country": "egypt",
        "Governorate": "sohag",
        "City": "sohag",
        "ReprsentativeID": {
            "_id": "64a47f0e4f97b185c793f49d",
            "FullName": "ali ahmed",
            "Email": "alzahradesoky@gmail.com",
            "Country": "cairo",
            "Mobile": "012354",
            "Password": "$2b$10$cfsv.WRlXHVbiovLR3sZz.F9QlNipMdAjlCp1B7yu5.EEZXoDTFAe",
            "createdAt": "2023-07-04T20:20:30.400Z",
            "updatedAt": "2023-07-04T20:20:30.400Z",
            "__v": 0
        },
        "Accept": true,
        "Pending": false,
        "Name": "ahmed",
        "Mobile": "01012354",
        "Phone": "21002584",
        "Email": "alzahradesoky.15@gmail.com",
        "Location": "cairo",
        "Services": [
            {
                "Devices": [
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                    "laptop"
                ],
                "Service": "64a8d231877d381096439859",
                "Notes": "any thing ",
                "_id": "64ab789fb9d35ab56a3be317"
            },
            {
                "Devices": [
                    "pc",
                    "laptop"
                ],
                "Service": "64a8d231877d381096439859",
                "Notes": "any thing ",
                "_id": "64ab789fb9d35ab56a3be318"
            }
        ],
        "createdAt": "2023-07-10T03:18:55.290Z",
        "updatedAt": "2023-07-13T09:50:12.992Z",
        "Code": 1,
        "__v": 0
    },
    "PriceOffer": [
        {
            "Service": {
                "Description": [],
                "_id": "64a8d231877d381096439859",
                "Name": "optics",
                "createdAt": "2023-07-08T03:04:17.731Z",
                "updatedAt": "2023-07-08T03:04:17.731Z",
                "__v": 0
            },
            "ServicePriceOffer": "1000",
            "_id": "64b5d2cc5844d8864ba30409"
        },
        {
            "Service": {
                "Description": [],
                "_id": "64a8d231877d381096439859",
                "Name": "optics",
                "createdAt": "2023-07-08T03:04:17.731Z",
                "updatedAt": "2023-07-08T03:04:17.731Z",
                "__v": 0
            },
            "ServicePriceOffer": "3000",
            "_id": "64b5d2cc5844d8864ba3040a"
        }
    ],
    "TotalPrice": "40000",
    "__v": 0
}

function GeneratePDF() {
    ejs.renderFile(("./views/OfferMail.ejs"), { data: data }, (err, data) => {
        if (err) {
            // res.send(err);
            console.log(err)
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toFile("PDF/off.pdf", function (err, data) {
                if (err) {
                    // res.send(err);
                    console.log('failed')
                } else {
                    //   res.send("File created successfully");
                    console.log("successfully")
                }
            });
        }
    });
}

module.exports = { GeneratePDF }