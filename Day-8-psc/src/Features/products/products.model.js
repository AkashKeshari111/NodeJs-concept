// #step 8:
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 1, max: 400 },
  quantity: { type: Number, required: true, min: 1, max: 10 },
});

// #step 10:
const productsModel = mongoose.model("product", productsSchema);

// #step 11:
module.exports = productsModel;
