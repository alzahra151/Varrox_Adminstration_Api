const jwt = require('jsonwebtoken')
const Representative = require('../models/Representative')

function VerfiyToken(request, response, next) {
    const data = request.headers.token
    if (data === null) {
        return response.status(401).json('Sorry You Have To Send Your Acess Token')
    } else {
        const token = data.split(" ")[1]
        if (data) {
            jwt.verify(token, process.env.SECRET_KEY, function (error, Representative) {
                if (error) {
                    return response.status(401).json('Sorry ! Token Is InValied Or Expired')
                }
                else {
                    request.Representative = Representative
                    console.log(request.Representative)
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
                return response.status(403).json({ message: 'Forbidden ,you are not authorized' });
            }
            next();
        })
    }



}
module.exports = { VerfiyToken, AuthorizeRoles }