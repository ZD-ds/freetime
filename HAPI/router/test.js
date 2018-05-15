const path=require('path');
const test={
    method:'GET',
    path:'/test',
    handler:function(request,h) {
        console.log(path.join(__dirname,'../public/hello.html'));
        request.logger.info("in handle %s",request.path);
        return h.file(path.join(__dirname,'../public/hello.html'));
    }
}
module.exports=test;