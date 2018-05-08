var fs=require('fs');
var server = require('http').createServer(function(req,res){
  if(req.url=="/"){
    fs.readFile("index.html",function(err,buf){
          res.end(buf);
     })
  }else if(req.url=='/socket.io.js'){
    fs.readFile("socket.io.js",function(err,buf){
      res.end(buf);
 })
  }
     
});
var io = require('socket.io')(server);

io.on('connection', function(client){
  client.emit('open');
  client.emit('test',{data:1});
  client.on('message', function(data){
      console.log(data);
      
  });

  client.on('disconnect',function(){
    console.log("客户取消了连接");
    
  });
});
server.listen(3000);