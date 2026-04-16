const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');
const server = require('./core/server');
const { connectDatabase, db } = require('./models');

let app;

async function shutdown(exitCode, signal) {
  if (signal) {
    logger.info({ signal }, 'Shutting down application');
  }

  if (app) {
    await new Promise((resolve, reject) => {
      app.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  if (db.readyState !== 0) {
    await db.close();
  }

  process.exit(exitCode);
}

async function handleFatalError(error, origin) {
  logger.fatal({ err: error, origin }, 'Fatal application error');

  try {
    await shutdown(1, origin);
  } catch (shutdownError) {
    logger.fatal(
      { err: shutdownError },
      'Failed to shut down cleanly after fatal error'
    );
    process.exit(1);
  }
}

process.on('uncaughtException', (error) => {
  handleFatalError(error, 'uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  handleFatalError(error, 'unhandledRejection');
});

process.on('SIGINT', () => {
  shutdown(0, 'SIGINT').catch((error) => {
    logger.fatal({ err: error }, 'Failed to shut down application');
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  shutdown(0, 'SIGTERM').catch((error) => {
    logger.fatal({ err: error }, 'Failed to shut down application');
    process.exit(1);
  });
});

async function startServer() {
  await connectDatabase();

  app = server.listen(port, () => {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  });

  app.on('error', (error) => {
    handleFatalError(error, 'server.listen');
  });
}

startServer().catch((error) => {
  logger.fatal({ err: error }, 'Application failed to start');
  process.exit(1);
});
