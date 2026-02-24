const express = require("express")
const controller = require("./user.controler")
const auth = require("./../../middlewares/auth")
 router = new  express.Router()



router.route("/edit-profile").get(auth,controller.showPageEditView)

 module.exports = router