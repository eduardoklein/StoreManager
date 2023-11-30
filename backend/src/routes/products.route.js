const route = require('express').Router();
const productsControllers = require('../controllers/products.controllers');
const { nameExists, nameHasFiveChars } = require('../middlewares/validateName');
const { productDoesNotExist } = require('../middlewares/productDoesNotExist');

route.put(
  '/:id', 
  nameExists,
  nameHasFiveChars,
  productDoesNotExist, 
  productsControllers.editProduct,
);

route.get('/:id', productDoesNotExist, productsControllers.getProductById);

route.get('/', productsControllers.getProducts);

route.post('/', nameExists, nameHasFiveChars, productsControllers.createProduct);

module.exports = route;