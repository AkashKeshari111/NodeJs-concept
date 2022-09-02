

const fs=require("fs");

let file = fs.readFileSync("./index.html",{encoding:"utf-8"})//also do=>  fs.readFileSync("./index.html").toString()

console.log(file);