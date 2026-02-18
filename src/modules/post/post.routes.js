const express = require("express");
const controller = require("./post.controller");
const auth = require("./../../middlewares/auth");
const accountVerify = require("./../../middlewares/accountVerify");

const router = express.Router();

router
  .route("/")
  .get(auth,accountVerify,controller.showPostUploadView)
  .post(auth,controller.createPost);

module.exports = router;
