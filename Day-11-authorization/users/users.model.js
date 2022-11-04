const  mongoose= require("mongoose");


const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    userId:{type:String},
    role:{type:String,default:"student"}
}
,
{
    timestamps:true,
    
})
const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel};