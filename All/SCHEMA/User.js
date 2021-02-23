const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: { type: String, required: "name is required" },
    address: { type: String },
    email: { type: String, required: true, unique: "email is already registerd" },
    password: { type: String, required: true },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "ORDER" }],
    tokens: [{ type: String }]
})
const model = mongoose.model("USER", schema)
module.exports = model