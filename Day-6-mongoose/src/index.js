//import

const express = require("express");
const mongoose = require("mongoose");

//create

const app = express();


// from mongoose
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lname: String,
  age: Number,
  email: String,
  gender: String,
});


//model
const users = mongoose.model("user", userSchema);


//get method
app.get("/", async (req, res) => {
  const { page = 1, limit = 10, sortBy = "id", order = "asc" } = req.query;

  let u = await users
    .find({ age: { $gte: 20 } }, { _id: 0, id: 1, name: 1, age: 1, gender: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortBy]: order === "asc" ? 1 : -1 });
  res.send(u);
});

//listen

app.listen(8080, async (req, res) => {
  await mongoose.connect("mongodb://127.0.0.1:27017/b1");
  console.log("Server start at port no 8080");
});
