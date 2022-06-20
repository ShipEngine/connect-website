## Rate Limit Error
A rate limit error lets our platform know that the external api is requesting that we slow down on making requests. This can often times be found in the form of an http status code `429 - Too Many Requests`. 

```JavaScript
const { RateLimitError } = require('@shipengine/connect-runtime');
...
throw new RateLimitError('The third party requests you slow your roll.');
```

You can also choose to throw an error with additional details to help the platform determine when an appropriate time to start calling again would be.

```JavaScript
const { RateLimitError } = require('@shipengine/connect-runtime');
const { apiCall } = require('@example/api');
...
const result = apiCall(...);
const { seconds_until_retry } = result.body;

if(result.statusCode === 429) {
    const { errors } = result.body;
    const rateLimitDetails = {
        retryAfterSeconds: seconds_until_retry,
        throttlingContext: result.body,
    }
    throw new RateLimitError(message, rateLimitDetails);

```
The definition for the RateLimitError is as follows
```TypeScript
export interface RateLimitDetails {
    retryAfterSeconds?: number;
    retryAfterTime?: string;
    throttlingContext?: any;
}

export declare class RateLimitError extends BaseError {
    constructor(message: string, details?: RateLimitDetails);
}
```
