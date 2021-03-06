'use strict';

const Hapi=require('hapi');
const routers=require('./router');
// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
// server.route({
//     method:'GET',
//     path:'/hello',
//     handler:function(request,h) {

//         return'hello world';
//     }
// });


// Start the server
async function start() {
    await server.register(require('inert'));
    await server.register({
        plugin:require("hapi-pino"),
        options:{
            prettyPrint:true,
            logEvents:['response']
        }
    });
    for(let api of routers){
        server.route(api);
    }
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};
process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
});
start();