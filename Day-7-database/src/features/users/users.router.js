//import
const express=require("express");
const usersModel = require("./users.schema");



const app=express.Router();


//get method
app.get("/",async (req,res)=>{
   let u= await usersModel.find()
   res.send(u) 
})


//post method
app.post("/",async (req,res)=>{
    let u=req.body
    try{
        let newUser= await usersModel.create(u)
        res.send(newUser) 
    }
    catch(err){
     res.status(401).send(err.message)
    }

 })
//export 

module.exports=app;


