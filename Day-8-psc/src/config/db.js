const mongoose = require("mongoose");

// #step 8:
const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/psc")
}



module.exports=connect;