const express = require('express');
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/login', authController.login);
  route.get('/profile', authMiddleware, authController.getProfile);
  route.put('/update-password', authMiddleware, authController.updatePassword);
  route.get('/protected', authMiddleware, authController.testProtected);
};