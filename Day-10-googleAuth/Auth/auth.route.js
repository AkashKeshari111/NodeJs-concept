const {Router}=require("express");
const AuthModel = require("./auth.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const app=Router();
app.post("/signup",async (req,res)=>{
    let { email,password } = await req.body;
  try {
    let user = await AuthModel.findOne({ email });

    if (user) {
      res.status(401).send("User already exist");
    } else {
      bcrypt.hash(password, 5, function(err, hash) {
        // Store hash in your password DB.
        if(err){
          res.send("Something went wrong, please signup later")
      }
      let newUser =  AuthModel.insertMany({email:email,password:hash});
   res.send("Signup successfully")
    });
      
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
})


app.post("/login",async (req,res)=>{
    let { email, password } = await req.body;

    try {
      let user = await AuthModel.findOne({ email, password });
      if (!user) {
        res.status(401).send("Authentication failed!");
      } else {
        const token = jwt.sign({ name:"Akash" }, 'Akash111');
         res.send(token)
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
})

module.exports=app;