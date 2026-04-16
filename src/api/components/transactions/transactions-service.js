const transactionsRepository = require('./transactions-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

//buat lihat riwayat transaksi
async function getTransactions() {
  const transactions = await transactionsRepository.getTransactions();
  return transactions;
}

//buat proses checkout transaksi baru dan mengurangi stok
async function createTransaction(transactionsData) {

  //Validasi sesuai kebutuhan kasir
  if (!transactionsData || !transactionsData.items || transactionsData.items.length === 0) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Data transaksi tidak valid');
  }
}
// 3. Melihat detail item dalam satu transaksi tertentu
async function getTransactionById(id) {
  const transaction = await transactionsRepository.getTransactionById(id);
  if (!transaction) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Transaksi tidak ditemukan');
  }
  
  return transaction;
}

// 4.ini buat membatalkan transaksi
async function deleteTransaction(id) {
  const transaction = await transactionsRepository.getTransactionById(id);
  
  if (!transaction) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Transaksi tidak ditemukan, gagal membatalkan');
  }

  return await transactionsRepository.deleteTransaction(id);
}

module.exports = {
  getTransactions,
  createTransaction,
  getTransactionById,
  deleteTransaction,
};