const route = require('express').Router();
const salesControllers = require('../controllers/sales.controllers');
const { productIdExists, 
  quantityExists, 
  quantityGreaterThanZero, 
  doesProductExists, 
} = require('../middlewares/validateSale');

route.get('/:id', salesControllers.getSalesById);

route.get('/', salesControllers.getSales);

route.post(
  '/', 
  productIdExists, 
  quantityExists,
  quantityGreaterThanZero, 
  doesProductExists, 
  salesControllers.createSale,
);

module.exports = route;