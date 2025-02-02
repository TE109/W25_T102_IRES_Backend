const express = require('express');
const cors = require('cors');
const adminRouter = require('../routes/adminRoutes');
const companyRouter = require('../routes/companyRoutes');
const smsRoutes = require("../routes/smsRoutes");
const accessRoutes = require("../routes/accessRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/company', companyRouter);
app.use("/api/v1/sms", smsRoutes);
app.use("/api/v1/access", accessRoutes);

module.exports = app;