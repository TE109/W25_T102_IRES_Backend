const CFG = require("./config/config");
const app = require("./config/app");
const express = require("express");

app.use(express.json());

const connectToMongo = require('./config/db');

connectToMongo();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('IRes Backend is Running!');
});

// Start the server
app.listen(CFG.PORT, () => {
    console.log(`Server is running on http://localhost:${CFG.PORT}`);
});
