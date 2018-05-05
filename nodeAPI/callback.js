//阻塞式代码
// const fs=require('fs');
// let data=fs.readFileSync('data.txt');
// console.log(data.toString());

//非阻塞式代码
const fs=require('fs');
let data=fs.readFile('data.txt',function(err,data){
    if(err){
        return console.err(err);
    }
    console.log(data.toString());
});
console.log("程序执行完毕");

