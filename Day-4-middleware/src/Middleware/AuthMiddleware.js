
//custum auth middleware it protect to go products page if user is not Authorized
const auth=(req,res,next)=>{
    console.log("Before Auth",req.url)

    //here I commented the if statement because we use auth middleware as local so now it has no need but at global we need this

    // if(req.url.startsWith("/products")){
        if(req.headers.token === "1234"){

            //next method helps to go products page if the user Authorized
            next()
        }
        else{
            res.status(401).send("Not Authorized")
        }
    // }
    // else{
    //     next()
    // }
    console.log("After Auth",req.url)
}

module.exports=auth