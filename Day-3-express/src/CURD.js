// here we make CURD or CRUD application \\

//import Part

const express = require("express");
const fs = require("fs");

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

//create Server
const app = express();

//It allow us to read JSON body
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.write("Hello, GET / is working now")
//     res.end()
// })

//here we use 'send' method due to this we are not need to write res.end() view above comment
app.get("/", (req, res) => {
  res.send("Hello, GET / is working now");
});

// app.get("/products",(req,res)=>{
//     res.write("<h1>Hello, GET /product is working now</h1>")//we can also use html tag
//     res.end()
// })

//here we use 'send' method due to this we are not need to write res.end() view above comment
//getting the product
app.get("/products", (req, res) => {
  // res.send("<h1>Hello, GET /product is working now</h1>")//we can also use html tag

  res.send(products); //we can also use html tag
});

app.get("/products/:id", (req, res) => {
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

app.delete("/products/:id", (req, res) => {
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

app.post("/products", (req, res) => {
  console.log("I'm body see what are you add in me=>", req.body);

  //adding the data in products
  products.push({
    ...req.body,
    id: products.length + 1,
  });

  updateddb({ ...db, products });

  //sending the response
  res.send("data added correctly");
});

app.patch("/products/:id", (req, res) => {
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


//listen on port
app.listen(8080, (req, res) => {
  console.log("Server started at : http://localhost:8080");
});
