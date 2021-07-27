const RESTAURANT = require("../SCHEMA/Restaurant")
const createRest = async (req, res, next) => {
    try {
        const data = req.body
        const dataSchema = await new RESTAURANT(data)
        const saveData = await dataSchema.save()
        console.log(saveData, "this is save data")
        req.saveData = await saveData
        next()

    } catch (e) {
        console.log(e, "error in CreateRest Middlware".red)
        res.status(400).send(e)
    }

}
module.exports = createRest