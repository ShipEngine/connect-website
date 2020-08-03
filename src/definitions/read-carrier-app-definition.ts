import { AppManifestPOJO, CarrierAppDefinition, CarrierAppPOJO, InlineOrReference } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readConnectionAppDefinition } from "./read-connection-app-definition";
import { readDeliveryServiceArrayDefinition } from "./read-delivery-service-definition";
import { readPickupServiceArrayDefinition } from "./read-pickup-service-definition";

/**
 * Reads a ShipEngine Integration Platform carrier app definition
 */
export async function readCarrierAppDefinition(
definition: InlineOrReference<CarrierAppDefinition>, cwd: string, manifest: AppManifestPOJO): Promise<CarrierAppPOJO> {
  [definition, cwd] = await readDefinition(definition, cwd, "carrier app");

  return {
    ...(await readConnectionAppDefinition(definition, cwd, manifest)),
    deliveryServices:
      await readDeliveryServiceArrayDefinition(definition.deliveryServices, cwd, `deliveryServices`),
    pickupServices:
      await readPickupServiceArrayDefinition(definition.pickupServices, cwd, `pickupServices`),
    manifestType: definition.manifestType,
    createShipment: await readDefinitionValue(definition.createShipment, cwd, `createShipment method`),
    cancelShipments: await readDefinitionValue(definition.cancelShipments, cwd, `cancelShipments method`),
    rateShipment: await readDefinitionValue(definition.rateShipment, cwd, `rateShipment method`),
    trackShipment: await readDefinitionValue(definition.trackShipment, cwd, `trackShipment method`),
    createManifest: await readDefinitionValue(definition.createManifest, cwd, `createManifest method`),
    schedulePickup: await readDefinitionValue(definition.schedulePickup, cwd, `schedulePickup method`),
    cancelPickups: await readDefinitionValue(definition.cancelPickups, cwd, `cancelPickups method`),
  };
}
