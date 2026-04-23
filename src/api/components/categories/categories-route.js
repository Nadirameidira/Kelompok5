const express = require('express');

const categoriesController = require('./categories-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/categories', route);

  route.get('/', categoriesController.getCategories);
  route.post('/', categoriesController.createCategory);
};
