import { CarrierDefinition, CarrierPOJO, InlineOrReference } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readDeliveryServiceArrayDefinition } from "./read-delivery-service-definition";
import { readLocalizationDefinition } from "./read-localization-definition";
import { readPickupServiceArrayDefinition } from "./read-pickup-service-definition";

/**
 * Reads a ShipEngine Integration Platform carrier definition
 */
export async function readCarrierDefinition(
definition: InlineOrReference<CarrierDefinition>, cwd: string, fieldName: string): Promise<CarrierPOJO> {
  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  return {
    ...definition,
    logo: path.resolve(cwd, definition.logo),
    deliveryServices:
      await readDeliveryServiceArrayDefinition(definition.deliveryServices, cwd, `${fieldName}.deliveryServices`),
    pickupServices:
      await readPickupServiceArrayDefinition(definition.pickupServices, cwd, `${fieldName}.pickupServices`),
    localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
    createShipment: await readDefinitionValue(definition.createShipment, cwd, `${fieldName}.createShipment`),
    cancelShipments: await readDefinitionValue(definition.cancelShipments, cwd, `${fieldName}.cancelShipments`),
    rateShipment: await readDefinitionValue(definition.rateShipment, cwd, `${fieldName}.rateShipment`),
    track: await readDefinitionValue(definition.track, cwd, `${fieldName}.track`),
    createManifest: await readDefinitionValue(definition.createManifest, cwd, `${fieldName}.createManifest`),
    schedulePickup: await readDefinitionValue(definition.schedulePickup, cwd, `${fieldName}.schedulePickup`),
    cancelPickups: await readDefinitionValue(definition.cancelPickups, cwd, `${fieldName}.cancelPickups`),
  };
}
