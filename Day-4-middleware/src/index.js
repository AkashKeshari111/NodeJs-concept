// here me make CURD or CRUD application \\

//import Part

const express = require("express");
const productsRouter = require("./routes/products.route")
const loggerMiddleware=require("./Middleware/logerMiddleware")
const authMiddleware=require("./Middleware/AuthMiddleware")


//create Server
const app = express();


//It is a middleware that allow us to read JSON body
app.use(express.json());

//custom middleware and its sequence is very important 
//it is a global middleware now I commented it (because we use it now as local) you can be reopen if needed 

// app.use(loggerMiddleware)
// app.use(authMiddleware)


app.use("/products",productsRouter)



app.get("/",loggerMiddleware,authMiddleware, (req, res) => {
  res.send("Hello, GET / is working now");
});



//listen on port
app.listen(8080, (req, res) => {
  console.log("Server started at : http://localhost:8080");
});
