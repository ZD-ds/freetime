let express=require('express');
let app=express();
app.use(express.static('public'));
let swig=require('swig');
app.set('view engine','html');
app.engine('html',swig.renderFile);
app.get('/',function(req,res,next){
    res.render('temp',{
        title:'测试首页',
        data:"hello express"
    });
});
app.listen(3000,function(){
    console.log("借口请求成功");
    
});