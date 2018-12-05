const express = require('express');
const adminController = require('./admin.controller');
const routes = express.Router();

routes.post('/register',adminController.addAdmin);
routes.post('/login', adminController.login);
routes.get('/getAllOwners', )
module.exports = routes
