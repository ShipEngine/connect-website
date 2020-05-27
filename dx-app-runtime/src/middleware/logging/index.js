const expressWinston = require('express-winston');
const { createLogger, transports, format } = require("winston");
const redact = require('fast-redact')({
  paths: [
    'request.headers.authorization',
    'request.body.metadata.*',
    'response.body.metadata.*'
  ]
});


const redactBody = format((info, opts) => {
  if(info && info.meta) {
    info.meta = JSON.parse(redact(info.meta));
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

module.exports = expressWinston.logger({
  winstonInstance: winston,
  requestField: 'request',
  responseField: 'response',
  requestWhitelist: ['headers.shipstation-transactionid', 'headers.authorization', 'body'],
  responseWhitelist: ['headers.shipstation-transactionid', 'headers.authorization', 'body']
});
