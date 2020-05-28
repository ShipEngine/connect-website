import * as expressWinston from "express-winston";

import { createLogger, transports, format } from "winston";
import * as redact from "fast-redact";

const redactor = redact({
  paths: [
    'request.headers.authorization',
    'request.body.metadata.*',
    'response.body.metadata.*'
  ]
});

const redactBody = format((info, opts) => {
  if(info && info.meta) {
    info.meta = JSON.parse(redactor(info.meta));
  }
  return info;
})

const winston = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        redactBody(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.logstash()
      ),
    }),
  ]
});

const logger = expressWinston.logger({
  winstonInstance: winston,
  requestField: 'request',
  responseField: 'response',
  requestWhitelist: ['headers.shipstation-transactionid', 'headers.authorization', 'body'],
  responseWhitelist: ['headers.shipstation-transactionid', 'headers.authorization', 'body']
});

export default logger;
