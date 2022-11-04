const express = require("express");
const usersModel = require("./users.model");

const app = express.Router();

app.post("/login", async (req, res) => {
  let { email, password } = await req.body;

  try {
    let user = await usersModel.findOne({ email, password });
    if (!user) {
      res.status(401).send("Authentication failed!");
    } else {
      res.send({ token: `${user.id}:${user.email}:${user.password}` });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/signup", async (req, res) => {
  let { email } = await req.body;
  try {
    let user = await usersModel.findOne({ email });

    if (user) {
      res.status(401).send("User already exist");
    } else {
      let newUser = await usersModel.create(req.body);
      res.send({ token: `${newUser.id}:${newUser.email}:${newUser.password}` });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;
