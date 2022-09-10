const mongoose=require("mongoose")


//create schema

const userSchema=new mongoose.Schema({
    name:{type:String , required:true},
    lname:{type:String},
    email:{type:String ,required:true ,unique:true},
    gender:{type:String},
    age:{type:Number,min:18,max:60,required:true}
})

//creat model
const usersModel=mongoose.model("user",userSchema)

module.exports=usersModel