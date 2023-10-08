const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function SignUp(data) {
    const NewUser = new Admin({
        FullName: data.FullName,
        Email: data.Email,
        Mobile: data.Mobile,
        Password: data.Password,
        Country: data.Country,
        Image: data.Image

    })
    console.log(NewUser)

    return NewUser.save()
}
async function Login(data) {
    const StoredRepresent = await Admin.findOne({ Email: data.Email })
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
async function changePassword(currentPass, newpass, userId) {
    const user = await Admin.findById(userId)
    if (user === null) {
        return { status: 401, result: "incorrect user" }
    }
    else {
        const verfiyPassword = await bcrypt.compareSync(currentPass, user.Password)
        if (verfiyPassword == true) {
            try {
                const salt = await bcrypt.genSaltSync(10);
                const hash = await bcrypt.hashSync(newpass, salt);
                console.log(hash)
                const user = await Admin.findByIdAndUpdate(userId, { Password: hash }, { new: true })
                return user
            }
            catch (err) {
                return { error: err }
            }
        } else {
            return { result: "incorrect password" }
        }
    }
}
async function getUserById(userId) {
    const user = await Admin.findById(userId)
    return user
}
async function updateAdmin(id, data) {
    const user = await Admin.findByIdAndUpdate(id, data, { new: true })
    return user

}

module.exports = { SignUp, Login, changePassword, getUserById, updateAdmin }