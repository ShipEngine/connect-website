require('dotenv-flow').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import * as express from "express";
import {json} from "body-parser";

import logger from "./logger";
import loadApp from './dx-apps';
import middlewareLogging from "./middleware/logging";
import routes from "./routes";
import errorHandler from "./middleware/error-handling";

const port = process.env.PORT || 3005;

process.on('uncaughtException', (err) => {
  logger.error(err.message, err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandled promise rejection',reason);
});

const server = express();

server.use(json());
server.use(middlewareLogging);
server.use(routes);
server.use(errorHandler);

loadApp().then(app => {
  server.locals.app = app;

  server.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  })
})
