const express = require ("express")
const path = require("path")

const app = express()

//? Static Folders
app.use(express.static(path.join(__dirname,"..","public")))
app.use("/css",express.static(path.join(__dirname,"public/css")))
app.use("/js",express.static(path.join(__dirname,"public/js")))
app.use("/fonts",express.static(path.join(__dirname,"public/fonts")))
app.use("/images",express.static(path.join(__dirname,"public/images")))
//* Template Engine

app.set("view engine" , "ejs")
app.set("views",path.join(__dirname,"views"))



//! Routes
app.get("/", (req , res)=>{
    return res.render("index")
})


module.exports =  app