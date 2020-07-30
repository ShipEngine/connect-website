import { AppManifestPOJO, ConnectionAppDefinition, ConnectionAppPOJO } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { readDefinitionValue } from "../read-definition";
import { readFormDefinition } from "./read-form-definition";

/**
 * Reads a ShipEngine Integration Platform connection definition
 */
export async function readConnectionAppDefinition(
definition: ConnectionAppDefinition, cwd: string, manifest: AppManifestPOJO): Promise<ConnectionAppPOJO> {
  return {
    ...definition,
    manifest,
    logo: path.resolve(cwd, definition.logo),
    icon: path.resolve(cwd, definition.icon),
    connectionForm: await readFormDefinition(definition.connectionForm, cwd, `connectionForm`),
    settingsForm: await readFormDefinition(definition.settingsForm, cwd, `settingsForm`),
    connect: await readDefinitionValue(definition.connect, cwd, `connect method`)
  };
}
