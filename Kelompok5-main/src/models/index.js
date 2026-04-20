const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

const dbExports = {};
const basename = path.basename(__filename);
let connectionPromise = null;

mongoose.connection.on('error', (error) => {
  logger.error({ err: error }, 'MongoDB connection error');
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

async function connectDatabase() {
  if (connectionPromise) {
    return connectionPromise;
  }

  if (!config.database.connection) {
    throw new Error('DB_CONNECTION is not configured in .env');
  }

  const options = {};

  if (config.database.name) {
    options.dbName = config.database.name;
  }

  connectionPromise = mongoose
    .connect(config.database.connection, options)
    .then(({ connection }) => {
      logger.info(
        `Successfully connected to MongoDB${
          config.database.name ? ` (${config.database.name})` : ''
        }`
      );
      return connection;
    })
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}

dbExports.db = mongoose.connection;
dbExports.connectDatabase = connectDatabase;

module.exports = dbExports;
