const mongoose = require("mongoose");
const dotenv= require('dotenv').config()

console.log(process.env.MONGODB_URI)

const connect= mongoose.connect(process.env.MONGODB_URI)

module.exports=connect;