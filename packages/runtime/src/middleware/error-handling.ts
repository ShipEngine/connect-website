import { NextFunction, Request, Response } from 'express';
import logger from '../util/logger';
import { serializeError } from 'serialize-error';
import { BaseError, HttpStatusCode } from '../errors';
import { getTransactionId } from '../util/storage';

export default (error: any, request: Request, response: Response, next: NextFunction) => {
  const transactionId = getTransactionId();
  if (error.isIntentional) {
    const handledError = error as BaseError;
    response.status(handledError.statusCode).json({
      transaction_id: transactionId,
      message: handledError.message,
      detailed_errors: handledError.details?.map((detail) => {
        return {
          external_error_code: detail.externalErrorCode,
          message: detail.message || error.message,
          external_http_status_code: detail.externalHttpStatusCode,
          raw_external_context: detail.externalContext
            ? JSON.stringify(serializeError(detail.externalContext))
            : undefined,
          standardized_error_code: detail.errorCode,
        };
      }),
      retry_after_seconds: handledError.retryAfterSeconds,
      retry_after_time: handledError.retryAfterTime,
      throttling_context: handledError.throttlingContext,
    });
  } else {
    logger.error(serializeError(error));
    response.status(HttpStatusCode.ServerError).json({
      transaction_id: transactionId,
      detailed_errors: [
        {
          message: error.message,
          raw_external_context: JSON.stringify(serializeError(error)),
        },
      ],
    });
  }
  next(error);
};
