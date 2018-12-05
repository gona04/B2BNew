const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const io = require('../server');

const jobsRoutes = require('./engineers/jobs/jobs.routes');
const ownerRoutes = require('./Owner/owner.routes');
const engineerRoutes = require('./engineers/engineer.routes');
const adminRoutes = require('./admin/admin.routes');
const techologyRoutes = require('./engineers/technologies/technologies.routes');
const employeeRoutes = require('./Owner/employees/employee.routes');
const app = express();

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accepted, X-Requested-With, remember-me, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE, PUT')
    next();
})

// mongodb://localhost:27017/db/chat
const mongodb = 'mongodb://localhost:27017/b2b';

mongoose.connect(mongodb).then(() => {
    console.log('MongoDB connected');
})
.catch(error => {
    console.log(error + ' mongodb not connected');
})

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/owner/',ownerRoutes);
app.use('/api/engineer/', engineerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/technology', techologyRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/employee/', employeeRoutes);
module.exports = app;