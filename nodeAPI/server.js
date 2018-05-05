const http=require("http");
http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/plan'
        //发送响应数据
     
    });
    res.end("Hellw world!\n");
}).listen(3000);
console.log("success");
