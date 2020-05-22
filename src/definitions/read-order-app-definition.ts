import { AppManifestPOJO, InlineOrReference, OrderAppDefinition, OrderAppPOJO } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readConnectionAppDefinition } from "./read-connection-app-definition";

/**
 * Reads a ShipEngine Integration Platform order app definition
 */
export async function readOrderAppDefinition(
definition: InlineOrReference<OrderAppDefinition>, cwd: string, manifest: AppManifestPOJO): Promise<OrderAppPOJO> {
  [definition, cwd] = await readDefinition(definition, cwd, "order app");

  return {
    ...(await readConnectionAppDefinition(definition, cwd, manifest)),
    getSeller: await readDefinitionValue(definition.getSeller, cwd, `getSeller method`),
    getSalesOrder: await readDefinitionValue(definition.getSalesOrder, cwd, `getSalesOrder method`),
    getSalesOrdersByDate:
      await readDefinitionValue(definition.getSalesOrdersByDate, cwd, `getSalesOrdersByDate method`),
    shipmentCreated: await readDefinitionValue(definition.shipmentCreated, cwd, `shipmentCreated method`),
    shipmentCancelled: await readDefinitionValue(definition.shipmentCancelled, cwd, `shipmentCancelled method`),
  };
}
