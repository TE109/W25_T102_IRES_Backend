const express = require('express');
const cors = require('cors');
const adminRouter = require('../routes/adminRoutes');
const companyRouter = require('../routes/companyRoutes');
const smsRoutes = require("../routes/smsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/company', companyRouter);
app.use("/api/v1/sms", smsRoutes);

module.exports = app;