const express = require("express");
const { connect } = require("./Config/db");
const dotenv = require("dotenv").config();
const userRouter=require("./users/users.router")

const app = express();
app.use(express.json());

app.use("/users",userRouter)



const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connect;
    console.log("db connected to server=> " + process.env.MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
  console.log("Port start at => " + PORT);
});
