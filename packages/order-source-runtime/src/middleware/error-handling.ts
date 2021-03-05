import logger from "../util/logger";
import { ErrorCode } from "@shipengine/connect-sdk";
import { NextFunction, Request, Response } from "express";
import { captureException } from "@sentry/node";
import { serializeError } from "serialize-error";

export enum HttpStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  RateLimit = 429,
  ServerError = 500,
  ExternalServerError = 520,
}

export const enum StandardizedErrorCode {
  Generic = "generic",
  Validation = "validation",
  Unauthorized = "external_unauthorized_error",
  ExternalServerError = "external_server_error",
  ExternalClientError = "external_client_error",
}

export function getStatusCode(code?: ErrorCode, statusCode?: number): number {
  if (!code) {
    return HttpStatusCode.ServerError;
  }

  if (code === ErrorCode.External && statusCode && statusCode >= HttpStatusCode.ServerError) {
    return HttpStatusCode.ExternalServerError;
  }

  const statusCodeMap = {
    [ErrorCode.AppError]: HttpStatusCode.ServerError,
    [ErrorCode.External]: HttpStatusCode.BadRequest,
    [ErrorCode.Invalid]: HttpStatusCode.BadRequest,
    [ErrorCode.Unauthorized]: HttpStatusCode.Unauthorized,
  };
  if (code in statusCodeMap) {
    return statusCodeMap[code];
  }

  // If we got here it means that the original error is something we don't understand
  return HttpStatusCode.ServerError;
}

export function getStandardizedErrorCode(
  code?: ErrorCode,
  statusCode?: number
): StandardizedErrorCode {
  switch (code) {
    case ErrorCode.Unauthorized:
      return StandardizedErrorCode.Unauthorized;
    case ErrorCode.Invalid:
      return StandardizedErrorCode.Validation;
    case ErrorCode.External:
      return statusCode && statusCode >= 500
        ? StandardizedErrorCode.ExternalServerError
        : StandardizedErrorCode.ExternalClientError;
    default:
      return StandardizedErrorCode.Generic;
  }
}

export default (error: any, request: Request, response: Response, next: NextFunction) => {
  const statusCode = getStatusCode(error.originalError?.code, error.originalError?.statusCode);
  if (statusCode === HttpStatusCode.ServerError) {
    logger.error(error);
    captureException(error.originalError || error);
  } else {
    logger.warn(error);
  }

  response.status(statusCode).json({
    detailed_errors: [
      {
        standardized_error_code: getStandardizedErrorCode(
          error.originalError?.code,
          error.originalError?.statusCode
        ),
        message: error?.originalError?.message || error.message,
        external_http_status_code: error?.originalError?.statusCode,
        raw_external_context: JSON.stringify(serializeError(error)),
      },
    ],
  });
};
