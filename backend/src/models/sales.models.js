const camelize = require('camelize');
const connection = require('./connection');
const { getDate } = require('../utils/getDate');

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT sales.id as sales_id, sales.date, sales_products.product_id, sales_products.quantity' 
    + ' FROM sales INNER JOIN sales_products ON sales.id = sales_products.sale_id;',
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute('SELECT sales.id' 
  + ' AS sale_id, sales.date, sales_products.product_id, sales_products.quantity' 
  + ' FROM sales INNER JOIN sales_products ON sales.id = sales_products.sale_id' 
  + ' WHERE sales.id = ? ORDER BY sales.id ASC, sales_products.product_id ASC;', [id]);
  return camelize(sale);
};

const createSale = async (sales) => {
  const currentDate = getDate();
  const [rows] = await connection.execute('INSERT INTO sales (date) VALUES (?)', [currentDate]);
  sales.forEach(async (sale) => {
    await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity)' 
    + ' VALUES (?, ?, ?)', [rows.insertId, sale.productId, sale.quantity]);
  });
  return rows.insertId;
};

module.exports = {
  findAll,
  findById,
  createSale,
};
