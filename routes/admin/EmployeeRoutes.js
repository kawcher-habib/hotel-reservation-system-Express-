const express = require('express');
const route = express.Router();
let conn = require('../../db/database');
const employeeController  = require('../../controller/admin/EmployeeController');

route.get('/', employeeController.getEmployees);
route.get('/:id', employeeController.getEmployeeById);
route.get('/search/:id', employeeController.getSearchData);
route.post('/create', employeeController.createEmployee);
route.put('/updated', employeeController.updatedEmployee);
route.post('/status/:id', employeeController.employeeStatus);



module.exports = route;