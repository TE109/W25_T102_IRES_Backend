const express = require("express");
const accessController = require("../controllers/accessController.js");

const router = express.Router();

router
  .route("/send-message")
  .post(accessController.createMessage);

module.exports = router;
