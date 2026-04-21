const { Customers, Transactions, Books } = require('../../../models');

async function createCustomer(data) {
  return Customers.create(data);
}

async function getCustomers() {
  return Customers.find().sort({ name: 1 });
}

async function getDailyTransactions() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // transaction_date & status: 'Success!' 
  return Transactions.find({
    transaction_date: { $gte: start, $lte: end },
    status: 'Success!'
  });
}

async function getLowStockProducts() {
  return Books.find({ stock: { $lt: 10 } }); 
}

module.exports = {
  createCustomer,
  getCustomers,
  getDailyTransactions,
  getLowStockProducts,
};