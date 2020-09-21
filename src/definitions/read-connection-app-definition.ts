import { ConnectionAppDefinition } from "@shipengine/connect-sdk";
import { AppManifestPOJO, ConnectionAppPOJO, OAuthConfigPOJO } from "@shipengine/connect-sdk/lib/internal";
import * as path from "path";
import { readDefinitionValue } from "../read-definition";
import { readFormDefinition } from "./read-form-definition";
import { readOAuthConfigDefinition } from "./read-oauth-config-definition";

/**
 * Reads a ShipEngine Connect connection definition
 */
export async function readConnectionAppDefinition(
  definition: ConnectionAppDefinition, cwd: string, manifest: AppManifestPOJO): Promise<ConnectionAppPOJO> {
  return {
    ...definition,
    manifest,
    logo: path.resolve(cwd, definition.logo),
    icon: path.resolve(cwd, definition.icon),
    connectionForm: await readFormDefinition(definition.connectionForm, cwd, "connectionForm"),
    settingsForm: await readFormDefinition(definition.settingsForm, cwd, "settingsForm"),
    connect: await readDefinitionValue(definition.connect, cwd, "connect method"),
    oauthConfig: await readOAuthConfigDefinition(definition.oauthConfig, cwd, "oauthConfig")
  };
}
