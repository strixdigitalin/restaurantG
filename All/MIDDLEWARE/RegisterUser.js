const BCRYPT = require("bcryptjs")
const USER = require("../SCHEMA/User")
const RegisterUser = async (req, res, next) => {
    try {
        const password = req.body.password
        const salt = await BCRYPT.genSaltSync(10);
        const hash = await BCRYPT.hashSync(password, salt);
        const data = { ...req.body, password: hash }

        const user = await new USER(data)

        const saveUser = await user.save()
        req.user = await saveUser
        next()

    } catch (e) {
        if (e.keyValue.email) {

            res.status(200).send({ success: false, msg: "User with this  email address is allready registered" })
        }

        else {

            res.status(400).send({ success: false, error: e })
        }

    }
}
module.exports = RegisterUser