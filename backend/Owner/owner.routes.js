const express = require('express');
const ownerController = require('./owner.controller');
const checkAuth = require('../middleware/check-auth');

const routes = express.Router();

routes.get('/',ownerController.testing);
routes.post('/signup', ownerController.signup);
routes.post('/login', ownerController.login);
routes.get('/getlistOfOwners', checkAuth ,ownerController.listOfOwners);
// routes.get('/softDeleteOwner/:_id', ownerController.softDeleteOwner);
routes.put('/updateOwner/:id', checkAuth ,ownerController.updateOwner);

module.exports = routes;