const express = require('express');
const companyController = require('../controllers/companyController');
const auth = require('../config/auth');
const Company = require('../models/companyModel');

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
           
router.get('/company', async (req, res) => {
    const companies = await Company.find({});
    res.json(companies);
});
module.exports = router;