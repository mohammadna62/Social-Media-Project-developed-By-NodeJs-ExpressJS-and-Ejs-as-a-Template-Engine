const app = require("./app")

function startServer() {
    app.listen(4002,()=>{
        console.log("Server Runnig on Port 4002");
        
    })
}

function run(){
    startServer()
    //  
}

//  **** notie : nodemon package run directly server.js from packahe.kson and "main": "./src/server.js",

run()