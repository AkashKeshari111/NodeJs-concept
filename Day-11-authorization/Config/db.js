const mongoose = require("mongoose");
const dotenv=require("dotenv").config();

const connect = mongoose.connect(process.env.MONGODB_URI);

module.exports = { connect };
