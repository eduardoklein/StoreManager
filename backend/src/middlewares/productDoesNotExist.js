const { findById } = require('../models/products.models');

const productDoesNotExist = async (request, response, next) => {
  const { id } = request.params;
  const result = await findById(id);
  console.log(result);
  if (result.length === 0 || result === undefined) {
    return response.status(404).json({ message: 'Product not found' });
  } 
  next();
};

module.exports = {
  productDoesNotExist,
};
