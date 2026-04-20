const express = require('express');
const controller = require('./reporting-cust-controller');
const route = express.Router();

module.exports = (app) => {
  app.use('/reports-customers', route);

  route.get('/daily', controller.getDailyReport);
  route.get('/low-stock', controller.getLowStock);
  route.get('/list', controller.getCustomers);
  route.post('/register', controller.registerCustomer);
};