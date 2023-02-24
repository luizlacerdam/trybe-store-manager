const { salesModel } = require('../models');

const getAllSales = async () => {
  const products = await salesModel.getAllSales();
  return { type: null, message: products };
};

module.exports = {
  getAllSales,
};