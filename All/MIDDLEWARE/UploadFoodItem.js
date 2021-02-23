const RESTAURANT = require("../SCHEMA/Restaurant");
const FOODITEM = require("../SCHEMA/FoodItem")
const color = require("colors")
const uploadFoodItem = async (req, res, next) => {
    try {
        const restaurantId = req.body.restaurantId
        const ItemData = req.body.ItemData
        const SchemaItemData = await new FOODITEM(ItemData)
        const saveItemData = await SchemaItemData.save()
        // console.log(saveItemData, "this is item data".green)
        console.log(`${saveItemData._id}`.cyan)
        const restAfterUpdating = await RESTAURANT.findByIdAndUpdate(restaurantId, { $push: { foodItem: saveItemData._id } }, { new: true })
        console.log(restAfterUpdating)
        req.restAfterUploadingItem = await restAfterUpdating
        next()
    } catch (e) {
        console.log(e, "error while uploading food item")
        res.status(400).send({ success: false, error: e })

    }
}
module.exports = uploadFoodItem