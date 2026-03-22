const express = require("express")
const controller = require("./user.controler")
const auth = require("../../middlewares/auth")
const {multerStorage} = require("../../middlewares/uploaderConfigs")
 router = new  express.Router()
const upload =multerStorage("public/images/profiles")


router.route("/edit-profile").get(auth,controller.showPageEditView)
router.route("/profile-picture").post(auth,upload.single("profile"),controller.updateProfile)

 module.exports = router