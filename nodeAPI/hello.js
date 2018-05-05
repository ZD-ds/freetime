class Hello{
    constructor(name){
            this.name=name;
    }
    setName(name){
            this.name=name;
    }
    sayHello(){
        console.log('Hello'+this.name);
    }
}
module.exports=Hello;
