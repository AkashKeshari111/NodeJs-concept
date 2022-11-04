const express = require("express");
const productsModel = require("./products.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let products = await productsModel.find().limit(10);
  res.send(products);
});

module.exports = app;



