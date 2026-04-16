const express = require('express');
const transactions = require('./components/transactions/transactions-route');

module.exports = () => {
  const app = express.Router();

  // Mendaftarkan rute dari folder transactions
  transactions(app);

  return app;
};