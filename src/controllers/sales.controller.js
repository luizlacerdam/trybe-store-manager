const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const getSaleById = async (_req, res) => {
  const { type, message } = await salesService.getSaleById();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  getAllSales,
  getSaleById,
};