## Unauthorized Error
An unauthorized error lets users know that their credentials have either expired or are incorrect. This can help our platform handle token refresh scenarios for oauth, as well as our support trouble shoot issues with customers credentials.

```JavaScript
const { UnauthorizedError } = require('@shipengine/connect-runtime');
...
throw new UnauthorizedError('The access token provided has expired');
```
You can also choose to throw an error with additional information for logging purposes.

```JavaScript
const { UnauthorizedError, ErrorCode } = require('@shipengine/connect-runtime');
const { apiCall } = require('@example/api');
...
const result = apiCall(...);
const { status, message } = result.body;

if(result.statusCode === 401) {
    const { errors } = result.body;
    const detailedErrors = errors.map(error => {
        return {
            externalErrorCode: error.CODE,
            message: error.WARNING,
            externalHttpStatusCode: result.statusCode,
            externalContext: error,
            errorCode: ErrorCode.ExternalClientError
        };
    })
    throw new UnauthorizedError(message, detailedErrors);
}
```
The definition for the UnauthorizedError is as follows
```TypeScript
export interface ErrorDetail {
    /** The error code associated with the third parties system.
     * Useful for support to coordinate with third parties. */
    externalErrorCode?: string;
    /** The human readable message associated with this error */
    message?: string;
    /** The external http status code if applicable */
    externalHttpStatusCode?: number;
    /** Any object that might be useful in logs associated with this error */
    externalContext?: any;
    /** A standardized error code */
    errorCode?: ErrorCode;
}

export declare class UnauthorizedError extends BaseError {
    constructor(message: string, details?: ErrorDetail[] | ErrorDetail);
}
```
