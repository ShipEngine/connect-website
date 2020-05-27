const logger = require("../../logger");

module.exports = (err, req, res, next) => {
  logger.error(err);
  res.status(500).send({
    detailed_errors: [
      {
        standardized_error_code: "unhandled_module_exception",
        message: "There was an uncaught exception with the module.",
        raw_external_context: JSON.stringify(err),
      },
    ],
  });
};
