// In this segment we Get and Delete the data from db.json database using postman  \\


//importing part
const http = require("http");
const fs = require("fs");


//reading part
const file = fs.readFileSync("./db.json", { encoding: "utf-8" });
console.log("I'm reading file=>",file)

//It makes into a proper array formate
const db = JSON.parse(file);
console.log("I'm current database=>",db)


//here updating the file after delete

const updatedFile=(file,updatedData)=>{
   fs.writeFileSync(file,updatedData) // we using new method for updating the file 'fs.writeFileSync'
   console.log("Here you find updated Data=>",updatedData)
}

//creating part
const server = http.createServer((req, res) => {   
//   console.log("Request Info",req);
  console.log(req.method, req.url, db);

  if (req.url === "/") {
    // now we get data
    if (req.method === "GET") {
      const data = JSON.stringify(db);
      res.write(data);
    }
  }


  // we use here a startWith method
  else if (req.url.startsWith("/products")) {
    // res.write(db.products) // It is a problem when we write db.json then server is not running so we use nodemon here
    //    res.setHeader("content-type","application/json") // It is used after some day, It basically give the information what type of content used
    if (req.method === "GET") {
      const data = JSON.stringify(db.products);
      res.write(data);
    }
     // now we Delete data
     else if (req.method === "DELETE") {
        let id=req.url.replace("/products/","")

        console.log("I'm method and used here=>",req.method," and I'm id without me you can't delete=>",id)
        let updatedProducts=db.products.filter((el)=>(el.id!==id))
        db.products=updatedProducts
        console.log("I'm updated database for products=>",db.products)

        updatedFile("./db.json",JSON.stringify(db))
        res.write(JSON.stringify(db.products))
    }
  }



  // we use here a startWith method
  else if ((req.url.startsWith("/review"))) {
    if (req.method === "GET") {
      const data = JSON.stringify(db.review);
      res.write(data);
    }
  }


  res.end();
});



//listing the server on the port 
server.listen(8080, () => {
  console.log("port number start with 8080");
});
