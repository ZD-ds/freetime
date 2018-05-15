const hello={
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
}
const index={
    method:'GET',
    path:'/',
    handler:function(request,h) {

        return {
            data:'shouye'
        };
    }
}
module.exports=[index,hello]