import { AuthIdentifier, AuthIdentifierSchema } from './auth-identifier';
import {
  AccessToken,
  AccessTokenSchema,
  AuthorizationConfiguration,
  AuthorizationConfigurationSchema,
  Parameter,
  ParameterSchema,
  RefreshTokenConfiguration,
  RefreshTokenConfigurationSchema,
  RequestTokenConfiguration,
  RequestTokenConfigurationSchema,
} from './monoauth';
import Joi from 'joi';

/** @description Used to specify information about an integrations authentication */
export interface AuthSpecification {
  /** @description Identify the type of Auth being used by the integration */
  Identifier: AuthIdentifier;
  /** @description Added to allow oauth 1.0 to work. */
  access_token?: AccessToken;
  /** @description Authorization: the beginning of an OAuth2.0 flow that ensures the user is logged in and approves access to the Resource. */
  authorization?: AuthorizationConfiguration;
  /** @description Request Token: server-server code for token exchange */
  request_token?: RequestTokenConfiguration;
  /** @description Refresh Token: server-server refresh token exchange for access token **NOTE: sometimes a new RT is also created** */
  refresh_token?: RefreshTokenConfiguration;
  /** @description Advanced configurations used for oauth 1.0 */
  advanced_configuration?: Parameter[];
}

export const AuthSpecificationSchema = Joi.object({
  Identifier: AuthIdentifierSchema,
  access_token: AccessTokenSchema.optional(),
  authorization: AuthorizationConfigurationSchema.optional(),
  request_token: RequestTokenConfigurationSchema.optional(),
  refresh_token: RefreshTokenConfigurationSchema.optional(),
  advanced_configuration: Joi.array().optional().items(ParameterSchema),
});
