const jwt = require('jsonwebtoken')
// const Representative = require('../models/Admin')

function VerfiyAdminToken(request, response, next) {
    const data = request.headers.token
    console.log(data)
    if (data === null) {
        return response.status(401).json('Sorry You Have To Send Your Acess Token')
    } else {
        const token = data.split(" ")[1]
        console.log(data)
        if (data) {
            jwt.verify(data, process.env.SECRET_KEY, function (error, Representative) {
                if (error) {
                    return response.status(401).json('Sorry ! Token Is InValied Or Expired')
                }
                else {
                    request.Representative = Representative
                    // console.log(request.Representative)
                    next()
                }
            })

        } else {
            return response.status(401).json('Sorry ! You Are Not Authenticated')
        }
    }
}

function AuthorizeRoles(allowedRoles) {
    return (request, response, next) => {
        VerfiyToken(request, response, async function () {
            const userRole = request.Representative.Role
            if (!allowedRoles.includes(userRole)) {
                return response.status(403).json({ message: 'Forbidden' });
            }
            next();
        })
    }



}
module.exports = { VerfiyAdminToken, AuthorizeRoles }