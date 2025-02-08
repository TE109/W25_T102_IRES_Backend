const express = require('express');
const visitorController = require('../controllers/vistorController');
const auth = require('../config/auth');

const router = express.Router();

////http://localhost:3000/api/v1/visitor/
router
    .route('/')
    .get(auth, companyController.getAllCompanies)
    .post(auth, companyController.createNewCompany)
    .delete(auth, companyController.deleteCompany);

////http://localhost:3000/api/v1/visitor/:eid
router
    .route('/:eid')
    .get(auth, companyController.getCompany)
    .put(auth, companyController.updateCompany);
           
module.exports = router;