const express = require("express");
const controller = require("./page.controller")
const auth = require("./../../middlewares/auth")

const router = express.Router();


router.route('/:pageID').get(auth,controller.getGage)



module.exports = router;
