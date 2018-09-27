//在严格模式中，this不被允许指向全局，如果运行时试图指向全局，this将会变为undefined，上面代码在严格模式中调用Person函数将会抛出异常，因为不能为undefined设置属性。我们可以用下面代码测试：
var b = 0;
var obj = {
    b: 1,
    a: () => {
        setTimeout(() => {
            console.log(this.b);
        }, 0)
    }
}


------------------------变成-------------------------------------------
var b = 0;
var obj = {
    b: 1,
    a: function a() {
        setTimeout(function () {
            console.log(undefined.b);
        }, 0);
    }
};