//要统计当前函数谁耗费的时间最长

//这样写测试除了每段代码都要插入外来代码，然后变量污染，这个时候就需要我们使用面向切面编程
// function test(argument){
//     var start=new Date();
//     alert(2);
//     var end=new Date();
//     console.log(start-end);
// }

//面像切面式解决

function test(){
    alert(2);
    return "a1";
}
Function.prototype.before=function(fn){
    var __self=this;
    return function(){
        console.log(arguments);
        if(fn.apply(__self,arguments)==false){
                return false;
        }
        
         return __self.apply(__self,arguments);
    }
   
}
Function.prototype.after=function(fn){
    var __self=this;
    return function(){
        var result= __self.apply(this,arguments);
       if(result==false){
           return false;
       }
        fn.apply(this,arguments);
        return result;
    }
}
test.before(function(){
    alert(1);
}).after(function(){
    alert(3);
})();
// test.after(function(){
//     alert(3);
// });