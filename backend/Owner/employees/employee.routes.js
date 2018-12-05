const express = require('express');
const employeeController = require('./employee.cotroller');
const routes = express.Router();
const checkAuth = require('lib/middleware/check-auth');

routes.post('/add', checkAuth ,employeeController.addEmployee);
routes.get('/getAllEmployees', checkAuth, employeeController.getAllEmployees);
routes.get('/getAllDeletedEmployees', checkAuth, employeeController.getAllDeletedEmployees);
routes.put('/updateEmployees', checkAuth, employeeController.updateEmployee);
routes.get('/deleteForever/:id', checkAuth, employeeController.deleteForever);
routes.post('/login', employeeController.login);
routes.get('/getEmployeeByOwnerId/:id', employeeController.getEmployeeByOwnerId);
module.exports = routes;