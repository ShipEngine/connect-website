import { InventoryFetchItem, OperationStatus } from "../models";
import { ErrorResponse, NotSupportedResponse } from "./error-responses";

/**
 * Any
 */
export type AnyInventoryFetchResponse =
  | InventoryFetchSuccess
  | InventoryFetchPending
  | ErrorResponse
  | NotSupportedResponse;

/**
 * Response shape for Inventory Fetch operations which have completed processing
 * at the 3rd-party inventory provider, meaning that results are available for
 * consumption by the client.
 *
 * Note: if it's necessary for clients to page through result data, this response
 * should have `has_more_data: true` and provide a `cursor` for clients to send
 * back in their next request for more data. Generally cursors should be a base64-
 * encoded string which deserializes to a 'locator' that Inventory Apps can use
 * to access the next result-set from the inventory provider.
 *
 */
export type InventoryFetchSuccess = {
  status: OperationStatus.SUCCESS;
  inventory_items: InventoryFetchItem[];
  has_more_data: boolean;
  cursor?: string;
};

/**
 * Response shape for Inventory Fetch operations which are still processing at
 * the 3rd-party inventory provider, meaning results are not yet ready for
 * consumption by the client.
 *
 * Inventory Apps must provide a `cursor` and a best guess at how soon clients
 * should poll again for completion. Generally cursors should be a base64-
 * encoded string which deserializes to some 'locator' that can be used to
 * re-check the status of the fetch operation with the inventory provider.
 */
export type InventoryFetchPending = {
  status: OperationStatus.PENDING;
  cursor: string;
  poll_after_seconds: number;
};
