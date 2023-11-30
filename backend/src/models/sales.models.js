const camelize = require('camelize');
const connection = require('./connection');
const { getDate } = require('../utils/getDate');

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales;',
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute('SELECT sales.* FROM sales'
  + ' INNER JOIN products ON products.id = sales.id'
  + ' WHERE sales.id = ? ORDER BY sales.id, products.id ASC;', [id]);
  return camelize(sale);
};

const createSale = async (sales) => {
  const ids = sales.map(async (sale) => {
    const currentDate = getDate();
    const [rows] = await connection.execute('INSERT INTO sales (date) VALUES (?)', [currentDate]);
    await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity)' 
    + ' VALUES (?, ?, ?)', [rows.insertId, sale.productId, sale.quantity]);
    return rows.insertId;
  });
  return ids;
};

module.exports = {
  findAll,
  findById,
  createSale,
};
