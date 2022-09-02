// console.log(process.argv);
const num = process.argv.slice(2)
// console.log(num);

let r=0;
for(let i=0;i<num.length;i++){
    r+=Number(num[i])
}

console.log(r)