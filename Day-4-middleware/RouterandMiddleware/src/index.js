// here me make CURD or CRUD application \\

//import Part

const express = require("express");
const productsRouter = require("./routes/products.route")
const usersRouter = require("./routes/users.route")
const loggerMiddleware=require("./Middleware/logerMiddleware")
const authMiddleware=require("./Middleware/AuthMiddleware")
const cors=require("cors")
// const fs=require("fs")
// const compression = require('compression')


//create Server
const app = express();

//I use here cors middleware before all middleware it helps to connect frontend and backend server port simultaneously
app.use(cors({
  origin:["http://localhost:3000"]  //only this link access the data as frontend you can add more link
}))
//It is a middleware that allow us to read JSON body
app.use(express.json());

//custom middleware and its sequence is very important 
//it is a global middleware now I commented it (because we use it now as local) you can be reopen if needed 

// app.use(loggerMiddleware)
// app.use(authMiddleware)
// app.use(compression())

app.use("/products",productsRouter)

app.use("/users",usersRouter)

//here we use local middleware
app.get("/", (req, res) => {
  res.send("Hello, GET / is working now");
});


// below two code is related to compression

// app.get("/a", (req, res) => {
//   const a=fs.readFileSync(`${__dirname}/./a.txt`,{encoding:"utf-8"})
//   res.send(a);
// });


// app.get("/b",(req, res) => {
//   const b=fs.readFileSync(`${__dirname}/./b.txt`,{encoding:"utf-8"})
//   res.send(b);
// });


//listen on port
app.listen(8080, (req, res) => {
  console.log("Server started at : http://localhost:8080");
});





