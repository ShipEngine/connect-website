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
