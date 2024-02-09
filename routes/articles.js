const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');
// const { isAuthenticated } = require('../middleware/authenticate');



router.get('/', articlesController.getAll);

router.get('/:id', articlesController.getSingle);

router.post('/', articlesController.createArticle);
// router.post('/', isAuthenticated, articlesController.createArticle);
router.put('/:id', articlesController.updateArticle)
// router.put('/:id', isAuthenticated, articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle)
// router.delete('/:id', isAuthenticated, articlesController.deleteArticle);

module.exports = router;