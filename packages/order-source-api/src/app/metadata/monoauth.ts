export interface AccessToken {
  url_template: string;
}

export interface RequestTokenConfiguration {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/request", "http://store.com/oauth/request" */
  url_template: string;
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration when exchanging the code for the token. These are built using ContentType */
  body?: Parameter[];
  /** @description List of headers that are sent to the integration when requesting a token */
  headers?: Parameter[];
}

export interface RefreshTokenConfiguration {
  /** @description The url to refresh the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/refresh", "http://store.com/oauth/refresh" */
  url_template: string;
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration during the server-server refresh token request. These are built using the content type specified in the headers array. */
  body?: Parameter[];
  /** @description  */
  headers?: Parameter[];
}

export interface AuthorizationConfiguration {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/authorize", "http://store.com/oauth/authorize" */
  url_template: string;
  /** @description A list of query parameters that will be attached to the url */
  query_parameters?: Parameter[];
}

export interface Parameter {
  /** @description The name of the parameter */
  name: string;
  /** @description The value associated with the parameter */
  value: string;
}
