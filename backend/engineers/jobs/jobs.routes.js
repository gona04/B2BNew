const express = require('express');
const jobsController = require('./jobs.controller');

routes = express.Router();

routes.post('/add', jobsController.addAJob);
routes.get('/getAllJobs/:id', jobsController.getAllJobs);
routes.put('/editJob/:id', jobsController.editJobs);
module.exports = routes;