

var http=require("http");
var fs=require("fs");
http.createServer(function(req,res){
    if(req.url=='/'){
        fs.readFile("index2.html",function(err,buf){
            if(err){
                res.end(404);return
            }else{
                res.end(buf);
            }
        });
    }else if(req.url=="/data"){
        res.setHeader('Cache-control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        let i=0;
        while(i<10000){
            console.log(i);
            res.write("data:" + new Date().toLocaleTimeString() + "\n\n" + 
            "data:" + i + "\n\n");//这里必须为\n\n才能是数据流分开，同时事件流给前台只会是data属性，不能设置其他属性

             i++;
        }
    }else if(req.url=="/ajax"){
        res.setHeader('Cache-control', 'no-cache');
        res.setHeader('Content-Type', 'application/json');
        let i=0;
        while(i<1000){
               console.log(i);
                res.write('"data":"time'+i+'"');
                i++;
        }
    }
}).listen(3000)