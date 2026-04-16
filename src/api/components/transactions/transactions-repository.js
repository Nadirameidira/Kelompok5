// Asumsi model Transaction didefinisikan di folder models
const { Transaction } = require('../../../models');

async function getTransactions() {
  // Mengambil semua riwayat transaksi (History)
  return Transaction.findAll();
}

async function createTransaction(transactionsData) {
  // Memproses pembayaran (Checkout)
  return Transaction.create(transactionsData);
}

async function getTransactionById(id) {
  // Melihat detail item transaksi tertentu (Detail/Cetak Struk)
  return Transaction.findByPk(id);
}

async function deleteTransaction(id) {
  // Membatalkan transaksi (Void)
  return Transaction.destroy({
    where: { id: id }
  });
}

module.exports = {
  getTransactions,
  createTransaction,
  getTransactionById,
  deleteTransaction,
};