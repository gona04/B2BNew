const express = require('express');
const technologyController = require('./technologies.controller');
routes = express.Router();

routes.post('/add', technologyController.addTechologies);
routes.get('/get/:id', technologyController.getAllTechologies);
routes.delete('/delete/:id', technologyController.deleteTechnology);
routes.put('/edit/:id', technologyController.editTechnology);

module.exports = routes;