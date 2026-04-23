const express = require('express');
const productController = require('./productManage-controller');

module.exports = (app) => {
  const route = express.Router();
 app.use('/products', route);
  route.get('/', productController.getProducts);
  route.get('/:id', productController.getProductById);
  route.post('/', productController.createProduct);
  route.put('/:id', productController.updateProduct);
  route.delete('/:id', productController.deleteProduct);
};
