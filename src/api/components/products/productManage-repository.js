const { Products } = require('../../../models');

async function getAllProducts(filters = {}) {
  const query = {};
  if (filters.category) {
    query.category = { $regex: filters.category, $options: 'i' };
  }
  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }
  return Products.find(query);
}

async function getProductById(id) {
  return Products.findById(id);
}

async function createProduct(productData) {
  const product = new Products(productData);
  return product.save();
}

async function updateProduct(id, updateData) {
  return Products.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
}

async function deleteProduct(id) {
  return Products.findByIdAndDelete(id);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
