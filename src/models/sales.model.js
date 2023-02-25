const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection
    .execute(`SELECT s.id AS saleId, p.product_id AS productId, p.quantity, s.date
    FROM StoreManager.sales_products AS p 
    INNER JOIN StoreManager.sales AS s ON s.id = p.sale_id
    ORDER BY s.id, productId`);
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id AS productId, p.quantity
    FROM StoreManager.sales_products AS p
    INNER JOIN StoreManager.sales AS s ON s.id = p.sale_id
    WHERE s.id = ?
    ORDER BY s.id, productId`,
    [id],
  );
  return result;
};
// // const addSale = async (saleId, productId, quantity) => {
// //   const placeholders = Object.keys(passenger)
// //     .map((_key) => '?')
// //     .join(', ');
  
// //   const [{ insertId }] = await connection.execute(
// //     `INSERT INTO passengers (${columns}) VALUE (${placeholders})`,
// //     [...Object.values(passenger)],
// //   );

// //   return insertId;
// // };

module.exports = {
  getAllSales,
  getSaleById,
};