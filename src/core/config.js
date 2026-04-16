require('dotenv').config();

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = {
  env: process.env.NODE_ENV,
  port: Number.parseInt(process.env.PORT, 10) || 3000,
  api: {
    prefix: '/api',
  },
  database: {
    connection: process.env.DB_CONNECTION || '',
    name: process.env.DB_NAME || '',
  },
};
