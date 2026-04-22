const express = require('express');

const auth = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const categories = require('./components/categories/categories-route');
const supplier = require('./components/supplier/supplier-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  users(app);
  categories(app);
  supplier(app);

  return app;
};
