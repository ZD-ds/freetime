let http=require("http");
let url=require("url");


function start(route){
    function onRequest(req,res){
        var pathname=url.parse(req.url).pathname;
        route(pathname,res);
       
    }
    http.createServer(onRequest).listen(8888);
    console.log("server has started");
    
}
module.exports.start=start;