let express=require("express");
let app=express();
//all是完全匹配然后use 匹配前缀
let a=function(req,res,next){
    console.log("a");
    next();
}
let b=function(req,res,next){
    console.log("b");
    next();
}
app.all("/index",[a,b],function(req,res,next){
    res.send("hello");
})

var server=app.listen(8081,function(){
    console.log("接口已启动");
});


