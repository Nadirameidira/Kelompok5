const service = require('./reporting-cust-service');

async function getDailyReport(req, res, next) {
  try {
    const report = await service.getDailyReport();
    return res.status(200).json(report);
  } catch (error) {
    next(error);
  }
}

async function getLowStock(req, res, next) {
  try {
    const data = await service.getStockAlert();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function getCustomers(req, res, next) {
  try {
    const data = await service.getAllCustomers();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function registerCustomer(req, res, next) {
  try {
    const data = await service.registerCustomer(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDailyReport,
  getLowStock,
  getCustomers,
  registerCustomer,
};