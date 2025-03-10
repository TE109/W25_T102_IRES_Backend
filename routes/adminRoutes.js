const express = require('express');
const adminController = require('../controllers/adminController');
const Admin = require('../models/adminModel'); 
const router = express.Router();
const CFG = require('../config/config'); 


router
    .route('/signup')
    .post(adminController.signUpAdmin);

router
    .route('/login')
    .post(adminController.loginAdmin);

router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(409).json({ message: "Email already registered" });
    }

    res.json({ message: "Email is available" });
});

router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token: "mocked_jwt_token" }); // Replace with JWT implementation
});

router.post('/create-account', async (req, res) => {
    try {
        const { email, password, phoneNumber } = req.body;

        if (!email || !password || !phoneNumber) {
            return res.status(400).json({ message: "Email, password, and phone number are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const newAdmin = new Admin({ email, password, phoneNumber });
        await newAdmin.save();

        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
});

router.post('/verify-phone', async (req, res) => {
    try {
        const { email, password, phoneNumber } = req.body;

        if (!email || !password || !phoneNumber) {
            return res.status(400).json({ message: "Email, password, and phone number are required" });
        }

        const existingAdmin = await Admin.findOne({ phoneNumber });
        if (existingAdmin) {
            return res.status(409).json({ message: "Phone number already registered" });
        }

        res.json({ message: "Phone number verified successfully" });
    } catch (error) {
        console.error("Error verifying phone:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
});

router.post('/verify-code', async (req, res) => {
    try {
        const { email, phoneNumber, code } = req.body;

        if (!email || !phoneNumber || !code) {
            return res.status(400).json({ message: "Email, phone number, and verification code are required" });
        }

        // Mock verification check (Replace this with actual OTP verification)
        if (code !== "123456") {
            return res.status(401).json({ message: "Invalid verification code" });
        }

        res.json({ message: "Verification successful" });
    } catch (error) {
        console.error("Error verifying code:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id }, CFG.SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error, please try again." });
    }
});



module.exports = router;