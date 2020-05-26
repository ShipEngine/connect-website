export interface RegisterResponse {
  /**
   * The credentials that will be used to access this carrier's services. These will be sent
   * as a Basic Authorization header with all future requests.
   */
  credentials: Credentials;
  /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
  metadata?: { [key: string]: any } | null;
}

/**
* The credentials that will be used to access this carrier's services. These will be sent
* as a Basic Authorization header with all future requests.
*/
export interface Credentials {
  password?: null | string;
  username?: null | string;
}
