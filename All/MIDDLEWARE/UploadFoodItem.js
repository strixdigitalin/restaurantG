const RESTAURANT = require("../SCHEMA/Restaurant");
const GROCERY = require("../SCHEMA/GROCERY")
const color = require("colors")
const uploadGrocery = async (req, res, next) => {
    try {

        const Grocery = await new GROCERY(req.body)
        const saveIt = await Grocery.save()
        req.Grocery = saveIt
        next()
    } catch (e) {
        console.log(e, "error while uploading food item")
        res.status(400).send({ success: false, error: e })

    }
}
module.exports = uploadGrocery