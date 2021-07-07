const express = require('express');
const { restart } = require('nodemon');
const deleteFoodItem = require('../MIDDLEWARE/DeleteFoodItem');
const uploadGrocery = require('../MIDDLEWARE/UploadFoodItem');
const GROCERY = require("../SCHEMA/GROCERY")
const app = express.Router()
app.post("/upload", uploadGrocery, (req, res) => {
    try {
        const uploadGrocery = req.Grocery
        console.log(uploadGrocery)
        res.status(200).send({ success: true, uploaded_Product: uploadGrocery })
    } catch (e) { console.log(e, "error while uploading food item") }
})
app.delete("/delete/", deleteFoodItem, async (req, res) => {
    try {

        res.status(200).send({ success: true, msg: "food item successfully deleted" })
    } catch (e) { console.log(e, "error while uploading food item") }
})

app.get("/all", async (req, res) => {
    try {
        const grocery = await GROCERY.find()
        res.status(200).send({ success: true, grocery })
    } catch (E) { console.log(E) }
})
app.get("/all/:type", async (req, res) => {
    try {
        const { type } = req.params
        const grocery = await GROCERY.find({ type })
        res.status(200).send({ success: true, grocery })
    } catch (E) { console.log(E) }
})

module.exports = app