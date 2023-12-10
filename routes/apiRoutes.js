const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/categories', apiController.categories);
router.get('/products/:id', apiController.getProduct);
router.get('/products', apiController.products);
router.get('/users', apiController.users);
router.get('/users/:id', apiController.usersId);
router.get('/solds', apiController.getSolds);
module.exports = router;