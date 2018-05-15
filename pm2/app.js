
var express=require('express');
var app=express();
app.get('/',function(req,res){
    res.send('Hello World');
});
app.listen(3000,function(){
    console.log("成功");
});
//pm2 restart pm2.json
