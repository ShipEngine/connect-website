import { OAuthConfigDefinition, InlineOrReference, InlineOrReferenceArray } from "@shipengine/connect-sdk";
import { OAuthConfigPOJO } from "@shipengine/connect-sdk/lib/internal";
import { readDefinition, readDefinitionValue } from "../read-definition";

/**
 * Reads a packaging definition
 */
export async function readPackagingDefinition(
  definition: InlineOrReference<PackagingDefinition>, cwd: string, fieldName: string): Promise<PackagingPOJO> {
  definition = await readDefinitionValue(definition, cwd, fieldName);

  return definition;
}

/**
 * Reads a data driven OAuth Config definition
 */
export async function readOAuthConfigDefinition(
  definition: InlineOrReference<OAuthConfigDefinition> | undefined, cwd: string, fieldName: string): Promise<OAuthConfigPOJO | undefined> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  if (!definition) return;

  return {
    ...definition,
    tokenProperties: await readDefinitionValue(definition.tokenProperties, cwd, `${fieldName}.tokenProperties`),
    authorizationProcess: await readDefinitionValue(definition.authorizationProcess, cwd, `${fieldName}.authorizationProcess`),
    refreshTokenProcess: await readDefinitionValue(definition.refreshTokenProcess, cwd, `${fieldName}.refreshTokenProcess`)
  };
}
