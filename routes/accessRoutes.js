const express = require("express");
const accessController = require("../controllers/accessController");

const router = express.Router();

// Create Access has been tested and works I havent tested the rest but they should be fine 
//I tested and fixed some error- Ryan
//http://localhost:3000/api/access/create-access
router
  .route("/create-access")
  .post(accessController.createAccess);

//http://localhost:3000/api/access/get-access-code/:accessId
router
  .route("/get-access-code/:accessId")
  .get(accessController.getAccessCode);

//http://localhost:3000/api/access/get-access-record/:accessId
router
  .route("/get-access-record/:accessId")
  .get(accessController.getAccessRecord);

//http://localhost:3000/api/access/update-access-record/:accessId
router
  .route("/update-access-record/:accessId")
  .put(accessController.updateAccessRecord);

  //http://localhost:3000/api/access/delete-access-record/:accessId
router
  .route("/delete-access-record/:accessId")
  .delete(accessController.deleteAccessRecord);

  //http://localhost:3000/api/access/all-records
router
  .route("/all-records")
  .get(accessController.displayAllAccessRecords);


module.exports = router;