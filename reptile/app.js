var express=require('express');
var app=express();
var request=require('request');
var cheerio=require('cheerio');
app.get("/",function(req,res){
  request("https://www.baidu.com/",function(err,response,body){
    if(!err&&response.statusCode==200){
      console.log(body);
      $=cheerio.load(body);//当$拿到整个body的选择器
     res.send({
       'inputnumber':$('input').length
     });
    }
  })
});
app.listen(3000,function(){
  console.log('成功');
  
})