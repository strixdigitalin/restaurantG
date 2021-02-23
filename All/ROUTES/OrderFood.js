const express = require('express');
const app = express.Router()
const ORDERS = require("../SCHEMA/OrderItem")
const RESTAURANT = require("../SCHEMA/Restaurant")
const OrderFood = require("../MIDDLEWARE/OrderFood")
app.post("/", OrderFood, (req, res) => {
    const order = req.order
    res.status(200).send({ success: true, order, foodItem: req.body.foodItem })
})

app.get("/all", async (req, res) => {
    try {
        const orders = await ORDERS.find()
        res.status(200).send({ success: true, orders })
    } catch (e) { res.status(400).send({ success: false, e }) }
})
app.get("/:restaurantId", async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId
        const restaurant = await RESTAURANT.findById(restaurantId).populate({ path: "orders", populate: { path: "foodItem.food user" } })
        // const orders = restaurant.orders.populate({ path: "foodItem" })
        res.status(200).send({ success: true, order: restaurant })

    } catch (e) { res.status(400).send({ success: false, e }) }
})
module.exports = app