import { hideAndFreeze, _internal } from '../utils';
import { Joi } from '../validation';
import {
  OAuthAuthorizationProcessDefinition,
  OAuthParameterDefinition,
  OAuthRequestDefinition,
  OAuthResponseDefinition,
} from '../../../public';
import { OAuthResponse } from './response';
import { OAuthRequest } from './request';
import { AccessTokenDefinition } from '../../../public/common/oauth/access-token-definition';
import { AuthorizationDefinition } from '../../../public/common/oauth/authorization-definition';
import { RequestTokenDefinition } from '../../../public/common/oauth/request-token-definition';
import { RefreshTokenDefinition } from '../../../public/common/oauth/refresh-token-definition';

export interface OAuthAuthorizationProcessPOJO
  extends OAuthAuthorizationProcessDefinition {
  loginRequest?: OAuthRequestDefinition;
  redirectRequest?: OAuthResponseDefinition;
  authorizeRequest?: OAuthRequestDefinition;
  authorizeResponse?: OAuthResponseDefinition;
  accessToken?: AccessTokenDefinition;
  authorization?: AuthorizationDefinition;
  requestToken?: RequestTokenDefinition;
  refreshToken?: RefreshTokenDefinition;
  advancedConfiguration?: OAuthParameterDefinition[];
}

export class OAuthAuthorizationProcess {
  public static readonly [_internal] = {
    label: 'oauth-authorization-process',
    schema: Joi.object({
      loginRequest: OAuthRequest[_internal].schema.optional(),
      redirectRequest: OAuthResponse[_internal].schema.optional(),
      authorizeRequest: OAuthRequest[_internal].schema.optional(),
      authorizeResponse: OAuthResponse[_internal].schema.optional(),
    }),
  };
  public readonly monoAuth: boolean;
  public readonly loginRequest?: OAuthRequest;
  public readonly redirectRequest?: OAuthResponse;
  public readonly authorizeRequest?: OAuthRequest;
  public readonly authorizeResponse?: OAuthResponse;
  public readonly accessToken?: AccessTokenDefinition;
  public readonly authorization?: AuthorizationDefinition;
  public readonly requestToken?: RequestTokenDefinition;
  public readonly refreshToken?: RefreshTokenDefinition;
  public readonly advancedConfiguration?: OAuthParameterDefinition[];

  public constructor(pojo: OAuthAuthorizationProcessPOJO) {
    pojo.loginRequest
      ? (this.loginRequest = new OAuthRequest(pojo.loginRequest))
      : (this.loginRequest = undefined);
    this.redirectRequest = pojo.redirectRequest;
    this.authorizeRequest = pojo.authorizeRequest
      ? new OAuthRequest(pojo.authorizeRequest)
      : undefined;
    this.authorizeResponse = pojo.authorizeResponse;
    this.accessToken = pojo.accessToken;
    this.authorization = pojo.authorization;
    this.requestToken = pojo.requestToken;
    this.refreshToken = pojo.refreshToken;
    this.advancedConfiguration = pojo.advancedConfiguration;

    this.monoAuth =
      pojo.accessToken !== undefined ||
      pojo.authorization !== undefined ||
      pojo.requestToken !== undefined ||
      pojo.refreshToken !== undefined ||
      pojo.advancedConfiguration !== undefined;

    // Make this object immutable
    hideAndFreeze(this);
  }
}
