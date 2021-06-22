import { ErrorResponse, NotSupportedResponse } from './error-responses';
import {
  InventoryFetchPending,
  InventoryFetchSuccess,
} from './fetch-responses';
import { InventoryPushPending, InventoryPushSuccess } from './push-responses';

/**
 * Union of all possible response shapes from this API.
 */
export type AnyInventoryResponse =
  | ErrorResponse
  | NotSupportedResponse
  | InventoryPushSuccess
  | InventoryPushPending
  | InventoryFetchSuccess
  | InventoryFetchPending;
