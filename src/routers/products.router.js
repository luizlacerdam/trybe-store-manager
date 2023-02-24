const express = require('express');
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.post('/', validateProductName, productsController.addProduct);

router.get('/:id', productsController.getProductById);

router.put('/:id', validateProductName, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;