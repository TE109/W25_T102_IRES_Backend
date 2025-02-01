
const express = require('express');
const accessController = require('../controllers/accessController');
const router = express.Router();

router
    .route('/access')
    .post(accessController.createAccess) // Create new access record //require type parameter ['visitor', 'delivery', 'admin']
    .get(accessController.dis)