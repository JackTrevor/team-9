const express = require('express');
const router = express.Router();

const publishersController = require('../controllers/news-publishers');
// const { isAuthenticated } = require('../middleware/authenticate');
const {validations, validate} = require("../middleware/validator");


router.get('/', publishersController.getAll);
router.get('/:id', publishersController.getSingle);

router.post('/', validations().publishers, validate, publishersController.createPublisher);
// router.post('/', isAuthenticated, usersController.createuser);
router.put('/:id', validations().publishers, validate, publishersController.updatePublisher)
// router.put('/:id', isAuthenticated, usersController.updateuser);
router.delete('/:id', publishersController.deletePublisher)
// router.delete('/:id', isAuthenticated, usersController.deleteuser);

module.exports = router;
