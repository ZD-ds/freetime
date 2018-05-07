var express=require('express');
var app=express();
app.use(express.static('public'));

//配置swig
var swig=require("swig");
app.set('view engine','html');
app.engine('html',swig.renderFile);
//使用mysql驱动
var mysql=require("mysql");
//设置mysql
var connection=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"qwer1234",
    database:"yideng"
});
connection.connect();
//配置路由
app.get("/",function(req,res){
        res.render("index");
});
app.get("/receive",function(req,res){
   console.log('前台给后台数据'+req.query.username);
   var post={
       username:req.query.username
   };
   var query=connection.query("INSERT INTO userinfo SET?",post,function(err,result){
        if(err){
            console.log(err);
            
            res.json({
                data:"未成功"
            });
        }else{
            console.log(result);
            res.json({
                data:"成功插入"
            });
        }
   });
  
});
//容错机制
app.get("*",function(req,res,next){
    res.status(404);
    res.end('404');
});
app.use(function(err,req,res,next){

    res.status(500);
    res.end("error");
});
app.listen(3000,function(){
    console.log("成功");
    
});