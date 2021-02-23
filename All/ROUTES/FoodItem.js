const express = require('express');
const { restart } = require('nodemon');
const deleteFoodItem = require('../MIDDLEWARE/DeleteFoodItem');
const uploadFoodItem = require('../MIDDLEWARE/UploadFoodItem');
const app = express.Router()
app.post("/upload", uploadFoodItem, (req, res) => {
    try {
        const restAfterUploadingItem = req.restAfterUploadingItem
        res.status(200).send({ success: true, restAfterUploadingItem })
    } catch (e) { console.log(e, "error while uploading food item") }
})
app.delete("/delete/", deleteFoodItem, async (req, res) => {
    try {

        res.status(200).send({ success: true, msg: "food item successfully deleted" })
    } catch (e) { console.log(e, "error while uploading food item") }
})

module.exports = app