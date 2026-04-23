const categoriesRepository = require('./categories-repository');

async function getCategories() {
  return categoriesRepository.getCategories();
}

async function categoryNameDone(name) {
  const category = await categoriesRepository.getCategoryName(name);
  return !!category;
}

async function createCategory(name, description) {
  return categoriesRepository.createCategory(name, description);
}

module.exports = {
  getCategories,
  categoryNameDone,
  createCategory,
};
