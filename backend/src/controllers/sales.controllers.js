const salesModels = require('../models/sales.models');

const getSales = async (request, response) => {
  const result = await salesModels.findAll();
  console.log(result);
  const resultOrganized = result.map((sale) => ({
    saleId: sale.salesId,
    date: sale.date,
    productId: sale.productId,
    quantity: sale.quantity,
  }));
  response.status(200).json(resultOrganized);
};

const getSalesById = async (request, response) => {
  const { id } = request.params;
  const result = await salesModels.findById(id);
  const resultOrganized = result.map((sale) => ({
    date: sale.date,
    productId: sale.productId,
    quantity: sale.quantity,
  }));
  response.status(200).json(resultOrganized);
};

const createSale = async (request, response) => {
  const sale = request.body;
  const result = await salesModels.createSale(sale);
  response.status(201).json({ id: result, itemsSold: sale });
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
};
