//importing part
const http = require("http");
const fs = require("fs");


//reading Part
const home=fs.readFileSync("./home.html",{encoding:"utf-8"}) 
const products=fs.readFileSync("./products.html",{encoding:"utf-8"})


//Creating Part
const server = http.createServer((req, res) => {
  console.log(req.url)

  if (req.url === "/") {
    res.write(home)
  } else if (req.url === "/products") {
    res.write(products)
  }
//   console.log("Request Info",req);
  res.end();
});


//Listing Part
server.listen(8080, () => {
  console.log("port number start with 8080");
});
