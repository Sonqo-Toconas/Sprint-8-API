const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/users', apiController.users);
router.get('/categories', apiController.categories);
<<<<<<< HEAD
router.get('/products/:id', apiController.getProduct);
=======
router.get('/product/:id', apiController.productForId);
>>>>>>> eafa19d33429d65799d03648c8c6a7539712db18

module.exports = router;