/**
 * Blob of credentials used to authorize requests to 3rd-party inventory providers.
 *
 * Inventory Apps should expect clients to provide an `Authorization` header with
 * all requests, containing a string which can be base64-decoded into a JSON object
 * of this shape.
 *
 * The precise shape of the blob will vary among 3rd-party inventory providers,
 * but these will reliably be key-value pairs where the keys are strings and the
 * values are primitives – aka no nested properties.
 */
export type RequestAuth = { [key: string]: string | number | boolean | null };

/**
 * User-defined type guard – verifies that the provided
 * object conforms to the `RequestAuth` type.
 */
export const isRequestAuth = (obj: any): obj is RequestAuth =>
  // 1) Is an object
  typeof obj === 'object' &&
  // 2) All values are any of ...
  Object.values(obj).every(
    (val) =>
      // ... null, boolean, number, or string
      ['boolean', 'number', 'string'].includes(typeof val) || val === null,
  );
