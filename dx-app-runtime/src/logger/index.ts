import {createLogger, transports, format, Logger} from "winston";

const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.cli()
      ),
    }),
  ]
});

export default logger;
