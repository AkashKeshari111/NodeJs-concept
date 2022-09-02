//importing Part
const http=require("http");
const fs=require("fs")

//Reading Part
const HTMLFile=fs.readFileSync("./index.html",{encoding:"utf-8"})

//Creating Part
const server=http.createServer((req,res)=>{
   
     res.end(HTMLFile)
    
})

//Listing Part
server.listen(8080,()=>{
    console.log("port number start with 8080")
})