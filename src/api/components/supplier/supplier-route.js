const express = require('express');

const supplierController = require('./supplier-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/supplier', route);

  route.get('/', supplierController.getSupplier);
  route.post('/', supplierController.createSupplier);
};
