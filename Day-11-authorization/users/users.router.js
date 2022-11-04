const {Router}=require("express");
const { UserModel } = require("./users.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { authentication } = require("../Middleware/authentication");
const { authorisation } = require("../Middleware/authorization");

const app=Router();
app.post("/signup", async (req, res) => {
    const { email, password,role,user_id} = req.body

    const isUser = await UserModel.findOne({email})
    try{
        if(isUser){
            res.send({"msg":"User are already exists"});
        }
        else{
            bcrypt.hash(password,4, async function(err, hash) {
                
                if(err){
                    res.send({"msg":"Something went wrong , please try again"})
                }
                else{
                    const new_user=new UserModel({
                        email,
                        password:hash,
                        role,
                        user_id
                    })
        
                    await new_user.save()
                    res.send({"msg":"User Added"})
                }
            });
            
        }
    }
    catch(err){
        res.send(err)
    }

})


app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password;
    const user_id = user._id;
    console.log(user)
    console.log(user_id)
    try{
       await bcrypt.compare(password, hashed_password,async function(err, result) {
            if(err){
              res.send({"msg" : "Something went wrong, try again later"})
            }
            if(result){
              const token = jwt.sign({user_id}, process.env.SECRET_KEY);  
             await res.send({message : "Login successfully", token})
            }
            else{
              res.send({"msg" : "Login failed"})
            }
      });
    }
    catch(err){
        res.send(err)
    }
    
})



app.get("/",authentication, authorisation(["examiner"]),(req,res)=>{
    console.log("hello")
    res.send("hello")
})


module.exports=app



