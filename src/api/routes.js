const express = require('express');

const transactions = require('./components/transactions/transactions-route');
const auth = require('./components/auth/auth-route');
const users = require('./components/users/users-route');
const reportingCust = require('./components/reporting-cust/reporting-cust-route');


module.exports = () => {
  const app = express.Router();

  // Mendaftarkan rute dari folder transactions
  transactions(app);
  auth(app);
  users(app);
  reportingCust(app);
  return app;
};