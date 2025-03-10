const express = require('express');
const router = express.Router();
const Visitor = require('../models/visitorModel');

// Request visitor access code
router.post('/visitor/request-code', async (req, res) => {
    const { fullName } = req.body;
    if (!fullName) {
        return res.status(400).json({ message: "Full name is required" });
    }

    res.json({ message: "Visitor code sent successfully" }); // Mock response
});

// Validate visitor phone number
router.post('/visitor/validate-phone', async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    res.json({ message: "Phone number validated successfully" }); // Mock response
});

// Submit visitor reason for visit
router.post('/visitor/reason', async (req, res) => {
    const { phoneNumber, reason } = req.body;
    if (!phoneNumber || !reason) {
        return res.status(400).json({ message: "Phone number and reason are required" });
    }

    res.json({ message: "Reason submitted successfully" });
});

// Get visitor approval status (Polling)
router.get('/visitor/status', async (req, res) => {
    const { phone } = req.query;

    if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    res.json({ approved: true }); // Mock response: Auto-approved visitor
});

module.exports = router;
