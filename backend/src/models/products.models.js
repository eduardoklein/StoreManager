const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products);
};

const findById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?'
  + ' ORDER BY id ASC;', [id]);
  return camelize(product);
};

const createProduct = async (product) => {
  const [dbResult] = await connection.execute('INSERT INTO products (name) VALUES (?)', [product]);
  return dbResult.insertId;
};

const editProduct = async (name, id) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?;', [name, id]);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  editProduct,
};
