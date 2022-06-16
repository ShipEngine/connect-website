## Bad Request Error
A bad request error can be used to let consumers of your integration know that the request they sent your integration was either missing information, or was not a valid request. This lets the customer know what they can update to make a successful request in the future.

```JavaScript
const { BadRequestError } = require('@shipengine/connect-runtime');
...
throw new BadRequestError('Destination zip code is a required property.');
```

You can also choose to throw an error with additional information for logging purposes.

```JavaScript
const { BadRequestError, ErrorCode } = require('@shipengine/connect-runtime');
const { apiCall } = require('@example/api');
...
const result = apiCall(...);
const { status, message } = result.body;

if(status === 'bad-request') {
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
    throw new BadRequestError(message, detailedErrors);
}
```
The definition for the BadRequestError is as follows
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

export declare class BadRequestError extends BaseError {
    constructor(message: string, details?: ErrorDetail[] | ErrorDetail);
}
```
