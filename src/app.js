const { log } = require("console");
const express = require("express");
const path = require("path");
const { setHeaders } = require("./middlewares/headers");
const app = express();


//* BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
//* Cors Policy
app.use(setHeaders);

//* Static Folders
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//* Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* Routes
app.get("/", (req, res) => {
  return res.render("index");
});

//* 404 Error Handler
app.use((req, res) => {
  console.log("This Path Is Not Found", req.path);
  return res
    .status(401)
    .json({ message: "404! Path Not Found . Please check The Path/Method" });
});

module.exports = app;
