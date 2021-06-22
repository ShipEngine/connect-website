import * as Requests from '../requests';
import * as Responses from '../responses';
import { InventoryAppMetadata } from './inventory-app-metadata';

/**
 * @description This defines a Connect Inventory App
 */
export interface InventoryAppDefinition {
  metadata: InventoryAppMetadata;

  fetchInventoryFull: (
    request: Requests.FetchInventoryRequestFull,
  ) => Promise<
    | Responses.InventoryFetchSuccess
    | Responses.InventoryFetchPending
    | Responses.ErrorResponse
  >;

  fetchInventoryPartial: (
    request: Requests.FetchInventoryRequestPartial,
  ) => Promise<Responses.AnyInventoryFetchResponse>;

  fetchInventoryDelta: (
    request: Requests.FetchInventoryRequestDelta,
  ) => Promise<Responses.AnyInventoryFetchResponse>;

  getFetchResults: (
    request: Requests.OperationResults,
  ) => Promise<
    Responses.InventoryFetchPending | Responses.InventoryFetchSuccess
  >;

  pushInventory: (
    request: Requests.PushInventoryRequest,
  ) => Promise<Responses.AnyInventoryPushResponse>;

  getPushResults: (
    request: Requests.OperationResults,
  ) => Promise<Responses.AnyInventoryPushResponse>;
}
