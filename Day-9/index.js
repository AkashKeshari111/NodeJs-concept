const express=require("express");
const jwt = require('jsonwebtoken');
const  connect  = require("./config/db");
const UserRouter = require("./users/User.route");
const dotenv= require('dotenv').config()


//...........................................................................
const app=express();
app.use(express.json())
app.use("/users",UserRouter)


//...........................................................................
app.get("/",(req,res)=>{
    res.send("Home Page")
})


//...........................................................................
app.get("/dashboard",(req,res)=>{
    const {token}=req.headers;
    try{
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
              await  res.send("Important data here")
            }
            else if(err){
                res.status(401).send("Please Login First")
            }
          });
    }
    catch(err){
        res.status(500).send(err.message)
    } 
})


//...........................................................................

const PORT=process.env.PORT || 8080
app.listen(PORT,async()=>{
    try{
        await connect;
        console.log("Connected to the server")
    }
    catch(err){
        console.log(err)
    }
    console.log("Server start at port no =>"+PORT)
})
