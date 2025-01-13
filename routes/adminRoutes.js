const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router
    .route('/signup')
    .post(adminController.signUpAdmin);

router
    .route('/login')
    .post(adminController.loginAdmin);

module.exports = router;