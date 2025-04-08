const express = require('express');
const companyController = require('../controllers/companyController');
const auth = require('../config/auth');

const router = express.Router();

router
    .route('/')
    .get( companyController.getAllCompanies)
    .post(auth, companyController.createNewCompany);

router
    .route('/:eid')
    .get(auth, companyController.getCompany)
    .put(auth, companyController.updateCompany)
    .delete(auth, companyController.deleteCompany);
           
module.exports = router;