//importing Part
const http = require("http");


//creating Part
const server = http.createServer((req, res) => {
  console.log(req.url)

  if (req.url === "/") {
    res.write("HomePage")
  } else if (req.url === "/products") {
    res.write("ProductPage")
  }
//   console.log("Request Info",req);
  res.end();
});


//Listing Part
server.listen(8080, () => {
  console.log("port number start with8080");
});
