export interface AccessTokenDefinition {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/request", "http://store.com/oauth/request" */
  urlTemplate: string;
}
