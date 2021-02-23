const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name: { type: String, required: "name is required" },
    location: { type: String, required: "location is required" },
    foodItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "FOODITEM" }],
    owner: {
        name: { type: String, required: "owner name is required" },
    },
    image: { type: String, required: "image is required" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "ORDER" }],
    moNum: { type: Number, required: "mobile number is required" },
    registerdOn: { type: Number, default: (new Date()).getTime() },
    confirmed: { type: Boolean, default: false }
})
const model = mongoose.model("restaurant", schema)
module.exports = model