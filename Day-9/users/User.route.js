const {Router}=require("express");
const userModel = require("./User.model");
const jwt = require('jsonwebtoken');


//...........................................................................
const UserRouter=Router();

//...........................................................................
UserRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    
    const new_user=new userModel({email,password});

    await new_user.save()
  
    res.send("Signup successful")
})


//...........................................................................
UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    const result=await userModel.findOne({email,password});
    let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    if(result){
        res.send({"msg":"Login successful","token":token})
        
    }
    else{
        res.send("Login failed")
    }
})


//...........................................................................
module.exports=UserRouter;
