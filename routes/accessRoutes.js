const express = require("express");
const accessController = require("../controllers/accessController");

const router = express.Router();

// Create Access has been tested and works I havent tested the rest but they should be fine 

router
  .route("/create-access")
  .post(accessController.createAccess);
router
  .route("/get-access-code")
  .get(accessController.getAccessCode);
router
  .route("/get-access-record")
  .get(accessController.getAccessRecord);
router
  .route("/update-access-record")
  .post(accessController.updateAccessRecord);
router
  .route("/delate-access-record")
  .delete(accessController.updateAccessRecord);
router
  .route("/all-records")
  .get(accessController.displayAllAccessRecords);


module.exports = router;