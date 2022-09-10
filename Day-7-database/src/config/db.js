

const mongoose=require("mongoose")
const connect = ()=>{
    return mongoose.connect("mongodb+srv://ak:a@cluster0.jlm2il7.mongodb.net/?retryWrites=true&w=majority")
}


module.exports=connect