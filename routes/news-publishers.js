const express = require('express');
const router = express.Router();

const publishersController = require('../controllers/news-publishers');
const { isAuthenticated } = require('../middleware/authenticate');
const {validations, validate} = require("../middleware/validator");


router.get('/', publishersController.getAll);
router.get('/:id', publishersController.getSingle);
router.post('/', isAuthenticated, validations().publishers, validate, publishersController.createPublisher);
router.put('/:id', isAuthenticated, validations().publishers, validate, publishersController.updatePublisher)
router.delete('/:id', isAuthenticated, publishersController.deletePublisher)

module.exports = router;
