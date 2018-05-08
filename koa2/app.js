const Koa=require("koa");
const app=new Koa();
const router=require('koa-simple-router');
const convert=require('koa-convert');
const path=require('path');
const render=require('koa-swig'); 
const co=require("co");
const serve=require("koa-static");
app.context.render=co.wrap(render({
    root:path.join(__dirname,'./views'),
    autoescape:true,
    cache:'memory',
    ext:'html',
    varControls:['[[',']]'],
    writeBody:false
}));
app.use(router(_=>{
    _.get('/',(ctx,next)=>{
        ctx.body='hello';
    })
    _.get('/index',async (ctx,next)=>{
        ctx.body=await ctx.render('index.html');
    })
}));
app.use(convert(serve(path.join(__dirname,'./public'))));//静态文件地址
// app.use(ctx=>{
//     ctx.body="hello world";
// });

app.listen(3000,function(){
    console.log('success');
});