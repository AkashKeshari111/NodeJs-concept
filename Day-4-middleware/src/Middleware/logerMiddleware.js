
//It is also a custom middleware 
const logger=(req,res,next)=>{
    console.log("Before logger",req.url);

    if(req.url==="/attack"){
        res.status(404).send("under Attack")
    }
    else{
        //here next method helps to go other url if the url is not under attack
        next();
        console.log("After",req.url);
    }
    console.log("After logger",req.url);

}

module.exports= logger;