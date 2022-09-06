
// This is a ProductsRouter


const express=require("express")
const fs = require("fs");
const authMiddleware=require("../Middleware/AuthMiddleware")
//here we call Router method
const app=express.Router();
app.use(authMiddleware)

//show the directory path
console.log(__dirname);

//Reading the file
const file = fs.readFileSync(`${__dirname}/./db.json`, { encoding: "utf-8" });

//making the file array
const db = JSON.parse(file);

//Updating the file or database
const updateddb = (updatedProducts) => {
  fs.writeFileSync(`${__dirname}/./db.json`, JSON.stringify(updatedProducts), {
    encoding: "utf-8",
  });
};

let products = db.products;


//in below code we removed the '/products' at every place because it is used as router so no need to write

//getting the product
app.get("/", (req, res) => {
  res.send(products);
});

app.get("/:id", (req, res) => {
  //here we use params method
  let { id } = req.params;
  console.log("I'm params-" + id, "=>", req.params);

  //here finding the particular product by id
  let product = products.find((el) => el.id === Number(id));

  //condition if product is not present with the given id
  if (!product) {
    res.status(404).send(`I'm not here with this id: ${id}`);
  }

  //sending the response of particular product data

  res.send(product);
});

//deleting the product

app.delete("/:id", (req, res) => {
  //here we use params method
  let { id } = req.params;
  console.log("I'm params now I am going to delete=>", req.params);

  //getting the index for matching with id for deleting
  let index = products.findIndex((el) => el.id === Number(id));

  //splice for deleting that part
  products.splice(index, 1);

  updateddb({ ...db, products });

  //after deleting sending response
  res.send(products);
});

app.post("/", (req, res) => {
  console.log("I'm body see what are you add in me=>", req.body);

  //adding the data in products
  products.push({
    ...req.body,
    id: products.length + 1,
  });

  updateddb({ ...db, products });

  //sending the response
  res.send(db);
});

app.patch("/:id", (req, res) => {
  let { id } = req.params;

  let updatedProducts = products.map((el) => {
    if (el.id === Number(id)) {
      return {
        ...el,
        ...req.body,
      };
    } else {
      return el;
    }
  });

  updateddb({ ...db, products });
  res.send(updatedProducts);
});


//here we export the Router which is inside variable app 
module.exports= app;  // here we are not using object so no need to same the name (app) where we import it here we can import it on index.js file at the name of ProductsRouter. 