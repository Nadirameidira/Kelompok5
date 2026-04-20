const repository = require('./reporting-cust-repository');

async function registerCustomer(data) {
  return repository.createCustomer(data);
}

async function getAllCustomers() {
  return repository.getCustomers();
}

async function getDailyReport() {
  const transactions = await repository.getDailyTransactions();
  // total_price sesuai schema Dimas
  const totalRevenue = transactions.reduce((acc, curr) => acc + (curr.total_price || 0), 0);

  return {
    date: new Date().toDateString(),
    total_transactions: transactions.length,
    total_revenue: totalRevenue,
    currency: 'IDR'
  };
}

async function getStockAlert() {
  return repository.getLowStockProducts();
}

module.exports = {
  registerCustomer,
  getAllCustomers,
  getDailyReport,
  getStockAlert,
};