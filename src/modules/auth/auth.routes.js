const express = require ("express")
const controller = require("./auth.controller")

const router = express.Router()

router.route("/register").post(controller.register)


module.exports = router