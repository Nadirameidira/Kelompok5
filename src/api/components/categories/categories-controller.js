const categoriesService = require('./categories-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getCategories(request, response, next) {
  try {
    const categories = await categoriesService.getCategories();

    return response.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
}

async function createCategory(request, response, next) {
  try {
    const { name, description } = request.body;

    if (!name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name isnt valid.');
    }

    if (await categoriesService.categoryNameDone(name)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Category name already existed.'
      );
    }

    const category = await categoriesService.createCategory(name, description);

    return response.status(201).json(category);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCategories,
  createCategory,
};
