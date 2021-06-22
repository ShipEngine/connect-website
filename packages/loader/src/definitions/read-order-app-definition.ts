import { InlineOrReference, OrderAppDefinition } from '@shipengine/connect-sdk';
import {
  AppManifestPOJO,
  OrderAppPOJO,
} from '@shipengine/connect-sdk/lib/internal';
import { readDefinition, readDefinitionValue } from '../read-definition';
import { readConnectionAppDefinition } from './read-connection-app-definition';

/**
 * Reads a ShipEngine Connect order app definition
 */
export async function readOrderAppDefinition(
  definition: InlineOrReference<OrderAppDefinition>,
  cwd: string,
  manifest: AppManifestPOJO,
): Promise<OrderAppPOJO> {
  [definition, cwd] = await readDefinition(definition, cwd, 'order app');

  return {
    ...(await readConnectionAppDefinition(definition, cwd, manifest)),
    getSalesOrdersByDate: await readDefinitionValue(
      definition.getSalesOrdersByDate,
      cwd,
      'getSalesOrdersByDate method',
    ),
    shipmentCreated: await readDefinitionValue(
      definition.shipmentCreated,
      cwd,
      'shipmentCreated method',
    ),
    acknowledgeOrders: await readDefinitionValue(
      definition.acknowledgeOrders,
      cwd,
      'acknowledgeOrders method',
    ),
  };
}
