//这个是koa2转变为koa1的源代码分析 主要就是generator转变为async

function * gen(){
    yield new Promise((resolve,reject)=>{
        if(成功){
            resolve();
        }else{
            reject();
        }
    });
    yield new Promise((resolve,reject)=>{
        if(成功){
            resolve();
        }else{
            reject();
        }
    });
}


function co(gen){
    return new Promise(function(resolve,reject){
        //执行onfulfilled
        onFulfilled();
        function onFulfilled(res){

            var ret;
            try{
                //2执行一次gen,返回一个{value：xxx,done:false}
                ret=gen.next(ret);
            }catch(e){
                return reject(e);
            }
            //执行next,将ret作为参数
            next(ret);
        }
        function onRejected(){
            
        }
        function next(ret){
            if(ret.done) return resolve(ret.value);
            var value=toPromise.call(ctx,ret.value);
            if(value&&isPromise(value)) return value.then(onFulfilled,onRejected);
        }
    })
}