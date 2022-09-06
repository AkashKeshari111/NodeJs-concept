
//importing part
const http=require("http");

//creating Part
const server=http.createServer((req,res)=>{
    res.write("My")
    res.write(" Name")
    res.write(" is")

    res.end(" Akash")
})

//Listing Part
server.listen(8080,()=>{
    console.log("port no start with 8080")
})