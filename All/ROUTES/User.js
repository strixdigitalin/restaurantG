const express = require("express")
const app = express.Router()
const BCRYPT = require("bcryptjs")
const USER = require("../SCHEMA/User")
const RegisterUser = require("../MIDDLEWARE/RegisterUser")
const LoginUser = require("../MIDDLEWARE/LoginUser")
const jsonWebToken = require("jsonwebtoken")
const key = "asfdjkadfkjkasdfkjasdkfjadkf/3kdk/#4jfkfoe%kf8Dkf5866dL5/fk-fkd,fdlfkd,f"
app.post("/register", RegisterUser, async (req, res) => {
    try {
        console.log("yes")
        const user = req.user
        res.status(200).send({ success: true, user: user, msg: "successfully registered" })
    } catch (e) { res.status(400).send({ success: false, error: e }) }
})

app.post("/key", async (req, res) => {
    try {
        const token = req.body.token
        const verify = await jsonWebToken.verify(token, key)
        const user = await USER.findById(verify._id)
        const checkToken = await user.tokens
        const findToken = checkToken.includes(token)
        // console.log(findToken)
        // console.log(checkToken)
        console.log(verify, "verify")
        if (findToken) {
            res.status(200).send({ success: true, user: user })
        }
        else {
            res.status(200).send({ success: false })
        }

    } catch (e) {
        console.log("error")
        res.status(200).send({ success: false, e })
    }
})



app.get("/all", async (req, res) => {
    try {
        const users = await USER.find()
        res.status(200).send({ success: true, users })
    } catch (e) { res.status(400).send({ success: false, error: e }) }
})
app.post("/login", LoginUser, async (req, res) => {
    try {
        const user = req.user
        const token = req.token
        // console.log(user,"<<")
        res.status(200).send({ success: true, user: user, token: token })
    } catch (e) { res.status(400).send({ success: false, error: e }) }
})
app.delete("/delete/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        await USER.findByIdAndDelete(userId)
        res.status(200).send({ success: true, msg: `User with id ${userId} is successfully deleted ` })
    } catch (e) { res.status(400).send({ success: false, error: e }) }
})
module.exports = app