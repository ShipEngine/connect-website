import { AnyInventoryRequest } from "../requests/any-inventory-request";
import { AnyInventoryResponse } from "../responses/any-inventory-response";

export type InventoryHandler = (
  request: AnyInventoryRequest
) => Promise<AnyInventoryResponse>;

export enum Operation {
  FETCH_FULL = "/fetch_inventory/full",
  FETCH_PARTIAL = "/fetch_inventory/partial",
  FETCH_DELTA = "/fetch_inventory/delta",
  FETCH_RESULTS = "/fetch_inventory",
  PUSH = "/push_inventory",
  PUSH_RESULTS = "/push_inventory",
}
