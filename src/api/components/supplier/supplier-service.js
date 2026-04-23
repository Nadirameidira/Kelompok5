const supplierRepository = require('./supplier-repository');

async function getSupplier() {
  return supplierRepository.getSupplier();
}

async function supplierNameDone(name) {
  const supplier = await supplierRepository.getSupplierName(name);
  return !!supplier;
}

async function supplierEmailDone(email) {
  const supplier = await supplierRepository.getSupplierEmail(email);
  return !!supplier;
}

async function createSupplier(data) {
  return supplierRepository.createSupplier(data);
}

module.exports = {
  getSupplier,
  supplierNameDone,
  supplierEmailDone,
  createSupplier,
};
