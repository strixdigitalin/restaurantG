
const ORDER = require("../SCHEMA/OrderItem")
const RESTAURANT = require("../SCHEMA/Restaurant")
const USER = require("../SCHEMA/User")
const OrderFood = async (req, res, next) => {
    try {
        const restaurant = req.body.restaurantId
        const user = req.body.user

        const order = await new ORDER(req.body)
        const saveOrder = await order.save()
        await RESTAURANT.findByIdAndUpdate(restaurant, { $push: { orders: saveOrder._id } }, { new: true })
        await USER.findByIdAndUpdate(user, { $push: { history: saveOrder._id } }, { new: true })
        req.order = saveOrder

        next()
    } catch (e) { res.status(400).send({ success: false, e }) }
}
module.exports = OrderFood