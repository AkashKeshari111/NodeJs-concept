
const express=require("express");
const usersRouter=require("./Features/users/users.router")
const productsRouter=require("./Features/products/products.router")
const cartRouter=require("./Features/cart/cart.router")
const dbConnect=require("./config/db")
const cors=require("cors")

const PORT=8080;

const app=express();

app.use(cors())
app.use(express.json())


app.use("/users",usersRouter)
app.use("/products",productsRouter)
app.use("/cart",cartRouter)




app.listen(PORT, async ()=>{
    await dbConnect()
    console.log(`My local server has been started at http://localhost:${PORT}`)
})