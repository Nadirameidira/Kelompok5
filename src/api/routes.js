const express = require('express');

const transactions = require('./components/transactions/transactions-route');
const auth = require('./components/auth/auth-route');
const products = require('./components/products/productManage-route');
const users = require('./components/users/users-route');
const reportingCust = require('./components/reporting-cust/reporting-cust-route');
const categories = require('./components/categories/categories-route');
const supplier = require('./components/supplier/supplier-route');



module.exports = () => {
  const app = express.Router();

  // Mendaftarkan rute dari folder transactions
  transactions(app);
  auth(app);
  products(app);
  users(app);
  reportingCust(app);
  categories(app);
  supplier(app);
  return app;
};

// Mendaftarkan rute dari folder Product Management
