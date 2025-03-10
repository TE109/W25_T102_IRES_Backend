const express = require('express');
const router = express.Router();
const Delivery = require('../models/deliveryModel');

// Request delivery access code
router.post('/delivery/request-code', async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    res.json({ message: "Delivery code sent successfully" }); // Mock response
});

// Store delivery company name
router.post('/delivery/company', async (req, res) => {
    const { phoneNumber, companyName } = req.body;
    if (!phoneNumber || !companyName) {
        return res.status(400).json({ message: "Phone number and company name are required" });
    }

    res.json({ message: "Delivery company stored successfully" });
});

// Submit delivery request
router.post('/delivery/submit', async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    res.json({ message: "Delivery request submitted successfully" });
});

// Check delivery approval status (Polling)
router.get('/delivery/status', async (req, res) => {
    const { phone } = req.query;
    if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    res.json({ approved: true }); // Mock response: Auto-approved delivery
});

module.exports = router;
