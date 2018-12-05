const express = require('express');
const engineerController = require('./engineer.controller');
const checkAuth = require('../middleware/check-auth');
const routes = express.Router();

routes.get('/getAllSpecific', checkAuth, engineerController.getAllEngineersAddedBy);
routes.get('/getAllEngineers', checkAuth ,engineerController.getAllEngineers);
routes.post('/addEngineer', checkAuth, engineerController.addEngineer);
routes.get('/update/:id/:role', checkAuth, engineerController.hierEngineer);
routes.put('/:id', checkAuth, engineerController.editEngineer);
routes.put('/unhire/:id', checkAuth, engineerController.unhire);

routes.get('/allDeletedEngineers', checkAuth,engineerController.listOfdeletedEngineers);
routes.get('/:id', checkAuth, engineerController.deleteEngineer);
routes.delete('/delet/:id', checkAuth, engineerController.permanentDelete);
routes.get('/undelete/:id', checkAuth, engineerController.unDelete);
routes.get('/byId/:id', checkAuth, engineerController.getEngineerById);


module.exports = routes;