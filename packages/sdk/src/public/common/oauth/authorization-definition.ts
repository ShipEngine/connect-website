import { OAuthParameterDefinition } from './parameter';

export interface AuthorizationDefinition {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/authorize", "http://store.com/oauth/authorize" */
  urlTemplate: string;
  /** @description A list of query parameters that will be attached to the url */
  queryParameters: OAuthParameterDefinition[];
}
