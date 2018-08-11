const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log(1);
  const rt = ctx.response.get('X-Response-Time');
  console.log(4);
});

// x-response-time

app.use(async (ctx, next) => {
 console.log(2);
 
  await next();
  console.log(3);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
//打印的结果1 2 3 4
