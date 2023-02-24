const { productsModel } = require('../models');
const schema = require('./validations/validationProductInputsValues');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const products = await productsModel.getProductById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: products };
};

const addProduct = async (productName) => {
  const error = schema.validateNewProductName(productName);
  if (error.type) return error;

  const newProduct = await productsModel.addProduct(productName.name);
  return { type: null, message: { id: newProduct, ...productName } };
};

const updateProduct = async (name, id) => {
  const error = schema.validateNewProductName({ name });
  if (error.type) return error;

  const product = await productsModel.getProductById(id);
  if (!product) return { type: 404, message: 'Product not found' };

  await productsModel.updateProduct(name, id);
  
  return { type: null, message: { id, name } };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};