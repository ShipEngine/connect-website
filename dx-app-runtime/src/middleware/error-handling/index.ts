import logger from "../../logger";
import {NextFunction, Request, Response} from "express";

export default (err: any, request: Request, response: Response, next: NextFunction) => {
  logger.error(err);
  response.status(500).send({
    detailed_errors: [
      {
        standardized_error_code: "unhandled_module_exception",
        message: "There was an uncaught exception with the module.",
        raw_external_context: JSON.stringify(err),
      },
    ],
  });
};
