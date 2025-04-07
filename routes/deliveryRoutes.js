const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const auth = require('../config/auth');

const router = express.Router();

////http://localhost:3000/api/v1/delivery/
router
    .route('/')
    .get(deliveryController.getAllDeliveries)
    .post(deliveryController.createDelivery)
    

////http://localhost:3000/api/v1/delivery/:eid
router
    .route('/:eid')
    .get(auth, deliveryController.getDeliveryById)
    .put(auth, deliveryController.updateDelivery)
    .delete(auth, deliveryController.deleteDelivery);
           
module.exports = router;