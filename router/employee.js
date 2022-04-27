const express = require("express");
const router = express.Router();
var employeeModule = require("../module/employee");
var authorizeModule = require('../module/authorize');

router.get('/', employeeModule.getEmployees);
router.get('/:id', employeeModule.getEmployee);

router.post('/create', authorizeModule.authorizeUser,employeeModule.createEmployee);
router.put('/update/:id',authorizeModule.authorizeUser, employeeModule.updateEmployee);
router.patch('/update/:id',authorizeModule.authorizeUser, employeeModule.updateEmployeeRole);
router.delete('/delete/:id',authorizeModule.authorizeUser, employeeModule.deleteEmployee);

module.exports = router; 