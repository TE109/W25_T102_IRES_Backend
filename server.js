const express = require('express');
const CFG = require("./config/config");
const app = require("./config/app");
const cors = require('cors'); // Allow frontend requests
const connectToMongo = require('./config/db');

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const companyRoutes = require('./routes/companyRoutes');

// Use Routes
app.use('/api/v1/auth', adminRoutes);
app.use('/api/v1', visitorRoutes);
app.use('/api/v1', deliveryRoutes);
app.use('/api/v1', companyRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('IRes Backend is Running!');
});

// Start the server
app.listen(CFG.PORT, () => {
    console.log(`Server is running on http://localhost:${CFG.PORT}`);
});
