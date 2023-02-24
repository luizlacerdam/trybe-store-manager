const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.addProduct(product);
  if (type) res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};