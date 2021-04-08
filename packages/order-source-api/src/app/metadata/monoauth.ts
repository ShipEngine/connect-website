/**
 * @description OAuth Definition for Mono Auth
 */
export interface OAuthDefinition {
  /** @description Authorization: the beginning of an OAuth2.0 flow that ensures the user is logged in and approves access to the Resource. */
  Authorization: AuthorizationConfiguration;
  /** @description Request Token: server-server code for token exchange */
  RequestToken: RequestTokenConfiguration;
  /** @description Refresh Token: server-server refresh token exchange for access token **NOTE: sometimes a new RT is also created** */
  RefreshToken: RefreshTokenConfiguration;
}

export interface RequestTokenConfiguration {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/request", "http://store.com/oauth/request" */
  UrlTemplate: string;
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  Method: string;
  /** @description List of parameters that are sent to the integration when exchanging the code for the token. These are built using ContentType */
  Body: Parameter[];
  /** @description List of headers that are sent to the integration when requesting a token */
  Headers: Parameter[];
}

export interface RefreshTokenConfiguration {
  /** @description The url to refresh the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/refresh", "http://store.com/oauth/refresh" */
  UrlTemplate: string;
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  Method: string;
  /** @description List of parameters that are sent to the integration during the server-server refresh token request. These are built using the content type specified in the headers array. */
  Body: Parameter[];
  /** @description  */
  Headers: Parameter[];
}

export interface AuthorizationConfiguration {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/authorize", "http://store.com/oauth/authorize" */
  UrlTemplate: string;
  /** @description A list of query parameters that will be attached to the url */
  QueryParameters: Parameter[];
}

export interface Parameter {
  /** @description The name of the parameter */
  Name: string;
  /** @description The value associated with the parameter */
  Value: string;
}
