const express = require('express');

const transactions = require('./components/transactions/transactions-route');
const auth = require('./components/auth/auth-route');
const users = require('./components/users/users-route');
const categories = require('./components/categories/categories-route');
const supplier = require('./components/supplier/supplier-route');
const reportingCust = require('./components/reporting-cust/reporting-cust-route')



module.exports = () => {
  const app = express.Router();

  // Mendaftarkan rute dari folder transactions
  transactions(app);
  auth(app);
  users(app);
  categories(app);
  supplier(app);
  reportingCust(app);
  return app;
};

// Mendaftarkan rute dari folder Product Management
