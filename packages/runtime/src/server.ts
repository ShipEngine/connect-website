import { BaseError } from "./errors";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import logger from "./util/logger";
import { getRoutes } from "./routes";
import { App } from "./app";
import { serializeError } from "serialize-error";

process.on("uncaughtException", (err) => {
  logger.error(err.message, err);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled promise rejection", reason);
});

export enum Environment {
  Local = "local",
  Development = "development",
  Stage = "staging",
  Production = "production",
}

/**
 * @description The implementation and settings necessary for the server to start
 */
export interface ServerConfig {
  /**
   * @description The desired port for this server to run on
   * @default "3005"
   */
  port?: string;
  /**
   * @description The environment this server is currently running on
   * @default "local"
   */
  environment?: Environment | string;
}

export const captureException = (exception: any) => {
  logger.error(serializeError(exception));
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(exception);
  } else {
    logger.debug("captureException did not create an alert");
  }
};

const initializeEnvironmentVariables = (config?: ServerConfig) => {
  process.env.NODE_ENV = process.env.NODE_ENV || config?.environment || Environment.Local;
  process.env.PORT = process.env.PORT || config?.port || "3005";
  process.env.NEW_RELIC_NO_CONFIG_FILE = process.env.NEW_RELIC_NO_CONFIG_FILE || "true";
  process.env.NEW_RELIC_APP_NAME = process.env.NEW_RELIC_APP_NAME || "custom-store-template";

  logger.info("Initializing Environment Variables");
  logger.info("##################################################################");
  logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
  logger.info(`PORT=${process.env.PORT}`);
  logger.info(`SENTRY_DSN=${process.env.SENTRY_DSN}`);
  logger.info(`NEW_RELIC_NO_CONFIG_FILE=${process.env.NEW_RELIC_NO_CONFIG_FILE}`);
  logger.info(`NEW_RELIC_APP_NAME=${process.env.NEW_RELIC_APP_NAME}`);
  logger.info("##################################################################");
};
/**
 * This method starts a server that can handle Order Source API Requests
 * @param config
 */
export const start = (app: App, config?: ServerConfig) => {
  initializeEnvironmentVariables(config);
  require("newrelic");
  const express = require("express");
  const server = express();

  if (process.env.SENTRY_DSN) {
    logger.info(`Initializing Sentry: DSN ${process.env.SENTRY_DSN} ENV ${process.env.NODE_ENV}`);
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.GIT_SHA,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: server }),
      ],
    });
    server.use(Sentry.Handlers.requestHandler());
    server.use(Sentry.Handlers.tracingHandler());
  }

  const bodyParser = require("body-parser");
  const middlewareLogging = require("./middleware/logging");
  const errorHandler = require("./middleware/error-handling");
  server.use(bodyParser.json());
  server.use(middlewareLogging.default);
  server.use(getRoutes(app));
  if (process.env.SENTRY_DSN) {
    server.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
          const handledError = error as BaseError;
          return handledError.isIntentional !== true;
        },
      })
    );
  }
  server.use(errorHandler.default);
  server.listen(process.env.PORT, () => {
    logger.info(`Server started http://localhost:${process.env.PORT}/diagnostics/liveness`);
  });
};
