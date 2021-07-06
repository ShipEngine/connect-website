import type { InlineOrReference } from '../types';
import { AccessTokenDefinition } from './access-token-definition';
import { AuthorizationDefinition } from './authorization-definition';
import { OAuthParameterDefinition } from './parameter';
import { RefreshTokenDefinition } from './refresh-token-definition';
import type { OAuthRequestDefinition } from './request';
import { RequestTokenDefinition } from './request-token-definition';
import type { OAuthResponseDefinition } from './response';

/**
 * Describes the data driven authorization processes.
 */
export interface OAuthAuthorizationProcessDefinition {
  /** @description Added to allow oauth 1.0 to work. */
  accessToken?: InlineOrReference<AccessTokenDefinition>;
  /** @description Authorization: the beginning of an OAuth2.0 flow that ensures the user is logged in and approves access to the Resource. */
  authorization?: InlineOrReference<AuthorizationDefinition>;
  /** @description Request Token: server-server code for token exchange */
  requestToken?: InlineOrReference<RequestTokenDefinition>;
  /** @description Refresh Token: server-server refresh token exchange for access token **NOTE: sometimes a new RT is also created** */
  refreshToken?: InlineOrReference<RefreshTokenDefinition>;
  /** @description Advanced configurations used for oauth 1.0 */
  advancedConfiguration?: OAuthParameterDefinition[];

  /**
   * @description Login request made to the identity provider. @deprecated This field has been deprecated, please use authorization
   */
  loginRequest?: InlineOrReference<OAuthRequestDefinition>;

  /**
   * @description  Expected redirect response after the identity provider has attempted to authenticate the user. @deprecated This field has been deprecated please use authorization
   */
  redirectRequest?: InlineOrReference<OAuthResponseDefinition>;

  /**
   * @description Authorization request made to the identity provider to authorize the user after the identity has been established. @deprecated This field has been deprecated please use authorization
   */
  authorizeRequest?: InlineOrReference<OAuthRequestDefinition>;

  /**
   * @description Expected response to an authorization request. @deprecated This field has been deprecated
   */
  authorizeResponse?: InlineOrReference<OAuthResponseDefinition>;
}
