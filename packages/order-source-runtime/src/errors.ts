export class EndpointNotSupportedError extends Error {
  statusCode = 404;
  body: string;
  constructor(endpointName: string) {
    super();
    this.name = 'EndpointNotSupported';
    this.message = this.body = `${endpointName} is not supported by this app.`;
  }
}
