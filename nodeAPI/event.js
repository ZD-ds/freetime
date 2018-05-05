//引入event模块，创建eventsEmitter对象
var events=require('events');
var eventEmitter=new events.EventEmitter();

//绑定时间处理函数
var connectHandler=function(){
    console.log("connectd调用了");
}
eventEmitter.on("connection",connectHandler);

//触发事件
eventEmitter.emit("connection");
console.log('程序执行完毕');
