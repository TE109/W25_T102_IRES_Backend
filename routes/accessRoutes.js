const express = require("express");
const accessController = require("../controllers/accessController");
const auth = require('../config/auth');
const router = express.Router();

// Create Access has been tested and works I havent tested the rest but they should be fine 
//I tested and fixed some error- Ryan
//http://localhost:3000/api/v1/access/create-access
router
  .route("/create-access")
  .post(auth, accessController.createAccess);

//http://localhost:3000/api/v1/access/all-records
router
  .route("/get-access-code/:accessId")
  .get(auth, accessController.getAccessCode);

//http://localhost:3000/api/v1/access/get-access-record/:accessId
router
  .route("/get-access-record/:accessId")
  .get(auth, accessController.getAccessRecord);

//http://localhost:3000/api/v1/access/update-access-record/:accessId
router
  .route("/update-access-record/:accessId")
  .put(auth ,accessController.updateAccessRecord);

  //http://localhost:3000/api/v1/access/delete-access-record/:accessId
router
  .route("/delete-access-record/:accessId")
  .delete(auth, accessController.deleteAccessRecord);

  //http://localhost:3000/api/v1/access/all-records
router
  .route("/all-records")
  .get(auth, accessController.displayAllAccessRecords);


module.exports = router;