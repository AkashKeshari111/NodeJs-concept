const dotenv=require("dotenv").config()
const jwt = require('jsonwebtoken');
const { UserModel } = require("../users/users.model");

const authorisation = (permittedrole) => {
    return async (req, res, next) => 
    {
    const email = req.body.email
   
    const user = await UserModel.findOne({email})
    console.log(user)
    const role = user.role;
    console.log(role)
        if(permittedrole.includes(role)){
            next()
        }
        else{
            res.send("Not authorised")
        }
    }
}

module.exports={authorisation}