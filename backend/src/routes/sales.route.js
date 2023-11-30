const route = require('express').Router();
const salesControllers = require('../controllers/sales.controllers');
const { saleDoesNotExist } = require('../middlewares/saleDoesNotExist');
const { productIdExists, 
  quantityExists, 
  quantityGreaterThanZero, 
  doesProductExists, 
} = require('../middlewares/validateSale');

route.get('/:id', saleDoesNotExist, salesControllers.getSalesById);

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