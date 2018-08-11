  export  function compose(middleware){
    return function(context,next){
        return dispatch(0);
        function dispatch(i){
            let fn=middleware[i];
            //当FN无值的时候将对应值赋值
            if(i===middleware.length)fn=next;
            if(!fn)return Promise.resolve();
            try{
                //递归取中间件函数
                return Promise.resolve(fn(context,dispatch.bind(null,i+1)));
            }catch(err){
                return Promise.reject(err);
            }
        }
    }
  }