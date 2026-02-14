const app = require("./app")

function startServer() {
    app.listen(4002,()=>{
        console.log("Server Runnig on Port 4002");
        
    })
}

function run(){
    startServer()
    // Conect To Database()
    //  
}


run()