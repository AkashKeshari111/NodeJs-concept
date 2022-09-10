// import

const express=require("express")
const dbConnect=require("./config/db")
const usersRouter=require("./features/users/users.router")
//craete server

const app=express()
app.use(express.json())


app.use("/users",usersRouter)






//listen to server

app.listen(8080,async ()=>{
    await dbConnect()
    console.log("server started at http://localhost:8080")
})