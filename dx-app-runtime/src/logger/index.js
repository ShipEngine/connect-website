const { createLogger, transports, format } = require("winston");

module.exports = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.logstash()
      ),
    }),
  ]
});
