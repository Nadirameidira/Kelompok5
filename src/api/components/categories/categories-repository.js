const { Categories } = require('../../../models');

async function getCategories() {
  return Categories.find({});
}

async function getCategoryName(name) {
  return Categories.findOne({ name });
}

async function createCategory(name, description) {
  return Categories.create({ name, description });
}

module.exports = {
  getCategories,
  getCategoryName,
  createCategory,
};
