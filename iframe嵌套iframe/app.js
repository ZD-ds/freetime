var http = require('http');
var fs = require('fs');

var path = require('path');
var file1 = path.resolve('./index.html');
http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { 'Content-Type': 'text/html' });

    // 发送响应数据 "Hello World"

    fs.readFile(file1, function (err, data) {
        if (err)
            return console.error(err);
        //获取到文件的所有内容
        response.end(data);
    });
}).listen(3000);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');