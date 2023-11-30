const salesModels = require('../models/sales.models');

const getSales = async (request, response) => {
  const result = await salesModels.findAll();
  response.status(200).json(result);
};

const getSalesById = async (request, response) => {
  const { id } = request.params;
  const result = await salesModels.findById(id);
  response.status(200).json(result);
};

const createSale = async (request, response) => {
  const sale = request.body;
  const result = await salesModels.createSale(sale);
  console.log(result);
  response.status(201).json({ id: result, itemsSold: sale });
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
};
