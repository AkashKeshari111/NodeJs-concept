const dotenv=require("dotenv").config()
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers?.token.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.user_id = decoded.user_id
        console.log(decoded)
        next()
    }
    catch(err){
        console.log(err)
       res.send("Please login again")
    }
}


module.exports={authentication}