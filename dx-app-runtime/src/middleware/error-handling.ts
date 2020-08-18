import logger from '../util/logger';
import { NextFunction, Request, Response } from 'express';
import {
  ErrorHttpStatusCode,
  mapErrorCodeToHttpStatusCode,
  ErrorCode,
  mapErrorCodeToCapiErrorCode,
} from '../errors';

const handleUncaughtModuleException = (error: any, response: Response) => {
  response.status(ErrorHttpStatusCode.ServerError).send({
    name: error.name || 'Server Error',
    message: error.message || 'No Details Provided',
    stack: error.stack || 'No Stack Given',
  });
};

const handleRateLimitException = (error: any, response: Response) => {
  response.status(ErrorHttpStatusCode.RateLimit).send({
    retry_after_seconds: error.retryAfter,
  });
};

const handleOtherErrors = (error: any, response: Response) => {
  const statusCode = mapErrorCodeToHttpStatusCode(error.originalCode);
  const errorCode = mapErrorCodeToCapiErrorCode(error.originalCode);
  response.status(statusCode).send({
    detailed_errors: [
      {
        message: error.message,
        standardized_error_code: errorCode,
      },
    ],
  });
};

export default (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.originalCode);
  if (error.originalCode) {
    if (error.originalCode === ErrorCode.RateLimit) {
      handleRateLimitException(error, response);
    } else {
      handleOtherErrors(error, response);
    }
  } else {
    handleUncaughtModuleException(error, response);
  }
  next(error);
};
