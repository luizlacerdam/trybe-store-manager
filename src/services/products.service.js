const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const products = await productsModel.getProductById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: products };
};

const addProduct = async (productName) => {
  const newProduct = await productsModel.addProduct({ name: productName });
  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};