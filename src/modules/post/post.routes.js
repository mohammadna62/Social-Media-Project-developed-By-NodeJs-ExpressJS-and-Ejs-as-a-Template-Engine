const express = require("express");
const controller = require("./post.controller");
const auth = require("./../../middlewares/auth");
const accountVerify = require("./../../middlewares/accountVerify");
const { multerStorage } = require("./../../middlewares/uploaderConfigs");
const upload = multerStorage("public/images/posts",/jpeg|jpg|png|webp|mp4|mkv/)
const router = express.Router();

router
  .route("/")
  .get(auth, accountVerify, controller.showPostUploadView)
  .post(auth, upload.single("media"),controller.createPost);
router.route("/like").post(auth,controller.like)
router.route("/dislike").post(auth,controller.dislike)
module.exports = router;
