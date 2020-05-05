import { InlineOrReference, InlineOrReferenceArray, PickupServiceDefinition, PickupServicePOJO } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readLocalizationDefinition } from "./read-localization-definition";

/**
 * Reads a pickup service definition
 */
export async function readPickupServiceDefinition(
definition: InlineOrReference<PickupServiceDefinition>, cwd: string, fieldName: string)
: Promise<PickupServicePOJO> {

  definition = await readDefinitionValue(definition, cwd, fieldName);

  return {
    ...definition,
    localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
  };
}

/**
 * Reads an array of pickup service definitions
 */
export async function readPickupServiceArrayDefinition(
definitions: InlineOrReferenceArray<PickupServiceDefinition> | undefined, cwd: string, fieldName: string)
: Promise<PickupServicePOJO[] | undefined> {

  [definitions, cwd] = await readDefinition(definitions, cwd, fieldName);

  if (Array.isArray(definitions)) {
    definitions = await Promise.all(
      definitions.map((service, index) => readPickupServiceDefinition(service, cwd, `${fieldName}[${index}]`))
    );

    return definitions as PickupServicePOJO[];
  }
}
