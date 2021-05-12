/** @description Error codes for DetailedError */
export enum StandardizedErrorCode {
  Generic = 0,
  Serialization = 1,
  UnhandledModuleException = 2,
  Validation = 3,
  ExternalBadRequest = 400,
  ExternalUnauthorized = 401,
  ExternalUnprocessableEntity = 422,
  ExternalTooManyRequests = 429,
  ExternalNotImplemented = 501,
  ExternalBadGateway = 502,
  ExternalServiceUnavailable = 503,
  ExternalGatewayTimeout = 504,
  ExternalServerError = 520,
}
