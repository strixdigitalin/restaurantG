const USER = require("../SCHEMA/User")
const colors = require("colors")
const BCRYPT = require("bcryptjs")
const jsonWebToken = require("jsonwebtoken")

const key = "asfdjkadfkjkasdfkjasdkfjadkf/3kdk/#4jfkfoe%kf8Dkf5866dL5/fk-fkd,fdlfkd,f"
const createToken = async (_id) => {
    const token = await jsonWebToken.sign({ _id: _id }, key)
    console.log(token)
    return token
}

const LoginUser = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await USER.findOne({ email: email })
        console.log(email, password, "<<<<<")
        console.log(user, "<<<<<")
        if (user) {
            const match = await BCRYPT.compare(password, user.password)
            if (match) {
                req.user = user
                req.token = (await createToken(user._id)).toString()
                await USER.findByIdAndUpdate(user._id, { $push: { tokens: req.token } }, { new: true })
                next()
            }
            else {
                res.status(200).send({ success: false, msg: "invalid email/password" })
            }


        }
        else {
            res.status(200).send({ success: false, msg: "invalid email/password" })
        }
    } catch (e) {
        res.status(400).send({ success: false, e })
    }
}


module.exports = LoginUser