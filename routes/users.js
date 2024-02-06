const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
// const { isAuthenticated } = require('../middleware/authenticate');



router.get('/', usersController.getAll);

// router.get('/:id', usersController.getSingle);

// router.get('/personal/:id', usersController.getSinglePersonalId);

// router.post('/', isAuthenticated, usersController.createuser);

// router.put('/:id', isAuthenticated, usersController.updateuser);

// router.delete('/:id', isAuthenticated, usersController.deleteuser);

module.exports = router;