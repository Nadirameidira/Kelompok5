const { Supplier } = require('../../../models');

async function getSupplier() {
  return Supplier.find({});
}

async function getSupplierName(name) {
  return Supplier.findOne({ name });
}

async function getSupplierEmail(email) {
  return Supplier.findOne({ email });
}

async function createSupplier(data) {
  return Supplier.create(data);
}

module.exports = {
  getSupplier,
  getSupplierName,
  getSupplierEmail,
  createSupplier,
};
