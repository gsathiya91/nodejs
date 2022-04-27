const express = require("express");
const router = express.Router();
var productModule = require("../module/product");
var authorizeModule = require('../module/authorize');

router.get('/', productModule.getProducts);
// router.get('/:id', employeeModule.getEmployee);

router.post('/create', authorizeModule.authorizeUser, productModule.postProduct);
router.put('/update/:id',authorizeModule.authorizeUser,  productModule.updateProduct);
// router.patch('/update/:id',authorizeModule.authorizeUser, employeeModule.updateEmployeeRole);
router.delete('/delete/:id',authorizeModule.authorizeUser, productModule.deleteProduct);

module.exports = router; 