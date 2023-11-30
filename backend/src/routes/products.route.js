const route = require('express').Router();
const productsControllers = require('../controllers/products.controllers');
const { nameExists, nameHasFiveChars } = require('../middlewares/validateName');

route.put('/:id', productsControllers.editProduct);

route.get('/:id', productsControllers.getProductById);

route.get('/', productsControllers.getProducts);

route.post('/', nameExists, nameHasFiveChars, productsControllers.createProduct);

module.exports = route;