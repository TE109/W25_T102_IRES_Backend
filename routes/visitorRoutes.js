const express = require('express');
const visitorController = require('../controllers/visitorController');
const auth = require('../config/auth');

const router = express.Router();

////http://localhost:3000/api/v1/visitor/
router
    .route('/')
    .get(auth, visitorController.displayAllVisitors)
    .post(auth, visitorController.createVisitorRecord)
    

////http://localhost:3000/api/v1/visitor/:eid
router
    .route('/:eid')
    .get(auth, visitorController.getVisitorById)
    .put(auth, visitorController.updateVisitor)
    .delete(auth, visitorController.deleteVisitor);
           
module.exports = router;