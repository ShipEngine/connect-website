import * as expressWinston from "express-winston";

import logger from "../util/logger";

const expressLogger = expressWinston.logger({
  winstonInstance: logger,
  requestField: "request",
  responseField: "response",
  requestWhitelist: [
    "headers.shipstation-transactionid",
    "headers.authorization",
    "body",
  ],
  responseWhitelist: [
    "headers.shipstation-transactionid",
    "headers.authorization",
    "body",
  ],
  ignoredRoutes: ["/diagnostics/readiness", "/diagnostics/liveness"],
});

export default expressLogger;
