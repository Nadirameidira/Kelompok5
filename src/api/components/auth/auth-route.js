const express = require('express');
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/login', authController.login);
  route.post('/register', authController.register); // Nambahin ini : buat register
  route.get('/profile', authMiddleware, authController.getProfile); // Nambahin ini : buat profile, biar bisa liat email sama full name nya 
  route.put('/update-password', authMiddleware, authController.updatePassword); // Nambahin ini : buat update pw
  route.get('/protected', authMiddleware, authController.testProtected);
};