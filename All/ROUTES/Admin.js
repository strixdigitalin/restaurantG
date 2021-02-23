const express = require("express")
const RESTAURANT = require("../SCHEMA/Restaurant")
const app = express.Router()
app.patch("/restaurant/confirmation", async (req, res) => {
    try {
        const restaurantId = req.body.restaurantId
        const value = req.body.value
        const restaurant = await RESTAURANT.findByIdAndUpdate(restaurantId, { confirmed: value }, { new: true })
        res.status(200).send({ success: true, restaurant })
    } catch (e) { res.status(400).send({ success: false, msg: "error while restaurant confirmation" }) }
})
module.exports = app