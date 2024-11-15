## Validation Error
A validation error can be used to let consumers of your integration know that the request they sent your integration had invalid data in one or more fields. This lets the customer know what they can update to make a successful request in the future.  This is a superset of the [Bad Request Error](#bad-request-error) and is meant to make returning validation errors easier.
You are encouraged to validate input for known requirements to avoid making third party API calls that will fail. If the validation must be performed by the third party API, a best effort should be made to interpret the API error response so that a `ValidationError` with `fieldName`(s) can be thrown.
```JavaScript
const { ValidationError } = require('@shipengine/connect-runtime');
...
throw new ValidationError('ship_to.postal_code', 'Destination postal code is a required property.');
```

You can also throw an error with multiple fields:

```JavaScript
const { ValidationError, ErrorCode } = require('@shipengine/connect-runtime');
...
throw new ValidationError([
  { fieldName: 'ship_to.postal_code', reason: 'Destination postal code is a required property.' },
  { fieldName: 'packages[0].weight_details.weight_in_ounces', reason: 'Weight must be less than 300 ounces.' },
]);
```
The definition for the ValidationError is as follows
```TypeScript
export declare class ValidationError extends BaseError {
    constructor(fields: { fieldName: string; reason: string }[]);
    constructor(fieldName: string, reason: string);
}
```
