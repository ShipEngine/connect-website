import Joi from 'joi';

export interface Parameter {
  /** @description The name of the parameter */
  name: string;
  /** @description The value associated with the parameter */
  value: string;
}

export const MethodSchema = Joi.string().valid(
  'GET',
  'POST',
  'DELETE',
  'PUT',
  'get',
  'post',
  'delete',
  'put',
);

export const ParameterSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().required(),
});

export interface DateTimeConfiguration {
  /** @description JSONPath to the JSON element containing the date-time */
  path: string;
  /** @description DateTime format string compliant with
   * https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings */
  date_time_format: string;
}

export const DateTimeConfigurationSchema = Joi.object({
  path: Joi.string().required(),
  date_time_format: Joi.string().required(),
});

export type MapOfStrings = {
  [key: string]: string;
};

/** @description Optional configuration to take full control of parsing and extracting fields
 * from the integration's JSON response body.
 * Note for JSONPath: strings not starting with $ are interpreted as string literals
 */
export interface ResponseTransformationConfiguration {
  /** @description JSONPath to the JSON element for access_token. */
  access_token: string;
  /** @description JSONPath to the JSON element for token_type */
  token_type: string;
  /** @description JSONPath to the JSON element for refresh_token */
  refresh_token?: string;
  /** @description JSONPath to the JSON element for expires_in. Mutually exclusive with expires_at */
  expires_in?: string;
  /** @description Configuration for parsing a date-time, when the integration is lacking expires_in.
   * Mutually exclusive with expires_in.
   */
  expires_at?: DateTimeConfiguration;
  /** @description Optional collection of properties to include in the connection_context sent back with the auth flow result.
   *  Property value may be JSONPath or a string literal.
   *  E.g.
   *  "connection_context": {
   *    "store_id": "$.data.store_id"
   *  }
   */
  connection_context?: MapOfStrings;
}

export const MapOfStringsSchema = Joi.object().pattern(
  Joi.string(),
  Joi.string(),
);

export const ResponseTransformationConfigurationSchema = Joi.object({
  access_token: Joi.string().required(),
  token_type: Joi.string().required(),
  refresh_token: Joi.string().optional(),
  expires_in: Joi.string().optional(),
  expires_at: DateTimeConfigurationSchema.optional(),
  connection_context: MapOfStringsSchema.optional(),
});

export interface AccessToken {
  /** @description OAuth1 only. The url to obtain the temporary Access (aka Request) Token to start a flow **/
  url_template: string;
}

export const AccessTokenSchema = Joi.object({
  url_template: Joi.string().required(),
});

export interface RequestTokenConfiguration {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/request", "http://store.com/oauth/request" */
  url_template: string;
  /** @description A list of query parameters that will be attached to the url */
  query_parameters?: Parameter[];
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration when exchanging the code for the token. These are built using ContentType */
  body?: Parameter[];
  /** @description List of headers that are sent to the integration when requesting a token */
  headers?: Parameter[];
  /** @description Response payload parsing */
  response?: ResponseTransformationConfiguration;
}

export const RequestTokenConfigurationSchema = Joi.object({
  url_template: Joi.string().required(),
  query_parameters: Joi.array().optional().items(ParameterSchema),
  method: MethodSchema.optional(),
  body: Joi.array().optional().items(ParameterSchema),
  headers: Joi.array().optional().items(ParameterSchema),
  response: ResponseTransformationConfigurationSchema.optional(),
});

export interface RefreshTokenConfiguration {
  /** @description The url to refresh the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/refresh", "http://store.com/oauth/refresh" */
  url_template: string;
  /** @description A list of query parameters that will be attached to the url */
  query_parameters?: Parameter[];
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration during the server-server refresh token request. These are built using the content type specified in the headers array. */
  body?: Parameter[];
  /** @description List of headers that are sent to the integration when refreshing a token */
  headers?: Parameter[];
  /** @description Response payload parsing */
  response?: ResponseTransformationConfiguration;
}

export const RefreshTokenConfigurationSchema = Joi.object({
  url_template: Joi.string().required(),
  query_parameters: Joi.array().optional().items(ParameterSchema),
  method: MethodSchema.optional(),
  body: Joi.array().optional().items(ParameterSchema),
  headers: Joi.array().optional().items(ParameterSchema),
  response: ResponseTransformationConfigurationSchema.optional(),
});

export interface AuthorizationConfiguration {
  /** @description The url to obtain the access token using the authorization code on the backend @example "http://{auth_state:store_name}.store.com/admin/oauth/authorize", "http://store.com/oauth/authorize" */
  url_template: string;
  /** @description A list of query parameters that will be attached to the url */
  query_parameters?: Parameter[];
  /** @description Method to use when making the server-server code for token request @example "GET", "POST" */
  method?: string;
  /** @description List of parameters that are sent to the integration during the server-server authorization request. These are built using the content type specified in the headers array. */
  body?: Parameter[];
  /** @description List of headers that are sent to the integration when authorizing a token */
  headers?: Parameter[];
}

export const AuthorizationConfigurationSchema = Joi.object({
  url_template: Joi.string().required(),
  query_parameters: Joi.array().optional().items(ParameterSchema),
  method: MethodSchema.optional(),
  body: Joi.array().optional().items(ParameterSchema),
  headers: Joi.array().optional().items(ParameterSchema),
});
