/* eslint-disable @typescript-eslint/no-var-requires */
// ^ we have some weird things to do because of the way NewRelic works
require("dotenv-flow").config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import * as Sentry from "@sentry/node";
import logger from "./util/logger";
import loadApp from "./dx-apps";

process.on("uncaughtException", (err) => {
  logger.error(err.message, err);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled promise rejection", reason);
});

loadApp().then((app) => {
  const os = require("os");
  const env = process.env.NODE_ENV?.startsWith("prod") ? "k8s" : os.hostname();
  const newRelicAppName = [
    `dip-${app.name.replace(/\s/, "-")} [${env}]`,
    "dx-order-source-runtime",
  ];
  process.env.NEW_RELIC_APP_NAME = newRelicAppName.join(",");

  require("newrelic");
  const port = process.env.PORT || 3006;
  const express = require("express");

  const server = express();

  if (process.env.SENTRY_DSN) {
    logger.info(`Initializing Sentry: ${process.env.SENTRY_DSN}`);
    Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV });
  }

  const bodyParser = require("body-parser");
  const middlewareLogging = require("./middleware/logging");
  const routes = require("./routes");
  const errorHandler = require("./middleware/error-handling");
  server.use(bodyParser.json());
  server.use(middlewareLogging.default);
  server.use(routes.default);
  server.use(errorHandler.default);

  server.locals.app = app;

  server.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
});
