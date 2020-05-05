import { ConnectionDefinition, ConnectionPOJO } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { readDefinitionValue } from "../read-definition";
import { readFormDefinition } from "./read-form-definition";
import { readLocalizationDefinition } from "./read-localization-definition";

/**
 * Reads a ShipEngine Integration Platform connection definition
 */
export async function readConnectionDefinition(
definition: ConnectionDefinition, cwd: string, fieldName: string): Promise<ConnectionPOJO> {
  return {
    ...definition,
    logo: path.resolve(cwd, definition.logo),
    connectForm: await readFormDefinition(definition.connectForm, cwd, `${fieldName}.connectForm`),
    settingsForm: await readFormDefinition(definition.settingsForm, cwd, `${fieldName}.settingsForm`),
    connect: await readDefinitionValue(definition.connect, cwd, `${fieldName}.connect`),
    localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
  };
}
