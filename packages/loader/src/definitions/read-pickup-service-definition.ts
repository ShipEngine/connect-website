import { InlineOrReference, InlineOrReferenceArray, PickupServiceDefinition } from "@shipengine/connect-sdk";
import { PickupServicePOJO } from "@shipengine/connect-sdk/lib/internal";
import { readDefinitions, readDefinitionValue } from "../read-definition";

/**
 * Reads a pickup service definition
 */
export async function readPickupServiceDefinition(
  definition: InlineOrReference<PickupServiceDefinition>, cwd: string, fieldName: string): Promise<PickupServicePOJO> {

  definition = await readDefinitionValue(definition, cwd, fieldName);

  return definition;
}

/**
 * Reads an array of pickup service definitions
 */
export async function readPickupServiceArrayDefinition(
  definitions: InlineOrReferenceArray<PickupServiceDefinition> | undefined, cwd: string, fieldName: string): Promise<PickupServicePOJO[] | undefined> {

  let array: PickupServiceDefinition[] | undefined;
  [array, cwd] = await readDefinitions(definitions, cwd, fieldName);

  if (Array.isArray(array)) {
    definitions = await Promise.all(
      array.map((service, index) => readPickupServiceDefinition(service, cwd, `${fieldName}[${index}]`))
    );

    return definitions as PickupServicePOJO[];
  }
}
