const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: { type: String, required: "Food Item name is required" },
    price: { half: { type: Number }, full: { type: Number } },
    available: { type: Boolean, default: true },
    image: { type: String, required: true }
})
const model = mongoose.model("FOODITEM", schema)
module.exports = model