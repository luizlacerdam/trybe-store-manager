const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

const addProduct = async (productName) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUE (?)', [productName]);
  return insertId;
};

const updateProduct = async (name, productId) => {
  const [result] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id =?', [name, productId]);
  
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};