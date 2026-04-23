const express = require('express');
const transactionsController = require('./transactions-controller');

const route = express.Router();

module.exports = (app) => {

  app.use('/transactions', route);

  //1.ini untuk menampilkan riwayat transaksi, bisa diakses oleh admin dan kasir
  route.get('/history', transactionsController.getTransactions);

  //2.ini untuk melakukan checkout, hanya bisa diakses oleh kasir
  route.post('/checkout', transactionsController.createTransactions);

  //3.ini untuk menampilkan detail transaksi berdasarkan ID, bisa diakses oleh admin dan kasir
  route.get('/:id', transactionsController.getTransactionById);

  //4.ini untuk membatalkan transaksi, hanya bisa diakses oleh kasir
  route.delete('/:id', transactionsController.voidTransaction);
};