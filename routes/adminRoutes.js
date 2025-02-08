const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../config/auth');

const router = express.Router();
//Tested
//http://localhost:3000/api/v1/admin/signup
router
    .route('/signup')
    .post(adminController.signUpAdmin);
//http://localhost:3000/api/v1/admin/login
router
    .route('/login')
    .post(adminController.loginAdmin);

//http://localhost:3000/api/v1/admin/display
router
    .route('/display')
    .get(auth, adminController.displayAllAdmin);


//http://localhost:3000/api/v1/admin/update/:id
router
    .route('/update/:id')
    .put(auth, adminController.updateAdmin);

//http://localhost:3000/api/v1/admin/updatePassword/:id
router
    .route('/updatePassword/:id')
    .put(auth, adminController.updatePassword);
module.exports = router;