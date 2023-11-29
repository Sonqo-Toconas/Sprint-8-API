const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/users', apiController.users);
router.get('/categories', apiController.categories);
router.get('/product/:id', apiController.productForId);

module.exports = router;