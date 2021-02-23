const mongoose = require('mongoose');
const colors = require('colors');
mongoose.connect("mongodb+srv://akshay:Akshey!99@cluster0.gmqrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((result) => {
    console.log("database connected >>>>>>>>>>>".cyan)
}).catch((err) => {
    console.log(err, "this is error while connecting database ")
});