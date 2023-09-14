const jwt = require("jsonwebtoken");
// const Representative = require('../models/Admin')

function VerfiyAdminToken(request, response, next) {
  const data = request.headers.token;
  console.log(data);
  if (data === null) {
    return response.status(401).json("Sorry You Have To Send Your Acess Token");
  } else {
    // const token = data.split(" ")[1];
    console.log(data);
    if (data) {
      jwt.verify(data, process.env.SECRET_KEY, function (error, Admin) {
        if (error) {
          return response
            .status(401)
            .json("Sorry ! Token Is InValied Or Expired");
        } else {
          request.Admin = Admin;
          // console.log(request.Representative)
          next();
        }
      });
    } else {
      return response.status(401).json("Sorry ! You Are Not Authenticated");
    }
  }
}

module.exports = { VerfiyAdminToken };
