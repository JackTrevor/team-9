const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const {isAuthenticated} = require('../middleware/authenticate');
const {validations, validate} = require("../middleware/validator");

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', isAuthenticated, validations().users, validate, usersController.createUser);
router.put('/:id', isAuthenticated, validations().users, validate, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);


module.exports = router;
