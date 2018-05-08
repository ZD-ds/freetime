
const koa=require("koa");
const app=koa();


//x-response-time

app.use(function*(next){
    let start=new Date;
    console.log("1");
    yield next;
    let ms=new Date-start;
    console.log("2");
    this.set('X-Response-Time',ms+'ms');
});

//logger

app.use(function*(next){
    let start=new Date;
    console.log("3");
    yield next;
    let ms=new Date-start;
    console.log("4");
    console.log('%s %s - %s',this.method,this.url,ms);    
});

//404中间件
app.use(function*pageNotFound(next){
    yield next;
    if(404!=this.status)return;
    this.status=404;
    switch(this.accepts('html','json')){
        case 'html':
            this.type='html';
            this.body='<p>Page Not found</p>';
            break;
        case 'json':
            this.body={
                message:"page not found"
            };break;
        default:
            this,type='text';
            this.body="page not found"
    }
});

app.use(function*(){
    this.body="nihao";
});
app.listen(3000,function(){
    console.log("kaishi");
    
});