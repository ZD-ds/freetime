let express=require('express');
let app=express();
let cookieParser=require('cookie-parser');
app.use(cookieParser());
app.get("/cookie",function(req,res){
        console.log(req.cookies);
});
app.use(function(req,res,next){
    console.log('必经路由');
    //jjdks.log();
    next();
   });
//错误中间件
// app.use(function(err,req,res,next){
//     console.log("cuowu");
//     if(err){
//         res.status(500).send("ERRor");
//     }
//    next();
// });
app.get("/index",function(req,res,next) {
    console.log("这是/index");
   
    next();
    
},function(req,res,next){
    res.send("nihao");
});

app.listen(3000,function(){
    console.log("成功");
    
})