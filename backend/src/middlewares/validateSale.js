const { findById } = require('../models/products.models');

const productIdExists = (request, response, next) => {
  const sales = request.body;
  const salesFiltered = sales.some((sale) => sale.productId === undefined);
  if (salesFiltered === true) {
    return response.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const quantityExists = (request, response, next) => {
  const sales = request.body;
  const salesFiltered = sales.some((sale) => sale.quantity === undefined);
  if (salesFiltered === true) {
    return response.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const quantityGreaterThanZero = (request, response, next) => {
  const sales = request.body;
  const salesFiltered = sales.some((sale) => sale.quantity <= 0);
  if (salesFiltered === true) {
    return response.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const doesProductExists = async (request, response, next) => {
  const products = request.body;
  const productsMap = products.map((product) => {
    const result = findById(product.productId);
    return result;
  });
  const promiseResult = await Promise.all(productsMap);
  if (promiseResult.some((element) => element.length === 0)) {
    return response.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  productIdExists,
  quantityExists,
  quantityGreaterThanZero,
  doesProductExists,
};
