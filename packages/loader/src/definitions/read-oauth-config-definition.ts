import {
  OAuthConfigDefinition,
  InlineOrReference,
  OAuthAuthorizationProcessDefinition,
  OAuthRefreshTokenProcessDefinition,
} from '@shipengine/connect-sdk';
import {
  OAuthConfigPOJO,
  OAuthAuthorizationProcessPOJO,
  OAuthRefreshTokenProcessPOJO,
} from '@shipengine/connect-sdk/lib/internal';
import { readDefinition, readDefinitionValue } from '../read-definition';

export async function readAuthorizationProcessDefinition(
  definition: InlineOrReference<OAuthAuthorizationProcessDefinition>,
  cwd: string,
  fieldName: string,
): Promise<OAuthAuthorizationProcessPOJO> {
  definition = await readDefinitionValue(definition, cwd, fieldName);

  return definition as OAuthAuthorizationProcessPOJO;
}

export async function readRefreshTokenProcessDefinition(
  definition: InlineOrReference<OAuthRefreshTokenProcessDefinition> | undefined,
  cwd: string,
  fieldName: string,
): Promise<OAuthRefreshTokenProcessPOJO | undefined> {
  definition = await readDefinitionValue(definition, cwd, fieldName);

  if (!definition) return;

  return definition as OAuthRefreshTokenProcessPOJO;
}

/**
 * Reads a data driven OAuth Config definition
 */
export async function readOAuthConfigDefinition(
  definition: InlineOrReference<OAuthConfigDefinition> | undefined,
  cwd: string,
  fieldName: string,
): Promise<OAuthConfigPOJO | undefined> {
  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  if (!definition) return;

  return {
    ...definition,
    tokenProperties: await readDefinitionValue(
      definition.tokenProperties,
      cwd,
      `${fieldName}.tokenProperties`,
    ),
    authorizationProcess: await readAuthorizationProcessDefinition(
      definition.authorizationProcess,
      cwd,
      `${fieldName}.authorizationProcess`,
    ),
    refreshTokenProcess: await readRefreshTokenProcessDefinition(
      definition.refreshTokenProcess,
      cwd,
      `${fieldName}.refreshTokenProcess`,
    ),
  };
}
