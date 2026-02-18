const express = require("express");
const controller = require("./post.controller");
const auth = require("./../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(auth,controller.showPostUploadView)
  .post(auth,controller.createPost);

module.exports = router;
