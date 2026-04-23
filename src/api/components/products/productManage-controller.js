const productService = require('./productManage-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getProducts(request, response, next) {
  try {
    const { category, name } = request.query;
    const filters = {};
    if (category) filters.category = category;
    if (name) filters.name = name;

    const products = await productService.getProducts(filters);
    return response.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return next(error);
  }
}

async function getProductById(request, response, next) {
  try {
    const { id } = request.params;
    const product = await productService.getProductById(id);
    return response.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
}

async function createProduct(request, response, next) {
  try {
    const productData = request.body;
    const newProduct = await productService.createProduct(productData);
    return response.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(request, response, next) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const updatedProduct = await productService.updateProduct(id, updateData);
    return response.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(request, response, next) {
  try {
    const { id } = request.params;
    await productService.deleteProduct(id);
    return response.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
