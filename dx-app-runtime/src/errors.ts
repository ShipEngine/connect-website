export enum CapiErrorCodes {
  Generic = 'generic',
  Validation = 'validation',
  UnAuthorized = 'external_unauthorized_error',
  ExternalServerError = 'external_server_error',
  ExternalClientError = 'external_client_error',
}

export enum ErrorCode {
  InvalidInput = 'ERR_INVALID',
  BadRequest = 'ERR_BAD_REQUEST',
  UnAuthorized = 'ERR_UNAUTHORIZED',
  RateLimit = 'ERR_RATE_LIMIT',
  ExternalServerError = 'ERR_EXTERNAL_SERVER_ERROR',
  NotSupported = 'NOT_SUPPORTED',
}

export enum ErrorHttpStatusCode {
  BadRequest = 400,
  UnAuthorized = 401,
  NotSupported = 404,
  RateLimit = 429,
  ServerError = 500,
  ExternalServerError = 520,
}

export const mapErrorCodeToHttpStatusCode = (
  code: ErrorCode
): ErrorHttpStatusCode => {
  switch (code) {
    case ErrorCode.ExternalServerError:
      return ErrorHttpStatusCode.ExternalServerError;
    case ErrorCode.InvalidInput:
    case ErrorCode.BadRequest:
      return ErrorHttpStatusCode.BadRequest;
    case ErrorCode.NotSupported:
      return ErrorHttpStatusCode.NotSupported;
    case ErrorCode.RateLimit:
      return ErrorHttpStatusCode.RateLimit;
    case ErrorCode.UnAuthorized:
      return ErrorHttpStatusCode.UnAuthorized;
    default:
      return ErrorHttpStatusCode.BadRequest;
  }
};

export const mapErrorCodeToCapiErrorCode = (
  code: ErrorCode
): CapiErrorCodes => {
  switch (code) {
    case ErrorCode.ExternalServerError:
      return CapiErrorCodes.ExternalServerError;
    case ErrorCode.InvalidInput:
      return CapiErrorCodes.Validation;
    case ErrorCode.BadRequest:
      return CapiErrorCodes.ExternalClientError;
    case ErrorCode.UnAuthorized:
      return CapiErrorCodes.UnAuthorized;
    default:
      return CapiErrorCodes.Generic;
  }
};

export class NotSupported extends Error {
  code: ErrorCode;
  constructor(endpointName: string) {
    super();
    this.code = ErrorCode.NotSupported;
    this.message = `${endpointName} is not supported by this app.`;
  }
}

export class InvalidInput extends Error {
  code: ErrorCode;
  constructor(message: string) {
    super(message);
    this.code = ErrorCode.InvalidInput;
  }
}
