import { OAuthParameterDefinition } from './parameter';

export interface RefreshTokenDefinition {
  /** @description The url to refresh the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/refresh", "http://store.com/oauth/refresh" */
  urlTemplate: string;
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration during the server-server refresh token request. These are built using the content type specified in the headers array. */
  body?: OAuthParameterDefinition[];
  /** @description  */
  headers?: OAuthParameterDefinition[];
}
