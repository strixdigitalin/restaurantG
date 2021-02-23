const express = require('express');
const app = express()
const cors = require('cors');
app.use(cors());

require("./All/MIDDLEWARE/MongoDbConn")
app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/restaurant", require("./All/ROUTES/Restaurant"))
app.use("/foodItem", require("./All/ROUTES/FoodItem"))
app.use("/admin", require("./All/ROUTES/Admin"))
app.use("/order", require("./All/ROUTES/OrderFood"))
app.use("/user", require("./All/ROUTES/User"))
app.listen(process.env.PORT || 5000, console.log("server is running at 5000".yellow))