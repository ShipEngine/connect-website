/* eslint-disable @typescript-eslint/no-var-requires */
// ^ we have some weird things to do because of the way NewRelic works
require('dotenv-flow').config();
import * as Sentry from '@sentry/node';
import logger from './util/logger';
import loadApp from './dx-app';

process.on('uncaughtException', (err) => {
  logger.error(err.message, err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandled promise rejection', reason);
});

const initializeEnvironmentVariables = (app: any) => {
  const { hostname } = require('os');
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.SENTRY_DSN = process.env.SENTRY_DSN || '';
  process.env.PORT = process.env.PORT || '3005';
  process.env.HOST = process.env.NODE_ENV?.startsWith('prod')
    ? 'k8s'
    : hostname();
  process.env.NEW_RELIC_APP_NAME =
    process.env.NEW_RELIC_APP_NAME ||
    `dip-${app.name.replace(/\s/, '-')} [${
      process.env.HOST
    }],dx-carrier-runtime`;
  process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
};

const logEnvironmentVariables = () => {
  const { NODE_ENV, SENTRY_DSN, PORT, HOST, NEW_RELIC_APP_NAME } = process.env;
  const environmentMessage =
    'Environment Variables\n' +
    '----------------------\n' +
    `NODE_ENV: ${NODE_ENV || ''}\n` +
    `SENTRY_DSN: ${SENTRY_DSN || ''}\n` +
    `PORT: ${PORT}\n` +
    `HOST: ${HOST}\n` +
    `NEW_RELIC_APP_NAME: ${NEW_RELIC_APP_NAME}\n` +
    `LOG_LEVEL: ${process.env.LOG_LEVEL}\n` +
    '----------------------';
  logger.info(environmentMessage);
};

loadApp().then((app) => {
  initializeEnvironmentVariables(app);
  logEnvironmentVariables();

  const { SENTRY_DSN, PORT, NODE_ENV } = process.env;

  require('newrelic');
  const express = require('express');
  const bodyParser = require('body-parser');
  const middlewareLogging = require('./middleware/logging');
  const routes = require('./routes');
  const { errorHandler } = require('./middleware/error-handling');

  const server = express();
  if (SENTRY_DSN) {
    logger.info(`Initializing Sentry: ${SENTRY_DSN}`);
    Sentry.init({ dsn: SENTRY_DSN, environment: NODE_ENV });
    server.use(Sentry.Handlers.errorHandler());
  }
  server.use(
    bodyParser.json({
      limit: '30mb',
    }),
  );
  server.use(middlewareLogging.default);
  server.use(routes.default);
  server.use(errorHandler);

  server.locals.app = app;

  server.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
});
