const express = require("express");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");

const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./modules/auth/auth.routes");
const postsRouters = require("./modules/post/post.routes");

const app = express();
//! BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
//! Cors Policy
app.use(setHeaders);

//!Express-Flash
app.use(
  session({
    secret: "Secret Key",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
//! Static Folders
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//! Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//! Routes
app.get("/", (req, res) => {
  return res.render("index");
});
app.use("/auth", authRoutes);
app.use("/post", postsRouters);

//! 404 Error Handler
app.use((req, res) => {
  console.log("This Path Is Not Found", req.path);
  return res
    .status(401)
    .json({ message: "404! Path Not Found . Please check The Path/Method" });
});
//TODO: Needed Feature
//app.use(errorHandler)

module.exports = app;
