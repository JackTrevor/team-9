const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');
const { isAuthenticated } = require('../middleware/authenticate');
const {validations, validate} = require("../middleware/validator");


router.get('/', articlesController.getAll);
router.get('/:id', articlesController.getSingle);
router.post('/', isAuthenticated, validations().articles, validate, articlesController.createArticle);
router.put('/:id', isAuthenticated, validations().articles, validate, articlesController.updateArticle)
router.delete('/:id', isAuthenticated, articlesController.deleteArticle)

module.exports = router;