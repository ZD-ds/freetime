import { compose } from "./compose";

class koa{
    //当koa2使用中间件的时候，将所有的函数存储在中间件里有点像Promise的then
    use(fn){
        this.middleware.push(fn);
        return this;
    }
    //执行listen时，调用callback执行中间件
    listen(...args){
        const server=http.createServer(this.callback());
        return server.listen(...args);
    }
    callback(){
        const fn=compose(this.middleware);
        const handleRequest=(req,res)=>{
            const ctx=this.createContext(req,res);
            return this.handleRequest(ctx,fn);
        }
        return handleRequest;
    }
    handleRequest(ctx,fnmiddleware){
        const handleResponse = () => respond(ctx);
        return fnmiddleware(ctx).then(handleResponse).catch(onerror);
    }
    respond(ctx) {
        // allow bypassing koa
        // if (false === ctx.respond) return;
      
        // const res = ctx.res;
        // if (!ctx.writable) return;
      
        // let body = ctx.body;
        // const code = ctx.status;
      
        // // ignore body
        // if (statuses.empty[code]) {
        //   // strip headers
        //   ctx.body = null;
        //   return res.end();
        // }
      
        // if ('HEAD' == ctx.method) {
        //   if (!res.headersSent && isJSON(body)) {
        //     ctx.length = Buffer.byteLength(JSON.stringify(body));
        //   }
        //   return res.end();
        // }
      
        // responses
        if (Buffer.isBuffer(body)) return res.end(body);
        if ('string' == typeof body) return res.end(body);
        if (body instanceof Stream) return body.pipe(res);
      
        // body: json
        body = JSON.stringify(body);
        if (!res.headersSent) {
          ctx.length = Buffer.byteLength(body);
        }
        res.end(body);
      }

}