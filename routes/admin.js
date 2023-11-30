const express = require('express');
const router = express. Router();
const apiController = require('../controllers/apiController');

router.post('/createProduct/:id', apiController.createProduct)
router.put('/editProduct/:id', apiController.editProduct)
router.delete('/deleteProduct/:id', apiController.deleteProduct)
module.exports = router;