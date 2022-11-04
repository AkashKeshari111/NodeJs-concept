const express = require("express");
const cartModel=require("./cart.model")
const usersModel=require("../users/users.model")

const authMiddleware = async (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    let [id, email, password] = token.split(":");
    let user = await usersModel.findById(id);

    if (user.email === email && user.password === password) {
      req.userId = id;
      next();
    } else {
      res
        .status(401)
        .send("Cannot Perform this opertation, missing persmission");
    }
  } else {
    res.status(401).send("Cannot Perform this opertation, missing persmission");
  }
};

const app = express.Router();
app.use(authMiddleware);

app.get("/", async (req, res) => {
  try {
    let items = await cartModel.find({
      user: req.userId,
    }).populate(["user", "product"]);
    res.send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/", async (req, res) => {
  try {
    let cartItem = await cartModel.findOne({
      user: req.userId,
      product: req.body.product,
    }).populate("product");

    if (cartItem.product.quantity < req.body.quantity) {
      return res.send(
        `This item is not able in the required quanitity, max quanity allowed is ${cartItem.product.quantity}`
      );
    }

    if (cartItem) {
      let item = await cartModel.findByIdAndUpdate(
        cartItem.id,
        {
          quantity: req.body.quantity,
        },
        {
          new: true,
        }
      ).populate("product");
      return res.send(item);
    } else {
      let item = await cartModel.create({
        ...req.body,
        user: req.userId,
      });
      return res.send(item);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;