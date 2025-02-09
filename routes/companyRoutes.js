const express = require('express');
const companyController = require('../controllers/companyController');
const auth = require('../config/auth');

const router = express.Router();

////http://localhost:3000/api/v1/company/
router
    .route('/')
    .get(auth, companyController.getAllCompanies)
    .post(auth, companyController.createNewCompany)
    

////http://localhost:3000/api/v1/company/:eid
router
    .route('/:eid')
    .get(auth, companyController.getCompany)
    .put(auth, companyController.updateCompany)
    .delete(auth, companyController.deleteCompany);
           
module.exports = router;