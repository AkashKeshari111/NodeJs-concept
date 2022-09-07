//import
const express=require("express")
//import multer for uploading file
const multer=require("multer")


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, `${__dirname}/../uploads`)
    },
    filename: (req, file, cb)=> {

      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

  //create server
const app=express();

//it is a built-in middileware It allow us to read JSON body
app.use(express.json())


//post single file for upload 
app.post("/file",upload.single("avatar"),(req,res)=>{
   res.send("FileUploaded")
})


//post multiple  file for upload 
app.post("/files",upload.array("photos"),(req,res)=>{
    res.send("FileUploaded")
 })


 //server start 
app.listen(8080,()=>{
    console.log("server start at 8080 port")
})