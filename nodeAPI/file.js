let fs=require("fs");
var buf = new Buffer(1024);
//打开文件
console.log("准备打开文件！");
fs.open("data.txt","r+",function(err,fd){
    if(err){
        return console.err(err);
    }
    console.log("文件打开成功 "+fd.toString());
    
});
//获得文件信息
fs.stat('data.txt', function (err, stats) {
    console.log(stats.isFile());   
    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
})
//写入文件
fs.writeFile('input.txt','我是通过fs.write写的',function(err){
    if(err){
        return console.err(err);
    }
    fs.readFile("input.txt",function(err,data){
        console.log(data.toString());
    })
});
//读取文件
fs.open("data.txt","r+",function(err,fd){
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){
        console.log(bytes + "  字节被读取");
        if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功");
         });
    });

});
//截取文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取了10字节后的文件内容。");
   
   // 截取文件
   fs.ftruncate(fd, 10, function(err){
      if (err){
         console.log(err);
      } 
      console.log("文件截取成功。");
      console.log("读取相同的文件"); 
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
         if (err){
            console.log(err);
         }

         // 仅输出读取的字节
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }

         // 关闭文件
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功！");
         });
      });
   });
});
//删除文件
// fs.unlink('test.txt', function(err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("文件删除成功！");
//  });
 //创建目录
 fs.mkdir("a/b",function(err){
    if (err) {
        return console.error(err);
    }
    console.log("目录创建成功");
 });
 //读取目录
 fs.readdir("a",function(err, files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file){
        console.log( file );
    });
 });
 //删除目录
 fs.rmdir("a/b",function(err){
    if (err) {
        return console.error(err);
    }
    console.error("已经删除目录");
 })