const { findById } = require('../models/sales.models');

const saleDoesNotExist = async (request, response, next) => {
  const { id } = request.params;
  const result = await findById(id);
  console.log(result);
  if (result.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  } 
  next();
};

module.exports = {
  saleDoesNotExist,
};
