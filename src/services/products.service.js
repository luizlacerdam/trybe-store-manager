const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const products = await productsModel.getProductById(id);
  return { type: null, message: products };
};

module.exports = {
  getAllProducts,
  getProductById,
};