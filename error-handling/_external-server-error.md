## External Server Error
An external server error lets consumers of your integration know that the third party is having a rough time. Their servers or networks might be experiencing issues, this should be thrown whenever the third party returns an http status code >= 500.

```JavaScript
const { ExternalServerError } = require('@shipengine/connect-runtime');
...
throw new ExternalServerError('The third parties servers are unavailable.');
```

You can also choose to throw an error with additional details to help the platform determine when an appropriate time to start calling again would be.
```JavaScript
const { ExternalServerError } = require('@shipengine/connect-runtime');
const { apiCall } = require('@example/api');
...
const result = apiCall(...);

if(result.statusCode >= 500) {
    throw new ExternalServerError('The third parties api is not accessible at the moment', {
        externalHttpStatusCode: result.statusCode,
        externalContext: result.body
    });

```
The definition for the ExternalServerError is as follows
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

export declare class ExternalServerError extends BaseError {
    constructor(message: string, details?: ErrorDetail[] | ErrorDetail);
}
```
