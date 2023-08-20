const Representative = require('../models/Representative')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function SignUp(data) {
    const NewRepresentative = new Representative({
        FullName: data.FullName,
        Email: data.Email,
        Mobile: data.Mobile,
        Password: data.Password,
        Country: data.Country
    })
    console.log(NewRepresentative)

    return NewRepresentative.save()
}
async function Login(data) {
    const StoredRepresent = await Representative.findOne({ Email: data.Email })
    if (StoredRepresent === null) {
        return { status: 401, result: "Incorrect Email" }
    } else {
        const VerfiyPassword = await bcrypt.compareSync(data.Password, StoredRepresent.Password)
        if (VerfiyPassword == true) {
            const AccessToken = jwt.sign({
                id: StoredRepresent.id, FullName: StoredRepresent.FullName, Role: StoredRepresent.Role
            }, process.env.SECRET_KEY, {
                expiresIn: "10d"
            })
            return { status: 200, result: { StoredRepresent, AccessToken } }
        } else {
            return { status: 401, result: "Incorrect Password" }
        }
    }
}

module.exports = { SignUp, Login }