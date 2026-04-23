const productRepository = require('./productManage-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getProducts(filters) {
  return productRepository.getAllProducts(filters);
}

async function getProductById(id) {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Product not found');
  }
  return product;
}

async function createProduct(productData) {
  const { name, price, stock, category, description } = productData;

  if (!name || !price || stock === undefined) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Name, price, and stock are required',
    );
  }
  if (price < 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Price cannot be negative',
    );
  }
  if (stock < 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Stock cannot be negative',
    );
  }

  const newProduct = await productRepository.createProduct({
    name,
    price,
    stock,
    category: category || 'Uncategorized',
    description: description || '',
  });

  return newProduct;
}

async function updateProduct(id, updateData) {
  const allowedUpdates = ['name', 'price', 'stock', 'category', 'description'];
  const filteredUpdates = {};
  for (const key of allowedUpdates) {
    if (updateData[key] !== undefined) {
      if ((key === 'price' || key === 'stock') && updateData[key] < 0) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          `${key} cannot be negative`,
        );
      }
      filteredUpdates[key] = updateData[key];
    }
  }

  const updatedProduct = await productRepository.updateProduct(
    id,
    filteredUpdates,
  );
  if (!updatedProduct) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Product not found');
  }
  return updatedProduct;
}

async function deleteProduct(id) {
  const deletedProduct = await productRepository.deleteProduct(id);
  if (!deletedProduct) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Product not found');
  }
  return deletedProduct;
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
