const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: { type: String, required: "Food Item name is required" },
    price: [
        {
            UNIT: { type: String },
            AMT: { type: Number }
        }
    ],// quantity and price kg ltr etc
    available: { type: Boolean, default: true },
    caption: { type: String },
    image: { type: String, required: true },
    type: { type: String, default: "GROCERY" }

},
    {
        timestamps: true,
    }
)
const model = mongoose.model("GROCERY", schema)
module.exports = model