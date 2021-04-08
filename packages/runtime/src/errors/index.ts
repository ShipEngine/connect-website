export enum ErrorCode {
  Generic = "generic",
  Serialization = "serialization",
  Validation = "validation",
  ExternalClientError = "external_client_error",
}

export const enum HttpStatusCode {
  NotFound = 404,
  BadRequest = 400,
  UnAuthorized = 401,
  TooManyRequests = 429,
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

export interface ErrorDetail {
  externalErrorCode?: string;
  message?: string;
  externalHttpStatusCode?: number;
  externalContext?: any;
  errorCode?: ErrorCode;
}

export class BaseError extends Error {
  statusCode: number;
  details?: ErrorDetail[];
  retryAfterSeconds?: number;
  retryAfterTime?: string;
  throttlingContext: any;
  isIntentional: boolean = true;
  constructor(statusCode: number, message: string, details?: ErrorDetail[] | ErrorDetail) {
    super(message);
    this.statusCode = statusCode;
    if (details) {
      this.details = Array.isArray(details) ? details : [details];
    }
  }
}

/** @description This error is used to describe an endpoint that has not yet been implemented */
export class NotImplementedError extends BaseError {
  constructor() {
    super(HttpStatusCode.NotFound, "This endpoint is not implemented");
  }
}

/** @description This error is used to describe a bad client request (either from internal validation or 3rd party API's) */
export class BadRequestError extends BaseError {
  constructor(message: string, details?: ErrorDetail[] | ErrorDetail) {
    super(HttpStatusCode.BadRequest, message, details);
  }
}

/** @description This error is used to describe an authorization issue with the 3rd parties API's */
export class UnauthorizedError extends BaseError {
  constructor(message: string, details?: ErrorDetail[] | ErrorDetail) {
    super(HttpStatusCode.UnAuthorized, message, details);
  }
}

/** @description Details related to a rate limit error */
export interface RateLimitDetails {
  retryAfterSeconds?: number;
  retryAfterTime?: string;
  throttlingContext?: any;
}

/** @description This error is used to describe when we recieve a 429 "too many requests" response from 3rd party API's */
export class RateLimitError extends BaseError {
  constructor(message: string, details?: RateLimitDetails) {
    super(HttpStatusCode.TooManyRequests, message);
    this.retryAfterSeconds = details?.retryAfterSeconds;
    this.retryAfterTime = details?.retryAfterTime;
    this.throttlingContext = details?.throttlingContext;
  }
}

/** @description This error is used to describe when we recieve any 5XX errors from external servers */
export class ExternalServerError extends BaseError {
  constructor(message: string, details?: ErrorDetail[] | ErrorDetail) {
    super(HttpStatusCode.ExternalServerError, message, details);
  }
}
