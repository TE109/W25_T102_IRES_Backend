const express = require("express");
const smsController = require("../controllers/smsController.js");

const router = express.Router();

router
  .route("/send-message")
  .post(smsController.createMessage);
router
  .route("/verify")
  .post(smsController.verifyCode);
module.exports = router;
