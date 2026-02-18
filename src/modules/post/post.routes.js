const express = require("express")
const controller = require("./post.controller")

const router = express.Router()

router.route("/").get(controller.showPostUploadView).post(controller.createPost)











module.exports = router