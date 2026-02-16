const express = require("express");
const controller = require("./auth.controller");

const router = express.Router();

router
  .route("/register")
  .get(controller.showRegisterView)
  .post(controller.register);

module.exports = router;
