const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.post('/', productsController.addProduct);

router.get('/:id', productsController.getProductById);

module.exports = router;