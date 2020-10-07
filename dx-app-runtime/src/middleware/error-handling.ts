import { NextFunction, Request, Response } from 'express';
import {
  ErrorCode,
} from '../errors';
import { captureException } from '@sentry/node';

export enum HttpStatusCode {
  BadRequest = 400,
  UnAuthorized = 401,
  NotFound = 404,
  RateLimit = 429,
  ServerError = 500,
  ExternalServerError = 520,
}
export const enum StandardizedErrorCode {
  Generic = 'generic',
  Validation = 'validation',
  UnAuthorized = 'external_unauthorized_error',
  ExternalServerError = 'external_server_error',
  ExternalClientError = 'external_client_error',
}

export const formatErrorMessage = (error: any, standardErrorCode: StandardizedErrorCode) => {
  const mergeStringArray = (value?: string[]) : string | undefined => {
    if(!Array.isArray(value)) {
      return undefined;
    }
    return value.join(', ');
  }
  return {
    "errors": [error.message || error?.originalError?.message],
    "detailed_errors": [
      {
        "standardized_error_code": standardErrorCode,
        "external_error_code": mergeStringArray(error?.originalError?.externalErrors),
        "message": error.message || error?.originalError?.message,
        "external_http_status_code": error?.originalError?.statusCode,
        "raw_external_context": JSON.stringify(error)
      }
    ]
  }
}

export const getStatusCode = (code?: ErrorCode, statusCode?: number): number => {
  if(!code) {
    return HttpStatusCode.ServerError;
  }
  const statusCodeMap = {
    [ErrorCode.AppError]: HttpStatusCode.BadRequest,
    [ErrorCode.External]: HttpStatusCode.BadRequest,
    [ErrorCode.Invalid]: HttpStatusCode.BadRequest,
    [ErrorCode.NotSupported]: HttpStatusCode.NotFound,
    [ErrorCode.RateLimit]: HttpStatusCode.RateLimit,
    [ErrorCode.UnAuthorized]: HttpStatusCode.UnAuthorized
  }
  if(code === ErrorCode.External && statusCode && statusCode >= HttpStatusCode.ServerError) {
    return HttpStatusCode.ExternalServerError;
  }
  return code in statusCodeMap ? statusCodeMap[code] : HttpStatusCode.BadRequest;
}

export const getStandardizedErrorCode = (code?: ErrorCode, statusCode?: number): StandardizedErrorCode => {
  switch(code) {
    case ErrorCode.UnAuthorized:
      return StandardizedErrorCode.UnAuthorized;
    case ErrorCode.Invalid:
      return StandardizedErrorCode.Validation;
    case ErrorCode.External:
      return statusCode && statusCode >= 500 ? StandardizedErrorCode.ExternalServerError : StandardizedErrorCode.ExternalClientError;
    default:
      return StandardizedErrorCode.Generic;
  }
}

// TODO: Bother DX About Rate Limit Shape
export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = getStatusCode(error.originalError?.code, error.originalError?.statusCode);
  const standartizedErrorCode = getStandardizedErrorCode(error.originalError?.code, error.originalError?.statusCode);
  const errorMessage = formatErrorMessage(error, standartizedErrorCode);
  if(statusCode === HttpStatusCode.ServerError) {
    captureException(error.originalError);
  }
  response.status(statusCode).send(errorMessage);
  next(error);
};
