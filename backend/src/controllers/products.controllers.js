const productsModels = require('../models/products.models');

const getProducts = async (request, response) => {
  const result = await productsModels.findAll();
  response.status(200).json(result);
};

const getProductById = async (request, response) => {
  const { id } = request.params;
  const [result] = await productsModels.findById(id);
  console.log(result);
  response.status(200).json({ id: result.id, name: result.name });
};

const createProduct = async (request, response) => {
  const { name } = request.body;
  const result = await productsModels.createProduct(name);
  response.status(201).json({ id: result, name });
};

const editProduct = async (request, response) => {
  const { name, id } = request.body;
  const { params } = request;
  await productsModels.editProduct(name, params.id);
  response.status(200).json({ id, name });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
};
