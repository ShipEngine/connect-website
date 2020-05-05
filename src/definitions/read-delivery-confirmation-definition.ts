import { DeliveryConfirmationDefinition, DeliveryConfirmationPOJO, InlineOrReference, InlineOrReferenceArray } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readLocalizationDefinition } from "./read-localization-definition";

/**
 * Reads a delivery confirmation definition
 */
export async function readDeliveryConfirmationDefinition(
definition: InlineOrReference<DeliveryConfirmationDefinition>, cwd: string, fieldName: string)
: Promise<DeliveryConfirmationPOJO> {

  definition = await readDefinitionValue(definition, cwd, fieldName);

  return {
    ...definition,
    localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
  };
}

/**
 * Reads an array of delivery confirmation definitions
 */
export async function readDeliveryConfirmationArrayDefinition(
definitions: InlineOrReferenceArray<DeliveryConfirmationDefinition> | undefined, cwd: string, fieldName: string)
: Promise<DeliveryConfirmationPOJO[] | undefined> {

  [definitions, cwd] = await readDefinition(definitions, cwd, fieldName);

  if (Array.isArray(definitions)) {
    definitions = await Promise.all(
      definitions.map((service, index) => readDeliveryConfirmationDefinition(service, cwd, `${fieldName}[${index}]`))
    );

    return definitions as DeliveryConfirmationPOJO[];
  }
}
