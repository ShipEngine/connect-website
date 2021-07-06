import { OAuthParameterDefinition } from './parameter';

export interface RequestTokenDefinition {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/request", "http://store.com/oauth/request" */
  urlTemplate: string;
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration when exchanging the code for the token. These are built using ContentType */
  body?: OAuthParameterDefinition[];
  /** @description List of headers that are sent to the integration when requesting a token */
  headers?: OAuthParameterDefinition[];
}
