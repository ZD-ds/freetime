let express=require("express");
let app=express();
let bodyParser=require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
let fs=require("fs");
app.get("/",function(req,res){
    res.send('Hello '+req.query.name);
});
app.get("/index/:id",function(req,res){
    res.send('Hello '+req.params.id);
});
app.get("/json",function(req,res){
    res.json({
        id:"nihaoya"
    });
});
app.get("/json",function(req,res){
    res.json({
        id:"nihaoya"
    });
});
app.get("/index.html",function(req,res){
    let data;
    fs.readFile("index.html",function(err,buf){
           if(err){console.log(err);return;}
           data=buf;
           res.end(data);
    });

});
app.get("/index2.html",function(req,res){
   res.sendFile(__dirname+"/views/index2.html");

});
app.post('/index.html',urlencodedParser,function(req,res){
    console.log(req.body.user);
    res.redirect('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='+req.body.user+'&rsv_pq=91deb8b100086eb7&rsv_t=fbce6LnaEPdx8hE8LiCjT3MPPP45hSDrpMk5APeF4AVmAKUMe%2FgLGpLPgxk&rqlang=cn&rsv_enter=1&rsv_sug3=6&rsv_sug1=5&rsv_sug7=100&rsv_sug2=0&inputT=2221&rsv_sug4=4206');
});
var server=app.listen(8081,function(){
    console.log("接口已启动");
});

//热更新插件 npm install supervisor -g// supervisor app.js

