import { DeliveryServiceDefinition, InlineOrReference, InlineOrReferenceArray } from "@shipengine/connect-sdk";
import { DeliveryServicePOJO } from "@shipengine/connect-sdk/lib/internal";
import { readDefinition, readDefinitions, readDefinitionValue } from "../read-definition";
import { readDeliveryConfirmationArrayDefinition } from "./read-delivery-confirmation-definition";
import { readPackingArrayDefinition } from "./read-packaging-definition";

/**
 * Reads a delivery service definition
 */
export async function readDeliveryServiceDefinition(
  definition: InlineOrReference<DeliveryServiceDefinition>, cwd: string, fieldName: string): Promise<DeliveryServicePOJO> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  return {
    ...definition,
    availableCountries: await readDefinitionValue(definition.availableCountries, cwd, `${fieldName}.availableCountries`),
    packaging: await readPackingArrayDefinition(definition.packaging, cwd, `${fieldName}.packaging`),
    deliveryConfirmations: await readDeliveryConfirmationArrayDefinition(definition.deliveryConfirmations, cwd, `${fieldName}.deliveryConfirmations`)
  };
}

/**
 * Reads an array of delivery service definitions
 */
export async function readDeliveryServiceArrayDefinition(
  definitions: InlineOrReferenceArray<DeliveryServiceDefinition>, cwd: string, fieldName: string): Promise<DeliveryServicePOJO[]> {

  let array: DeliveryServiceDefinition[] | undefined;
  [array, cwd] = await readDefinitions(definitions, cwd, fieldName);

  if (Array.isArray(array)) {
    definitions = await Promise.all(
      array.map((service, index) => readDeliveryServiceDefinition(service, cwd, `${fieldName}[${index}]`))
    );
  }

  return definitions as DeliveryServicePOJO[];
}
