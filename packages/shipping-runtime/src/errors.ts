export enum ErrorCode {
	UnAuthorized = 'ERR_UNAUTHORIZED',
	RateLimit = 'ERR_RATE_LIMIT',
	NotSupported = 'NOT_SUPPORTED',
	AppError = 'ERR_APP_ERROR',
	Invalid = 'ERR_INVALID',
	External = 'ERR_EXTERNAL',
}

export class NotSupported extends Error {
	code: ErrorCode;
	constructor(endpointName: string) {
		super();
		this.code = ErrorCode.NotSupported;
		this.message = `${endpointName} is not supported by this app.`;
	}
}
