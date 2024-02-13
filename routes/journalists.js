const express = require('express');
const router = express.Router();

const controller = require('../controllers/journalists');
const {isAuthenticated} = require('../middleware/authenticate');
const {validations, validate} = require("../middleware/validator");


router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', isAuthenticated, validations().journalists, validate, controller.createJournalist);
router.put('/:id', isAuthenticated, validations().journalists, validate, controller.updateJournalist);
router.delete('/:id', isAuthenticated, controller.deleteJournalist);

module.exports = router;
