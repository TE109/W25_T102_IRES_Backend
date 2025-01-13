const express = require('express');
const companyController = require('../controllers/companyController');
const auth = require('../config/auth');

const router = express.Router();

router
    .route('/')
    .get(auth, companyController.getAllCompanies)
    .post(auth, companyController.createNewCompany)
    .delete(auth, companyController.deleteCompany);

router
    .route('/:eid')
    .get(auth, companyController.getCompany)
    .put(auth, companyController.updateCompany);
           
module.exports = router;