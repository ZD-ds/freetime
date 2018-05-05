function route(pathname,res){
    if(pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write("Hello world");
        res.end();
    }else if(pathname=="/index"){
       
        res.end("index");
    }
}
exports.route=route;