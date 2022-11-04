const express=require("express");
const { connect } = require("./config/db");
const UserModel = require("./user/user.model");
const userRouter=require("./Auth/auth.route")
const jwt = require('jsonwebtoken');
const AuthModel = require("./Auth/auth.model");
const passport=require("./config/google-oauth")


const app=express();
app.use(express.json());
app.use("/auth",userRouter)

app.get("/",async(req,res)=>{
    const newuser=await UserModel.find()
    res.send(newuser)
})


app.get("/dashboard",async (req,res)=>{
    const {token}=await req.headers;
    try{
      jwt.verify(token, 'Akash111', async function (err, decoded) {
            if (decoded) {
                const newuser = await AuthModel.find();
                res.send(newuser);
            }
            else if (err) {
                res.status(401).send("Please Login First");
            }
        });
    }
    catch(err){
        res.status(500).send(err.message)
    } 
})

app.post("/add",async(req,res)=>{
    
    const newuser=await UserModel.insertMany(req.body)
    res.send("Adding successful")
})


app.patch("/:id",async(req,res)=>{
    const {id}=req.params;
    const newuser=await UserModel.updateOne({_id:id},{$set:req.body})
    res.send(newuser)
})

app.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    const newuser=await UserModel.deleteOne({_id:id})
    res.send(newuser)
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });

const PORT=8080;

app.listen(PORT,async()=>{
    try{
        await connect;
        console.log("Mongo started")
    }
    catch(err){
        console.log(err)
    }
 
    console.log("Server start at port no=>"+PORT);
})