const GROCERY = require('../SCHEMA/GROCERY');
// const RESTAURANT = require("../SCHEMA/Restaurant")
const deleteFoodItem = async (req, res, next) => {
    try {
        const foodId = req.body.foodId
        const restaurantId = req.body.restaurantId
        await GROCERY.findByIdAndDelete(foodId)
        // await RESTAURANT.findByIdAndUpdate(restaurantId, { $pull: { foodItem: foodId } }, { new: true })
        next()
        // res.status(200).send({ success: true, msg: "food item successfully deleted" })
    } catch (e) { res.status(400).send({ success: false, error: e }) }

}
module.exports = deleteFoodItem