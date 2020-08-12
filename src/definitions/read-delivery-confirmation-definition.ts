import { DeliveryConfirmationDefinition, InlineOrReference, InlineOrReferenceArray } from "@shipengine/connect-sdk";
import { DeliveryConfirmationPOJO } from "@shipengine/connect-sdk/lib/internal";
import { readDefinitions, readDefinitionValue } from "../read-definition";

/**
 * Reads a delivery confirmation definition
 */
export async function readDeliveryConfirmationDefinition(
  definition: InlineOrReference<DeliveryConfirmationDefinition>, cwd: string, fieldName: string): Promise<DeliveryConfirmationPOJO> {

  definition = await readDefinitionValue(definition, cwd, fieldName);

  return definition;
}

/**
 * Reads an array of delivery confirmation definitions
 */
export async function readDeliveryConfirmationArrayDefinition(
  definitions: InlineOrReferenceArray<DeliveryConfirmationDefinition> | undefined, cwd: string, fieldName: string): Promise<DeliveryConfirmationPOJO[] | undefined> {

  let array: DeliveryConfirmationDefinition[] | undefined;
  [array, cwd] = await readDefinitions(definitions, cwd, fieldName);

  if (Array.isArray(array)) {
    definitions = await Promise.all(
      array.map((service, index) => readDeliveryConfirmationDefinition(service, cwd, `${fieldName}[${index}]`))
    );

    return definitions as DeliveryConfirmationPOJO[];
  }
}
