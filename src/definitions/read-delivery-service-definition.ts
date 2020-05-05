import { DeliveryServiceDefinition, DeliveryServicePOJO, InlineOrReference, InlineOrReferenceArray } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readDeliveryConfirmationArrayDefinition } from "./read-delivery-confirmation-definition";
import { readLocalizationDefinition } from "./read-localization-definition";
import { readPackingArrayDefinition } from "./read-packaging-definition";

/**
 * Reads a delivery service definition
 */
export async function readDeliveryServiceDefinition(
definition: InlineOrReference<DeliveryServiceDefinition>, cwd: string, fieldName: string)
: Promise<DeliveryServicePOJO> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  return {
    ...definition,
    originCountries: await readDefinitionValue(definition.originCountries, cwd, `${fieldName}.originCountries`),
    destinationCountries: await readDefinitionValue(definition.destinationCountries, cwd, `${fieldName}.destinationCountries`),
    packaging: await readPackingArrayDefinition(definition.packaging, cwd, `${fieldName}.packaging`),
    deliveryConfirmations: await readDeliveryConfirmationArrayDefinition(definition.deliveryConfirmations, cwd, `${fieldName}.deliveryConfirmations`),
    localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
  };
}

/**
 * Reads an array of delivery service definitions
 */
export async function readDeliveryServiceArrayDefinition(
definitions: InlineOrReferenceArray<DeliveryServiceDefinition>, cwd: string, fieldName: string)
: Promise<DeliveryServicePOJO[]> {

  [definitions, cwd] = await readDefinition(definitions, cwd, fieldName);

  if (Array.isArray(definitions)) {
    definitions = await Promise.all(
      definitions.map((service, index) => readDeliveryServiceDefinition(service, cwd, `${fieldName}[${index}]`))
    );
  }

  return definitions as DeliveryServicePOJO[];
}
