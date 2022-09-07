
const express=require("express")
const fs = require("fs");

const { body, validationResult } = require('express-validator');
//here we call Router method
const app=express.Router();


//show the directory path
// console.log(__dirname);

// //Reading the file
// const file = fs.readFileSync(`${__dirname}/./db.json`, { encoding: "utf-8" });

// //making the file array
// const db = JSON.parse(file);

// let users = db.users;


app.post("/",

body("email").isEmail(), 
body("password").isAlphanumeric().isLength({min:5,max:10}),

(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(404).json({errors:errors.array()})
    }

    res.send("user data created")
})


module.exports=app