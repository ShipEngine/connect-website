import logger from "../util/logger";
import { NextFunction, Request, Response } from "express";
import {
  MappingError,
  ValidationError,
} from "../mapping/registry-data/errors";

export default (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error("error handling middleware: ", err);

  if (err instanceof MappingError) {
    response.status(500).json({
      detailed_errors: [
        {
          standardized_error_code: "mapping_error",
          message: err.message,
          details: { ...err },
        },
      ],
    });
    return;
  }

  if (err instanceof ValidationError) {
    response.status(500).json({
      detailed_errors: [
        {
          standardized_error_code: "validation_error",
          message: err.message,
          details: { ...err },
        },
      ],
    });
    return;
  }

  response.status(500).json({
    detailed_errors: [
      {
        standardized_error_code: "unhandled_module_exception",
        message: "There was an uncaught exception with the module.",
        raw_external_context: err,
      },
    ],
  });
};
