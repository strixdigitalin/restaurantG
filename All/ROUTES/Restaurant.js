const { Router } = require('express');
const express = require('express');
const RESTAURANT = require("../SCHEMA/Restaurant")
const createRest = require('../MIDDLEWARE/CreateRest');
require("colors")
const app = express.Router()


app.post("/", createRest, (req, res) => {
    try {
        const saveData = req.saveData
        res.status(200).send({ success: true, saveData })
    } catch (e) { console.log(e, "error while registering restaurants".red) }
})

app.delete("/", async (req, res) => {
    try {
        const restaurant = await RESTAURANT.findByIdAndDelete(req.body.restaurantId)
        res.status(200).send({ success: true, deletedRestaurant: restaurant })

    } catch (e) {
        console.log(e, "error while deleting restaurant".red)
        res.status(400).send({ success: false, e })
    }
})
app.get("/one/foodItem/:id", async (req, res) => {
    try {
        const restaurant = await RESTAURANT.findById(req.params.id).populate({ path: "foodItem" })
        res.status(200).send({ success: true, foodItem: restaurant.foodItem })
    } catch (e) {
        console.log(`${e}`.red)
        res.status(400).send({ success: false, error: e })
    }
})
app.get("/one/:restaurantId", async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId
        const restaurant = await RESTAURANT.findById(restaurantId)
        res.status(200).send({ success: true, restaurant })
    } catch (e) { res.status(400).send({ success: false, e }) }
})


app.get("/all", async (req, res) => {
    try {
        const restaurant = await RESTAURANT.find().populate({ path: "foodItem" })
        res.status(200).send({ success: true, restaurant })
    } catch (e) { res.status(400).send({ success: false, e }) }
})

app.get("/confirmed", async (req, res) => {
    try {
        const restaurants = await RESTAURANT.find({ confirmed: true }).populate({ path: "foodItem" })
        res.status(200).send({ success: true, restaurants })
    } catch (e) { res.status(400).send({ success: false, e, msg: "error while getting confirmed shops" }) }
})
app.get("/notconfirmed", async (req, res) => {
    try {
        const restaurants = await RESTAURANT.find({ confirmed: false })
        res.status(200).send({ success: true, restaurants })
    } catch (e) { res.status(400).send({ success: false, error: e, msg: "error while getting confirmed shops" }) }
})

module.exports = app

